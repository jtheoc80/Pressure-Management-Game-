"use client";

import { COLORS } from "@/lib/psv/brand";

export default function LiquidPropsCard() {
  return (
    <svg viewBox="0 0 700 380" className="w-full h-auto">
      <defs>
        <pattern id="grid-lp" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="700" height="380" fill="#f8fafc" />
      <rect width="700" height="380" fill="url(#grid-lp)" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Liquid Properties for PSV Sizing
      </text>

      {/* Property cards */}
      {/* Specific Gravity */}
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="200" height="120" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#3b82f6" />
        <rect x="0" y="15" width="200" height="15" fill="#3b82f6" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Specific Gravity (G)
        </text>
        <text x="100" y="52" textAnchor="middle" fill={COLORS.navy} fontSize="11">Ratio vs water at 60°F</text>
        <text x="100" y="72" textAnchor="middle" fill={COLORS.gray} fontSize="10">Water = 1.0</text>
        <text x="100" y="89" textAnchor="middle" fill={COLORS.gray} fontSize="10">Higher G = larger orifice</text>
        <text x="100" y="106" textAnchor="middle" fill={COLORS.gray} fontSize="10">(appears in √G in formula)</text>
      </g>

      {/* Viscosity */}
      <g transform="translate(250, 60)">
        <rect x="0" y="0" width="200" height="120" rx="8" fill="white" stroke="#22c55e" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#22c55e" />
        <rect x="0" y="15" width="200" height="15" fill="#22c55e" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Viscosity (μ)
        </text>
        <text x="100" y="52" textAnchor="middle" fill={COLORS.navy} fontSize="11">Units: cP (centipoise)</text>
        <text x="100" y="72" textAnchor="middle" fill={COLORS.gray} fontSize="10">Water ~1 cP at 68°F</text>
        <text x="100" y="89" textAnchor="middle" fill={COLORS.gray} fontSize="10">High μ = Kv correction &lt;1</text>
        <text x="100" y="106" textAnchor="middle" fill={COLORS.gray} fontSize="10">Check Re &gt; 16,000</text>
      </g>

      {/* ΔP */}
      <g transform="translate(470, 60)">
        <rect x="0" y="0" width="200" height="120" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="30" rx="8" fill="#f59e0b" />
        <rect x="0" y="15" width="200" height="15" fill="#f59e0b" />
        <text x="100" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          ΔP (Pressure Drop)
        </text>
        <text x="100" y="52" textAnchor="middle" fill={COLORS.navy} fontSize="11">P₁ − P₂ (psi)</text>
        <text x="100" y="72" textAnchor="middle" fill={COLORS.gray} fontSize="10">P₁ = Relieving pressure</text>
        <text x="100" y="89" textAnchor="middle" fill={COLORS.gray} fontSize="10">P₂ = Back pressure</text>
        <text x="100" y="106" textAnchor="middle" fill={COLORS.gray} fontSize="10">√ΔP appears in formula</text>
      </g>

      {/* Visual: water vs heavy oil comparison */}
      <g transform="translate(50, 200)">
        <text x="125" y="0" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Viscosity Impact on Flow
        </text>
        
        {/* Water - fast flow */}
        <rect x="0" y="20" width="120" height="50" rx="4" fill="#dbeafe" stroke="#3b82f6" />
        <text x="60" y="45" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="500">Water</text>
        <text x="60" y="60" textAnchor="middle" fill="#1e40af" fontSize="10">μ ≈ 1 cP</text>
        
        <path d="M 130 45 L 175 45" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrow-fast)" />
        <text x="152" y="35" textAnchor="middle" fill="#3b82f6" fontSize="9">Fast</text>

        {/* Heavy oil - slow flow */}
        <rect x="0" y="85" width="120" height="50" rx="4" fill="#fef3c7" stroke="#f59e0b" />
        <text x="60" y="110" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="500">Heavy Oil</text>
        <text x="60" y="125" textAnchor="middle" fill="#92400e" fontSize="10">μ ≈ 1000 cP</text>
        
        <path d="M 130 110 L 155 110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-slow)" />
        <text x="142" y="100" textAnchor="middle" fill="#f59e0b" fontSize="9">Slow</text>
      </g>

      {/* Key formula */}
      <g transform="translate(320, 200)">
        <rect x="0" y="0" width="330" height="80" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="1.5" />
        <text x="165" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="12" fontWeight="600">
          Liquid Relief Sizing (Simplified)
        </text>
        <text x="165" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="14" fontFamily="monospace">
          A = Q × √(G / ΔP) × (1/38 Kd Kw Kc Kv)
        </text>
        <text x="165" y="70" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Q = flow (gpm), G = sp.gr., ΔP = pressure drop (psi)
        </text>
      </g>

      {/* Correction factors */}
      <g transform="translate(50, 305)">
        <rect x="0" y="0" width="600" height="65" rx="6" fill="#ecfdf5" stroke="#10b981" />
        <text x="300" y="20" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
          Liquid Sizing Correction Factors
        </text>
        <text x="100" y="42" textAnchor="middle" fill="#047857" fontSize="10">Kd = discharge (0.65)</text>
        <text x="250" y="42" textAnchor="middle" fill="#047857" fontSize="10">Kw = backpressure</text>
        <text x="400" y="42" textAnchor="middle" fill="#047857" fontSize="10">Kc = rupture disk</text>
        <text x="550" y="42" textAnchor="middle" fill="#047857" fontSize="10">Kv = viscosity</text>
        <text x="300" y="58" textAnchor="middle" fill="#065f46" fontSize="9">
          Kv requires iterative calculation based on Reynolds number
        </text>
      </g>

      <defs>
        <marker id="arrow-fast" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
        </marker>
        <marker id="arrow-slow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}
