"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlossaryCard } from "@/components/academy/GlossaryTooltip";
import { glossaryTerms, getAllCategories, searchTerms } from "@/lib/academy/glossary";
import type { GlossaryTerm, GlossaryCategory } from "@/lib/academy/types";

function GlossaryContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | "All">("All");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  // Handle hash anchor for direct term links
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const foundTerm = glossaryTerms.find(
        (t) => t.term.toLowerCase().replace(/\s+/g, "-") === hash.toLowerCase()
      );
      if (foundTerm) {
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => {
          setSelectedTerm(foundTerm);
          const element = document.getElementById(`term-${hash}`);
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 0);
      }
    }
  }, [searchParams]);

  const categories = getAllCategories();

  // Calculate filtered terms
  const getFilteredTerms = () => {
    let results = glossaryTerms;

    // Filter by search query
    if (searchQuery.trim()) {
      results = searchTerms(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((t) => t.category === selectedCategory);
    }

    // Sort alphabetically
    return results.sort((a, b) => a.term.localeCompare(b.term));
  };

  const filteredTerms = getFilteredTerms();

  const categoryColors: Record<string, string> = {
    Pressure: "bg-blue-100 text-blue-700 border-blue-200",
    Thermo: "bg-orange-100 text-orange-700 border-orange-200",
    Gas: "bg-purple-100 text-purple-700 border-purple-200",
    Liquid: "bg-cyan-100 text-cyan-700 border-cyan-200",
    Valve: "bg-slate-100 text-slate-700 border-slate-200",
    Tank: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Flame: "bg-red-100 text-red-700 border-red-200",
    Overfill: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const handleTermClick = (term: GlossaryTerm) => {
    setSelectedTerm(term);
    // Update URL hash without scrolling
    const slug = term.term.toLowerCase().replace(/\s+/g, "-");
    window.history.pushState(null, "", `#${slug}`);
  };

  const handleCopyLink = (term: GlossaryTerm) => {
    const slug = term.term.toLowerCase().replace(/\s+/g, "-");
    const url = `${window.location.origin}/glossary#${slug}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0B1F3B] to-[#12345A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-white">Academy</Link>
            <span>/</span>
            <span>Glossary</span>
          </div>
          <h1 className="text-3xl font-bold">Industry Glossary</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            {glossaryTerms.length}+ terms covering pressure relief, tank protection, and process safety.
            Click any term to see its full definition, common mistakes, and examples.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Search & Filter */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search */}
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <Input
                    type="text"
                    placeholder="Search terms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "All" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("All")}
                    className="text-xs"
                  >
                    All ({glossaryTerms.length})
                  </Button>
                  {categories.map((cat) => {
                    const count = glossaryTerms.filter((t) => t.category === cat).length;
                    return (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="text-xs"
                      >
                        {cat} ({count})
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Terms List */}
            <Card className="border-slate-200">
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredTerms.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No terms found matching your search.
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {filteredTerms.map((term) => {
                        const isSelected = selectedTerm?.term === term.term;
                        const slug = term.term.toLowerCase().replace(/\s+/g, "-");
                        return (
                          <li
                            key={term.term}
                            id={`term-${slug}`}
                          >
                            <button
                              onClick={() => handleTermClick(term)}
                              className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                                isSelected ? "bg-blue-50" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`font-medium ${isSelected ? "text-blue-700" : "text-slate-800"}`}>
                                  {term.term}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${categoryColors[term.category] || ""}`}
                                >
                                  {term.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                {term.definition}
                              </p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Term Details */}
          <div className="lg:col-span-8">
            {selectedTerm ? (
              <Card className="border-slate-200 sticky top-24">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`${categoryColors[selectedTerm.category] || ""}`}
                    >
                      {selectedTerm.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyLink(selectedTerm)}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      Copy Link
                    </Button>
                  </div>
                  <GlossaryCard term={selectedTerm} />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-slate-200">
                <CardContent className="p-8 text-center">
                  <div className="text-slate-400 mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    Select a Term
                  </h3>
                  <p className="text-sm text-slate-500">
                    Click on any term from the list to view its full definition,
                    why it matters, common mistakes, and related terms.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Reference */}
            <Card className="border-slate-200 mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-slate-700 mb-3">Quick Reference</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-medium text-slate-800">psig → psia</div>
                    <div className="text-xs text-slate-500">Add 14.7</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-medium text-slate-800">BP Limit</div>
                    <div className="text-xs text-slate-500">&lt;10% for conventional</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-medium text-slate-800">Pass Quiz</div>
                    <div className="text-xs text-slate-500">≥80% score</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="font-medium text-slate-800">Steam MW</div>
                    <div className="text-xs text-slate-500">18.02</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GlossaryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <GlossaryContent />
    </Suspense>
  );
}
