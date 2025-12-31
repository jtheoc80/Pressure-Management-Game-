/**
 * PSV Quest Datasheet Validation Schema
 * Uses Zod for runtime validation with conditional requirements.
 */

import { z } from "zod";
import type { ServiceType, DatasheetField } from "./types";

// Base schema with always-required fields
const baseDatasheetSchema = z.object({
  scenarioId: z.string().min(1, "Scenario ID is required"),
  
  // Header (optional)
  unitArea: z.string().optional(),
  equipment: z.string().optional(),
  preparedBy: z.string().optional(),
  preparedAtISO: z.string().optional(),
  
  // Service type
  serviceType: z.enum(["gas", "steam", "liquid", "two_phase"], {
    message: "Service type is required",
  }),
  
  // Always required fields
  relievingCase: z.enum([
    "blocked_outlet",
    "fire_case",
    "control_valve_failure",
    "thermal_expansion",
    "utility_failure",
    "check_valve_failure",
    "other",
  ], {
    message: "Relieving case is required",
  }),
  
  dischargeTo: z.enum(["atm", "flare", "closed"], {
    message: "Discharge location is required",
  }),
  
  setPressurePsig: z
    .number({
      message: "Set pressure must be a number",
    })
    .positive("Set pressure must be positive"),
    
  relievingTempF: z
    .number({
      message: "Relieving temperature must be a number",
    }),
  
  // Gas/steam properties (conditionally required)
  requiredMassFlowLbHr: z.number().positive().optional(),
  mw: z.number().positive().optional(),
  k: z.number().positive().optional(),
  z: z.number().positive().optional(),
  
  // Liquid properties (conditionally required)
  requiredVolFlowGpm: z.number().positive().optional(),
  densitySg: z.number().positive().optional(),
  viscosityCp: z.number().positive().optional(),
  vaporPressurePsia: z.number().optional(),
  
  // Backpressure
  superimposedBackpressurePsig: z.number().optional(),
  builtUpBackpressurePsig: z.number().optional(),
  
  // Notes
  notes: z.string().optional(),
});

// Gas/steam service requires mass flow and gas properties
const gasServiceRefinement = (data: z.infer<typeof baseDatasheetSchema>) => {
  if (data.serviceType === "gas" || data.serviceType === "steam") {
    return (
      data.requiredMassFlowLbHr !== undefined &&
      data.mw !== undefined &&
      data.k !== undefined &&
      data.z !== undefined
    );
  }
  return true;
};

// Liquid service requires volumetric flow and liquid properties
const liquidServiceRefinement = (data: z.infer<typeof baseDatasheetSchema>) => {
  if (data.serviceType === "liquid") {
    return (
      data.requiredVolFlowGpm !== undefined &&
      data.densitySg !== undefined
    );
  }
  return true;
};

// Full datasheet schema with conditional validation
export const datasheetSchema = baseDatasheetSchema
  .refine(gasServiceRefinement, {
    message: "Gas/steam service requires mass flow, MW, k, and Z values",
  })
  .refine(liquidServiceRefinement, {
    message: "Liquid service requires volumetric flow and specific gravity",
  });

// Partial schema for progressive validation (as user fills form)
export const partialDatasheetSchema = baseDatasheetSchema.partial();

// Type for form data
export type DatasheetFormData = z.infer<typeof baseDatasheetSchema>;
export type PartialDatasheetFormData = z.infer<typeof partialDatasheetSchema>;

/**
 * Validate datasheet for submission
 */
export function validateDatasheet(data: unknown): {
  success: boolean;
  data?: DatasheetFormData;
  errors?: z.ZodError;
} {
  const result = datasheetSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Check which required fields are missing for a scenario
 */
export function getMissingRequiredFields(
  data: Partial<DatasheetFormData>,
  requiredFields: DatasheetField[]
): DatasheetField[] {
  const missing: DatasheetField[] = [];
  
  for (const field of requiredFields) {
    const value = data[field as keyof DatasheetFormData];
    if (value === undefined || value === null || value === "") {
      missing.push(field);
    }
  }
  
  return missing;
}

/**
 * Calculate form completeness percentage
 */
export function calculateCompleteness(
  data: Partial<DatasheetFormData>,
  requiredFields: DatasheetField[]
): number {
  const missing = getMissingRequiredFields(data, requiredFields);
  const filled = requiredFields.length - missing.length;
  return Math.round((filled / requiredFields.length) * 100);
}

/**
 * Get conditional requirements based on service type
 */
export function getConditionalRequirements(serviceType?: ServiceType): DatasheetField[] {
  const base: DatasheetField[] = [
    "relievingCase",
    "dischargeTo",
    "setPressurePsig",
    "relievingTempF",
    "serviceType",
  ];
  
  if (serviceType === "gas" || serviceType === "steam") {
    return [...base, "requiredMassFlowLbHr", "mw", "k", "z"];
  }
  
  if (serviceType === "liquid") {
    return [...base, "requiredVolFlowGpm", "densitySg"];
  }
  
  if (serviceType === "two_phase") {
    return [...base, "requiredMassFlowLbHr", "requiredVolFlowGpm", "mw", "densitySg"];
  }
  
  return base;
}

/**
 * Field metadata for form rendering
 */
export const FIELD_METADATA: Record<DatasheetField, {
  label: string;
  unit?: string;
  placeholder?: string;
  type: "text" | "number" | "select" | "textarea";
}> = {
  scenarioId: { label: "Scenario ID", type: "text" },
  unitArea: { label: "Unit / Area", type: "text", placeholder: "e.g., Crude Unit – Overhead" },
  equipment: { label: "Equipment Tag", type: "text", placeholder: "e.g., V-101" },
  preparedBy: { label: "Prepared By", type: "text" },
  preparedAtISO: { label: "Date", type: "text" },
  serviceType: { label: "Service Type", type: "select" },
  relievingCase: { label: "Relieving Case", type: "select" },
  dischargeTo: { label: "Discharge To", type: "select" },
  setPressurePsig: { label: "Set Pressure", unit: "psig", type: "number" },
  relievingTempF: { label: "Relieving Temperature", unit: "°F", type: "number" },
  requiredMassFlowLbHr: { label: "Required Mass Flow", unit: "lb/hr", type: "number" },
  requiredVolFlowGpm: { label: "Required Volumetric Flow", unit: "GPM", type: "number" },
  mw: { label: "Molecular Weight", type: "number" },
  k: { label: "Specific Heat Ratio (k)", type: "number", placeholder: "Cp/Cv" },
  z: { label: "Compressibility (Z)", type: "number" },
  densitySg: { label: "Specific Gravity", type: "number" },
  viscosityCp: { label: "Viscosity", unit: "cP", type: "number" },
  vaporPressurePsia: { label: "Vapor Pressure", unit: "psia", type: "number" },
  superimposedBackpressurePsig: { label: "Superimposed Backpressure", unit: "psig", type: "number" },
  builtUpBackpressurePsig: { label: "Built-up Backpressure", unit: "psig", type: "number" },
  notes: { label: "Notes", type: "textarea" },
};
