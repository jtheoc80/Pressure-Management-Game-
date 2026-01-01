"use client";

import React from "react";

export function PsigPsiaDiagram() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-2xl mx-auto">
      <defs>
        <linearGradient id="scaleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#003366" />
          <stop offset="100%" stopColor="#0066cc" />
        </linearGradient>
        <marker id="arrowPsia" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#003366" />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="600" height="400" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="300" y="35" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        Gauge Pressure vs Absolute Pressure
      </text>

      {/* Pressure Scale - Absolute */}
      <rect x="80" y="60" width="60" height="280" fill="url(#scaleGradient)" rx="4" />
      <text x="110" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PSIA</text>
      
      {/* Scale markings - PSIA */}
      <line x1="140" y1="340" x2="155" y2="340" stroke="#003366" strokeWidth="2" />
      <text x="160" y="344" fill="#003366" fontSize="11">0 psia (Perfect Vacuum)</text>
      
      <line x1="140" y1="280" x2="155" y2="280" stroke="#003366" strokeWidth="2" />
      <text x="160" y="284" fill="#003366" fontSize="11" fontWeight="bold">14.7 psia (Atmospheric)</text>
      
      <line x1="140" y1="190" x2="155" y2="190" stroke="#003366" strokeWidth="2" />
      <text x="160" y="194" fill="#003366" fontSize="11">114.7 psia</text>

      {/* Pressure Scale - Gauge */}
      <rect x="380" y="60" width="60" height="280" fill="#6b7280" rx="4" />
      <text x="410" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PSIG</text>
      
      {/* Scale markings - PSIG */}
      <line x1="365" y1="340" x2="380" y2="340" stroke="#6b7280" strokeWidth="2" />
      <text x="360" y="344" textAnchor="end" fill="#6b7280" fontSize="11">-14.7 psig</text>
      
      <line x1="365" y1="280" x2="380" y2="280" stroke="#6b7280" strokeWidth="2" />
      <text x="360" y="284" textAnchor="end" fill="#6b7280" fontSize="11" fontWeight="bold">0 psig (Atmospheric)</text>
      
      <line x1="365" y1="190" x2="380" y2="190" stroke="#6b7280" strokeWidth="2" />
      <text x="360" y="194" textAnchor="end" fill="#6b7280" fontSize="11">100 psig</text>

      {/* Connection arrows */}
      <path d="M155 280 L365 280" stroke="#003366" strokeWidth="1.5" strokeDasharray="5,3" />
      <circle cx="155" cy="280" r="4" fill="#003366" />
      <circle cx="365" cy="280" r="4" fill="#6b7280" />

      {/* Conversion formulas */}
      <rect x="170" y="360" width="260" height="35" fill="#e0f2fe" rx="4" stroke="#0284c7" />
      <text x="300" y="382" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
        psia = psig + 14.7
      </text>

      {/* Annotations */}
      <g transform="translate(480, 120)">
        <rect x="0" y="0" width="100" height="80" fill="#fef3c7" rx="4" stroke="#f59e0b" />
        <text x="50" y="20" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">KEY POINT</text>
        <text x="50" y="38" textAnchor="middle" fill="#78350f" fontSize="9">Gas equations</text>
        <text x="50" y="52" textAnchor="middle" fill="#78350f" fontSize="9">require absolute</text>
        <text x="50" y="66" textAnchor="middle" fill="#78350f" fontSize="9">pressure (psia)</text>
      </g>

      {/* Example calculation */}
      <g transform="translate(80, 365)">
        <text x="0" y="25" fill="#64748b" fontSize="10">
          Example: 100 psig vessel → 100 + 14.7 = 114.7 psia
        </text>
      </g>
    </svg>
  );
}
