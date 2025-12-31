"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Scenario } from "@/lib/psv/types";
import { getThumbnailSvg } from "@/lib/psv/svg";

interface LevelCardProps {
  scenario: Scenario;
  isLocked?: boolean;
  bestScore?: number;
  attemptCount?: number;
}

export function LevelCard({
  scenario,
  isLocked = false,
  bestScore,
  attemptCount = 0,
}: LevelCardProps) {
  const thumbnailSvg = getThumbnailSvg(scenario.visuals.thumbnail);
  
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-green-100 text-green-800 border-green-200";
    if (difficulty <= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ["", "Beginner", "Easy", "Moderate", "Hard", "Expert"];
    return labels[difficulty] || "Unknown";
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const labels: Record<string, string> = {
      gas: "Gas",
      steam: "Steam",
      liquid: "Liquid",
      two_phase: "Two-Phase",
    };
    return labels[serviceType] || serviceType;
  };

  return (
    <Link
      href={isLocked ? "#" : `/psv-quest/${scenario.id}`}
      className={`block transition-transform hover:scale-[1.02] ${
        isLocked ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <Card className="overflow-hidden border-[var(--puffer-border)] hover:border-[var(--puffer-navy-2)] transition-colors">
        {/* Thumbnail */}
        <div className="relative">
          <div
            className="w-full h-32 bg-[var(--puffer-bg)]"
            dangerouslySetInnerHTML={{ __html: thumbnailSvg }}
          />
          {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-full p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--puffer-navy)"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
          )}
          {bestScore !== undefined && bestScore > 0 && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="var(--puffer-warning)"
              >
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
              <span className="text-xs font-semibold text-[var(--puffer-navy)]">
                {bestScore}
              </span>
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[var(--puffer-navy)] line-clamp-1">
              {scenario.title}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Description */}
          <p className="text-xs text-[var(--puffer-gray)] line-clamp-2">
            {scenario.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className={getDifficultyColor(scenario.difficulty)}
            >
              {getDifficultyLabel(scenario.difficulty)}
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-800 border-blue-200"
            >
              {getServiceTypeLabel(scenario.serviceType)}
            </Badge>
          </div>

          {/* Progress indicator if attempted */}
          {attemptCount > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--puffer-gray)]">Best Score</span>
                <span className="font-medium text-[var(--puffer-navy)]">
                  {bestScore || 0}/100
                </span>
              </div>
              <Progress value={bestScore || 0} className="h-1.5" />
              <p className="text-xs text-[var(--puffer-gray-2)]">
                {attemptCount} attempt{attemptCount !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Constraints preview */}
          <div className="pt-2 border-t border-[var(--puffer-border)]">
            <p className="text-xs text-[var(--puffer-gray-2)] mb-1">Key constraints:</p>
            <ul className="space-y-0.5">
              {scenario.constraints.slice(0, 2).map((constraint, index) => (
                <li
                  key={index}
                  className="text-xs text-[var(--puffer-gray)] flex items-start gap-1"
                >
                  <span className="text-[var(--puffer-navy)]">•</span>
                  <span className="line-clamp-1">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
