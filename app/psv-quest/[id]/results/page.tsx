"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBreakdown, CompetencyChips } from "@/components/psv";
import { AccessModeBanner } from "@/components/PreviewModeBanner";
import { isGuestAccessEnabled } from "@/lib/guest-access";
import {
  getScenarioById,
  scenarios,
  getProfile,
  updateProfileWithResult,
  saveAttempt,
} from "@/lib/psv";
import type { GradeResult, Scenario, PlayerProfile, AttemptRecord } from "@/lib/psv/types";

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const scenarioId = params.id as string;

  const [result, setResult] = useState<GradeResult | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  
  // Detect preview mode from URL
  const isPreviewMode = searchParams.get("preview") === "1";
  
  // Check if guest access mode is enabled
  const isGuestMode = useMemo(() => {
    if (isGuestAccessEnabled()) return true;
    if (typeof window !== "undefined") {
      return document.cookie.includes("guest_access=true");
    }
    return false;
  }, []);
  
  // Combined access mode
  const hasFullAccess = isGuestMode || isPreviewMode;

  useEffect(() => {
    const loadData = () => {
      // Load result from sessionStorage
      const storedResult = sessionStorage.getItem(`psv:result:${scenarioId}`);
      if (storedResult) {
        const parsedResult = JSON.parse(storedResult) as GradeResult;
        setResult(parsedResult);

        // Update profile only once - SKIP in guest/preview mode to avoid polluting progress
        if (!profileUpdated && !hasFullAccess) {
          const updatedProfile = updateProfileWithResult(scenarioId, parsedResult);
          setProfile(updatedProfile);

          // Save attempt record
          const attemptRecord: AttemptRecord = {
            attemptId: `${scenarioId}-${Date.now()}`,
            timestamp: new Date().toISOString(),
            score: parsedResult.score,
            pointsEarned: parsedResult.pointsEarned ?? parsedResult.xpAwarded,
            breakdown: parsedResult.breakdown,
            answers: parsedResult.correctAnswers, // Using correct answers as submitted (for display purposes)
            datasheet: { scenarioId } as Partial<import("@/lib/psv/types").Datasheet> as import("@/lib/psv/types").Datasheet, // Minimal datasheet for record
            mode: parsedResult.mode || "standard",
          };
          saveAttempt(scenarioId, attemptRecord);

          setProfileUpdated(true);
        } else if (hasFullAccess) {
          // In guest/preview mode, just load profile without updating
          setProfile(getProfile());
          setProfileUpdated(true);
        }
      }

      // Load scenario
      const loadedScenario = getScenarioById(scenarioId);
      if (loadedScenario) {
        setScenario(loadedScenario);
      }

      // Load profile if not already loaded
      if (!profile) {
        setProfile(getProfile());
      }

      setIsLoading(false);
    };
    loadData();
  }, [scenarioId, profileUpdated, profile, hasFullAccess]);

  // Find next scenario
  const currentIndex = scenarios.findIndex((s) => s.id === scenarioId);
  const nextScenario = scenarios[currentIndex + 1];

  // Find next hard-eligible scenario if current was hard
  const nextHardScenario = result?.mode === "hard" 
    ? scenarios.find((s, i) => i > currentIndex && s.isHardEligible)
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--puffer-bg)] flex items-center justify-center">
        <div className="text-[var(--puffer-gray)]">Loading results...</div>
      </div>
    );
  }

  if (!result || !scenario) {
    return (
      <div className="min-h-screen bg-[var(--puffer-bg)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[var(--puffer-navy)] mb-4">
            No results found
          </h2>
          <p className="text-[var(--puffer-gray)] mb-6">
            Please complete the scenario first.
          </p>
          <Link href={`/psv-quest/${scenarioId}`}>
            <Button className="bg-[var(--puffer-navy)] hover:bg-[var(--puffer-navy-2)]">
              Go to Scenario
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🎉";
    if (score >= 80) return "👍";
    if (score >= 70) return "📈";
    if (score >= 60) return "💪";
    return "📚";
  };

  const getModeLabel = () => {
    switch (result.mode) {
      case "hard":
        return (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded ml-2">
            HARD MODE
          </span>
        );
      case "practice":
        return (
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded ml-2">
            PRACTICE
          </span>
        );
      default:
        return null;
    }
  };

  const hasCriticalMistakes =
    result.criticalMistakes && result.criticalMistakes.length > 0;
  const hasCaps = result.capsApplied && result.capsApplied.length > 0;

  return (
    <div className={`min-h-screen bg-[var(--puffer-bg)] ${hasFullAccess ? "pt-8" : ""}`}>
      {/* Access Mode Banner (Guest or Preview) */}
      <AccessModeBanner isPreviewMode={isPreviewMode} isGuestMode={isGuestMode} />
      
      {/* Header */}
      <header className="bg-white border-b border-[var(--puffer-border)]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/psv-quest"
                className="text-[var(--puffer-gray)] hover:text-[var(--puffer-navy)] transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <div className="flex items-center">
                  <h1 className="font-semibold text-[var(--puffer-navy)]">
                    Results: {scenario.title}
                  </h1>
                  {getModeLabel()}
                </div>
                <p className="text-xs text-[var(--puffer-gray)]">
                  Scenario completed • Review your performance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-[var(--puffer-bg)] text-[var(--puffer-navy)] border-[var(--puffer-border)]"
              >
                {getScoreEmoji(result.score)} Score: {result.score}/100
              </Badge>
              <Badge
                variant="outline"
                className={`${
                  result.mode === "hard"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                +{result.pointsEarned ?? result.xpAwarded} pts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Critical Mistakes Alert */}
          {hasCriticalMistakes && (
            <Card className="border-red-300 bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-red-800 flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Critical Mistakes Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.criticalMistakes.map((mistake, index) => (
                    <li
                      key={index}
                      className="text-sm text-red-700 flex items-start gap-2"
                    >
                      <span className="text-red-500 mt-0.5 font-bold">!</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
                {hasCaps && (
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <p className="text-xs text-red-600 font-medium">
                      Score capped due to critical errors:
                    </p>
                    {result.capsApplied.map((cap, index) => (
                      <p key={index} className="text-xs text-red-600 mt-1">
                        • {cap}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Score Breakdown */}
          <ScoreBreakdown result={result} />

          {/* Guest/Preview Mode Notice */}
          {hasFullAccess && (
            <Card className={`${isGuestMode ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isGuestMode ? "👤" : "⚠️"}</span>
                  <div>
                    <h4 className={`font-semibold ${isGuestMode ? "text-emerald-800" : "text-amber-800"}`}>
                      {isGuestMode ? "Guest Access Mode" : "Preview Mode Active"}
                    </h4>
                    <p className={`text-sm ${isGuestMode ? "text-emerald-700" : "text-amber-700"}`}>
                      This attempt was not saved. XP, badges, and progress were not recorded.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Points Summary (New) */}
          <Card className="border-[var(--puffer-border)]">
            <CardHeader>
              <CardTitle className="text-base text-[var(--puffer-navy)]">
                Points Earned {hasFullAccess && <span className={`text-sm font-normal ${isGuestMode ? "text-emerald-600" : "text-amber-600"}`}>(Not Saved)</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                  <div className="text-sm text-[var(--puffer-gray)] mb-1">
                    Base Points
                  </div>
                  <div className="text-xl font-bold text-[var(--puffer-navy)]">
                    {scenario.basePoints}
                  </div>
                </div>
                <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                  <div className="text-sm text-[var(--puffer-gray)] mb-1">
                    Score
                  </div>
                  <div className="text-xl font-bold text-[var(--puffer-navy)]">
                    {result.score}%
                  </div>
                </div>
                <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                  <div className="text-sm text-[var(--puffer-gray)] mb-1">
                    Mode Multiplier
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      result.mode === "hard"
                        ? "text-red-600"
                        : result.mode === "practice"
                        ? "text-slate-600"
                        : "text-[var(--puffer-navy)]"
                    }`}
                  >
                    {result.mode === "hard"
                      ? "×2.0"
                      : result.mode === "practice"
                      ? "×0.75"
                      : "×1.0"}
                  </div>
                </div>
                <div
                  className={`text-center p-3 rounded-lg ${
                    result.mode === "hard"
                      ? "bg-red-100"
                      : "bg-emerald-100"
                  }`}
                >
                  <div
                    className={`text-sm mb-1 ${
                      result.mode === "hard"
                        ? "text-red-700"
                        : "text-emerald-700"
                    }`}
                  >
                    Total Earned
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      result.mode === "hard"
                        ? "text-red-800"
                        : "text-emerald-800"
                    }`}
                  >
                    +{result.pointsEarned ?? result.xpAwarded}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* XP and Progress Summary */}
          {profile && (
            <Card className="border-[var(--puffer-border)]">
              <CardHeader>
                <CardTitle className="text-base text-[var(--puffer-navy)]">
                  Progress Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      +{result.pointsEarned ?? result.xpAwarded}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">
                      XP Earned
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.xp}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">
                      Total XP
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.rank}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">
                      Current Rank
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.completedScenarios.length}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">
                      Scenarios Done
                    </div>
                  </div>
                </div>

                {/* Hard Mode Progress */}
                {profile.hardModeProgress && !profile.hardModeProgress.isUnlocked && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-amber-800">
                          Hard Mode Progress
                        </h4>
                        <p className="text-xs text-amber-700 mt-1">
                          Score ≥85 on standard mode to qualify
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-amber-800">
                          {profile.hardModeProgress.qualifyingAttempts || 0}/3
                        </div>
                        <div className="text-xs text-amber-600">
                          qualifying attempts
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {profile.hardModeProgress?.isUnlocked && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🔓</span>
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-800">
                          Hard Mode Unlocked!
                        </h4>
                        <p className="text-xs text-emerald-700">
                          Challenge yourself with Hard Mode scenarios for 2× points
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="mt-6">
                  <CompetencyChips badges={profile.badges} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href={`/psv-quest/${scenarioId}`}>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-[var(--puffer-border)]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <path d="M1 4v6h6M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
                Try Again
              </Button>
            </Link>

            {result.mode === "hard" && nextHardScenario ? (
              <Link href={`/psv-quest/${nextHardScenario.id}?mode=hard`}>
                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                  Next Hard Scenario
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            ) : nextScenario ? (
              <Link href={`/psv-quest/${nextScenario.id}`}>
                <Button className="w-full sm:w-auto bg-[var(--puffer-navy)] hover:bg-[var(--puffer-navy-2)]">
                  Next Scenario
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            ) : (
              <Link href="/psv-quest">
                <Button className="w-full sm:w-auto bg-[var(--puffer-navy)] hover:bg-[var(--puffer-navy-2)]">
                  Back to Lobby
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-2"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </Button>
              </Link>
            )}
          </div>

          {/* Completion message */}
          {!nextScenario && (
            <Card className="border-[var(--puffer-border)] bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  All Scenarios Completed!
                </h3>
                <p className="text-sm text-green-700">
                  Congratulations! You&apos;ve completed all available training
                  scenarios. Keep practicing to improve your scores and unlock
                  more badges.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--puffer-border)] bg-white mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-[var(--puffer-gray)]">
            PSV Sizing Quest – Training Mode • Results are for learning purposes
            only
          </div>
        </div>
      </footer>
    </div>
  );
}
