"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LevelCard, CompetencyChips } from "@/components/psv";
import { scenarios, getProfile, getRankProgress } from "@/lib/psv";
import type { PlayerProfile } from "@/lib/psv/types";

export default function PSVQuestLobby() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = () => {
      setProfile(getProfile());
      setIsLoading(false);
    };
    loadProfile();
  }, []);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-[var(--puffer-bg)] flex items-center justify-center">
        <div className="text-[var(--puffer-gray)]">Loading...</div>
      </div>
    );
  }

  const rankProgress = getRankProgress(profile.xp);

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case "Lead":
        return "🏆";
      case "Specialist":
        return "⭐";
      case "Technician":
        return "🔧";
      default:
        return "📚";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--puffer-bg)]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--puffer-navy)] to-[var(--puffer-navy-2)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PSV Sizing Quest</h1>
              <p className="text-white/80 mt-1">
                Master pressure safety valve selection through realistic scenarios
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Puffer Training</div>
              <div className="text-xs text-white/40 mt-1">
                For training purposes only
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Player Stats */}
          <div className="space-y-6">
            {/* Rank & XP Card */}
            <Card className="border-[var(--puffer-border)] overflow-hidden">
              <div className="bg-gradient-to-br from-[var(--puffer-navy)] to-[var(--puffer-navy-2)] p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{getRankIcon(profile.rank)}</div>
                  <div>
                    <div className="text-sm text-white/60">Current Rank</div>
                    <div className="text-2xl font-bold">{profile.rank}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">XP Progress</span>
                    <span className="font-semibold">
                      {profile.xp} / {rankProgress.xpForNext}
                    </span>
                  </div>
                  <Progress
                    value={rankProgress.progressToNext}
                    className="h-2 bg-white/20"
                  />
                  {rankProgress.nextRank && (
                    <p className="text-xs text-white/60 mt-2">
                      {rankProgress.xpForNext - profile.xp} XP to {rankProgress.nextRank}
                    </p>
                  )}
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.completedScenarios.length}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">
                      Scenarios Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--puffer-navy)]">
                      {profile.badges.length}
                    </div>
                    <div className="text-xs text-[var(--puffer-gray)]">
                      Badges Earned
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competency Map */}
            <Card className="border-[var(--puffer-border)]">
              <CardHeader>
                <CardTitle className="text-base text-[var(--puffer-navy)]">
                  Skill Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CompetencyChips badges={profile.badges} showAll />
              </CardContent>
            </Card>

            {/* Coaching Tips */}
            {profile.mistakeBank.length > 0 && (
              <Card className="border-[var(--puffer-border)] bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-base text-amber-800 flex items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Coaching Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {profile.mistakeBank.map((mistake, index) => (
                      <li
                        key={index}
                        className="text-sm text-amber-700 flex items-start gap-2"
                      >
                        <span className="text-amber-500 mt-0.5">•</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Scenarios */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--puffer-navy)]">
                Training Scenarios
              </h2>
              <Badge
                variant="outline"
                className="bg-[var(--puffer-bg)] text-[var(--puffer-gray)] border-[var(--puffer-border)]"
              >
                {scenarios.length} Available
              </Badge>
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario, index) => {
                // First scenario always unlocked, others unlock after completing previous
                const isLocked =
                  index > 0 &&
                  !profile.completedScenarios.includes(scenarios[index - 1].id);

                return (
                  <LevelCard
                    key={scenario.id}
                    scenario={scenario}
                    isLocked={isLocked}
                    bestScore={profile.scenarioBestScores[scenario.id]}
                    attemptCount={profile.scenarioAttempts[scenario.id] || 0}
                  />
                );
              })}
            </div>

            {/* Info Alert */}
            <Alert className="border-[var(--puffer-border)] bg-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--puffer-navy)"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <AlertTitle className="text-[var(--puffer-navy)]">
                Training Mode
              </AlertTitle>
              <AlertDescription className="text-[var(--puffer-gray)]">
                These scenarios are for training purposes only. Grades are based on
                answer keys – no actual sizing calculations are performed.
                Always consult engineering standards for real-world applications.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--puffer-border)] bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-[var(--puffer-gray)]">
            <div>PSV Sizing Quest – Puffer Training Platform</div>
            <div className="flex items-center gap-4">
              <span>Version 1.0 MVP</span>
              <span>•</span>
              <span>For training purposes only</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
