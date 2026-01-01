"use client";

import { COLORS } from "@/lib/psv/brand";

export default function DatasheetMapLiquid() {
  return (
    <svg viewBox="0 0 850 500" className="w-full h-auto">
      <defs>
        <pattern id="grid-dsl" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="500" fill="#f8fafc" />
      <rect width="850" height="500" fill="url(#grid-dsl)" />

      {/* Title */}
      <text x="425" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PSV Datasheet Map: Liquid Service
      </text>
      <text x="425" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Key differences from gas/vapor sizing
      </text>

      {/* Datasheet representation */}
      <g transform="translate(50, 70)">
        {/* Header */}
        <rect x="0" y="0" width="550" height="35" rx="6" fill={COLORS.navy} />
        <text x="275" y="23" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          PRESSURE SAFETY VALVE DATASHEET - LIQUID SERVICE
        </text>

        {/* Pressure section */}
        <rect x="0" y="45" width="550" height="85" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="45" width="550" height="22" fill="#dbeafe" />
        <text x="275" y="62" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">
          PRESSURE DATA
        </text>
        <text x="15" y="88" fill={COLORS.navy} fontSize="10" fontWeight="500">Set Pressure (psig):</text>
        <rect x="115" y="76" width="60" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="195" y="88" fill={COLORS.navy} fontSize="10" fontWeight="500">Overpressure %:</text>
        <rect x="285" y="76" width="40" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="340" y="88" fill={COLORS.gray} fontSize="9">(typically 10% or 25%)</text>
        
        <text x="15" y="115" fill={COLORS.navy} fontSize="10" fontWeight="500">Backpressure (psig):</text>
        <rect x="120" y="103" width="60" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="200" y="115" fill={COLORS.navy} fontSize="10" fontWeight="500">ΔP = P₁ - P₂:</text>
        <rect x="275" y="103" width="60" height="18" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="355" y="115" fill="#166534" fontSize="9" fontWeight="500">← Liquid sizing uses ΔP</text>

        {/* Fluid properties - Liquid specific */}
        <rect x="0" y="140" width="550" height="100" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="140" width="550" height="22" fill="#fef3c7" />
        <text x="275" y="157" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">
          LIQUID PROPERTIES
        </text>
        
        <text x="15" y="182" fill={COLORS.navy} fontSize="10" fontWeight="500">Fluid:</text>
        <rect x="50" y="170" width="120" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        
        <text x="190" y="182" fill={COLORS.navy} fontSize="10" fontWeight="500">Specific Gravity (G):</text>
        <rect x="310" y="170" width="50" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="375" y="182" fill="#166534" fontSize="9" fontWeight="500">← Replaces MW for liquids</text>
        
        <text x="15" y="210" fill={COLORS.navy} fontSize="10" fontWeight="500">Viscosity (cP):</text>
        <rect x="90" y="198" width="60" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="165" y="210" fill={COLORS.gray} fontSize="9">@ relieving T</text>
        
        <text x="270" y="210" fill={COLORS.navy} fontSize="10" fontWeight="500">Flow (GPM):</text>
        <rect x="340" y="198" width="70" height="18" fill="#fef3c7" stroke="#f59e0b" />
        <text x="425" y="210" fill="#166534" fontSize="9" fontWeight="500">← GPM not lb/hr</text>

        {/* Correction factors */}
        <rect x="0" y="250" width="550" height="90" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="250" width="550" height="22" fill="#e0e7ff" />
        <text x="275" y="267" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="600">
          CORRECTION FACTORS (Liquid-Specific)
        </text>
        
        <text x="15" y="295" fill={COLORS.navy} fontSize="10" fontWeight="500">Kd (discharge):</text>
        <rect x="95" y="283" width="40" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="145" y="295" fill={COLORS.gray} fontSize="9">0.65 typ.</text>
        
        <text x="200" y="295" fill={COLORS.navy} fontSize="10" fontWeight="500">Kw (backpressure):</text>
        <rect x="305" y="283" width="40" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        
        <text x="370" y="295" fill={COLORS.navy} fontSize="10" fontWeight="500">Kc (rupture disk):</text>
        <rect x="465" y="283" width="40" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        
        <text x="15" y="325" fill={COLORS.navy} fontSize="10" fontWeight="500">Kv (viscosity correction):</text>
        <rect x="140" y="313" width="50" height="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="205" y="325" fill="#dc2626" fontSize="9" fontWeight="500">← Iterative! Requires Re check</text>

        {/* Sizing result */}
        <rect x="0" y="350" width="550" height="60" rx="4" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="350" width="550" height="22" fill="#dcfce7" />
        <text x="275" y="367" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">
          SIZING OUTPUT
        </text>
        <text x="15" y="395" fill={COLORS.navy} fontSize="10" fontWeight="500">Required Area:</text>
        <rect x="100" y="383" width="60" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="175" y="395" fill={COLORS.navy} fontSize="10" fontWeight="500">Selected Orifice:</text>
        <rect x="270" y="383" width="50" height="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="340" y="395" fill={COLORS.navy} fontSize="10" fontWeight="500">Reynolds #:</text>
        <rect x="410" y="383" width="70" height="18" fill="#f8fafc" stroke={COLORS.grayLight} />
        <text x="495" y="395" fill={COLORS.gray} fontSize="9">(verify &gt;16,000)</text>
      </g>

      {/* Side comparison */}
      <g transform="translate(620, 85)">
        <rect x="0" y="0" width="200" height="220" rx="6" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="0" width="200" height="25" rx="6" fill={COLORS.navy} />
        <rect x="0" y="18" width="200" height="7" fill={COLORS.navy} />
        <text x="100" y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
          Gas vs Liquid
        </text>
        
        <text x="15" y="48" fill={COLORS.navy} fontSize="10" fontWeight="600">Gas/Vapor:</text>
        <text x="15" y="65" fill={COLORS.gray} fontSize="9">• Uses MW, k, Z, T</text>
        <text x="15" y="80" fill={COLORS.gray} fontSize="9">• Flow in lb/hr or SCFH</text>
        <text x="15" y="95" fill={COLORS.gray} fontSize="9">• Critical flow equation</text>
        
        <line x1="15" y1="110" x2="185" y2="110" stroke={COLORS.grayLight} />
        
        <text x="15" y="130" fill={COLORS.navy} fontSize="10" fontWeight="600">Liquid:</text>
        <text x="15" y="147" fill={COLORS.gray} fontSize="9">• Uses SG, viscosity</text>
        <text x="15" y="162" fill={COLORS.gray} fontSize="9">• Flow in GPM</text>
        <text x="15" y="177" fill={COLORS.gray} fontSize="9">• √(ΔP) equation</text>
        <text x="15" y="192" fill={COLORS.gray} fontSize="9">• Kv requires iteration</text>
        <text x="15" y="207" fill="#dc2626" fontSize="9" fontWeight="500">• Check Re &gt; 16,000</text>
      </g>

      {/* Warning */}
      <g transform="translate(620, 320)">
        <rect x="0" y="0" width="200" height="80" rx="6" fill="#fef3c7" stroke={COLORS.warning} />
        <text x="100" y="22" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="600">
          ⚠️ Common Mistake
        </text>
        <text x="15" y="42" fill="#78350f" fontSize="9">Using gas equation for</text>
        <text x="15" y="55" fill="#78350f" fontSize="9">liquid service—results in</text>
        <text x="15" y="68" fill="#78350f" fontSize="9">GROSSLY undersized PSV!</text>
      </g>
    </svg>
  );
}
