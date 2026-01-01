"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Scenario } from "@/lib/psv/types";
import { getThumbnailSvg } from "@/lib/psv/svg";
import {
  chipClasses,
  cardClasses,
  getDifficultyInfo,
  getServiceInfo,
  getEstimatedTime,
} from "@/lib/psv/brand";

interface LevelCardProps {
  scenario: Scenario;
  isLocked?: boolean;
  bestScore?: number;
  attemptCount?: number;
  currentXP?: number;
  unlockRequirement?: string;
  isHardModeUnlocked?: boolean;
  showHardBadge?: boolean;
}

export function LevelCard({
  scenario,
  isLocked = false,
  bestScore,
  attemptCount = 0,
  currentXP = 0,
  unlockRequirement = "Complete the previous scenario",
  isHardModeUnlocked = false,
  showHardBadge = false,
}: LevelCardProps) {
  const thumbnailSvg = getThumbnailSvg(scenario.visuals.thumbnail);
  const difficultyInfo = getDifficultyInfo(scenario.difficulty);
  const serviceInfo = getServiceInfo(scenario.serviceType);
  const estimatedTime = getEstimatedTime(scenario.difficulty);

  // Calculate unlock progress (example: 200 XP to unlock)
  const unlockXP = 200;
  const unlockProgress = Math.min((currentXP / unlockXP) * 100, 100);
  const hasStarted = attemptCount > 0;

  // Get relevant skills for this scenario
  const scenarioSkills = getScenarioSkills(scenario);

  // Calculate estimated points based on mode
  const getPointsDisplay = () => {
    if (showHardBadge && scenario.isHardEligible && isHardModeUnlocked) {
      return {
        points: Math.round(scenario.basePoints * 0.8 * 2), // ~80% score with 2x multiplier
        color: "text-red-600",
        label: "~pts (2×)",
      };
    }
    return {
      points: Math.round(scenario.basePoints * 0.8), // ~80% score
      color: "text-emerald-600",
      label: "pts",
    };
  };

  const pointsDisplay = getPointsDisplay();

  const CardContent = (
    <div
      className={`
        ${cardClasses.base}
        ${!isLocked ? cardClasses.hover : ""}
        relative h-full flex flex-col
      `}
    >
      {/* Thumbnail Section */}
      <div className="relative">
        <div
          className="w-full h-28 bg-slate-50 overflow-hidden [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
          dangerouslySetInnerHTML={{ __html: thumbnailSvg }}
        />

        {/* Hard Mode Badge */}
        {scenario.isHardEligible && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded shadow-sm">
            HARD
          </div>
        )}

        {/* Best Score Badge */}
        {bestScore !== undefined && bestScore > 0 && !isLocked && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm border border-slate-200">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D97706">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
            <span className="text-xs font-bold text-slate-700">{bestScore}</span>
          </div>
        )}

        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
            <div className="bg-white rounded-full p-2 mb-2 shadow-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0B1F3B"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="text-white text-sm font-semibold mb-1">Locked</span>
            <span className="text-white/80 text-xs text-center px-4 leading-tight">
              {unlockRequirement}
            </span>
            {/* Mini progress bar for unlock */}
            <div className="mt-2 w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/80 rounded-full transition-all"
                style={{ width: `${unlockProgress}%` }}
              />
            </div>
            <span className="text-white/60 text-[10px] mt-1">
              {currentXP}/{unlockXP} XP
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-3 flex flex-col">
        {/* Title */}
        <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1 line-clamp-1">
          {scenario.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-2 leading-relaxed">
          {scenario.description}
        </p>

        {/* Chips Row */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span
            className={chipClasses.base}
            style={{
              backgroundColor: difficultyInfo.colors.bg,
              color: difficultyInfo.colors.text,
              borderColor: difficultyInfo.colors.border,
            }}
          >
            {difficultyInfo.label}
          </span>
          <span
            className={chipClasses.base}
            style={{
              backgroundColor: serviceInfo.colors.bg,
              color: serviceInfo.colors.text,
              borderColor: serviceInfo.colors.border,
            }}
          >
            {serviceInfo.label}
          </span>
          {scenario.isHardEligible && isHardModeUnlocked && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-red-50 text-red-700 border-red-200">
              2× Points
            </span>
          )}
        </div>

        {/* Key Constraints */}
        <div className="mb-3 flex-1">
          <ul className="space-y-0.5">
            {scenario.constraints.slice(0, 2).map((constraint, index) => (
              <li
                key={index}
                className="text-[11px] text-slate-500 flex items-start gap-1.5"
              >
                <span className="text-slate-400 mt-0.5">•</span>
                <span className="line-clamp-1">{constraint}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {scenarioSkills.map((skill) => (
            <span key={skill} className={chipClasses.skill}>
              {skill}
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {!isLocked ? (
            <>
              <Button
                size="sm"
                className={`h-7 px-3 text-xs ${
                  showHardBadge && scenario.isHardEligible && isHardModeUnlocked
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#0B1F3B] hover:bg-[#12345A]"
                } text-white`}
              >
                {hasStarted ? "Continue" : "Start"}
              </Button>
              <div className="text-right">
                <span className={`text-xs font-semibold ${pointsDisplay.color}`}>
                  +{pointsDisplay.points} {pointsDisplay.label}
                </span>
                <span className="text-xs text-slate-400 ml-1">
                  • {estimatedTime}
                </span>
              </div>
            </>
          ) : (
            <span className="text-xs text-slate-400 italic">
              Complete requirements to unlock
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return <div className="cursor-not-allowed">{CardContent}</div>;
  }

  // If hard mode unlocked and this is a hard eligible scenario in hard filter, link to hard mode
  const linkHref =
    showHardBadge && scenario.isHardEligible && isHardModeUnlocked
      ? `/psv-quest/${scenario.id}?mode=hard`
      : `/psv-quest/${scenario.id}`;

  return (
    <Link href={linkHref} className="block">
      {CardContent}
    </Link>
  );
}

/**
 * Get relevant skills for a scenario based on its requirements
 */
function getScenarioSkills(scenario: Scenario): string[] {
  const skills: string[] = ["Datasheet"];

  if (scenario.datasheetRequirements.includes("superimposedBackpressurePsig")) {
    skills.push("Backpressure");
  }

  skills.push("Selection");

  if (scenario.serviceType === "liquid") {
    skills.push("Liquid");
  } else if (scenario.serviceType === "gas" || scenario.serviceType === "steam") {
    skills.push("Gas/Steam");
  }

  return skills;
}
