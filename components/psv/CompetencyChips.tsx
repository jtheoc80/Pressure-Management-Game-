"use client";

import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Badge as BadgeType } from "@/lib/psv/types";
import { BADGE_DEFINITIONS } from "@/lib/psv/scoring";

interface CompetencyChipsProps {
  badges: BadgeType[];
  showAll?: boolean;
}

const SKILL_AREAS = [
  { id: "datasheet", name: "Datasheet Skills", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "backpressure", name: "Backpressure", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "valve_selection", name: "Valve Selection", color: "bg-green-100 text-green-800 border-green-200" },
  { id: "orifice", name: "Orifice Sizing", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { id: "process_safety", name: "Process Safety", color: "bg-red-100 text-red-800 border-red-200" },
];

export function CompetencyChips({ badges, showAll = false }: CompetencyChipsProps) {
  // Map badges to skill areas
  const getSkillLevel = (skillId: string): number => {
    switch (skillId) {
      case "datasheet":
        return badges.some((b) => b.id === "datasheet_discipline" || b.id === "no_missing_inputs")
          ? 3
          : badges.length > 0
          ? 1
          : 0;
      case "backpressure":
        return badges.some((b) => b.id === "backpressure_aware") ? 3 : 0;
      case "valve_selection":
        return badges.some((b) => b.id === "perfectionist") ? 3 : badges.length >= 2 ? 2 : badges.length > 0 ? 1 : 0;
      case "orifice":
        return badges.some((b) => b.id === "perfectionist") ? 2 : badges.length > 0 ? 1 : 0;
      case "process_safety":
        return badges.length >= 3 ? 2 : badges.length > 0 ? 1 : 0;
      default:
        return 0;
    }
  };

  const getLevelLabel = (level: number): string => {
    switch (level) {
      case 0:
        return "Not Started";
      case 1:
        return "Learning";
      case 2:
        return "Proficient";
      case 3:
        return "Expert";
      default:
        return "Unknown";
    }
  };

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0:
        return "bg-gray-100 text-gray-500 border-gray-200";
      case 1:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case 2:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case 3:
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Competency Map */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-2">
          Competency Map
        </h4>
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {SKILL_AREAS.map((skill) => {
              const level = getSkillLevel(skill.id);
              return (
                <Tooltip key={skill.id}>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className={`${getLevelColor(level)} cursor-help`}
                    >
                      {skill.name}
                      <span className="ml-1.5 opacity-60">
                        {"●".repeat(level)}{"○".repeat(3 - level)}
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {skill.name}: {getLevelLabel(level)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>

      {/* Earned Badges */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-2">
          Earned Badges
        </h4>
        {badges.length > 0 ? (
          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[var(--puffer-navy)] to-[var(--puffer-navy-2)] text-white rounded-full text-sm cursor-help">
                      <span>{badge.icon}</span>
                      <span className="font-medium">{badge.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[200px]">{badge.description}</p>
                    {badge.earnedAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        ) : (
          <p className="text-sm text-[var(--puffer-gray-2)]">
            Complete scenarios to earn badges
          </p>
        )}
      </div>

      {/* Available Badges (if showAll) */}
      {showAll && (
        <div>
          <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-2">
            Available Badges
          </h4>
          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {Object.values(BADGE_DEFINITIONS)
                .filter((def) => !badges.some((b) => b.id === def.id))
                .map((def) => (
                  <Tooltip key={def.id}>
                    <TooltipTrigger>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--puffer-bg)] text-[var(--puffer-gray)] rounded-full text-sm cursor-help border border-[var(--puffer-border)] opacity-60">
                        <span>{def.icon}</span>
                        <span className="font-medium">{def.name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[200px]">{def.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
            </div>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
