"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSafeUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, GraduationCap, Target, CheckCircle2, Clock, Zap } from "lucide-react";
import { PreviewModeBannerCompact } from "@/components/PreviewModeBanner";
import { getLessonsByTrack, isLessonUnlocked } from "@/lib/academy/lessons";
import { cases } from "@/lib/academy/cases";
import { getDrillByLessonId } from "@/lib/academy/drills";
import type { Lesson, UserProgress, LessonProgress } from "@/lib/academy/types";

// Wrapper component to handle Suspense for useSearchParams
function LearnPageInner() {
  const { isSignedIn, user } = useSafeUser();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("lessons");
  const [activeTrack, setActiveTrack] = useState<"psv" | "tank_flame">("psv");
  
  // Compute preview mode from URL params and cookies
  const isPreviewMode = useMemo(() => {
    const previewParam = searchParams.get("preview") === "1";
    if (typeof window !== "undefined") {
      const previewCookie = document.cookie.includes("preview_mode=true");
      return previewParam || previewCookie;
    }
    return previewParam;
  }, [searchParams]);

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
  const psvCases = cases.filter(c => c.track === "psv");
  const tankFlameCases = cases.filter(c => c.track === "tank_flame");

  const completedLessonIds = progress
    ? Object.keys(progress.lessonProgress).filter(
        (id) => progress.lessonProgress[id]?.completedAt
      )
    : [];

  const completedDrills = progress?.completedDrills || [];

  const getTrackProgress = (lessons: Lesson[]) => {
    const completed = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
    return Math.round((completed / lessons.length) * 100);
  };

  const getTrackReadiness = (lessons: Lesson[]) => {
    // Count lessons with completed drills
    const lessonsWithDrills = lessons.filter(l => getDrillByLessonId(l.id));
    const drillsCompleted = lessonsWithDrills.filter(l => {
      const drill = getDrillByLessonId(l.id);
      return drill && completedDrills.includes(drill.id);
    }).length;
    return lessonsWithDrills.length > 0 
      ? Math.round((drillsCompleted / lessonsWithDrills.length) * 100)
      : 100;
  };

  const getLessonStatus = (lesson: Lesson) => {
    const lessonProgress = progress?.lessonProgress[lesson.id];
    const isCompleted = !!lessonProgress?.completedAt;
    // Preview mode unlocks all lessons
    const isUnlocked = isPreviewMode || isLessonUnlocked(lesson.id, completedLessonIds);
    const drill = getDrillByLessonId(lesson.id);
    const drillCompleted = drill ? completedDrills.includes(drill.id) : true;
    
    return { isCompleted, isUnlocked, lessonProgress, drillCompleted };
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${isPreviewMode ? "pt-8" : ""}`}>
      {/* Preview Mode Banner */}
      <PreviewModeBannerCompact isEnabled={isPreviewMode} />
      
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
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="w-8 h-8" />
                Puffer Training Academy
              </h1>
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
        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="lessons" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="casebook" className="gap-2">
              <FileText className="w-4 h-4" />
              Casebook
            </TabsTrigger>
            <TabsTrigger value="glossary" className="gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Glossary
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            {/* Objective Banner */}
            <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-800">Your Learning Objective</h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Complete the required PSV lessons (marked with ⭐) to unlock PSV Sizing Quest scenarios. 
                      Tank & Flame lessons unlock tank protection scenarios. Each lesson includes a drill and quiz—
                      pass both to mark it complete.
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
                  readinessPercent={getTrackReadiness(psvLessons)}
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
                  readinessPercent={getTrackReadiness(tankFlameLessons)}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Casebook Tab */}
          <TabsContent value="casebook" className="space-y-6">
            <Card className="border-l-4 border-l-amber-500 bg-amber-50/50">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FileText className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-800">Real-World Case Studies</h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Learn from actual incidents and scenarios. Each case includes the narrative, 
                      required inputs, common mistakes, and standard references.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {/* PSV Cases */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    🔧 PSV Cases
                    <Badge variant="secondary">{psvCases.length} cases</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {psvCases.slice(0, 3).map((c) => (
                    <Link key={c.id} href={`/learn/cases/${c.id}`}>
                      <div className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                        <h4 className="font-medium text-slate-800 text-sm">{c.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{c.summary}</p>
                      </div>
                    </Link>
                  ))}
                  <Link href="/learn/cases?track=psv">
                    <Button variant="outline" className="w-full mt-2" size="sm">
                      View All PSV Cases →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tank/Flame Cases */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    🛢️ Tank & Flame Cases
                    <Badge variant="secondary">{tankFlameCases.length} cases</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tankFlameCases.slice(0, 3).map((c) => (
                    <Link key={c.id} href={`/learn/cases/${c.id}`}>
                      <div className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                        <h4 className="font-medium text-slate-800 text-sm">{c.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{c.summary}</p>
                      </div>
                    </Link>
                  ))}
                  <Link href="/learn/cases?track=tank_flame">
                    <Button variant="outline" className="w-full mt-2" size="sm">
                      View All Tank Cases →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Link href="/learn/cases">
              <Button className="w-full bg-[#003366]">
                Browse All {cases.length} Case Studies
              </Button>
            </Link>
          </TabsContent>

          {/* Glossary Tab - Quick Link */}
          <TabsContent value="glossary" className="space-y-6">
            <Card className="border-l-4 border-l-purple-500 bg-purple-50/50">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-800">Industry Terminology</h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Browse 60+ industry terms with definitions, examples, common mistakes, 
                      and related concepts. Essential reference for understanding PSV and tank protection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Full Glossary</h3>
              <p className="text-slate-600 mb-4">
                Access the complete searchable glossary with filtering by category.
              </p>
              <Link href="/glossary">
                <Button className="bg-[#003366]">
                  Open Glossary →
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/learn/cases">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 h-full">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Casebook</h3>
                    <p className="text-sm text-slate-500">Real-world scenarios with {cases.length} case studies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/psv-quest">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 h-full">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600" />
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

// Default export with Suspense wrapper for useSearchParams
export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="text-slate-500">Loading...</div></div>}>
      <LearnPageInner />
    </Suspense>
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
    drillCompleted: boolean;
  };
  readinessPercent: number;
  isLoading: boolean;
}

function TrackContent({
  lessons,
  trackName,
  trackDescription,
  unlockBadge,
  getLessonStatus,
  readinessPercent,
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
          <div className="grid md:grid-cols-2 gap-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600">Lessons Complete</span>
                <span className="font-medium">{completedCount}/{lessons.length}</span>
              </div>
              <Progress value={(completedCount / lessons.length) * 100} className="h-2" />
              <div className="mt-1 text-xs text-slate-500">
                Required: {requiredCompleted}/{requiredCount}
              </div>
            </div>
            
            {/* Readiness */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Drill Readiness
                </span>
                <span className={`font-medium ${readinessPercent >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                  {readinessPercent}%
                </span>
              </div>
              <Progress 
                value={readinessPercent} 
                className={`h-2 ${readinessPercent >= 80 ? "[&>div]:bg-emerald-500" : "[&>div]:bg-amber-500"}`} 
              />
              <div className="mt-1 text-xs text-slate-500">
                {readinessPercent >= 80 ? "Ready for quizzes!" : "Complete drills before quizzes"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson List */}
      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const { isCompleted, isUnlocked, lessonProgress, drillCompleted } = getLessonStatus(lesson);
          const hasDrill = !!getDrillByLessonId(lesson.id);

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              bestScore={lessonProgress?.bestScore}
              hasDrill={hasDrill}
              drillCompleted={drillCompleted}
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
  hasDrill: boolean;
  drillCompleted: boolean;
  isLoading: boolean;
}

function LessonCard({
  lesson,
  index,
  isCompleted,
  isUnlocked,
  bestScore,
  hasDrill,
  drillCompleted,
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
              <CheckCircle2 className="w-5 h-5" />
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
            <div className="flex items-center gap-2 flex-wrap">
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
              {hasDrill && !drillCompleted && isUnlocked && (
                <Badge variant="outline" className="text-xs bg-violet-50 text-violet-600 border-violet-200">
                  <Target className="w-3 h-3 mr-1" />
                  Drill available
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~{lesson.estMinutes} min
              </span>
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
