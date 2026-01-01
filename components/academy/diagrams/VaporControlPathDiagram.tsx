"use client";

import { COLORS } from "@/lib/psv/brand";

interface VaporControlPathDiagramProps {
  className?: string;
}

/**
 * Technical diagram showing vapor disposal paths:
 * - Atmospheric discharge
 * - VRU (Vapor Recovery Unit)
 * - Flare system
 */
export function VaporControlPathDiagram({ className = "" }: VaporControlPathDiagramProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <svg
        viewBox="0 0 700 380"
        className="w-full h-auto"
        style={{ maxHeight: "380px" }}
      >
        {/* Background */}
        <rect width="700" height="380" fill="#F8FAFC" />

        {/* Title */}
        <text x="350" y="25" fill={COLORS.navy} fontSize="16" fontWeight="600" textAnchor="middle">
          Vapor Control Pathways
        </text>

        {/* Source Tank */}
        <g transform="translate(50, 100)">
          <rect x="0" y="60" width="80" height="120" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
          <path d="M -5 60 L 40 40 L 85 60" fill="white" stroke={COLORS.navy} strokeWidth="2" />
          <rect x="2" y="120" width="76" height="58" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
          <text x="40" y="100" fill={COLORS.navy} fontSize="10" textAnchor="middle">TANK</text>
          
          {/* Vapor outlet pipe */}
          <rect x="80" y="70" width="60" height="20" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          <path d="M 90 80 L 130 80" stroke={COLORS.warning} strokeWidth="2" markerEnd="url(#arrow-vapor)" />
          <text x="110" y="65" fill={COLORS.warning} fontSize="9" textAnchor="middle">Vapor</text>
        </g>

        {/* Junction/Decision Point */}
        <g transform="translate(180, 160)">
          <circle cx="20" cy="20" r="20" fill="white" stroke={COLORS.navy} strokeWidth="2" />
          <text x="20" y="25" fill={COLORS.navy} fontSize="12" fontWeight="600" textAnchor="middle">?</text>
        </g>

        {/* Path 1: Atmospheric (top) */}
        <g transform="translate(260, 60)">
          {/* Path line */}
          <path d="M -60 120 L -40 120 L -20 60 L 80 60" fill="none" stroke={COLORS.grayLight} strokeWidth="2" />
          
          {/* Vent stack */}
          <rect x="80" y="40" width="15" height="50" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="2" />
          <path d="M 77 40 L 87 25 L 98 40" fill="none" stroke={COLORS.gray} strokeWidth="2" />
          
          {/* Dispersion */}
          <text x="87" y="15" fill={COLORS.gray} fontSize="8" textAnchor="middle">↑↑↑</text>
          
          {/* Label */}
          <rect x="110" y="35" width="100" height="50" fill="#E8F4EC" stroke={COLORS.success} strokeWidth="1" rx="4" />
          <text x="160" y="55" fill={COLORS.success} fontSize="11" fontWeight="500" textAnchor="middle">ATMOSPHERIC</text>
          <text x="160" y="70" fill={COLORS.gray} fontSize="9" textAnchor="middle">Simple, low cost</text>
          <text x="160" y="82" fill={COLORS.error} fontSize="8" textAnchor="middle">Limited to safe fluids</text>
        </g>

        {/* Path 2: VRU (middle) */}
        <g transform="translate(260, 140)">
          {/* Path line */}
          <path d="M -60 40 L 60 40" fill="none" stroke={COLORS.accent} strokeWidth="2" />
          
          {/* VRU box */}
          <rect x="60" y="15" width="80" height="50" fill="#EEF2FF" stroke={COLORS.accent} strokeWidth="2" rx="4" />
          <text x="100" y="38" fill={COLORS.accent} fontSize="11" fontWeight="600" textAnchor="middle">VRU</text>
          <text x="100" y="52" fill={COLORS.accent} fontSize="8" textAnchor="middle">Recovery</text>
          
          {/* Return line */}
          <path d="M 100 65 L 100 100 L 20 100 L 20 140" fill="none" stroke={COLORS.success} strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="60" y="115" fill={COLORS.success} fontSize="8" textAnchor="middle">Return to Process</text>
          
          {/* Label */}
          <rect x="160" y="15" width="100" height="50" fill="#EEF2FF" stroke={COLORS.accent} strokeWidth="1" rx="4" />
          <text x="210" y="35" fill={COLORS.accent} fontSize="11" fontWeight="500" textAnchor="middle">VRU SYSTEM</text>
          <text x="210" y="50" fill={COLORS.gray} fontSize="9" textAnchor="middle">Recovers product</text>
          <text x="210" y="62" fill={COLORS.gray} fontSize="8" textAnchor="middle">Requires backup PVRV</text>
        </g>

        {/* Path 3: Flare (bottom) */}
        <g transform="translate(260, 240)">
          {/* Path line */}
          <path d="M -60 -60 L -40 -60 L -20 0 L 60 0" fill="none" stroke={COLORS.warning} strokeWidth="2" />
          
          {/* Flare stack */}
          <rect x="60" y="-25" width="12" height="60" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="2" />
          
          {/* Flame */}
          <path d="M 66 -25 Q 60 -45 66 -55 Q 72 -45 66 -25" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="2" />
          <text x="66" y="-60" fill={COLORS.warning} fontSize="12" textAnchor="middle">🔥</text>
          
          {/* KO Drum */}
          <rect x="85" y="-10" width="40" height="30" fill="white" stroke={COLORS.navy} strokeWidth="1" rx="2" />
          <text x="105" y="8" fill={COLORS.navy} fontSize="8" textAnchor="middle">KO</text>
          
          {/* Label */}
          <rect x="140" y="-25" width="100" height="60" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="1" rx="4" />
          <text x="190" y="-5" fill={COLORS.warning} fontSize="11" fontWeight="500" textAnchor="middle">FLARE</text>
          <text x="190" y="10" fill={COLORS.gray} fontSize="9" textAnchor="middle">Safe destruction</text>
          <text x="190" y="22" fill={COLORS.gray} fontSize="8" textAnchor="middle">Variable backpressure</text>
        </g>

        {/* PVRV Backup indication */}
        <g transform="translate(450, 280)">
          <rect x="0" y="0" width="200" height="70" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          <text x="100" y="20" fill={COLORS.navy} fontSize="11" fontWeight="600" textAnchor="middle">
            CRITICAL: Always Required
          </text>
          <text x="100" y="38" fill={COLORS.gray} fontSize="10" textAnchor="middle">
            PVRVs provide backup when:
          </text>
          <text x="100" y="52" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • VRU trips or overloaded
          </text>
          <text x="100" y="64" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Emergency venting needed
          </text>
        </g>

        {/* Decision criteria */}
        <g transform="translate(450, 80)">
          <rect x="0" y="0" width="200" height="100" fill="#F8FAFC" stroke={COLORS.grayLight} strokeWidth="1" rx="4" />
          <text x="100" y="20" fill={COLORS.navy} fontSize="11" fontWeight="600" textAnchor="middle">
            Selection Criteria
          </text>
          <text x="10" y="40" fill={COLORS.gray} fontSize="9">
            ATM: Non-hazardous only
          </text>
          <text x="10" y="55" fill={COLORS.gray} fontSize="9">
            VRU: VOC recovery required
          </text>
          <text x="10" y="70" fill={COLORS.gray} fontSize="9">
            Flare: Hazardous vapors
          </text>
          <text x="10" y="85" fill={COLORS.gray} fontSize="9">
            Consider: Regulations, economics
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-vapor" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.warning} />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
