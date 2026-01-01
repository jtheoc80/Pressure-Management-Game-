"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { diagramRegistry, hasDiagram, getDiagramKeys } from "@/lib/academy/diagramRegistry";
import { diagramComponents } from "./diagrams";
import { useLessonProgressOptional } from "./LessonProgressProvider";

interface DiagramRendererProps {
  diagramKey: string;
  caption?: string;
  className?: string;
}

/**
 * DiagramRenderer - Renders diagrams by key with validation
 * 
 * Features:
 * - Looks up diagrams in both diagramRegistry and legacy diagramComponents
 * - Shows a visible error box if diagram key is not found
 * - Tracks viewing via lesson progress checkpoints
 * - Ensures stable container with minimum height
 */
export function DiagramRenderer({
  diagramKey,
  caption,
  className = "",
}: DiagramRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasViewed, setHasViewed] = useState(false);
  const progress = useLessonProgressOptional();

  // Look up the diagram component in both registries
  const DiagramComponent =
    diagramRegistry[diagramKey] ||
    diagramComponents[diagramKey as keyof typeof diagramComponents];

  // Track when diagram becomes visible
  useEffect(() => {
    if (!DiagramComponent || hasViewed || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
          // Mark checkpoint for viewing this diagram
          progress?.markCheckpoint(`viewed:diagram:${diagramKey}`);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // 30% visibility
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [DiagramComponent, hasViewed, diagramKey, progress]);

  // If diagram not found, show error box
  if (!DiagramComponent) {
    const availableKeys = getDiagramKeys().slice(0, 10);
    
    return (
      <Card className="border-red-300 bg-red-50 my-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">
                Diagram key not found: <code className="bg-red-100 px-1 rounded">{diagramKey}</code>
              </p>
              <p className="text-sm text-red-600 mt-1">
                This diagram key is not registered. Check that the key matches an entry in the diagram registry.
              </p>
              <details className="mt-2">
                <summary className="text-xs text-red-500 cursor-pointer hover:text-red-700">
                  Show available diagram keys (first 10)
                </summary>
                <ul className="text-xs text-red-600 mt-1 ml-4 list-disc">
                  {availableKeys.map((key) => (
                    <li key={key}>
                      <code className="bg-red-100 px-1 rounded">{key}</code>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-red-500 mt-1">
                  Total available: {getDiagramKeys().length} diagrams
                </p>
              </details>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div ref={containerRef} className={`my-6 ${className}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-hidden min-h-[200px] flex items-center justify-center">
        <DiagramComponent />
      </div>
      {caption && (
        <p className="text-sm text-gray-500 text-center mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
}

/**
 * Utility to validate all diagram keys in a lesson before rendering
 * Returns array of invalid keys
 */
export function validateDiagramKeys(keys: string[]): string[] {
  return keys.filter((key) => !hasDiagram(key) && !(key in diagramComponents));
}

/**
 * Check if a diagram key exists in either registry
 */
export function isDiagramAvailable(key: string): boolean {
  return hasDiagram(key) || key in diagramComponents;
}
