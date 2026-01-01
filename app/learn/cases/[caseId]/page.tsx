"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckSquare, AlertTriangle, FileText, Factory, Flame, Building2, Ship } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCaseById, type CaseEnvironment } from "@/lib/academy/cases";
import { ImageGallery, RuleCard, diagramComponents } from "@/components/academy";

const environmentIcons: Record<CaseEnvironment, React.ReactNode> = {
  refinery: <Factory className="w-5 h-5" />,
  chemical: <Flame className="w-5 h-5" />,
  terminal: <Building2 className="w-5 h-5" />,
  offshore: <Ship className="w-5 h-5" />,
  pipeline: <Building2 className="w-5 h-5" />,
};

const environmentLabels: Record<CaseEnvironment, string> = {
  refinery: "Refinery",
  chemical: "Chemical Plant",
  terminal: "Terminal",
  offshore: "Offshore",
  pipeline: "Pipeline",
};

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.caseId as string;
  const caseStudy = getCaseById(caseId);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Case Not Found</h2>
            <p className="text-gray-600 mb-4">The case study you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/learn/cases">
              <Button className="bg-[#003366]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Casebook
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const DiagramComponent = caseStudy.diagramKey 
    ? diagramComponents[caseStudy.diagramKey as keyof typeof diagramComponents]
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <Link href="/learn" className="hover:text-white">Academy</Link>
            <span>/</span>
            <Link href="/learn/cases" className="hover:text-white">Casebook</Link>
            <span>/</span>
            <span className="truncate max-w-[200px]">{caseStudy.title}</span>
          </div>
          
          <div className="flex items-start gap-4 mt-4">
            <div className="p-3 bg-white/10 rounded-lg">
              {environmentIcons[caseStudy.environment]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {environmentLabels[caseStudy.environment]}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={caseStudy.track === "psv" 
                    ? "bg-blue-400/30 text-white" 
                    : "bg-amber-400/30 text-white"
                  }
                >
                  {caseStudy.track === "psv" ? "PSV Track" : "Tank & Flame Track"}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{caseStudy.title}</h1>
              <p className="text-gray-300 mt-2">{caseStudy.summary}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/learn/cases" className="inline-flex items-center text-[#003366] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Casebook
        </Link>

        <div className="space-y-8">
          {/* Narrative */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#003366]">Case Narrative</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              {caseStudy.narrative.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          {/* Diagram */}
          {DiagramComponent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#003366]">Technical Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg overflow-hidden">
                  <DiagramComponent />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Photos */}
          {caseStudy.photos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#003366]">Reference Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery images={caseStudy.photos} />
              </CardContent>
            </Card>
          )}

          {/* Required Inputs */}
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-[#003366] flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" />
                Required Datasheet Inputs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                When working this type of scenario, ensure you gather these inputs:
              </p>
              <ul className="grid md:grid-cols-2 gap-2">
                {caseStudy.requiredInputs.map((input, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-700">{input}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="text-[#003366] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Common Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Watch out for these common pitfalls:
              </p>
              <ul className="space-y-2">
                {caseStudy.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                    <span className="text-amber-600 font-bold mt-0.5">✗</span>
                    <span className="text-sm text-amber-900">{mistake}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Rule References */}
          {caseStudy.ruleRefs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-[#003366] mb-4">Standard References</h2>
              <div className="space-y-4">
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
            </div>
          )}

          {/* Call to Action */}
          {caseStudy.linkedScenarioId && (
            <Card className="bg-gradient-to-r from-[#003366] to-[#004488] text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready to Practice?</h3>
                    <p className="text-gray-200">
                      Apply what you learned in a matching interactive scenario.
                    </p>
                  </div>
                  <Link href={`/psv-quest/${caseStudy.linkedScenarioId}?mode=practice`}>
                    <Button 
                      size="lg"
                      className="bg-white text-[#003366] hover:bg-gray-100"
                    >
                      Try Scenario
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Link href="/learn/cases">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Cases
              </Button>
            </Link>
            <Link href="/learn">
              <Button className="bg-[#003366]">
                Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
