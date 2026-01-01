"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock,
  Target,
  PlayCircle,
} from "lucide-react";
import { getModuleById, getModuleProgress, type Lesson } from "@/lib/academy/course";

/**
 * Module Page
 * 
 * Shows all lessons in a module with completion status and readiness indicators.
 * Guides the learner through the lesson sequence.
 */
export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  // Load initial state from localStorage
  const getInitialLessons = (): string[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("academy-completed-lessons");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  };

  const getInitialDrills = (): string[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("academy-completed-drills");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  };

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);

  const currentModule = getModuleById(moduleId);

  // Hydrate state from localStorage after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydrating from localStorage after mount
    setCompletedLessons(getInitialLessons());
     
    setCompletedDrills(getInitialDrills());
  }, []);

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Module Not Found
            </h2>
            <p className="text-slate-600 mb-4">
              The module you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/academy">
              <Button>Back to Academy</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const moduleProgress = getModuleProgress(currentModule.id, completedLessons);
  const totalMinutes = currentModule.lessons.reduce((acc, l) => acc + l.estMinutes, 0);

  // Determine lesson status
  const getLessonStatus = (lesson: Lesson, lessonIdx: number) => {
    const isComplete = completedLessons.includes(lesson.id);
    const drillId = `drill-${lesson.id}`;
    const drillComplete = completedDrills.includes(drillId);
    
    // First lesson is always unlocked
    if (lessonIdx === 0) {
      return { isComplete, drillComplete, isLocked: false };
    }
    
    // Subsequent lessons require previous lesson to be complete
    const prevLesson = currentModule.lessons[lessonIdx - 1];
    const prevComplete = completedLessons.includes(prevLesson.id);
    
    return { isComplete, drillComplete, isLocked: !prevComplete };
  };

  // Find the next lesson to continue
  const getNextLesson = (): Lesson | null => {
    for (const lesson of currentModule.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return lesson;
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/academy">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Academy
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Progress value={moduleProgress} className="w-32 h-2" />
                <span className="text-sm text-slate-600">{moduleProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B1F3B] text-white font-bold text-xl flex items-center justify-center">
              {currentModule.order}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{currentModule.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {currentModule.lessons.length} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~{totalMinutes} min
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {currentModule.lessons.filter((l) => completedLessons.includes(l.id)).length}/
                  {currentModule.lessons.length} complete
                </span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed">{currentModule.summary}</p>

          {/* Continue Button */}
          {nextLesson && (
            <div className="mt-6">
              <Link href={`/academy/${currentModule.id}/${nextLesson.id}`}>
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <PlayCircle className="w-5 h-5" />
                  {moduleProgress === 0 ? "Start Module" : "Continue Learning"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
          {moduleProgress === 100 && (
            <div className="mt-6">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 px-4 py-2">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Module Complete! Well done.
              </Badge>
            </div>
          )}
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Lessons</h2>

          {currentModule.lessons.map((lesson, lessonIdx) => {
            const { isComplete, isLocked } = getLessonStatus(lesson, lessonIdx);
            const isCurrent = nextLesson?.id === lesson.id;

            return (
              <Card
                key={lesson.id}
                className={`transition-all ${
                  isLocked
                    ? "opacity-60"
                    : isCurrent
                    ? "ring-2 ring-blue-500 shadow-md"
                    : isComplete
                    ? "border-emerald-200 bg-emerald-50/30"
                    : ""
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="shrink-0">
                      {isLocked ? (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-slate-400" />
                        </div>
                      ) : isComplete ? (
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <PlayCircle className="w-5 h-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                          <Circle className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className={`font-semibold ${
                            isLocked ? "text-slate-500" : "text-slate-800"
                          }`}
                        >
                          {lessonIdx + 1}. {lesson.title}
                        </h3>
                        {lesson.required && (
                          <Badge
                            variant="outline"
                            className="text-xs text-amber-600 border-amber-300"
                          >
                            Required
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge className="text-xs bg-blue-100 text-blue-700">
                            Up Next
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          ~{lesson.estMinutes} min
                        </span>
                        <span>{lesson.objectives.length} objectives</span>
                        <span>{lesson.steps.length} steps</span>
                      </div>

                      {/* Objectives Preview */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {lesson.objectives.slice(0, 3).map((obj) => (
                          <Badge
                            key={obj.id}
                            variant="outline"
                            className="text-xs text-slate-600"
                          >
                            {obj.label}
                          </Badge>
                        ))}
                        {lesson.objectives.length > 3 && (
                          <Badge variant="outline" className="text-xs text-slate-400">
                            +{lesson.objectives.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="shrink-0">
                      {isLocked ? (
                        <Button variant="ghost" size="sm" disabled>
                          Locked
                        </Button>
                      ) : (
                        <Link href={`/academy/${currentModule.id}/${lesson.id}`}>
                          <Button
                            variant={isComplete ? "outline" : "default"}
                            size="sm"
                            className={
                              isComplete
                                ? "border-emerald-300 text-emerald-700"
                                : isCurrent
                                ? "bg-blue-600 hover:bg-blue-700"
                                : ""
                            }
                          >
                            {isComplete ? "Review" : isCurrent ? "Start" : "View"}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Module Complete CTA */}
        {moduleProgress === 100 && (
          <Card className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-slate-600 mb-4">
                You&apos;ve completed all lessons in this module. Ready to apply your knowledge?
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/psv-quest">
                  <Button className="gap-2">
                    Try PSV Sizing Quest
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/academy">
                  <Button variant="outline">Back to Academy</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
