/**
 * Diagram Registry - Central mapping of diagram keys to React components
 * 
 * This registry enables lessons to reference diagrams by key string rather
 * than requiring direct imports. The LessonRenderer uses this registry
 * to dynamically render diagrams.
 */

import { ComponentType } from "react";

// Original diagrams from components/academy/diagrams/
import {
  PsigPsiaDiagram,
  DischargePathsDiagram,
  OrificeConceptDiagram,
  PVVentCategoriesDiagram,
  FlameArresterDiagram,
  EmergencyVentDiagram,
  RelievingScenariosTable,
  API2350CategoriesDiagram,
  TankBreathingDiagram,
} from "@/components/academy/diagrams";

// PSV visual components
import {
  BackpressureGauge,
  OrificeWheel,
  ReliefPathDiagram,
  ValveCutaway,
} from "@/components/psv/visuals";

// Diagram Pack v1
import {
  RelievingCaseDecisionTree,
  MAWPSetPressureAccumulation,
  BlowdownConcept,
  ChokedFlowConcept,
  GasPropsCard,
  LiquidPropsCard,
  NameplateReaderPSV,
  OrificeCapacityLadder,
  BackpressureImpactOnConventional,
  DischargeDestinations,
  SizingWorkflowChecklist,
  DatasheetMapGasSteam,
  DatasheetMapLiquid,
  CommonInstallationMistakesPSV,
  FlareHeaderVariableBP,
  SteamHeaderBlockedOutletSketch,
  ThermalExpansionBlockedInLiquid,
  FireCaseExposure,
  PVVentVsEmergencyVent,
  TankBreathingTriggers,
  VaporControlDecisionMap,
  FlameVsDetonationZones,
  ArresterPlacementExamples,
  TerminalLoadingVaporManifold,
  OverfillEventTimeline,
  AlarmLayeringDiagram,
  GaugeTypesComparison,
  UnitsConversionWorkbench,
  AssumptionsGoodBad,
  CommonMistakesWall,
} from "@/components/academy/diagrams/pack1";

/**
 * Registry mapping diagram keys to their React components
 * Keys should be kebab-case, descriptive, and consistent
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const diagramRegistry: Record<string, ComponentType<any>> = {
  // === ORIGINAL DIAGRAMS ===
  
  // Pressure & Units
  "psig-psia": PsigPsiaDiagram,
  "psig-vs-psia": PsigPsiaDiagram, // alias
  
  // PSV Fundamentals
  "discharge-paths": DischargePathsDiagram,
  "relief-path": ReliefPathDiagram,
  "orifice-concept": OrificeConceptDiagram,
  "valve-cutaway": ValveCutaway,
  "backpressure-gauge": BackpressureGauge,
  "orifice-wheel": OrificeWheel,
  
  // API Tables
  "relieving-scenarios": RelievingScenariosTable,
  "api-521-scenarios": RelievingScenariosTable, // alias
  
  // Tank & Venting
  "pv-vent-categories": PVVentCategoriesDiagram,
  "tank-breathing": TankBreathingDiagram,
  "emergency-vent": EmergencyVentDiagram,
  "flame-arrester": FlameArresterDiagram,
  "api-2350-categories": API2350CategoriesDiagram,
  
  // === DIAGRAM PACK V1 ===
  
  // PSV Fundamentals & Decision Making
  "relieving-case-decision-tree": RelievingCaseDecisionTree,
  "mawp-set-accumulation": MAWPSetPressureAccumulation,
  "blowdown-concept": BlowdownConcept,
  "choked-flow": ChokedFlowConcept,
  "critical-flow": ChokedFlowConcept, // alias
  
  // Properties & Data Cards
  "gas-props": GasPropsCard,
  "gas-properties": GasPropsCard, // alias
  "liquid-props": LiquidPropsCard,
  "liquid-properties": LiquidPropsCard, // alias
  "nameplate-reader": NameplateReaderPSV,
  "psv-nameplate": NameplateReaderPSV, // alias
  
  // Orifice & Sizing
  "orifice-ladder": OrificeCapacityLadder,
  "api-526-orifices": OrificeCapacityLadder, // alias
  "backpressure-impact": BackpressureImpactOnConventional,
  "conventional-bp": BackpressureImpactOnConventional, // alias
  "discharge-destinations": DischargeDestinations,
  "sizing-workflow": SizingWorkflowChecklist,
  "sizing-checklist": SizingWorkflowChecklist, // alias
  
  // Datasheets
  "datasheet-gas": DatasheetMapGasSteam,
  "datasheet-steam": DatasheetMapGasSteam, // alias
  "datasheet-liquid": DatasheetMapLiquid,
  
  // Installation & Issues
  "installation-mistakes": CommonInstallationMistakesPSV,
  "psv-installation": CommonInstallationMistakesPSV, // alias
  "flare-header-bp": FlareHeaderVariableBP,
  "variable-backpressure": FlareHeaderVariableBP, // alias
  
  // Relieving Scenarios
  "blocked-outlet-steam": SteamHeaderBlockedOutletSketch,
  "steam-blocked-outlet": SteamHeaderBlockedOutletSketch, // alias
  "thermal-expansion": ThermalExpansionBlockedInLiquid,
  "blocked-in-liquid": ThermalExpansionBlockedInLiquid, // alias
  "fire-case": FireCaseExposure,
  "wetted-area": FireCaseExposure, // alias
  
  // Tank Venting - Pack v1
  "pv-vs-emergency": PVVentVsEmergencyVent,
  "breathing-triggers": TankBreathingTriggers,
  "tank-breathing-causes": TankBreathingTriggers, // alias
  "vapor-control-map": VaporControlDecisionMap,
  "vapor-decision": VaporControlDecisionMap, // alias
  
  // Flame Arresters - Pack v1
  "flame-vs-detonation": FlameVsDetonationZones,
  "ddt-zones": FlameVsDetonationZones, // alias
  "arrester-placement": ArresterPlacementExamples,
  "fa-placement": ArresterPlacementExamples, // alias
  
  // Terminal Operations
  "vapor-manifold": TerminalLoadingVaporManifold,
  "loading-vapor": TerminalLoadingVaporManifold, // alias
  "overfill-timeline": OverfillEventTimeline,
  "api-2350-timeline": OverfillEventTimeline, // alias
  "alarm-layering": AlarmLayeringDiagram,
  "level-alarms": AlarmLayeringDiagram, // alias
  "gauge-types": GaugeTypesComparison,
  "atg-comparison": GaugeTypesComparison, // alias
  
  // Interactive / Utilities
  "units-workbench": UnitsConversionWorkbench,
  "unit-conversion": UnitsConversionWorkbench, // alias
  "assumptions": AssumptionsGoodBad,
  "good-bad-assumptions": AssumptionsGoodBad, // alias
  "common-mistakes": CommonMistakesWall,
  "mistake-wall": CommonMistakesWall, // alias
};

/**
 * Get a diagram component by key
 * Returns undefined if key not found
 */
