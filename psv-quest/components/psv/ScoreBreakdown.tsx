"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { GradeResult, DatasheetField, PlayerAnswers } from "@/lib/psv/types";
import { FIELD_METADATA } from "@/lib/psv/datasheetSchema";

interface ScoreBreakdownProps {
  result: GradeResult;
}

export function ScoreBreakdown({ result }: ScoreBreakdownProps) {
  const { breakdown, mistakes, missingFields, remediationSteps, correctAnswers } = result;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: "A", label: "Excellent" };
    if (score >= 80) return { grade: "B", label: "Good" };
    if (score >= 70) return { grade: "C", label: "Satisfactory" };
    if (score >= 60) return { grade: "D", label: "Needs Improvement" };
    return { grade: "F", label: "Review Required" };
  };

  const grade = getGrade(result.score);

  const formatFieldName = (field: DatasheetField): string => {
    return FIELD_METADATA[field]?.label || field;
  };

  const formatAnswer = (key: keyof PlayerAnswers, value: string): string => {
    return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-4">
      {/* Overall Score Card */}
      <Card className="border-[var(--puffer-border)] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--puffer-navy)] to-[var(--puffer-navy-2)] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Score</h2>
              <p className="text-white/80 text-sm mt-1">{grade.label}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{result.score}</div>
              <div className="text-white/60 text-sm">/100</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress
              value={result.score}
              className="h-3 bg-white/20"
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              Grade: {grade.grade}
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              +{result.xpAwarded} XP
            </Badge>
          </div>
        </div>
      </Card>

      {/* Score Breakdown */}
      <Card className="border-[var(--puffer-border)]">
        <CardHeader>
          <CardTitle className="text-base text-[var(--puffer-navy)]">
            Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Datasheet Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--puffer-gray)]">
                Datasheet Completeness
              </span>
              <span className={`text-sm font-semibold ${getScoreColor(
                (breakdown.datasheetScore / breakdown.datasheetMax) * 100
              )}`}>
                {breakdown.datasheetScore}/{breakdown.datasheetMax}
              </span>
            </div>
            <Progress
              value={(breakdown.datasheetScore / breakdown.datasheetMax) * 100}
              className="h-2"
            />
          </div>

          {/* Decision Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--puffer-gray)]">
                Decision Correctness
              </span>
              <span className={`text-sm font-semibold ${getScoreColor(
                (breakdown.decisionScore / breakdown.decisionMax) * 100
              )}`}>
                {breakdown.decisionScore}/{breakdown.decisionMax}
              </span>
            </div>
            <Progress
              value={(breakdown.decisionScore / breakdown.decisionMax) * 100}
              className="h-2"
            />
          </div>

          {/* Discipline Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--puffer-gray)]">
                Process Discipline
              </span>
              <span className={`text-sm font-semibold ${getScoreColor(
                (breakdown.disciplineScore / breakdown.disciplineMax) * 100
              )}`}>
                {breakdown.disciplineScore}/{breakdown.disciplineMax}
              </span>
            </div>
            <Progress
              value={(breakdown.disciplineScore / breakdown.disciplineMax) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Correct Answers */}
      <Card className="border-[var(--puffer-border)]">
        <CardHeader>
          <CardTitle className="text-base text-[var(--puffer-navy)]">
            Correct Answers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">
                Relieving Case
              </p>
              <p className="text-sm font-semibold text-green-900">
                {formatAnswer("relievingCase", correctAnswers.relievingCase)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">
                Valve Style
              </p>
              <p className="text-sm font-semibold text-green-900">
                {formatAnswer("valveStyle", correctAnswers.valveStyle)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">
                Orifice Letter
              </p>
              <p className="text-sm font-semibold text-green-900">
                {correctAnswers.orificeLetter}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mistakes */}
      {mistakes.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-base text-red-800 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mistakes.map((mistake, index) => (
                <li
                  key={index}
                  className="text-sm text-red-700 flex items-start gap-2"
                >
                  <span className="text-red-500 mt-0.5">•</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Missing Fields */}
      {missingFields.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-base text-yellow-800 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Missing Datasheet Fields
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {missingFields.map((field) => (
                <Badge
                  key={field}
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                >
                  {formatFieldName(field)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Remediation Steps */}
      <Card className="border-[var(--puffer-border)]">
        <CardHeader>
          <CardTitle className="text-base text-[var(--puffer-navy)] flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Learning Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {remediationSteps.map((step, index) => (
              <li
                key={index}
                className="text-sm text-[var(--puffer-gray)] flex items-start gap-2"
              >
                <span className="text-[var(--puffer-navy)] font-semibold">
                  {index + 1}.
                </span>
                {step}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
