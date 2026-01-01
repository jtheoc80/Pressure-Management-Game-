"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSafeUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ScenarioBrief,
  DatasheetForm,
  DecisionStepper,
  ReliefPathDiagram,
  BackpressureGauge,
  ValveCutaway,
  OrificeWheel,
} from "@/components/psv";
import { GlossaryTooltip } from "@/components/academy/GlossaryTooltip";
import {
  getScenarioById,
  getDatasheet,
  saveDatasheet,
  calculateCompleteness,
} from "@/lib/psv";
import type { Datasheet, PlayerAnswers, Scenario, VisualWidgetKey } from "@/lib/psv/types";
import type { UserProgress } from "@/lib/academy/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Coach mode hints for different steps
const coachHints: Record<string, { title: string; hint: string }> = {
  relievingCase: {
    title: "Identifying the Relieving Case",
    hint: "Read the scenario constraints carefully. Look for keywords like 'blocked outlet', 'fire case', 'thermal expansion', or 'control valve failure'. The relieving case determines what flow rate and conditions the PSV must handle.",
  },
  valveStyle: {
    title: "Selecting Valve Style",
    hint: "Consider the discharge destination and backpressure conditions. Use CONVENTIONAL for atmospheric discharge or low BP (<10%). Use BELLOWS for variable backpressure (like flare headers). Use PILOT for very high BP or when tight shutoff is critical.",
  },
  orificeLetter: {
    title: "Choosing Orifice Size",
    hint: "The orifice must be large enough to pass the required relief flow. In real applications, you'd calculate the required area and select the next larger standard orifice. For this training, consider the flow rate and service conditions.",
  },
  datasheet: {
    title: "Completing the Datasheet",
    hint: "The datasheet documents all information needed for PSV specification. Make sure to include: set pressure (typically at MAWP), relieving temperature, required flow rate, and all relevant fluid properties for your service type.",
  },
};

export default function GameplayPage({ params }: PageProps) {
  const { id: scenarioId } = use(params);
  const router = useRouter();
  const { isSignedIn } = useSafeUser();

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [datasheet, setDatasheet] = useState<Partial<Datasheet>>({});
  const [answers, setAnswers] = useState<Partial<PlayerAnswers>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [academyProgress, setAcademyProgress] = useState<UserProgress | null>(null);
  const [coachModeEnabled, setCoachModeEnabled] = useState(true);
  const [showCoachHint, setShowCoachHint] = useState<string | null>("datasheet");

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

  // Load academy progress for coach mode setting
  useEffect(() => {
    async function loadProgress() {
      if (isSignedIn) {
        try {
          const res = await fetch("/api/progress/get");
          if (res.ok) {
            const data = await res.json();
            setAcademyProgress(data);
            // Coach mode is ON by default, OFF only if user has unlocked it
            setCoachModeEnabled(!data.unlocks.coach_mode_off);
          }
        } catch (error) {
          console.error("Failed to load progress:", error);
        }
      }
    }
    loadProgress();
  }, [isSignedIn]);

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
      
      // Update coach hint based on current step
      if (!newAnswers.relievingCase) {
        setShowCoachHint("relievingCase");
      } else if (!newAnswers.valveStyle) {
        setShowCoachHint("valveStyle");
      } else if (!newAnswers.orificeLetter) {
        setShowCoachHint("orificeLetter");
      } else {
        setShowCoachHint(null);
      }
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

  const currentHint = showCoachHint ? coachHints[showCoachHint] : null;

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
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-[var(--puffer-navy)]">
                    {scenario.title}
                  </h1>
                  {coachModeEnabled && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                      🎓 Coach Mode
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-[var(--puffer-gray)]">
                  Level {scenario.difficulty} • {scenario.serviceType.toUpperCase()} Service
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Coach Mode Toggle */}
              {academyProgress?.unlocks.coach_mode_off && (
                <button
                  onClick={() => setCoachModeEnabled(!coachModeEnabled)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors border"
                  style={{
                    backgroundColor: coachModeEnabled ? "#FEF3C7" : "transparent",
                    borderColor: coachModeEnabled ? "#FCD34D" : "#D1D5DB",
                    color: coachModeEnabled ? "#92400E" : "#6B7280",
                  }}
                >
                  <span>{coachModeEnabled ? "🎓" : "👤"}</span>
                  <span>{coachModeEnabled ? "Coach Mode" : "Expert Mode"}</span>
                </button>
              )}
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

      {/* Coach Mode Hint */}
      {coachModeEnabled && currentHint && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎓</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-amber-800">{currentHint.title}</h3>
                    <button
                      onClick={() => setShowCoachHint(null)}
                      className="text-amber-600 hover:text-amber-800 text-sm"
                    >
                      Dismiss
                    </button>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">{currentHint.hint}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Decision Tools */}
          <div className="space-y-6">
            {/* Scenario Brief with Glossary Terms */}
            <ScenarioBriefWithTooltips scenario={scenario} coachMode={coachModeEnabled} />

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
                    <GlossaryTooltip term="Relieving Case">
                      Relieving case
                    </GlossaryTooltip>{" "}
                    selected
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
                    <GlossaryTooltip term="Orifice">Orifice letter</GlossaryTooltip> selected
                  </span>
                </li>
              </ul>

              {!canSubmit && (
                <p className="mt-3 text-xs text-[var(--puffer-warning)]">
                  Complete all requirements to enable submission
                </p>
              )}
            </div>

            {/* Quick Glossary Access */}
            {coachModeEnabled && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-700">Need Help?</h4>
                  <Link href="/glossary" target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      Full Glossary →
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["MAWP", "Set Pressure", "Backpressure", "Orifice"].map((term) => (
                    <GlossaryTooltip key={term} term={term}>
                      <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 cursor-help hover:border-blue-300">
                        {term}
                      </span>
                    </GlossaryTooltip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Enhanced scenario brief with glossary tooltips
interface ScenarioBriefWithTooltipsProps {
  scenario: Scenario;
  coachMode: boolean;
}

function ScenarioBriefWithTooltips({ scenario }: ScenarioBriefWithTooltipsProps) {
  // Placeholder for future term highlighting - just render scenario brief for now
  return <ScenarioBrief scenario={scenario} />;
}
