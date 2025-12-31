"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBreakdown, CompetencyChips } from "@/components/psv";
import { getScenarioById, scenarios, getProfile } from "@/lib/psv";
import type { GradeResult, Scenario, PlayerProfile } from "@/lib/psv/types";

export default function ResultsPage() {
  const params = useParams();
  const scenarioId = params.id as string;

  const [result, setResult] = useState<GradeResult | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      // Load result from sessionStorage
      const storedResult = sessionStorage.getItem(`psv:result:${scenarioId}`);
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      }

      // Load scenario
      const loadedScenario = getScenarioById(scenarioId);
      if (loadedScenario) {
        setScenario(loadedScenario);
      }

      // Load updated profile
      setProfile(getProfile());
      setIsLoading(false);
    };
    loadData();
  }, [scenarioId]);

  // Find next scenario
  const currentIndex = scenarios.findIndex((s) => s.id === scenarioId);
  const nextScenario = scenarios[currentIndex + 1];

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

  return (
    <div className="min-h-screen bg-[var(--puffer-bg)]">
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
                <h1 className="font-semibold text-[var(--puffer-navy)]">
                  Results: {scenario.title}
                </h1>
                <p className="text-xs text-[var(--puffer-gray)]">
                  Scenario completed • Review your performance
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-[var(--puffer-bg)] text-[var(--puffer-navy)] border-[var(--puffer-border)]"
            >
              {getScoreEmoji(result.score)} {result.score}/100
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Score Breakdown */}
          <ScoreBreakdown result={result} />

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
                      +{result.xpAwarded}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">XP Earned</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.xp}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">Total XP</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--puffer-bg)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.rank}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">Current Rank</div>
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

            {nextScenario ? (
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
                  Congratulations! You&apos;ve completed all available training scenarios.
                  Keep practicing to improve your scores and unlock more badges.
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
            PSV Sizing Quest – Training Mode • Results are for learning purposes only
          </div>
        </div>
      </footer>
    </div>
  );
}
