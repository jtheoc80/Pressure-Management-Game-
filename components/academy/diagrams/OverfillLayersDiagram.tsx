"use client";

import { COLORS } from "@/lib/psv/brand";

interface OverfillLayersDiagramProps {
  className?: string;
}

/**
 * Technical diagram showing overfill protection layers:
 * - Level gauge (manual)
 * - High level alarm
 * - High-high level shutdown
 * - Defense in depth concept
 */
export function OverfillLayersDiagram({ className = "" }: OverfillLayersDiagramProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <svg
        viewBox="0 0 700 400"
        className="w-full h-auto"
        style={{ maxHeight: "400px" }}
      >
        {/* Background */}
        <rect width="700" height="400" fill="#F8FAFC" />

        {/* Title */}
        <text x="350" y="25" fill={COLORS.navy} fontSize="16" fontWeight="600" textAnchor="middle">
          Overfill Protection: Defense in Depth
        </text>

        {/* Tank with level indicators */}
        <g transform="translate(50, 50)">
          {/* Tank shell */}
          <rect x="20" y="40" width="120" height="280" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
          
          {/* Tank roof */}
          <path d="M 15 40 L 80 20 L 145 40" fill="white" stroke={COLORS.navy} strokeWidth="2" />

          {/* Liquid levels */}
          {/* Current level (85%) */}
          <rect x="22" y="82" width="116" height="236" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
          
          {/* Level markers on tank */}
          {/* 100% - Top */}
          <line x1="140" y1="42" x2="160" y2="42" stroke={COLORS.error} strokeWidth="2" />
          <text x="165" y="47" fill={COLORS.error} fontSize="10" fontWeight="600">100%</text>
          
          {/* HH Level (95%) */}
          <line x1="140" y1="62" x2="160" y2="62" stroke={COLORS.error} strokeWidth="2" strokeDasharray="3" />
          <text x="165" y="67" fill={COLORS.error} fontSize="9">95% HH</text>
          
          {/* H Level (90%) */}
          <line x1="140" y1="82" x2="160" y2="82" stroke={COLORS.warning} strokeWidth="2" strokeDasharray="3" />
          <text x="165" y="87" fill={COLORS.warning} fontSize="9">90% H</text>
          
          {/* Current (85%) */}
          <line x1="140" y1="102" x2="160" y2="102" stroke={COLORS.success} strokeWidth="2" />
          <text x="165" y="107" fill={COLORS.success} fontSize="9">85% ←</text>

          {/* Inlet pipe */}
          <rect x="0" y="150" width="22" height="20" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          <text x="11" y="165" fill={COLORS.navy} fontSize="8" textAnchor="middle">IN</text>
          
          {/* Level gauge */}
          <rect x="-30" y="60" width="20" height="240" fill="white" stroke={COLORS.gray} strokeWidth="1" />
          <rect x="-28" y="100" width="16" height="198" fill="#DBEAFE" />
          <text x="-20" y="50" fill={COLORS.gray} fontSize="8" textAnchor="middle">GAUGE</text>
        </g>

        {/* Protection Layers - Stacked boxes */}
        <g transform="translate(250, 60)">
          {/* Layer 1: Manual Gauging */}
          <rect x="0" y="0" width="400" height="65" fill="white" stroke={COLORS.grayLight} strokeWidth="1" rx="4" />
          <rect x="0" y="0" width="8" height="65" fill={COLORS.gray} rx="4 0 0 4" />
          <text x="25" y="22" fill={COLORS.navy} fontSize="12" fontWeight="600">Layer 1: Manual Gauging</text>
          <text x="25" y="38" fill={COLORS.gray} fontSize="10">• Visual level indication (gauge glass, tape)</text>
          <text x="25" y="52" fill={COLORS.gray} fontSize="10">• Operator rounds and inspection</text>
          <circle cx="370" cy="32" r="18" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          <text x="370" y="37" fill={COLORS.gray} fontSize="11" textAnchor="middle">👁</text>

          {/* Layer 2: High Level Alarm */}
          <rect x="0" y="75" width="400" height="65" fill="white" stroke={COLORS.warning} strokeWidth="1" rx="4" />
          <rect x="0" y="75" width="8" height="65" fill={COLORS.warning} rx="4 0 0 4" />
          <text x="25" y="97" fill={COLORS.navy} fontSize="12" fontWeight="600">Layer 2: High Level Alarm (H)</text>
          <text x="25" y="113" fill={COLORS.gray} fontSize="10">• Process alarm at ~90% level</text>
          <text x="25" y="127" fill={COLORS.gray} fontSize="10">• Alerts operator to take action</text>
          <circle cx="370" cy="107" r="18" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="1" />
          <text x="370" y="112" fill={COLORS.warning} fontSize="11" textAnchor="middle">⚠</text>

          {/* Layer 3: High-High Alarm */}
          <rect x="0" y="150" width="400" height="65" fill="white" stroke={COLORS.error} strokeWidth="1" rx="4" />
          <rect x="0" y="150" width="8" height="65" fill={COLORS.error} rx="4 0 0 4" />
          <text x="25" y="172" fill={COLORS.navy} fontSize="12" fontWeight="600">Layer 3: High-High Level (HH)</text>
          <text x="25" y="188" fill={COLORS.gray} fontSize="10">• Independent safety switch at ~95%</text>
          <text x="25" y="202" fill={COLORS.error} fontSize="10" fontWeight="500">• MUST be independent from Layer 2</text>
          <circle cx="370" cy="182" r="18" fill="#FFE4E6" stroke={COLORS.error} strokeWidth="1" />
          <text x="370" y="187" fill={COLORS.error} fontSize="11" textAnchor="middle">🚨</text>

          {/* Layer 4: Automatic Shutdown */}
          <rect x="0" y="225" width="400" height="70" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          <rect x="0" y="225" width="8" height="70" fill={COLORS.navy} rx="4 0 0 4" />
          <text x="25" y="247" fill={COLORS.navy} fontSize="12" fontWeight="600">Layer 4: Automatic Shutdown (SIS)</text>
          <text x="25" y="263" fill={COLORS.gray} fontSize="10">• HH triggers automatic inlet valve closure</text>
          <text x="25" y="277" fill={COLORS.gray} fontSize="10">• Safety Instrumented System (SIS)</text>
          <text x="25" y="291" fill={COLORS.success} fontSize="10" fontWeight="500">• Last line of defense - stops flow</text>
          <circle cx="370" cy="257" r="18" fill="#E8F4EC" stroke={COLORS.navy} strokeWidth="2" />
          <text x="370" y="262" fill={COLORS.navy} fontSize="11" textAnchor="middle">⛔</text>
        </g>

        {/* Key Requirements Box */}
        <g transform="translate(250, 320)">
          <rect x="0" y="0" width="400" height="70" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="2" rx="4" />
          <text x="200" y="20" fill={COLORS.navy} fontSize="12" fontWeight="600" textAnchor="middle">
            API 2350 Requirements
          </text>
          <text x="20" y="40" fill={COLORS.gray} fontSize="10">
            • HH switch must be independent from process instrumentation
          </text>
          <text x="20" y="55" fill={COLORS.gray} fontSize="10">
            • Regular testing and inspection required (SPCC compliance)
          </text>
          <text x="20" y="70" fill={COLORS.gray} fontSize="10">
            • Category classification determines required protection level
          </text>
        </g>

        {/* Arrow showing increasing reliability */}
        <g transform="translate(220, 60)">
          <line x1="0" y1="0" x2="0" y2="235" stroke={COLORS.navy} strokeWidth="2" markerEnd="url(#arrow-down)" />
          <text x="-10" y="120" fill={COLORS.navy} fontSize="10" fontWeight="500" transform="rotate(-90, -10, 120)">
            Increasing Reliability →
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-down" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.navy} />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
