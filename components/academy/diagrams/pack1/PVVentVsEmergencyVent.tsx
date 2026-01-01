"use client";

import { COLORS } from "@/lib/psv/brand";

export default function PVVentVsEmergencyVent() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-auto">
      <defs>
        <pattern id="grid-pvev" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill="#f8fafc" />
      <rect width="800" height="450" fill="url(#grid-pvev)" />

      {/* Title */}
      <text x="400" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PV Vent vs Emergency Vent
      </text>
      <text x="400" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Different devices for different scenarios
      </text>

      {/* PV Vent Side */}
      <g transform="translate(50, 80)">
        <rect x="0" y="0" width="320" height="340" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="320" height="35" rx="8" fill="#dbeafe" />
        <rect x="0" y="27" width="320" height="8" fill="#dbeafe" />
        <text x="160" y="24" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="600">
          PV Vent (Pressure/Vacuum)
        </text>

        {/* PV Vent diagram */}
        <g transform="translate(80, 60)">
          {/* Device body */}
          <rect x="40" y="0" width="80" height="100" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" rx="4" />
          
          {/* Pressure pallet */}
          <rect x="55" y="15" width="50" height="8" fill="#3b82f6" rx="2" />
          <circle cx="80" cy="12" r="6" fill="#3b82f6" />
          <text x="80" y="40" textAnchor="middle" fill={COLORS.navy} fontSize="8">P pallet</text>
          
          {/* Vacuum pallet */}
          <rect x="55" y="60" width="50" height="8" fill="#22c55e" rx="2" />
          <circle cx="80" cy="72" r="6" fill="#22c55e" />
          <text x="80" y="85" textAnchor="middle" fill={COLORS.navy} fontSize="8">V pallet</text>
          
          {/* Connection to tank */}
          <rect x="60" y="100" width="40" height="30" fill={COLORS.grayLighter} stroke={COLORS.navy} />
          <text x="80" y="140" textAnchor="middle" fill={COLORS.gray} fontSize="8">to tank</text>
        </g>

        {/* Specifications */}
        <text x="20" y="225" fill={COLORS.navy} fontSize="11" fontWeight="600">Purpose:</text>
        <text x="20" y="242" fill={COLORS.gray} fontSize="10">Normal breathing relief</text>
        
        <text x="20" y="265" fill={COLORS.navy} fontSize="11" fontWeight="600">Scenarios:</text>
        <text x="20" y="282" fill={COLORS.gray} fontSize="10">• Thermal breathing (day/night)</text>
        <text x="20" y="297" fill={COLORS.gray} fontSize="10">• Pumping in/out operations</text>
        
        <text x="20" y="320" fill={COLORS.navy} fontSize="11" fontWeight="600">Set Points:</text>
        <text x="20" y="337" fill={COLORS.gray} fontSize="10">• Pressure: +0.5 to +2 oz/sq in</text>
        <text x="20" y="352" fill={COLORS.gray} fontSize="10">• Vacuum: -0.5 to -2 oz/sq in</text>
      </g>

      {/* Emergency Vent Side */}
      <g transform="translate(430, 80)">
        <rect x="0" y="0" width="320" height="340" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="320" height="35" rx="8" fill="#fee2e2" />
        <rect x="0" y="27" width="320" height="8" fill="#fee2e2" />
        <text x="160" y="24" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="600">
          Emergency Vent
        </text>

        {/* Emergency vent diagram */}
        <g transform="translate(80, 60)">
          {/* Large opening with hinged cover */}
          <rect x="20" y="40" width="120" height="60" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" rx="4" />
          
          {/* Hinged cover - lifted */}
          <path d="M 20 40 L 50 10 L 170 10 L 140 40" fill="#f59e0b" stroke={COLORS.navy} strokeWidth="2" />
          
          {/* Hinge point */}
          <circle cx="140" cy="40" r="5" fill={COLORS.navy} />
          
          {/* Flames/vapor escaping */}
          <path d="M 60 10 Q 70 -10 80 10 Q 90 -5 100 10" fill="none" stroke="#f59e0b" strokeWidth="2" />
          
          <rect x="50" y="100" width="60" height="30" fill={COLORS.grayLighter} stroke={COLORS.navy} />
          <text x="80" y="140" textAnchor="middle" fill={COLORS.gray} fontSize="8">to tank</text>
        </g>

        {/* Specifications */}
        <text x="20" y="225" fill={COLORS.navy} fontSize="11" fontWeight="600">Purpose:</text>
        <text x="20" y="242" fill={COLORS.gray} fontSize="10">Fire case relief - LARGE capacity</text>
        
        <text x="20" y="265" fill={COLORS.navy} fontSize="11" fontWeight="600">Scenarios:</text>
        <text x="20" y="282" fill={COLORS.gray} fontSize="10">• External fire exposure</text>
        <text x="20" y="297" fill={COLORS.gray} fontSize="10">• Boilover conditions</text>
        
        <text x="20" y="320" fill={COLORS.navy} fontSize="11" fontWeight="600">Set Point:</text>
        <text x="20" y="337" fill={COLORS.gray} fontSize="10">• Higher than PV vent</text>
        <text x="20" y="352" fill={COLORS.gray} fontSize="10">• Opens fully for maximum flow</text>
      </g>

      {/* Comparison summary */}
      <g transform="translate(200, 430)">
        <rect x="0" y="0" width="400" height="25" rx="4" fill={COLORS.navy} />
        <text x="200" y="17" textAnchor="middle" fill="white" fontSize="11">
          Both are needed: PV for daily ops, Emergency for fire protection
        </text>
      </g>
    </svg>
  );
}
