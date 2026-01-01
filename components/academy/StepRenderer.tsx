"use client";

import React from "react";
import Image from "next/image";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Lightbulb, 
  XCircle,
  ClipboardCheck,
  Footprints,
  UserCheck,
  HelpCircle,
  BookOpen,
  Scale
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Step } from "@/lib/academy/course";
import { CanvasFrame } from "./CanvasFrame";
import { DiagramRenderer } from "./DiagramRenderer";
import { DrillBlock } from "./DrillBlock";
import { Quiz } from "./Quiz";
import { CaseBlock } from "./CaseBlock";

interface StepRendererProps {
  step: Step;
  onDrillComplete?: (drillId: string, score: number, passed: boolean) => void;
  onQuizComplete?: (score: number, passed: boolean) => void;
  onConfidenceAction?: (goToStepIndex: number) => void;
  onRemediation?: (stepIndex: number) => void;
}

/**
 * StepRenderer - Renders exactly ONE step of a lesson
 * 
 * This is the core building block of the Lesson Player.
 * Each step type has its own visual treatment while maintaining
 * consistent typography and spacing.
 */
export function StepRenderer({
  step,
  onDrillComplete,
  onQuizComplete,
  onConfidenceAction,
  onRemediation,
}: StepRendererProps) {
  
  switch (step.type) {
    case "explain":
      return <ExplainStep step={step} />;
    
    case "diagram":
      return <DiagramStepComponent step={step} />;
    
    case "gallery":
      return <GalleryStepComponent step={step} />;
    
    case "rule":
      return <RuleStepComponent step={step} />;
    
    case "case":
      return <CaseStepComponent step={step} />;
    
    case "fieldwalkdown":
      return <FieldWalkdownStepComponent step={step} />;
    
    case "supervisorcheck":
      return <SupervisorCheckStepComponent step={step} />;
    
    case "confidence":
      return <ConfidenceCheckStepComponent step={step} onAction={onConfidenceAction} />;
    
    case "drill":
      return <DrillStepComponent step={step} onComplete={onDrillComplete} onRemediation={onRemediation} />;
    
    case "quiz":
      return <QuizStepComponent step={step} onComplete={onQuizComplete} />;
    
    default:
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Unknown step type</p>
          </CardContent>
        </Card>
      );
  }
}

// =============================================================================
// STEP TYPE COMPONENTS
// =============================================================================

