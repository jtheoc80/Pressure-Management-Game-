"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AlertTriangle, Lightbulb, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LessonSection } from "@/lib/academy/types";
import { ImageGallery } from "./ImageGallery";
import { HotspotImage } from "./HotspotImage";
import { RuleCard } from "./RuleCard";
import { WorkedExampleLab } from "./WorkedExampleLab";
import { DrillBlock } from "./DrillBlock";
import { CaseBlock } from "./CaseBlock";
import { Quiz } from "./Quiz";
import { DiagramRenderer } from "./DiagramRenderer";
import { useLessonProgressOptional } from "./LessonProgressProvider";

interface LessonRendererProps {
  sections: LessonSection[];
  lessonId?: string;
  onQuizComplete?: (score: number, passed: boolean) => void;
  onDrillComplete?: (drillId: string, score: number, passed: boolean) => void;
}

function LessonImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const FALLBACK_SRC = "/academy/photos/placeholder.svg";
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => {
    setResolvedSrc(src);
  }, [src]);

  return (
    <>
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        onError={() => {
          if (resolvedSrc !== FALLBACK_SRC) setResolvedSrc(FALLBACK_SRC);
        }}
      />
      {resolvedSrc === FALLBACK_SRC && (
        <div className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs text-gray-600 shadow-sm border border-gray-200">
          Image unavailable (showing placeholder)
        </div>
      )}
    </>
  );
}

/**
 * SectionWrapper - Wraps each section with an anchor and IntersectionObserver
 */
function SectionWrapper({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useLessonProgressOptional();
  const hasViewed = useRef(false);

  useEffect(() => {
    if (!ref.current || hasViewed.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasViewed.current) {
          hasViewed.current = true;
          progress?.markCheckpoint(`viewed:section:${index}`);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // 30% visibility triggers checkpoint
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [index, progress]);

  return (
    <div ref={ref} id={`section-${index}`} className="scroll-mt-24">
      {children}
    </div>
  );
}

export function LessonRenderer({ sections, lessonId, onQuizComplete, onDrillComplete }: LessonRendererProps) {
  const progress = useLessonProgressOptional();

  const renderSection = (section: LessonSection, index: number) => {
    switch (section.type) {
      case "text":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="prose prose-slate max-w-none">
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
          </SectionWrapper>
        );

      case "diagram":
        return (
          <SectionWrapper key={index} index={index}>
            <DiagramRenderer
              diagramKey={section.key}
              caption={section.caption}
            />
          </SectionWrapper>
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
          <SectionWrapper key={index} index={index}>
            <div
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
          </SectionWrapper>
        );

      case "check":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="bg-slate-50 rounded-lg p-4 my-6">
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
          </SectionWrapper>
        );

      case "quiz":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <Quiz quizId={section.quizId} onComplete={onQuizComplete} />
            </div>
          </SectionWrapper>
        );

      case "image":
        return (
          <SectionWrapper key={index} index={index}>
            <figure className="my-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                <LessonImage src={section.src} alt={section.alt} />
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
          </SectionWrapper>
        );

      case "gallery":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <ImageGallery images={section.images} />
            </div>
          </SectionWrapper>
        );

      case "hotspot":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <HotspotImage
                imageSrc={section.imageSrc}
                imageAlt={section.imageAlt}
                hotspots={section.hotspots}
                onHotspotExplore={(hotspotIdx) => {
                  progress?.markCheckpoint(`hotspot:${lessonId}:${index}:${hotspotIdx}`);
                }}
              />
            </div>
          </SectionWrapper>
        );

      case "case":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <CaseBlock caseId={section.caseId} compact />
            </div>
          </SectionWrapper>
        );

      case "rule":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <RuleCard
                title={section.title}
                body={section.body}
                quote={section.quote}
                sourceLabel={section.sourceLabel}
                sourceUrl={section.sourceUrl}
                onExpand={() => {
                  progress?.markCheckpoint(`opened:rule:${index}`);
                }}
              />
            </div>
          </SectionWrapper>
        );

      case "worked":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <WorkedExampleLab
                title={section.title}
                prompt={section.prompt}
                fields={section.fields}
                check={section.check}
                explanation={section.explanation}
              />
            </div>
          </SectionWrapper>
        );

      case "drill":
        return (
          <SectionWrapper key={index} index={index}>
            <div className="my-6">
              <DrillBlock
                drillId={section.drillId}
                onComplete={(score, passed) => onDrillComplete?.(section.drillId, score, passed)}
              />
            </div>
          </SectionWrapper>
        );

      default:
        return (
          <SectionWrapper key={index} index={index}>
            <Card className="border-gray-200 bg-gray-50 my-6">
              <CardContent className="p-4">
                <p className="text-gray-500">Unknown section type</p>
              </CardContent>
            </Card>
          </SectionWrapper>
        );
    }
  };

  return (
    <div className="space-y-2">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
