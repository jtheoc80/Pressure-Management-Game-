"use client";

import { COLORS } from "@/lib/psv/brand";

export default function FireCaseExposure() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="grid-fce" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="fire-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <rect width="800" height="480" fill="#f8fafc" />
      <rect width="800" height="480" fill="url(#grid-fce)" />

      {/* Title */}
      <text x="400" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Fire Case: Wetted Area Concept
      </text>
      <text x="400" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        External fire heats vessel contents, causing vaporization
      </text>

      {/* Vessel with fire */}
      <g transform="translate(100, 80)">
        {/* Vessel */}
        <ellipse cx="150" cy="40" rx="100" ry="25" fill="#e0e7ff" stroke={COLORS.navy} strokeWidth="2" />
        <rect x="50" y="40" width="200" height="200" fill="#e0e7ff" stroke={COLORS.navy} strokeWidth="2" />
        <ellipse cx="150" cy="240" rx="100" ry="25" fill="#e0e7ff" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Liquid level */}
        <ellipse cx="150" cy="140" rx="95" ry="22" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
        <rect x="55" y="140" width="190" height="98" fill="#60a5fa" />
        <ellipse cx="150" cy="238" rx="95" ry="22" fill="#60a5fa" />
        
        {/* Vapor space */}
        <text x="150" y="90" textAnchor="middle" fill="#4338ca" fontSize="11">Vapor Space</text>
        
        {/* Liquid label */}
        <text x="150" y="190" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">Liquid</text>
        
        {/* PSV on top */}
        <rect x="130" y="0" width="40" height="45" fill={COLORS.navy} rx="4" />
        <text x="150" y="28" textAnchor="middle" fill="white" fontSize="10">PSV</text>
        
        {/* Fire flames around base */}
        <g transform="translate(0, 245)">
          <path d="M 30 50 Q 40 20 50 50 Q 60 10 70 50 Q 80 25 90 50 Q 100 15 110 50" 
                fill="url(#fire-gradient)" />
          <path d="M 110 50 Q 120 20 130 50 Q 140 10 150 50 Q 160 25 170 50 Q 180 15 190 50" 
                fill="url(#fire-gradient)" />
          <path d="M 190 50 Q 200 20 210 50 Q 220 10 230 50 Q 240 25 250 50 Q 260 15 270 50" 
                fill="url(#fire-gradient)" />
        </g>
        
        {/* Wetted area indication */}
        <line x1="-20" y1="140" x2="50" y2="140" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="-20" y1="240" x2="50" y2="240" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="-15" y1="140" x2="-15" y2="240" stroke="#22c55e" strokeWidth="3" />
        <polygon points="-15,145 -20,155 -10,155" fill="#22c55e" />
        <polygon points="-15,235 -20,225 -10,225" fill="#22c55e" />
        <text x="-35" y="195" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600" 
              transform="rotate(-90, -35, 195)">WETTED</text>
      </g>

      {/* Right side explanation */}
      <g transform="translate(420, 90)">
        <rect x="0" y="0" width="340" height="180" rx="8" fill="white" stroke={COLORS.navy} />
        <text x="170" y="25" textAnchor="middle" fill={COLORS.navy} fontSize="13" fontWeight="600">
          Fire Case Relief Load
        </text>
        
        <text x="20" y="55" fill={COLORS.gray} fontSize="11">1. Fire heats vessel shell</text>
        <text x="20" y="75" fill={COLORS.gray} fontSize="11">2. Heat transfers to liquid (wetted area)</text>
        <text x="20" y="95" fill={COLORS.gray} fontSize="11">3. Liquid vaporizes at surface</text>
        <text x="20" y="115" fill={COLORS.gray} fontSize="11">4. Vapor pressure increases</text>
        <text x="20" y="135" fill={COLORS.gray} fontSize="11">5. PSV must relieve vapor rate</text>
        
        <text x="20" y="165" fill={COLORS.navy} fontSize="11" fontWeight="500">
          Wetted Area = surface in contact with liquid
        </text>
      </g>

      {/* Formula box */}
      <g transform="translate(420, 285)">
        <rect x="0" y="0" width="340" height="90" rx="6" fill="#fef3c7" stroke="#f59e0b" />
        <text x="170" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">
          API 521 Fire Case Heat Input
        </text>
        <text x="170" y="48" textAnchor="middle" fill="#78350f" fontSize="13" fontFamily="monospace">
          Q = 21000 × F × A^0.82
        </text>
        <text x="20" y="72" fill="#78350f" fontSize="10">Q = heat (BTU/hr), F = environment factor,</text>
        <text x="20" y="86" fill="#78350f" fontSize="10">A = wetted area (sq ft) up to 25 ft above grade</text>
      </g>

      {/* Key points */}
      <g transform="translate(100, 395)">
        <rect x="0" y="0" width="280" height="70" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="140" y="20" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Wetted Area Determines Load
        </text>
        <text x="15" y="40" fill={COLORS.gray} fontSize="10">• Only area below liquid level counts</text>
        <text x="15" y="55" fill={COLORS.gray} fontSize="10">• Height limit: 25 ft above grade</text>
      </g>

      <g transform="translate(400, 395)">
        <rect x="0" y="0" width="280" height="70" rx="6" fill="#ecfdf5" stroke="#10b981" />
        <text x="140" y="20" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
          Environment Factor (F)
        </text>
        <text x="15" y="40" fill="#047857" fontSize="10">• F = 1.0 bare vessel, no drainage</text>
        <text x="15" y="55" fill="#047857" fontSize="10">• F = 0.3 with fireproofing + drainage</text>
      </g>
    </svg>
  );
}
