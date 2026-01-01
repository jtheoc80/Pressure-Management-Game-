"use client";

import React, { useCallback } from "react";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { useLessonProgressOptional } from "./LessonProgressProvider";
import type { LessonObjective } from "@/lib/academy/types";

interface ObjectivesRailProps {
  objectives: LessonObjective[];
  onObjectiveClick?: (objective: LessonObjective, index: number) => void;
}

type ObjectiveStatus = "not_started" | "in_progress" | "completed";

export function ObjectivesRail({ objectives, onObjectiveClick }: ObjectivesRailProps) {
  const progress = useLessonProgressOptional();

  const getObjectiveStatus = useCallback(
    (objective: LessonObjective): ObjectiveStatus => {
      if (!progress) return "not_started";
      
      const percent = progress.percentForObjective(objective);
      if (percent >= 100) return "completed";
      if (percent > 0) return "in_progress";
      return "not_started";
    },
    [progress]
  );

  const getProgressPercent = useCallback(
    (objective: LessonObjective): number => {
      if (!progress) return 0;
      return progress.percentForObjective(objective);
    },
    [progress]
  );

  const handleClick = (objective: LessonObjective, index: number) => {
    // Scroll to the relevant section anchor
    const anchorId = `section-${index}`;
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onObjectiveClick?.(objective, index);
  };

  if (objectives.length === 0) return null;

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Learning Objectives
        </span>
        {progress && (
          <span className="text-xs text-slate-400">
            {progress.overallProgress}% complete
          </span>
        )}
      </div>
      
      {/* Horizontal Rail */}
      <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
        {objectives.map((objective, idx) => {
          const status = getObjectiveStatus(objective);
          const percent = getProgressPercent(objective);
          
          return (
            <button
              key={objective.id}
              onClick={() => handleClick(objective, idx)}
              className={`
                flex-1 min-w-[120px] max-w-[200px] p-3 rounded-lg border transition-all
                text-left cursor-pointer group
                ${status === "completed"
                  ? "bg-teal-50 border-teal-200 hover:border-teal-300"
                  : status === "in_progress"
                  ? "bg-white border-[#003366] hover:bg-slate-50"
                  : "bg-white border-slate-200 hover:border-slate-300"
                }
              `}
              title={objective.text}
            >
              {/* Status Icon + Label */}
              <div className="flex items-center gap-2 mb-2">
                {status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                ) : status === "in_progress" ? (
                  <CircleDot className="w-4 h-4 text-[#003366] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span
                  className={`
                    text-xs font-medium truncate
                    ${status === "completed"
                      ? "text-teal-700"
                      : status === "in_progress"
                      ? "text-[#003366]"
                      : "text-slate-500"
                    }
                  `}
                >
                  {objective.label}
                </span>
              </div>
              
              {/* Mini Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`
                    h-full rounded-full transition-all duration-300
                    ${status === "completed"
                      ? "bg-teal-500"
                      : status === "in_progress"
                      ? "bg-[#003366]"
                      : "bg-slate-200"
                    }
                  `}
                  style={{ width: `${percent}%` }}
                />
              </div>
              
              {/* Objective Preview Text */}
              <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 group-hover:text-slate-500">
                {objective.text}
              </p>
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Circle className="w-3 h-3 text-slate-300" />
          Not started
        </span>
        <span className="flex items-center gap-1">
          <CircleDot className="w-3 h-3 text-[#003366]" />
          In progress
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-teal-600" />
          Complete
        </span>
      </div>
    </div>
  );
}
