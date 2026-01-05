"use client";

import React from "react";

export function RelievingScenariosTable() {
  return (
    <svg 
      viewBox="0 0 700 500" 
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background */}
      <rect x="0" y="0" width="700" height="500" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        Common Relieving Scenarios (API 521 Table 1)
      </text>

      {/* Table */}
      <g transform="translate(30, 50)">
        {/* Header */}
        <rect x="0" y="0" width="640" height="35" fill="#003366" rx="4" />
        <text x="80" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Scenario</text>
        <text x="250" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Cause</text>
        <text x="450" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">What to Size For</text>
        <text x="600" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Typical</text>
        
        {/* Column dividers */}
        <line x1="150" y1="0" x2="150" y2="390" stroke="#e2e8f0" />
        <line x1="350" y1="0" x2="350" y2="390" stroke="#e2e8f0" />
        <line x1="550" y1="0" x2="550" y2="390" stroke="#e2e8f0" />

        {/* Row 1 - Blocked Outlet */}
        <rect x="0" y="35" width="640" height="55" fill="#fef3c7" />
        <text x="80" y="55" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Blocked Outlet</text>
        <text x="250" y="50" textAnchor="middle" fill="#78350f" fontSize="9">Control valve fails closed</text>
        <text x="250" y="65" textAnchor="middle" fill="#78350f" fontSize="9">or valve left closed</text>
        <text x="450" y="55" textAnchor="middle" fill="#78350f" fontSize="9">Max pump/compressor flow</text>
        <text x="450" y="70" textAnchor="middle" fill="#78350f" fontSize="9">at relief pressure</text>
        <text x="600" y="60" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Often</text>
        <text x="600" y="75" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Governing</text>
        
        {/* Row 2 - Fire Case */}
        <rect x="0" y="90" width="640" height="55" fill="#fee2e2" />
        <text x="80" y="110" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Fire Case</text>
        <text x="250" y="105" textAnchor="middle" fill="#7f1d1d" fontSize="9">External fire heats vessel</text>
        <text x="250" y="120" textAnchor="middle" fill="#7f1d1d" fontSize="9">causing vaporization</text>
        <text x="450" y="110" textAnchor="middle" fill="#7f1d1d" fontSize="9">Heat input based on</text>
        <text x="450" y="125" textAnchor="middle" fill="#7f1d1d" fontSize="9">wetted area (API 521)</text>
        <text x="600" y="115" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Check</text>
        <text x="600" y="130" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Always</text>
        
        {/* Row 3 - Tube Rupture */}
        <rect x="0" y="145" width="640" height="55" fill="#dbeafe" />
        <text x="80" y="165" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Tube Rupture</text>
        <text x="250" y="160" textAnchor="middle" fill="#1e3a8a" fontSize="9">Heat exchanger tubes fail</text>
        <text x="250" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="9">allowing HP→LP flow</text>
        <text x="450" y="165" textAnchor="middle" fill="#1e3a8a" fontSize="9">Flow through ruptured</text>
        <text x="450" y="180" textAnchor="middle" fill="#1e3a8a" fontSize="9">tube area at ΔP</text>
        <text x="600" y="170" textAnchor="middle" fill="#1e40af" fontSize="9">Low-P side</text>
        
        {/* Row 4 - Thermal Expansion */}
        <rect x="0" y="200" width="640" height="55" fill="#dcfce7" />
        <text x="80" y="220" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Thermal</text>
        <text x="80" y="235" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Expansion</text>
        <text x="250" y="215" textAnchor="middle" fill="#14532d" fontSize="9">Blocked-in liquid heated</text>
        <text x="250" y="230" textAnchor="middle" fill="#14532d" fontSize="9">(solar, ambient, steam trace)</text>
        <text x="450" y="220" textAnchor="middle" fill="#14532d" fontSize="9">Liquid expansion rate</text>
        <text x="450" y="235" textAnchor="middle" fill="#14532d" fontSize="9">(typically small TRV)</text>
        <text x="600" y="225" textAnchor="middle" fill="#166534" fontSize="9">Lines, HX</text>
        
        {/* Row 5 - Control Valve Failure */}
        <rect x="0" y="255" width="640" height="55" fill="#f3e8ff" />
        <text x="80" y="275" textAnchor="middle" fill="#7e22ce" fontSize="10" fontWeight="bold">CV Fails Open</text>
        <text x="250" y="270" textAnchor="middle" fill="#581c87" fontSize="9">Inlet CV fails open while</text>
        <text x="250" y="285" textAnchor="middle" fill="#581c87" fontSize="9">outlet is restricted</text>
        <text x="450" y="275" textAnchor="middle" fill="#581c87" fontSize="9">Full CV capacity at</text>
        <text x="450" y="290" textAnchor="middle" fill="#581c87" fontSize="9">upstream conditions</text>
        <text x="600" y="280" textAnchor="middle" fill="#7e22ce" fontSize="9">Evaluate</text>
        
        {/* Row 6 - Utility Failure */}
        <rect x="0" y="310" width="640" height="55" fill="#fef9c3" />
        <text x="80" y="330" textAnchor="middle" fill="#854d0e" fontSize="10" fontWeight="bold">Utility Failure</text>
        <text x="250" y="325" textAnchor="middle" fill="#713f12" fontSize="9">Loss of cooling water,</text>
        <text x="250" y="340" textAnchor="middle" fill="#713f12" fontSize="9">power, air, steam</text>
        <text x="450" y="330" textAnchor="middle" fill="#713f12" fontSize="9">Depends on process;</text>
        <text x="450" y="345" textAnchor="middle" fill="#713f12" fontSize="9">worst-case heat/flow</text>
        <text x="600" y="335" textAnchor="middle" fill="#854d0e" fontSize="9">Site-specific</text>
        
        {/* Row 7 - Reflux Failure */}
        <rect x="0" y="365" width="640" height="55" fill="#e0e7ff" />
        <text x="80" y="385" textAnchor="middle" fill="#3730a3" fontSize="10" fontWeight="bold">Reflux Failure</text>
        <text x="250" y="380" textAnchor="middle" fill="#312e81" fontSize="9">Loss of condenser or</text>
        <text x="250" y="395" textAnchor="middle" fill="#312e81" fontSize="9">reflux pump on column</text>
        <text x="450" y="385" textAnchor="middle" fill="#312e81" fontSize="9">Full tower overhead</text>
        <text x="450" y="400" textAnchor="middle" fill="#312e81" fontSize="9">vapor rate</text>
        <text x="600" y="390" textAnchor="middle" fill="#3730a3" fontSize="9">Columns</text>
      </g>

      {/* Key insight */}
      <rect x="30" y="455" width="640" height="35" fill="#ecfdf5" stroke="#10b981" rx="4" />
      <text x="350" y="470" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">
        KEY: Evaluate ALL credible scenarios independently — the largest determines PSV size
      </text>
      <text x="350" y="483" textAnchor="middle" fill="#047857" fontSize="9">
        Blocked outlet often governs for pump/compressor systems; fire case often governs for vessels
      </text>
    </svg>
  );
}
