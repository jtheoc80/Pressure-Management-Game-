"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ScenarioBrief,
  DatasheetForm,
  DecisionStepper,
  ReliefPathDiagram,
  BackpressureGauge,
  ValveCutaway,
  OrificeWheel,
} from "@/components/psv";
import {
  getScenarioById,
  getDatasheet,
  saveDatasheet,
  calculateCompleteness,
} from "@/lib/psv";
import type { Datasheet, PlayerAnswers, Scenario, VisualWidgetKey } from "@/lib/psv/types";

export default function GameplayPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.id as string;

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [datasheet, setDatasheet] = useState<Partial<Datasheet>>({});
  const [answers, setAnswers] = useState<Partial<PlayerAnswers>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load scenario and saved datasheet
  useEffect(() => {
    const loadedScenario = getScenarioById(scenarioId);
    if (loadedScenario) {
      setScenario(loadedScenario);
      const savedDatasheet = getDatasheet(scenarioId);
      if (savedDatasheet) {
        setDatasheet(savedDatasheet);
      } else {
        // Initialize with scenario defaults
        setDatasheet({
          scenarioId,
          serviceType: loadedScenario.serviceType,
        });
      }
    }
  }, [scenarioId]);

  // Auto-save datasheet changes
  const handleDatasheetChange = useCallback(
    (newDatasheet: Partial<Datasheet>) => {
      setDatasheet(newDatasheet);
      saveDatasheet(scenarioId, newDatasheet);
    },
    [scenarioId]
  );

  // Handle answer changes
  const handleAnswerChange = useCallback(
    (newAnswers: Partial<PlayerAnswers>) => {
      setAnswers(newAnswers);
    },
    []
  );

  // Check if submission is allowed
  const completeness = scenario
    ? calculateCompleteness(datasheet, scenario.datasheetRequirements)
    : 0;
  const hasAllAnswers =
    !!answers.relievingCase && !!answers.valveStyle && !!answers.orificeLetter;
  const canSubmit = completeness >= 80 && hasAllAnswers;

  // Handle submission
  const handleSubmit = async () => {
    if (!canSubmit || !scenario) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/psv/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId,
          datasheet,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to grade attempt");
      }

      const result = await response.json();

      // Store result in sessionStorage for results page
      sessionStorage.setItem(
        `psv:result:${scenarioId}`,
        JSON.stringify(result)
      );

      // Navigate to results
      router.push(`/psv-quest/${scenarioId}/results`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  if (!scenario) {
    return (
      <div className="min-h-screen bg-[var(--puffer-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[var(--puffer-gray)] mb-4">Loading scenario...</div>
          <Link href="/psv-quest">
            <Button variant="outline">Back to Lobby</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine which visual widgets to show
  const showWidget = (widget: VisualWidgetKey) =>
    scenario.visuals.widgets.includes(widget);

  return (
    <div className="min-h-screen bg-[var(--puffer-bg)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--puffer-border)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/psv-quest"
                className="text-[var(--puffer-gray)] hover:text-[var(--puffer-navy)] transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="font-semibold text-[var(--puffer-navy)]">
                  {scenario.title}
                </h1>
                <p className="text-xs text-[var(--puffer-gray)]">
                  Level {scenario.difficulty} • {scenario.serviceType.toUpperCase()} Service
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-[var(--puffer-gray)]">
                  Datasheet Complete
                </div>
                <div className="text-sm font-semibold text-[var(--puffer-navy)]">
                  {completeness}%
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="bg-[var(--puffer-navy)] hover:bg-[var(--puffer-navy-2)] disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Attempt"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Decision Tools */}
          <div className="space-y-6">
            {/* Scenario Brief */}
            <ScenarioBrief scenario={scenario} />

            {/* Decision Stepper */}
            <DecisionStepper
              answers={answers}
              onChange={handleAnswerChange}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />

            {/* Visual Widgets */}
            <div className="space-y-4">
              {showWidget("ReliefPathDiagram") && (
                <ReliefPathDiagram
                  serviceType={datasheet.serviceType}
                  dischargeTo={datasheet.dischargeTo}
                  hasBackpressure={
                    !!datasheet.superimposedBackpressurePsig ||
                    !!datasheet.builtUpBackpressurePsig
                  }
                  constraints={scenario.constraints}
                />
              )}

              {showWidget("BackpressureGauge") && (
                <BackpressureGauge
                  superimposedBP={datasheet.superimposedBackpressurePsig}
                  builtUpBP={datasheet.builtUpBackpressurePsig}
                  setPressure={datasheet.setPressurePsig}
                />
              )}

              {showWidget("ValveCutaway") && (
                <ValveCutaway
                  selectedStyle={answers.valveStyle}
                  onSelect={(style) =>
                    handleAnswerChange({ ...answers, valveStyle: style })
                  }
                  interactive
                />
              )}

              {showWidget("OrificeWheel") && (
                <OrificeWheel
                  selectedOrifice={answers.orificeLetter}
                  onSelect={(orifice) =>
                    handleAnswerChange({ ...answers, orificeLetter: orifice })
                  }
                  interactive
                />
              )}
            </div>
          </div>

          {/* Right Column - Datasheet */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <DatasheetForm
              scenario={scenario}
              datasheet={datasheet}
              onChange={handleDatasheetChange}
            />

            {/* Submission Requirements */}
            <div className="mt-4 p-4 bg-white border border-[var(--puffer-border)] rounded-lg">
              <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-3">
                Submission Checklist
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      completeness >= 80
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {completeness >= 80 ? "✓" : "○"}
                  </span>
                  <span
                    className={
                      completeness >= 80
                        ? "text-[var(--puffer-navy)]"
                        : "text-[var(--puffer-gray)]"
                    }
                  >
                    Datasheet at least 80% complete
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      answers.relievingCase
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {answers.relievingCase ? "✓" : "○"}
                  </span>
                  <span
                    className={
                      answers.relievingCase
                        ? "text-[var(--puffer-navy)]"
                        : "text-[var(--puffer-gray)]"
                    }
                  >
                    Relieving case selected
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      answers.valveStyle
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {answers.valveStyle ? "✓" : "○"}
                  </span>
                  <span
                    className={
                      answers.valveStyle
                        ? "text-[var(--puffer-navy)]"
                        : "text-[var(--puffer-gray)]"
                    }
                  >
                    Valve style selected
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      answers.orificeLetter
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {answers.orificeLetter ? "✓" : "○"}
                  </span>
                  <span
                    className={
                      answers.orificeLetter
                        ? "text-[var(--puffer-navy)]"
                        : "text-[var(--puffer-gray)]"
                    }
                  >
                    Orifice letter selected
                  </span>
                </li>
              </ul>

              {!canSubmit && (
                <p className="mt-3 text-xs text-[var(--puffer-warning)]">
                  Complete all requirements to enable submission
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
