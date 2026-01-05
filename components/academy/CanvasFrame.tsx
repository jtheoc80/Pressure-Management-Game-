"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CanvasFrameProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
  /** Size variant - affects padding and minimum heights */
  size?: "sm" | "md" | "lg";
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
  aspectRatio = "16/9",
  size = "md"
}: CanvasFrameProps) {
  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]"
  }[aspectRatio];

  const paddingClass = {
    sm: "p-3",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8"
  }[size];

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
      <div className={cn("absolute inset-0 flex items-center justify-center", paddingClass)}>
        <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-full [&>div>svg]:w-full [&>div>svg]:h-auto [&>div>svg]:max-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

interface CanvasFrameAutoProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
  /** Size variant - affects padding */
  size?: "sm" | "md" | "lg";
  /** Minimum width to allow horizontal scrolling on mobile */
  minWidth?: number;
}

/**
 * CanvasFrameAuto - Self-sizing variant that doesn't force aspect ratio
 * Use for diagrams with their own intrinsic sizing
 */
export function CanvasFrameAuto({ 
  children, 
  className,
  minHeight = 320,
  size = "md",
  minWidth
}: CanvasFrameAutoProps) {
  const paddingClass = {
    sm: "p-3",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8"
  }[size];

  // If minWidth is set, we need to allow horizontal scrolling
  if (minWidth) {
    return (
      <div 
        className={cn(
          "relative w-full overflow-x-auto rounded-xl border border-slate-200",
          "bg-gradient-to-br from-white to-slate-50",
          className
        )}
        style={{ minHeight }}
      >
        <div 
          className={cn("flex items-center justify-center", paddingClass)}
          style={{ minWidth, minHeight }}
        >
          <div className="w-full [&>svg]:w-full [&>svg]:h-auto [&>svg]:block [&>div>svg]:w-full [&>div>svg]:h-auto [&>div>svg]:block">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-slate-200",
        "bg-gradient-to-br from-white to-slate-50",
        "flex items-center justify-center",
        paddingClass,
        className
      )}
      style={{ minHeight }}
    >
      <div className="w-full [&>svg]:w-full [&>svg]:h-auto [&>svg]:block [&>div>svg]:w-full [&>div>svg]:h-auto [&>div>svg]:block">
        {children}
      </div>
    </div>
  );
}

export default CanvasFrame;
