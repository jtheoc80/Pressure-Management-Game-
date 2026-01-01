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
import { Quiz } from "@/components/academy/Quiz";
import { diagramComponents } from "@/components/academy/diagrams";
import { getLessonById, getLessonsByTrack, getNextLesson } from "@/lib/academy/lessons";
import { getQuizByLessonId } from "@/lib/academy/quizzes";
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
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    const loadedLesson = getLessonById(lessonId);
    if (loadedLesson) {
      // Use setTimeout to avoid synchronous setState in effect
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
          }
        } catch (error) {
          console.error("Failed to load progress:", error);
        }
      }
    }
    loadProgress();
  }, [isSignedIn]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-500 mb-4">Lesson not found</div>
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

  const handleQuizComplete = async (score: number, passed: boolean) => {
    setQuizScore(score);
    setQuizCompleted(true);

    if (isSignedIn && passed) {
      try {
        await fetch("/api/progress/complete-lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId, score }),
        });
      } catch (error) {
        console.error("Failed to save progress:", error);
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

  const sectionProgress = ((currentSectionIndex + 1) / lesson.sections.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/learn" className="text-slate-400 hover:text-slate-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-slate-800">{lesson.title}</h1>
                  {lesson.requiredToUnlock && (
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                      Required
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{lesson.track === "psv" ? "PSV Track" : "Tank & Flame Track"}</span>
                  <span>•</span>
                  <span>Lesson {currentLessonIndex + 1} of {trackLessons.length}</span>
                  <span>•</span>
                  <span>~{lesson.estMinutes} min</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isCompleted && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  ✓ Completed
                </Badge>
              )}
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500">Progress</div>
                <div className="text-sm font-medium text-slate-700">{Math.round(sectionProgress)}%</div>
              </div>
            </div>
          </div>
          <Progress value={sectionProgress} className="h-1 mt-3" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="border-slate-200 sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3">Lesson Sections</h3>
                <nav className="space-y-1">
                  {lesson.sections.map((section, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSectionIndex(idx)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        currentSectionIndex === idx
                          ? "bg-slate-100 text-slate-800 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {idx < currentSectionIndex ? (
                          <span className="text-emerald-500">✓</span>
                        ) : (
                          <span className="text-slate-400">{idx + 1}</span>
                        )}
                        <span className="truncate">{getSectionTitle(section, idx)}</span>
                      </span>
                    </button>
                  ))}
                </nav>

                <Separator className="my-4" />

                {/* Objectives */}
                <h3 className="font-semibold text-sm text-slate-700 mb-2">Learning Objectives</h3>
                <ul className="space-y-2">
                  {lesson.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-slate-400 mt-0.5">○</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionRenderer
              section={lesson.sections[currentSectionIndex]}
              onQuizComplete={handleQuizComplete}
              bestScore={lessonProgress?.bestScore}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentSectionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSectionIndex === 0}
              >
                ← Previous
              </Button>
              
              {currentSectionIndex < lesson.sections.length - 1 ? (
                <Button onClick={() => setCurrentSectionIndex((prev) => prev + 1)}>
                  Next →
                </Button>
              ) : quizCompleted && quizScore !== null && quizScore >= 80 ? (
                <Button onClick={handleContinue} className="bg-emerald-600 hover:bg-emerald-700">
                  {nextLesson ? "Continue to Next Lesson →" : "Back to Academy"}
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
                      No specific terms highlighted for this section.
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

function getSectionTitle(section: LessonSection, index: number): string {
  switch (section.type) {
    case "text":
      return section.heading || `Section ${index + 1}`;
    case "diagram":
      return section.caption || "Diagram";
    case "callout":
      return section.variant === "tip" ? "Tip" : section.variant === "warning" ? "Warning" : "Example";
    case "check":
      return "Key Takeaways";
    case "quiz":
      return "Quiz";
    default:
      return `Section ${index + 1}`;
  }
}

interface SectionRendererProps {
  section: LessonSection;
  onQuizComplete: (score: number, passed: boolean) => void;
  bestScore?: number;
}

function SectionRenderer({ section, onQuizComplete, bestScore }: SectionRendererProps) {
  switch (section.type) {
    case "text":
      return (
        <Card className="border-slate-200">
          <CardContent className="p-6">
            {section.heading && (
              <h2 className="text-xl font-semibold text-slate-800 mb-4">{section.heading}</h2>
            )}
            <div className="prose prose-slate max-w-none">
              <TextWithTooltips text={section.body} />
            </div>
          </CardContent>
        </Card>
      );

    case "diagram":
      const DiagramComponent = diagramComponents[section.key];
      return (
        <Card className="border-slate-200">
          <CardContent className="p-6">
            {DiagramComponent ? (
              <DiagramComponent />
            ) : (
              <div className="bg-slate-100 p-8 rounded-lg text-center text-slate-500">
                Diagram: {section.key}
              </div>
            )}
            {section.caption && (
              <p className="text-sm text-slate-500 text-center mt-3">{section.caption}</p>
            )}
          </CardContent>
        </Card>
      );

    case "callout":
      const calloutStyles = {
        tip: "bg-emerald-50 border-emerald-200 text-emerald-800",
        warning: "bg-amber-50 border-amber-200 text-amber-800",
        example: "bg-blue-50 border-blue-200 text-blue-800",
      };
      const calloutIcons = {
        tip: "💡",
        warning: "⚠️",
        example: "📝",
      };
      return (
        <Card className={`border-2 ${calloutStyles[section.variant]}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">{calloutIcons[section.variant]}</span>
              <div>
                <span className="font-semibold capitalize">{section.variant}</span>
                <p className="mt-1 text-sm">
                  <TextWithTooltips text={section.body} />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "check":
      return (
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span>✓</span> What Good Looks Like
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span className="text-sm">
                    <TextWithTooltips text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );

    case "quiz":
      const quiz = getQuizByLessonId(section.quizId.replace("-quiz", ""));
      if (!quiz) {
        return (
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center text-slate-500">
              Quiz not found
            </CardContent>
          </Card>
        );
      }
      return <Quiz quiz={quiz} onComplete={onQuizComplete} bestScore={bestScore} />;

    default:
      return null;
  }
}

// Helper component to add tooltips to glossary terms in text
function TextWithTooltips({ text }: { text: string }) {
  // Simple implementation - split by known terms and wrap with tooltips
  // For MVP, just render text directly. Full implementation would parse and add tooltips.
  return <span>{text}</span>;
}
