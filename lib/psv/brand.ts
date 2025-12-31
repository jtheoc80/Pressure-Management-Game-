/**
 * PSV Quest Brand Tokens
 * Puffer Navy + Gray palette with helper utilities.
 */

// Core color tokens (CSS var with hex fallback)
export const COLORS = {
  // Primary Navy palette
  navy: "var(--puffer-navy, #0B1F3B)",
  navy2: "var(--puffer-navy-2, #12345A)",
  navyLight: "var(--puffer-navy-light, #1E3A5F)",
  
  // Gray palette
  gray: "var(--puffer-gray, #6B7280)",
  gray2: "var(--puffer-gray-2, #9CA3AF)",
  grayLight: "var(--puffer-gray-light, #D1D5DB)",
  grayLighter: "var(--puffer-gray-lighter, #E5E7EB)",
  
  // Background
  bg: "var(--puffer-bg, #F5F7FA)",
  bgDark: "var(--puffer-bg-dark, #0A0F1A)",
  white: "#FFFFFF",
  
  // Semantic
  success: "var(--puffer-success, #059669)",
  warning: "var(--puffer-warning, #D97706)",
  error: "var(--puffer-error, #DC2626)",
  accent: "var(--puffer-accent, #3B82F6)",
} as const;

// Difficulty level colors (muted navy/gray tones)
export const DIFFICULTY_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "#E8F4EC", text: "#1B4332", border: "#A7C4BC" },
  2: { bg: "#EEF2FF", text: "#312E81", border: "#A5B4FC" },
  3: { bg: "#FEF3C7", text: "#78350F", border: "#FCD34D" },
  4: { bg: "#FFE4E6", text: "#881337", border: "#FDA4AF" },
  5: { bg: "#FBE8E8", text: "#7F1D1D", border: "#F87171" },
};

// Service type colors (muted)
export const SERVICE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  gas: { bg: "#F0F4F8", text: "#1E3A5F", border: "#94A3B8" },
  steam: { bg: "#F5F5F5", text: "#374151", border: "#9CA3AF" },
  liquid: { bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD" },
  two_phase: { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" },
};

// Skill area definitions
export const SKILL_AREAS = [
  { id: "datasheet", name: "Datasheet", shortName: "DS" },
  { id: "backpressure", name: "Backpressure", shortName: "BP" },
  { id: "selection", name: "Selection", shortName: "SEL" },
  { id: "orifice", name: "Orifice", shortName: "ORF" },
] as const;

// Helper classnames for chips
export const chipClasses = {
  base: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
  
  // Muted navy chip (default)
  muted: "bg-slate-100 text-slate-600 border-slate-200",
  
  // Navy chip
  navy: "bg-[#0B1F3B]/10 text-[#0B1F3B] border-[#0B1F3B]/20",
  
  // Gray chip
  gray: "bg-gray-100 text-gray-600 border-gray-200",
  
  // Skill chip (very muted)
  skill: "bg-slate-50 text-slate-500 border-slate-100 text-[10px] px-1.5 py-0.5",
  
  // Status chips
  locked: "bg-gray-100 text-gray-400 border-gray-200",
  unlocked: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// Card styles
export const cardClasses = {
  base: "bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200",
  hover: "hover:shadow-md hover:border-[#12345A]/30",
  locked: "opacity-75",
};

// Progress bar styles
export const progressClasses = {
  track: "h-2 bg-slate-100 rounded-full overflow-hidden",
  fill: "h-full bg-[#0B1F3B] rounded-full transition-all duration-300",
  fillAccent: "h-full bg-[#12345A] rounded-full transition-all duration-300",
};

/**
 * Get difficulty label and color
 */
export function getDifficultyInfo(level: number) {
  const labels = ["", "Beginner", "Easy", "Moderate", "Hard", "Expert"];
  const colors = DIFFICULTY_COLORS[level] || DIFFICULTY_COLORS[3];
  return { label: labels[level] || "Unknown", colors };
}

/**
 * Get service type label and color
 */
export function getServiceInfo(type: string) {
  const labels: Record<string, string> = {
    gas: "Gas",
    steam: "Steam", 
    liquid: "Liquid",
    two_phase: "Two-Phase",
  };
  const colors = SERVICE_COLORS[type] || SERVICE_COLORS.gas;
  return { label: labels[type] || type, colors };
}

/**
 * Calculate estimated completion time based on difficulty
 */
export function getEstimatedTime(difficulty: number): string {
  const times = [0, 4, 6, 8, 10, 12];
  return `~${times[difficulty] || 6} min`;
}

/**
 * Calculate XP reward based on difficulty
 */
export function getXPReward(difficulty: number): number {
  const rewards = [0, 30, 45, 60, 80, 100];
  return rewards[difficulty] || 45;
}
