"use client";

import { COLORS } from "@/lib/psv/brand";

export default function VaporControlDecisionMap() {
  return (
    <svg viewBox="0 0 850 500" className="w-full h-auto">
      <defs>
        <pattern id="grid-vcdm" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="500" fill="#f8fafc" />
      <rect width="850" height="500" fill="url(#grid-vcdm)" />

      {/* Title */}
      <text x="425" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Tank Vapor Control Decision Map
      </text>
      <text x="425" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Choosing between atmospheric vent, conservation vent, or vapor recovery
      </text>

      {/* Start */}
      <ellipse cx="425" cy="90" rx="80" ry="25" fill={COLORS.navy} />
      <text x="425" y="96" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
        Tank Vapor Control?
      </text>

      {/* Decision 1: Flammable? */}
      <g transform="translate(325, 140)">
        <polygon points="100,0 200,50 100,100 0,50" fill="#fef3c7" stroke={COLORS.warning} strokeWidth="2" />
        <text x="100" y="45" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="500">Flammable</text>
        <text x="100" y="60" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="500">vapor?</text>
      </g>
      <line x1="425" y1="115" x2="425" y2="140" stroke={COLORS.navy} strokeWidth="2" />

      {/* No path - open vent */}
      <g transform="translate(150, 280)">
        <rect x="0" y="0" width="150" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="75" y="25" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">Open Vent</text>
        <text x="75" y="42" textAnchor="middle" fill="#166534" fontSize="9">(Atmospheric)</text>
        <text x="75" y="55" textAnchor="middle" fill="#047857" fontSize="8">Simple, lowest cost</text>
      </g>
      <path d="M 325 190 L 225 280" stroke={COLORS.gray} strokeWidth="2" />
      <text x="260" y="230" fill={COLORS.gray} fontSize="10">No</text>

      {/* Yes path - Decision 2 */}
      <line x1="525" y1="190" x2="600" y2="190" stroke={COLORS.navy} strokeWidth="2" />
      <text x="545" y="185" fill={COLORS.navy} fontSize="10">Yes</text>

      {/* Decision 2: Emissions regulated? */}
      <g transform="translate(550, 240)">
        <polygon points="80,0 160,40 80,80 0,40" fill="#fef3c7" stroke={COLORS.warning} strokeWidth="2" />
        <text x="80" y="35" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">Emissions</text>
        <text x="80" y="50" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">regulated?</text>
      </g>
      <line x1="600" y1="190" x2="630" y2="240" stroke={COLORS.navy} strokeWidth="2" />

      {/* No emissions - Conservation vent */}
      <g transform="translate(350, 340)">
        <rect x="0" y="0" width="160" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="80" y="22" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">Conservation Vent</text>
        <text x="80" y="38" textAnchor="middle" fill="#1e40af" fontSize="9">(PV Vent)</text>
        <text x="80" y="52" textAnchor="middle" fill="#3b82f6" fontSize="8">Reduces evap losses</text>
        <text x="80" y="65" textAnchor="middle" fill="#3b82f6" fontSize="8">+ flame arrester</text>
      </g>
      <path d="M 550 280 L 510 340" stroke={COLORS.gray} strokeWidth="2" />
      <text x="515" y="305" fill={COLORS.gray} fontSize="10">No</text>

      {/* Yes - Decision 3 */}
      <line x1="710" y1="280" x2="710" y2="330" stroke={COLORS.navy} strokeWidth="2" />
      <text x="720" y="300" fill={COLORS.navy} fontSize="10">Yes</text>

      {/* Decision 3: Volume? */}
      <g transform="translate(630, 330)">
        <polygon points="80,0 160,40 80,80 0,40" fill="#fef3c7" stroke={COLORS.warning} strokeWidth="2" />
        <text x="80" y="35" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">High vapor</text>
        <text x="80" y="50" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">volume?</text>
      </g>

      {/* No - Flare */}
      <g transform="translate(530, 440)">
        <rect x="0" y="0" width="130" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="65" y="22" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="600">Flare/Thermal</text>
        <text x="65" y="38" textAnchor="middle" fill="#4338ca" fontSize="9">Oxidizer</text>
      </g>
      <path d="M 630 370 L 595 440" stroke={COLORS.gray} strokeWidth="2" />
      <text x="600" y="400" fill={COLORS.gray} fontSize="10">No</text>

      {/* Yes - VRU */}
      <g transform="translate(700, 440)">
        <rect x="0" y="0" width="130" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
        <text x="65" y="22" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="600">Vapor Recovery</text>
        <text x="65" y="38" textAnchor="middle" fill="#9d174d" fontSize="9">Unit (VRU)</text>
      </g>
      <path d="M 790 370 L 765 440" stroke={COLORS.navy} strokeWidth="2" />
      <text x="785" y="400" fill={COLORS.navy} fontSize="10">Yes</text>

      {/* Legend/Summary */}
      <g transform="translate(30, 340)">
        <rect x="0" y="0" width="200" height="150" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="100" y="20" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Key Factors
        </text>
        <text x="15" y="45" fill={COLORS.gray} fontSize="9">• Product vapor pressure</text>
        <text x="15" y="62" fill={COLORS.gray} fontSize="9">• Flash point &lt; 100°F = flammable</text>
        <text x="15" y="79" fill={COLORS.gray} fontSize="9">• EPA/TCEQ emission limits</text>
        <text x="15" y="96" fill={COLORS.gray} fontSize="9">• Tank throughput (BBL/day)</text>
        <text x="15" y="113" fill={COLORS.gray} fontSize="9">• Local fire codes</text>
        <text x="15" y="130" fill={COLORS.gray} fontSize="9">• Product value (recovery $)</text>
      </g>
    </svg>
  );
}
