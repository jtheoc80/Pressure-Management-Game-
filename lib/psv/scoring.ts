/**
 * PSV Quest Scoring System
 * Training game only – grades against stored answer keys.
 */

import type {
  Datasheet,
  DatasheetField,
  Outcome,
  PlayerAnswers,
  ScoreBreakdown,
  GradeResult,
  RankTitle,
  PlayMode,
  GradeTelemetry,
  Scenario,
} from "./types";

// Score maximums for new breakdown
const DATASHEET_QUALITY_MAX = 30;
const DECISION_ACCURACY_MAX = 45;
const DISCIPLINE_MAX = 15;
const EXPLANATION_MAX = 10;

// Legacy maximums for backward compatibility
const LEGACY_DATASHEET_MAX = 40;
const LEGACY_DECISION_MAX = 50;
const LEGACY_DISCIPLINE_MAX = 10;

// Mode multipliers
const MODE_MULTIPLIERS: Record<PlayMode, number> = {
  practice: 0.75,
  standard: 1.0,
  hard: 2.0,
};

// Decision weights
const DECISION_WEIGHTS = {
  relievingCase: 15,
  valveStyle: 20,
  orificeLetter: 10,
} as const;

/**
 * Calculate datasheet quality score (0-30)
 * Evaluates required fields, sanity checks, and proper unit usage
 */
export function computeDatasheetQuality(
  datasheet: Datasheet,
  requiredFields: DatasheetField[],
  serviceType: string
): { score: number; missingFields: DatasheetField[]; issues: string[] } {
  const missingFields: DatasheetField[] = [];
  const issues: string[] = [];
  let score = DATASHEET_QUALITY_MAX;

  // Check required fields (max -15 points)
  for (const field of requiredFields) {
    const value = datasheet[field];
    if (value === undefined || value === null || value === "") {
      missingFields.push(field);
    }
  }

  const missingPenalty = Math.min(
    15,
    (missingFields.length / requiredFields.length) * 20
  );
  score -= missingPenalty;

  // Service-conditional checks
  if (serviceType === "liquid") {
    // Liquid should use volumetric flow, not mass flow
    if (datasheet.requiredMassFlowLbHr && !datasheet.requiredVolFlowGpm) {
      score -= 3;
      issues.push("Liquid service should use volumetric flow (GPM)");
    }
    // Check for density
    if (!datasheet.densitySg) {
      score -= 2;
      issues.push("Specific gravity required for liquid service");
    }
  } else {
    // Gas/steam should have MW, k, z
    if (!datasheet.mw) {
      score -= 2;
      issues.push("Molecular weight required for gas/steam service");
    }
    if (!datasheet.k) {
      score -= 1;
      issues.push("Specific heat ratio (k) recommended for gas/steam");
    }
  }

  // Unit sanity checks
  if (datasheet.setPressurePsig !== undefined) {
    // Set pressure should typically be positive and reasonable
    if (datasheet.setPressurePsig < 0) {
      score -= 3;
      issues.push("Set pressure cannot be negative");
    }
    if (datasheet.setPressurePsig > 5000) {
      score -= 2;
      issues.push("Set pressure unusually high - verify units");
    }
  }

  if (datasheet.relievingTempF !== undefined) {
    // Temperature sanity
    if (datasheet.relievingTempF < -100 || datasheet.relievingTempF > 1500) {
      score -= 2;
      issues.push("Relieving temperature outside typical range");
    }
  }

  // Backpressure documentation check for flare service
  if (datasheet.dischargeTo === "flare") {
    if (!datasheet.superimposedBackpressurePsig) {
      score -= 3;
      issues.push("Superimposed backpressure required for flare service");
    }
    if (!datasheet.builtUpBackpressurePsig) {
      score -= 2;
      issues.push("Built-up backpressure recommended for flare service");
    }
  }

  // Unknown/default selections penalty
  if (datasheet.relievingCase === "other") {
    score -= 2;
    issues.push("Specific relieving case should be identified");
  }

  return {
    score: Math.max(0, Math.round(score)),
    missingFields,
    issues,
  };
}

