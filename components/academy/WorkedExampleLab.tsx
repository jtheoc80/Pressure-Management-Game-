"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, XCircle, RefreshCw, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WorkedField, WorkedCheckType } from "@/lib/academy/types";

interface WorkedExampleLabProps {
  title: string;
  prompt: string;
  fields: WorkedField[];
  check: WorkedCheckType;
  explanation?: string;
}

interface FieldState {
  value: string;
  status: "idle" | "correct" | "incorrect";
}

export function WorkedExampleLab({ title, prompt, fields, check, explanation }: WorkedExampleLabProps) {
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(
    fields.reduce((acc, field) => {
      acc[field.key] = { value: "", status: "idle" };
      return acc;
    }, {} as Record<string, FieldState>)
  );
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const validateField = (field: WorkedField, value: string): boolean => {
    if (!field.correctAnswer) return true;
    
    const numValue = parseFloat(value);
    const correctNum = typeof field.correctAnswer === "number" 
      ? field.correctAnswer 
      : parseFloat(field.correctAnswer);
    
    if (isNaN(numValue) || isNaN(correctNum)) {
      return value.toLowerCase().trim() === String(field.correctAnswer).toLowerCase().trim();
    }
    
    // Allow 5% tolerance for numerical answers
    const tolerance = Math.abs(correctNum * 0.05);
    return Math.abs(numValue - correctNum) <= Math.max(tolerance, 0.1);
  };

  const handleSubmit = () => {
    const newStates = { ...fieldStates };
    let allCorrect = true;

    fields.forEach((field) => {
      const isCorrect = validateField(field, newStates[field.key].value);
      newStates[field.key].status = isCorrect ? "correct" : "incorrect";
      if (!isCorrect) allCorrect = false;
    });

    setFieldStates(newStates);
    setSubmitted(true);

    if (allCorrect) {
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setFieldStates(
      fields.reduce((acc, field) => {
        acc[field.key] = { value: "", status: "idle" };
        return acc;
      }, {} as Record<string, FieldState>)
    );
    setSubmitted(false);
    setShowExplanation(false);
  };

  const handleChange = (key: string, value: string) => {
    setFieldStates((prev) => ({
      ...prev,
      [key]: { value, status: "idle" },
    }));
    setSubmitted(false);
  };

  const getCheckTypeHint = (): string => {
    switch (check) {
      case "unit_sanity":
        return "Check that your units are consistent and make physical sense.";
      case "psig_psia":
        return "Remember: psia = psig + 14.7 (atmospheric pressure at sea level)";
      case "f_to_r":
        return "Remember: °R = °F + 459.67 (absolute temperature)";
      case "bp_percent":
        return "Calculate backpressure as a percentage of set pressure.";
      default:
        return "";
    }
  };

  const allCorrect = submitted && Object.values(fieldStates).every((s) => s.status === "correct");

  return (
    <Card className="border-[#003366]/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Calculator className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <CardTitle className="text-lg text-[#003366]">Practice: {title}</CardTitle>
            <p className="text-sm text-gray-500">Interactive mini-lab</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-gray-700">{prompt}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-700">{getCheckTypeHint()}</p>
        </div>

        <div className="grid gap-4">
          {fields.map((field) => {
            const state = fieldStates[field.key];
            return (
              <div key={field.key} className="space-y-1">
                <Label htmlFor={field.key} className="flex items-center gap-2">
                  {field.label}
                  {field.unit && <span className="text-gray-500">({field.unit})</span>}
                  {state.status === "correct" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                  {state.status === "incorrect" && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </Label>
                <Input
                  id={field.key}
                  type="text"
                  value={state.value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`
                    ${state.status === "correct" ? "border-emerald-500 bg-emerald-50" : ""}
                    ${state.status === "incorrect" ? "border-red-500 bg-red-50" : ""}
                  `}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {state.status === "incorrect" && field.correctAnswer && (
                  <p className="text-sm text-red-600">
                    Correct answer: {field.correctAnswer} {field.unit}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSubmit}
            disabled={Object.values(fieldStates).some((s) => !s.value)}
            className="bg-[#003366] hover:bg-[#002244]"
          >
            Check My Answers
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {allCorrect && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Excellent work!
            </div>
            {explanation && showExplanation && (
              <p className="text-sm text-emerald-600 mt-2">{explanation}</p>
            )}
          </div>
        )}

        {submitted && !allCorrect && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-700">
              Review the incorrect fields above and try again. Check your units and calculations.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
