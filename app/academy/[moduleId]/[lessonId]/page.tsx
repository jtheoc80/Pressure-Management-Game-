"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLessonById, getModuleById } from "@/lib/academy/course";
import { LessonPlayerLayout } from "@/components/academy/LessonPlayerLayout";
import { StepRenderer } from "@/components/academy/StepRenderer";

/**
 * Lesson Player Page
 * 
 * The core step-by-step learning experience.
 * Renders one step at a time with navigation controls.
 */
export default function LessonPlayerPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [drillCompleted, setDrillCompleted] = useState(false);

  const lesson = getLessonById(lessonId);
  const currentModule = getModuleById(moduleId);

  // Load progress from localStorage after mount
  useEffect(() => {
    const storageKey = `academy-lesson-${lessonId}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydrating from localStorage after mount
        setCurrentStepIndex(data.currentStepIndex || 0);
         
        setCompletedSteps(data.completedSteps || []);
         
        setDrillCompleted(data.drillCompleted || false);
      } catch {
        console.error("Failed to parse lesson progress");
      }
    }
  }, [lessonId]);

  // Save progress to localStorage
  const saveProgress = useCallback(() => {
    const storageKey = `academy-lesson-${lessonId}`;
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        currentStepIndex,
        completedSteps,
        drillCompleted,
      })
    );
  }, [lessonId, currentStepIndex, completedSteps, drillCompleted]);

  useEffect(() => {
    saveProgress();
  }, [saveProgress]);

  // Handle step completion
  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps((prev) => [...prev, stepIndex]);
    }
  };

  // Handle step navigation
  const handleStepChange = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle drill completion
  const handleDrillComplete = (drillId: string, score: number, passed: boolean) => {
    if (passed) {
      setDrillCompleted(true);
      handleStepComplete(currentStepIndex);
      
      // Save drill completion globally
      const storedDrills = localStorage.getItem("academy-completed-drills");
      const drills = storedDrills ? JSON.parse(storedDrills) : [];
      if (!drills.includes(drillId)) {
        drills.push(drillId);
        localStorage.setItem("academy-completed-drills", JSON.stringify(drills));
      }
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      handleStepComplete(currentStepIndex);
      
      // Mark lesson as complete
      const storedLessons = localStorage.getItem("academy-completed-lessons");
      const lessons = storedLessons ? JSON.parse(storedLessons) : [];
      if (!lessons.includes(lessonId)) {
        lessons.push(lessonId);
        localStorage.setItem("academy-completed-lessons", JSON.stringify(lessons));
      }
    }
  };

  // Handle confidence check navigation
  const handleConfidenceAction = (goToStepIndex: number) => {
    setCurrentStepIndex(goToStepIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Error states
  if (!lesson || !currentModule) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Lesson Not Found
            </h2>
            <p className="text-slate-600 mb-4">
              The lesson you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/academy">
              <Button>Back to Academy</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];

  // Check if quiz should be locked (drill must be completed first)
  const isDrillRequired = lesson.steps.some((s) => s.type === "drill");
  const isQuizLocked = currentStep.type === "quiz" && isDrillRequired && !drillCompleted;

  return (
    <LessonPlayerLayout
      lesson={lesson}
      currentStepIndex={currentStepIndex}
      completedSteps={completedSteps}
      onStepChange={handleStepChange}
      onStepComplete={handleStepComplete}
      moduleTitle={currentModule.title}
    >
      {isQuizLocked ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Quiz Locked
            </h3>
            <p className="text-amber-700 mb-4">
              Complete the Mini-Drill first to unlock the quiz. This helps ensure
              you&apos;re ready for the assessment.
            </p>
            <Button
              variant="outline"
              className="border-amber-300 text-amber-700"
              onClick={() => {
                // Find the drill step index
                const drillIndex = lesson.steps.findIndex((s) => s.type === "drill");
                if (drillIndex !== -1) {
                  handleStepChange(drillIndex);
                }
              }}
            >
              Go to Mini-Drill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <StepRenderer
          step={currentStep}
          onDrillComplete={handleDrillComplete}
          onQuizComplete={handleQuizComplete}
          onConfidenceAction={handleConfidenceAction}
          onRemediation={handleConfidenceAction}
        />
      )}
    </LessonPlayerLayout>
  );
}
