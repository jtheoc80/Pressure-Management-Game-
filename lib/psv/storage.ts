/**
 * PSV Quest Local Storage Utilities
 * Manages player progress, datasheets, and attempts client-side.
 */

import type {
  Datasheet,
  AttemptRecord,
  PlayerProfile,
  GradeResult,
  RankTitle,
  HardModeProgress,
} from "./types";
import { getRank, BADGE_DEFINITIONS, checkBadgeEligibility } from "./scoring";

const STORAGE_KEYS = {
  PROFILE: "psv:profile",
  DATASHEET: (id: string) => `psv:datasheet:${id}`,
  ATTEMPTS: (id: string) => `psv:attempts:${id}`,
} as const;

const DEFAULT_HARD_MODE_PROGRESS: HardModeProgress = {
  isUnlocked: false,
  qualifyingAttempts: 0,
};

const DEFAULT_PROFILE: PlayerProfile = {
  xp: 0,
  rank: "Apprentice",
  badges: [],
  mistakeBank: [],
  completedScenarios: [],
  scenarioAttempts: {},
  scenarioBestScores: {},
  hardModeProgress: DEFAULT_HARD_MODE_PROGRESS,
};

/**
 * Get player profile from localStorage
 */
export function getProfile(): PlayerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (stored) {
      const profile = JSON.parse(stored);
      // Ensure hardModeProgress exists (migration for existing profiles)
      if (!profile.hardModeProgress) {
        profile.hardModeProgress = DEFAULT_HARD_MODE_PROGRESS;
      }
      return profile;
    }
  } catch (error) {
    console.error("Error reading profile:", error);
  }
  return DEFAULT_PROFILE;
}

/**
 * Save player profile to localStorage
 */
export function saveProfile(profile: PlayerProfile): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving profile:", error);
  }
}

/**
 * Update profile with grade result
 */
export function updateProfileWithResult(
  scenarioId: string,
  result: GradeResult
): PlayerProfile {
  const profile = getProfile();
  
  // Update XP (use pointsEarned if available, fall back to xpAwarded)
  const xpGained = result.pointsEarned ?? result.xpAwarded;
  profile.xp += xpGained;
  
  // Update rank
  profile.rank = getRank(profile.xp);
  
  // Update completed scenarios
  if (!profile.completedScenarios.includes(scenarioId)) {
    profile.completedScenarios.push(scenarioId);
  }
  
  // Update attempt count
  profile.scenarioAttempts[scenarioId] =
    (profile.scenarioAttempts[scenarioId] || 0) + 1;
  
  // Update best score
  if (
    !profile.scenarioBestScores[scenarioId] ||
    result.score > profile.scenarioBestScores[scenarioId]
  ) {
    profile.scenarioBestScores[scenarioId] = result.score;
  }
  
  // Update mistake bank (keep top 3 most recent unique mistakes)
  const newMistakes = result.mistakes.filter(
    (m) => !profile.mistakeBank.includes(m)
  );
  profile.mistakeBank = [...newMistakes, ...profile.mistakeBank].slice(0, 3);
  
  // Update hard mode progress for standard mode attempts
  if (result.mode === "standard" || !result.mode) {
    if (result.score >= 85) {
      profile.hardModeProgress.qualifyingAttempts =
        (profile.hardModeProgress.qualifyingAttempts || 0) + 1;
    }
    
    // Check if hard mode should be unlocked
    if (
      !profile.hardModeProgress.isUnlocked &&
      profile.hardModeProgress.qualifyingAttempts >= 3
    ) {
      profile.hardModeProgress.isUnlocked = true;
      profile.hardModeProgress.unlockedAt = new Date().toISOString();
      
      // Award hard mode unlocked badge
      const hardModeBadge = BADGE_DEFINITIONS.hard_mode_unlocked;
      if (!profile.badges.some((b) => b.id === hardModeBadge.id)) {
        profile.badges.push({
          ...hardModeBadge,
          earnedAt: new Date().toISOString(),
        });
      }
    }
  }
  
  // Check for new badges
  const previousResults = getAttempts(scenarioId).map((a) => ({
    ...result,
    score: a.score,
    breakdown: a.breakdown,
  }));
  
  Object.keys(BADGE_DEFINITIONS).forEach((badgeId) => {
    if (profile.badges.some((b) => b.id === badgeId)) return;
    
    if (checkBadgeEligibility(badgeId, result, scenarioId, previousResults)) {
      const def = BADGE_DEFINITIONS[badgeId as keyof typeof BADGE_DEFINITIONS];
      profile.badges.push({
        ...def,
        earnedAt: new Date().toISOString(),
      });
    }
  });
  
  saveProfile(profile);
  return profile;
}

