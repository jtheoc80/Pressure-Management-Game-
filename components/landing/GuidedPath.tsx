"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface GuidedPathProps {
  isSignedIn: boolean;
  isPSVUnlocked: boolean;
  completedRequiredLessons: number;
  totalRequiredLessons: number;
  isHardModeUnlocked: boolean;
}

interface PathStep {
  number: number;
  title: string;
  subtitle: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  isLocked?: boolean;
  lockReason?: string;
  progress?: number;
}

export function GuidedPath({
  isSignedIn,
  isPSVUnlocked,
  completedRequiredLessons,
  totalRequiredLessons,
  isHardModeUnlocked,
}: GuidedPathProps) {
  const progressPercent = totalRequiredLessons > 0 
    ? Math.round((completedRequiredLessons / totalRequiredLessons) * 100) 
    : 0;

  const steps: PathStep[] = [
    {
      number: 1,
      title: "Learn",
      subtitle: "Master PSV fundamentals in the Training Academy",
      bullets: [
        "Backpressure, valve types, orifice sizing",
        "Interactive diagrams & quizzes",
        "Progress tracking & unlocks",
      ],
      ctaText: "Start Learning",
      ctaHref: "/learn",
    },
    {
      number: 2,
      title: "Practice",
      subtitle: "Apply knowledge in realistic scenarios",
      bullets: [
        "Fill datasheets, select valves",
        "Steam, gas, and liquid services",
        "Immediate feedback & scoring",
      ],
      ctaText: isPSVUnlocked ? "Play Scenarios" : "Locked",
      ctaHref: "/psv-quest",
      isLocked: !isPSVUnlocked,
      lockReason: `Complete ${totalRequiredLessons - completedRequiredLessons} more lesson${totalRequiredLessons - completedRequiredLessons !== 1 ? 's' : ''} to unlock`,
      progress: progressPercent,
    },
    {
      number: 3,
      title: "Prove",
      subtitle: "Challenge yourself in Hard Mode",
      bullets: [
        "No hints, stricter grading",
        "2× point rewards",
        "Earn specialist badges",
      ],
      ctaText: isHardModeUnlocked ? "Hard Mode" : "Score 85+ × 3",
      ctaHref: "/psv-quest",
      isLocked: !isHardModeUnlocked,
      lockReason: "Score ≥85 on 3 standard scenarios",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-3">
            Your Learning Path
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Follow a structured journey from fundamentals to mastery
          </p>
        </div>

        {/* Path cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`
                relative bg-white rounded-xl border transition-all duration-200
                ${step.isLocked 
                  ? 'border-slate-200 opacity-90' 
                  : 'border-slate-200 hover:border-teal-300 hover:shadow-lg'
                }
              `}
            >
              {/* Step number badge */}
              <div className="absolute -top-4 left-6">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${step.isLocked 
                    ? 'bg-slate-200 text-slate-500' 
                    : step.number === 1 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-[#0B1F3B] text-white'
                  }
                `}>
                  {step.number}
                </div>
              </div>

              {/* Lock indicator */}
              {step.isLocked && (
                <div className="absolute -top-3 right-4">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-full">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="text-[10px] font-medium text-slate-500">LOCKED</span>
                  </div>
                </div>
              )}

              <div className="p-6 pt-8">
                {/* Title & subtitle */}
                <h3 className={`text-xl font-bold mb-2 ${step.isLocked ? 'text-slate-400' : 'text-[#0B1F3B]'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm mb-4 ${step.isLocked ? 'text-slate-400' : 'text-[#6B7280]'}`}>
                  {step.subtitle}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-6">
                  {step.bullets.map((bullet, index) => (
                    <li 
                      key={index} 
                      className={`flex items-start gap-2 text-sm ${step.isLocked ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className={`flex-shrink-0 mt-0.5 ${step.isLocked ? 'text-slate-300' : 'text-teal-500'}`}
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Progress bar for locked practice step */}
                {step.isLocked && step.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{step.lockReason}</span>
                      <span>{step.progress}%</span>
                    </div>
                    <Progress value={step.progress} className="h-2 bg-slate-100" />
                  </div>
                )}

                {/* CTA Button */}
                {step.isLocked ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full border-slate-200 text-slate-400 cursor-not-allowed"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {step.ctaText}
                  </Button>
                ) : (
                  <Link href={step.ctaHref}>
                    <Button
                      className={`w-full ${
                        step.number === 1
                          ? 'bg-teal-600 hover:bg-teal-700 text-white'
                          : 'bg-[#0B1F3B] hover:bg-[#12345A] text-white'
                      }`}
                    >
                      {step.ctaText}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sign-in prompt for non-authenticated users */}
        {!isSignedIn && (
          <div className="mt-8 text-center">
            <p className="text-sm text-[#6B7280]">
              <Link href="/sign-in" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign in
              </Link>
              {" "}to track your progress and unlock scenarios
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
