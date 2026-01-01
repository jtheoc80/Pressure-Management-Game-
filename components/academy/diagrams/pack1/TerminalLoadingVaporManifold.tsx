"use client";

import { COLORS } from "@/lib/psv/brand";

export default function TerminalLoadingVaporManifold() {
  return (
    <svg viewBox="0 0 850 450" className="w-full h-auto">
      <defs>
        <pattern id="grid-tlvm" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="450" fill="#f8fafc" />
      <rect width="850" height="450" fill="url(#grid-tlvm)" />

      {/* Title */}
      <text x="425" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Terminal Loading: Vapor Manifold System
      </text>
      <text x="425" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Vapor recovery during truck/rail loading operations
      </text>

      {/* Storage tanks */}
      <g transform="translate(30, 90)">
        <rect x="0" y="20" width="100" height="140" fill="#dbeafe" stroke={COLORS.navy} strokeWidth="2" rx="6" />
        <ellipse cx="50" cy="20" rx="50" ry="15" fill="#dbeafe" stroke={COLORS.navy} strokeWidth="2" />
        <ellipse cx="50" cy="160" rx="50" ry="15" fill="#dbeafe" stroke={COLORS.navy} strokeWidth="2" />
        <text x="50" y="100" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="500">Product</text>
        <text x="50" y="115" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="500">Tank</text>
        
        {/* Vent connection */}
        <rect x="40" y="0" width="20" height="25" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        <text x="50" y="185" textAnchor="middle" fill={COLORS.gray} fontSize="9">Storage</text>
      </g>

      {/* Main vapor header */}
      <g transform="translate(150, 70)">
        <rect x="0" y="35" width="500" height="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="250" y="30" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">
          VAPOR MANIFOLD HEADER
        </text>
        
        {/* Vapor flow arrows */}
        <path d="M 20 45 L 60 45 M 80 45 L 120 45 M 140 45 L 180 45" 
              stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4" />
      </g>

      {/* Loading racks */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${200 + i * 160}, 150)`}>
          {/* Truck/railcar */}
          <rect x="0" y="80" width="100" height="50" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="4" />
          <circle cx="20" cy="135" r="10" fill={COLORS.grayLighter} stroke={COLORS.navy} />
          <circle cx="80" cy="135" r="10" fill={COLORS.grayLighter} stroke={COLORS.navy} />
          <text x="50" y="110" textAnchor="middle" fill="#4338ca" fontSize="9">
            {i === 0 ? "Truck" : i === 1 ? "Railcar" : "Truck"}
          </text>
          
          {/* Loading arm */}
          <rect x="40" y="50" width="20" height="35" fill={COLORS.grayLighter} stroke={COLORS.navy} />
          
          {/* Vapor return line */}
          <rect x="55" y="30" width="15" height="55" fill="#fef3c7" stroke="#f59e0b" />
          <path d="M 62 35 L 62 50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-vapor)" />
          
          {/* To header connection */}
          <line x1="62" y1="30" x2="62" y2="-45" stroke="#f59e0b" strokeWidth="3" />
          
          <text x="50" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="9">
            Bay {i + 1}
          </text>
        </g>
      ))}

      {/* VRU */}
      <g transform="translate(680, 100)">
        <rect x="0" y="0" width="120" height="100" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
        <text x="60" y="35" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="600">VRU</text>
        <text x="60" y="52" textAnchor="middle" fill="#166534" fontSize="9">Vapor Recovery</text>
        <text x="60" y="67" textAnchor="middle" fill="#166534" fontSize="9">Unit</text>
        <text x="60" y="90" textAnchor="middle" fill="#047857" fontSize="8">Condenses vapor</text>
        
        {/* Connection from header */}
        <line x1="-30" y1="50" x2="0" y2="50" stroke="#f59e0b" strokeWidth="3" />
      </g>

      {/* Flame arresters */}
      <g transform="translate(640, 130)">
        <rect x="0" y="0" width="30" height="25" fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="3" />
        <text x="15" y="17" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">FA</text>
      </g>

      {/* Return to storage */}
      <g transform="translate(680, 230)">
        <rect x="20" y="0" width="80" height="15" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        <path d="M 0 7 L 20 7" stroke="#22c55e" strokeWidth="2" />
        <text x="60" y="30" textAnchor="middle" fill={COLORS.gray} fontSize="9">Liquid return</text>
        <text x="60" y="45" textAnchor="middle" fill={COLORS.gray} fontSize="9">to storage</text>
      </g>

      {/* Key points */}
      <g transform="translate(50, 330)">
        <rect x="0" y="0" width="350" height="100" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="175" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          System Purpose
        </text>
        <text x="15" y="45" fill={COLORS.gray} fontSize="10">• Capture displaced vapors during loading</text>
        <text x="15" y="62" fill={COLORS.gray} fontSize="10">• Recover product (economic value)</text>
        <text x="15" y="79" fill={COLORS.gray} fontSize="10">• Meet EPA/TCEQ emission limits</text>
        <text x="15" y="96" fill={COLORS.gray} fontSize="10">• Prevent flammable atmosphere at grade</text>
      </g>

      <g transform="translate(420, 330)">
        <rect x="0" y="0" width="350" height="100" rx="6" fill="#fef3c7" stroke={COLORS.warning} />
        <text x="175" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">
          Safety Requirements
        </text>
        <text x="15" y="45" fill="#78350f" fontSize="10">• Flame arresters at VRU inlet</text>
        <text x="15" y="62" fill="#78350f" fontSize="10">• Detonation rated for long runs</text>
        <text x="15" y="79" fill="#78350f" fontSize="10">• Emergency vent if VRU trips</text>
        <text x="15" y="96" fill="#78350f" fontSize="10">• Continuous LEL monitoring</text>
      </g>

      <defs>
        <marker id="arrow-vapor" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}
