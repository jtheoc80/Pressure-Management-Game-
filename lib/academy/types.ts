/**
 * Training Academy Types
 * Data models for lessons, glossary, quizzes, cases, and drills
 */

export type Track = "psv" | "tank_flame";

// Section Types
export type SectionType = 
  | "text" 
  | "diagram" 
  | "callout" 
  | "check" 
  | "quiz"
  | "image"
  | "gallery"
  | "hotspot"
  | "case"
  | "rule"
  | "worked"
  | "drill";

export type CalloutVariant = "tip" | "warning" | "example";

export type WorkedCheckType = "unit_sanity" | "psig_psia" | "f_to_r" | "bp_percent";

// Section Interfaces
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

export interface ImageSection {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface GallerySection {
  type: "gallery";
  images: GalleryImage[];
}

export interface Hotspot {
  xPct: number;
  yPct: number;
  label: string;
  body: string;
}

export interface HotspotSection {
  type: "hotspot";
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
}

export interface CaseSection {
  type: "case";
  caseId: string;
}

export interface RuleSection {
  type: "rule";
  title: string;
  body: string;
  quote?: string;
  sourceLabel: string;
  sourceUrl?: string;
}

export interface WorkedField {
  key: string;
  label: string;
  unit?: string;
  correctAnswer?: string | number;
}

export interface WorkedSection {
  type: "worked";
  title: string;
  prompt: string;
  fields: WorkedField[];
  check: WorkedCheckType;
  explanation?: string;
}

export interface DrillSection {
  type: "drill";
  drillId: string;
}

export type LessonSection =
  | TextSection
  | DiagramSection
  | CalloutSection
  | CheckSection
  | QuizSection
  | ImageSection
  | GallerySection
  | HotspotSection
  | CaseSection
  | RuleSection
  | WorkedSection
  | DrillSection;

export type UnlockKey = "psv_play" | "tank_flame_play" | "coach_mode_off";

/**
 * Enhanced Learning Objective with checkpoint tracking
 */
export interface LessonObjective {
  id: string;             // Unique identifier for the objective
  label: string;          // Short label for horizontal rail display
  text: string;           // Full objective text
  checkpoints: string[];  // Keys used to compute completion
}

export interface Lesson {
  id: string;
  track: Track;
  title: string;
  estMinutes: number;
  /** 
   * Objectives can be simple strings (legacy) or enhanced LessonObjective objects.
   * The system supports both for backward compatibility.
   */
  objectives: string[] | LessonObjective[];
  sections: LessonSection[];
  requiredToUnlock: boolean;
  unlocks: UnlockKey[];
  order: number;
  prerequisiteIds?: string[];
  drillRequired?: boolean; // Must complete drill before quiz
}

/**
 * Helper to normalize objectives to enhanced format
 */
export function normalizeObjectives(
  objectives: string[] | LessonObjective[],
  lessonId: string
): LessonObjective[] {
  if (objectives.length === 0) return [];
  
  // Check if already enhanced format
  if (typeof objectives[0] === 'object' && 'id' in objectives[0]) {
    return objectives as LessonObjective[];
  }
  
  // Convert simple strings to enhanced format
  return (objectives as string[]).map((text, idx) => ({
    id: `${lessonId}-obj-${idx}`,
    label: `Objective ${idx + 1}`,
    text,
    checkpoints: [`viewed:section:${idx}`], // Default checkpoint
  }));
}

// Glossary Types
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

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  objectiveIndex?: number; // Links to lesson objective for "retake with focus"
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

// Case Study Types
export type CaseEnvironment = "refinery" | "chemical" | "terminal" | "offshore" | "pipeline";

export interface CaseRuleRef {
  title: string;
  body: string;
  quote?: string;
  sourceLabel: string;
  sourceUrl?: string;
}

export interface CaseStudy {
  id: string;
  track: Track;
  environment: CaseEnvironment;
  title: string;
  summary: string;
  narrative: string;
  diagramKey?: string;
  photos: GalleryImage[];
  requiredInputs: string[];
  commonMistakes: string[];
  ruleRefs: CaseRuleRef[];
  linkedScenarioId?: string; // Links to /psv-quest scenario
}

// Drill Types
export interface DrillQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint?: string;
  explanation: string;
}

export interface Drill {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: DrillQuestion[];
}

// Progress Tracking Types
export interface LessonProgress {
  lessonId: string;
  bestScore: number;
  completedAt: string | null;
  attempts: number;
  drillCompleted?: boolean;
  weakObjectives?: number[]; // Indices of objectives missed in quiz
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
  completedDrills: string[];
  completedCases: string[];
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
  completedDrills: [],
  completedCases: [],
};
