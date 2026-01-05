"use client";

import React from "react";

export function OrificeConceptDiagram() {
  const orifices = [
    { letter: "D", area: "0.110", size: "small" },
    { letter: "E", area: "0.196", size: "small" },
    { letter: "F", area: "0.307", size: "small" },
    { letter: "G", area: "0.503", size: "medium" },
    { letter: "H", area: "0.785", size: "medium" },
    { letter: "J", area: "1.287", size: "medium" },
    { letter: "K", area: "1.838", size: "large" },
    { letter: "L", area: "2.853", size: "large" },
    { letter: "M", area: "3.600", size: "large" },
    { letter: "N", area: "4.340", size: "xlarge" },
    { letter: "P", area: "6.380", size: "xlarge" },
    { letter: "Q", area: "11.05", size: "xlarge" },
  ];

  const getRadius = (size: string) => {
    switch (size) {
      case "small": return 12;
      case "medium": return 18;
      case "large": return 24;
      case "xlarge": return 30;
      default: return 15;
    }
  };

  return (
    <svg viewBox="0 0 700 400" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Background */}
      <rect x="0" y="0" width="700" height="400" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        API 526 Standard Orifice Designations
      </text>

      {/* Subtitle */}
      <text x="350" y="50" textAnchor="middle" fill="#64748b" fontSize="11">
        Orifice letter determines effective discharge area (in²)
      </text>

      {/* Orifice circles */}
      {orifices.map((orifice, index) => {
        const col = index % 6;
        const row = Math.floor(index / 6);
        const x = 80 + col * 100;
        const y = 120 + row * 130;
        const radius = getRadius(orifice.size);

        return (
          <g key={orifice.letter} transform={`translate(${x}, ${y})`}>
            {/* Outer ring */}
            <circle cx="0" cy="0" r={radius + 8} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            {/* Orifice opening */}
            <circle cx="0" cy="0" r={radius} fill="#003366" />
            {/* Letter */}
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              {orifice.letter}
            </text>
            {/* Area label */}
            <text x="0" y={radius + 25} textAnchor="middle" fill="#475569" fontSize="10">
              {orifice.area} in²
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x="30" y="340" width="640" height="50" fill="#e0f2fe" rx="4" stroke="#0284c7" />
      <text x="350" y="360" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
        Selection Rule: Always choose the NEXT LARGER orifice when calculated area falls between sizes
      </text>
      <text x="350" y="378" textAnchor="middle" fill="#0369a1" fontSize="10">
        Example: If you calculate 0.45 in² required → Select G orifice (0.503 in²), not F (0.307 in²)
      </text>

      {/* Arrow showing progression */}
      <defs>
        <marker id="orificeArrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#003366" />
        </marker>
      </defs>
      <line x1="580" y1="120" x2="630" y2="120" stroke="#003366" strokeWidth="2" markerEnd="url(#orificeArrow)" />
      <text x="600" y="110" textAnchor="middle" fill="#003366" fontSize="9">Larger</text>
      <text x="600" y="135" textAnchor="middle" fill="#003366" fontSize="9">capacity</text>
    </svg>
  );
}
