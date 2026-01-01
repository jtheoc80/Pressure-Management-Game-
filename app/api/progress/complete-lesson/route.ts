import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getLessonById } from "@/lib/academy/lessons";

interface CompleteLessonRequest {
  lessonId: string;
  score: number;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: CompleteLessonRequest = await request.json();
    const { lessonId, score } = body;

    if (!lessonId || typeof score !== "number") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Get lesson data to check unlocks
    const lesson = getLessonById(lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    // Check if passed (>= 80%)
    const passed = score >= 80;

    let updatedUnlocks: Record<string, boolean> = {};

    try {
      const supabase = getSupabaseAdmin();

      // Get existing progress for this lesson
      const { data: existingProgress } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("lesson_id", lessonId)
        .single();

      const now = new Date().toISOString();
      const bestScore = existingProgress
        ? Math.max(existingProgress.best_score, score)
        : score;
      const attempts = existingProgress ? (existingProgress.attempts || 0) + 1 : 1;

      // Upsert lesson progress
      const { error: upsertError } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: userId,
            lesson_id: lessonId,
            best_score: bestScore,
            completed_at: passed ? now : existingProgress?.completed_at || null,
            attempts,
            updated_at: now,
          },
          {
            onConflict: "user_id,lesson_id",
          }
        );

      if (upsertError) {
        console.error("Error upserting lesson progress:", upsertError);
      }

      // If passed and lesson has unlocks, update user_unlocks
      if (passed && lesson.unlocks.length > 0) {
        // Get current unlocks
        const { data: currentUnlocks } = await supabase
          .from("user_unlocks")
          .select("*")
          .eq("user_id", userId)
          .single();

        const unlockUpdates: Record<string, boolean> = {};
        lesson.unlocks.forEach((unlock) => {
          unlockUpdates[unlock] = true;
        });

        if (currentUnlocks) {
          // Update existing record
          const { error: updateError } = await supabase
            .from("user_unlocks")
            .update({
              ...unlockUpdates,
              updated_at: now,
            })
            .eq("user_id", userId);

          if (updateError) {
            console.error("Error updating unlocks:", updateError);
          }

          updatedUnlocks = {
            psv_play: currentUnlocks.psv_play || unlockUpdates.psv_play || false,
            tank_flame_play: currentUnlocks.tank_flame_play || unlockUpdates.tank_flame_play || false,
            coach_mode_off: currentUnlocks.coach_mode_off || unlockUpdates.coach_mode_off || false,
          };
        } else {
          // Insert new record
          const { error: insertError } = await supabase
            .from("user_unlocks")
            .insert({
              user_id: userId,
              psv_play: unlockUpdates.psv_play || false,
              tank_flame_play: unlockUpdates.tank_flame_play || false,
              coach_mode_off: unlockUpdates.coach_mode_off || false,
              created_at: now,
              updated_at: now,
            });

          if (insertError) {
            console.error("Error inserting unlocks:", insertError);
          }

          updatedUnlocks = {
            psv_play: unlockUpdates.psv_play || false,
            tank_flame_play: unlockUpdates.tank_flame_play || false,
            coach_mode_off: unlockUpdates.coach_mode_off || false,
          };
        }
      }
    } catch {
      // Supabase not configured
      console.log("Supabase not configured, progress not persisted");
    }

    return NextResponse.json({
      success: true,
      passed,
      score,
      newUnlocks: lesson.unlocks.filter(() => passed),
      unlocks: updatedUnlocks,
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
