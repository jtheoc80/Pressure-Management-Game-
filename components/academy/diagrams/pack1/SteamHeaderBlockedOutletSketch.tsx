"use client";

import { COLORS } from "@/lib/psv/brand";

export default function SteamHeaderBlockedOutletSketch() {
  return (
    <svg viewBox="0 0 750 400" className="w-full h-auto">
      <defs>
        <pattern id="grid-shbo" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="750" height="400" fill="#f8fafc" />
      <rect width="750" height="400" fill="url(#grid-shbo)" />

      {/* Title */}
      <text x="375" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Steam Header: Blocked Outlet Scenario
      </text>
      <text x="375" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Classic PSV sizing case for steam systems
      </text>

      {/* Steam system diagram */}
      <g transform="translate(50, 80)">
        {/* Boiler */}
        <rect x="0" y="60" width="100" height="150" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="50" y="100" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">BOILER</text>
        <text x="50" y="120" textAnchor="middle" fill="#92400e" fontSize="10">or Steam</text>
        <text x="50" y="135" textAnchor="middle" fill="#92400e" fontSize="10">Generator</text>
        
        {/* Fire underneath */}
        <path d="M 20 220 Q 30 200 40 220 Q 50 200 60 220 Q 70 200 80 220" 
              fill="none" stroke="#dc2626" strokeWidth="3" />
        <text x="50" y="245" textAnchor="middle" fill="#dc2626" fontSize="9">Heat Input</text>

        {/* Steam header pipe */}
        <rect x="100" y="100" width="400" height="25" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" />
        
        {/* Steam flow arrows */}
        <path d="M 120 112 L 180 112 M 200 112 L 260 112 M 280 112 L 340 112" 
              stroke="#f59e0b" strokeWidth="2" strokeDasharray="10,5" />
        
        {/* PSV on header */}
        <g transform="translate(230, 40)">
          <rect x="0" y="0" width="40" height="55" fill={COLORS.navy} rx="4" />
          <text x="20" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">PSV</text>
          <text x="20" y="40" textAnchor="middle" fill="#93c5fd" fontSize="8">Steam</text>
          <line x1="20" y1="55" x2="20" y2="60" stroke={COLORS.navy} strokeWidth="4" />
        </g>

        {/* Block valve - CLOSED */}
        <g transform="translate(420, 90)">
          <rect x="0" y="0" width="50" height="45" fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="4" />
          <line x1="10" y1="10" x2="40" y2="35" stroke="white" strokeWidth="4" />
          <line x1="40" y1="10" x2="10" y2="35" stroke="white" strokeWidth="4" />
          <text x="25" y="60" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">BLOCKED</text>
        </g>

        {/* Consumer after block valve */}
        <rect x="490" y="80" width="80" height="65" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="4" />
        <text x="530" y="108" textAnchor="middle" fill="#4338ca" fontSize="10">Process</text>
        <text x="530" y="123" textAnchor="middle" fill="#4338ca" fontSize="10">Consumer</text>
        <text x="530" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="9">Isolated</text>

        {/* Pressure buildup indication */}
        <rect x="150" y="140" width="250" height="50" fill="#fee2e2" stroke="#dc2626" rx="4" strokeDasharray="5,3" />
        <text x="275" y="160" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">
          Pressure Rising!
        </text>
        <text x="275" y="178" textAnchor="middle" fill="#7f1d1d" fontSize="10">
          Boiler continues making steam
        </text>
      </g>

      {/* Explanation box */}
      <g transform="translate(50, 310)">
        <rect x="0" y="0" width="300" height="75" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="150" y="20" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Scenario Description
        </text>
        <text x="15" y="40" fill={COLORS.gray} fontSize="10">• Downstream valve closes suddenly</text>
        <text x="15" y="55" fill={COLORS.gray} fontSize="10">• Boiler cannot stop instantly</text>
        <text x="15" y="70" fill={COLORS.gray} fontSize="10">• Header pressure rises to PSV set</text>
      </g>

      <g transform="translate(370, 310)">
        <rect x="0" y="0" width="300" height="75" rx="6" fill="#ecfdf5" stroke="#10b981" />
        <text x="150" y="20" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
          Sizing Requirement
        </text>
        <text x="15" y="40" fill="#047857" fontSize="10">• PSV must handle FULL boiler output</text>
        <text x="15" y="55" fill="#047857" fontSize="10">• Use steam tables for properties</text>
        <text x="15" y="70" fill="#047857" fontSize="10">• Superheat affects required area</text>
      </g>
    </svg>
  );
}
