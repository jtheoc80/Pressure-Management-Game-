"use client";

import React, { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RuleCardProps {
  title: string;
  body: string;
  quote?: string;
  sourceLabel: string;
  sourceUrl?: string;
}

export function RuleCard({ title, body, quote, sourceLabel, sourceUrl }: RuleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${title}\n\n${body}${quote ? `\n\n"${quote}"` : ""}\n\nSource: ${sourceLabel}${sourceUrl ? ` (${sourceUrl})` : ""}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-l-4 border-l-[#003366] bg-slate-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-[#003366]/10 rounded-lg shrink-0">
              <BookOpen className="w-5 h-5 text-[#003366]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#003366]">{title}</h4>
              <p className="text-sm text-gray-700 mt-1">{body}</p>
              
              {quote && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-sm text-[#003366] mt-2 hover:underline"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide quote
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      View source quote
                    </>
                  )}
                </button>
              )}
              
              {expanded && quote && (
                <blockquote className="mt-3 pl-4 border-l-2 border-[#003366]/30 italic text-gray-600 text-sm">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              )}
              
              <div className="flex items-center gap-3 mt-3">
                {sourceUrl ? (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#003366] hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {sourceLabel}
                  </a>
                ) : (
                  <span className="text-xs text-gray-500">{sourceLabel}</span>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
            aria-label="Copy reference"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
