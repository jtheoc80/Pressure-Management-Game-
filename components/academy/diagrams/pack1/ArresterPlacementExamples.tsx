"use client";

import { COLORS } from "@/lib/psv/brand";

export default function ArresterPlacementExamples() {
  return (
    <svg viewBox="0 0 850 480" className="w-full h-auto">
      <defs>
        <pattern id="grid-ape" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="480" fill="#f8fafc" />
      <rect width="850" height="480" fill="url(#grid-ape)" />

      {/* Title */}
      <text x="425" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Flame Arrester Placement Examples
      </text>
      <text x="425" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Where and why to install arresters
      </text>

      {/* Example 1: End-of-line */}
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="250" height="180" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="125" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          End-of-Line (Tank Vent)
        </text>
        
        {/* Tank */}
        <rect x="40" y="80" width="80" height="70" fill="#dbeafe" stroke={COLORS.navy} strokeWidth="2" rx="4" />
        <text x="80" y="120" textAnchor="middle" fill={COLORS.navy} fontSize="9">Tank</text>
        
        {/* Vent pipe */}
        <rect x="70" y="50" width="20" height="35" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        
        {/* Arrestor */}
        <rect x="60" y="35" width="40" height="20" fill="#22c55e" stroke="#166534" strokeWidth="2" rx="3" />
        <text x="80" y="50" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">FA</text>
        
        {/* PV Vent on top */}
        <rect x="65" y="15" width="30" height="22" fill={COLORS.grayLighter} stroke={COLORS.navy} rx="2" />
        <text x="80" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="7">PV</text>
        
        <text x="125" y="165" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Deflagration type typical
        </text>
      </g>

      {/* Example 2: In-line (manifold) */}
      <g transform="translate(300, 80)">
        <rect x="0" y="0" width="250" height="180" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="125" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          In-Line (Vapor Manifold)
        </text>
        
        {/* Tanks */}
        <rect x="20" y="90" width="50" height="50" fill="#dbeafe" stroke={COLORS.navy} rx="3" />
        <rect x="80" y="90" width="50" height="50" fill="#dbeafe" stroke={COLORS.navy} rx="3" />
        
        {/* Manifold header */}
        <rect x="35" y="70" width="150" height="15" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        
        {/* In-line arrestor */}
        <rect x="140" y="65" width="30" height="25" fill="#f59e0b" stroke="#92400e" strokeWidth="2" rx="3" />
        <text x="155" y="82" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">DA</text>
        
        {/* To VRU/Flare */}
        <rect x="175" y="70" width="50" height="15" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        <text x="200" y="105" textAnchor="middle" fill={COLORS.gray} fontSize="8">To VRU</text>
        
        <text x="125" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Detonation type if pipe &gt;20 L/D
        </text>
      </g>

      {/* Example 3: Storage to process */}
      <g transform="translate(570, 80)">
        <rect x="0" y="0" width="250" height="180" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="125" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Storage-to-Process
        </text>
        
        {/* Storage */}
        <rect x="20" y="70" width="60" height="70" fill="#dbeafe" stroke={COLORS.navy} rx="4" />
        <text x="50" y="110" textAnchor="middle" fill={COLORS.navy} fontSize="8">Storage</text>
        
        {/* Long pipe */}
        <rect x="80" y="95" width="80" height="12" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        
        {/* Detonation arrestor */}
        <rect x="165" y="88" width="25" height="25" fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="3" />
        <text x="178" y="105" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">DA</text>
        
        {/* Process equipment */}
        <ellipse cx="215" cy="100" rx="25" ry="35" fill="#fef3c7" stroke={COLORS.navy} strokeWidth="2" />
        <text x="215" y="105" textAnchor="middle" fill={COLORS.navy} fontSize="7">Process</text>
        
        <text x="125" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Protect process from tank fire
        </text>
      </g>

      {/* Example 4: Marine loading */}
      <g transform="translate(30, 280)">
        <rect x="0" y="0" width="250" height="180" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="125" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Marine Loading Arm
        </text>
        
        {/* Ship */}
        <path d="M 20 130 L 40 100 L 100 100 L 100 130 Z" fill="#e0e7ff" stroke={COLORS.navy} strokeWidth="2" />
        <text x="60" y="120" textAnchor="middle" fill={COLORS.navy} fontSize="8">Vessel</text>
        
        {/* Loading arm */}
        <rect x="100" y="105" width="80" height="10" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        
        {/* Arrestor at shore connection */}
        <rect x="175" y="98" width="25" height="25" fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="3" />
        <text x="188" y="115" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">DA</text>
        
        {/* Shore tank */}
        <rect x="205" y="85" width="35" height="50" fill="#dbeafe" stroke={COLORS.navy} rx="3" />
        
        <text x="125" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Required at ship/shore interface
        </text>
      </g>

      {/* Example 5: Flare stack base */}
      <g transform="translate(300, 280)">
        <rect x="0" y="0" width="250" height="180" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="125" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Flare System
        </text>
        
        {/* KO drum */}
        <ellipse cx="50" cy="100" rx="30" ry="45" fill="#fef3c7" stroke={COLORS.navy} strokeWidth="2" />
        <text x="50" y="105" textAnchor="middle" fill={COLORS.navy} fontSize="7">KO</text>
        
        {/* Flare header */}
        <rect x="80" y="95" width="60" height="12" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        
        {/* Liquid seal or arrestor */}
        <rect x="145" y="85" width="30" height="30" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" rx="3" />
        <text x="160" y="105" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Seal</text>
        
        {/* Flare stack */}
        <rect x="180" y="55" width="15" height="60" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        <polygon points="187,55 175,35 200,35" fill="#f59e0b" />
        
        <text x="125" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="9">
          Liquid seal or molecular seal
        </text>
      </g>

      {/* Selection guide */}
      <g transform="translate(570, 280)">
        <rect x="0" y="0" width="250" height="180" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="125" y="22" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="600">
          Selection Quick Guide
        </text>
        
        <text x="20" y="50" fill="#047857" fontSize="10" fontWeight="500">End-of-line (short):</text>
        <text x="30" y="68" fill="#047857" fontSize="9">→ Deflagration arrestor</text>
        
        <text x="20" y="90" fill="#047857" fontSize="10" fontWeight="500">In-line, long run:</text>
        <text x="30" y="108" fill="#047857" fontSize="9">→ Detonation arrestor</text>
        
        <text x="20" y="130" fill="#047857" fontSize="10" fontWeight="500">Critical Rule:</text>
        <text x="30" y="148" fill="#047857" fontSize="9">L/D &gt; 20 = possible DDT</text>
        <text x="30" y="166" fill="#047857" fontSize="9">Use detonation-rated device</text>
      </g>
    </svg>
  );
}
