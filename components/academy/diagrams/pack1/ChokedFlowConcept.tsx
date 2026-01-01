"use client";

import { COLORS } from "@/lib/psv/brand";

export default function ChokedFlowConcept() {
  return (
    <svg viewBox="0 0 750 400" className="w-full h-auto">
      <defs>
        <pattern id="grid-cf" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="750" height="400" fill="#f8fafc" />
      <rect width="750" height="400" fill="url(#grid-cf)" />

      {/* Title */}
      <text x="375" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Critical (Choked) Flow in Gas Relief
      </text>

      {/* Orifice cross-section */}
      <g transform="translate(60, 70)">
        <text x="130" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="14" fontWeight="600">
          Flow Through PSV Orifice
        </text>
        
        {/* Pipe and orifice */}
        <rect x="0" y="30" width="80" height="60" fill="#dbeafe" stroke={COLORS.navy} strokeWidth="2" />
        <rect x="180" y="30" width="80" height="60" fill="#dcfce7" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Orifice throat */}
        <polygon points="80,30 100,45 100,75 80,90 80,30" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
        <polygon points="180,30 160,45 160,75 180,90 180,30" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
        <rect x="100" y="45" width="60" height="30" fill="white" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Flow arrows */}
        <path d="M 20 60 L 90 60" stroke="#1e40af" strokeWidth="3" markerEnd="url(#arrow-cf)" />
        <path d="M 170 60 L 230 60" stroke="#166534" strokeWidth="2" markerEnd="url(#arrow-cf2)" />
        
        {/* Labels */}
        <text x="40" y="20" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="500">P₁ (High)</text>
        <text x="220" y="20" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="500">P₂ (Low)</text>
        <text x="130" y="110" textAnchor="middle" fill={COLORS.navy} fontSize="10">Throat</text>
        
        {/* Sonic velocity indicator */}
        <circle cx="130" cy="60" r="12" fill="#fef3c7" stroke={COLORS.warning} strokeWidth="2" />
        <text x="130" y="64" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="600">M=1</text>
      </g>

      {/* Flow rate vs pressure ratio graph */}
      <g transform="translate(380, 70)">
        <text x="160" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="14" fontWeight="600">
          Mass Flow vs Pressure Ratio
        </text>
        
        {/* Axes */}
        <line x1="40" y1="180" x2="320" y2="180" stroke={COLORS.navy} strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="180" stroke={COLORS.navy} strokeWidth="2" />
        
        <text x="180" y="210" textAnchor="middle" fill={COLORS.navy} fontSize="11">P₂/P₁ →</text>
        <text x="15" y="100" textAnchor="middle" fill={COLORS.navy} fontSize="11" transform="rotate(-90, 15, 100)">Flow Rate</text>

        {/* Critical pressure ratio line */}
        <line x1="160" y1="20" x2="160" y2="180" stroke={COLORS.warning} strokeWidth="2" strokeDasharray="5,5" />
        <text x="160" y="195" textAnchor="middle" fill="#92400e" fontSize="10">P₂/P₁ ≈ 0.53</text>

        {/* Flow curve */}
        <path d="M 40 40 L 160 40 Q 200 40, 240 80 Q 280 130, 300 180" 
              fill="none" stroke={COLORS.navy} strokeWidth="3" />
        
        {/* Zones */}
        <rect x="40" y="25" width="120" height="155" fill="#fee2e2" opacity="0.3" />
        <text x="100" y="90" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">CHOKED</text>
        <text x="100" y="105" textAnchor="middle" fill="#dc2626" fontSize="9">(Critical)</text>
        <text x="100" y="130" textAnchor="middle" fill="#7f1d1d" fontSize="9">Flow is constant</text>
        <text x="100" y="145" textAnchor="middle" fill="#7f1d1d" fontSize="9">at sonic velocity</text>
        
        <rect x="160" y="25" width="140" height="155" fill="#dcfce7" opacity="0.3" />
        <text x="230" y="90" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">SUBCRITICAL</text>
        <text x="230" y="130" textAnchor="middle" fill="#14532d" fontSize="9">Flow varies</text>
        <text x="230" y="145" textAnchor="middle" fill="#14532d" fontSize="9">with P₂</text>
      </g>

      {/* Key points */}
      <g transform="translate(60, 270)">
        <rect x="0" y="0" width="300" height="110" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="150" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Critical Flow Key Points
        </text>
        <text x="15" y="45" fill={COLORS.gray} fontSize="10">• Occurs when P₂/P₁ &lt; ~0.53 (for ideal gases)</text>
        <text x="15" y="62" fill={COLORS.gray} fontSize="10">• Flow velocity = sonic at orifice throat</text>
        <text x="15" y="79" fill={COLORS.gray} fontSize="10">• Mass flow independent of downstream P</text>
        <text x="15" y="96" fill={COLORS.gray} fontSize="10">• Most PSV gas sizing assumes critical flow</text>
      </g>

      <g transform="translate(390, 270)">
        <rect x="0" y="0" width="300" height="110" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="150" y="22" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="600">
          Why This Matters
        </text>
        <text x="15" y="45" fill="#047857" fontSize="10">✓ Critical flow = maximum capacity</text>
        <text x="15" y="62" fill="#047857" fontSize="10">✓ Conservative assumption for sizing</text>
        <text x="15" y="79" fill="#047857" fontSize="10">✓ Simplifies calculation (no P₂ needed)</text>
        <text x="15" y="96" fill="#047857" fontSize="10">✓ Backpressure affects capacity differently</text>
      </g>

      <defs>
        <marker id="arrow-cf" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#1e40af" />
        </marker>
        <marker id="arrow-cf2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#166534" />
        </marker>
      </defs>
    </svg>
  );
}
