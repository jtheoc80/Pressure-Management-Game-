"use client";

import { COLORS } from "@/lib/psv/brand";

export default function AssumptionsGoodBad() {
  return (
    <svg viewBox="0 0 850 520" className="w-full h-auto">
      <defs>
        <pattern id="grid-agb" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="520" fill="#f8fafc" />
      <rect width="850" height="520" fill="url(#grid-agb)" />

      {/* Title */}
      <text x="425" y="28" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PSV Sizing: Good vs Bad Assumptions
      </text>
      <text x="425" y="48" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Conservative assumptions lead to safe designs
      </text>

      {/* Good Assumptions */}
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="380" height="420" rx="8" fill="white" stroke="#22c55e" strokeWidth="2" />
        <rect x="0" y="0" width="380" height="35" rx="8" fill="#dcfce7" />
        <rect x="0" y="27" width="380" height="8" fill="#dcfce7" />
        <text x="190" y="24" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="600">
          ✓ CONSERVATIVE (Safe)
        </text>

        {/* Good assumptions list */}
        <g transform="translate(20, 50)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#f0fdf4" stroke="#bbf7d0" />
          <text x="15" y="18" fill="#166534" fontSize="11" fontWeight="600">Relieving Temperature</text>
          <text x="15" y="35" fill="#047857" fontSize="10">Use highest credible T → lower √T in denominator</text>
          <text x="15" y="50" fill="#047857" fontSize="10">→ Larger orifice (conservative)</text>
        </g>

        <g transform="translate(20, 115)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#f0fdf4" stroke="#bbf7d0" />
          <text x="15" y="18" fill="#166534" fontSize="11" fontWeight="600">Molecular Weight</text>
          <text x="15" y="35" fill="#047857" fontSize="10">Use lightest credible MW → lower √MW</text>
          <text x="15" y="50" fill="#047857" fontSize="10">→ Larger orifice (conservative)</text>
        </g>

        <g transform="translate(20, 180)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#f0fdf4" stroke="#bbf7d0" />
          <text x="15" y="18" fill="#166534" fontSize="11" fontWeight="600">Compressibility (Z)</text>
          <text x="15" y="35" fill="#047857" fontSize="10">Use Z = 1.0 if uncertain (ideal gas)</text>
          <text x="15" y="50" fill="#047857" fontSize="10">Real gases often Z &lt; 1 at high P</text>
        </g>

        <g transform="translate(20, 245)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#f0fdf4" stroke="#bbf7d0" />
          <text x="15" y="18" fill="#166534" fontSize="11" fontWeight="600">Backpressure</text>
          <text x="15" y="35" fill="#047857" fontSize="10">Assume max credible backpressure</text>
          <text x="15" y="50" fill="#047857" fontSize="10">→ Accounts for future header growth</text>
        </g>

        <g transform="translate(20, 310)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#f0fdf4" stroke="#bbf7d0" />
          <text x="15" y="18" fill="#166534" fontSize="11" fontWeight="600">Relief Rate</text>
          <text x="15" y="35" fill="#047857" fontSize="10">Use governing case + margin</text>
          <text x="15" y="50" fill="#047857" fontSize="10">Don&apos;t assume partial rates</text>
        </g>

        <g transform="translate(20, 375)">
          <rect x="0" y="0" width="340" height="35" rx="6" fill="#166534" />
          <text x="170" y="23" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
            Result: PSV will handle actual conditions
          </text>
        </g>
      </g>

      {/* Bad Assumptions */}
      <g transform="translate(440, 80)">
        <rect x="0" y="0" width="380" height="420" rx="8" fill="white" stroke="#dc2626" strokeWidth="2" />
        <rect x="0" y="0" width="380" height="35" rx="8" fill="#fee2e2" />
        <rect x="0" y="27" width="380" height="8" fill="#fee2e2" />
        <text x="190" y="24" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="600">
          ✗ OPTIMISTIC (Risky)
        </text>

        {/* Bad assumptions list */}
        <g transform="translate(20, 50)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#fef2f2" stroke="#fecaca" />
          <text x="15" y="18" fill="#dc2626" fontSize="11" fontWeight="600">Using Normal Operating T</text>
          <text x="15" y="35" fill="#b91c1c" fontSize="10">&quot;It&apos;s usually 150°F&quot; — but relieving may be 300°F!</text>
          <text x="15" y="50" fill="#b91c1c" fontSize="10">→ Undersized orifice</text>
        </g>

        <g transform="translate(20, 115)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#fef2f2" stroke="#fecaca" />
          <text x="15" y="18" fill="#dc2626" fontSize="11" fontWeight="600">Assuming Heavy MW</text>
          <text x="15" y="35" fill="#b91c1c" fontSize="10">&quot;It&apos;s mostly propane&quot; — but lights may flash off</text>
          <text x="15" y="50" fill="#b91c1c" fontSize="10">→ Undersized for methane/ethane</text>
        </g>

        <g transform="translate(20, 180)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#fef2f2" stroke="#fecaca" />
          <text x="15" y="18" fill="#dc2626" fontSize="11" fontWeight="600">Ignoring Backpressure</text>
          <text x="15" y="35" fill="#b91c1c" fontSize="10">&quot;Header is usually 5 psig&quot; — until upset conditions</text>
          <text x="15" y="50" fill="#b91c1c" fontSize="10">→ Capacity drops during simultaneous relief</text>
        </g>

        <g transform="translate(20, 245)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#fef2f2" stroke="#fecaca" />
          <text x="15" y="18" fill="#dc2626" fontSize="11" fontWeight="600">Partial Scenarios</text>
          <text x="15" y="35" fill="#b91c1c" fontSize="10">&quot;Operator will catch it before full rate&quot;</text>
          <text x="15" y="50" fill="#b91c1c" fontSize="10">→ What if they don&apos;t?</text>
        </g>

        <g transform="translate(20, 310)">
          <rect x="0" y="0" width="340" height="55" rx="6" fill="#fef2f2" stroke="#fecaca" />
          <text x="15" y="18" fill="#dc2626" fontSize="11" fontWeight="600">Credit for Controls</text>
          <text x="15" y="35" fill="#b91c1c" fontSize="10">&quot;BMS will shut down first&quot;</text>
          <text x="15" y="50" fill="#b91c1c" fontSize="10">→ PSV must be independent last resort</text>
        </g>

        <g transform="translate(20, 375)">
          <rect x="0" y="0" width="340" height="35" rx="6" fill="#7f1d1d" />
          <text x="170" y="23" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
            Result: PSV may fail during real event!
          </text>
        </g>
      </g>
    </svg>
  );
}
