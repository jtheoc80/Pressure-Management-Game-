"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSafeUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle2,
  Target,
  Zap,
  Shield,
} from "lucide-react";
import { academyCourse, getModuleProgress } from "@/lib/academy/course";

/**
 * Academy Home Page
 * 
 * Shows all modules with progress tracking.
 * Entry point for the step-by-step learning experience.
 */
export default function AcademyPage() {
  const { isSignedIn, user } = useSafeUser();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load progress from localStorage after hydration
  useEffect(() => {
    const stored = localStorage.getItem("academy-completed-lessons");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydrating from localStorage after mount
        setCompletedLessons(JSON.parse(stored));
      } catch {
        console.error("Failed to parse completed lessons");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-[#0B1F3B] via-[#12345A] to-[#1a4a7a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span>Training Academy</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Puffer Training Academy</h1>
                  <p className="text-white/70">
                    Master pressure relief & tank protection
                  </p>
                </div>
              </div>

              <p className="text-white/80 max-w-2xl leading-relaxed">
                Step-by-step lessons designed by senior trainers and process engineers.
                Build your foundation before tackling real-world scenarios.
              </p>
            </div>

            {/* User Info */}
            <div className="hidden md:block text-right">
              {isSignedIn ? (
                <div>
                  <div className="text-sm text-white/60">Welcome back,</div>
                  <div className="font-semibold">{user?.firstName || "Trainee"}</div>
                </div>
              ) : (
                <Link href="/sign-in">
                  <Button variant="secondary" size="sm">
                    Sign in to save progress
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-600">
                  <strong className="text-slate-800">{academyCourse.modules.length}</strong> modules
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-600">
                  <strong className="text-slate-800">
                    {academyCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                  </strong>{" "}
                  lessons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-600">
                  ~
                  <strong className="text-slate-800">
                    {academyCourse.modules.reduce(
                      (acc, m) => acc + m.lessons.reduce((a, l) => a + l.estMinutes, 0),
                      0
                    )}
                  </strong>{" "}
                  min total
                </span>
              </div>
            </div>

            <Link href="/psv-quest">
              <Button variant="outline" size="sm" className="gap-2">
                <Zap className="w-4 h-4" />
                PSV Sizing Quest
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Orientation Banner */}
        <Card className="mb-8 border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardContent className="py-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 text-lg">
                  You are here: Start your training journey
                </h2>
                <p className="text-slate-600 mt-1">
                  Complete each module in order. Lessons include interactive diagrams,
                  field walkdowns, practice drills, and quizzes. Your progress is saved
                  automatically.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                    ✓ Step-by-step guidance
                  </Badge>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                    ✓ No equations required
                  </Badge>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                    ✓ Real-world scenarios
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Training Modules</h2>
          </div>

          {academyCourse.modules.map((module, moduleIdx) => {
            const moduleProgress = getModuleProgress(module.id, completedLessons);
            const totalMinutes = module.lessons.reduce((acc, l) => acc + l.estMinutes, 0);
            const completedCount = module.lessons.filter((l) =>
              completedLessons.includes(l.id)
            ).length;

            return (
              <Card
                key={module.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0B1F3B] text-white font-bold text-lg flex items-center justify-center">
                        {moduleIdx + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-800">
                          {module.title}
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">
                          {module.lessons.length} lessons · ~{totalMinutes} min
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Progress value={moduleProgress} className="w-24 h-2" />
                        <span className="text-sm font-medium text-slate-600">
                          {moduleProgress}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {completedCount}/{module.lessons.length} complete
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-600 mb-4">{module.summary}</p>

                  {/* Lesson List Preview */}
                  <div className="space-y-2 mb-4">
                    {module.lessons.slice(0, 3).map((lesson, lessonIdx) => {
                      const isComplete = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 text-sm"
                        >
                          {isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          )}
                          <span
                            className={
                              isComplete ? "text-slate-500" : "text-slate-700"
                            }
                          >
                            {lessonIdx + 1}. {lesson.title}
                          </span>
                          {lesson.required && (
                            <Badge
                              variant="outline"
                              className="text-xs text-amber-600 border-amber-300"
                            >
                              Required
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                    {module.lessons.length > 3 && (
                      <p className="text-sm text-slate-500 ml-7">
                        +{module.lessons.length - 3} more lessons
                      </p>
                    )}
                  </div>

                  <Link href={`/academy/${module.id}`}>
                    <Button className="w-full bg-[#0B1F3B] hover:bg-[#12345A] gap-2">
                      {moduleProgress === 0
                        ? "Start Module"
                        : moduleProgress === 100
                        ? "Review Module"
                        : "Continue Learning"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">
            After completing the academy, test your skills in real scenarios
          </p>
          <Link href="/psv-quest">
            <Button variant="outline" size="lg" className="gap-2">
              <Zap className="w-5 h-5" />
              Try PSV Sizing Quest
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
