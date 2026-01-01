"use client";

import React from "react";

export function FlameArresterDiagram() {
  return (
    <svg viewBox="0 0 700 450" className="w-full h-auto max-w-3xl mx-auto">
      {/* Background */}
      <rect x="0" y="0" width="700" height="450" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        Flame Arrester Operation & Gas Groups
      </text>

      {/* Arrester Cross-section */}
      <g transform="translate(50, 60)">
        <text x="120" y="0" textAnchor="middle" fill="#003366" fontSize="12" fontWeight="bold">
          Flame Arrester Operation
        </text>
        
        {/* Housing */}
        <rect x="50" y="20" width="140" height="180" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="4" />
        
        {/* Element (crimped ribbon) */}
        <g transform="translate(70, 50)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i}>
              <path
                d={`M0 ${i * 15} Q25 ${i * 15 + 7}, 50 ${i * 15} Q75 ${i * 15 - 7}, 100 ${i * 15}`}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>
        
        {/* Flame on left side */}
        <g transform="translate(0, 100)">
          <ellipse cx="30" cy="0" rx="20" ry="30" fill="#fbbf24" opacity="0.8" />
          <ellipse cx="30" cy="0" rx="12" ry="20" fill="#f97316" opacity="0.9" />
          <ellipse cx="30" cy="0" rx="6" ry="10" fill="#ef4444" />
          <text x="30" y="45" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">FLAME</text>
        </g>
        
        {/* Safe side on right */}
        <g transform="translate(200, 100)">
          <circle cx="20" cy="0" r="15" fill="#10b981" opacity="0.2" />
          <text x="20" y="5" textAnchor="middle" fill="#047857" fontSize="20">✓</text>
          <text x="20" y="30" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">SAFE</text>
        </g>
        
        {/* Arrow showing heat absorption */}
        <path d="M50 110 L70 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#flameArrow)" />
        <text x="120" y="115" textAnchor="middle" fill="#64748b" fontSize="8">Heat absorbed</text>
        <text x="120" y="127" textAnchor="middle" fill="#64748b" fontSize="8">by element</text>
        
        <defs>
          <marker id="flameArrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#dc2626" />
          </marker>
        </defs>
      </g>

      {/* Gas Group Table */}
      <g transform="translate(320, 60)">
        <text x="170" y="0" textAnchor="middle" fill="#003366" fontSize="12" fontWeight="bold">
          Gas Groups & MESG
        </text>
        
        <rect x="20" y="15" width="300" height="190" fill="white" stroke="#94a3b8" strokeWidth="1" rx="4" />
        
        {/* Header */}
        <rect x="20" y="15" width="300" height="30" fill="#003366" rx="4" />
        <text x="70" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Group</text>
        <text x="145" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MESG</text>
        <text x="245" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Example Gases</text>
        
        {/* IIC Row */}
        <rect x="20" y="45" width="300" height="50" fill="#fecaca" />
        <text x="70" y="65" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">IIC</text>
        <text x="145" y="65" textAnchor="middle" fill="#7f1d1d" fontSize="10">&lt; 0.50 mm</text>
        <text x="245" y="60" textAnchor="middle" fill="#7f1d1d" fontSize="9">Hydrogen, Acetylene</text>
        <text x="245" y="75" textAnchor="middle" fill="#dc2626" fontSize="8">(Most restrictive)</text>
        
        {/* IIB Row */}
        <rect x="20" y="95" width="300" height="50" fill="#fef3c7" />
        <text x="70" y="115" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">IIB</text>
        <text x="145" y="115" textAnchor="middle" fill="#92400e" fontSize="10">0.50 - 0.90 mm</text>
        <text x="245" y="110" textAnchor="middle" fill="#92400e" fontSize="9">Ethylene, Propylene</text>
        <text x="245" y="125" textAnchor="middle" fill="#d97706" fontSize="8">(Moderate)</text>
        
        {/* IIA Row */}
        <rect x="20" y="145" width="300" height="50" fill="#dcfce7" />
        <text x="70" y="165" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="bold">IIA</text>
        <text x="145" y="165" textAnchor="middle" fill="#166534" fontSize="10">&gt; 0.90 mm</text>
        <text x="245" y="160" textAnchor="middle" fill="#166534" fontSize="9">Propane, Methane, Gasoline</text>
        <text x="245" y="175" textAnchor="middle" fill="#16a34a" fontSize="8">(Most common)</text>

        {/* Column lines */}
        <line x1="110" y1="15" x2="110" y2="205" stroke="#e2e8f0" />
        <line x1="180" y1="15" x2="180" y2="205" stroke="#e2e8f0" />
      </g>

      {/* Deflagration vs Detonation */}
      <g transform="translate(50, 290)">
        <text x="300" y="0" textAnchor="middle" fill="#003366" fontSize="12" fontWeight="bold">
          Deflagration vs Detonation Arresters
        </text>
        
        {/* Deflagration */}
        <rect x="20" y="15" width="250" height="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <text x="145" y="35" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">DEFLAGRATION</text>
        <text x="145" y="52" textAnchor="middle" fill="#1e40af" fontSize="10">(End-of-Line)</text>
        <text x="145" y="72" textAnchor="middle" fill="#475569" fontSize="9">• At vent outlet to atmosphere</text>
        <text x="145" y="87" textAnchor="middle" fill="#475569" fontSize="9">• Subsonic flame speed</text>
        <text x="145" y="102" textAnchor="middle" fill="#475569" fontSize="9">• Most common application</text>
        
        {/* Detonation */}
        <rect x="290" y="15" width="250" height="100" fill="#fecaca" stroke="#ef4444" strokeWidth="2" rx="8" />
        <text x="415" y="35" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">DETONATION</text>
        <text x="415" y="52" textAnchor="middle" fill="#dc2626" fontSize="10">(In-Line)</text>
        <text x="415" y="72" textAnchor="middle" fill="#7f1d1d" fontSize="9">• In piping with run-up distance</text>
        <text x="415" y="87" textAnchor="middle" fill="#7f1d1d" fontSize="9">• Supersonic flame speed possible</text>
        <text x="415" y="102" textAnchor="middle" fill="#7f1d1d" fontSize="9">• More robust construction</text>
      </g>

      {/* Key Point */}
      <rect x="50" y="405" width="600" height="35" fill="#ecfdf5" stroke="#10b981" rx="4" />
      <text x="350" y="420" textAnchor="middle" fill="#047857" fontSize="10">
        MESG = Maximum Experimental Safe Gap — Arrester passages must be smaller than the MESG for the gas
      </text>
      <text x="350" y="433" textAnchor="middle" fill="#047857" fontSize="9">
        Always match arrester rating to the most restrictive gas that could be present
      </text>
    </svg>
  );
}
