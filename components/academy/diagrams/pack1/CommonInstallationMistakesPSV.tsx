"use client";

import { COLORS } from "@/lib/psv/brand";

export default function CommonInstallationMistakesPSV() {
  return (
    <svg viewBox="0 0 900 550" className="w-full h-auto">
      <defs>
        <pattern id="grid-cim" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="900" height="550" fill="#f8fafc" />
      <rect width="900" height="550" fill="url(#grid-cim)" />

      {/* Title */}
      <text x="450" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Common PSV Installation Mistakes
      </text>
      <text x="450" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Multi-panel guide to avoid costly errors
      </text>

      {/* Panel 1: Inlet piping too long */}
      <g transform="translate(30, 70)">
        <rect x="0" y="0" width="260" height="200" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="30" rx="8" fill="#fee2e2" />
        <rect x="0" y="22" width="260" height="8" fill="#fee2e2" />
        <text x="130" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">
          ❌ Excessive Inlet Loss
        </text>
        
        {/* Diagram */}
        <rect x="40" y="50" width="60" height="80" fill="#dbeafe" stroke={COLORS.navy} />
        <text x="70" y="95" textAnchor="middle" fill={COLORS.navy} fontSize="9">Vessel</text>
        
        {/* Long pipe */}
        <rect x="100" y="75" width="100" height="20" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        <text x="150" y="110" textAnchor="middle" fill="#dc2626" fontSize="9">Too long!</text>
        
        {/* PSV */}
        <rect x="200" y="60" width="30" height="50" fill={COLORS.navy} />
        <text x="215" y="90" textAnchor="middle" fill="white" fontSize="8">PSV</text>
        
        <text x="130" y="145" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Inlet ΔP &gt; 3% of set
        </text>
        <text x="130" y="162" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          causes chatter/instability
        </text>
        <text x="130" y="185" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          ✓ Keep inlet short &amp; direct
        </text>
      </g>

      {/* Panel 2: Block valve left closed */}
      <g transform="translate(310, 70)">
        <rect x="0" y="0" width="260" height="200" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="30" rx="8" fill="#fee2e2" />
        <rect x="0" y="22" width="260" height="8" fill="#fee2e2" />
        <text x="130" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">
          ❌ Block Valve Closed
        </text>
        
        {/* Diagram */}
        <rect x="40" y="55" width="50" height="70" fill="#dbeafe" stroke={COLORS.navy} />
        
        {/* Block valve - closed */}
        <rect x="100" y="75" width="30" height="30" fill="#dc2626" stroke={COLORS.navy} />
        <line x1="105" y1="80" x2="125" y2="100" stroke="white" strokeWidth="3" />
        <line x1="125" y1="80" x2="105" y2="100" stroke="white" strokeWidth="3" />
        
        <rect x="140" y="80" width="40" height="15" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        
        {/* PSV */}
        <rect x="180" y="60" width="30" height="50" fill={COLORS.navy} />
        <text x="195" y="90" textAnchor="middle" fill="white" fontSize="8">PSV</text>
        
        <text x="115" y="130" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="600">BLOCKED!</text>
        
        <text x="130" y="152" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          PSV is completely
        </text>
        <text x="130" y="167" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          isolated = NO protection
        </text>
        <text x="130" y="185" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          ✓ Use car-sealed-open (CSO)
        </text>
      </g>

      {/* Panel 3: Discharge pocket */}
      <g transform="translate(590, 70)">
        <rect x="0" y="0" width="260" height="200" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="30" rx="8" fill="#fee2e2" />
        <rect x="0" y="22" width="260" height="8" fill="#fee2e2" />
        <text x="130" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">
          ❌ Liquid Trap in Outlet
        </text>
        
        {/* PSV */}
        <rect x="60" y="50" width="30" height="50" fill={COLORS.navy} />
        <text x="75" y="80" textAnchor="middle" fill="white" fontSize="8">PSV</text>
        
        {/* Discharge piping with pocket */}
        <path d="M 90 75 L 130 75 L 130 120 L 180 120 L 180 75 L 220 75" 
              fill="none" stroke={COLORS.navy} strokeWidth="10" />
        
        {/* Water in pocket */}
        <ellipse cx="155" cy="115" rx="20" ry="8" fill="#60a5fa" />
        <text x="155" y="140" textAnchor="middle" fill="#dc2626" fontSize="9">Liquid collects</text>
        
        <text x="130" y="160" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Trapped liquid blocks
        </text>
        <text x="130" y="175" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          outlet or corrodes
        </text>
        <text x="130" y="193" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          ✓ Slope to drain, add weep
        </text>
      </g>

      {/* Panel 4: Wrong materials */}
      <g transform="translate(30, 290)">
        <rect x="0" y="0" width="260" height="200" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="30" rx="8" fill="#fee2e2" />
        <rect x="0" y="22" width="260" height="8" fill="#fee2e2" />
        <text x="130" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">
          ❌ Wrong Materials
        </text>
        
        {/* PSV with corrosion */}
        <rect x="100" y="55" width="60" height="80" fill={COLORS.navy} rx="4" />
        <text x="130" y="100" textAnchor="middle" fill="white" fontSize="10">PSV</text>
        
        {/* Corrosion spots */}
        <circle cx="105" cy="70" r="5" fill="#f59e0b" />
        <circle cx="150" cy="85" r="6" fill="#f59e0b" />
        <circle cx="115" cy="120" r="4" fill="#f59e0b" />
        
        <text x="130" y="152" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Carbon steel in sour or
        </text>
        <text x="130" y="167" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          corrosive service = failure
        </text>
        <text x="130" y="188" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          ✓ Match materials to fluid
        </text>
      </g>

      {/* Panel 5: Wrong set pressure */}
      <g transform="translate(310, 290)">
        <rect x="0" y="0" width="260" height="200" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="30" rx="8" fill="#fee2e2" />
        <rect x="0" y="22" width="260" height="8" fill="#fee2e2" />
        <text x="130" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="600">
          ❌ Set &gt; MAWP
        </text>
        
        {/* Scale */}
        <rect x="60" y="50" width="30" height="100" fill="#f1f5f9" stroke={COLORS.navy} />
        <rect x="60" y="60" width="30" height="20" fill="#fee2e2" />
        <text x="100" y="72" fill="#dc2626" fontSize="9">Set = 120</text>
        <rect x="60" y="85" width="30" height="2" fill={COLORS.navy} />
        <text x="100" y="90" fill={COLORS.navy} fontSize="9" fontWeight="500">MAWP = 100</text>
        
        <text x="180" y="90" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="700">!</text>
        
        <text x="130" y="165" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Vessel exceeds MAWP before
        </text>
        <text x="130" y="180" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          PSV opens = catastrophic risk
        </text>
        <text x="130" y="198" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          ✓ Set ≤ MAWP always
        </text>
      </g>

      {/* Panel 6: No inspection access */}
      <g transform="translate(590, 290)">
        <rect x="0" y="0" width="260" height="200" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="30" rx="8" fill="#fef3c7" />
        <rect x="0" y="22" width="260" height="8" fill="#fef3c7" />
        <text x="130" y="22" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="600">
          ⚠️ No Access for Testing
        </text>
        
        {/* Hard to reach PSV */}
        <rect x="80" y="60" width="100" height="60" fill={COLORS.grayLighter} stroke={COLORS.navy} />
        <text x="130" y="95" textAnchor="middle" fill={COLORS.gray} fontSize="9">Equipment</text>
        
        <rect x="115" y="40" width="30" height="25" fill={COLORS.navy} />
        <text x="130" y="57" textAnchor="middle" fill="white" fontSize="7">PSV</text>
        
        <text x="130" y="140" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          Difficult location prevents
        </text>
        <text x="130" y="155" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          routine inspection/testing
        </text>
        <text x="130" y="175" textAnchor="middle" fill={COLORS.gray} fontSize="10">
          May miss calibration issues
        </text>
        <text x="130" y="193" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">
          ✓ Plan access in design phase
        </text>
      </g>

      {/* Summary bar */}
      <g transform="translate(30, 510)">
        <rect x="0" y="0" width="840" height="30" rx="6" fill={COLORS.navy} />
        <text x="420" y="20" textAnchor="middle" fill="white" fontSize="11">
          Key principle: A PSV cannot protect what it cannot reach, or if improperly specified. Verify installation during PSSR.
        </text>
      </g>
    </svg>
  );
}