/**
 * Calculate decision accuracy score (0-45)
 * Weighted scoring for each decision type
 */
export function computeDecisionAccuracy(
  answers: PlayerAnswers,
  outcome: Outcome
): { score: number; mistakes: string[]; correctCount: number } {
  let score = 0;
  const mistakes: string[] = [];
  let correctCount = 0;

  // Relieving case: weight 15
  if (answers.relievingCase === outcome.correctRelievingCase) {
    score += DECISION_WEIGHTS.relievingCase;
    correctCount++;
  } else {
    const commonMistake = outcome.commonMistakes.find((m) =>
      m.key.includes("wrong_case")
    );
    mistakes.push(
      commonMistake?.message ||
        `Incorrect relieving case. Expected: ${outcome.correctRelievingCase}`
    );
  }

  // Valve style: weight 20
  if (answers.valveStyle === outcome.correctValveStyle) {
    score += DECISION_WEIGHTS.valveStyle;
    correctCount++;
  } else {
    const commonMistake = outcome.commonMistakes.find(
      (m) =>
        m.key.includes("conventional") ||
        m.key.includes("bellows") ||
        m.key.includes("pilot")
    );
    mistakes.push(
      commonMistake?.message ||
        `Incorrect valve style. Expected: ${outcome.correctValveStyle}`
    );
  }

  // Orifice letter: weight 10
  if (answers.orificeLetter === outcome.correctOrificeLetter) {
    score += DECISION_WEIGHTS.orificeLetter;
    correctCount++;
  } else {
    const commonMistake = outcome.commonMistakes.find(
      (m) => m.key.includes("orifice") || m.key.includes("sized")
    );
    mistakes.push(
      commonMistake?.message ||
        `Incorrect orifice selection. Expected: ${outcome.correctOrificeLetter}`
    );
  }

  return { score, mistakes, correctCount };
}

/**
 * Calculate discipline score (0-15)
 * Rewards thoroughness and process discipline
 */
export function computeDiscipline(
  datasheet: Datasheet,
  answers: PlayerAnswers,
  telemetry: GradeTelemetry,
  mode: PlayMode,
  missingFieldCount: number
): { score: number; bonuses: string[]; penalties: string[] } {
  let score = DISCIPLINE_MAX;
  const bonuses: string[] = [];
  const penalties: string[] = [];

  // Attachment review bonus (+2)
  if (telemetry.attachmentsOpened) {
    bonuses.push("Reviewed attachments");
  } else {
    score -= 2;
    penalties.push("Did not review attachments");
  }

  // Hints penalty (-3 for any hints, -5 in hard mode)
  if (telemetry.hintsUsed > 0) {
    const hintPenalty = mode === "hard" ? 5 : 3;
    score -= hintPenalty;
    penalties.push(`Used ${telemetry.hintsUsed} hint(s)`);
  }

  // No missing required fields bonus (+3)
  if (missingFieldCount === 0) {
    bonuses.push("Complete datasheet");
  } else {
    score -= Math.min(5, missingFieldCount);
    penalties.push(`${missingFieldCount} missing required field(s)`);
  }

  // Documentation notes bonus (+2)
  if (datasheet.notes && datasheet.notes.trim().length > 10) {
    bonuses.push("Documented notes");
  } else {
    score -= 2;
  }

  // Preparer identification (+1)
  if (datasheet.preparedBy && datasheet.preparedBy.trim().length > 0) {
    bonuses.push("Identified preparer");
  } else {
    score -= 1;
  }

  // High-risk combination penalty
  if (
    datasheet.dischargeTo === "flare" &&
    !datasheet.superimposedBackpressurePsig &&
    answers.valveStyle === "conventional"
  ) {
    score -= 3;
    penalties.push("Risky combination: flare + conventional + no BP documented");
  }

  return {
    score: Math.max(0, score),
    bonuses,
    penalties,
  };
}

