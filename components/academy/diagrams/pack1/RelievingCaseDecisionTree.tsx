"use client";

import { COLORS } from "@/lib/psv/brand";

export default function RelievingCaseDecisionTree() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      {/* Background with subtle grid */}
      <defs>
        <pattern id="grid-rcd" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#f8fafc" />
      <rect width="800" height="500" fill="url(#grid-rcd)" />

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Relieving Case Decision Tree
      </text>
      <text x="400" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Identify credible overpressure scenarios per API 521
      </text>

      {/* Start node */}
      <ellipse cx="400" cy="90" rx="80" ry="25" fill={COLORS.navy} />
      <text x="400" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">Start: What can</text>
      <text x="400" y="108" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">cause overpressure?</text>

      {/* Main branches */}
      <line x1="400" y1="115" x2="400" y2="140" stroke={COLORS.navy} strokeWidth="2" />
      
      {/* Row 1: Source types */}
      <g transform="translate(100, 160)">
        <rect x="0" y="0" width="130" height="50" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="65" y="20" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">External Source</text>
        <text x="65" y="35" textAnchor="middle" fill="#1e40af" fontSize="10">Pump, compressor</text>
      </g>
      <g transform="translate(260, 160)">
        <rect x="0" y="0" width="130" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="65" y="20" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">Heat Input</text>
        <text x="65" y="35" textAnchor="middle" fill="#92400e" fontSize="10">Fire, exchanger, sun</text>
      </g>
      <g transform="translate(420, 160)">
        <rect x="0" y="0" width="130" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="65" y="20" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">Chemical</text>
        <text x="65" y="35" textAnchor="middle" fill="#166534" fontSize="10">Reaction, polymerization</text>
      </g>
      <g transform="translate(580, 160)">
        <rect x="0" y="0" width="130" height="50" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
        <text x="65" y="20" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="600">Utility Failure</text>
        <text x="65" y="35" textAnchor="middle" fill="#9d174d" fontSize="10">Power, cooling, air</text>
      </g>

      {/* Connection lines */}
      <path d="M400 140 L165 160 M400 140 L325 160 M400 140 L485 160 M400 140 L645 160" 
            stroke={COLORS.navy} strokeWidth="1.5" fill="none" />

      {/* Row 2: Specific scenarios */}
      <g transform="translate(50, 250)">
        <rect x="0" y="0" width="110" height="45" rx="4" fill="white" stroke={COLORS.gray} />
        <text x="55" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="500">Blocked Outlet</text>
        <text x="55" y="32" textAnchor="middle" fill={COLORS.gray} fontSize="9">Max pump flow</text>
      </g>
      <g transform="translate(170, 250)">
        <rect x="0" y="0" width="110" height="45" rx="4" fill="white" stroke={COLORS.gray} />
        <text x="55" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="500">CV Fails Open</text>
        <text x="55" y="32" textAnchor="middle" fill={COLORS.gray} fontSize="9">Full CV capacity</text>
      </g>
      <g transform="translate(290, 250)">
        <rect x="0" y="0" width="110" height="45" rx="4" fill="white" stroke={COLORS.gray} />
        <text x="55" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="500">Fire Case</text>
        <text x="55" y="32" textAnchor="middle" fill={COLORS.gray} fontSize="9">Wetted area calc</text>
      </g>
      <g transform="translate(410, 250)">
        <rect x="0" y="0" width="110" height="45" rx="4" fill="white" stroke={COLORS.gray} />
        <text x="55" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="500">Tube Rupture</text>
        <text x="55" y="32" textAnchor="middle" fill={COLORS.gray} fontSize="9">HP→LP side</text>
      </g>
      <g transform="translate(530, 250)">
        <rect x="0" y="0" width="110" height="45" rx="4" fill="white" stroke={COLORS.gray} />
        <text x="55" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="500">Thermal</text>
        <text x="55" y="32" textAnchor="middle" fill={COLORS.gray} fontSize="9">Blocked-in liquid</text>
      </g>
      <g transform="translate(650, 250)">
        <rect x="0" y="0" width="110" height="45" rx="4" fill="white" stroke={COLORS.gray} />
        <text x="55" y="18" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="500">Reflux Loss</text>
        <text x="55" y="32" textAnchor="middle" fill={COLORS.gray} fontSize="9">Full overhead rate</text>
      </g>

      {/* Decision diamond */}
      <polygon points="400,330 460,370 400,410 340,370" fill="#fef3c7" stroke={COLORS.warning} strokeWidth="2" />
      <text x="400" y="365" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="500">Compare all</text>
      <text x="400" y="380" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="500">scenarios</text>

      {/* Result */}
      <rect x="300" y="440" width="200" height="40" rx="8" fill={COLORS.navy} />
      <text x="400" y="465" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        Size for GOVERNING case
      </text>

      <line x1="400" y1="410" x2="400" y2="440" stroke={COLORS.navy} strokeWidth="2" markerEnd="url(#arrowhead-rcd)" />

      {/* Callout */}
      <rect x="600" y="340" width="180" height="60" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="690" y="360" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="600">KEY PRINCIPLE</text>
      <text x="690" y="378" textAnchor="middle" fill="#047857" fontSize="9">The LARGEST required</text>
      <text x="690" y="392" textAnchor="middle" fill="#047857" fontSize="9">flow determines PSV size</text>

      <defs>
        <marker id="arrowhead-rcd" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.navy} />
        </marker>
      </defs>
    </svg>
  );
}
