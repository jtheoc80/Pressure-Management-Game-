"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Filter, Building2, Flame, Factory, Ship, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cases, type CaseStudy, type CaseEnvironment } from "@/lib/academy/cases";
import type { Track } from "@/lib/academy/types";

const environmentIcons: Record<CaseEnvironment, React.ReactNode> = {
  refinery: <Factory className="w-4 h-4" />,
  chemical: <Flame className="w-4 h-4" />,
  terminal: <Building2 className="w-4 h-4" />,
  offshore: <Ship className="w-4 h-4" />,
  pipeline: <Building2 className="w-4 h-4" />,
};

const environmentLabels: Record<CaseEnvironment, string> = {
  refinery: "Refinery",
  chemical: "Chemical Plant",
  terminal: "Terminal",
  offshore: "Offshore",
  pipeline: "Pipeline",
};

const trackLabels: Record<Track, string> = {
  psv: "PSV",
  tank_flame: "Tank & Flame",
};

export default function CasebookPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | "all">("all");
  const [selectedEnvironment, setSelectedEnvironment] = useState<CaseEnvironment | "all">("all");

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (selectedTrack !== "all" && c.track !== selectedTrack) return false;
      if (selectedEnvironment !== "all" && c.environment !== selectedEnvironment) return false;
      return true;
    });
  }, [selectedTrack, selectedEnvironment]);

  const environments = Array.from(new Set(cases.map((c) => c.environment)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <Link href="/learn" className="hover:text-white">Academy</Link>
            <span>/</span>
            <span>Casebook</span>
          </div>
          <h1 className="text-3xl font-bold">Casebook</h1>
          <p className="text-gray-300 mt-1">
            Real-world scenarios for contextual learning
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {/* Track Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Track</label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedTrack === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTrack("all")}
                    className={selectedTrack === "all" ? "bg-[#003366]" : ""}
                  >
                    All Tracks
                  </Button>
                  <Button
                    variant={selectedTrack === "psv" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTrack("psv")}
                    className={selectedTrack === "psv" ? "bg-[#003366]" : ""}
                  >
                    PSV
                  </Button>
                  <Button
                    variant={selectedTrack === "tank_flame" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTrack("tank_flame")}
                    className={selectedTrack === "tank_flame" ? "bg-[#003366]" : ""}
                  >
                    Tank & Flame
                  </Button>
                </div>
              </div>

              {/* Environment Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedEnvironment === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEnvironment("all")}
                    className={selectedEnvironment === "all" ? "bg-[#003366]" : ""}
                  >
                    All
                  </Button>
                  {environments.map((env) => (
                    <Button
                      key={env}
                      variant={selectedEnvironment === env ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEnvironment(env)}
                      className={selectedEnvironment === env ? "bg-[#003366]" : ""}
                    >
                      {environmentIcons[env]}
                      <span className="ml-1">{environmentLabels[env]}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <p className="text-gray-600 mb-4">
          Showing {filteredCases.length} of {cases.length} case studies
        </p>

        {/* Case Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCases.map((caseStudy) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No cases match your filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedTrack("all");
                setSelectedEnvironment("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link href={`/learn/cases/${caseStudy.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#003366]">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {environmentLabels[caseStudy.environment]}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    caseStudy.track === "psv" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {trackLabels[caseStudy.track]}
                </Badge>
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-[#003366] text-lg mb-2">
            {caseStudy.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {caseStudy.summary}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-500">
              <span>{caseStudy.photos.length} photos</span>
              <span>{caseStudy.ruleRefs.length} references</span>
            </div>
            <span className="text-[#003366] font-medium flex items-center gap-1">
              View case <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
