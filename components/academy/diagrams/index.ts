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

// Re-export components
export { PressureBasicsDiagram } from "./PressureBasicsDiagram";
export { BackpressureDiagram } from "./BackpressureDiagram";
export { PSVStyleCutaways } from "./PSVStyleCutaways";
export { TankBreathingDiagram } from "./TankBreathingDiagram";
export { VaporControlPathDiagram } from "./VaporControlPathDiagram";
export { OverfillLayersDiagram } from "./OverfillLayersDiagram";

// Diagram key mapping for lesson sections
export const diagramComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  PressureBasicsDiagram,
  BackpressureDiagram,
  PSVStyleCutaways,
  TankBreathingDiagram,
  VaporControlPathDiagram,
  OverfillLayersDiagram,
};
