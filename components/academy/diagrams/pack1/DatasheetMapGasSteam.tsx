"use client";

import { COLORS } from "@/lib/psv/brand";

export default function DatasheetMapGasSteam() {
  return (
    <svg viewBox="0 0 850 550" className="w-full h-auto">
      <defs>
        <pattern id="grid-dsg" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="550" fill="#f8fafc" />
      <rect width="850" height="550" fill="url(#grid-dsg)" />

      {/* Title */}
      <text x="425" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PSV Datasheet Map: Gas / Steam Service
      </text>
      <text x="425" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Key fields and their purpose
      </text>

      {/* Datasheet representation */}
      <g transform="translate(50, 70)">
        {/* Header section */}
        <rect x="0" y="0" width="750" height="40" rx="6" fill={COLORS.navy} />
        <text x="375" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">
          PRESSURE SAFETY VALVE DATASHEET - GAS/VAPOR SERVICE
        </text>

        {/* Section 1: General */}
        <rect x="0" y="50" width="370" height="120" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="50" width="370" height="25" fill="#dbeafe" />
        <text x="185" y="68" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">
          GENERAL DATA
        </text>
        <text x="15" y="92" fill={COLORS.navy} fontSize="10" fontWeight="500">Tag Number:</text>
        <rect x="100" y="80" width="120" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="15" y="115" fill={COLORS.navy} fontSize="10" fontWeight="500">Equipment Protected:</text>
        <rect x="130" y="103" width="220" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="15" y="138" fill={COLORS.navy} fontSize="10" fontWeight="500">Relieving Case:</text>
        <rect x="100" y="126" width="250" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="15" y="161" fill={COLORS.navy} fontSize="10" fontWeight="500">Service:</text>
        <rect x="70" y="149" width="100" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />

        {/* Callout for General */}
        <path d="M 380 100 L 400 100" stroke="#3b82f6" strokeWidth="2" />
        <rect x="405" y="80" width="160" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" />
        <text x="485" y="100" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="500">Identifies the valve and</text>
        <text x="485" y="115" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="500">what scenario it&apos;s sized for</text>

        {/* Section 2: Operating Conditions */}
        <rect x="0" y="180" width="370" height="100" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="180" width="370" height="25" fill="#dcfce7" />
        <text x="185" y="198" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">
          RELIEVING CONDITIONS
        </text>
        <text x="15" y="222" fill={COLORS.navy} fontSize="10" fontWeight="500">Set Pressure (psig):</text>
        <rect x="120" y="210" width="60" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="200" y="222" fill={COLORS.navy} fontSize="10" fontWeight="500">MAWP:</text>
        <rect x="240" y="210" width="60" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="15" y="245" fill={COLORS.navy} fontSize="10" fontWeight="500">Relieving Pressure (psia):</text>
        <rect x="140" y="233" width="70" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="230" y="245" fill={COLORS.navy} fontSize="10" fontWeight="500">Temp (°F):</text>
        <rect x="290" y="233" width="60" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="15" y="268" fill={COLORS.navy} fontSize="10" fontWeight="500">Backpressure (psig):</text>
        <rect x="125" y="256" width="60" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />

        {/* Callout for Conditions */}
        <path d="M 380 230 L 400 230" stroke="#22c55e" strokeWidth="2" />
        <rect x="405" y="200" width="160" height="70" rx="4" fill="#dcfce7" stroke="#22c55e" />
        <text x="485" y="220" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="500">Yellow = KEY inputs</text>
        <text x="485" y="235" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="500">for sizing calculation</text>
        <text x="485" y="255" textAnchor="middle" fill="#166534" fontSize="9">P₁ = Set × 1.10 + 14.7</text>

        {/* Section 3: Fluid Properties */}
        <rect x="0" y="290" width="370" height="100" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="290" width="370" height="25" fill="#fef3c7" />
        <text x="185" y="308" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">
          FLUID PROPERTIES
        </text>
        <text x="15" y="332" fill={COLORS.navy} fontSize="10" fontWeight="500">Fluid:</text>
        <rect x="50" y="320" width="120" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="190" y="332" fill={COLORS.navy} fontSize="10" fontWeight="500">MW:</text>
        <rect x="215" y="320" width="50" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="280" y="332" fill={COLORS.navy} fontSize="10" fontWeight="500">k (Cp/Cv):</text>
        <rect x="330" y="320" width="30" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="15" y="358" fill={COLORS.navy} fontSize="10" fontWeight="500">Z Factor:</text>
        <rect x="65" y="346" width="40" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="120" y="358" fill={COLORS.navy} fontSize="10" fontWeight="500">Required Flow (lb/hr):</text>
        <rect x="235" y="346" width="80" height="18" fill="#fef3c7" stroke="#f59e0b" />

        {/* Callout for Properties */}
        <path d="M 380 340 L 400 340" stroke="#f59e0b" strokeWidth="2" />
        <rect x="405" y="310" width="160" height="70" rx="4" fill="#fef3c7" stroke="#f59e0b" />
        <text x="485" y="330" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">Gas properties from</text>
        <text x="485" y="345" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">process simulation or</text>
        <text x="485" y="360" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="500">fluid reference tables</text>

        {/* Section 4: Sizing Results */}
        <rect x="0" y="400" width="370" height="80" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="400" width="370" height="25" fill="#e0e7ff" />
        <text x="185" y="418" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="600">
          SIZING RESULTS
        </text>
        <text x="15" y="445" fill={COLORS.navy} fontSize="10" fontWeight="500">Required Area (in²):</text>
        <rect x="120" y="433" width="60" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="200" y="445" fill={COLORS.navy} fontSize="10" fontWeight="500">Selected Orifice:</text>
        <rect x="290" y="433" width="50" height="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="15" y="470" fill={COLORS.navy} fontSize="10" fontWeight="500">Effective Area (in²):</text>
        <rect x="115" y="458" width="60" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="200" y="470" fill={COLORS.navy} fontSize="10" fontWeight="500">% Utilized:</text>
        <rect x="265" y="458" width="50" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />

        {/* Callout for Results */}
        <path d="M 380 440 L 400 440" stroke="#6366f1" strokeWidth="2" />
        <rect x="405" y="420" width="160" height="50" rx="4" fill="#e0e7ff" stroke="#6366f1" />
        <text x="485" y="440" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="500">Blue border = OUTPUT</text>
        <text x="485" y="455" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="500">Selected from API 526</text>

      </g>

      {/* Legend */}
      <g transform="translate(620, 85)">
        <rect x="0" y="0" width="180" height="100" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="90" y="20" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Legend
        </text>
        <rect x="15" y="35" width="20" height="12" fill="#fef3c7" stroke="#f59e0b" />
        <text x="45" y="45" fill={COLORS.gray} fontSize="9">Key sizing input</text>
        <rect x="15" y="55" width="20" height="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="45" y="65" fill={COLORS.gray} fontSize="9">Sizing result / selection</text>
        <rect x="15" y="75" width="20" height="12" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="45" y="85" fill={COLORS.gray} fontSize="9">Supporting data</text>
      </g>
    </svg>
  );
}