/**
 * Calculate explanation score (0-10)
 * Simple keyword rubric: +2 per matched keyword up to 10
 */
export function computeExplanation(
  explanationText: string | undefined,
  explanationKeywords: string[] | undefined
): { score: number; matchedKeywords: string[] } {
  if (!explanationText || explanationText.trim().length === 0) {
    return { score: 0, matchedKeywords: [] };
  }

  if (!explanationKeywords || explanationKeywords.length === 0) {
    // If no keywords defined, give partial credit for any explanation
    return {
      score: Math.min(4, Math.floor(explanationText.length / 50)),
      matchedKeywords: [],
    };
  }

  const normalizedText = explanationText.toLowerCase();
  const matchedKeywords: string[] = [];

  for (const keyword of explanationKeywords) {
    if (normalizedText.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    }
  }

  // +2 per matched keyword, max 10
  const score = Math.min(EXPLANATION_MAX, matchedKeywords.length * 2);

  return { score, matchedKeywords };
}

/**
 * Evaluate critical rules and determine score caps
 */
export function evaluateCriticalRules(
  scenario: Scenario,
  outcome: Outcome,
  datasheet: Datasheet,
  answers: PlayerAnswers,
  mode: PlayMode
): { capsApplied: string[]; criticalMistakes: string[]; lowestCap: number; totalPenalty: number } {
  const capsApplied: string[] = [];
  const criticalMistakes: string[] = [];
  let lowestCap = 100;
  let totalPenalty = 0;

  const criticalRules = outcome.criticalRules || [];

  for (const rule of criticalRules) {
    const triggered = evaluateCriticalCondition(
      rule.when,
      scenario,
      outcome,
      datasheet,
      answers
    );

    if (triggered) {
      capsApplied.push(`Score capped at ${rule.capScoreAt}: ${rule.message}`);
      criticalMistakes.push(rule.message);
      lowestCap = Math.min(lowestCap, rule.capScoreAt);

      if (mode === "hard") {
        totalPenalty += rule.penaltyPoints;
      }
    }
  }

  return { capsApplied, criticalMistakes, lowestCap, totalPenalty };
}

/**
 * Evaluate a specific critical condition
 */