function ExplainStep({ step }: { step: Extract<Step, { type: "explain" }> }) {
  return (
    <div className="space-y-6">
      {/* Main body text */}
      <div className="prose prose-slate max-w-none">
        {step.body.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="text-slate-700 leading-relaxed text-base">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Bullets */}
      {step.bullets && step.bullets.length > 0 && (
        <ul className="space-y-2 ml-1">
          {step.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700">
              <span className="text-blue-500 mt-1.5 shrink-0">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* STOP & CHECK callout */}
      {step.stopAndCheck && step.stopAndCheck.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">STOP & CHECK</p>
              <ul className="mt-2 space-y-1">
                {step.stopAndCheck.map((check, idx) => (
                  <li key={idx} className="text-sm text-amber-700">{check}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Field Cues */}
      {step.fieldCues && step.fieldCues.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800 text-sm">Field Cues</p>
              <ul className="mt-2 space-y-1">
                {step.fieldCues.map((cue, idx) => (
                  <li key={idx} className="text-sm text-blue-700">{cue}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* What Good Looks Like */}
      {step.whatGoodLooksLike && step.whatGoodLooksLike.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">What Good Looks Like</p>
              <ul className="mt-2 space-y-1">
                {step.whatGoodLooksLike.map((item, idx) => (
                  <li key={idx} className="text-sm text-emerald-700 flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {step.commonMistakes && step.commonMistakes.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800 text-sm">Common Mistakes</p>
              <ul className="mt-2 space-y-1">
                {step.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DiagramStepComponent({ step }: { step: Extract<Step, { type: "diagram" }> }) {
  return (
    <div className="space-y-4">
      <CanvasFrame aspectRatio="16/9">
        <DiagramRenderer diagramKey={step.diagramKey} />
      </CanvasFrame>
      
      {step.caption && (
        <p className="text-sm text-slate-500 text-center italic">{step.caption}</p>
      )}

      {step.stopAndCheck && step.stopAndCheck.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Check Your Understanding</p>
              <ul className="mt-2 space-y-1">
                {step.stopAndCheck.map((check, idx) => (
                  <li key={idx} className="text-sm text-amber-700">{check}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryStepComponent({ step }: { step: Extract<Step, { type: "gallery" }> }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeImage = step.images[activeIndex];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/academy/photos/placeholder.svg";
          }}
        />
      </div>

      {/* Caption and credit */}
      {(activeImage.caption || activeImage.credit) && (
        <div className="text-center">
          {activeImage.caption && (
            <p className="text-sm text-slate-600">{activeImage.caption}</p>
          )}
          {activeImage.credit && (
            <p className="text-xs text-slate-400 mt-1">{activeImage.credit}</p>
          )}
        </div>
      )}

      {/* Shot note (for placeholder guidance) */}
      {activeImage.shotNote && (
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-3">
          <p className="text-xs text-slate-500">
            <span className="font-medium">Photo needed:</span> {activeImage.shotNote}
          </p>
        </div>
      )}

      {/* Thumbnail navigation */}
      {step.images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {step.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-12 overflow-hidden rounded border-2 transition-all ${
                idx === activeIndex 
                  ? "border-blue-500 ring-2 ring-blue-200" 
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="64px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/academy/photos/placeholder.svg";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RuleStepComponent({ step }: { step: Extract<Step, { type: "rule" }> }) {
  return (
    <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg text-blue-900">{step.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-700">{step.paraphrase}</p>
        
        {step.quote && (
          <blockquote className="border-l-2 border-blue-300 pl-4 py-2 bg-white/50 rounded-r">
            <p className="text-sm text-slate-600 italic">&ldquo;{step.quote}&rdquo;</p>
          </blockquote>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-blue-200">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
            {step.sourceLabel}
          </Badge>
          {step.sourceNote && (
            <p className="text-xs text-slate-500">{step.sourceNote}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CaseStepComponent({ step }: { step: Extract<Step, { type: "case" }> }) {
  return (
    <div className="space-y-4">
      <CaseBlock caseId={step.caseId} compact />
    </div>
  );
}

function FieldWalkdownStepComponent({ step }: { step: Extract<Step, { type: "fieldwalkdown" }> }) {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-emerald-600" />
            <CardTitle className="text-lg text-emerald-900">Field Walkdown Steps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {step.steps.map((walkStep, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-slate-700">{walkStep}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Look Fors */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 text-sm">What to Look For</p>
            <ul className="mt-2 space-y-1">
              {step.lookFors.map((item, idx) => (
                <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                  <span className="text-blue-500">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 text-sm">Red Flags</p>
            <ul className="mt-2 space-y-1">
              {step.redFlags.map((item, idx) => (
                <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="text-red-500">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupervisorCheckStepComponent({ step }: { step: Extract<Step, { type: "supervisorcheck" }> }) {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg text-purple-900">Supervisor Review Checklist</CardTitle>
          </div>
          <p className="text-sm text-slate-500">What a senior engineer or reviewer checks before approval</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {step.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700">
                <ClipboardCheck className="w-4 h-4 text-purple-500 shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Fast Sanity Checks */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-purple-800 text-sm">Quick Sanity Checks</p>
            <ul className="mt-2 space-y-1">
              {step.fastSanityChecks.map((check, idx) => (
                <li key={idx} className="text-sm text-purple-700">{check}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfidenceCheckStepComponent({ 
  step, 
  onAction 
}: { 
  step: Extract<Step, { type: "confidence" }>; 
  onAction?: (goToStepIndex: number) => void;
}) {
  const [confidence, setConfidence] = React.useState<"high" | "medium" | "low" | null>(null);

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-xl text-blue-900">{step.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-slate-600">{step.prompt}</p>

        <div className="flex justify-center gap-3">
          <Button
            variant={confidence === "high" ? "default" : "outline"}
            className={confidence === "high" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            onClick={() => setConfidence("high")}
          >
            😊 Ready to go
          </Button>
          <Button
            variant={confidence === "medium" ? "default" : "outline"}
            className={confidence === "medium" ? "bg-amber-600 hover:bg-amber-700" : ""}
            onClick={() => setConfidence("medium")}
          >
            🤔 Mostly confident
          </Button>
          <Button
            variant={confidence === "low" ? "default" : "outline"}
            className={confidence === "low" ? "bg-red-600 hover:bg-red-700" : ""}
            onClick={() => setConfidence("low")}
          >
            😕 Need review
          </Button>
        </div>

        {confidence === "low" && step.actionsIfLow.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-800 mb-3">
              No problem! Here&apos;s what we recommend:
            </p>
            <div className="space-y-2">
              {step.actionsIfLow.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-amber-700 border-amber-300 hover:bg-amber-100"
                  onClick={() => onAction?.(action.goToStepIndex)}
                >
                  ← {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {confidence === "high" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <p className="text-emerald-700 font-medium">
              Excellent! You&apos;re ready for the quiz. 🎯
            </p>
          </div>
        )}

        {confidence === "medium" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-700 font-medium">
              Good progress! The quiz will help reinforce what you&apos;ve learned.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DrillStepComponent({ 
  step, 
  onComplete,
  onRemediation
}: { 
  step: Extract<Step, { type: "drill" }>;
  onComplete?: (drillId: string, score: number, passed: boolean) => void;
  onRemediation?: (stepIndex: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-violet-900">{step.title}</h3>
        <Badge variant="outline" className="text-violet-600 border-violet-300">
          Practice
        </Badge>
      </div>
      <DrillBlock
        drillId={step.drillId}
        onComplete={(score, passed) => onComplete?.(step.drillId, score, passed)}
        onRemediation={onRemediation}
      />
    </div>
  );
}

function QuizStepComponent({ 
  step, 
  onComplete 
}: { 
  step: Extract<Step, { type: "quiz" }>;
  onComplete?: (score: number, passed: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <Quiz quizId={step.quizId} onComplete={onComplete} />
    </div>
  );
}

export default StepRenderer;
