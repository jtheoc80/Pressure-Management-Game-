"use client";

import React from "react";

export function EmergencyVentDiagram() {
  return (
    <svg viewBox="0 0 700 420" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Background */}
      <rect x="0" y="0" width="700" height="420" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        Emergency Venting for Fire Case
      </text>

      {/* Tank with fire */}
      <g transform="translate(100, 80)">
        {/* Tank shell */}
        <ellipse cx="150" cy="20" rx="100" ry="20" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
        <rect x="50" y="20" width="200" height="180" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
        <ellipse cx="150" cy="200" rx="100" ry="20" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
        
        {/* Liquid level */}
        <rect x="52" y="100" width="196" height="100" fill="#60a5fa" opacity="0.5" />
        <text x="150" y="155" textAnchor="middle" fill="#1e40af" fontSize="10">Liquid Contents</text>
        
        {/* Wetted area annotation */}
        <path d="M260 100 L280 100 L280 200 L260 200" fill="none" stroke="#dc2626" strokeWidth="2" />
        <text x="290" y="150" fill="#dc2626" fontSize="9" fontWeight="bold">Wetted</text>
        <text x="290" y="162" fill="#dc2626" fontSize="9" fontWeight="bold">Area</text>
        
        {/* Fire around tank */}
        <g>
          {[40, 80, 120, 160, 200, 240].map((x, i) => (
            <g key={i} transform={`translate(${x}, 220)`}>
              <ellipse cx="0" cy="-10" rx="15" ry="25" fill="#fbbf24" opacity="0.7" />
              <ellipse cx="0" cy="-10" rx="10" ry="18" fill="#f97316" opacity="0.8" />
              <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#ef4444" />
            </g>
          ))}
        </g>
        <text x="150" y="260" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
          EXTERNAL FIRE
        </text>
        
        {/* Normal PVRV */}
        <rect x="90" y="-30" width="30" height="50" fill="#94a3b8" stroke="#64748b" strokeWidth="2" rx="2" />
        <text x="105" y="-35" textAnchor="middle" fill="#64748b" fontSize="8">PVRV</text>
        
        {/* Emergency vent */}
        <rect x="170" y="-30" width="50" height="50" fill="#f97316" stroke="#c2410c" strokeWidth="2" rx="2" />
        <text x="195" y="-35" textAnchor="middle" fill="#c2410c" fontSize="8" fontWeight="bold">EMERG</text>
        
        {/* Vapor flow arrows */}
        <path d="M105 -30 L105 -50" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#emergArrow)" />
        <path d="M195 -30 L195 -50 L195 -70" stroke="#f97316" strokeWidth="3" markerEnd="url(#emergArrowLg)" />
        
        <defs>
          <marker id="emergArrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
          </marker>
          <marker id="emergArrowLg" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
          </marker>
        </defs>
      </g>

      {/* Capacity comparison */}
      <g transform="translate(400, 80)">
        <text x="130" y="0" textAnchor="middle" fill="#003366" fontSize="12" fontWeight="bold">
          Capacity Comparison
        </text>
        
        {/* Normal capacity bar */}
        <rect x="20" y="20" width="220" height="60" fill="#e2e8f0" stroke="#94a3b8" rx="4" />
        <rect x="22" y="22" width="60" height="56" fill="#3b82f6" rx="2" />
        <text x="130" y="45" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Normal PVRV</text>
        <text x="130" y="60" textAnchor="middle" fill="#64748b" fontSize="9">~50,000 SCFH</text>
        
        {/* Emergency capacity bar */}
        <rect x="20" y="100" width="220" height="60" fill="#fef3c7" stroke="#f59e0b" rx="4" />
        <rect x="22" y="102" width="200" height="56" fill="#f97316" rx="2" />
        <text x="130" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fire Case Required</text>
        <text x="130" y="140" textAnchor="middle" fill="white" fontSize="9">~180,000 SCFH</text>
        
        {/* Gap indicator */}
        <text x="130" y="185" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">
          Gap = Need Emergency Vent!
        </text>
      </g>

      {/* Emergency Vent Options */}
      <g transform="translate(30, 310)">
        <text x="320" y="0" textAnchor="middle" fill="#003366" fontSize="12" fontWeight="bold">
          Emergency Venting Options
        </text>
        
        <rect x="0" y="15" width="200" height="80" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" rx="4" />
        <text x="100" y="35" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Emergency Vent</text>
        <text x="100" y="52" textAnchor="middle" fill="#475569" fontSize="9">Dedicated large vent</text>
        <text x="100" y="67" textAnchor="middle" fill="#475569" fontSize="9">Lifts at ~1.5 oz/sq in</text>
        <text x="100" y="82" textAnchor="middle" fill="#3b82f6" fontSize="8">Primary solution</text>
        
        <rect x="220" y="15" width="200" height="80" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" rx="4" />
        <text x="320" y="35" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Gauge Hatch</text>
        <text x="320" y="52" textAnchor="middle" fill="#475569" fontSize="9">Lifts as backup</text>
        <text x="320" y="67" textAnchor="middle" fill="#475569" fontSize="9">At ~2.5 oz/sq in</text>
        <text x="320" y="82" textAnchor="middle" fill="#22c55e" fontSize="8">Additional capacity</text>
        
        <rect x="440" y="15" width="200" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="4" />
        <text x="540" y="35" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Frangible Joint</text>
        <text x="540" y="52" textAnchor="middle" fill="#475569" fontSize="9">Roof-to-shell seam</text>
        <text x="540" y="67" textAnchor="middle" fill="#475569" fontSize="9">Fails before shell</text>
        <text x="540" y="82" textAnchor="middle" fill="#f59e0b" fontSize="8">Last resort</text>
      </g>

      {/* API Reference */}
      <rect x="30" y="400" width="640" height="15" fill="#f1f5f9" rx="2" />
      <text x="350" y="412" textAnchor="middle" fill="#64748b" fontSize="9">
        Reference: API 2000 Section 5 - Emergency Venting for Fire Exposure
      </text>
    </svg>
  );
}
