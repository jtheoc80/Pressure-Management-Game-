"use client";

import { COLORS } from "@/lib/psv/brand";

export default function GaugeTypesComparison() {
  return (
    <svg viewBox="0 0 850 500" className="w-full h-auto">
      <defs>
        <pattern id="grid-gtc" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="500" fill="#f8fafc" />
      <rect width="850" height="500" fill="url(#grid-gtc)" />

      {/* Title */}
      <text x="425" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Tank Level Gauge Types
      </text>
      <text x="425" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Common measurement technologies
      </text>

      {/* Float/Tape Gauge */}
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="250" height="200" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="250" height="30" rx="8" fill="#dbeafe" />
        <rect x="0" y="22" width="250" height="8" fill="#dbeafe" />
        <text x="125" y="22" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="600">
          Float &amp; Tape (Mechanical)
        </text>

        {/* Visual */}
        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="60" height="100" fill="#dbeafe" stroke={COLORS.navy} rx="4" />
          <rect x="5" y="50" width="50" height="48" fill="#60a5fa" rx="2" />
          <ellipse cx="30" cy="52" rx="20" ry="5" fill="#fef3c7" stroke={COLORS.navy} />
          <line x1="30" y1="47" x2="30" y2="0" stroke={COLORS.navy} strokeWidth="2" />
          <text x="30" y="80" textAnchor="middle" fill="white" fontSize="8">Float</text>
        </g>

        <text x="110" y="75" fill={COLORS.gray} fontSize="9">• Float rides on liquid</text>
        <text x="110" y="92" fill={COLORS.gray} fontSize="9">• Tape connects to gauge</text>
        <text x="110" y="109" fill={COLORS.gray} fontSize="9">• Direct reading</text>
        <text x="110" y="126" fill={COLORS.gray} fontSize="9">• Simple, reliable</text>
        
        <text x="20" y="165" fill="#22c55e" fontSize="9" fontWeight="500">✓ Low cost, proven</text>
        <text x="20" y="182" fill="#dc2626" fontSize="9" fontWeight="500">✗ Moving parts wear</text>
      </g>

      {/* Radar Gauge */}
      <g transform="translate(300, 80)">
        <rect x="0" y="0" width="250" height="200" rx="8" fill="white" stroke="#22c55e" strokeWidth="2" />
        <rect x="0" y="0" width="250" height="30" rx="8" fill="#dcfce7" />
        <rect x="0" y="22" width="250" height="8" fill="#dcfce7" />
        <text x="125" y="22" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="600">
          Radar (Non-Contact)
        </text>

        {/* Visual */}
        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="60" height="100" fill="#dcfce7" stroke={COLORS.navy} rx="4" />
          <rect x="5" y="60" width="50" height="38" fill="#60a5fa" rx="2" />
          <rect x="20" y="5" width="20" height="15" fill="#22c55e" />
          <path d="M 30 20 L 20 55 M 30 20 L 40 55" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,2" />
          <text x="30" y="85" textAnchor="middle" fill="white" fontSize="8">Level</text>
        </g>

        <text x="110" y="75" fill={COLORS.gray} fontSize="9">• Microwave pulses</text>
        <text x="110" y="92" fill={COLORS.gray} fontSize="9">• Measures reflection time</text>
        <text x="110" y="109" fill={COLORS.gray} fontSize="9">• No contact with liquid</text>
        <text x="110" y="126" fill={COLORS.gray} fontSize="9">• High accuracy</text>
        
        <text x="20" y="165" fill="#22c55e" fontSize="9" fontWeight="500">✓ No moving parts</text>
        <text x="20" y="182" fill="#dc2626" fontSize="9" fontWeight="500">✗ Higher cost</text>
      </g>

      {/* Servo Gauge */}
      <g transform="translate(570, 80)">
        <rect x="0" y="0" width="250" height="200" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="250" height="30" rx="8" fill="#fef3c7" />
        <rect x="0" y="22" width="250" height="8" fill="#fef3c7" />
        <text x="125" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">
          Servo (Hybrid)
        </text>

        {/* Visual */}
        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="60" height="100" fill="#fef3c7" stroke={COLORS.navy} rx="4" />
          <rect x="5" y="55" width="50" height="43" fill="#60a5fa" rx="2" />
          <rect x="20" y="5" width="20" height="15" fill="#f59e0b" />
          <line x1="30" y1="20" x2="30" y2="50" stroke={COLORS.navy} strokeWidth="1" />
          <ellipse cx="30" cy="52" rx="8" ry="3" fill="#f59e0b" stroke={COLORS.navy} />
          <text x="30" y="80" textAnchor="middle" fill="white" fontSize="7">Displacer</text>
        </g>

        <text x="110" y="75" fill={COLORS.gray} fontSize="9">• Motor-driven wire</text>
        <text x="110" y="92" fill={COLORS.gray} fontSize="9">• Displacer touches surface</text>
        <text x="110" y="109" fill={COLORS.gray} fontSize="9">• Detects buoyancy change</text>
        <text x="110" y="126" fill={COLORS.gray} fontSize="9">• Very high accuracy</text>
        
        <text x="20" y="165" fill="#22c55e" fontSize="9" fontWeight="500">✓ Custody transfer grade</text>
        <text x="20" y="182" fill="#dc2626" fontSize="9" fontWeight="500">✗ Most expensive</text>
      </g>

      {/* Comparison table */}
      <g transform="translate(30, 300)">
        <rect x="0" y="0" width="790" height="180" rx="8" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="0" width="790" height="30" rx="8" fill={COLORS.navy} />
        <rect x="0" y="22" width="790" height="8" fill={COLORS.navy} />
        <text x="395" y="22" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          Comparison Summary
        </text>

        {/* Headers */}
        <text x="100" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Feature</text>
        <text x="270" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Float/Tape</text>
        <text x="470" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Radar</text>
        <text x="670" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="600">Servo</text>
        
        <line x1="20" y1="65" x2="770" y2="65" stroke={COLORS.grayLight} />
        
        {/* Data rows */}
        <text x="100" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">Accuracy</text>
        <text x="270" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">± 1/4&quot;</text>
        <text x="470" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">± 1/8&quot;</text>
        <text x="670" y="85" textAnchor="middle" fill={COLORS.gray} fontSize="10">± 1/16&quot;</text>
        
        <text x="100" y="105" textAnchor="middle" fill={COLORS.gray} fontSize="10">Moving Parts</text>
        <text x="270" y="105" textAnchor="middle" fill={COLORS.gray} fontSize="10">Yes</text>
        <text x="470" y="105" textAnchor="middle" fill={COLORS.gray} fontSize="10">No</text>
        <text x="670" y="105" textAnchor="middle" fill={COLORS.gray} fontSize="10">Yes</text>
        
        <text x="100" y="125" textAnchor="middle" fill={COLORS.gray} fontSize="10">Maintenance</text>
        <text x="270" y="125" textAnchor="middle" fill={COLORS.gray} fontSize="10">Moderate</text>
        <text x="470" y="125" textAnchor="middle" fill={COLORS.gray} fontSize="10">Low</text>
        <text x="670" y="125" textAnchor="middle" fill={COLORS.gray} fontSize="10">High</text>
        
        <text x="100" y="145" textAnchor="middle" fill={COLORS.gray} fontSize="10">Relative Cost</text>
        <text x="270" y="145" textAnchor="middle" fill={COLORS.gray} fontSize="10">$</text>
        <text x="470" y="145" textAnchor="middle" fill={COLORS.gray} fontSize="10">$$</text>
        <text x="670" y="145" textAnchor="middle" fill={COLORS.gray} fontSize="10">$$$</text>
        
        <text x="100" y="165" textAnchor="middle" fill={COLORS.gray} fontSize="10">Best For</text>
        <text x="270" y="165" textAnchor="middle" fill={COLORS.gray} fontSize="9">Basic inventory</text>
        <text x="470" y="165" textAnchor="middle" fill={COLORS.gray} fontSize="9">General purpose</text>
        <text x="670" y="165" textAnchor="middle" fill={COLORS.gray} fontSize="9">Custody transfer</text>
      </g>
    </svg>
  );
}
