"use client";

/**
 * ProofBar - Stats chips displayed under the hero section
 * Shows platform statistics and coverage areas
 */

interface StatChip {
  value: string;
  label: string;
}

const stats: StatChip[] = [
  { value: "18", label: "lessons" },
  { value: "60+", label: "terms" },
  { value: "12", label: "scenarios" },
];

const industries = ["Refinery", "Chemical", "Terminal"];

export function ProofBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {/* Stat chips */}
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full"
        >
          <span className="text-sm font-semibold text-white">{stat.value}</span>
          <span className="text-xs text-white/60">{stat.label}</span>
        </div>
      ))}

      {/* Separator */}
      <div className="hidden sm:block w-px h-5 bg-white/20" />

      {/* Industry coverage chip */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
        <span className="text-xs text-white/60">
          {industries.join(" • ")}
        </span>
      </div>
    </div>
  );
}
