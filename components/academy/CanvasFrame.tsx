"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CanvasFrameProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
}

/**
 * CanvasFrame - Mandatory container for all diagrams and interactive visuals
 * 
 * CRITICAL: This component prevents SVG overlap issues by:
 * 1. Creating a bounded container with overflow:hidden
 * 2. Providing a consistent aspect ratio for responsive scaling
 * 3. Using relative positioning as the anchor for absolute children
 * 4. Adding a subtle background to define the visual boundary
 * 
 * All diagram components MUST be rendered inside CanvasFrame.
 */
export function CanvasFrame({ 
  children, 
  className,
  aspectRatio = "16/9" 
}: CanvasFrameProps) {
  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]"
  }[aspectRatio];

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-slate-200",
        "bg-gradient-to-br from-white to-slate-50",
        aspectClass,
        className
      )}
    >
      {/* Inner container for proper centering and scaling */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * CanvasFrameAuto - Self-sizing variant that doesn't force aspect ratio
 * Use for diagrams with their own intrinsic sizing
 */
export function CanvasFrameAuto({ 
  children, 
  className,
  minHeight = 200
}: { 
  children: React.ReactNode; 
  className?: string;
  minHeight?: number;
}) {
  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-slate-200",
        "bg-gradient-to-br from-white to-slate-50",
        "flex items-center justify-center p-4",
        className
      )}
      style={{ minHeight }}
    >
      {children}
    </div>
  );
}

export default CanvasFrame;
