"use client";

import { COLORS } from "@/lib/psv/brand";

export default function AlarmLayeringDiagram() {
  return (
    <svg viewBox="0 0 750 450" className="w-full h-auto">
      <defs>
        <pattern id="grid-ald" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="750" height="450" fill="#f8fafc" />
      <rect width="750" height="450" fill="url(#grid-ald)" />

      {/* Title */}
      <text x="375" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Alarm Layering: Level Monitoring
      </text>
      <text x="375" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Multiple independent systems for defense in depth
      </text>

      {/* Tank representation */}
      <g transform="translate(50, 80)">
        {/* Tank shell */}
        <rect x="0" y="0" width="200" height="320" fill="white" stroke={COLORS.navy} strokeWidth="3" rx="8" />
        
        {/* Level zones */}
        <rect x="5" y="280" width="190" height="35" fill="#dcfce7" rx="4" />
        <text x="100" y="302" textAnchor="middle" fill="#166534" fontSize="10">Normal (0-85%)</text>
        
        <rect x="5" y="200" width="190" height="80" fill="#fef3c7" rx="4" />
        <text x="100" y="245" textAnchor="middle" fill="#92400e" fontSize="10">Advisory (85-95%)</text>
        
        <rect x="5" y="100" width="190" height="100" fill="#fee2e2" rx="4" />
        <text x="100" y="155" textAnchor="middle" fill="#dc2626" fontSize="10">Alarm (95-98%)</text>
        
        <rect x="5" y="5" width="190" height="95" fill="#7f1d1d" rx="4" />
        <text x="100" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">CRITICAL</text>
        <text x="100" y="75" textAnchor="middle" fill="#fecaca" fontSize="9">(98%+ Overflow)</text>

        {/* Level indicators */}
        <line x1="210" y1="280" x2="230" y2="280" stroke="#22c55e" strokeWidth="2" />
        <line x1="210" y1="200" x2="230" y2="200" stroke="#f59e0b" strokeWidth="2" />
        <line x1="210" y1="100" x2="230" y2="100" stroke="#dc2626" strokeWidth="2" />
        <line x1="210" y1="5" x2="230" y2="5" stroke="#7f1d1d" strokeWidth="3" />
      </g>

      {/* Layer 1: ATG */}
      <g transform="translate(300, 90)">
        <rect x="0" y="0" width="200" height="80" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="28" rx="8" fill="#dbeafe" />
        <rect x="0" y="20" width="200" height="8" fill="#dbeafe" />
        <text x="100" y="20" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">
          Layer 1: ATG
        </text>
        <text x="100" y="45" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Automatic Tank Gauge
        </text>
        <text x="100" y="60" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Continuous level display
        </text>
        <text x="100" y="75" textAnchor="middle" fill="#3b82f6" fontSize="9">Primary measurement</text>
      </g>

      {/* Layer 2: Independent High Level */}
      <g transform="translate(300, 185)">
        <rect x="0" y="0" width="200" height="80" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="28" rx="8" fill="#fef3c7" />
        <rect x="0" y="20" width="200" height="8" fill="#fef3c7" />
        <text x="100" y="20" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">
          Layer 2: IHL Alarm
        </text>
        <text x="100" y="45" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Independent High Level
        </text>
        <text x="100" y="60" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Separate from ATG
        </text>
        <text x="100" y="75" textAnchor="middle" fill="#f59e0b" fontSize="9">Audible/visual alarm</text>
      </g>

      {/* Layer 3: HHL Shutdown */}
      <g transform="translate(300, 280)">
        <rect x="0" y="0" width="200" height="80" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="28" rx="8" fill="#fee2e2" />
        <rect x="0" y="20" width="200" height="8" fill="#fee2e2" />
        <text x="100" y="20" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">
          Layer 3: AOPS
        </text>
        <text x="100" y="45" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Auto Overfill Prevention
        </text>
        <text x="100" y="60" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Automatic pump/valve shutoff
        </text>
        <text x="100" y="75" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="500">Last line of defense</text>
      </g>

      {/* Connection lines */}
      <line x1="250" y1="130" x2="300" y2="130" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="250" y1="225" x2="300" y2="225" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="250" y1="320" x2="300" y2="320" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" />

      {/* Independence requirement */}
      <g transform="translate(530, 100)">
        <rect x="0" y="0" width="180" height="260" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="90" y="25" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="600">
          Independence
        </text>
        <text x="90" y="45" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
          Requirements
        </text>
        
        <line x1="15" y1="60" x2="165" y2="60" stroke="#10b981" strokeWidth="1" />
        
        <text x="15" y="85" fill="#047857" fontSize="9" fontWeight="500">✓ Separate sensors</text>
        <text x="15" y="105" fill="#047857" fontSize="9" fontWeight="500">✓ Separate wiring</text>
        <text x="15" y="125" fill="#047857" fontSize="9" fontWeight="500">✓ Separate power</text>
        <text x="15" y="145" fill="#047857" fontSize="9" fontWeight="500">✓ Separate logic</text>
        
        <line x1="15" y1="160" x2="165" y2="160" stroke="#10b981" strokeWidth="1" />
        
        <text x="90" y="180" textAnchor="middle" fill="#047857" fontSize="9">
          No common-mode
        </text>
        <text x="90" y="195" textAnchor="middle" fill="#047857" fontSize="9">
          failure possible
        </text>
        
        <line x1="15" y1="210" x2="165" y2="210" stroke="#10b981" strokeWidth="1" />
        
        <text x="90" y="235" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="500">
          Per API 2350
        </text>
        <text x="90" y="250" textAnchor="middle" fill="#047857" fontSize="9">
          5th Edition
        </text>
      </g>

      {/* Bottom note */}
      <g transform="translate(80, 400)">
        <rect x="0" y="0" width="600" height="35" rx="4" fill={COLORS.navy} />
        <text x="300" y="15" textAnchor="middle" fill="white" fontSize="10">
          Each layer must be capable of preventing overfill INDEPENDENTLY
        </text>
        <text x="300" y="30" textAnchor="middle" fill="#93c5fd" fontSize="9">
          Failure of one layer should not affect others (defense in depth)
        </text>
      </g>
    </svg>
  );
}
