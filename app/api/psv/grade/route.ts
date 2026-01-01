import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { gradeAttempt } from "@/lib/psv/scoring";
import { getOutcomeByScenarioId, getScenarioById } from "@/lib/psv";
import type { PlayerAnswers, Datasheet, GradeTelemetry, PlayMode } from "@/lib/psv/types";

// Request validation schema
const gradeRequestSchema = z.object({
  scenarioId: z.string().min(1),
  mode: z.enum(["practice", "standard", "hard"]).default("standard"),
  datasheet: z.object({
    scenarioId: z.string(),
    serviceType: z.enum(["gas", "steam", "liquid", "two_phase"]).optional(),
    relievingCase: z
      .enum([
        "blocked_outlet",
        "fire_case",
        "control_valve_failure",
        "thermal_expansion",
        "utility_failure",
        "check_valve_failure",
        "other",
      ])
      .optional(),
    dischargeTo: z.enum(["atm", "flare", "closed"]).optional(),
    setPressurePsig: z.number().optional(),
    relievingTempF: z.number().optional(),
    requiredMassFlowLbHr: z.number().optional(),
    requiredVolFlowGpm: z.number().optional(),
    mw: z.number().optional(),
    k: z.number().optional(),
    z: z.number().optional(),
    densitySg: z.number().optional(),
    viscosityCp: z.number().optional(),
    vaporPressurePsia: z.number().optional(),
    superimposedBackpressurePsig: z.number().optional(),
    builtUpBackpressurePsig: z.number().optional(),
    unitArea: z.string().optional(),
    equipment: z.string().optional(),
    preparedBy: z.string().optional(),
    preparedAtISO: z.string().optional(),
    notes: z.string().optional(),
  }),
  answers: z.object({
    relievingCase: z.enum([
      "blocked_outlet",
      "fire_case",
      "control_valve_failure",
      "thermal_expansion",
      "utility_failure",
      "check_valve_failure",
      "other",
    ]),
    valveStyle: z.enum(["conventional", "bellows", "pilot"]),
    orificeLetter: z.enum([
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "T",
    ]),
  }),
  explanationText: z.string().optional(),
  telemetry: z
    .object({
      hintsUsed: z.number().default(0),
      attachmentsOpened: z.boolean().default(false),
      attemptNumber: z.number().default(1),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request
    const parseResult = gradeRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: parseResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { scenarioId, mode, datasheet, answers, explanationText, telemetry } =
      parseResult.data;

    // Get scenario
    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: "Scenario not found" },
        { status: 404 }
      );
    }

    // Get outcome (answer key)
    const outcome = getOutcomeByScenarioId(scenarioId);
    if (!outcome) {
      return NextResponse.json(
        { error: "Outcome not found for scenario" },
        { status: 404 }
      );
    }

    // Validate hard mode access
    if (mode === "hard" && !scenario.isHardEligible) {
      return NextResponse.json(
        { error: "This scenario is not available in Hard Mode" },
        { status: 400 }
      );
    }

    // Validate explanation text for standard and hard modes
    if (mode === "hard" && (!explanationText || explanationText.length < 20)) {
      return NextResponse.json(
        {
          error:
            "Hard mode requires an explanation of at least 20 characters",
        },
        { status: 400 }
      );
    }

    // Build telemetry with defaults
    const gradeTelemetry: GradeTelemetry = {
      hintsUsed: telemetry?.hintsUsed ?? 0,
      attachmentsOpened: telemetry?.attachmentsOpened ?? false,
      attemptNumber: telemetry?.attemptNumber ?? 1,
    };

    // Grade the attempt
    const result = gradeAttempt(
      datasheet as Datasheet,
      answers as PlayerAnswers,
      outcome,
      scenario,
      mode as PlayMode,
      explanationText,
      gradeTelemetry
    );

    // Return the result
    return NextResponse.json(result);
  } catch (error) {
    console.error("Grading error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
