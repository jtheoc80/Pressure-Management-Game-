/**
 * Training Academy Types
 * Data models for lessons, glossary, and quizzes
 */

export type Track = "psv" | "tank_flame";

export type SectionType = "text" | "diagram" | "callout" | "check" | "quiz";

export type CalloutVariant = "tip" | "warning" | "example";

export interface TextSection {
  type: "text";
  heading?: string;
  body: string;
}

export interface DiagramSection {
  type: "diagram";
  key: string;
  caption?: string;
}

export interface CalloutSection {
  type: "callout";
  variant: CalloutVariant;
  body: string;
}

export interface CheckSection {
  type: "check";
  items: string[];
}

export interface QuizSection {
  type: "quiz";
  quizId: string;
}

export type LessonSection =
  | TextSection
  | DiagramSection
  | CalloutSection
  | CheckSection
  | QuizSection;

export type UnlockKey = "psv_play" | "tank_flame_play" | "coach_mode_off";

export interface Lesson {
  id: string;
  track: Track;
  title: string;
  estMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  requiredToUnlock: boolean;
  unlocks: UnlockKey[];
  order: number;
  prerequisiteIds?: string[];
}

export type GlossaryCategory =
  | "Pressure"
  | "Thermo"
  | "Gas"
  | "Liquid"
  | "Valve"
  | "Tank"
  | "Flame"
  | "Overfill";

export interface GlossaryTerm {
  term: string;
  category: GlossaryCategory;
  definition: string;
  whyItMatters: string;
  commonMistake: string;
  example?: string;
  related?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  passingScore: number; // percentage, e.g., 80
  questions: QuizQuestion[];
}

// Progress tracking types
export interface LessonProgress {
  lessonId: string;
  bestScore: number;
  completedAt: string | null;
  attempts: number;
}

export interface UserUnlocks {
  psv_play: boolean;
  tank_flame_play: boolean;
  coach_mode_off: boolean;
}

export interface UserProgress {
  lessonProgress: Record<string, LessonProgress>;
  unlocks: UserUnlocks;
  coachModeEnabled: boolean;
}

export const DEFAULT_UNLOCKS: UserUnlocks = {
  psv_play: false,
  tank_flame_play: false,
  coach_mode_off: false,
};

export const DEFAULT_PROGRESS: UserProgress = {
  lessonProgress: {},
  unlocks: DEFAULT_UNLOCKS,
  coachModeEnabled: true,
};
