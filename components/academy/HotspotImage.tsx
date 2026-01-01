"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import type { Hotspot } from "@/lib/academy/types";

interface HotspotImageProps {
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
  /** Callback when a hotspot is explored */
  onHotspotExplore?: (index: number, label: string) => void;
  /** Threshold for objective completion (defaults to all) */
  requiredThreshold?: number;
  /** Callback when threshold is reached */
  onThresholdReached?: () => void;
}

export function HotspotImage({
  imageSrc,
  imageAlt,
  hotspots,
  onHotspotExplore,
  requiredThreshold,
  onThresholdReached,
}: HotspotImageProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [completedHotspots, setCompletedHotspots] = useState<Set<number>>(new Set());
  const thresholdReachedRef = React.useRef(false);

  // Calculate threshold (default to all hotspots)
  const threshold = requiredThreshold ?? hotspots.length;

  const handleHotspotClick = useCallback((index: number) => {
    setActiveHotspot((prev) => (prev === index ? null : index));
    
    if (!completedHotspots.has(index)) {
      const newCompleted = new Set([...completedHotspots, index]);
      setCompletedHotspots(newCompleted);
      onHotspotExplore?.(index, hotspots[index].label);
      
      // Check threshold synchronously
      if (!thresholdReachedRef.current && newCompleted.size >= threshold) {
        thresholdReachedRef.current = true;
        onThresholdReached?.();
      }
    }
  }, [completedHotspots, onHotspotExplore, hotspots, threshold, onThresholdReached]);

  const handleClose = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  const allCompleted = completedHotspots.size === hotspots.length;

  return (
    <div className="space-y-4">
      {/* Main Image Container - RELATIVE positioning for hotspots */}
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        {/* Image layer - POINTER-EVENTS-NONE to allow clicks through */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/academy/photos/placeholder.svg";
            }}
          />
        </div>

        {/* Hotspot markers - ABSOLUTE z-10 POINTER-EVENTS-AUTO */}
        {hotspots.map((hotspot, index) => (
          <button
            key={index}
            onClick={() => handleHotspotClick(index)}
            className={`
              absolute z-10 pointer-events-auto
              w-8 h-8 -ml-4 -mt-4 rounded-full 
              flex items-center justify-center text-sm font-bold 
              transition-all duration-200 ease-out
              shadow-lg cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2
              ${activeHotspot === index
                ? "bg-[#003366] text-white scale-125 z-20"
                : completedHotspots.has(index)
                ? "bg-teal-500 text-white hover:bg-teal-600"
                : "bg-white text-[#003366] border-2 border-[#003366] hover:bg-[#003366] hover:text-white"
              }
            `}
            style={{
              left: `${hotspot.xPct}%`,
              top: `${hotspot.yPct}%`,
            }}
            aria-label={`View details for ${hotspot.label}`}
            aria-expanded={activeHotspot === index}
          >
            {completedHotspots.has(index) && activeHotspot !== index ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              index + 1
            )}
          </button>
        ))}

        {/* Active hotspot tooltip - ABSOLUTE z-30 POINTER-EVENTS-AUTO */}
        {activeHotspot !== null && (
          <div
            className="absolute z-30 pointer-events-auto bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs animate-in fade-in zoom-in-95 duration-200"
            style={{
              left: `${Math.min(Math.max(hotspots[activeHotspot].xPct, 15), 85)}%`,
              top: `${Math.min(hotspots[activeHotspot].yPct + 8, 75)}%`,
              transform: "translateX(-50%)",
            }}
            role="tooltip"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Close tooltip"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pr-6">
              <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {activeHotspot + 1}
              </span>
              <h4 className="font-semibold text-[#003366]">
                {hotspots[activeHotspot].label}
              </h4>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {hotspots[activeHotspot].body}
            </p>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-600">
          Click each numbered hotspot to learn about the components
        </p>
        <span
          className={`
            font-medium px-2 py-1 rounded-full text-xs
            ${allCompleted 
              ? "bg-teal-100 text-teal-700" 
              : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {completedHotspots.size} / {hotspots.length} explored
          {allCompleted && " ✓"}
        </span>
      </div>

      {/* Hotspot legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {hotspots.map((hotspot, index) => (
          <button
            key={index}
            onClick={() => handleHotspotClick(index)}
            className={`
              flex items-center gap-2 p-2 rounded-lg text-left 
              transition-colors text-sm
              focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-1
              ${activeHotspot === index
                ? "bg-[#003366]/10 border-2 border-[#003366]"
                : completedHotspots.has(index)
                ? "bg-teal-50 border border-teal-200 hover:bg-teal-100"
                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }
            `}
          >
            <span
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${completedHotspots.has(index) 
                  ? "bg-teal-500 text-white" 
                  : "bg-[#003366] text-white"
                }
              `}
            >
              {completedHotspots.has(index) ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                index + 1
              )}
            </span>
            <span className="truncate">{hotspot.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
