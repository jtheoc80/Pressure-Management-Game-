"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type {
  RelievingCase,
  ValveStyle,
  OrificeLetter,
  PlayerAnswers,
} from "@/lib/psv/types";

interface DecisionStepperProps {
  answers: Partial<PlayerAnswers>;
  onChange: (answers: Partial<PlayerAnswers>) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const STEPS = [
  { id: 1, title: "Relieving Case", key: "relievingCase" },
  { id: 2, title: "Valve Style", key: "valveStyle" },
  { id: 3, title: "Orifice Selection", key: "orificeLetter" },
];

const RELIEVING_CASE_OPTIONS: { value: RelievingCase; label: string; description: string }[] = [
  {
    value: "blocked_outlet",
    label: "Blocked Outlet",
    description: "Downstream valve closure traps process flow",
  },
  {
    value: "fire_case",
    label: "Fire Case",
    description: "External fire causes vapor generation",
  },
  {
    value: "control_valve_failure",
    label: "Control Valve Failure",
    description: "CV fails open, max flow enters system",
  },
  {
    value: "thermal_expansion",
    label: "Thermal Expansion",
    description: "Trapped liquid heated by external source",
  },
  {
    value: "utility_failure",
    label: "Utility Failure",
    description: "Loss of cooling/heating utility",
  },
  {
    value: "check_valve_failure",
    label: "Check Valve Failure",
    description: "Reverse flow through failed check valve",
  },
];

const VALVE_STYLE_OPTIONS: { value: ValveStyle; label: string; description: string }[] = [
  {
    value: "conventional",
    label: "Conventional",
    description: "Standard spring-loaded, atmospheric discharge preferred",
  },
  {
    value: "bellows",
    label: "Bellows",
    description: "Isolates spring from backpressure, good for flare service",
  },
  {
    value: "pilot",
    label: "Pilot Operated",
    description: "Highest backpressure tolerance, minimal seat leakage",
  },
];

const ORIFICE_OPTIONS: OrificeLetter[] = [
  "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "T",
];

export function DecisionStepper({
  answers,
  onChange,
  currentStep,
  onStepChange,
}: DecisionStepperProps) {
  const handleRelievingCaseChange = (value: RelievingCase) => {
    onChange({ ...answers, relievingCase: value });
  };

  const handleValveStyleChange = (value: ValveStyle) => {
    onChange({ ...answers, valveStyle: value });
  };

  const handleOrificeChange = (value: OrificeLetter) => {
    onChange({ ...answers, orificeLetter: value });
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return !!answers.relievingCase;
      case 2:
        return !!answers.valveStyle;
      case 3:
        return !!answers.orificeLetter;
      default:
        return false;
    }
  };

  return (
    <Card className="border-[var(--puffer-border)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-[var(--puffer-navy)]">
          Decision Steps
        </CardTitle>
        
        {/* Step indicators */}
        <div className="flex items-center gap-2 mt-3">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onStepChange(step.id)}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-colors
                  ${currentStep === step.id
                    ? "bg-[var(--puffer-navy)] text-white"
                    : isStepComplete(step.id)
                    ? "bg-green-500 text-white"
                    : "bg-[var(--puffer-bg)] text-[var(--puffer-gray)] border border-[var(--puffer-border)]"
                  }
                `}
              >
                {isStepComplete(step.id) && currentStep !== step.id ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.id
                )}
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={`
                    w-8 h-0.5 mx-1
                    ${isStepComplete(step.id) ? "bg-green-500" : "bg-[var(--puffer-border)]"}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Step 1: Relieving Case */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--puffer-navy)]">
              Select the governing relieving case
            </h4>
            <RadioGroup
              value={answers.relievingCase}
              onValueChange={handleRelievingCaseChange}
              className="space-y-2"
            >
              {RELIEVING_CASE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className={`
                    flex items-start space-x-3 p-3 rounded-lg border cursor-pointer
                    transition-colors
                    ${answers.relievingCase === option.value
                      ? "border-[var(--puffer-navy)] bg-[var(--puffer-bg)]"
                      : "border-[var(--puffer-border)] hover:border-[var(--puffer-gray-2)]"
                    }
                  `}
                  onClick={() => handleRelievingCaseChange(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <div className="space-y-0.5">
                    <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-xs text-[var(--puffer-gray)]">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Valve Style */}
        {currentStep === 2 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--puffer-navy)]">
              Select the appropriate valve style
            </h4>
            <RadioGroup
              value={answers.valveStyle}
              onValueChange={handleValveStyleChange}
              className="space-y-2"
            >
              {VALVE_STYLE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className={`
                    flex items-start space-x-3 p-3 rounded-lg border cursor-pointer
                    transition-colors
                    ${answers.valveStyle === option.value
                      ? "border-[var(--puffer-navy)] bg-[var(--puffer-bg)]"
                      : "border-[var(--puffer-border)] hover:border-[var(--puffer-gray-2)]"
                    }
                  `}
                  onClick={() => handleValveStyleChange(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <div className="space-y-0.5">
                    <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-xs text-[var(--puffer-gray)]">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Orifice Selection */}
        {currentStep === 3 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--puffer-navy)]">
              Select the orifice letter
            </h4>
            <p className="text-xs text-[var(--puffer-gray)]">
              Choose based on required capacity class (D = smallest, T = largest)
            </p>
            <div className="grid grid-cols-7 gap-2">
              {ORIFICE_OPTIONS.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleOrificeChange(letter)}
                  className={`
                    h-10 rounded-lg font-semibold text-sm transition-colors
                    ${answers.orificeLetter === letter
                      ? "bg-[var(--puffer-navy)] text-white"
                      : "bg-[var(--puffer-bg)] text-[var(--puffer-navy)] border border-[var(--puffer-border)] hover:border-[var(--puffer-navy)]"
                    }
                  `}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-[var(--puffer-border)]">
          <Button
            variant="outline"
            onClick={() => onStepChange(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="border-[var(--puffer-border)]"
          >
            Previous
          </Button>
          <Button
            onClick={() => onStepChange(Math.min(3, currentStep + 1))}
            disabled={currentStep === 3 || !isStepComplete(currentStep)}
            className="bg-[var(--puffer-navy)] hover:bg-[var(--puffer-navy-2)]"
          >
            Next
          </Button>
        </div>

        {/* Current selections summary */}
        <div className="mt-4 p-3 bg-[var(--puffer-bg)] rounded-lg">
          <h5 className="text-xs font-semibold text-[var(--puffer-gray)] mb-2">
            Your Selections
          </h5>
          <div className="flex flex-wrap gap-2">
            {answers.relievingCase && (
              <Badge variant="secondary" className="text-xs">
                Case: {answers.relievingCase.replace(/_/g, " ")}
              </Badge>
            )}
            {answers.valveStyle && (
              <Badge variant="secondary" className="text-xs">
                Style: {answers.valveStyle}
              </Badge>
            )}
            {answers.orificeLetter && (
              <Badge variant="secondary" className="text-xs">
                Orifice: {answers.orificeLetter}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
