"use client";

import { COLORS } from "@/lib/psv/brand";

export default function OrificeCapacityLadder() {
  const orifices = [
    { letter: "D", area: "0.110", color: "#fee2e2" },
    { letter: "E", area: "0.196", color: "#fef3c7" },
    { letter: "F", area: "0.307", color: "#fef9c3" },
    { letter: "G", area: "0.503", color: "#dcfce7" },
    { letter: "H", area: "0.785", color: "#d1fae5" },
    { letter: "J", area: "1.287", color: "#cffafe" },
    { letter: "K", area: "1.838", color: "#dbeafe" },
    { letter: "L", area: "2.853", color: "#e0e7ff" },
    { letter: "M", area: "3.600", color: "#ede9fe" },
    { letter: "N", area: "4.340", color: "#fae8ff" },
    { letter: "P", area: "6.380", color: "#fce7f3" },
    { letter: "Q", area: "11.05", color: "#ffe4e6" },
  ];

  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <defs>
        <pattern id="grid-ol" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#f8fafc" />
      <rect width="800" height="500" fill="url(#grid-ol)" />

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        API 526 Orifice Capacity Ladder
      </text>
      <text x="400" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Standard orifice designations and effective areas (sq. inches)
      </text>

      {/* Ladder visualization */}
      <g transform="translate(100, 80)">
        {/* Vertical lines */}
        <line x1="50" y1="0" x2="50" y2="380" stroke={COLORS.navy} strokeWidth="3" />
        <line x1="250" y1="0" x2="250" y2="380" stroke={COLORS.navy} strokeWidth="3" />

        {/* Rungs */}
        {orifices.map((o, i) => {
          const y = i * 32;
          const barWidth = parseFloat(o.area) * 15; // Scale for visualization
          return (
            <g key={o.letter}>
              {/* Rung */}
              <line x1="50" y1={y + 15} x2="250" y2={y + 15} stroke={COLORS.navy} strokeWidth="2" />
              
              {/* Letter label */}
              <circle cx="30" cy={y + 15} r="14" fill={COLORS.navy} />
              <text x="30" y={y + 20} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                {o.letter}
              </text>
              
              {/* Area bar */}
              <rect x="300" y={y + 2} width={barWidth} height="26" rx="4" fill={o.color} stroke={COLORS.navy} />
              <text x={310 + barWidth} y={y + 20} fill={COLORS.navy} fontSize="11">
                {o.area} in²
              </text>
            </g>
          );
        })}

        {/* Scale indicator */}
        <text x="450" y="20" fill={COLORS.gray} fontSize="10">← Smaller capacity</text>
        <text x="450" y="380" fill={COLORS.gray} fontSize="10">← Larger capacity</text>
      </g>

      {/* Side notes */}
      <g transform="translate(550, 100)">
        <rect x="0" y="0" width="200" height="130" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="100" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Key Principles
        </text>
        <text x="15" y="45" fill={COLORS.gray} fontSize="10">• Letter progresses D → Q</text>
        <text x="15" y="62" fill={COLORS.gray} fontSize="10">• No I or O (avoid confusion)</text>
        <text x="15" y="79" fill={COLORS.gray} fontSize="10">• Area ≈ doubles every 2-3 steps</text>
        <text x="15" y="96" fill={COLORS.gray} fontSize="10">• Select NEXT size up from</text>
        <text x="15" y="110" fill={COLORS.gray} fontSize="10">  calculated minimum</text>
      </g>

      <g transform="translate(550, 250)">
        <rect x="0" y="0" width="200" height="100" rx="6" fill="#ecfdf5" stroke="#10b981" />
        <text x="100" y="22" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="600">
          Selection Rule
        </text>
        <text x="15" y="48" fill="#047857" fontSize="10">If calculation shows</text>
        <text x="15" y="65" fill="#047857" fontSize="10">A_required = 0.25 in²</text>
        <text x="15" y="85" fill="#047857" fontSize="10" fontWeight="600">→ Select F (0.307 in²)</text>
      </g>

      <g transform="translate(550, 370)">
        <rect x="0" y="0" width="200" height="80" rx="6" fill="#fef3c7" stroke={COLORS.warning} />
        <text x="100" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">
          ⚠️ Remember
        </text>
        <text x="15" y="48" fill="#78350f" fontSize="10">Bigger orifice = more flow</text>
        <text x="15" y="65" fill="#78350f" fontSize="10">but also higher cost &amp;</text>
        <text x="15" y="80" fill="#78350f" fontSize="10">larger piping needed</text>
      </g>
    </svg>
  );
}
