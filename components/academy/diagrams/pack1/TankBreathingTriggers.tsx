"use client";

import { COLORS } from "@/lib/psv/brand";

export default function TankBreathingTriggers() {
  return (
    <svg viewBox="0 0 800 420" className="w-full h-auto">
      <defs>
        <pattern id="grid-tbt" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="420" fill="#f8fafc" />
      <rect width="800" height="420" fill="url(#grid-tbt)" />

      {/* Title */}
      <text x="400" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Tank Breathing Triggers
      </text>
      <text x="400" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        What causes inbreathing and outbreathing?
      </text>

      {/* Outbreathing section */}
      <g transform="translate(50, 80)">
        <rect x="0" y="0" width="330" height="300" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="330" height="35" rx="8" fill="#fee2e2" />
        <rect x="0" y="27" width="330" height="8" fill="#fee2e2" />
        <text x="165" y="24" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="600">
          OUTBREATHING (Pressure)
        </text>

        {/* Tank diagram showing expansion */}
        <g transform="translate(115, 55)">
          <rect x="0" y="0" width="100" height="80" fill="#fef3c7" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          <rect x="5" y="40" width="90" height="38" fill="#60a5fa" rx="2" />
          <text x="50" y="25" textAnchor="middle" fill="#92400e" fontSize="9">Vapor expanding</text>
          <path d="M 50 -5 Q 40 -20 50 -35 Q 60 -20 50 -5" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="50" y="-40" textAnchor="middle" fill="#dc2626" fontSize="8">Vent out</text>
        </g>

        {/* Causes */}
        <text x="20" y="165" fill={COLORS.navy} fontSize="12" fontWeight="600">Causes:</text>
        
        <g transform="translate(30, 180)">
          <circle cx="8" cy="8" r="6" fill="#f59e0b" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">☀</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Solar heating (daytime)</text>
        </g>
        
        <g transform="translate(30, 205)">
          <circle cx="8" cy="8" r="6" fill="#3b82f6" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">↓</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Pumping liquid IN</text>
        </g>
        
        <g transform="translate(30, 230)">
          <circle cx="8" cy="8" r="6" fill="#dc2626" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">🔥</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Fire exposure (emergency)</text>
        </g>
        
        <g transform="translate(30, 255)">
          <circle cx="8" cy="8" r="6" fill="#8b5cf6" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">⚗</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Flash vaporization</text>
        </g>

        <text x="20" y="290" fill="#dc2626" fontSize="10" fontWeight="500">
          → Requires PRESSURE relief capacity
        </text>
      </g>

      {/* Inbreathing section */}
      <g transform="translate(420, 80)">
        <rect x="0" y="0" width="330" height="300" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="330" height="35" rx="8" fill="#dbeafe" />
        <rect x="0" y="27" width="330" height="8" fill="#dbeafe" />
        <text x="165" y="24" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="600">
          INBREATHING (Vacuum)
        </text>

        {/* Tank diagram showing contraction */}
        <g transform="translate(115, 55)">
          <rect x="0" y="0" width="100" height="80" fill="#dbeafe" stroke={COLORS.navy} strokeWidth="2" rx="4" />
          <rect x="5" y="40" width="90" height="38" fill="#60a5fa" rx="2" />
          <text x="50" y="25" textAnchor="middle" fill="#1e40af" fontSize="9">Vapor contracting</text>
          <path d="M 50 -35 Q 40 -20 50 -5 Q 60 -20 50 -35" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <text x="50" y="-40" textAnchor="middle" fill="#3b82f6" fontSize="8">Air in</text>
        </g>

        {/* Causes */}
        <text x="20" y="165" fill={COLORS.navy} fontSize="12" fontWeight="600">Causes:</text>
        
        <g transform="translate(30, 180)">
          <circle cx="8" cy="8" r="6" fill="#6366f1" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">🌙</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Cooling (nighttime)</text>
        </g>
        
        <g transform="translate(30, 205)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">↑</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Pumping liquid OUT</text>
        </g>
        
        <g transform="translate(30, 230)">
          <circle cx="8" cy="8" r="6" fill="#f59e0b" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">⛈</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Sudden rainstorm cooling</text>
        </g>
        
        <g transform="translate(30, 255)">
          <circle cx="8" cy="8" r="6" fill="#ec4899" />
          <text x="8" y="12" textAnchor="middle" fill="white" fontSize="8">💨</text>
          <text x="25" y="12" fill={COLORS.gray} fontSize="10">Condensation of vapor</text>
        </g>

        <text x="20" y="290" fill="#1e40af" fontSize="10" fontWeight="500">
          → Requires VACUUM relief capacity
        </text>
      </g>

      {/* Bottom note */}
      <g transform="translate(100, 395)">
        <rect x="0" y="0" width="600" height="25" rx="4" fill={COLORS.navy} />
        <text x="300" y="17" textAnchor="middle" fill="white" fontSize="11">
          API 2000 provides formulas to calculate both outbreathing and inbreathing rates
        </text>
      </g>
    </svg>
  );
}
