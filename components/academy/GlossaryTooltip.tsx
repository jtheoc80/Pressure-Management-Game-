"use client";

import { useState, useRef, useEffect } from "react";
import { getTermByName } from "@/lib/academy/glossary";
import type { GlossaryTerm } from "@/lib/academy/types";

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const termData = getTermByName(term);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 320;
      const tooltipHeight = 200;

      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      let top = rect.bottom + 8;

      // Keep tooltip within viewport
      if (left < 10) left = 10;
      if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
      }

      // If tooltip would go below viewport, show above
      if (top + tooltipHeight > window.innerHeight - 10) {
        top = rect.top - tooltipHeight - 8;
      }

      // Use requestAnimationFrame to avoid synchronous setState
      requestAnimationFrame(() => {
        setPosition({ top, left });
      });
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!termData) {
    return <span>{children}</span>;
  }

  return (
    <>
      <span
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          // Small delay to allow moving to tooltip
          setTimeout(() => {
            if (!tooltipRef.current?.matches(":hover")) {
              setIsOpen(false);
            }
          }, 100);
        }}
        className="cursor-help border-b border-dashed border-slate-400 text-slate-700 hover:text-blue-600 hover:border-blue-400 transition-colors"
      >
        {children}
      </span>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-80 bg-white rounded-lg shadow-xl border border-slate-200 p-4 animate-in fade-in-0 zoom-in-95 duration-150"
          style={{ top: position.top, left: position.left }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <GlossaryCard term={termData} compact />
        </div>
      )}
    </>
  );
}

interface GlossaryCardProps {
  term: GlossaryTerm;
  compact?: boolean;
}

export function GlossaryCard({ term, compact = false }: GlossaryCardProps) {
  const categoryColors: Record<string, string> = {
    Pressure: "bg-blue-100 text-blue-700",
    Thermo: "bg-orange-100 text-orange-700",
    Gas: "bg-purple-100 text-purple-700",
    Liquid: "bg-cyan-100 text-cyan-700",
    Valve: "bg-slate-100 text-slate-700",
    Tank: "bg-emerald-100 text-emerald-700",
    Flame: "bg-red-100 text-red-700",
    Overfill: "bg-amber-100 text-amber-700",
  };

  return (
    <div className={compact ? "" : "p-4"}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className={`font-semibold text-slate-800 ${compact ? "text-sm" : "text-base"}`}>
          {term.term}
        </h4>
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            categoryColors[term.category] || "bg-slate-100 text-slate-700"
          }`}
        >
          {term.category}
        </span>
      </div>

      <p className={`text-slate-600 ${compact ? "text-xs" : "text-sm"}`}>
        {term.definition}
      </p>

      {!compact && (
        <>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Why It Matters
            </h5>
            <p className="text-sm text-slate-600">{term.whyItMatters}</p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100">
            <h5 className="text-xs font-semibold text-amber-600 uppercase mb-1">
              Common Mistake
            </h5>
            <p className="text-sm text-slate-600">{term.commonMistake}</p>
          </div>

          {term.example && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <h5 className="text-xs font-semibold text-emerald-600 uppercase mb-1">
                Example
              </h5>
              <p className="text-sm text-slate-600">{term.example}</p>
            </div>
          )}

          {term.related && term.related.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <h5 className="text-xs font-semibold text-slate-500 uppercase mb-1">
                Related Terms
              </h5>
              <div className="flex flex-wrap gap-1">
                {term.related.map((relatedTerm) => (
                  <span
                    key={relatedTerm}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                  >
                    {relatedTerm}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {compact && (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <p className="text-xs text-amber-600">
            <span className="font-medium">⚠️ Common mistake:</span> {term.commonMistake}
          </p>
        </div>
      )}
    </div>
  );
}