/**
 * Get saved datasheet for a scenario
 */
export function getDatasheet(scenarioId: string): Partial<Datasheet> | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DATASHEET(scenarioId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading datasheet:", error);
  }
  return null;
}

/**
 * Save datasheet for a scenario
 */
export function saveDatasheet(
  scenarioId: string,
  datasheet: Partial<Datasheet>
): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(
      STORAGE_KEYS.DATASHEET(scenarioId),
      JSON.stringify({ ...datasheet, scenarioId })
    );
  } catch (error) {
    console.error("Error saving datasheet:", error);
  }
}

/**
 * Get attempts for a scenario
 */
export function getAttempts(scenarioId: string): AttemptRecord[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTEMPTS(scenarioId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading attempts:", error);
  }
  return [];
}

/**
 * Save an attempt for a scenario
 */
export function saveAttempt(
  scenarioId: string,
  attempt: AttemptRecord
): void {
  if (typeof window === "undefined") return;
  
  try {
    const attempts = getAttempts(scenarioId);
    attempts.push(attempt);
    // Keep only last 10 attempts per scenario
    const trimmedAttempts = attempts.slice(-10);
    localStorage.setItem(
      STORAGE_KEYS.ATTEMPTS(scenarioId),
      JSON.stringify(trimmedAttempts)
    );
  } catch (error) {
    console.error("Error saving attempt:", error);
  }
}

/**
 * Get the number of standard mode attempts with score >= 85
 */
export function getQualifyingAttemptCount(): number {
  const profile = getProfile();
  return profile.hardModeProgress.qualifyingAttempts || 0;
}

/**
 * Check if hard mode is unlocked
 */
export function isHardModeUnlocked(): boolean {
  const profile = getProfile();
  return profile.hardModeProgress.isUnlocked || false;
}

/**
 * Manually unlock hard mode (e.g., after passing qualification scenario)
 */
export function unlockHardMode(): void {
  const profile = getProfile();
  if (!profile.hardModeProgress.isUnlocked) {
    profile.hardModeProgress.isUnlocked = true;
    profile.hardModeProgress.unlockedAt = new Date().toISOString();
    
    // Award hard mode unlocked badge
    const hardModeBadge = BADGE_DEFINITIONS.hard_mode_unlocked;
    if (!profile.badges.some((b) => b.id === hardModeBadge.id)) {
      profile.badges.push({
        ...hardModeBadge,
        earnedAt: new Date().toISOString(),
      });
    }
    
    saveProfile(profile);
  }
}

/**
 * Clear all PSV Quest data (for testing/reset)
 */
export function clearAllData(): void {
  if (typeof window === "undefined") return;
  
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("psv:"))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}

/**
 * Get rank progress info
 */
export function getRankProgress(xp: number): {
  currentRank: RankTitle;
  nextRank: RankTitle | null;
  progressToNext: number;
  xpForNext: number;
} {
  const thresholds: { rank: RankTitle; xp: number }[] = [
    { rank: "Apprentice", xp: 0 },
    { rank: "Technician", xp: 200 },
    { rank: "Specialist", xp: 500 },
    { rank: "Lead", xp: 1000 },
  ];

  let currentRankData = thresholds[0];
  let nextRankData: typeof currentRankData | null = null;

  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i].xp) {
      currentRankData = thresholds[i];
      nextRankData = thresholds[i + 1] || null;
    }
  }

  const progressToNext = nextRankData
    ? ((xp - currentRankData.xp) / (nextRankData.xp - currentRankData.xp)) * 100
    : 100;

  return {
    currentRank: currentRankData.rank,
    nextRank: nextRankData?.rank || null,
    progressToNext: Math.min(100, progressToNext),
    xpForNext: nextRankData?.xp || currentRankData.xp,
  };
}
