"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ImageIcon } from "lucide-react";
import type { Hotspot } from "@/lib/academy/types";

interface HotspotImageProps {
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
}

export function HotspotImage({ imageSrc, imageAlt, hotspots }: HotspotImageProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [completedHotspots, setCompletedHotspots] = useState<Set<number>>(new Set());
  const [imageError, setImageError] = useState(false);

  const handleHotspotClick = (index: number) => {
    setActiveHotspot(activeHotspot === index ? null : index);
    setCompletedHotspots((prev) => new Set([...prev, index]));
  };

  const allCompleted = completedHotspots.size === hotspots.length;

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">{imageAlt}</p>
              <p className="text-gray-400 text-xs mt-1">Interactive image coming soon</p>
            </div>
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            onError={() => setImageError(true)}
          />
        )}

        {/* Hotspot markers */}
        {hotspots.map((hotspot, index) => (
          <button
            key={index}
            onClick={() => handleHotspotClick(index)}
            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${activeHotspot === index
                ? "bg-[#003366] text-white scale-125 z-20"
                : completedHotspots.has(index)
                ? "bg-emerald-500 text-white"
                : "bg-white text-[#003366] border-2 border-[#003366] hover:bg-[#003366] hover:text-white"
              }
              shadow-lg cursor-pointer`}
            style={{
              left: `${hotspot.xPct}%`,
              top: `${hotspot.yPct}%`,
            }}
            aria-label={`View details for ${hotspot.label}`}
          >
            {index + 1}
          </button>
        ))}

        {/* Active hotspot tooltip */}
        {activeHotspot !== null && (
          <div
            className="absolute z-30 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs"
            style={{
              left: `${Math.min(Math.max(hotspots[activeHotspot].xPct, 15), 85)}%`,
              top: `${hotspots[activeHotspot].yPct + 5}%`,
              transform: "translateX(-50%)",
            }}
          >
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-semibold text-[#003366] pr-6">
              {hotspots[activeHotspot].label}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
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
        <span className={`font-medium ${allCompleted ? "text-emerald-600" : "text-gray-500"}`}>
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
            className={`flex items-center gap-2 p-2 rounded-lg text-left transition-colors text-sm
              ${activeHotspot === index
                ? "bg-[#003366]/10 border border-[#003366]"
                : completedHotspots.has(index)
                ? "bg-emerald-50 border border-emerald-200"
                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${completedHotspots.has(index) ? "bg-emerald-500 text-white" : "bg-[#003366] text-white"}`}
            >
              {index + 1}
            </span>
            <span className="truncate">{hotspot.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
