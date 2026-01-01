"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSafeUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getLessonsByTrack, isLessonUnlocked } from "@/lib/academy/lessons";
import type { Lesson, UserProgress, LessonProgress } from "@/lib/academy/types";

export default function LearnPage() {
  const { isSignedIn, user } = useSafeUser();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState<"psv" | "tank_flame">("psv");

  useEffect(() => {
    async function loadProgress() {
      if (isSignedIn) {
        try {
          const res = await fetch("/api/progress/get");
          if (res.ok) {
            const data = await res.json();
            setProgress(data);
          }
        } catch (error) {
          console.error("Failed to load progress:", error);
        }
      }
      setIsLoading(false);
    }
    loadProgress();
  }, [isSignedIn]);

  const psvLessons = getLessonsByTrack("psv");
  const tankFlameLessons = getLessonsByTrack("tank_flame");

  const completedLessonIds = progress
    ? Object.keys(progress.lessonProgress).filter(
        (id) => progress.lessonProgress[id]?.completedAt
      )
    : [];

  const getTrackProgress = (lessons: Lesson[]) => {
    const completed = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
    return Math.round((completed / lessons.length) * 100);
  };

  const getLessonStatus = (lesson: Lesson) => {
    const lessonProgress = progress?.lessonProgress[lesson.id];
    const isCompleted = !!lessonProgress?.completedAt;
    const isUnlocked = isLessonUnlocked(lesson.id, completedLessonIds);
    
    return { isCompleted, isUnlocked, lessonProgress };
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0B1F3B] to-[#12345A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span>Training Academy</span>
              </div>
              <h1 className="text-3xl font-bold">Puffer Training Academy</h1>
              <p className="text-white/70 mt-2 max-w-2xl">
                Master the fundamentals of pressure relief and tank protection before tackling 
                real scenarios. Complete required lessons to unlock gameplay.
              </p>
            </div>
            <div className="hidden md:block text-right">
              {isSignedIn ? (
                <div>
                  <div className="text-sm text-white/60">Welcome back,</div>
                  <div className="font-semibold">{user?.firstName || "Trainee"}</div>
                </div>
              ) : (
                <Link href="/sign-in">
                  <Button variant="secondary" size="sm">
                    Sign in to track progress
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Objective Banner */}
        <Card className="mb-8 border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardContent className="py-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">Your Learning Objective</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Complete the required PSV lessons (marked with ⭐) to unlock PSV Sizing Quest scenarios. 
                  Tank & Flame lessons unlock tank protection scenarios. Each lesson includes a quiz—
                  score 80% or higher to mark it complete.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Track Tabs */}
        <Tabs value={activeTrack} onValueChange={(v) => setActiveTrack(v as "psv" | "tank_flame")}>
          <TabsList className="mb-6">
            <TabsTrigger value="psv" className="gap-2">
              <span>🔧</span> PSV Track
              <Badge variant="secondary" className="ml-1">
                {getTrackProgress(psvLessons)}%
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="tank_flame" className="gap-2">
              <span>🛢️</span> Tank & Flame Track
              <Badge variant="secondary" className="ml-1">
                {getTrackProgress(tankFlameLessons)}%
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="psv">
            <TrackContent
              lessons={psvLessons}
              trackName="PSV Fundamentals"
              trackDescription="Learn pressure relief device terminology, sizing concepts, and valve selection before playing PSV Sizing Quest."
              unlockBadge="Unlocks: PSV Sizing Quest scenarios"
              getLessonStatus={getLessonStatus}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="tank_flame">
            <TrackContent
              lessons={tankFlameLessons}
              trackName="Tank & Flame Protection"
              trackDescription="Understand atmospheric tank protection, PVRV selection, flame arresters, and overfill prevention."
              unlockBadge="Unlocks: Tank Protection scenarios"
              getLessonStatus={getLessonStatus}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/glossary">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 h-full">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Glossary</h3>
                    <p className="text-sm text-slate-500">Browse 60+ industry terms with examples</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/psv-quest">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 h-full">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">PSV Sizing Quest</h3>
                    <p className="text-sm text-slate-500">Apply your knowledge in realistic scenarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}

interface TrackContentProps {
  lessons: Lesson[];
  trackName: string;
  trackDescription: string;
  unlockBadge: string;
  getLessonStatus: (lesson: Lesson) => {
    isCompleted: boolean;
    isUnlocked: boolean;
    lessonProgress: LessonProgress | undefined;
  };
  isLoading: boolean;
}

function TrackContent({
  lessons,
  trackName,
  trackDescription,
  unlockBadge,
  getLessonStatus,
  isLoading,
}: TrackContentProps) {
  const completedCount = lessons.filter((l) => getLessonStatus(l).isCompleted).length;
  const requiredCount = lessons.filter((l) => l.requiredToUnlock).length;
  const requiredCompleted = lessons.filter(
    (l) => l.requiredToUnlock && getLessonStatus(l).isCompleted
  ).length;

  return (
    <div>
      {/* Track Header */}
      <Card className="mb-6 border-slate-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{trackName}</CardTitle>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {unlockBadge}
            </Badge>
          </div>
          <p className="text-sm text-slate-500">{trackDescription}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={(completedCount / lessons.length) * 100} className="flex-1 h-2" />
            <span className="text-sm font-medium text-slate-600">
              {completedCount}/{lessons.length} complete
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Required lessons: {requiredCompleted}/{requiredCount} complete
          </div>
        </CardContent>
      </Card>

      {/* Lesson List */}
      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const { isCompleted, isUnlocked, lessonProgress } = getLessonStatus(lesson);

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              bestScore={lessonProgress?.bestScore}
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  bestScore?: number;
  isLoading: boolean;
}

function LessonCard({
  lesson,
  index,
  isCompleted,
  isUnlocked,
  bestScore,
  isLoading,
}: LessonCardProps) {
  return (
    <Card
      className={`border transition-all ${
        isCompleted
          ? "border-emerald-200 bg-emerald-50/30"
          : isUnlocked
          ? "border-slate-200 hover:border-slate-300 hover:shadow-sm"
          : "border-slate-200 bg-slate-50 opacity-60"
      }`}
    >
      <CardContent className="py-4">
        <div className="flex items-center gap-4">
          {/* Lesson Number / Status Icon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              isCompleted
                ? "bg-emerald-500 text-white"
                : isUnlocked
                ? "bg-slate-200 text-slate-700"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {isCompleted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : isUnlocked ? (
              index + 1
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
          </div>

          {/* Lesson Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold ${isUnlocked ? "text-slate-800" : "text-slate-500"}`}>
                {lesson.title}
              </h3>
              {lesson.requiredToUnlock && (
                <span className="text-amber-500" title="Required to unlock gameplay">
                  ⭐
                </span>
              )}
              {lesson.unlocks.length > 0 && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                  🔓 Unlocks access
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
              <span>~{lesson.estMinutes} min</span>
              <span>•</span>
              <span>{lesson.objectives.length} objectives</span>
              {bestScore !== undefined && bestScore > 0 && (
                <>
                  <span>•</span>
                  <span className="text-emerald-600">Best: {bestScore}%</span>
                </>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div>
            {isLoading ? (
              <div className="w-20 h-9 bg-slate-100 rounded animate-pulse" />
            ) : isUnlocked ? (
              <Link href={`/learn/${lesson.id}`}>
                <Button
                  size="sm"
                  variant={isCompleted ? "outline" : "default"}
                  className={
                    isCompleted
                      ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      : ""
                  }
                >
                  {isCompleted ? "Review" : "Start"}
                </Button>
              </Link>
            ) : (
              <Button size="sm" variant="ghost" disabled className="text-slate-400">
                Locked
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
