"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import type { Datasheet, DatasheetField, ServiceType, Scenario } from "@/lib/psv/types";
import {
  partialDatasheetSchema,
  calculateCompleteness,
  FIELD_METADATA,
} from "@/lib/psv/datasheetSchema";

interface DatasheetFormProps {
  scenario: Scenario;
  datasheet: Partial<Datasheet>;
  onChange: (datasheet: Partial<Datasheet>) => void;
}

const SERVICE_TYPE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "gas", label: "Gas" },
  { value: "steam", label: "Steam" },
  { value: "liquid", label: "Liquid" },
  { value: "two_phase", label: "Two-Phase" },
];

const RELIEVING_CASE_OPTIONS = [
  { value: "blocked_outlet", label: "Blocked Outlet" },
  { value: "fire_case", label: "Fire Case" },
  { value: "control_valve_failure", label: "Control Valve Failure" },
  { value: "thermal_expansion", label: "Thermal Expansion" },
  { value: "utility_failure", label: "Utility Failure" },
  { value: "check_valve_failure", label: "Check Valve Failure" },
  { value: "other", label: "Other" },
];

const DISCHARGE_TO_OPTIONS = [
  { value: "atm", label: "Atmosphere" },
  { value: "flare", label: "Flare" },
  { value: "closed", label: "Closed System" },
];

export function DatasheetForm({
  scenario,
  datasheet,
  onChange,
}: DatasheetFormProps) {
  const form = useForm({
    resolver: zodResolver(partialDatasheetSchema),
    defaultValues: {
      scenarioId: scenario.id,
      serviceType: scenario.serviceType,
      ...datasheet,
    },
  });

  const watchedValues = form.watch();
  const serviceType = watchedValues.serviceType;

  // Calculate completeness
  const completeness = calculateCompleteness(
    watchedValues as Partial<Datasheet>,
    scenario.datasheetRequirements
  );

  // Notify parent of changes
  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as Partial<Datasheet>);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // Determine which fields to show based on service type
  const showGasFields = serviceType === "gas" || serviceType === "steam";
  const showLiquidFields = serviceType === "liquid";
  const showBackpressureFields = scenario.datasheetRequirements.includes(
    "superimposedBackpressurePsig"
  );

  const renderField = (field: DatasheetField) => {
    const meta = FIELD_METADATA[field];
    if (!meta) return null;

    const isRequired = scenario.datasheetRequirements.includes(field);
    return (
      <div key={field} className="space-y-1">
        <Label
          htmlFor={field}
          className="text-xs font-medium text-[var(--puffer-gray)]"
        >
          {meta.label}
          {meta.unit && <span className="text-[var(--puffer-gray-2)]"> ({meta.unit})</span>}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {meta.type === "number" && (
          <Input
            id={field}
            type="number"
            step="any"
            placeholder={meta.placeholder}
            className="h-8 text-sm bg-white border-[var(--puffer-border)] focus:border-[var(--puffer-navy)]"
            {...form.register(field as keyof typeof watchedValues, {
              valueAsNumber: true,
            })}
          />
        )}
        {meta.type === "text" && (
          <Input
            id={field}
            type="text"
            placeholder={meta.placeholder}
            className="h-8 text-sm bg-white border-[var(--puffer-border)] focus:border-[var(--puffer-navy)]"
            {...form.register(field as keyof typeof watchedValues)}
          />
        )}
        {meta.type === "textarea" && (
          <Textarea
            id={field}
            placeholder={meta.placeholder}
            className="text-sm bg-white border-[var(--puffer-border)] focus:border-[var(--puffer-navy)] min-h-[60px]"
            {...form.register(field as keyof typeof watchedValues)}
          />
        )}
      </div>
    );
  };

  return (
    <Card className="border-[var(--puffer-border)] bg-white">
      <CardHeader className="pb-3 border-b border-[var(--puffer-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--puffer-navy)"
              strokeWidth="2"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            <CardTitle className="text-base text-[var(--puffer-navy)]">
              PSV Datasheet
            </CardTitle>
          </div>
        </div>
        
        {/* Completeness Ring */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--puffer-gray)]">
              Completeness
            </span>
            <span className="text-xs font-semibold text-[var(--puffer-navy)]">
              {completeness}%
            </span>
          </div>
          <Progress
            value={completeness}
            className="h-2"
          />
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4 max-h-[500px] overflow-y-auto">
        {/* Service Type & Basis */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-[var(--puffer-navy)] uppercase tracking-wide">
            Service & Basis
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-[var(--puffer-gray)]">
                Service Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={serviceType}
                onValueChange={(value) =>
                  form.setValue("serviceType", value as ServiceType)
                }
              >
                <SelectTrigger className="h-8 text-sm bg-white border-[var(--puffer-border)]">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-[var(--puffer-gray)]">
                Relieving Case <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watchedValues.relievingCase as string}
                onValueChange={(value) => form.setValue("relievingCase", value as typeof datasheet.relievingCase)}
              >
                <SelectTrigger className="h-8 text-sm bg-white border-[var(--puffer-border)]">
                  <SelectValue placeholder="Select case" />
                </SelectTrigger>
                <SelectContent>
                  {RELIEVING_CASE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-[var(--puffer-gray)]">
              Discharge To <span className="text-red-500">*</span>
            </Label>
            <Select
              value={watchedValues.dischargeTo as string}
                onValueChange={(value) => form.setValue("dischargeTo", value as typeof datasheet.dischargeTo)}
            >
              <SelectTrigger className="h-8 text-sm bg-white border-[var(--puffer-border)]">
                <SelectValue placeholder="Select discharge" />
              </SelectTrigger>
              <SelectContent>
                {DISCHARGE_TO_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pressures & Temperature */}
        <div className="space-y-3 pt-3 border-t border-[var(--puffer-border)]">
          <h4 className="text-xs font-semibold text-[var(--puffer-navy)] uppercase tracking-wide">
            Pressures & Temperature
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {renderField("setPressurePsig")}
            {renderField("relievingTempF")}
          </div>
        </div>

        {/* Capacity Basis */}
        <div className="space-y-3 pt-3 border-t border-[var(--puffer-border)]">
          <h4 className="text-xs font-semibold text-[var(--puffer-navy)] uppercase tracking-wide">
            Capacity Basis
          </h4>
          {showGasFields && (
            <div className="grid grid-cols-2 gap-3">
              {renderField("requiredMassFlowLbHr")}
              {renderField("mw")}
              {renderField("k")}
              {renderField("z")}
            </div>
          )}
          {showLiquidFields && (
            <div className="grid grid-cols-2 gap-3">
              {renderField("requiredVolFlowGpm")}
              {renderField("densitySg")}
              {renderField("viscosityCp")}
            </div>
          )}
        </div>

        {/* Backpressure */}
        {showBackpressureFields && (
          <div className="space-y-3 pt-3 border-t border-[var(--puffer-border)]">
            <h4 className="text-xs font-semibold text-[var(--puffer-navy)] uppercase tracking-wide">
              Backpressure
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {renderField("superimposedBackpressurePsig")}
              {renderField("builtUpBackpressurePsig")}
            </div>
          </div>
        )}

        {/* Header / Notes */}
        <div className="space-y-3 pt-3 border-t border-[var(--puffer-border)]">
          <h4 className="text-xs font-semibold text-[var(--puffer-navy)] uppercase tracking-wide">
            Documentation
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {renderField("unitArea")}
            {renderField("equipment")}
          </div>
          {renderField("preparedBy")}
          {renderField("notes")}
        </div>
      </CardContent>
    </Card>
  );
}
