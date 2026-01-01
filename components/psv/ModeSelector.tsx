"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { PlayMode } from "@/lib/psv/types";

interface ModeSelectorProps {
  mode: PlayMode;
  onChange: (mode: PlayMode) => void;
  isHardModeUnlocked: boolean;
  isHardEligible: boolean;
  basePoints: number;
}

export function ModeSelector({
  mode,
  onChange,
  isHardModeUnlocked,
  isHardEligible,
  basePoints,
}: ModeSelectorProps) {
  const modes: {
    value: PlayMode;
    label: string;
    description: string;
    multiplier: number;
    locked?: boolean;
    lockReason?: string;
  }[] = [
    {
      value: "practice",
      label: "Practice",
      description: "Learn without pressure",
      multiplier: 0.75,
    },
    {
      value: "standard",
      label: "Standard",
      description: "Normal challenge",
      multiplier: 1.0,
    },
    {
      value: "hard",
      label: "Hard",
      description: "High stakes",
      multiplier: 2.0,
      locked: !isHardModeUnlocked || !isHardEligible,
      lockReason: !isHardModeUnlocked
        ? "Score ≥85 on 3 standard attempts to unlock"
        : "This scenario is not Hard-eligible",
    },
  ];

  const getEstimatedPoints = (multiplier: number) => {
    // Estimate assuming ~80% score
    return Math.round(basePoints * 0.8 * multiplier);
  };

  return (
    <Card className="border-[var(--puffer-border)]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--puffer-navy)]">
            Select Mode
          </h3>
          <span className="text-xs text-[var(--puffer-gray)]">
            Base: {basePoints} pts
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {modes.map((m) => {
            const isSelected = mode === m.value;
            const isLocked = m.locked;
            const estimatedPoints = getEstimatedPoints(m.multiplier);

            return (
              <button
                key={m.value}
                onClick={() => !isLocked && onChange(m.value)}
                disabled={isLocked}
                className={`
                  relative p-3 rounded-lg border-2 transition-all text-left
                  ${
                    isSelected
                      ? m.value === "hard"
                        ? "border-red-500 bg-red-50"
                        : m.value === "practice"
                        ? "border-slate-400 bg-slate-50"
                        : "border-[var(--puffer-navy)] bg-[var(--puffer-navy)]/5"
                      : isLocked
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                      : "border-gray-200 hover:border-gray-300 bg-white cursor-pointer"
                  }
                `}
                title={isLocked ? m.lockReason : undefined}
              >
                {isLocked && (
                  <div className="absolute top-1 right-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                )}
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      isSelected
                        ? m.value === "hard"
                          ? "text-red-700"
                          : m.value === "practice"
                          ? "text-slate-700"
                          : "text-[var(--puffer-navy)]"
                        : "text-gray-700"
                    }`}
                  >
                    {m.label}
                  </span>
                  {m.value === "hard" && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">
                      2X
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-500 mb-1.5">{m.description}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      m.value === "hard"
                        ? "text-red-600"
                        : m.value === "practice"
                        ? "text-slate-500"
                        : "text-emerald-600"
                    }`}
                  >
                    ~{estimatedPoints} pts
                  </span>
                  <span className="text-[10px] text-gray-400">
                    ×{m.multiplier}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {!isHardModeUnlocked && (
          <p className="text-xs text-[var(--puffer-gray)] mt-2 text-center">
            🔒 Score ≥85 on 3 standard attempts to unlock Hard Mode
          </p>
        )}
      </CardContent>
    </Card>
  );
}
