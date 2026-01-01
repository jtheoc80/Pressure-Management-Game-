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

  const completedCount = objectives.filter(obj => getObjectiveStatus(obj) === "completed").length;
  const inProgressCount = objectives.filter(obj => getObjectiveStatus(obj) === "in_progress").length;

  return (
    <div className="w-full bg-gradient-to-r from-[#003366]/5 to-slate-50 border-2 border-[#003366]/20 rounded-xl p-5 mb-6 shadow-sm">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">{objectives.length}</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#003366]">
              Learning Objectives
            </h3>
            <p className="text-xs text-slate-500">
              Track your progress through this lesson
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {completedCount > 0 && (
            <span className="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
              {completedCount} done
            </span>
          )}
          {inProgressCount > 0 && (
            <span className="text-xs font-semibold text-[#003366] bg-[#003366]/10 px-2 py-1 rounded-full">
              {inProgressCount} in progress
            </span>
          )}
          {progress && (
            <span className="text-sm font-bold text-slate-700 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              {progress.overallProgress}%
            </span>
          )}
        </div>
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
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
        <div className="flex items-center gap-4 text-xs text-slate-500">
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
        <span className="text-xs text-slate-400">
          Click an objective to jump to content
        </span>
      </div>
    </div>
  );
}
