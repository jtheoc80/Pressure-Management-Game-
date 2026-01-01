"use client";

import React from "react";

export function PVVentCategoriesDiagram() {
  return (
    <svg viewBox="0 0 700 420" className="w-full h-auto max-w-3xl mx-auto">
      {/* Background */}
      <rect x="0" y="0" width="700" height="420" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        P/V Vent vs Emergency Vent Categories
      </text>

      {/* Normal Venting Section */}
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="300" height="170" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <text x="150" y="25" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">NORMAL VENTING</text>
        <text x="150" y="42" textAnchor="middle" fill="#1e40af" fontSize="10">(P/V Relief Valve - PVRV)</text>
        
        {/* PVRV illustration */}
        <g transform="translate(120, 55)">
          <rect x="0" y="20" width="60" height="50" fill="#94a3b8" stroke="#64748b" strokeWidth="2" rx="4" />
          {/* Pressure pallet */}
          <rect x="5" y="0" width="20" height="20" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
          <text x="15" y="35" textAnchor="middle" fill="white" fontSize="8">P</text>
          {/* Vacuum pallet */}
          <rect x="35" y="0" width="20" height="20" fill="#3b82f6" stroke="#2563eb" strokeWidth="1" />
          <text x="45" y="35" textAnchor="middle" fill="white" fontSize="8">V</text>
        </g>
        
        <text x="150" y="130" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Handles:</text>
        <text x="150" y="145" textAnchor="middle" fill="#475569" fontSize="9">• Thermal breathing (day/night)</text>
        <text x="150" y="160" textAnchor="middle" fill="#475569" fontSize="9">• Liquid fill/withdrawal</text>
      </g>

      {/* Emergency Venting Section */}
      <g transform="translate(370, 60)">
        <rect x="0" y="0" width="300" height="170" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
        <text x="150" y="25" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">EMERGENCY VENTING</text>
        <text x="150" y="42" textAnchor="middle" fill="#92400e" fontSize="10">(Fire Case Relief)</text>
        
        {/* Emergency vent illustration */}
        <g transform="translate(120, 55)">
          <rect x="0" y="20" width="60" height="50" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4" />
          {/* Large opening */}
          <ellipse cx="30" cy="10" rx="25" ry="8" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
          <text x="30" y="50" textAnchor="middle" fill="#92400e" fontSize="8">LARGE</text>
        </g>
        
        <text x="150" y="130" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Handles:</text>
        <text x="150" y="145" textAnchor="middle" fill="#78350f" fontSize="9">• External fire heat input</text>
        <text x="150" y="160" textAnchor="middle" fill="#78350f" fontSize="9">• Rapid vaporization</text>
      </g>

      {/* Comparison table */}
      <g transform="translate(30, 250)">
        <rect x="0" y="0" width="640" height="130" fill="white" stroke="#94a3b8" strokeWidth="1" rx="4" />
        
        {/* Header */}
        <rect x="0" y="0" width="640" height="25" fill="#003366" rx="4" />
        <text x="110" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Feature</text>
        <text x="320" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Normal (PVRV)</text>
        <text x="530" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Emergency Vent</text>
        
        {/* Rows */}
        <line x1="0" y1="50" x2="640" y2="50" stroke="#e2e8f0" />
        <line x1="0" y1="75" x2="640" y2="75" stroke="#e2e8f0" />
        <line x1="0" y1="100" x2="640" y2="100" stroke="#e2e8f0" />
        
        {/* Column dividers */}
        <line x1="213" y1="0" x2="213" y2="130" stroke="#e2e8f0" />
        <line x1="426" y1="0" x2="426" y2="130" stroke="#e2e8f0" />
        
        {/* Row 1 */}
        <text x="110" y="42" textAnchor="middle" fill="#475569" fontSize="10">Set Pressure</text>
        <text x="320" y="42" textAnchor="middle" fill="#475569" fontSize="10">Low (oz/sq in or in WC)</text>
        <text x="530" y="42" textAnchor="middle" fill="#475569" fontSize="10">Higher (lifts after PVRV)</text>
        
        {/* Row 2 */}
        <text x="110" y="67" textAnchor="middle" fill="#475569" fontSize="10">Capacity</text>
        <text x="320" y="67" textAnchor="middle" fill="#475569" fontSize="10">Normal operations</text>
        <text x="530" y="67" textAnchor="middle" fill="#475569" fontSize="10">Fire case (much larger)</text>
        
        {/* Row 3 */}
        <text x="110" y="92" textAnchor="middle" fill="#475569" fontSize="10">Opens During</text>
        <text x="320" y="92" textAnchor="middle" fill="#475569" fontSize="10">Daily operations</text>
        <text x="530" y="92" textAnchor="middle" fill="#475569" fontSize="10">Emergency only</text>
        
        {/* Row 4 */}
        <text x="110" y="117" textAnchor="middle" fill="#475569" fontSize="10">API Reference</text>
        <text x="320" y="117" textAnchor="middle" fill="#475569" fontSize="10">API 2000 Section 4</text>
        <text x="530" y="117" textAnchor="middle" fill="#475569" fontSize="10">API 2000 Section 5</text>
      </g>

      {/* Note */}
      <rect x="30" y="390" width="640" height="25" fill="#ecfdf5" stroke="#10b981" rx="4" />
      <text x="350" y="407" textAnchor="middle" fill="#047857" fontSize="10">
        Both types work together: Normal venting handles routine; Emergency handles fire case
      </text>
    </svg>
  );
}
