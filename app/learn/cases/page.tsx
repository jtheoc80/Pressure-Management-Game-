"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Factory, Filter, Flame, HardHat, Search, Ship } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cases, type CaseStudy, type CaseEnvironment } from "@/lib/academy/cases";
import type { Track } from "@/lib/academy/types";

const environmentIcons: Record<CaseEnvironment, React.ElementType> = {
  refinery: Factory,
  chemical: Flame,
  terminal: Building2,
  offshore: Ship,
  pipeline: HardHat,
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return cases.filter((c) => {
      if (selectedTrack !== "all" && c.track !== selectedTrack) return false;
      if (selectedEnvironment !== "all" && c.environment !== selectedEnvironment) return false;
      if (query) {
        const haystack = `${c.title} ${c.summary}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [selectedTrack, selectedEnvironment, searchQuery]);

  const environments = Array.from(new Set(cases.map((c) => c.environment)));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950 text-white/90 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <span className="text-sm font-semibold tracking-tight text-white/90">SiteSisters</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/learn" className="text-sm text-white/70 hover:text-white transition-colors">
              Academy
            </Link>
            <Link href="/psv-quest" className="text-sm text-white/70 hover:text-white transition-colors">
              Scenarios
            </Link>
            <Link href="/glossary" className="text-sm text-white/70 hover:text-white transition-colors">
              Glossary
            </Link>
          </nav>

          <Link href="/learn" className="hidden sm:block">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/15 border border-white/20 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
            >
              Back to Academy
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Link href="/learn" className="hover:text-white transition-colors">
              Academy
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">Casebook</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Explore cases</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            Filter and search real-world scenarios for contextual learning.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-6">
          {/* Search + count */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="w-full md:max-w-md">
              <label htmlFor="case-search" className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  id="case-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or summary"
                  className="h-11 rounded-xl bg-white border-slate-200 pl-9 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
                />
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Showing <span className="font-medium text-slate-900">{filteredCases.length}</span> of{" "}
              <span className="font-medium text-slate-900">{cases.length}</span> cases
            </p>
          </div>

          {/* Filters */}
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-900">
                <Filter className="size-5 text-slate-500" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              {/* Track Filter */}
              <div className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Track</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTrack("all")}
                    className={
                      selectedTrack === "all"
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
                        : "border-slate-300 text-slate-900 hover:bg-slate-50"
                    }
                  >
                    All tracks
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTrack("psv")}
                    className={
                      selectedTrack === "psv"
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
                        : "border-slate-300 text-slate-900 hover:bg-slate-50"
                    }
                  >
                    PSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTrack("tank_flame")}
                    className={
                      selectedTrack === "tank_flame"
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
                        : "border-slate-300 text-slate-900 hover:bg-slate-50"
                    }
                  >
                    Tank and flame
                  </Button>
                </div>
              </div>

              {/* Environment Filter */}
              <div className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Environment</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEnvironment("all")}
                    className={
                      selectedEnvironment === "all"
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
                        : "border-slate-300 text-slate-900 hover:bg-slate-50"
                    }
                  >
                    All
                  </Button>
                  {environments.map((env) => {
                    const EnvIcon = environmentIcons[env];
                    return (
                      <Button
                        key={env}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEnvironment(env)}
                        className={
                          selectedEnvironment === env
                            ? "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400"
                            : "border-slate-300 text-slate-900 hover:bg-slate-50"
                        }
                      >
                        <EnvIcon className="size-4" />
                        <span className="ml-1">{environmentLabels[env]}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <span className="font-medium text-slate-900">{filteredCases.length}</span> results
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-900 hover:bg-slate-50"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTrack("all");
                    setSelectedEnvironment("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Case Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCases.map((caseStudy) => (
              <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-slate-600">No cases match your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const EnvIcon = environmentIcons[caseStudy.environment];
  return (
    <Link href={`/learn/cases/${caseStudy.id}`}>
      <Card className="h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-slate-100 text-slate-700 rounded-xl p-3">
                <EnvIcon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-600">{environmentLabels[caseStudy.environment]}</p>
                <h3 className="text-slate-900 font-semibold text-lg leading-snug truncate">
                  {caseStudy.title}
                </h3>
              </div>
            </div>
            <ArrowRight className="mt-2 size-5 text-slate-400 shrink-0" />
          </div>

          <p className="text-slate-500 text-sm mt-3 line-clamp-1">
            {caseStudy.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs text-slate-700 border-slate-200">
              {trackLabels[caseStudy.track]}
            </Badge>
            <Badge variant="outline" className="text-xs text-slate-700 border-slate-200">
              {caseStudy.photos.length} photos
            </Badge>
            <Badge variant="outline" className="text-xs text-slate-700 border-slate-200">
              {caseStudy.ruleRefs.length} references
            </Badge>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-slate-600">Open details</span>
            <span className="inline-flex items-center gap-1 text-slate-900 font-medium">
              View case <ArrowRight className="size-4 text-slate-400" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
