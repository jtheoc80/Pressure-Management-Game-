/**
 * Academy Diagram Components
 * Technical SVG diagrams for training lessons
 */

import { PressureBasicsDiagram } from "./PressureBasicsDiagram";
import { BackpressureDiagram } from "./BackpressureDiagram";
import { PSVStyleCutaways } from "./PSVStyleCutaways";
import { TankBreathingDiagram } from "./TankBreathingDiagram";
import { VaporControlPathDiagram } from "./VaporControlPathDiagram";
import { OverfillLayersDiagram } from "./OverfillLayersDiagram";
import { PsigPsiaDiagram } from "./PsigPsiaDiagram";
import { DischargePathsDiagram } from "./DischargePathsDiagram";
import { OrificeConceptDiagram } from "./OrificeConceptDiagram";
import { PVVentCategoriesDiagram } from "./PVVentCategoriesDiagram";
import { FlameArresterDiagram } from "./FlameArresterDiagram";
import { EmergencyVentDiagram } from "./EmergencyVentDiagram";
import { RelievingScenariosTable } from "./RelievingScenariosTable";
import { API2350CategoriesDiagram } from "./API2350CategoriesDiagram";

// Re-export components
export { PressureBasicsDiagram } from "./PressureBasicsDiagram";
export { BackpressureDiagram } from "./BackpressureDiagram";
export { PSVStyleCutaways } from "./PSVStyleCutaways";
export { TankBreathingDiagram } from "./TankBreathingDiagram";
export { VaporControlPathDiagram } from "./VaporControlPathDiagram";
export { OverfillLayersDiagram } from "./OverfillLayersDiagram";
export { PsigPsiaDiagram } from "./PsigPsiaDiagram";
export { DischargePathsDiagram } from "./DischargePathsDiagram";
export { OrificeConceptDiagram } from "./OrificeConceptDiagram";
export { PVVentCategoriesDiagram } from "./PVVentCategoriesDiagram";
export { FlameArresterDiagram } from "./FlameArresterDiagram";
export { EmergencyVentDiagram } from "./EmergencyVentDiagram";
export { RelievingScenariosTable } from "./RelievingScenariosTable";
export { API2350CategoriesDiagram } from "./API2350CategoriesDiagram";

// Diagram key mapping for lesson sections
export const diagramComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  PressureBasicsDiagram,
  BackpressureDiagram,
  PSVStyleCutaways,
  TankBreathingDiagram,
  VaporControlPathDiagram,
  OverfillLayersDiagram,
  PsigPsiaDiagram,
  DischargePathsDiagram,
  OrificeConceptDiagram,
  PVVentCategoriesDiagram,
  FlameArresterDiagram,
  EmergencyVentDiagram,
  RelievingScenariosTable,
  API2350CategoriesDiagram,
  // Aliases for backward compatibility
  ReliefPathDiagram: DischargePathsDiagram,
};
