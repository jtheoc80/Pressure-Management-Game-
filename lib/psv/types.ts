/**
 * PSV Sizing Quest (Puffer) — Core Types
 * Training game only. Do not use for engineering sizing.
 */

export type ServiceType = "gas" | "steam" | "liquid" | "two_phase";
export type DischargeTo = "atm" | "flare" | "closed";
export type ValveStyle = "conventional" | "bellows" | "pilot";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type PlayMode = "practice" | "standard" | "hard";

export type OrificeLetter =
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "P"
  | "Q"
  | "R"
  | "T";

export type RelievingCase =
  | "blocked_outlet"
  | "fire_case"
  | "control_valve_failure"
  | "thermal_expansion"
  | "utility_failure"
  | "check_valve_failure"
  | "other";

export type VisualKey =
  | "steam_header_thumbnail"
  | "flare_line_thumbnail"
  | "pump_thermal_thumbnail";

export type VisualWidgetKey =
  | "ReliefPathDiagram"
  | "BackpressureGauge"
  | "ValveCutaway"
  | "OrificeWheel";

/**
 * Datasheet filled out by the learner.
 * Keep this structured and consistent — it's the "game controller."
 */
export interface Datasheet {
  scenarioId: string;

  // Header / context
  unitArea?: string;
  equipment?: string;
  preparedBy?: string;
  preparedAtISO?: string;

  // Service + basis
  serviceType?: ServiceType;
  relievingCase?: RelievingCase;
  dischargeTo?: DischargeTo;

  // Pressures & temperature
  setPressurePsig?: number;
  relievingTempF?: number;

  // Required capacity basis (training only; answer-key grading)
  requiredMassFlowLbHr?: number;
  requiredVolFlowGpm?: number;

  // Gas/steam properties
  mw?: number;
  k?: number;
  z?: number;

  // Liquid properties
  densitySg?: number;
  viscosityCp?: number;
  vaporPressurePsia?: number;

  // Backpressure (logic training, not equations)
  superimposedBackpressurePsig?: number;
  builtUpBackpressurePsig?: number;

  notes?: string;
}

export type DatasheetField = keyof Datasheet;

export interface ScenarioAttachment {
  id: string;
  title: string;
  type: "svg" | "markdown";
  contentRef: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;

  serviceType: ServiceType;
  difficulty: Difficulty;

  constraints: string[];
  datasheetRequirements: DatasheetField[];

  visuals: {
    thumbnail: VisualKey;
    widgets: VisualWidgetKey[];
  };

  attachments?: ScenarioAttachment[];

  // Scoring configuration
  basePoints: number;
  isHardEligible: boolean;
}

export interface CommonMistake {
  key: string;
  message: string;
}

export interface CriticalRule {
  key: string;
  when: string; // condition key for code evaluation
  capScoreAt: number;
  penaltyPoints: number;
  message: string;
}

export interface Outcome {
  scenarioId: string;
  correctRelievingCase: RelievingCase;
  correctValveStyle: ValveStyle;
  correctOrificeLetter: OrificeLetter;
  rationaleBullets: string[];
  commonMistakes: CommonMistake[];
  requiredFieldsForFullCredit: DatasheetField[];
  // New fields for enhanced scoring
  criticalRules?: CriticalRule[];
  explanationKeywords?: string[];
}

export interface PlayerAnswers {
  relievingCase: RelievingCase;
  valveStyle: ValveStyle;
  orificeLetter: OrificeLetter;
}

export interface GradeTelemetry {
  hintsUsed: number;
  attachmentsOpened: boolean;
  attemptNumber: number;
}

export interface GradeRequest {
  scenarioId: string;
  mode: PlayMode;
  datasheet: Datasheet;
  answers: PlayerAnswers;
  explanationText?: string;
  telemetry: GradeTelemetry;
}

// Legacy score breakdown for backward compatibility
export interface ScoreBreakdownLegacy {
  datasheetScore: number;
  datasheetMax: number;
  decisionScore: number;
  decisionMax: number;
  disciplineScore: number;
  disciplineMax: number;
  total: number;
}

// New detailed score breakdown
export interface ScoreBreakdown {
  datasheetQuality: number; // 0-30
  decisionAccuracy: number; // 0-45
  discipline: number; // 0-15
  explanation: number; // 0-10
  // Legacy fields for backward compatibility with UI
  datasheetScore: number;
  datasheetMax: number;
  decisionScore: number;
  decisionMax: number;
  disciplineScore: number;
  disciplineMax: number;
  total: number;
}

export interface GradeResult {
  scenarioId: string;
  score: number; // 0-100 competency score
  pointsEarned: number; // variable XP/points
  capsApplied: string[];
  criticalMistakes: string[];
  breakdown: ScoreBreakdown;
  missingFields: DatasheetField[];
  mistakes: string[];
  remediationSteps: string[];
  xpAwarded: number; // alias for pointsEarned for backward compatibility
  correctAnswers: PlayerAnswers;
  mode: PlayMode;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export type RankTitle = "Apprentice" | "Technician" | "Specialist" | "Lead";

export interface HardModeProgress {
  isUnlocked: boolean;
  qualifyingAttempts: number; // attempts with score >= 85 in standard mode
  unlockedAt?: string;
}

export interface PlayerProfile {
  xp: number;
  rank: RankTitle;
  badges: Badge[];
  mistakeBank: string[];
  completedScenarios: string[];
  scenarioAttempts: Record<string, number>;
  scenarioBestScores: Record<string, number>;
  hardModeProgress: HardModeProgress;
}

export interface AttemptRecord {
  attemptId: string;
  timestamp: string;
  score: number;
  pointsEarned: number;
  breakdown: ScoreBreakdown;
  answers: PlayerAnswers;
  datasheet: Datasheet;
  mode: PlayMode;
  explanationText?: string;
}
