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
} from "./types";

const DATASHEET_MAX = 40;
const DECISION_MAX = 50;
const DISCIPLINE_MAX = 10;

const DIFFICULTY_MULTIPLIERS: Record<number, number> = {
  1: 1.0,
  2: 1.2,
  3: 1.5,
  4: 1.8,
  5: 2.0,
};

/**
 * Calculate datasheet completeness score
 */
export function scoreDatasheet(
  datasheet: Datasheet,
  requiredFields: DatasheetField[]
): { score: number; missingFields: DatasheetField[] } {
  const missingFields: DatasheetField[] = [];

  for (const field of requiredFields) {
    const value = datasheet[field];
    if (value === undefined || value === null || value === "") {
      missingFields.push(field);
    }
  }

  const filledCount = requiredFields.length - missingFields.length;
  const completionRatio = filledCount / requiredFields.length;
  const score = Math.round(completionRatio * DATASHEET_MAX);

  return { score, missingFields };
}

/**
 * Calculate decision correctness score
 */
export function scoreDecisions(
  answers: PlayerAnswers,
  outcome: Outcome
): { score: number; mistakes: string[] } {
  let score = 0;
  const mistakes: string[] = [];

  // Relieving case: 20 points
  if (answers.relievingCase === outcome.correctRelievingCase) {
    score += 20;
  } else {
    const commonMistake = outcome.commonMistakes.find((m) =>
      m.key.includes("wrong_case")
    );
    mistakes.push(
      commonMistake?.message ||
        `Incorrect relieving case. Expected: ${outcome.correctRelievingCase}`
    );
  }

  // Valve style: 20 points
  if (answers.valveStyle === outcome.correctValveStyle) {
    score += 20;
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

  // Orifice letter: 10 points
  if (answers.orificeLetter === outcome.correctOrificeLetter) {
    score += 10;
  } else {
    const commonMistake = outcome.commonMistakes.find(
      (m) => m.key.includes("orifice") || m.key.includes("sized")
    );
    mistakes.push(
      commonMistake?.message ||
        `Incorrect orifice selection. Expected: ${outcome.correctOrificeLetter}`
    );
  }

  return { score, mistakes };
}

/**
 * Calculate process discipline score
 * Rewards thoroughness and penalizes risky assumptions
 */
export function scoreDiscipline(
  datasheet: Datasheet,
  answers: PlayerAnswers
): number {
  let score = DISCIPLINE_MAX;

  // Deduct for missing optional but important fields
  if (datasheet.notes === undefined || datasheet.notes.trim() === "") {
    score -= 2; // No documentation notes
  }

  if (datasheet.preparedBy === undefined || datasheet.preparedBy.trim() === "") {
    score -= 1; // No preparer identification
  }

  // Deduct for high-risk combinations that weren't caught
  if (
    datasheet.dischargeTo === "flare" &&
    !datasheet.superimposedBackpressurePsig &&
    answers.valveStyle === "conventional"
  ) {
    score -= 3; // Risky assumption: flare with conventional and no BP documented
  }

  // Ensure score doesn't go negative
  return Math.max(0, score);
}

/**
 * Generate remediation steps based on mistakes
 */
export function generateRemediation(
  mistakes: string[],
  missingFields: DatasheetField[]
): string[] {
  const steps: string[] = [];

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
 * Calculate XP based on score and difficulty
 */
export function calculateXP(score: number, difficulty: number): number {
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty] || 1.0;
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
 * Main grading function
 */
export function gradeAttempt(
  datasheet: Datasheet,
  answers: PlayerAnswers,
  outcome: Outcome,
  difficulty: number
): GradeResult {
  const datasheetResult = scoreDatasheet(
    datasheet,
    outcome.requiredFieldsForFullCredit
  );
  const decisionResult = scoreDecisions(answers, outcome);
  const disciplineScore = scoreDiscipline(datasheet, answers);

  const totalScore =
    datasheetResult.score + decisionResult.score + disciplineScore;

  const breakdown: ScoreBreakdown = {
    datasheetScore: datasheetResult.score,
    datasheetMax: DATASHEET_MAX,
    decisionScore: decisionResult.score,
    decisionMax: DECISION_MAX,
    disciplineScore,
    disciplineMax: DISCIPLINE_MAX,
    total: totalScore,
  };

  const remediationSteps = generateRemediation(
    decisionResult.mistakes,
    datasheetResult.missingFields
  );

  const xpAwarded = calculateXP(totalScore, difficulty);

  return {
    scenarioId: outcome.scenarioId,
    score: totalScore,
    breakdown,
    missingFields: datasheetResult.missingFields,
    mistakes: decisionResult.mistakes,
    remediationSteps,
    xpAwarded,
    correctAnswers: {
      relievingCase: outcome.correctRelievingCase,
      valveStyle: outcome.correctValveStyle,
      orificeLetter: outcome.correctOrificeLetter,
    },
  };
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
        scenarioId === "gas-flare-backpressure" &&
        result.mistakes.length === 0
      );
    case "no_missing_inputs":
      return result.missingFields.length === 0;
    case "first_attempt":
      return previousResults.length === 0;
    case "perfectionist":
      return result.score === 100;
    default:
      return false;
  }
}
