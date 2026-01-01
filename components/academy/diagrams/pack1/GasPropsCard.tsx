"use client";

import { COLORS } from "@/lib/psv/brand";

export default function GasPropsCard() {
  return (
    <svg viewBox="0 0 700 420" className="w-full h-auto">
      <defs>
        <pattern id="grid-gp" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="700" height="420" fill="#f8fafc" />
      <rect width="700" height="420" fill="url(#grid-gp)" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Gas Properties for PSV Sizing
      </text>

      {/* Property cards */}
      {/* MW */}
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="200" height="110" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#3b82f6" />
        <rect x="0" y="15" width="200" height="15" fill="#3b82f6" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Molecular Weight (MW)
        </text>
        <text x="100" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="11">Units: lb/lb-mol</text>
        <text x="100" y="75" textAnchor="middle" fill={COLORS.gray} fontSize="10">Higher MW = denser gas</text>
        <text x="100" y="92" textAnchor="middle" fill={COLORS.gray} fontSize="10">= higher mass flow capacity</text>
      </g>

      {/* k-value */}
      <g transform="translate(250, 60)">
        <rect x="0" y="0" width="200" height="110" rx="8" fill="white" stroke="#22c55e" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#22c55e" />
        <rect x="0" y="15" width="200" height="15" fill="#22c55e" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          k-Value (Cp/Cv)
        </text>
        <text x="100" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="11">Ratio of specific heats</text>
        <text x="100" y="75" textAnchor="middle" fill={COLORS.gray} fontSize="10">Affects critical flow function</text>
        <text x="100" y="92" textAnchor="middle" fill={COLORS.gray} fontSize="10">Most gases: k = 1.2–1.4</text>
      </g>

      {/* Z */}
      <g transform="translate(470, 60)">
        <rect x="0" y="0" width="200" height="110" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#f59e0b" />
        <rect x="0" y="15" width="200" height="15" fill="#f59e0b" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Compressibility (Z)
        </text>
        <text x="100" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="11">Deviation from ideal gas</text>
        <text x="100" y="75" textAnchor="middle" fill={COLORS.gray} fontSize="10">Z = 1.0 for ideal gas</text>
        <text x="100" y="92" textAnchor="middle" fill={COLORS.gray} fontSize="10">Z &lt; 1 at high pressure</text>
      </g>

      {/* Temperature */}
      <g transform="translate(140, 190)">
        <rect x="0" y="0" width="200" height="110" rx="8" fill="white" stroke="#ec4899" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#ec4899" />
        <rect x="0" y="15" width="200" height="15" fill="#ec4899" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Relieving Temperature
        </text>
        <text x="100" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="11">Units: °R (Rankine)</text>
        <text x="100" y="75" textAnchor="middle" fill={COLORS.gray} fontSize="10">°R = °F + 459.67</text>
        <text x="100" y="92" textAnchor="middle" fill={COLORS.gray} fontSize="10">Use at relieving conditions</text>
      </g>

      {/* Pressure */}
      <g transform="translate(360, 190)">
        <rect x="0" y="0" width="200" height="110" rx="8" fill="white" stroke="#8b5cf6" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#8b5cf6" />
        <rect x="0" y="15" width="200" height="15" fill="#8b5cf6" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Relieving Pressure
        </text>
        <text x="100" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="11">Units: psia (absolute)</text>
        <text x="100" y="75" textAnchor="middle" fill={COLORS.gray} fontSize="10">P₁ = Set + Overpressure</text>
        <text x="100" y="92" textAnchor="middle" fill={COLORS.gray} fontSize="10">+ 14.7 to convert to psia</text>
      </g>

      {/* Common values table */}
      <g transform="translate(50, 320)">
        <rect x="0" y="0" width="600" height="90" rx="6" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="0" width="600" height="25" rx="6" fill={COLORS.navy} />
        <rect x="0" y="18" width="600" height="7" fill={COLORS.navy} />
        <text x="300" y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
          Common Gas Properties Reference
        </text>
        
        {/* Table headers */}
        <text x="80" y="45" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Gas</text>
        <text x="180" y="45" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">MW</text>
        <text x="280" y="45" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">k</text>
        <text x="380" y="45" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Z (at low P)</text>
        <text x="500" y="45" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Notes</text>
        
        <line x1="10" y1="52" x2="590" y2="52" stroke={COLORS.grayLight} />
        
        {/* Data rows */}
        <text x="80" y="68" textAnchor="middle" fill={COLORS.gray} fontSize="10">Air</text>
        <text x="180" y="68" textAnchor="middle" fill={COLORS.gray} fontSize="10">29.0</text>
        <text x="280" y="68" textAnchor="middle" fill={COLORS.gray} fontSize="10">1.40</text>
        <text x="380" y="68" textAnchor="middle" fill={COLORS.gray} fontSize="10">~1.0</text>
        <text x="500" y="68" textAnchor="middle" fill={COLORS.gray} fontSize="10">Reference gas</text>
        
        <text x="80" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">Steam</text>
        <text x="180" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">18.02</text>
        <text x="280" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">1.33</text>
        <text x="380" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">Varies</text>
        <text x="500" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">Use steam tables</text>
      </g>
    </svg>
  );
}
