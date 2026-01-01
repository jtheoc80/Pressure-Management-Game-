"use client";

import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Scenario } from "@/lib/psv/types";
import { pidSnippets } from "@/lib/psv/svg";

interface ScenarioBriefProps {
  scenario: Scenario;
  onAttachmentOpen?: () => void;
}

export function ScenarioBrief({ scenario, onAttachmentOpen }: ScenarioBriefProps) {
  const handleTabChange = useCallback(() => {
    if (onAttachmentOpen) {
      onAttachmentOpen();
    }
  }, [onAttachmentOpen]);

  const getPidSnippet = () => {
    if (scenario.serviceType === "steam") return pidSnippets.steam;
    if (scenario.serviceType === "gas") return pidSnippets.gas;
    return pidSnippets.liquid;
  };

  return (
    <Card className="border-[var(--puffer-border)]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-[var(--puffer-navy)]">
              Scenario Briefing
            </CardTitle>
            <p className="text-sm text-[var(--puffer-gray)] mt-1">
              {scenario.title}
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-[var(--puffer-bg)] text-[var(--puffer-navy)] border-[var(--puffer-border)]"
          >
            Level {scenario.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <div className="p-3 bg-[var(--puffer-bg)] rounded-lg">
          <p className="text-sm text-[var(--puffer-navy)]">
            {scenario.description}
          </p>
        </div>

        {/* Constraints */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-2">
            Operating Constraints
          </h4>
          <ul className="space-y-1.5">
            {scenario.constraints.map((constraint, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-[var(--puffer-gray)]"
              >
                <span className="text-[var(--puffer-navy)] mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </span>
                {constraint}
              </li>
            ))}
          </ul>
        </div>

        {/* Attachments */}
        {scenario.attachments && scenario.attachments.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-2">
              Reference Documents
            </h4>
            <Tabs 
              defaultValue={scenario.attachments[0].id} 
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className={`grid w-full bg-[var(--puffer-bg)] ${scenario.attachments.length === 2 ? 'grid-cols-2' : scenario.attachments.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {scenario.attachments.map((attachment) => (
                  <TabsTrigger
                    key={attachment.id}
                    value={attachment.id}
                    className="text-xs data-[state=active]:bg-white data-[state=active]:text-[var(--puffer-navy)]"
                  >
                    {attachment.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {scenario.attachments.map((attachment) => (
                <TabsContent
                  key={attachment.id}
                  value={attachment.id}
                  className="mt-2"
                >
                  <div className="border border-[var(--puffer-border)] rounded-lg overflow-hidden">
                    {attachment.type === "svg" ||
                    attachment.title.includes("P&ID") ? (
                      <div
                        className="bg-white p-2"
                        dangerouslySetInnerHTML={{ __html: getPidSnippet() }}
                      />
                    ) : (
                      <div className="p-3 bg-white">
                        <p className="text-sm text-[var(--puffer-gray)] whitespace-pre-line">
                          {attachment.contentRef}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {/* Required fields hint */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="text-sm font-semibold text-amber-800 mb-1 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Datasheet Required
          </h4>
          <p className="text-xs text-amber-700">
            Complete all required datasheet fields before submitting your valve selection.
            Missing fields will reduce your score.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
