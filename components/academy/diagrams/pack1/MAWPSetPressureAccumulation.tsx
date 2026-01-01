"use client";

import { COLORS } from "@/lib/psv/brand";

export default function MAWPSetPressureAccumulation() {
  return (
    <svg viewBox="0 0 700 400" className="w-full h-auto">
      <defs>
        <pattern id="grid-mawp" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="700" height="400" fill="#f8fafc" />
      <rect width="700" height="400" fill="url(#grid-mawp)" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        MAWP, Set Pressure & Accumulation
      </text>

      {/* Pressure scale on left */}
      <rect x="60" y="70" width="40" height="260" fill="white" stroke={COLORS.navy} strokeWidth="2" />
      <text x="80" y="60" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">PSIG</text>
      
      {/* Scale markings */}
      <line x1="100" y1="90" x2="110" y2="90" stroke={COLORS.navy} strokeWidth="1" />
      <text x="118" y="94" fill={COLORS.gray} fontSize="10">120</text>
      
      <line x1="100" y1="130" x2="110" y2="130" stroke={COLORS.navy} strokeWidth="1" />
      <text x="118" y="134" fill={COLORS.gray} fontSize="10">110</text>
      
      <line x1="100" y1="170" x2="110" y2="170" stroke={COLORS.navy} strokeWidth="1" />
      <text x="118" y="174" fill={COLORS.gray} fontSize="10">100</text>
      
      <line x1="100" y1="250" x2="110" y2="250" stroke={COLORS.navy} strokeWidth="1" />
      <text x="118" y="254" fill={COLORS.gray} fontSize="10">80</text>
      
      {/* Colored zones */}
      {/* Accumulation zone */}
      <rect x="160" y="90" width="200" height="80" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="260" y="115" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">ACCUMULATION</text>
      <text x="260" y="132" textAnchor="middle" fill="#dc2626" fontSize="10">Zone (10% above MAWP)</text>
      <text x="260" y="150" textAnchor="middle" fill="#7f1d1d" fontSize="11">Max: 110 psig</text>

      {/* MAWP line */}
      <line x1="140" y1="170" x2="380" y2="170" stroke={COLORS.navy} strokeWidth="3" />
      <text x="420" y="175" fill={COLORS.navy} fontSize="14" fontWeight="700">MAWP = 100 psig</text>
      
      {/* Set pressure zone */}
      <rect x="160" y="170" width="200" height="80" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="260" y="200" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="600">SET PRESSURE</text>
      <text x="260" y="217" textAnchor="middle" fill="#1e40af" fontSize="10">At or below MAWP</text>
      <text x="260" y="237" textAnchor="middle" fill="#1e3a8a" fontSize="11">Set = 100 psig</text>

      {/* Normal operating zone */}
      <rect x="160" y="250" width="200" height="70" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="260" y="278" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="600">OPERATING</text>
      <text x="260" y="295" textAnchor="middle" fill="#166534" fontSize="10">Normal: 80-90 psig</text>

      {/* Annotations on right */}
      <g transform="translate(450, 90)">
        <rect x="0" y="0" width="200" height="70" rx="6" fill="white" stroke={COLORS.gray} />
        <text x="100" y="20" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">Accumulation (10%)</text>
        <text x="100" y="38" textAnchor="middle" fill={COLORS.gray} fontSize="10">= MAWP × 1.10</text>
        <text x="100" y="55" textAnchor="middle" fill={COLORS.gray} fontSize="10">= 100 × 1.10 = 110 psig</text>
      </g>

      <g transform="translate(450, 180)">
        <rect x="0" y="0" width="200" height="55" rx="6" fill="white" stroke={COLORS.gray} />
        <text x="100" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">Relieving Pressure</text>
        <text x="100" y="36" textAnchor="middle" fill={COLORS.gray} fontSize="10">= Set + Overpressure</text>
        <text x="100" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="10">Use for gas sizing</text>
      </g>

      {/* Key callout */}
      <rect x="450" y="260" width="200" height="60" rx="6" fill="#fef3c7" stroke={COLORS.warning} strokeWidth="1.5" />
      <text x="550" y="282" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">⚠️ KEY RULE</text>
      <text x="550" y="300" textAnchor="middle" fill="#78350f" fontSize="10">Set Pressure ≤ MAWP</text>
      <text x="550" y="314" textAnchor="middle" fill="#78350f" fontSize="10">(for single PSV)</text>

      {/* Bottom formula box */}
      <rect x="100" y="345" width="500" height="45" rx="8" fill={COLORS.navy} />
      <text x="350" y="365" textAnchor="middle" fill="white" fontSize="12">
        Relieving Pressure (P₁) = Set Pressure + Overpressure (typically 10% of set)
      </text>
      <text x="350" y="382" textAnchor="middle" fill="#93c5fd" fontSize="11">
        Example: 100 + 10 = 110 psig → Convert to psia for gas sizing: 124.7 psia
      </text>
    </svg>
  );
}
