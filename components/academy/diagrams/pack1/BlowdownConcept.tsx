"use client";

import { COLORS } from "@/lib/psv/brand";

export default function BlowdownConcept() {
  return (
    <svg viewBox="0 0 700 380" className="w-full h-auto">
      <defs>
        <pattern id="grid-bd" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="700" height="380" fill="#f8fafc" />
      <rect width="700" height="380" fill="url(#grid-bd)" />

      {/* Title */}
      <text x="350" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Blowdown Concept
      </text>
      <text x="350" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Pressure drop between opening and reseating
      </text>

      {/* Pressure vs Time graph */}
      <g transform="translate(80, 80)">
        {/* Axes */}
        <line x1="0" y1="220" x2="520" y2="220" stroke={COLORS.navy} strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2="220" stroke={COLORS.navy} strokeWidth="2" />
        
        <text x="260" y="250" textAnchor="middle" fill={COLORS.navy} fontSize="12">Time →</text>
        <text x="-30" y="110" textAnchor="middle" fill={COLORS.navy} fontSize="12" transform="rotate(-90, -30, 110)">Pressure</text>

        {/* Pressure lines */}
        {/* Set pressure */}
        <line x1="0" y1="60" x2="520" y2="60" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8,4" />
        <text x="530" y="64" fill="#1e40af" fontSize="11" fontWeight="500">Set = 100 psig</text>

        {/* Reseat pressure */}
        <line x1="0" y1="100" x2="520" y2="100" stroke="#22c55e" strokeWidth="2" strokeDasharray="8,4" />
        <text x="530" y="104" fill="#166534" fontSize="11" fontWeight="500">Reseat = 93 psig</text>

        {/* Operating pressure */}
        <line x1="0" y1="160" x2="520" y2="160" stroke={COLORS.gray} strokeWidth="1" strokeDasharray="4,4" />
        <text x="530" y="164" fill={COLORS.gray} fontSize="10">Normal Op = 80 psig</text>

        {/* Pressure curve */}
        <path 
          d="M 40 160 L 100 160 L 120 60 L 200 30 L 320 30 L 380 60 L 400 100 L 450 160 L 500 160" 
          fill="none" 
          stroke={COLORS.navy} 
          strokeWidth="3"
        />

        {/* Shaded blowdown region */}
        <rect x="380" y="60" width="20" height="40" fill="#fef3c7" opacity="0.7" />
        
        {/* Blowdown arrow */}
        <line x1="430" y1="60" x2="430" y2="100" stroke={COLORS.warning} strokeWidth="3" />
        <polygon points="430,100 425,90 435,90" fill={COLORS.warning} />
        <text x="465" y="85" fill="#92400e" fontSize="12" fontWeight="600">Blowdown</text>
        <text x="465" y="100" fill="#92400e" fontSize="11">= 7 psig (7%)</text>

        {/* Event labels */}
        <text x="120" y="20" fill={COLORS.navy} fontSize="10" fontWeight="500">PSV Opens</text>
        <line x1="120" y1="25" x2="120" y2="55" stroke={COLORS.navy} strokeWidth="1" strokeDasharray="2,2" />
        
        <text x="390" y="20" fill={COLORS.navy} fontSize="10" fontWeight="500">PSV Reseats</text>
        <line x1="390" y1="25" x2="390" y2="95" stroke={COLORS.navy} strokeWidth="1" strokeDasharray="2,2" />
      </g>

      {/* Formula and definition */}
      <g transform="translate(80, 320)">
        <rect x="0" y="0" width="250" height="45" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="125" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Blowdown Formula
        </text>
        <text x="125" y="35" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          BD% = (Set - Reseat) / Set × 100
        </text>
      </g>

      <g transform="translate(350, 320)">
        <rect x="0" y="0" width="250" height="45" rx="6" fill="#ecfdf5" stroke="#10b981" />
        <text x="125" y="18" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
          Typical Range
        </text>
        <text x="125" y="35" textAnchor="middle" fill="#047857" fontSize="10">
          5-10% blowdown (adjustable)
        </text>
      </g>
    </svg>
  );
}
