import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { UserProgress } from "@/lib/academy/types";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Initialize default progress
    const progress: UserProgress = {
      lessonProgress: {},
      unlocks: {
        psv_play: false,
        tank_flame_play: false,
        coach_mode_off: false,
      },
      coachModeEnabled: true,
    };

    // Try to get data from Supabase if available
    try {
      const supabase = getSupabaseAdmin();

      // Get lesson progress
      const { data: lessonProgressData, error: lessonError } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", userId);

      if (!lessonError && lessonProgressData) {
        lessonProgressData.forEach((row) => {
          progress.lessonProgress[row.lesson_id] = {
            lessonId: row.lesson_id,
            bestScore: row.best_score,
            completedAt: row.completed_at,
            attempts: row.attempts || 0,
          };
        });
      }

      // Get user unlocks
      const { data: unlocksData, error: unlocksError } = await supabase
        .from("user_unlocks")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!unlocksError && unlocksData) {
        progress.unlocks = {
          psv_play: unlocksData.psv_play || false,
          tank_flame_play: unlocksData.tank_flame_play || false,
          coach_mode_off: unlocksData.coach_mode_off || false,
        };
        progress.coachModeEnabled = !unlocksData.coach_mode_off;
      }
    } catch {
      // Supabase not configured, return defaults
      console.log("Supabase not configured, using default progress");
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