function evaluateCriticalCondition(
  conditionKey: string,
  scenario: Scenario,
  outcome: Outcome,
  datasheet: Datasheet,
  answers: PlayerAnswers
): boolean {
  switch (conditionKey) {
    case "REQUIRES_BP_AWARE_STYLE":
      // Conventional valve selected when flare service with variable backpressure
      return (
        datasheet.dischargeTo === "flare" &&
        answers.valveStyle === "conventional" &&
        (datasheet.superimposedBackpressurePsig !== undefined ||
          scenario.constraints.some((c) =>
            c.toLowerCase().includes("variable backpressure")
          ))
      );

    case "REQUIRES_PILOT_FOR_HIGH_BP":
      // Bellows or conventional selected when high backpressure requires pilot
      return (
        scenario.constraints.some(
          (c) =>
            c.toLowerCase().includes("pilot") ||
            c.toLowerCase().includes("50%")
        ) &&
        answers.valveStyle !== "pilot"
      );

    case "BACKPRESSURE_FIELDS_MISSING":
      // Flare service without backpressure documentation
      return (
        datasheet.dischargeTo === "flare" &&
        !datasheet.superimposedBackpressurePsig &&
        !datasheet.builtUpBackpressurePsig
      );

    case "RELIEVING_CASE_MISMATCH":
      // Wrong relieving case selected
      return answers.relievingCase !== outcome.correctRelievingCase;

    case "LIQUID_USING_MASS_FLOW":
      // Liquid service but using mass flow instead of volumetric
      return (
        scenario.serviceType === "liquid" &&
        !!datasheet.requiredMassFlowLbHr &&
        !datasheet.requiredVolFlowGpm
      );

    case "ORIFICE_UNDERSIZED_FOR_FIRE":
      // Check if orifice might be undersized for fire case
      // Simplified: if fire case and selected orifice is significantly smaller
      return (
        answers.relievingCase === "fire_case" &&
        outcome.correctRelievingCase === "fire_case" &&
        answers.orificeLetter !== outcome.correctOrificeLetter &&
        isOrificeSmallerThan(answers.orificeLetter, outcome.correctOrificeLetter)
      );

    case "ORIFICE_UNDERSIZED_FOR_PUMP":
      // Pump dead-head case with undersized orifice
      return (
        answers.relievingCase === "blocked_outlet" &&
        outcome.correctRelievingCase === "blocked_outlet" &&
        answers.orificeLetter !== outcome.correctOrificeLetter &&
        isOrificeSmallerThan(answers.orificeLetter, outcome.correctOrificeLetter)
      );

    case "DISCHARGE_TO_WRONG_DESTINATION":
      // Fire case routed to wrong destination (e.g., VRU instead of atm)
      return (
        outcome.correctRelievingCase === "fire_case" &&
        datasheet.dischargeTo !== "atm" &&
        scenario.constraints.some(
          (c) =>
            c.toLowerCase().includes("vru") ||
            c.toLowerCase().includes("atmosphere")
        )
      );

    case "ATM_DISCHARGE_NO_ARRESTER":
      // Atmospheric discharge of flammable without arrester consideration
      // Simplified: check if scenario mentions arrester and user selected atm discharge
      return (
        datasheet.dischargeTo === "atm" &&
        scenario.constraints.some((c) =>
          c.toLowerCase().includes("flame arrester")
        )
      );

    case "LIQUID_MISSING_VAPOR_PRESSURE":
      // Liquid service without vapor pressure for flashing evaluation
      return (
        scenario.serviceType === "liquid" &&
        !datasheet.vaporPressurePsia &&
        scenario.datasheetRequirements.includes("vaporPressurePsia")
      );

    default:
      return false;
  }
}

/**
 * Check if one orifice is smaller than another
 */
