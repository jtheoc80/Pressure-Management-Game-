"use client";

import { COLORS } from "@/lib/psv/brand";

export default function FlameVsDetonationZones() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-auto">
      <defs>
        <pattern id="grid-fvdz" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill="#f8fafc" />
      <rect width="800" height="450" fill="url(#grid-fvdz)" />

      {/* Title */}
      <text x="400" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Flame Front vs Detonation
      </text>
      <text x="400" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Understanding flame propagation modes for arrestor selection
      </text>

      {/* Deflagration side */}
      <g transform="translate(50, 80)">
        <rect x="0" y="0" width="320" height="330" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="320" height="35" rx="8" fill="#fef3c7" />
        <rect x="0" y="27" width="320" height="8" fill="#fef3c7" />
        <text x="160" y="24" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="600">
          DEFLAGRATION (Slow Burn)
        </text>

        {/* Visual: pipe with slow flame */}
        <g transform="translate(60, 60)">
          <rect x="0" y="30" width="200" height="40" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
          
          {/* Flame front - irregular, subsonic */}
          <path d="M 80 30 Q 85 20 90 30 Q 95 15 100 30 Q 105 22 110 30 Q 115 18 120 30" 
                fill="#f59e0b" />
          
          {/* Slow arrow */}
          <path d="M 50 50 L 75 50" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-slow-fvd)" />
          <text x="62" y="42" textAnchor="middle" fill="#f59e0b" fontSize="8">Slow</text>
          
          {/* Unburned gas */}
          <rect x="120" y="35" width="75" height="30" fill="#dbeafe" opacity="0.5" />
          <text x="158" y="55" textAnchor="middle" fill="#3b82f6" fontSize="8">Unburned</text>
        </g>

        {/* Characteristics */}
        <text x="20" y="150" fill={COLORS.navy} fontSize="11" fontWeight="600">Characteristics:</text>
        <text x="25" y="170" fill={COLORS.gray} fontSize="10">• Speed: 1-10 m/s (subsonic)</text>
        <text x="25" y="188" fill={COLORS.gray} fontSize="10">• Pressure rise: moderate (2-8x)</text>
        <text x="25" y="206" fill={COLORS.gray} fontSize="10">• Flame front is irregular</text>
        <text x="25" y="224" fill={COLORS.gray} fontSize="10">• Heat transfer by conduction</text>

        <text x="20" y="255" fill={COLORS.navy} fontSize="11" fontWeight="600">Arrestor Type:</text>
        <rect x="25" y="265" width="150" height="30" rx="4" fill="#dcfce7" stroke="#22c55e" />
        <text x="100" y="285" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="500">
          Deflagration Arrestor
        </text>
        
        <text x="25" y="315" fill={COLORS.gray} fontSize="9">Standard for most tank vents</text>
        <text x="25" y="330" fill={COLORS.gray} fontSize="9">when run-up distance is short</text>
      </g>

      {/* Detonation side */}
      <g transform="translate(430, 80)">
        <rect x="0" y="0" width="320" height="330" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="320" height="35" rx="8" fill="#fee2e2" />
        <rect x="0" y="27" width="320" height="8" fill="#fee2e2" />
        <text x="160" y="24" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="600">
          DETONATION (Explosion)
        </text>

        {/* Visual: pipe with shock wave */}
        <g transform="translate(60, 60)">
          <rect x="0" y="30" width="200" height="40" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
          
          {/* Sharp shock front */}
          <rect x="90" y="30" width="8" height="40" fill="#dc2626" />
          
          {/* Shock waves behind */}
          <path d="M 70 35 L 70 65 M 60 38 L 60 62 M 50 40 L 50 60" 
                stroke="#f59e0b" strokeWidth="2" opacity="0.7" />
          
          {/* Fast arrow */}
          <path d="M 30 50 L 85 50" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrow-fast-fvd)" />
          <text x="55" y="42" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="600">FAST!</text>
          
          {/* Compression zone */}
          <rect x="98" y="35" width="95" height="30" fill="#fee2e2" opacity="0.5" />
          <text x="145" y="55" textAnchor="middle" fill="#dc2626" fontSize="8">Compressed</text>
        </g>

        {/* Characteristics */}
        <text x="20" y="150" fill={COLORS.navy} fontSize="11" fontWeight="600">Characteristics:</text>
        <text x="25" y="170" fill={COLORS.gray} fontSize="10">• Speed: 1500-2500 m/s (supersonic!)</text>
        <text x="25" y="188" fill={COLORS.gray} fontSize="10">• Pressure rise: severe (15-40x)</text>
        <text x="25" y="206" fill={COLORS.gray} fontSize="10">• Sharp shock wave front</text>
        <text x="25" y="224" fill={COLORS.gray} fontSize="10">• Heat transfer by compression</text>

        <text x="20" y="255" fill={COLORS.navy} fontSize="11" fontWeight="600">Arrestor Type:</text>
        <rect x="25" y="265" width="150" height="30" rx="4" fill="#fee2e2" stroke="#dc2626" />
        <text x="100" y="285" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="500">
          Detonation Arrestor
        </text>
        
        <text x="25" y="315" fill={COLORS.gray} fontSize="9">Required for long pipe runs</text>
        <text x="25" y="330" fill={COLORS.gray} fontSize="9">where DDT can occur</text>
      </g>

      {/* DDT explanation */}
      <g transform="translate(200, 420)">
        <rect x="0" y="0" width="400" height="25" rx="4" fill={COLORS.navy} />
        <text x="200" y="17" textAnchor="middle" fill="white" fontSize="10">
          DDT = Deflagration-to-Detonation Transition occurs in long, confined runs
        </text>
      </g>

      <defs>
        <marker id="arrow-slow-fvd" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
        <marker id="arrow-fast-fvd" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  );
}
