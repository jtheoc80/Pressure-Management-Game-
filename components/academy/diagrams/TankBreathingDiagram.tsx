"use client";

import { COLORS } from "@/lib/psv/brand";

interface TankBreathingDiagramProps {
  className?: string;
}

/**
 * Technical diagram showing tank breathing:
 * - In-breathing (vacuum relief)
 * - Out-breathing (pressure relief)
 * - Thermal effects
 */
export function TankBreathingDiagram({ className = "" }: TankBreathingDiagramProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <svg
        viewBox="0 0 800 420"
        className="w-full h-auto"
        style={{ maxHeight: "420px" }}
      >
        {/* Background */}
        <rect width="800" height="420" fill="#F8FAFC" />

        {/* Title */}
        <text x="400" y="30" fill={COLORS.navy} fontSize="18" fontWeight="600" textAnchor="middle">
          Tank Breathing: In-breathing vs Out-breathing
        </text>

        {/* Left Tank - In-breathing (Vacuum) */}
        <g transform="translate(60, 70)">
          {/* Label */}
          <text x="130" y="0" fill={COLORS.navy} fontSize="15" fontWeight="600" textAnchor="middle">
            IN-BREATHING
          </text>
          <text x="130" y="18" fill={COLORS.success} fontSize="11" textAnchor="middle">
            (Vacuum Relief)
          </text>

          {/* Tank shell */}
          <rect x="30" y="50" width="200" height="180" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          
          {/* Tank roof */}
          <path d="M 25 50 L 130 25 L 235 50" fill="white" stroke={COLORS.navy} strokeWidth="2" />
          
          {/* PVRV on roof */}
          <rect x="110" y="8" width="40" height="22" fill="#E8F4EC" stroke={COLORS.success} strokeWidth="2" rx="3" />
          
          {/* Air coming IN */}
          <path d="M 130 -20 L 130 8" stroke={COLORS.success} strokeWidth="3" markerEnd="url(#arrow-in)" />
          <path d="M 105 -12 L 130 8" stroke={COLORS.success} strokeWidth="2" opacity="0.7" />
          <path d="M 155 -12 L 130 8" stroke={COLORS.success} strokeWidth="2" opacity="0.7" />
          <text x="130" y="-30" fill={COLORS.success} fontSize="12" textAnchor="middle" fontWeight="600">AIR IN</text>

          {/* Vapor space (expanding) */}
          <rect x="32" y="52" width="196" height="90" fill="#f0fdf4" opacity="0.5" />
          <text x="130" y="90" fill="#166534" fontSize="12" textAnchor="middle" fontWeight="500">Vapor Space</text>
          <text x="130" y="106" fill="#166534" fontSize="10" textAnchor="middle">(Expanding)</text>

          {/* Liquid level (lowering) */}
          <rect x="32" y="142" width="196" height="86" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
          <text x="130" y="190" fill="#1E40AF" fontSize="11" textAnchor="middle" fontWeight="500">Liquid Level</text>

          {/* Outlet pipe showing liquid leaving */}
          <rect x="230" y="175" width="60" height="18" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" rx="2" />
          <path d="M 235 184 L 285 184" stroke="#1E40AF" strokeWidth="3" markerEnd="url(#arrow-liquid)" />
          <text x="260" y="208" fill={COLORS.gray} fontSize="10" textAnchor="middle">Pump Out</text>

          {/* Causes box */}
          <rect x="30" y="245" width="200" height="80" fill="white" stroke={COLORS.grayLight} strokeWidth="1" rx="4" />
          <text x="130" y="265" fill={COLORS.navy} fontSize="11" fontWeight="600" textAnchor="middle">
            Causes:
          </text>
          <text x="45" y="285" fill={COLORS.gray} fontSize="10">• Liquid withdrawal</text>
          <text x="45" y="302" fill={COLORS.gray} fontSize="10">• Temperature decrease (cooling)</text>
          <text x="45" y="319" fill={COLORS.gray} fontSize="10">• Vapor condensation</text>
        </g>

        {/* Center divider */}
        <line x1="400" y1="80" x2="400" y2="350" stroke={COLORS.grayLight} strokeWidth="2" strokeDasharray="8,4" />

        {/* Right Tank - Out-breathing (Pressure) */}
        <g transform="translate(480, 70)">
          {/* Label */}
          <text x="130" y="0" fill={COLORS.navy} fontSize="15" fontWeight="600" textAnchor="middle">
            OUT-BREATHING
          </text>
          <text x="130" y="18" fill={COLORS.warning} fontSize="11" textAnchor="middle">
            (Pressure Relief)
          </text>

          {/* Tank shell */}
          <rect x="30" y="50" width="200" height="180" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          
          {/* Tank roof */}
          <path d="M 25 50 L 130 25 L 235 50" fill="white" stroke={COLORS.navy} strokeWidth="2" />
          
          {/* PVRV on roof */}
          <rect x="110" y="8" width="40" height="22" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="2" rx="3" />
          
          {/* Vapor going OUT */}
          <path d="M 130 8 L 130 -20" stroke={COLORS.warning} strokeWidth="3" markerEnd="url(#arrow-out)" />
          <path d="M 130 8 L 105 -12" stroke={COLORS.warning} strokeWidth="2" opacity="0.7" />
          <path d="M 130 8 L 155 -12" stroke={COLORS.warning} strokeWidth="2" opacity="0.7" />
          <text x="130" y="-30" fill={COLORS.warning} fontSize="12" textAnchor="middle" fontWeight="600">VAPOR OUT</text>

          {/* Vapor space (compressed) */}
          <rect x="32" y="52" width="196" height="48" fill="#fef9c3" opacity="0.5" />
          <text x="130" y="78" fill="#854d0e" fontSize="12" textAnchor="middle" fontWeight="500">Vapor Space</text>
          <text x="130" y="94" fill="#854d0e" fontSize="10" textAnchor="middle">(Compressed)</text>

          {/* Liquid level (rising) */}
          <rect x="32" y="100" width="196" height="128" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
          <text x="130" y="170" fill="#1E40AF" fontSize="11" textAnchor="middle" fontWeight="500">Liquid Level</text>

          {/* Inlet pipe showing liquid entering */}
          <rect x="-30" y="145" width="60" height="18" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" rx="2" />
          <path d="M -25 154 L 25 154" stroke="#1E40AF" strokeWidth="3" markerEnd="url(#arrow-liquid)" />
          <text x="0" y="178" fill={COLORS.gray} fontSize="10" textAnchor="middle">Fill</text>

          {/* Sun symbol for heating */}
          <circle cx="270" cy="100" r="25" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="2" />
          <text x="270" y="108" fill={COLORS.warning} fontSize="22" textAnchor="middle">☀</text>
          <text x="270" y="140" fill={COLORS.warning} fontSize="10" textAnchor="middle" fontWeight="500">Heat</text>

          {/* Causes box */}
          <rect x="30" y="245" width="200" height="80" fill="white" stroke={COLORS.grayLight} strokeWidth="1" rx="4" />
          <text x="130" y="265" fill={COLORS.navy} fontSize="11" fontWeight="600" textAnchor="middle">
            Causes:
          </text>
          <text x="45" y="285" fill={COLORS.gray} fontSize="10">• Liquid filling</text>
          <text x="45" y="302" fill={COLORS.gray} fontSize="10">• Temperature increase (heating)</text>
          <text x="45" y="319" fill={COLORS.gray} fontSize="10">• Flash vapors from product</text>
        </g>

        {/* Bottom note */}
        <rect x="175" y="375" width="450" height="35" fill="#EFF6FF" stroke={COLORS.navy} strokeWidth="1.5" rx="6" />
        <text x="400" y="398" fill={COLORS.navy} fontSize="12" fontWeight="500" textAnchor="middle">
          API 2000: Size PVRVs for both in-breathing AND out-breathing requirements
        </text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-in" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" fill={COLORS.success} />
          </marker>
          <marker id="arrow-out" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" fill={COLORS.warning} />
          </marker>
          <marker id="arrow-liquid" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" fill="#1E40AF" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
