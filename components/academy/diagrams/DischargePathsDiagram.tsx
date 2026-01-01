"use client";

import React from "react";

export function DischargePathsDiagram() {
  return (
    <svg viewBox="0 0 700 450" className="w-full h-auto max-w-3xl mx-auto">
      <defs>
        <marker id="flowArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#003366" />
        </marker>
        <linearGradient id="flareGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="700" height="450" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        PSV Discharge Destinations
      </text>

      {/* Protected Vessel */}
      <rect x="280" y="180" width="140" height="100" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="4" />
      <text x="350" y="220" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">Protected</text>
      <text x="350" y="238" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">Vessel</text>
      <text x="350" y="260" textAnchor="middle" fill="#64748b" fontSize="10">150 psig MAWP</text>

      {/* PSV Symbol on vessel */}
      <rect x="340" y="150" width="20" height="30" fill="#003366" stroke="#003366" strokeWidth="1" />
      <polygon points="340,150 350,130 360,150" fill="#003366" />

      {/* Option 1: Atmosphere */}
      <g transform="translate(50, 60)">
        <rect x="0" y="0" width="140" height="110" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <text x="70" y="25" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">ATMOSPHERE</text>
        
        {/* Simple stack */}
        <rect x="55" y="35" width="30" height="50" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
        <line x1="70" y1="35" x2="70" y2="20" stroke="#94a3b8" strokeWidth="2" />
        
        {/* Weather cap */}
        <path d="M55 35 L70 25 L85 35" fill="none" stroke="#64748b" strokeWidth="2" />
        
        <text x="70" y="100" textAnchor="middle" fill="#1e40af" fontSize="9">Steam, Air, Inert Gas</text>
      </g>
      
      {/* Arrow to ATM */}
      <path d="M340 140 L340 100 L190 100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#flowArrow)" fill="none" />

      {/* Option 2: Flare */}
      <g transform="translate(510, 60)">
        <rect x="0" y="0" width="140" height="110" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
        <text x="70" y="25" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">FLARE SYSTEM</text>
        
        {/* Flare stack */}
        <rect x="55" y="45" width="10" height="40" fill="#78716c" stroke="#57534e" strokeWidth="1" />
        <ellipse cx="60" cy="40" rx="15" ry="10" fill="url(#flareGrad)" />
        
        <text x="70" y="100" textAnchor="middle" fill="#92400e" fontSize="9">Flammable, Toxic Vapors</text>
      </g>
      
      {/* Arrow to Flare */}
      <path d="M360 140 L360 100 L510 100" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#flowArrow)" fill="none" />

      {/* Option 3: Closed Drain */}
      <g transform="translate(50, 300)">
        <rect x="0" y="0" width="140" height="110" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
        <text x="70" y="25" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">CLOSED DRAIN</text>
        
        {/* Drain tank */}
        <rect x="40" y="40" width="60" height="40" fill="#a3e635" stroke="#65a30d" strokeWidth="1" rx="4" />
        <rect x="45" y="50" width="50" height="20" fill="#84cc16" />
        
        <text x="70" y="100" textAnchor="middle" fill="#166534" fontSize="9">Liquids, Condensate</text>
      </g>
      
      {/* Arrow to Drain */}
      <path d="M320 280 L320 340 L190 340" stroke="#22c55e" strokeWidth="2" markerEnd="url(#flowArrow)" fill="none" />

      {/* Option 4: Blowdown Drum */}
      <g transform="translate(510, 300)">
        <rect x="0" y="0" width="140" height="110" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="8" />
        <text x="70" y="25" textAnchor="middle" fill="#7e22ce" fontSize="13" fontWeight="bold">BLOWDOWN</text>
        
        {/* Blowdown drum */}
        <ellipse cx="70" cy="55" rx="35" ry="15" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="1" />
        <rect x="35" y="55" width="70" height="25" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="1" />
        <ellipse cx="70" cy="80" rx="35" ry="15" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="1" />
        
        <text x="70" y="100" textAnchor="middle" fill="#7e22ce" fontSize="9">Two-Phase, High Volume</text>
      </g>
      
      {/* Arrow to Blowdown */}
      <path d="M380 280 L380 340 L510 340" stroke="#a855f7" strokeWidth="2" markerEnd="url(#flowArrow)" fill="none" />

      {/* Selection Guide */}
      <rect x="200" y="400" width="300" height="40" fill="#f1f5f9" stroke="#94a3b8" rx="4" />
      <text x="350" y="418" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
        Selection depends on: Fluid hazard, Permit requirements, Available systems
      </text>
      <text x="350" y="432" textAnchor="middle" fill="#64748b" fontSize="9">
        Check local regulations and P&ID for specific requirements
      </text>
    </svg>
  );
}
