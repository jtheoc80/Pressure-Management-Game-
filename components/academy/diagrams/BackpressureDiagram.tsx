"use client";

import { COLORS } from "@/lib/psv/brand";

interface BackpressureDiagramProps {
  className?: string;
}

/**
 * Technical diagram showing backpressure concepts:
 * - Superimposed vs Built-up backpressure
 * - Effect on PSV performance
 */
export function BackpressureDiagram({ className = "" }: BackpressureDiagramProps) {
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
          Backpressure Components
        </text>

        {/* Left side - Superimposed Backpressure */}
        <g transform="translate(50, 50)">
          {/* PSV symbol */}
          <rect x="60" y="80" width="80" height="60" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          <text x="100" y="115" fill={COLORS.navy} fontSize="12" fontWeight="600" textAnchor="middle">PSV</text>
          
          {/* Inlet pipe */}
          <rect x="0" y="95" width="60" height="30" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          <text x="30" y="85" fill={COLORS.navy} fontSize="10" textAnchor="middle">Inlet</text>
          
          {/* Outlet pipe to header */}
          <rect x="140" y="95" width="100" height="30" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          
          {/* Flare header (pressurized) */}
          <rect x="240" y="60" width="40" height="100" fill="#EEF2FF" stroke={COLORS.navy2} strokeWidth="2" rx="4" />
          <text x="260" y="115" fill={COLORS.navy2} fontSize="10" textAnchor="middle" transform="rotate(-90, 260, 115)">FLARE</text>
          
          {/* Pressure indicator on header */}
          <circle cx="260" y="150" r="15" fill="white" stroke={COLORS.warning} strokeWidth="2" />
          <text x="260" y="154" fill={COLORS.warning} fontSize="9" fontWeight="600" textAnchor="middle">25</text>
          
          {/* Label */}
          <text x="140" y="200" fill={COLORS.navy} fontSize="12" fontWeight="600" textAnchor="middle">
            SUPERIMPOSED BP
          </text>
          <text x="140" y="215" fill={COLORS.gray} fontSize="10" textAnchor="middle">
            Exists BEFORE valve opens
          </text>
          <text x="140" y="230" fill={COLORS.gray} fontSize="10" textAnchor="middle">
            From downstream system pressure
          </text>
          
          {/* Annotation arrow */}
          <path d="M 260 170 L 260 180 L 190 180" fill="none" stroke={COLORS.warning} strokeWidth="1.5" markerEnd="url(#arrow-warning)" />
          <text x="260" y="195" fill={COLORS.warning} fontSize="9" textAnchor="middle">25 psig</text>
        </g>

        {/* Right side - Built-up Backpressure */}
        <g transform="translate(380, 50)">
          {/* PSV symbol with flow */}
          <rect x="60" y="80" width="80" height="60" fill="#E8F4EC" stroke={COLORS.success} strokeWidth="2" rx="4" />
          <text x="100" y="108" fill={COLORS.success} fontSize="12" fontWeight="600" textAnchor="middle">PSV</text>
          <text x="100" y="122" fill={COLORS.success} fontSize="9" textAnchor="middle">(OPEN)</text>
          
          {/* Inlet pipe */}
          <rect x="0" y="95" width="60" height="30" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="1" />
          
          {/* Flow arrows in inlet */}
          <path d="M 10 110 L 50 110" fill="none" stroke={COLORS.navy} strokeWidth="2" markerEnd="url(#arrow-navy)" />
          
          {/* Outlet pipe showing flow */}
          <rect x="140" y="95" width="100" height="30" fill="#FEF3C7" stroke={COLORS.warning} strokeWidth="1" />
          
          {/* Flow arrows in outlet */}
          <path d="M 150 110 L 190 110" fill="none" stroke={COLORS.warning} strokeWidth="2" markerEnd="url(#arrow-warning)" />
          <path d="M 195 110 L 230 110" fill="none" stroke={COLORS.warning} strokeWidth="2" markerEnd="url(#arrow-warning)" />
          
          {/* Pressure drop indication */}
          <text x="190" y="90" fill={COLORS.warning} fontSize="9" textAnchor="middle">ΔP from flow</text>
          
          {/* Atmosphere/Header */}
          <rect x="240" y="60" width="40" height="100" fill={COLORS.grayLighter} stroke={COLORS.gray} strokeWidth="2" rx="4" />
          <text x="260" y="115" fill={COLORS.gray} fontSize="10" textAnchor="middle" transform="rotate(-90, 260, 115)">ATM</text>
          
          {/* Label */}
          <text x="140" y="200" fill={COLORS.navy} fontSize="12" fontWeight="600" textAnchor="middle">
            BUILT-UP BP
          </text>
          <text x="140" y="215" fill={COLORS.gray} fontSize="10" textAnchor="middle">
            Develops AFTER valve opens
          </text>
          <text x="140" y="230" fill={COLORS.gray} fontSize="10" textAnchor="middle">
            From flow through discharge piping
          </text>
        </g>

        {/* Bottom equation box */}
        <rect x="150" y="310" width="400" height="60" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="6" />
        <text x="350" y="335" fill={COLORS.navy} fontSize="14" fontWeight="600" textAnchor="middle">
          Total Backpressure = Superimposed + Built-up
        </text>
        <text x="350" y="355" fill={COLORS.gray} fontSize="11" textAnchor="middle">
          For conventional valves: Total BP should not exceed 10% of set pressure
        </text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-navy" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.navy} />
          </marker>
          <marker id="arrow-warning" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={COLORS.warning} />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
