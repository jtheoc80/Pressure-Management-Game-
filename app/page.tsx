"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { isClerkConfigured, useSafeUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HeroVisualCard, ProofBar, GuidedPath, Outcomes } from "@/components/landing";
import { getRequiredLessonsForUnlock } from "@/lib/academy/lessons";
import { getProfile } from "@/lib/psv";
import type { UserProgress } from "@/lib/academy/types";

export default function Home() {
  const { isSignedIn, isLoaded: clerkLoaded } = useSafeUser();
  const [academyProgress, setAcademyProgress] = useState<UserProgress | null>(null);
  const clerkConfigured = isClerkConfigured();

  useEffect(() => {
    const loadData = async () => {
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
    };

    if (clerkLoaded) {
      loadData();
    }
  }, [isSignedIn, clerkLoaded]);

  // Get unlock status and progress
  const isPSVUnlocked = academyProgress?.unlocks.psv_play || false;
  const requiredLessons = getRequiredLessonsForUnlock("psv_play");
  const completedRequired = requiredLessons.filter(
    (lesson) => academyProgress?.lessonProgress[lesson.id]?.completedAt != null
  ).length;

  // Hard mode status from local profile
  const profile = typeof window !== 'undefined' ? getProfile() : null;
  const isHardModeUnlocked = profile?.hardModeProgress?.isUnlocked || false;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0B1F3B]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="font-bold text-white text-lg">PSV Sizing Quest</span>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/learn" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Academy
            </Link>
            <Link 
              href="/psv-quest" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Scenarios
            </Link>
            <Link 
              href="/glossary" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Glossary
            </Link>
          </nav>

          {/* Right: Auth */}
          <div className="flex items-center gap-3">
            {clerkLoaded && (
              isSignedIn && clerkConfigured ? (
                <div className="flex items-center gap-3">
                  <Link href="/learn">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white/70 hover:text-white hover:bg-white/10 hidden sm:flex"
                    >
                      My Progress
                    </Button>
                  </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
              ) : (
                clerkConfigured ? (
                  <SignInButton mode="modal">
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                      Sign In
                    </Button>
                  </SignInButton>
                ) : (
                  <Link href="/sign-in">
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                      Sign In
                    </Button>
                  </Link>
                )
              )
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1F3B] via-[#12345A] to-[#0B1F3B] overflow-hidden">
        {/* Radial highlight behind hero */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(13,148,136,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(13,148,136,0.1)_0%,_transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/10">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-white/80">Puffer Training Platform</span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                PSV Sizing Quest
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg mx-auto lg:mx-0">
                Master pressure safety valve selection through guided training and realistic scenarios.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                {/* Primary CTA */}
                <Link href="/learn">
                  <Button 
                    size="lg" 
                    className="bg-teal-600 hover:bg-teal-700 text-white min-w-[180px] h-12 text-base font-semibold shadow-lg shadow-teal-900/30"
                  >
                    Start Learning
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>

                {/* Secondary CTA - Scenarios */}
                {isPSVUnlocked ? (
                  <Link href="/psv-quest">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 min-w-[180px] h-12 text-base"
                    >
                      Play Scenarios
                    </Button>
                  </Link>
                ) : (
                  <div className="relative">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      disabled
                      className="border-white/20 text-white/50 min-w-[180px] h-12 text-base cursor-not-allowed"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Play Scenarios
                    </Button>
                    {/* Unlock progress indicator */}
                    <div className="mt-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs text-white/50 mb-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Complete {requiredLessons.length - completedRequired} required lesson{requiredLessons.length - completedRequired !== 1 ? 's' : ''}
                      </div>
                      <div className="w-full max-w-[180px] mx-auto">
                        <Progress 
                          value={(completedRequired / requiredLessons.length) * 100} 
                          className="h-1.5 bg-white/10" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Hero Visual */}
            <div className="hidden lg:block">
              <HeroVisualCard />
            </div>
          </div>

          {/* Proof Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <ProofBar />
          </div>
        </div>
      </section>

      {/* Guided Path Section */}
      <GuidedPath
        isSignedIn={isSignedIn || false}
        isPSVUnlocked={isPSVUnlocked}
        completedRequiredLessons={completedRequired}
        totalRequiredLessons={requiredLessons.length}
        isHardModeUnlocked={isHardModeUnlocked}
      />

      {/* Outcomes Section */}
      <Outcomes />

      {/* Footer */}
      <footer className="bg-[#0B1F3B] border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-teal-500/20 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="text-sm text-white/60">
                Puffer Training Platform • PSV Sizing Quest
              </span>
            </div>

            {/* Center Links */}
            <nav className="flex items-center gap-6">
              <Link href="/learn" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                Academy
              </Link>
              <Link href="/psv-quest" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                Scenarios
              </Link>
              <Link href="/glossary" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                Glossary
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>Training mode only</span>
              <span className="text-white/20">•</span>
              <span>v2.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