function isOrificeSmallerThan(a: string, b: string): boolean {
  const order = ["D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "T"];
  return order.indexOf(a) < order.indexOf(b);
}

/**
 * Calculate points earned based on score and mode
 */
export function calculatePointsEarned(
  score: number,
  basePoints: number,
  mode: PlayMode,
  telemetry: GradeTelemetry,
  missingFieldCount: number,
  criticalPenalty: number
): number {
  // Base calculation
  const base = basePoints * (score / 100);
  const modeMultiplier = MODE_MULTIPLIERS[mode];

  // Calculate bonuses
  let bonusMultiplier = 1.0;

  // Hard mode no hints bonus (+20%)
  if (mode === "hard" && telemetry.hintsUsed === 0) {
    bonusMultiplier += 0.2;
  }

  // First attempt with high score bonus (+15%)
  if (telemetry.attemptNumber === 1 && score >= 85) {
    bonusMultiplier += 0.15;
  }

  // No missing fields bonus (+10%)
  if (missingFieldCount === 0) {
    bonusMultiplier += 0.1;
  }

  // Calculate final points
  let points = Math.round(base * modeMultiplier * bonusMultiplier);

  // Apply critical penalty (hard mode only)
  if (mode === "hard" && criticalPenalty > 0) {
    points -= criticalPenalty;
  }

  // Floor at 0 for MVP (could allow negative in hard mode if critical mistakes)
  return Math.max(0, points);
}

/**
 * Generate remediation steps based on mistakes
 */
export function generateRemediation(
  mistakes: string[],
  missingFields: DatasheetField[],
  criticalMistakes: string[]
): string[] {
  const steps: string[] = [];

  // Critical mistakes first
  if (criticalMistakes.length > 0) {
    steps.push(
      "CRITICAL: Address the critical errors identified above before proceeding."
    );
  }

  if (missingFields.length > 0) {
    steps.push(
      `Complete all required datasheet fields: ${missingFields.join(", ")}`
    );
  }

  if (mistakes.length > 0) {
    steps.push("Review the scenario constraints before selecting valve style.");
    steps.push("Consider backpressure impact on valve selection.");
  }

  // Add general learning points
  steps.push("Always verify discharge piping is adequately sized.");
  steps.push("Consider backpressure tolerance when selecting valve style.");

  return steps;
}

/**
 * Legacy XP calculation based on score and difficulty
 */
export function calculateXP(score: number, difficulty: number): number {
  const multipliers: Record<number, number> = {
    1: 1.0,
    2: 1.2,
    3: 1.5,
    4: 1.8,
    5: 2.0,
  };
  const multiplier = multipliers[difficulty] || 1.0;
  return Math.floor(score * multiplier);
}

/**
 * Determine rank based on total XP
 */
export function getRank(totalXP: number): RankTitle {
  if (totalXP >= 1000) return "Lead";
  if (totalXP >= 500) return "Specialist";
  if (totalXP >= 200) return "Technician";
  return "Apprentice";
}

/**
 * Get XP thresholds for rank progression
 */
export function getRankThresholds(): Record<RankTitle, number> {
  return {
    Apprentice: 0,
    Technician: 200,
    Specialist: 500,
    Lead: 1000,
  };
}

/**
 * Main grading function - enhanced version
 */
export function gradeAttempt(
  datasheet: Datasheet,
  answers: PlayerAnswers,
  outcome: Outcome,
  scenario: Scenario,
  mode: PlayMode = "standard",
  explanationText?: string,
  telemetry: GradeTelemetry = { hintsUsed: 0, attachmentsOpened: false, attemptNumber: 1 }
): GradeResult {
  // Calculate component scores
  const datasheetResult = computeDatasheetQuality(
    datasheet,
    outcome.requiredFieldsForFullCredit,
    scenario.serviceType
  );

  const decisionResult = computeDecisionAccuracy(answers, outcome);

  const disciplineResult = computeDiscipline(
    datasheet,
    answers,
    telemetry,
    mode,
    datasheetResult.missingFields.length
  );

  const explanationResult = computeExplanation(
    explanationText,
    outcome.explanationKeywords
  );

  // Evaluate critical rules
  const criticalResult = evaluateCriticalRules(
    scenario,
    outcome,
    datasheet,
    answers,
    mode
  );

  // Calculate raw score (0-100)
  const rawScore =
    datasheetResult.score +
    decisionResult.score +
    disciplineResult.score +
    explanationResult.score;

  // Apply score cap if critical mistakes
  const finalScore = Math.min(rawScore, criticalResult.lowestCap);

  // Calculate points earned
  const pointsEarned = calculatePointsEarned(
    finalScore,
    scenario.basePoints,
    mode,
    telemetry,
    datasheetResult.missingFields.length,
    criticalResult.totalPenalty
  );

  // Build breakdown (with legacy fields for backward compatibility)
  const breakdown: ScoreBreakdown = {
    // New breakdown fields
    datasheetQuality: datasheetResult.score,
    decisionAccuracy: decisionResult.score,
    discipline: disciplineResult.score,
    explanation: explanationResult.score,
    // Legacy fields for backward compatibility
    datasheetScore: Math.round(
      (datasheetResult.score / DATASHEET_QUALITY_MAX) * LEGACY_DATASHEET_MAX
    ),
    datasheetMax: LEGACY_DATASHEET_MAX,
    decisionScore: Math.round(
      (decisionResult.score / DECISION_ACCURACY_MAX) * LEGACY_DECISION_MAX
    ),
    decisionMax: LEGACY_DECISION_MAX,
    disciplineScore: Math.round(
      (disciplineResult.score / DISCIPLINE_MAX) * LEGACY_DISCIPLINE_MAX
    ),
    disciplineMax: LEGACY_DISCIPLINE_MAX,
    total: finalScore,
  };

  const remediationSteps = generateRemediation(
    decisionResult.mistakes,
    datasheetResult.missingFields,
    criticalResult.criticalMistakes
  );

  return {
    scenarioId: outcome.scenarioId,
    score: finalScore,
    pointsEarned,
    capsApplied: criticalResult.capsApplied,
    criticalMistakes: criticalResult.criticalMistakes,
    breakdown,
    missingFields: datasheetResult.missingFields,
    mistakes: decisionResult.mistakes,
    remediationSteps,
    xpAwarded: pointsEarned, // alias for backward compatibility
    correctAnswers: {
      relievingCase: outcome.correctRelievingCase,
      valveStyle: outcome.correctValveStyle,
      orificeLetter: outcome.correctOrificeLetter,
    },
    mode,
  };
}

/**
 * Legacy grading function for backward compatibility
 */
export function gradeAttemptLegacy(
  datasheet: Datasheet,
  answers: PlayerAnswers,
  outcome: Outcome,
  difficulty: number
): GradeResult {
  // Create a minimal scenario object for legacy calls
  const legacyScenario: Scenario = {
    id: outcome.scenarioId,
    title: "",
    description: "",
    serviceType: datasheet.serviceType || "gas",
    difficulty: difficulty as 1 | 2 | 3 | 4 | 5,
    constraints: [],
    datasheetRequirements: outcome.requiredFieldsForFullCredit,
    visuals: { thumbnail: "steam_header_thumbnail", widgets: [] },
    basePoints: 100,
    isHardEligible: false,
  };

  return gradeAttempt(datasheet, answers, outcome, legacyScenario, "standard");
}

/**
 * Badge definitions
 */
export const BADGE_DEFINITIONS = {
  datasheet_discipline: {
    id: "datasheet_discipline",
    name: "Datasheet Discipline",
    description: "Achieved ≥90% datasheet completeness on 3 scenarios",
    icon: "📋",
  },
  backpressure_aware: {
    id: "backpressure_aware",
    name: "Backpressure Aware",
    description: "Correctly handled flare/backpressure scenario",
    icon: "🎯",
  },
  no_missing_inputs: {
    id: "no_missing_inputs",
    name: "No Missing Inputs",
    description: "Completed a scenario with zero missing required fields",
    icon: "✅",
  },
  first_attempt: {
    id: "first_attempt",
    name: "First Steps",
    description: "Completed your first PSV scenario",
    icon: "🚀",
  },
  perfectionist: {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Achieved a perfect score on any scenario",
    icon: "⭐",
  },
  hard_mode_unlocked: {
    id: "hard_mode_unlocked",
    name: "Hard Mode Unlocked",
    description: "Qualified for Hard Mode challenges",
    icon: "🔓",
  },
  hard_mode_master: {
    id: "hard_mode_master",
    name: "Hard Mode Master",
    description: "Completed a Hard Mode scenario with score ≥85",
    icon: "💎",
  },
};

/**
 * Check if a badge should be awarded
 */
export function checkBadgeEligibility(
  badgeId: string,
  result: GradeResult,
  scenarioId: string,
  previousResults: GradeResult[]
): boolean {
  switch (badgeId) {
    case "datasheet_discipline": {
      const highDatasheetScores = [result, ...previousResults].filter(
        (r) => r.breakdown.datasheetScore / r.breakdown.datasheetMax >= 0.9
      );
      return highDatasheetScores.length >= 3;
    }
    case "backpressure_aware":
      return (
        scenarioId === "gas-flare-backpressure" && result.mistakes.length === 0
      );
    case "no_missing_inputs":
      return result.missingFields.length === 0;
    case "first_attempt":
      return previousResults.length === 0;
    case "perfectionist":
      return result.score === 100;
    case "hard_mode_master":
      return result.mode === "hard" && result.score >= 85;
    default:
      return false;
  }
}

/**
 * Check if Hard Mode should be unlocked
 */
export function checkHardModeUnlock(
  standardScores: number[],
  hasPassedQualification: boolean
): boolean {
  // Unlock when user has 3 standard attempts with score >= 85
  const qualifyingAttempts = standardScores.filter((s) => s >= 85).length;
  return qualifyingAttempts >= 3 || hasPassedQualification;
}
