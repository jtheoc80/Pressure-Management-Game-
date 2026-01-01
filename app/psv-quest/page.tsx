"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { useSafeUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LevelCard } from "@/components/psv/LevelCard";
import { CompetencyBars } from "@/components/psv/CompetencyBars";
import { scenarios, getProfile, getRankProgress } from "@/lib/psv";
import { getXPReward } from "@/lib/psv/brand";
import { getRequiredLessonsForUnlock } from "@/lib/academy/lessons";
import type { PlayerProfile, Scenario } from "@/lib/psv/types";
import type { UserProgress } from "@/lib/academy/types";

export default function PSVQuestLobby() {
  const { isSignedIn, isLoaded: clerkLoaded } = useSafeUser();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [academyProgress, setAcademyProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Load local game profile
      setProfile(getProfile());
      
      // Load academy progress if signed in
      if (isSignedIn) {
        try {
          const res = await fetch("/api/progress/get");
          if (res.ok) {
            const data = await res.json();
            setAcademyProgress(data);
          }
        } catch (error) {
          console.error("Failed to load academy progress:", error);
        }
      }
      
      setIsLoading(false);
    };
    
    if (clerkLoaded) {
      loadData();
    }
  }, [isSignedIn, clerkLoaded]);

  // Check if PSV play is unlocked
  const isPSVUnlocked = academyProgress?.unlocks.psv_play || false;
  const isCoachModeOn = academyProgress?.coachModeEnabled ?? true;
  const requiredLessons = getRequiredLessonsForUnlock("psv_play");

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  const rankProgress = getRankProgress(profile.xp);

  // Find the next recommended scenario
  const getNextScenario = (): Scenario | null => {
    for (const scenario of scenarios) {
      if (!profile.completedScenarios.includes(scenario.id)) {
        return scenario;
      }
    }
    // If all completed, return the one with lowest score for improvement
    let lowestScoreScenario = scenarios[0];
    let lowestScore = profile.scenarioBestScores[scenarios[0].id] || 100;
    for (const scenario of scenarios) {
      const score = profile.scenarioBestScores[scenario.id] || 100;
      if (score < lowestScore) {
        lowestScore = score;
        lowestScoreScenario = scenario;
      }
    }
    return lowestScoreScenario;
  };

  const nextScenario = getNextScenario();

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0B1F3B] to-[#12345A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span>PSV Sizing Quest</span>
              </div>
              <h1 className="text-2xl font-bold">PSV Sizing Quest</h1>
              <p className="text-white/70 text-sm mt-0.5">
                Master pressure safety valve selection
              </p>
            </div>
            <div className="text-right">
              {isSignedIn ? (
                <div className="flex items-center gap-2">
                  {isCoachModeOn && (
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-200 text-xs rounded-full">
                      🎓 Coach Mode
                    </span>
                  )}
                  <Link href="/learn">
                    <Button variant="secondary" size="sm">
                      Training Academy
                    </Button>
                  </Link>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="secondary" size="sm">
                    Sign in to play
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Auth & Gating Check */}
        {!isSignedIn && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertDescription className="flex items-center justify-between">
              <span className="text-amber-800">
                Sign in to track your progress and unlock scenarios by completing the Training Academy.
              </span>
              <SignInButton mode="modal">
                <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                  Sign In
                </Button>
              </SignInButton>
            </AlertDescription>
          </Alert>
        )}

        {isSignedIn && !isPSVUnlocked && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-blue-800">Complete PSV Basics to unlock gameplay</span>
                  <p className="text-sm text-blue-600 mt-1">
                    Finish the {requiredLessons.length} required lessons in the Training Academy to access scenarios.
                  </p>
                </div>
                <Link href="/learn">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Go to Academy
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Player Stats */}
          <div className="lg:col-span-4 space-y-4">
            {/* Rank Card */}
            <Card className="border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-br from-[#0B1F3B] to-[#12345A] p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getRankIcon(profile.rank)}</div>
                  <div className="flex-1">
                    <div className="text-xs text-white/60">Current Rank</div>
                    <div className="text-xl font-bold">{profile.rank}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{profile.xp}</div>
                    <div className="text-xs text-white/60">Total XP</div>
                  </div>
                </div>
                
                {/* XP Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Progress</span>
                    <span className="text-white/80">
                      {rankProgress.nextRank 
                        ? `${rankProgress.xpForNext - profile.xp} XP to ${rankProgress.nextRank}`
                        : "Max rank achieved!"}
                    </span>
                  </div>
                  <Progress
                    value={rankProgress.progressToNext}
                    className="h-2 bg-white/20"
                  />
                </div>
              </div>
              
              {/* Stats Row */}
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold text-slate-800">
                      {profile.completedScenarios.length}
                    </div>
                    <div className="text-xs text-slate-500">Completed</div>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold text-slate-800">
                      {profile.badges.length}
                    </div>
                    <div className="text-xs text-slate-500">Badges</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coach Mode Card */}
            {isSignedIn && isCoachModeOn && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <h3 className="font-semibold text-amber-800">Coach Mode Active</h3>
                      <p className="text-xs text-amber-600 mt-1">
                        You&apos;ll see hints, term definitions, and guided feedback during scenarios.
                        Complete all PSV lessons to unlock Expert Mode.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Mission Mini Card */}
            {isPSVUnlocked && nextScenario && (
              <Card className="border-slate-200 border-l-4 border-l-emerald-500">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                      Recommended Next
                    </span>
                    <span className="text-xs text-slate-400">
                      +{getXPReward(nextScenario.difficulty)} XP
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1">
                    {nextScenario.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-1">
                    {nextScenario.description}
                  </p>
                  <Link href={`/psv-quest/${nextScenario.id}`}>
                    <Button 
                      size="sm" 
                      className="w-full h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    >
                      Start Mission
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Skill Progress Card */}
            <Card className="border-slate-200">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Skill Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <CompetencyBars 
                  badges={profile.badges} 
                  completedScenarios={profile.completedScenarios}
                />
              </CardContent>
            </Card>

            {/* Earned Badges */}
            {profile.badges.length > 0 && (
              <Card className="border-slate-200">
                <CardHeader className="pb-2 pt-3 px-4">
                  <CardTitle className="text-sm font-semibold text-slate-700">
                    Earned Badges
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-full text-xs"
                        title={badge.description}
                      >
                        <span>{badge.icon}</span>
                        <span className="font-medium text-slate-700">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Coaching Tips */}
            {profile.mistakeBank.length > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="pb-2 pt-3 px-4">
                  <CardTitle className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Tips for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <ul className="space-y-1.5">
                    {profile.mistakeBank.slice(0, 2).map((mistake, index) => (
                      <li
                        key={index}
                        className="text-xs text-amber-700 flex items-start gap-2"
                      >
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span className="line-clamp-2">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Scenarios */}
          <div className="lg:col-span-8 space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Training Scenarios
                </h2>
                <p className="text-xs text-slate-500">
                  {scenarios.length} missions available • {profile.completedScenarios.length} completed
                </p>
              </div>
              {isPSVUnlocked && nextScenario && (
                <Link href={`/psv-quest/${nextScenario.id}`}>
                  <Button 
                    size="sm" 
                    className="h-8 px-4 bg-[#0B1F3B] hover:bg-[#12345A] text-white text-xs"
                  >
                    Next Mission →
                  </Button>
                </Link>
              )}
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {scenarios.map((scenario, index) => {
                // Check unlock status
                const prevCompleted = index === 0 || profile.completedScenarios.includes(scenarios[index - 1].id);
                const isLockedByProgress = index > 0 && !prevCompleted;
                const isLockedByTraining = !isPSVUnlocked;
                const isLocked = isLockedByTraining || isLockedByProgress;

                const unlockReq = isLockedByTraining
                  ? "Complete PSV training first"
                  : index === 0 
                    ? ""
                    : `Complete "${scenarios[index - 1].title}" first`;

                return (
                  <LevelCard
                    key={scenario.id}
                    scenario={scenario}
                    isLocked={isLocked}
                    bestScore={profile.scenarioBestScores[scenario.id]}
                    attemptCount={profile.scenarioAttempts[scenario.id] || 0}
                    currentXP={profile.xp}
                    unlockRequirement={unlockReq}
                  />
                );
              })}
            </div>

            {/* Info Notice */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-slate-100 rounded-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-0.5">
                    Training Mode
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    These scenarios are for training purposes only. Grades are based on answer keys – 
                    no actual sizing calculations are performed. Always consult engineering standards 
                    for real-world applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div>PSV Sizing Quest – Puffer Training Platform</div>
            <div className="flex items-center gap-3">
              <Link href="/learn" className="hover:text-slate-700">Academy</Link>
              <span className="text-slate-300">•</span>
              <Link href="/glossary" className="hover:text-slate-700">Glossary</Link>
              <span className="text-slate-300">•</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
