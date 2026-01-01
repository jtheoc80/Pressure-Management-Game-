"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { LessonObjective } from "@/lib/academy/types";

interface LessonProgressContextType {
  // Checkpoint management
  markCheckpoint: (key: string) => void;
  hasCheckpoint: (key: string) => boolean;
  getCheckpoints: () => string[];
  
  // Objective progress
  percentForObjective: (objective: LessonObjective) => number;
  isObjectiveComplete: (objective: LessonObjective) => boolean;
  overallProgress: number;
  
  // Hotspot tracking
  markHotspot: (hotspotId: string) => void;
  hasExploredHotspot: (hotspotId: string) => boolean;
  getExploredHotspotCount: (sectionKey: string) => number;
}

const LessonProgressContext = createContext<LessonProgressContextType | null>(null);

interface LessonProgressProviderProps {
  lessonId: string;
  objectives: LessonObjective[];
  children: React.ReactNode;
}

const STORAGE_PREFIX = "academy:lesson:";

/** Helper to load checkpoints from localStorage */
function loadCheckpointsFromStorage(storageKey: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch {
    // Ignore errors, return empty set
  }
  return new Set();
}

export function LessonProgressProvider({
  lessonId,
  objectives,
  children,
}: LessonProgressProviderProps) {
  // Storage key for this lesson
  const storageKey = `${STORAGE_PREFIX}${lessonId}:checkpoints`;

  // Initialize checkpoints from localStorage using lazy initialization
  const [checkpoints, setCheckpoints] = useState<Set<string>>(() => 
    loadCheckpointsFromStorage(storageKey)
  );

  // Persist checkpoints to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(checkpoints)));
    } catch {
      // Ignore localStorage errors
    }
  }, [checkpoints, storageKey]);

  // Mark a checkpoint as complete
  const markCheckpoint = useCallback((key: string) => {
    setCheckpoints((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  // Check if a checkpoint is complete
  const hasCheckpoint = useCallback(
    (key: string) => checkpoints.has(key),
    [checkpoints]
  );

  // Get all checkpoints
  const getCheckpoints = useCallback(
    () => Array.from(checkpoints),
    [checkpoints]
  );

  // Calculate progress for a specific objective
  const percentForObjective = useCallback(
    (objective: LessonObjective): number => {
      if (!objective.checkpoints || objective.checkpoints.length === 0) {
        return 0;
      }
      const completed = objective.checkpoints.filter((cp) =>
        checkpoints.has(cp)
      ).length;
      return Math.round((completed / objective.checkpoints.length) * 100);
    },
    [checkpoints]
  );

  // Check if an objective is fully complete
  const isObjectiveComplete = useCallback(
    (objective: LessonObjective): boolean => {
      if (!objective.checkpoints || objective.checkpoints.length === 0) {
        return false;
      }
      return objective.checkpoints.every((cp) => checkpoints.has(cp));
    },
    [checkpoints]
  );

  // Calculate overall progress across all objectives
  const overallProgress = useMemo(() => {
    if (objectives.length === 0) return 0;
    const totalProgress = objectives.reduce(
      (sum, obj) => sum + percentForObjective(obj),
      0
    );
    return Math.round(totalProgress / objectives.length);
  }, [objectives, percentForObjective]);

  // Hotspot tracking
  const markHotspot = useCallback((hotspotId: string) => {
    markCheckpoint(`hotspot:${lessonId}:${hotspotId}`);
  }, [markCheckpoint, lessonId]);

  const hasExploredHotspot = useCallback(
    (hotspotId: string) => hasCheckpoint(`hotspot:${lessonId}:${hotspotId}`),
    [hasCheckpoint, lessonId]
  );

  const getExploredHotspotCount = useCallback(
    (sectionKey: string): number => {
      const prefix = `hotspot:${lessonId}:${sectionKey}:`;
      return Array.from(checkpoints).filter((cp) => cp.startsWith(prefix)).length;
    },
    [checkpoints, lessonId]
  );

  const value = useMemo(
    () => ({
      markCheckpoint,
      hasCheckpoint,
      getCheckpoints,
      percentForObjective,
      isObjectiveComplete,
      overallProgress,
      markHotspot,
      hasExploredHotspot,
      getExploredHotspotCount,
    }),
    [
      markCheckpoint,
      hasCheckpoint,
      getCheckpoints,
      percentForObjective,
      isObjectiveComplete,
      overallProgress,
      markHotspot,
      hasExploredHotspot,
      getExploredHotspotCount,
    ]
  );

  return (
    <LessonProgressContext.Provider value={value}>
      {children}
    </LessonProgressContext.Provider>
  );
}

/**
 * Hook to access lesson progress context
 */
export function useLessonProgress() {
  const context = useContext(LessonProgressContext);
  if (!context) {
    throw new Error(
      "useLessonProgress must be used within a LessonProgressProvider"
    );
  }
  return context;
}

/**
 * Optional hook that returns null if outside provider (for components that may be used both inside and outside)
 */
export function useLessonProgressOptional() {
  return useContext(LessonProgressContext);
}
