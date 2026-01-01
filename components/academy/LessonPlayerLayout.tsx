"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  List,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Lesson, Step, LessonObjective } from "@/lib/academy/course";

interface LessonPlayerLayoutProps {
  lesson: Lesson;
  currentStepIndex: number;
  completedSteps: number[];
  onStepChange: (stepIndex: number) => void;
  onStepComplete: (stepIndex: number) => void;
  children: React.ReactNode;
  moduleTitle?: string;
}

/**
 * LessonPlayerLayout - Main layout for step-by-step lesson delivery
 * 
 * Desktop: Left nav (lesson steps) | Center (content) | Right (objectives)
 * Mobile: Sheet nav + Drawer for objectives
 */
export function LessonPlayerLayout({
  lesson,
  currentStepIndex,
  completedSteps,
  onStepChange,
  onStepComplete,
  children,
  moduleTitle = "Module 1",
}: LessonPlayerLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileObjectivesOpen, setMobileObjectivesOpen] = useState(false);

  const totalSteps = lesson.steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  const currentStep = lesson.steps[currentStepIndex];

  // Get step type label
  const getStepTypeLabel = (step: Step): string => {
    const labels: Record<string, string> = {
      explain: "Learn",
      diagram: "Visual",
      gallery: "Photos",
      rule: "Standard",
      case: "Case Study",
      fieldwalkdown: "Field Walk",
      supervisorcheck: "Review",
      confidence: "Check-in",
      drill: "Practice",
      quiz: "Quiz",
    };
    return labels[step.type] || "Step";
  };

  // Get step icon
  const getStepIcon = (step: Step, index: number, isComplete: boolean, isCurrent: boolean) => {
    if (isComplete) {
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
    if (isCurrent) {
      return <PlayCircle className="w-4 h-4 text-blue-500" />;
    }
    return <Circle className="w-4 h-4 text-slate-300" />;
  };

  // Navigation handlers
  const goToNextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      onStepComplete(currentStepIndex);
      onStepChange(currentStepIndex + 1);
    }
  }, [currentStepIndex, totalSteps, onStepComplete, onStepChange]);

  const goToPrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  }, [currentStepIndex, onStepChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !e.metaKey && !e.ctrlKey) {
        goToNextStep();
      } else if (e.key === "ArrowLeft" && !e.metaKey && !e.ctrlKey) {
        goToPrevStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextStep, goToPrevStep]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3">
              <Link href={`/academy/${lesson.moduleId}`}>
                <Button variant="ghost" size="sm" className="gap-1 text-slate-600">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              
              <div className="hidden md:block">
                <p className="text-xs text-slate-500">{moduleTitle}</p>
                <h1 className="text-sm font-semibold text-slate-800 line-clamp-1">
                  {lesson.title}
                </h1>
              </div>
            </div>

            {/* Center: Progress */}
            <div className="flex-1 max-w-xs mx-4 hidden sm:block">
              <div className="flex items-center gap-2">
                <Progress value={progressPercent} className="h-2" />
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {currentStepIndex + 1}/{totalSteps}
                </span>
              </div>
            </div>

            {/* Right: Mobile triggers */}
            <div className="flex items-center gap-2">
              {/* Mobile Nav Trigger */}
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <List className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetTitle className="sr-only">Lesson Navigation</SheetTitle>
                  <MobileStepNav
                    lesson={lesson}
                    currentStepIndex={currentStepIndex}
                    completedSteps={completedSteps}
                    onStepChange={(idx) => {
                      onStepChange(idx);
                      setMobileNavOpen(false);
                    }}
                    getStepTypeLabel={getStepTypeLabel}
                    getStepIcon={getStepIcon}
                  />
                </SheetContent>
              </Sheet>

              {/* Mobile Objectives Trigger */}
              <Sheet open={mobileObjectivesOpen} onOpenChange={setMobileObjectivesOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <SheetTitle className="sr-only">Learning Objectives</SheetTitle>
                  <ObjectivesPanel objectives={lesson.objectives} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Step Navigation (Desktop) */}
        <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-slate-200 flex-col">
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Lesson Steps
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {lesson.steps.map((step, idx) => {
              const isComplete = completedSteps.includes(idx);
              const isCurrent = idx === currentStepIndex;

              return (
                <button
                  key={idx}
                  onClick={() => onStepChange(idx)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                    isCurrent
                      ? "bg-blue-50 border border-blue-200"
                      : isComplete
                      ? "hover:bg-slate-50"
                      : "hover:bg-slate-50 opacity-75"
                  )}
                >
                  <div className="mt-0.5">
                    {getStepIcon(step, idx, isComplete, isCurrent)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium truncate",
                        isCurrent ? "text-blue-700" : "text-slate-700"
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {getStepTypeLabel(step)}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Center - Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
            {/* Step Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  Step {currentStepIndex + 1} of {totalSteps}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {getStepTypeLabel(currentStep)}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentStep.title}
              </h2>
            </div>

            {/* Step Content */}
            <div className="mb-8">{children}</div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={goToPrevStep}
                disabled={currentStepIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {/* Mobile Progress */}
              <div className="sm:hidden flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  {currentStepIndex + 1}/{totalSteps}
                </span>
              </div>

              {currentStepIndex < totalSteps - 1 ? (
                <Button onClick={goToNextStep} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Link href={`/academy/${lesson.moduleId}`}>
                  <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                    Complete Lesson
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Objectives (Desktop) */}
        <aside className="hidden lg:flex w-64 bg-white border-l border-slate-200 flex-col">
          <ObjectivesPanel objectives={lesson.objectives} />
        </aside>
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function MobileStepNav({
  lesson,
  currentStepIndex,
  completedSteps,
  onStepChange,
  getStepTypeLabel,
  getStepIcon,
}: {
  lesson: Lesson;
  currentStepIndex: number;
  completedSteps: number[];
  onStepChange: (idx: number) => void;
  getStepTypeLabel: (step: Step) => string;
  getStepIcon: (step: Step, index: number, isComplete: boolean, isCurrent: boolean) => React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h2 className="font-semibold text-slate-800">{lesson.title}</h2>
        <p className="text-sm text-slate-500">~{lesson.estMinutes} minutes</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {lesson.steps.map((step, idx) => {
          const isComplete = completedSteps.includes(idx);
          const isCurrent = idx === currentStepIndex;

          return (
            <button
              key={idx}
              onClick={() => onStepChange(idx)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                isCurrent
                  ? "bg-blue-50 border border-blue-200"
                  : isComplete
                  ? "hover:bg-slate-50"
                  : "hover:bg-slate-50 opacity-75"
              )}
            >
              <div className="mt-0.5">
                {getStepIcon(step, idx, isComplete, isCurrent)}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-blue-700" : "text-slate-700"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-slate-500">{getStepTypeLabel(step)}</p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function ObjectivesPanel({ objectives }: { objectives: LessonObjective[] }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-100">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          Learning Objectives
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {objectives.map((obj, idx) => (
            <div key={obj.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-medium flex items-center justify-center">
                {idx + 1}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">
                  {obj.label}
                </p>
                <p className="text-sm text-slate-700">{obj.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonPlayerLayout;
