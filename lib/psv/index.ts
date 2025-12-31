// Re-export all PSV Quest utilities
export * from "./types";
export * from "./scoring";
export * from "./datasheetSchema";
export * from "./storage";
export * from "./svg";
export * from "./brand";

// Import JSON data
import scenariosData from "./scenarios.json";
import outcomesData from "./outcomes.json";

import type { Scenario, Outcome } from "./types";

export const scenarios: Scenario[] = scenariosData as Scenario[];
export const outcomes: Outcome[] = outcomesData as Outcome[];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function getOutcomeByScenarioId(scenarioId: string): Outcome | undefined {
  return outcomes.find((o) => o.scenarioId === scenarioId);
}
