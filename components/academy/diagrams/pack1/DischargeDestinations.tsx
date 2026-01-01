"use client";

import { COLORS } from "@/lib/psv/brand";

export default function DischargeDestinations() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto">
      <defs>
        <pattern id="grid-dd" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="480" fill="#f8fafc" />
      <rect width="800" height="480" fill="url(#grid-dd)" />

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PSV Discharge Destinations
      </text>
      <text x="400" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Where does relieved fluid go?
      </text>

      {/* Central PSV */}
      <g transform="translate(350, 200)">
        <rect x="0" y="0" width="100" height="80" rx="8" fill={COLORS.navy} />
        <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">PSV</text>
        <text x="50" y="55" textAnchor="middle" fill="#93c5fd" fontSize="10">Relieving</text>
        <text x="50" y="70" textAnchor="middle" fill="#93c5fd" fontSize="10">fluid</text>
      </g>

      {/* Atmosphere */}
      <g transform="translate(50, 70)">
        <rect x="0" y="0" width="180" height="100" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="90" y="25" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="600">
          Atmosphere
        </text>
        <text x="90" y="45" textAnchor="middle" fill="#3b82f6" fontSize="10">Clean gas/air/steam</text>
        <text x="90" y="60" textAnchor="middle" fill="#3b82f6" fontSize="10">Safe location</text>
        <text x="90" y="80" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="500">
          ✓ No backpressure
        </text>
      </g>
      <path d="M 230 120 L 350 200" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-dd)" />

      {/* Flare */}
      <g transform="translate(570, 70)">
        <rect x="0" y="0" width="180" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="90" y="25" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="600">
          Flare System
        </text>
        <text x="90" y="45" textAnchor="middle" fill="#b45309" fontSize="10">Hydrocarbon vapors</text>
        <text x="90" y="60" textAnchor="middle" fill="#b45309" fontSize="10">Combustible gases</text>
        <text x="90" y="80" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="500">
          ⚠️ Variable backpressure
        </text>
      </g>
      <path d="M 570 120 L 450 200" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-dd2)" />

      {/* Closed system */}
      <g transform="translate(50, 310)">
        <rect x="0" y="0" width="180" height="100" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="90" y="25" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="600">
          Closed System
        </text>
        <text x="90" y="45" textAnchor="middle" fill="#22c55e" fontSize="10">Process return</text>
        <text x="90" y="60" textAnchor="middle" fill="#22c55e" fontSize="10">Blowdown drum</text>
        <text x="90" y="80" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="500">
          ✓ Recover valuable product
        </text>
      </g>
      <path d="M 230 360 L 350 280" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-dd3)" />

      {/* Scrubber/Separator */}
      <g transform="translate(570, 310)">
        <rect x="0" y="0" width="180" height="100" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="90" y="25" textAnchor="middle" fill="#4338ca" fontSize="13" fontWeight="600">
          Scrubber/Separator
        </text>
        <text x="90" y="45" textAnchor="middle" fill="#6366f1" fontSize="10">Two-phase flow</text>
        <text x="90" y="60" textAnchor="middle" fill="#6366f1" fontSize="10">Liquid + vapor</text>
        <text x="90" y="80" textAnchor="middle" fill="#4338ca" fontSize="10" fontWeight="500">
          → Separate before flare
        </text>
      </g>
      <path d="M 570 360 L 450 280" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-dd4)" />

      {/* Decision factors */}
      <g transform="translate(150, 430)">
        <rect x="0" y="0" width="500" height="40" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="250" y="26" textAnchor="middle" fill={COLORS.navy} fontSize="11">
          Destination choice depends on: Fluid type • Toxicity • Environmental rules • Recovery value • Backpressure tolerance
        </text>
      </g>

      <defs>
        <marker id="arrow-dd" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
        </marker>
        <marker id="arrow-dd2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
        </marker>
        <marker id="arrow-dd3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
        </marker>
        <marker id="arrow-dd4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
        </marker>
      </defs>
    </svg>
  );
}
