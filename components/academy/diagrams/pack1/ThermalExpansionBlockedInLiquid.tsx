"use client";

import { COLORS } from "@/lib/psv/brand";

export default function ThermalExpansionBlockedInLiquid() {
  return (
    <svg viewBox="0 0 750 420" className="w-full h-auto">
      <defs>
        <pattern id="grid-tebl" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="750" height="420" fill="#f8fafc" />
      <rect width="750" height="420" fill="url(#grid-tebl)" />

      {/* Title */}
      <text x="375" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Thermal Expansion: Blocked-In Liquid
      </text>
      <text x="375" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Small PSV with BIG consequences if missing
      </text>

      {/* Before/After comparison */}
      {/* COLD state */}
      <g transform="translate(80, 80)">
        <text x="100" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="14" fontWeight="600">
          COLD State
        </text>
        
        {/* Pipe section */}
        <rect x="20" y="30" width="160" height="100" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="3" />
        
        {/* Block valves */}
        <rect x="0" y="55" width="25" height="50" fill="#dc2626" rx="4" />
        <text x="12" y="85" textAnchor="middle" fill="white" fontSize="8">XV</text>
        
        <rect x="175" y="55" width="25" height="50" fill="#dc2626" rx="4" />
        <text x="187" y="85" textAnchor="middle" fill="white" fontSize="8">XV</text>
        
        {/* Liquid level - lower */}
        <rect x="25" y="70" width="150" height="55" fill="#93c5fd" opacity="0.7" rx="4" />
        <text x="100" y="105" textAnchor="middle" fill="#1e40af" fontSize="10">Liquid @ 60°F</text>
        
        {/* Small vapor space */}
        <text x="100" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="9">Vapor space</text>
        
        <text x="100" y="160" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="500">
          ✓ Room for expansion
        </text>
      </g>

      {/* HOT state - NO PSV */}
      <g transform="translate(300, 80)">
        <text x="100" y="0" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="600">
          HOT State (No PSV)
        </text>
        
        {/* Pipe section - stressed */}
        <rect x="20" y="30" width="160" height="100" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
        
        {/* Block valves */}
        <rect x="0" y="55" width="25" height="50" fill="#dc2626" rx="4" />
        <rect x="175" y="55" width="25" height="50" fill="#dc2626" rx="4" />
        
        {/* Liquid - FULL */}
        <rect x="25" y="35" width="150" height="90" fill="#60a5fa" rx="4" />
        <text x="100" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Liquid @ 200°F</text>
        <text x="100" y="100" textAnchor="middle" fill="white" fontSize="9">EXPANDING!</text>
        
        {/* Pressure arrows */}
        <path d="M 50 80 L 30 80 M 150 80 L 170 80" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow-exp)" />
        
        {/* Crack indication */}
        <path d="M 180 60 L 195 45 L 185 55 L 200 40" stroke="#dc2626" strokeWidth="2" fill="none" />
        
        <text x="100" y="155" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="600">
          Hydraulic pressure →
        </text>
        <text x="100" y="170" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="600">
          PIPE RUPTURE!
        </text>
      </g>

      {/* HOT state - WITH PSV */}
      <g transform="translate(520, 80)">
        <text x="100" y="0" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="600">
          HOT State (With PSV)
        </text>
        
        {/* Pipe section */}
        <rect x="20" y="30" width="160" height="100" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="3" />
        
        {/* Block valves */}
        <rect x="0" y="55" width="25" height="50" fill="#dc2626" rx="4" />
        <rect x="175" y="55" width="25" height="50" fill="#dc2626" rx="4" />
        
        {/* Thermal relief PSV on top */}
        <rect x="85" y="10" width="30" height="25" fill="#22c55e" rx="4" />
        <text x="100" y="27" textAnchor="middle" fill="white" fontSize="8">TRV</text>
        <line x1="100" y1="35" x2="100" y2="30" stroke="#22c55e" strokeWidth="3" />
        
        {/* Liquid with relief */}
        <rect x="25" y="40" width="150" height="85" fill="#93c5fd" rx="4" />
        <text x="100" y="88" textAnchor="middle" fill="#1e40af" fontSize="10">Liquid @ 200°F</text>
        
        {/* Small relief flow */}
        <path d="M 100 10 Q 100 -10, 120 -10 L 140 -10" stroke="#22c55e" strokeWidth="2" 
              markerEnd="url(#arrow-relief)" />
        <text x="145" y="-5" fill="#22c55e" fontSize="8">Tiny relief</text>
        
        <text x="100" y="155" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="600">
          ✓ Pressure relieved safely
        </text>
        <text x="100" y="170" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          (Usually &lt; 1 GPM)
        </text>
      </g>

      {/* Key points */}
      <g transform="translate(80, 280)">
        <rect x="0" y="0" width="280" height="120" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="140" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Why This Matters
        </text>
        <text x="15" y="45" fill={COLORS.gray} fontSize="10">• Liquids are nearly incompressible</text>
        <text x="15" y="62" fill={COLORS.gray} fontSize="10">• Small ΔT = HUGE pressure rise</text>
        <text x="15" y="79" fill={COLORS.gray} fontSize="10">• Can exceed pipe rating in minutes</text>
        <text x="15" y="96" fill={COLORS.gray} fontSize="10">• Common in: exchangers, pipelines,</text>
        <text x="15" y="110" fill={COLORS.gray} fontSize="10">  blocked-in vessels exposed to sun</text>
      </g>

      <g transform="translate(380, 280)">
        <rect x="0" y="0" width="280" height="120" rx="6" fill="#ecfdf5" stroke="#10b981" />
        <text x="140" y="22" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="600">
          Thermal Relief Valve (TRV)
        </text>
        <text x="15" y="45" fill="#047857" fontSize="10">• Very small orifice (3/4&quot; × 1&quot; typical)</text>
        <text x="15" y="62" fill="#047857" fontSize="10">• Set at pipe/equipment MAWP</text>
        <text x="15" y="79" fill="#047857" fontSize="10">• Often discharges to atmosphere</text>
        <text x="15" y="96" fill="#047857" fontSize="10">• Required per API/ASME whenever</text>
        <text x="15" y="110" fill="#047857" fontSize="10">  liquid can be blocked in</text>
      </g>

      <defs>
        <marker id="arrow-exp" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
        </marker>
        <marker id="arrow-relief" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
        </marker>
      </defs>
    </svg>
  );
}
