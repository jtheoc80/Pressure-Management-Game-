"use client";

import { COLORS } from "@/lib/psv/brand";

export default function FlareHeaderVariableBP() {
  return (
    <svg viewBox="0 0 800 420" className="w-full h-auto">
      <defs>
        <pattern id="grid-fhvbp" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="420" fill="#f8fafc" />
      <rect width="800" height="420" fill="url(#grid-fhvbp)" />

      {/* Title */}
      <text x="400" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Flare Header: Variable Backpressure
      </text>

      {/* Flare header system */}
      <g transform="translate(50, 60)">
        {/* Main header pipe */}
        <rect x="100" y="150" width="550" height="30" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
        <text x="375" y="170" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="500">
          FLARE HEADER
        </text>

        {/* PSVs feeding into header */}
        <g transform="translate(150, 50)">
          <rect x="0" y="0" width="35" height="50" fill={COLORS.navy} rx="4" />
          <text x="17" y="30" textAnchor="middle" fill="white" fontSize="9">PSV</text>
          <text x="17" y="43" textAnchor="middle" fill="#93c5fd" fontSize="7">-101</text>
          <line x1="17" y1="50" x2="17" y2="100" stroke={COLORS.navy} strokeWidth="3" />
          <text x="17" y="120" textAnchor="middle" fill={COLORS.gray} fontSize="9">Idle</text>
        </g>

        <g transform="translate(280, 50)">
          <rect x="0" y="0" width="35" height="50" fill="#dc2626" rx="4" />
          <text x="17" y="30" textAnchor="middle" fill="white" fontSize="9">PSV</text>
          <text x="17" y="43" textAnchor="middle" fill="#fecaca" fontSize="7">-102</text>
          <line x1="17" y1="50" x2="17" y2="100" stroke="#dc2626" strokeWidth="3" />
          <text x="17" y="120" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="500">RELIEVING</text>
          {/* Flow arrows */}
          <path d="M 17 55 L 17 95" stroke="#fecaca" strokeWidth="6" />
        </g>

        <g transform="translate(410, 50)">
          <rect x="0" y="0" width="35" height="50" fill={COLORS.navy} rx="4" />
          <text x="17" y="30" textAnchor="middle" fill="white" fontSize="9">PSV</text>
          <text x="17" y="43" textAnchor="middle" fill="#93c5fd" fontSize="7">-103</text>
          <line x1="17" y1="50" x2="17" y2="100" stroke={COLORS.navy} strokeWidth="3" />
          <text x="17" y="120" textAnchor="middle" fill={COLORS.gray} fontSize="9">Idle</text>
        </g>

        <g transform="translate(540, 50)">
          <rect x="0" y="0" width="35" height="50" fill="#f59e0b" rx="4" />
          <text x="17" y="30" textAnchor="middle" fill="white" fontSize="9">PSV</text>
          <text x="17" y="43" textAnchor="middle" fill="#fef3c7" fontSize="7">-104</text>
          <line x1="17" y1="50" x2="17" y2="100" stroke="#f59e0b" strokeWidth="3" />
          <text x="17" y="120" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="500">RELIEVING</text>
          <path d="M 17 55 L 17 95" stroke="#fef3c7" strokeWidth="4" />
        </g>

        {/* Flare stack */}
        <rect x="650" y="100" width="40" height="80" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
        <polygon points="670,100 650,60 690,60" fill="#f59e0b" stroke="#dc2626" strokeWidth="2" />
        <text x="670" y="145" textAnchor="middle" fill={COLORS.navy} fontSize="9">FLARE</text>

        {/* Backpressure indication */}
        <rect x="200" y="195" width="400" height="60" fill="#fee2e2" stroke="#dc2626" rx="4" />
        <text x="400" y="215" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">
          Variable Backpressure Zone
        </text>
        <text x="400" y="235" textAnchor="middle" fill="#7f1d1d" fontSize="10">
          When multiple PSVs relieve → header pressure spikes
        </text>
        <text x="400" y="250" textAnchor="middle" fill="#7f1d1d" fontSize="10">
          Affects capacity of ALL connected PSVs
        </text>
      </g>

      {/* Solution boxes */}
      <g transform="translate(50, 330)">
        <rect x="0" y="0" width="220" height="75" rx="6" fill="white" stroke="#22c55e" strokeWidth="2" />
        <text x="110" y="20" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">
          ✓ Balanced Bellows PSV
        </text>
        <text x="110" y="40" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Backpressure does not
        </text>
        <text x="110" y="55" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          affect set or capacity
        </text>
      </g>

      <g transform="translate(290, 330)">
        <rect x="0" y="0" width="220" height="75" rx="6" fill="white" stroke="#22c55e" strokeWidth="2" />
        <text x="110" y="20" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">
          ✓ Pilot-Operated PSV
        </text>
        <text x="110" y="40" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Immune to backpressure
        </text>
        <text x="110" y="55" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          up to ~50% of set
        </text>
      </g>

      <g transform="translate(530, 330)">
        <rect x="0" y="0" width="220" height="75" rx="6" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <text x="110" y="20" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">
          ℹ️ Design Approach
        </text>
        <text x="110" y="40" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Size header for worst-case
        </text>
        <text x="110" y="55" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          simultaneous relief
        </text>
      </g>
    </svg>
  );
}
