"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSafeUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Target, CheckCircle2 } from "lucide-react";
import { LessonRenderer } from "@/components/academy/LessonRenderer";
import { getLessonById, getLessonsByTrack, getNextLesson } from "@/lib/academy/lessons";
import { getDrillByLessonId } from "@/lib/academy/drills";
import { glossaryTerms } from "@/lib/academy/glossary";
import type { Lesson, LessonSection, UserProgress } from "@/lib/academy/types";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export default function LessonPage({ params }: PageProps) {
  const { lessonId } = use(params);
  const router = useRouter();
  const { isSignedIn } = useSafeUser();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [drillCompleted, setDrillCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const loadedLesson = getLessonById(lessonId);
    if (loadedLesson) {
      setTimeout(() => setLesson(loadedLesson), 0);
    }
  }, [lessonId]);

  useEffect(() => {
    async function loadProgress() {
      if (isSignedIn) {
        try {
          const res = await fetch("/api/progress/get");
          if (res.ok) {
            const data = await res.json();
            setProgress(data);
            // Check if drill is already completed
            const drill = getDrillByLessonId(lessonId);
            if (drill && data.completedDrills?.includes(drill.id)) {
              setDrillCompleted(true);
            }
          }
        } catch (error) {
          console.error("Failed to load progress:", error);
        }
      }
    }
    loadProgress();
  }, [isSignedIn, lessonId]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-500 mb-4">Loading lesson...</div>
          <Link href="/learn">
            <Button variant="outline">Back to Academy</Button>
          </Link>
        </div>
      </div>
    );
  }

  const trackLessons = getLessonsByTrack(lesson.track);
  const currentLessonIndex = trackLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = getNextLesson(lessonId);
  const lessonProgress = progress?.lessonProgress[lessonId];
  const isCompleted = !!lessonProgress?.completedAt;
  const drill = getDrillByLessonId(lessonId);
  const drillRequired = !!lesson.drillRequired && !!drill;

  const handleQuizComplete = async (score: number, passed: boolean, weakObjectives?: number[]) => {
    setQuizScore(score);
    setQuizCompleted(true);

    if (isSignedIn && passed) {
      try {
        await fetch("/api/progress/complete-lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId, score, weakObjectives }),
        });
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  };

  const handleDrillComplete = async (drillId: string, score: number, passed: boolean) => {
    if (passed) {
      setDrillCompleted(true);
      
      if (isSignedIn) {
        try {
          await fetch("/api/progress/complete-lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ drillId, score }),
          });
        } catch (error) {
          console.error("Failed to save drill progress:", error);
        }
      }
    }
  };

  const handleContinue = () => {
    if (nextLesson) {
      router.push(`/learn/${nextLesson.id}`);
    } else {
      router.push("/learn");
    }
  };

  // Find glossary terms in the current lesson for the sidebar
  const relatedTerms = glossaryTerms.filter((term) => {
    const lessonText = JSON.stringify(lesson.sections).toLowerCase();
    return lessonText.includes(term.term.toLowerCase());
  }).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/learn" className="text-slate-400 hover:text-slate-600">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-semibold text-slate-800">{lesson.title}</h1>
                  {lesson.requiredToUnlock && (
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                      Required
                    </Badge>
                  )}
                  {isCompleted && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{lesson.track === "psv" ? "PSV Track" : "Tank & Flame Track"}</span>
                  <span>•</span>
                  <span>Lesson {currentLessonIndex + 1} of {trackLessons.length}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~{lesson.estMinutes} min
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {drillRequired && (
                <Badge 
                  variant="outline" 
                  className={drillCompleted 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : "bg-violet-50 text-violet-700 border-violet-200"
                  }
                >
                  <Target className="w-3 h-3 mr-1" />
                  Drill {drillCompleted ? "Complete" : "Required"}
                </Badge>
              )}
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500">Reading Progress</div>
                <div className="text-sm font-medium text-slate-700">{Math.round(scrollProgress)}%</div>
              </div>
            </div>
          </div>
          <Progress value={scrollProgress} className="h-1 mt-3" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Objectives */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="border-slate-200 sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#003366]" />
                  Learning Objectives
                </h3>
                <ul className="space-y-2">
                  {lesson.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 font-medium">
                        {idx + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Sections</span>
                    <span className="font-medium text-slate-700">{lesson.sections.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Estimated Time</span>
                    <span className="font-medium text-slate-700">{lesson.estMinutes} min</span>
                  </div>
                  {lessonProgress?.bestScore !== undefined && lessonProgress.bestScore > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Best Quiz Score</span>
                      <span className="font-medium text-emerald-600">{lessonProgress.bestScore}%</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <LessonRenderer
              sections={lesson.sections}
              onQuizComplete={handleQuizComplete}
              onDrillComplete={handleDrillComplete}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <Link href="/learn">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Academy
                </Button>
              </Link>
              
              {quizCompleted && quizScore !== null && quizScore >= 80 ? (
                <Button onClick={handleContinue} className="bg-emerald-600 hover:bg-emerald-700">
                  {nextLesson ? "Continue to Next Lesson →" : "Back to Academy"}
                </Button>
              ) : nextLesson ? (
                <Button variant="outline" onClick={handleContinue}>
                  Skip to Next Lesson →
                </Button>
              ) : null}
            </div>
          </div>

          {/* Right Sidebar - Key Terms */}
          <div className="lg:col-span-3 order-3">
            <Card className="border-slate-200 sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3">Key Terms</h3>
                <div className="space-y-3">
                  {relatedTerms.length > 0 ? (
                    relatedTerms.map((term) => (
                      <div key={term.term} className="text-sm">
                        <Link
                          href={`/glossary#${term.term.toLowerCase().replace(/\s+/g, "-")}`}
                          className="font-medium text-slate-800 hover:text-blue-600"
                        >
                          {term.term}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">
                      No specific terms highlighted for this lesson.
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <Link href="/glossary">
                  <Button variant="outline" size="sm" className="w-full">
                    Browse Full Glossary →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
