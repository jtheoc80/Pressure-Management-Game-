"use client";

import { COLORS } from "@/lib/psv/brand";

export default function OverfillEventTimeline() {
  return (
    <svg viewBox="0 0 850 450" className="w-full h-auto">
      <defs>
        <pattern id="grid-oet" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="450" fill="#f8fafc" />
      <rect width="850" height="450" fill="url(#grid-oet)" />

      {/* Title */}
      <text x="425" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Overfill Event Timeline (API 2350)
      </text>
      <text x="425" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Progressive alert levels during tank filling
      </text>

      {/* Timeline base */}
      <g transform="translate(80, 100)">
        {/* Tank fill level scale */}
        <rect x="0" y="0" width="700" height="30" fill="#f1f5f9" stroke={COLORS.navy} strokeWidth="2" rx="4" />
        
        {/* Fill level gradient */}
        <rect x="2" y="2" width="696" height="26" rx="3" fill="url(#fill-gradient)" />
        
        {/* Level markers */}
        <line x1="200" y1="-5" x2="200" y2="35" stroke={COLORS.navy} strokeWidth="2" />
        <text x="200" y="-12" textAnchor="middle" fill={COLORS.navy} fontSize="10">Normal Max</text>
        <text x="200" y="50" textAnchor="middle" fill={COLORS.navy} fontSize="9">85%</text>
        
        <line x1="400" y1="-5" x2="400" y2="35" stroke="#f59e0b" strokeWidth="2" />
        <text x="400" y="-12" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="500">High Level</text>
        <text x="400" y="50" textAnchor="middle" fill="#f59e0b" fontSize="9">90%</text>
        
        <line x1="540" y1="-5" x2="540" y2="35" stroke="#dc2626" strokeWidth="2" />
        <text x="540" y="-12" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="600">High-High</text>
        <text x="540" y="50" textAnchor="middle" fill="#dc2626" fontSize="9">95%</text>
        
        <line x1="650" y1="-5" x2="650" y2="35" stroke="#7f1d1d" strokeWidth="3" />
        <text x="650" y="-12" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontWeight="700">CRITICAL</text>
        <text x="650" y="50" textAnchor="middle" fill="#7f1d1d" fontSize="9">98%+</text>
      </g>

      {/* Level cards */}
      {/* Normal */}
      <g transform="translate(30, 180)">
        <rect x="0" y="0" width="180" height="130" rx="8" fill="white" stroke="#22c55e" strokeWidth="2" />
        <rect x="0" y="0" width="180" height="30" rx="8" fill="#dcfce7" />
        <rect x="0" y="22" width="180" height="8" fill="#dcfce7" />
        <text x="90" y="22" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="600">NORMAL</text>
        <text x="15" y="55" fill={COLORS.gray} fontSize="10">Level: 0-85%</text>
        <text x="15" y="75" fill={COLORS.gray} fontSize="10">Action: None required</text>
        <text x="15" y="95" fill={COLORS.gray} fontSize="10">Status: Routine fill</text>
        <circle cx="150" cy="105" r="15" fill="#22c55e" />
        <text x="150" y="110" textAnchor="middle" fill="white" fontSize="10">✓</text>
      </g>

      {/* High */}
      <g transform="translate(230, 180)">
        <rect x="0" y="0" width="180" height="130" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="180" height="30" rx="8" fill="#fef3c7" />
        <rect x="0" y="22" width="180" height="8" fill="#fef3c7" />
        <text x="90" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">HIGH LEVEL</text>
        <text x="15" y="55" fill={COLORS.gray} fontSize="10">Level: 85-95%</text>
        <text x="15" y="75" fill={COLORS.gray} fontSize="10">Action: Operator alert</text>
        <text x="15" y="95" fill={COLORS.gray} fontSize="10">Prepare to stop fill</text>
        <circle cx="150" cy="105" r="15" fill="#f59e0b" />
        <text x="150" y="110" textAnchor="middle" fill="white" fontSize="10">!</text>
      </g>

      {/* High-High */}
      <g transform="translate(430, 180)">
        <rect x="0" y="0" width="180" height="130" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="180" height="30" rx="8" fill="#fee2e2" />
        <rect x="0" y="22" width="180" height="8" fill="#fee2e2" />
        <text x="90" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">HIGH-HIGH</text>
        <text x="15" y="55" fill={COLORS.gray} fontSize="10">Level: 95-98%</text>
        <text x="15" y="75" fill={COLORS.gray} fontSize="10">Action: STOP FILL</text>
        <text x="15" y="95" fill={COLORS.gray} fontSize="10">Automatic shutdown</text>
        <circle cx="150" cy="105" r="15" fill="#dc2626" />
        <text x="150" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">!</text>
      </g>

      {/* Critical */}
      <g transform="translate(630, 180)">
        <rect x="0" y="0" width="180" height="130" rx="8" fill="white" stroke="#7f1d1d" strokeWidth="3" />
        <rect x="0" y="0" width="180" height="30" rx="8" fill="#7f1d1d" />
        <rect x="0" y="22" width="180" height="8" fill="#7f1d1d" />
        <text x="90" y="22" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">CRITICAL</text>
        <text x="15" y="55" fill="#7f1d1d" fontSize="10" fontWeight="500">Level: 98%+</text>
        <text x="15" y="75" fill="#7f1d1d" fontSize="10" fontWeight="500">Emergency response</text>
        <text x="15" y="95" fill="#7f1d1d" fontSize="10" fontWeight="500">Imminent overflow</text>
        <circle cx="150" cy="105" r="15" fill="#7f1d1d" />
        <text x="150" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">X</text>
      </g>

      {/* Key points */}
      <g transform="translate(80, 330)">
        <rect x="0" y="0" width="330" height="100" rx="6" fill="white" stroke={COLORS.navy} />
        <text x="165" y="22" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          API 2350 Requirements
        </text>
        <text x="15" y="45" fill={COLORS.gray} fontSize="10">• Independent high level alarm</text>
        <text x="15" y="62" fill={COLORS.gray} fontSize="10">• Automatic overfill prevention (AOPS)</text>
        <text x="15" y="79" fill={COLORS.gray} fontSize="10">• Category 1/2/3 based on consequences</text>
        <text x="15" y="96" fill={COLORS.gray} fontSize="10">• Documented procedures at each level</text>
      </g>

      <g transform="translate(430, 330)">
        <rect x="0" y="0" width="330" height="100" rx="6" fill="#fee2e2" stroke="#dc2626" />
        <text x="165" y="22" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="600">
          Why This Matters
        </text>
        <text x="15" y="45" fill="#7f1d1d" fontSize="10">• Buncefield (2005): 20+ injuries,</text>
        <text x="15" y="62" fill="#7f1d1d" fontSize="10">  £1 billion+ damages</text>
        <text x="15" y="79" fill="#7f1d1d" fontSize="10">• Texas City, Deer Park incidents</text>
        <text x="15" y="96" fill="#7f1d1d" fontSize="10">• Regulatory fines &amp; criminal liability</text>
      </g>

      <defs>
        <linearGradient id="fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="50%" stopColor="#fef3c7" />
          <stop offset="80%" stopColor="#fee2e2" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
