"use client";

import React, { useState } from "react";
import { Target, CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb, Award, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDrillById, calculateDrillScore } from "@/lib/academy/drills";
import type { Drill } from "@/lib/academy/types";
import { getModule1DrillById, calculateModule1DrillScore, type Drill as M1Drill, type DrillQuestion as M1DrillQuestion } from "@/lib/academy/module1-drills";

interface DrillBlockProps {
  drillId: string;
  onComplete?: (score: number, passed: boolean) => void;
  onRemediation?: (stepIndex: number) => void;
}

// Helper to get drill from either source
function getDrill(drillId: string): Drill | M1Drill | undefined {
  // Try Module 1 drills first (new format)
  const m1Drill = getModule1DrillById(drillId);
  if (m1Drill) return m1Drill;
  
  // Fall back to legacy drills
  return getDrillById(drillId);
}

// Helper to check if it's a Module 1 drill
function isModule1Drill(drill: Drill | M1Drill): drill is M1Drill {
  const firstQuestion = drill.questions[0];
  return 'remediationStepIndex' in firstQuestion || 'remediationLabel' in firstQuestion;
}

export function DrillBlock({ drillId, onComplete, onRemediation }: DrillBlockProps) {
  const drill = getDrill(drillId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!drill) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <p className="text-amber-700">Drill not found: {drillId}</p>
        </CardContent>
      </Card>
    );
  }

  const question = drill.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const progress = ((currentQuestion + (completed ? 1 : 0)) / drill.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowHint(false);
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
    setAnswers([...answers, selectedAnswer!]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < drill.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      // Drill complete
      setCompleted(true);
      const finalAnswers = [...answers, selectedAnswer!];
      const result = isModule1Drill(drill) 
        ? calculateModule1DrillScore(drill, finalAnswers)
        : calculateDrillScore(drill as Drill, finalAnswers);
      onComplete?.(result.score, result.passed);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCompleted(false);
  };

  if (completed) {
    const result = isModule1Drill(drill) 
      ? calculateModule1DrillScore(drill, answers)
      : calculateDrillScore(drill as Drill, answers);
    return (
      <Card className="border-[#003366]/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${result.passed ? "bg-emerald-100" : "bg-amber-100"}`}>
              {result.passed ? (
                <Award className="w-5 h-5 text-emerald-700" />
              ) : (
                <Target className="w-5 h-5 text-amber-700" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg text-[#003366]">
                {result.passed ? "Drill Complete!" : "Keep Practicing"}
              </CardTitle>
              <p className="text-sm text-gray-500">{drill.title}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-6 rounded-lg text-center ${result.passed ? "bg-emerald-50" : "bg-amber-50"}`}>
            <div className={`text-4xl font-bold mb-2 ${result.passed ? "text-emerald-600" : "text-amber-600"}`}>
              {result.score}%
            </div>
            <p className={result.passed ? "text-emerald-700" : "text-amber-700"}>
              {answers.filter((a, i) => a === drill.questions[i].correctIndex).length} of {drill.questions.length} correct
            </p>
            {result.passed ? (
              <p className="text-sm text-emerald-600 mt-2">
                You&apos;re ready to proceed to the quiz!
              </p>
            ) : (
              <p className="text-sm text-amber-600 mt-2">
                You need 70% to pass. Review the material and try again.
              </p>
            )}
          </div>

          <Button onClick={handleRestart} variant="outline" className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#003366]/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Target className="w-5 h-5 text-violet-700" />
            </div>
            <div>
              <CardTitle className="text-lg text-[#003366]">{drill.title}</CardTitle>
              <p className="text-sm text-gray-500">{drill.description}</p>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} / {drill.questions.length}
          </span>
        </div>
        <Progress value={progress} className="mt-3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900">{question.question}</p>
        </div>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            let buttonClass = "w-full justify-start text-left p-4 h-auto";
            
            if (showFeedback) {
              if (index === question.correctIndex) {
                buttonClass += " bg-emerald-100 border-emerald-500 hover:bg-emerald-100";
              } else if (index === selectedAnswer && !isCorrect) {
                buttonClass += " bg-red-100 border-red-500 hover:bg-red-100";
              }
            } else if (selectedAnswer === index) {
              buttonClass += " bg-[#003366]/10 border-[#003366]";
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={buttonClass}
                onClick={() => handleSelectAnswer(index)}
                disabled={showFeedback}
              >
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showFeedback && index === question.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {showFeedback && index === selectedAnswer && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </Button>
            );
          })}
        </div>

        {!showFeedback && question.hint && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="text-amber-600 hover:text-amber-700"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            {showHint ? "Hide hint" : "Need a hint?"}
          </Button>
        )}

        {showHint && !showFeedback && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-700">{question.hint}</p>
          </div>
        )}

        {showFeedback && (
          <div className={`rounded-lg p-4 ${isCorrect ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
            <p className={`font-medium ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
              {isCorrect ? "Correct!" : "Not quite right"}
            </p>
            <p className="text-sm text-gray-700 mt-1">{question.explanation}</p>
            
            {/* Remediation link for wrong answers (Module 1 drills) */}
            {!isCorrect && 'remediationStepIndex' in question && question.remediationStepIndex !== undefined && onRemediation && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-amber-700 hover:text-amber-800 hover:bg-amber-100"
                onClick={() => onRemediation(question.remediationStepIndex!)}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {(question as M1DrillQuestion).remediationLabel || "Review this step"}
              </Button>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-[#003366] hover:bg-[#002244]"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-[#003366] hover:bg-[#002244]"
            >
              {currentQuestion < drill.questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                "See Results"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
