"use client";

import React from "react";
import Image from "next/image";
import { AlertTriangle, Lightbulb, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LessonSection } from "@/lib/academy/types";
import { diagramComponents } from "./diagrams";
import { diagramRegistry } from "@/lib/academy/diagramRegistry";
import { ImageGallery } from "./ImageGallery";
import { HotspotImage } from "./HotspotImage";
import { RuleCard } from "./RuleCard";
import { WorkedExampleLab } from "./WorkedExampleLab";
import { DrillBlock } from "./DrillBlock";
import { CaseBlock } from "./CaseBlock";
import { Quiz } from "./Quiz";

interface LessonRendererProps {
  sections: LessonSection[];
  onQuizComplete?: (score: number, passed: boolean) => void;
  onDrillComplete?: (drillId: string, score: number, passed: boolean) => void;
}

export function LessonRenderer({ sections, onQuizComplete, onDrillComplete }: LessonRendererProps) {
  const renderSection = (section: LessonSection, index: number) => {
    switch (section.type) {
      case "text":
        return (
          <div key={index} className="prose prose-slate max-w-none">
            {section.heading && (
              <h3 className="text-xl font-semibold text-[#003366] mt-8 mb-4">
                {section.heading}
              </h3>
            )}
            {section.body.split("\n\n").map((paragraph, pIdx) => (
              <p key={pIdx} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        );

      case "diagram":
        // Check both old diagramComponents and new diagramRegistry
        const DiagramComponent = 
          diagramComponents[section.key as keyof typeof diagramComponents] ||
          diagramRegistry[section.key];
        if (!DiagramComponent) {
          return (
            <Card key={index} className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <p className="text-amber-700">Diagram not found: {section.key}</p>
              </CardContent>
            </Card>
          );
        }
        return (
          <div key={index} className="my-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-hidden">
              <DiagramComponent />
            </div>
            {section.caption && (
              <p className="text-sm text-gray-500 text-center mt-2 italic">
                {section.caption}
              </p>
            )}
          </div>
        );

      case "callout":
        const calloutStyles = {
          tip: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
            title: "Tip",
            textColor: "text-blue-800",
          },
          warning: {
            bg: "bg-amber-50",
            border: "border-amber-200",
            icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
            title: "Warning",
            textColor: "text-amber-800",
          },
          example: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
            title: "Example",
            textColor: "text-emerald-800",
          },
        };
        const style = calloutStyles[section.variant];
        return (
          <div
            key={index}
            className={`${style.bg} ${style.border} border rounded-lg p-4 my-6`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">{style.icon}</div>
              <div>
                <p className={`font-medium ${style.textColor}`}>{style.title}</p>
                <p className={`text-sm ${style.textColor} mt-1`}>{section.body}</p>
              </div>
            </div>
          </div>
        );

      case "check":
        return (
          <div key={index} className="bg-slate-50 rounded-lg p-4 my-6">
            <h4 className="font-medium text-[#003366] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              What Good Looks Like
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case "quiz":
        return (
          <div key={index} className="my-6">
            <Quiz quizId={section.quizId} onComplete={onQuizComplete} />
          </div>
        );

      case "image":
        return (
          <figure key={index} className="my-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={section.src}
                alt={section.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/academy/photos/placeholder.svg";
                }}
              />
            </div>
            {(section.caption || section.credit) && (
              <figcaption className="text-sm text-gray-500 text-center mt-2">
                {section.caption}
                {section.credit && (
                  <span className="block text-xs text-gray-400 mt-0.5">
                    {section.credit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        );

      case "gallery":
        return (
          <div key={index} className="my-6">
            <ImageGallery images={section.images} />
          </div>
        );

      case "hotspot":
        return (
          <div key={index} className="my-6">
            <HotspotImage
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
              hotspots={section.hotspots}
            />
          </div>
        );

      case "case":
        return (
          <div key={index} className="my-6">
            <CaseBlock caseId={section.caseId} compact />
          </div>
        );

      case "rule":
        return (
          <div key={index} className="my-6">
            <RuleCard
              title={section.title}
              body={section.body}
              quote={section.quote}
              sourceLabel={section.sourceLabel}
              sourceUrl={section.sourceUrl}
            />
          </div>
        );

      case "worked":
        return (
          <div key={index} className="my-6">
            <WorkedExampleLab
              title={section.title}
              prompt={section.prompt}
              fields={section.fields}
              check={section.check}
              explanation={section.explanation}
            />
          </div>
        );

      case "drill":
        return (
          <div key={index} className="my-6">
            <DrillBlock
              drillId={section.drillId}
              onComplete={(score, passed) => onDrillComplete?.(section.drillId, score, passed)}
            />
          </div>
        );

      default:
        return (
          <Card key={index} className="border-gray-200 bg-gray-50 my-6">
            <CardContent className="p-4">
              <p className="text-gray-500">Unknown section type</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-2">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