export function getDiagram(key: string): ComponentType | undefined {
  return diagramRegistry[key];
}

/**
 * Check if a diagram key exists in the registry
 */
export function hasDiagram(key: string): boolean {
  return key in diagramRegistry;
}

/**
 * Get all available diagram keys
 */
export function getDiagramKeys(): string[] {
  return Object.keys(diagramRegistry);
}

/**
 * Get diagram keys grouped by category
 */
export function getDiagramsByCategory(): Record<string, string[]> {
  return {
    "Pressure & Units": ["psig-psia", "units-workbench"],
    "PSV Fundamentals": [
      "relieving-case-decision-tree",
      "mawp-set-accumulation", 
      "blowdown-concept",
      "choked-flow",
      "valve-cutaway",
      "nameplate-reader",
    ],
    "Orifice & Sizing": [
      "orifice-concept",
      "orifice-ladder",
      "sizing-workflow",
      "assumptions",
    ],
    "Properties": [
      "gas-props",
      "liquid-props",
    ],
    "Discharge & Backpressure": [
      "discharge-paths",
      "discharge-destinations",
      "backpressure-impact",
      "flare-header-bp",
    ],
    "Datasheets": [
      "datasheet-gas",
      "datasheet-liquid",
    ],
    "Relieving Scenarios": [
      "relieving-scenarios",
      "blocked-outlet-steam",
      "thermal-expansion",
      "fire-case",
    ],
    "Installation": [
      "installation-mistakes",
    ],
    "Tank Venting": [
      "tank-breathing",
      "breathing-triggers",
      "pv-vent-categories",
      "pv-vs-emergency",
      "emergency-vent",
      "vapor-control-map",
    ],
    "Flame Arresters": [
      "flame-arrester",
      "flame-vs-detonation",
      "arrester-placement",
    ],
    "Terminal & Overfill": [
      "api-2350-categories",
      "overfill-timeline",
      "vapor-manifold",
      "alarm-layering",
      "gauge-types",
    ],
    "Common Mistakes": [
      "common-mistakes",
    ],
  };
}

export default diagramRegistry;
