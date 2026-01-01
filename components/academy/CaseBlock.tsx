"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ChevronDown, ChevronUp, ExternalLink, CheckSquare, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCaseById } from "@/lib/academy/cases";
import { ImageGallery } from "./ImageGallery";
import { RuleCard } from "./RuleCard";
import { diagramComponents } from "./diagrams";

interface CaseBlockProps {
  caseId: string;
  compact?: boolean;
}

export function CaseBlock({ caseId, compact = false }: CaseBlockProps) {
  const caseStudy = getCaseById(caseId);
  const [expanded, setExpanded] = useState(!compact);

  if (!caseStudy) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <p className="text-red-700">Case study not found: {caseId}</p>
        </CardContent>
      </Card>
    );
  }

  const DiagramComponent = caseStudy.diagramKey 
    ? diagramComponents[caseStudy.diagramKey as keyof typeof diagramComponents]
    : null;

  const environmentLabels: Record<string, string> = {
    refinery: "Refinery",
    chemical: "Chemical Plant",
    terminal: "Terminal",
    offshore: "Offshore",
    pipeline: "Pipeline",
  };

  if (compact && !expanded) {
    return (
      <Card className="border-[#003366]/20 hover:border-[#003366]/40 transition-colors">
        <CardContent className="p-4">
          <button
            onClick={() => setExpanded(true)}
            className="w-full text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                <FileText className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {environmentLabels[caseStudy.environment]}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Case Study
                  </Badge>
                </div>
                <h4 className="font-semibold text-[#003366]">{caseStudy.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{caseStudy.summary}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#003366]/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {environmentLabels[caseStudy.environment]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Case Study
                </Badge>
              </div>
              <CardTitle className="text-lg text-[#003366]">{caseStudy.title}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{caseStudy.summary}</p>
            </div>
          </div>
          {compact && (
            <button onClick={() => setExpanded(false)} className="text-gray-400 hover:text-gray-600">
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Narrative */}
        <div className="prose prose-sm max-w-none">
          {caseStudy.narrative.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-gray-700">{paragraph}</p>
          ))}
        </div>

        {/* Diagram */}
        {DiagramComponent && (
          <div className="bg-gray-50 rounded-lg p-4">
            <DiagramComponent />
          </div>
        )}

        {/* Photos */}
        {caseStudy.photos.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Reference Photos</h4>
            <ImageGallery images={caseStudy.photos} />
          </div>
        )}

        {/* Required Inputs */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#003366]" />
            Required Datasheet Inputs
          </h4>
          <ul className="space-y-1">
            {caseStudy.requiredInputs.map((input, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#003366]" />
                {input}
              </li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        <div className="bg-amber-50 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Common Mistakes to Avoid
          </h4>
          <ul className="space-y-1">
            {caseStudy.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                {mistake}
              </li>
            ))}
          </ul>
        </div>

        {/* Rule References */}
        {caseStudy.ruleRefs.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Standard References</h4>
            {caseStudy.ruleRefs.map((rule, idx) => (
              <RuleCard
                key={idx}
                title={rule.title}
                body={rule.body}
                quote={rule.quote}
                sourceLabel={rule.sourceLabel}
                sourceUrl={rule.sourceUrl}
              />
            ))}
          </div>
        )}

        {/* Linked Scenario */}
        {caseStudy.linkedScenarioId && (
          <div className="pt-2">
            <Link href={`/psv-quest/${caseStudy.linkedScenarioId}?mode=practice`}>
              <Button className="bg-[#003366] hover:bg-[#002244]">
                <ExternalLink className="w-4 h-4 mr-2" />
                Try the Matching Scenario
              </Button>
            </Link>
          </div>
        )}

        {/* Full Case Link */}
        <div className="pt-2 border-t border-gray-200">
          <Link 
            href={`/learn/cases/${caseStudy.id}`}
            className="text-sm text-[#003366] hover:underline flex items-center gap-1"
          >
            View full case study
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
