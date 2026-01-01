"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Quiz as QuizType } from "@/lib/academy/types";

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number, passed: boolean) => void;
  bestScore?: number;
}

export function Quiz({ quiz, onComplete, bestScore }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleSelectAnswer = (optionIndex: number) => {
    if (showExplanation) return; // Can't change after seeing explanation
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate final score
      calculateAndShowResults();
    }
  };

  const calculateAndShowResults = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / totalQuestions) * 100);
    setShowResults(true);
    onComplete(score, score >= quiz.passingScore);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanation(false);
  };

  const getScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQuestions) * 100);
  };

  if (showResults) {
    const score = getScore();
    const passed = score >= quiz.passingScore;

    return (
      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`text-center p-6 rounded-lg ${passed ? "bg-emerald-50" : "bg-amber-50"}`}>
            <div className={`text-4xl font-bold mb-2 ${passed ? "text-emerald-600" : "text-amber-600"}`}>
              {score}%
            </div>
            <div className={`text-sm ${passed ? "text-emerald-700" : "text-amber-700"}`}>
              {passed ? "🎉 Congratulations! You passed!" : "Keep learning and try again!"}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Passing score: {quiz.passingScore}%
            </div>
          </div>

          {bestScore !== undefined && bestScore > 0 && (
            <div className="text-center text-sm text-slate-600">
              Your best score: <span className="font-semibold">{bestScore}%</span>
            </div>
          )}

          {/* Question Review */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-semibold text-sm text-slate-700">Review Answers</h4>
            {quiz.questions.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-lg text-sm ${
                    isCorrect ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={isCorrect ? "text-emerald-600" : "text-red-600"}>
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">Q{idx + 1}: {q.question}</div>
                      {!isCorrect && (
                        <div className="mt-1 text-xs">
                          <span className="text-red-600">Your answer: {q.options[userAnswer]}</span>
                          <br />
                          <span className="text-emerald-600">Correct: {q.options[q.correctIndex]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4">
            {!passed && (
              <Button onClick={handleRetry} variant="outline" className="flex-1">
                Try Again
              </Button>
            )}
            {passed && (
              <Button 
                onClick={() => onComplete(score, true)} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Continue to Next Lesson
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            {quiz.title}
          </CardTitle>
          <span className="text-xs text-slate-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question */}
        <div className="py-2">
          <h3 className="text-base font-semibold text-slate-800">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectOption = idx === currentQuestion.correctIndex;

            let optionStyle = "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50";
            if (showExplanation) {
              if (isCorrectOption) {
                optionStyle = "bg-emerald-50 border-emerald-300";
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "bg-red-50 border-red-300";
              }
            } else if (isSelected) {
              optionStyle = "bg-blue-50 border-blue-300";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                disabled={showExplanation}
                className={`w-full p-3 text-left rounded-lg border transition-all ${optionStyle} ${
                  showExplanation ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border ${
                      showExplanation && isCorrectOption
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : showExplanation && isSelected && !isCorrectOption
                        ? "bg-red-500 text-white border-red-500"
                        : isSelected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-slate-600 border-slate-300"
                    }`}
                  >
                    {showExplanation && isCorrectOption
                      ? "✓"
                      : showExplanation && isSelected && !isCorrectOption
                      ? "✗"
                      : String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm text-slate-700 flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className={isCorrect ? "text-emerald-600" : "text-amber-600"}>
                {isCorrect ? "✓ Correct!" : "Not quite right."}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        {showExplanation && (
          <div className="flex justify-end pt-2">
            <Button onClick={handleNext}>
              {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
