"use client";

import { COLORS } from "@/lib/psv/brand";

interface PressureBasicsDiagramProps {
  className?: string;
}

/**
 * Technical diagram showing pressure relationships:
 * - psig vs psia
 * - Operating pressure, set pressure, MAWP, accumulation
 */
export function PressureBasicsDiagram({ className = "" }: PressureBasicsDiagramProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <svg
        viewBox="0 0 600 400"
        className="w-full h-auto"
        style={{ maxHeight: "400px" }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={COLORS.grayLighter}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#grid)" />

        {/* Y-axis (Pressure scale) */}
        <line
          x1="80"
          y1="50"
          x2="80"
          y2="350"
          stroke={COLORS.navy}
          strokeWidth="2"
        />
        <text
          x="40"
          y="200"
          fill={COLORS.navy}
          fontSize="14"
          fontWeight="600"
          transform="rotate(-90, 40, 200)"
          textAnchor="middle"
        >
          Pressure
        </text>

        {/* Pressure levels - horizontal bars */}
        {/* Atmospheric (0 psig = 14.7 psia) */}
        <rect x="80" y="320" width="450" height="30" fill={COLORS.grayLighter} />
        <line x1="80" y1="320" x2="530" y2="320" stroke={COLORS.gray} strokeWidth="1" strokeDasharray="4" />
        <text x="540" y="340" fill={COLORS.gray} fontSize="12">
          0 psig (14.7 psia)
        </text>
        <text x="90" y="340" fill={COLORS.gray} fontSize="11">
          Atmospheric Pressure
        </text>

        {/* Operating Pressure */}
        <rect x="80" y="220" width="450" height="40" fill="#E8F4EC" stroke="#A7C4BC" strokeWidth="1" />
        <line x1="80" y1="220" x2="530" y2="220" stroke="#059669" strokeWidth="2" />
        <text x="540" y="245" fill="#059669" fontSize="12" fontWeight="500">
          Operating
        </text>
        <text x="90" y="245" fill="#1B4332" fontSize="11">
          Normal Operating Pressure (e.g., 80 psig)
        </text>

        {/* Set Pressure = MAWP */}
        <rect x="80" y="140" width="450" height="40" fill="#EEF2FF" stroke="#A5B4FC" strokeWidth="1" />
        <line x1="80" y1="140" x2="530" y2="140" stroke={COLORS.navy} strokeWidth="2" />
        <text x="540" y="165" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Set = MAWP
        </text>
        <text x="90" y="165" fill="#312E81" fontSize="11">
          Set Pressure / MAWP (e.g., 100 psig)
        </text>

        {/* Accumulation Zone */}
        <rect x="80" y="100" width="450" height="40" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1" />
        <line x1="80" y1="100" x2="530" y2="100" stroke={COLORS.warning} strokeWidth="2" strokeDasharray="6,3" />
        <text x="540" y="125" fill={COLORS.warning} fontSize="12" fontWeight="500">
          Accumulation
        </text>
        <text x="90" y="125" fill="#78350F" fontSize="11">
          MAWP + 10% = Max Accumulation (e.g., 110 psig)
        </text>

        {/* Danger Zone */}
        <rect x="80" y="50" width="450" height="50" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
        <text x="90" y="80" fill="#881337" fontSize="11" fontWeight="500">
          DANGER: Equipment Failure Risk
        </text>

        {/* Annotations */}
        {/* Arrow showing psig vs psia relationship */}
        <g transform="translate(250, 320)">
          <line x1="0" y1="0" x2="0" y2="50" stroke={COLORS.navy} strokeWidth="1" markerEnd="url(#arrowhead)" />
          <line x1="0" y1="50" x2="0" y2="0" stroke={COLORS.navy} strokeWidth="1" markerEnd="url(#arrowhead)" />
        </g>

        {/* psia/psig explanation box */}
        <rect x="320" y="350" width="200" height="45" fill="white" stroke={COLORS.navy} strokeWidth="1" rx="4" />
        <text x="330" y="368" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Conversion:
        </text>
        <text x="330" y="385" fill={COLORS.gray} fontSize="10">
          psia = psig + 14.7 (at sea level)
        </text>

        {/* Legend */}
        <rect x="80" y="360" width="150" height="35" fill="white" stroke={COLORS.grayLight} strokeWidth="1" rx="4" />
        <text x="90" y="378" fill={COLORS.navy} fontSize="10" fontWeight="600">
          Margin needed:
        </text>
        <text x="90" y="390" fill={COLORS.gray} fontSize="9">
          Set pressure ≥ Operating + 10%
        </text>

        {/* Arrows marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.navy} />
          </marker>
        </defs>

        {/* Vertical arrow showing pressure increase */}
        <g>
          <line
            x1="60"
            y1="320"
            x2="60"
            y2="100"
            stroke={COLORS.navy}
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text x="35" y="210" fill={COLORS.navy} fontSize="10" transform="rotate(-90, 35, 210)">
            Increasing Pressure
          </text>
        </g>
      </svg>
    </div>
  );
}
