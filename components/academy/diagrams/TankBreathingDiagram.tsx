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
        viewBox="0 0 700 340"
        className="w-full h-auto"
        style={{ maxHeight: "340px" }}
      >
        {/* Background */}
        <rect width="700" height="340" fill="#F8FAFC" />

        {/* Title */}
        <text x="350" y="25" fill={COLORS.navy} fontSize="16" fontWeight="600" textAnchor="middle">
          Tank Breathing: In-breathing vs Out-breathing
        </text>

        {/* Left Tank - In-breathing (Vacuum) */}
        <g transform="translate(50, 50)">
          {/* Label */}
          <text x="125" y="0" fill={COLORS.navy} fontSize="14" fontWeight="600" textAnchor="middle">
            IN-BREATHING
          </text>
          <text x="125" y="15" fill={COLORS.gray} fontSize="10" textAnchor="middle">
            (Vacuum Relief)
          </text>

          {/* Tank shell */}
          <rect x="50" y="40" width="150" height="180" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
          
          {/* Tank roof */}
          <path d="M 45 40 L 125 20 L 205 40" fill="white" stroke={COLORS.navy} strokeWidth="2" />
          
          {/* PVRV on roof */}
          <rect x="110" y="5" width="30" height="20" fill="#E8F4EC" stroke={COLORS.success} strokeWidth="2" rx="2" />
          
          {/* Air coming IN */}
          <path d="M 125 -15 L 125 5" stroke={COLORS.success} strokeWidth="2" markerEnd="url(#arrow-in)" />
          <path d="M 105 -10 L 125 5" stroke={COLORS.success} strokeWidth="1.5" />
          <path d="M 145 -10 L 125 5" stroke={COLORS.success} strokeWidth="1.5" />
          <text x="125" y="-20" fill={COLORS.success} fontSize="10" textAnchor="middle" fontWeight="500">AIR IN</text>

          {/* Liquid level (lowering) */}
          <rect x="52" y="150" width="146" height="68" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
          <text x="125" y="188" fill="#1E40AF" fontSize="10" textAnchor="middle">Liquid Level</text>
          
          {/* Vapor space (expanding) */}
          <text x="125" y="100" fill={COLORS.gray} fontSize="10" textAnchor="middle">Vapor Space</text>
          <text x="125" y="115" fill={COLORS.gray} fontSize="9" textAnchor="middle">(Expanding)</text>

          {/* Outlet pipe showing liquid leaving */}
          <rect x="200" y="180" width="50" height="15" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          <path d="M 200 187 L 250 187" stroke="#1E40AF" strokeWidth="2" markerEnd="url(#arrow-liquid)" />
          <text x="225" y="205" fill={COLORS.gray} fontSize="9" textAnchor="middle">Pump Out</text>

          {/* Causes */}
          <text x="125" y="240" fill={COLORS.navy} fontSize="10" fontWeight="500" textAnchor="middle">
            Causes:
          </text>
          <text x="125" y="255" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Liquid withdrawal
          </text>
          <text x="125" y="268" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Temperature decrease
          </text>
          <text x="125" y="281" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Vapor condensation
          </text>
        </g>

        {/* Right Tank - Out-breathing (Pressure) */}
        <g transform="translate(400, 50)">
          {/* Label */}
          <text x="125" y="0" fill={COLORS.navy} fontSize="14" fontWeight="600" textAnchor="middle">
            OUT-BREATHING
          </text>
          <text x="125" y="15" fill={COLORS.warning} fontSize="10" textAnchor="middle">
            (Pressure Relief)
          </text>

          {/* Tank shell */}
          <rect x="50" y="40" width="150" height="180" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
          
          {/* Tank roof */}
          <path d="M 45 40 L 125 20 L 205 40" fill="white" stroke={COLORS.navy} strokeWidth="2" />
          
          {/* PVRV on roof */}
          <rect x="110" y="5" width="30" height="20" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="2" rx="2" />
          
          {/* Vapor going OUT */}
          <path d="M 125 5 L 125 -15" stroke={COLORS.warning} strokeWidth="2" markerEnd="url(#arrow-out)" />
          <path d="M 125 5 L 105 -10" stroke={COLORS.warning} strokeWidth="1.5" />
          <path d="M 125 5 L 145 -10" stroke={COLORS.warning} strokeWidth="1.5" />
          <text x="125" y="-20" fill={COLORS.warning} fontSize="10" textAnchor="middle" fontWeight="500">VAPOR OUT</text>

          {/* Liquid level (rising) */}
          <rect x="52" y="100" width="146" height="118" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
          <text x="125" y="165" fill="#1E40AF" fontSize="10" textAnchor="middle">Liquid Level</text>
          
          {/* Vapor space (compressed) */}
          <text x="125" y="70" fill={COLORS.gray} fontSize="10" textAnchor="middle">Vapor Space</text>
          <text x="125" y="85" fill={COLORS.gray} fontSize="9" textAnchor="middle">(Compressed)</text>

          {/* Inlet pipe showing liquid entering */}
          <rect x="0" y="140" width="50" height="15" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          <path d="M 0 147 L 50 147" stroke="#1E40AF" strokeWidth="2" markerEnd="url(#arrow-liquid)" />
          <text x="25" y="165" fill={COLORS.gray} fontSize="9" textAnchor="middle">Fill</text>

          {/* Sun symbol for heating */}
          <circle cx="230" cy="80" r="20" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="2" />
          <text x="230" y="85" fill={COLORS.warning} fontSize="16" textAnchor="middle">☀</text>
          <text x="230" y="110" fill={COLORS.warning} fontSize="8" textAnchor="middle">Heat</text>

          {/* Causes */}
          <text x="125" y="240" fill={COLORS.navy} fontSize="10" fontWeight="500" textAnchor="middle">
            Causes:
          </text>
          <text x="125" y="255" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Liquid filling
          </text>
          <text x="125" y="268" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Temperature increase
          </text>
          <text x="125" y="281" fill={COLORS.gray} fontSize="9" textAnchor="middle">
            • Flash vapors
          </text>
        </g>

        {/* Center divider */}
        <line x1="350" y1="60" x2="350" y2="290" stroke={COLORS.grayLight} strokeWidth="1" strokeDasharray="5,5" />

        {/* Bottom note */}
        <rect x="150" y="305" width="400" height="30" fill="white" stroke={COLORS.navy} strokeWidth="1" rx="4" />
        <text x="350" y="325" fill={COLORS.navy} fontSize="11" textAnchor="middle">
          API 2000: Size PVRVs for both in-breathing AND out-breathing requirements
        </text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-in" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.success} />
          </marker>
          <marker id="arrow-out" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.warning} />
          </marker>
          <marker id="arrow-liquid" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#1E40AF" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
