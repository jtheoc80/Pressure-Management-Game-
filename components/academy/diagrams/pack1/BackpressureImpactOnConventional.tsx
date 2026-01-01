"use client";

import { COLORS } from "@/lib/psv/brand";

export default function BackpressureImpactOnConventional() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-auto">
      <defs>
        <pattern id="grid-bp" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill="#f8fafc" />
      <rect width="800" height="450" fill="url(#grid-bp)" />

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Backpressure Impact on Conventional PSV
      </text>

      {/* Valve diagrams */}
      {/* Normal operation */}
      <g transform="translate(80, 70)">
        <text x="90" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="13" fontWeight="600">
          Low Backpressure
        </text>
        <text x="90" y="18" textAnchor="middle" fill="#22c55e" fontSize="11">(Normal Operation)</text>
        
        {/* Valve body */}
        <rect x="40" y="40" width="100" height="150" rx="4" fill="white" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Spring */}
        <path d="M 70 60 L 90 70 L 70 80 L 90 90 L 70 100 L 90 110 L 70 120" 
              fill="none" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Disk */}
        <ellipse cx="90" cy="145" rx="35" ry="8" fill={COLORS.navy} />
        
        {/* Inlet pressure arrow */}
        <path d="M 90 220 L 90 160" stroke="#22c55e" strokeWidth="4" markerEnd="url(#arrow-up-bp)" />
        <text x="90" y="240" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="500">
          P₁ = 100 psig
        </text>
        
        {/* Back pressure arrow */}
        <path d="M 160 90 L 145 90" stroke={COLORS.gray} strokeWidth="2" markerEnd="url(#arrow-left-bp)" />
        <text x="195" y="94" fill={COLORS.gray} fontSize="10">P₂ = 5 psig</text>
        
        {/* Force balance */}
        <text x="90" y="280" textAnchor="middle" fill={COLORS.navy} fontSize="10">
          Net opening force:
        </text>
        <text x="90" y="295" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600">
          (100 - 5) × Area = GOOD
        </text>
      </g>

      {/* High backpressure */}
      <g transform="translate(310, 70)">
        <text x="90" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="13" fontWeight="600">
          High Backpressure
        </text>
        <text x="90" y="18" textAnchor="middle" fill="#dc2626" fontSize="11">(Reduced Capacity)</text>
        
        {/* Valve body */}
        <rect x="40" y="40" width="100" height="150" rx="4" fill="white" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Spring - compressed less */}
        <path d="M 70 70 L 90 78 L 70 86 L 90 94 L 70 102 L 90 110 L 70 118" 
              fill="none" stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Disk - partially lifted */}
        <ellipse cx="90" cy="140" rx="35" ry="8" fill={COLORS.navy} />
        
        {/* Inlet pressure arrow */}
        <path d="M 90 220 L 90 160" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-up-bp2)" />
        <text x="90" y="240" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="500">
          P₁ = 100 psig
        </text>
        
        {/* High back pressure arrow */}
        <path d="M 160 100 L 140 100" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrow-left-bp2)" />
        <text x="195" y="104" fill="#dc2626" fontSize="10" fontWeight="500">P₂ = 30 psig</text>
        
        {/* Force balance */}
        <text x="90" y="280" textAnchor="middle" fill={COLORS.navy} fontSize="10">
          Net opening force:
        </text>
        <text x="90" y="295" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">
          (100 - 30) × Area = REDUCED
        </text>
      </g>

      {/* Graph */}
      <g transform="translate(520, 70)">
        <text x="120" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="13" fontWeight="600">
          Capacity vs Backpressure
        </text>
        
        {/* Axes */}
        <line x1="40" y1="220" x2="240" y2="220" stroke={COLORS.navy} strokeWidth="2" />
        <line x1="40" y1="40" x2="40" y2="220" stroke={COLORS.navy} strokeWidth="2" />
        
        <text x="140" y="250" textAnchor="middle" fill={COLORS.navy} fontSize="10">
          Backpressure (% of set)
        </text>
        <text x="15" y="130" textAnchor="middle" fill={COLORS.navy} fontSize="10" transform="rotate(-90, 15, 130)">
          Capacity %
        </text>
        
        {/* Scale */}
        <text x="35" y="50" textAnchor="end" fill={COLORS.gray} fontSize="9">100%</text>
        <text x="35" y="130" textAnchor="end" fill={COLORS.gray} fontSize="9">50%</text>
        <text x="35" y="220" textAnchor="end" fill={COLORS.gray} fontSize="9">0%</text>
        
        <text x="40" y="235" fill={COLORS.gray} fontSize="9">0%</text>
        <text x="90" y="235" fill={COLORS.gray} fontSize="9">10%</text>
        <text x="140" y="235" fill={COLORS.gray} fontSize="9">20%</text>
        <text x="190" y="235" fill={COLORS.gray} fontSize="9">30%</text>
        
        {/* Capacity curve */}
        <path d="M 40 45 Q 80 45, 100 50 Q 140 60, 180 120 Q 210 180, 230 220" 
              fill="none" stroke="#dc2626" strokeWidth="3" />
        
        {/* 10% limit line */}
        <line x1="90" y1="40" x2="90" y2="220" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" />
        <text x="90" y="30" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          10% limit
        </text>
        
        {/* Danger zone */}
        <rect x="90" y="40" width="150" height="180" fill="#fee2e2" opacity="0.3" />
      </g>

      {/* Key takeaways */}
      <g transform="translate(60, 360)">
        <rect x="0" y="0" width="320" height="75" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="160" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Conventional PSV Limitation
        </text>
        <text x="15" y="42" fill={COLORS.gray} fontSize="10">• Backpressure acts on disk, opposing opening</text>
        <text x="15" y="58" fill={COLORS.gray} fontSize="10">• Limit: &lt;10% of set pressure for full capacity</text>
        <text x="15" y="74" fill={COLORS.gray} fontSize="10">• Use balanced bellows for higher backpressure</text>
      </g>

      <g transform="translate(420, 360)">
        <rect x="0" y="0" width="320" height="75" rx="6" fill="#fef3c7" stroke={COLORS.warning} />
        <text x="160" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">
          ⚠️ Variable Backpressure
        </text>
        <text x="15" y="42" fill="#78350f" fontSize="10">If flare header pressure varies widely,</text>
        <text x="15" y="58" fill="#78350f" fontSize="10">conventional PSV capacity is unpredictable.</text>
        <text x="15" y="74" fill="#78350f" fontSize="10">→ Consider balanced bellows or pilot-operated</text>
      </g>

      <defs>
        <marker id="arrow-up-bp" markerWidth="10" markerHeight="7" refX="5" refY="7" orient="auto">
          <polygon points="0 7, 5 0, 10 7" fill="#22c55e" />
        </marker>
        <marker id="arrow-up-bp2" markerWidth="10" markerHeight="7" refX="5" refY="7" orient="auto">
          <polygon points="0 7, 5 0, 10 7" fill="#f59e0b" />
        </marker>
        <marker id="arrow-left-bp" markerWidth="7" markerHeight="10" refX="0" refY="5" orient="auto">
          <polygon points="7 0, 0 5, 7 10" fill={COLORS.gray} />
        </marker>
        <marker id="arrow-left-bp2" markerWidth="7" markerHeight="10" refX="0" refY="5" orient="auto">
          <polygon points="7 0, 0 5, 7 10" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  );
}
