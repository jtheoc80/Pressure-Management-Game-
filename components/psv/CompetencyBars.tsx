"use client";

import { progressClasses } from "@/lib/psv/brand";
import type { Badge } from "@/lib/psv/types";

interface CompetencyBarsProps {
  badges: Badge[];
  completedScenarios: string[];
  className?: string;
}

interface SkillLevel {
  id: string;
  name: string;
  level: number;
  percent: number;
}

export function CompetencyBars({ 
  badges, 
  completedScenarios,
  className = "" 
}: CompetencyBarsProps) {
  // Calculate skill levels based on badges and completed scenarios
  const calculateSkillLevels = (): SkillLevel[] => {
    const baseLevel = Math.min(completedScenarios.length * 15, 45);
    
    return [
      {
        id: "datasheet",
        name: "Datasheet Skills",
        level: badges.some(b => b.id === "datasheet_discipline" || b.id === "no_missing_inputs") 
          ? 85 
          : baseLevel + (badges.length > 0 ? 20 : 0),
        percent: 0,
      },
      {
        id: "backpressure",
        name: "Backpressure",
        level: badges.some(b => b.id === "backpressure_aware") 
          ? 90 
          : completedScenarios.includes("gas-flare-backpressure") ? 60 : baseLevel,
        percent: 0,
      },
      {
        id: "selection",
        name: "Valve Selection",
        level: badges.some(b => b.id === "perfectionist") 
          ? 95 
          : baseLevel + (completedScenarios.length * 10),
        percent: 0,
      },
      {
        id: "orifice",
        name: "Orifice Sizing",
        level: badges.some(b => b.id === "perfectionist")
          ? 80
          : baseLevel + (badges.length * 5),
        percent: 0,
      },
    ].map(skill => ({
      ...skill,
      level: Math.min(skill.level, 100),
      percent: Math.min(skill.level, 100),
    }));
  };

  const skills = calculateSkillLevels();

  return (
    <div className={`space-y-3 ${className}`}>
      {skills.map((skill) => (
        <div key={skill.id} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              {skill.name}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {skill.percent}%
            </span>
          </div>
          <div className={progressClasses.track}>
            <div 
              className={progressClasses.fill}
              style={{ width: `${skill.percent}%` }}
            />
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          Complete scenarios and earn badges to improve skills
        </p>
      </div>
    </div>
  );
}
