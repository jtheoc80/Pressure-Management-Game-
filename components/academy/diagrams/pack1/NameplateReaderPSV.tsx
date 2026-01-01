"use client";

import { COLORS } from "@/lib/psv/brand";

interface NameplateReaderPSVProps {
  onHotspotClick?: (id: string, label: string) => void;
  activeHotspot?: string;
}

export default function NameplateReaderPSV({ onHotspotClick, activeHotspot }: NameplateReaderPSVProps) {
  const hotspots = [
    { id: "mfr", x: 280, y: 75, label: "Manufacturer", desc: "Who made the valve (e.g., Crosby, Consolidated, Farris)" },
    { id: "model", x: 280, y: 110, label: "Model/Style", desc: "Valve model number for parts and specs lookup" },
    { id: "serial", x: 280, y: 145, label: "Serial Number", desc: "Unique ID for tracking and certification" },
    { id: "set", x: 280, y: 195, label: "Set Pressure", desc: "Pressure at which valve starts to open (psig or barg)" },
    { id: "orifice", x: 280, y: 230, label: "Orifice Size", desc: "Orifice letter (D, E, F, etc.) determines capacity" },
    { id: "capacity", x: 280, y: 265, label: "Rated Capacity", desc: "Flow rate at 10% overpressure (SCFH air, lb/hr steam, or GPM water)" },
    { id: "material", x: 280, y: 315, label: "Materials", desc: "Body, trim, spring material for compatibility" },
  ];

  const handleClick = (id: string, label: string) => {
    if (onHotspotClick) {
      onHotspotClick(id, label);
    }
  };

  return (
    <svg viewBox="0 0 750 420" className="w-full h-auto">
      <defs>
        <pattern id="grid-np" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="750" height="420" fill="#f8fafc" />
      <rect width="750" height="420" fill="url(#grid-np)" />

      {/* Title */}
      <text x="375" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PSV Nameplate Reader
      </text>
      <text x="375" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Click each field to learn what it means
      </text>

      {/* Nameplate border */}
      <rect x="80" y="70" width="300" height="290" rx="8" fill="#f1f5f9" stroke={COLORS.navy} strokeWidth="3" />
      <rect x="80" y="70" width="300" height="30" fill={COLORS.navy} />
      <text x="230" y="92" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
        SAFETY RELIEF VALVE
      </text>

      {/* Nameplate fields */}
      <text x="95" y="125" fill={COLORS.navy} fontSize="11" fontWeight="600">MFR:</text>
      <text x="150" y="125" fill={COLORS.gray} fontSize="11">CROSBY VALVE CO.</text>

      <text x="95" y="160" fill={COLORS.navy} fontSize="11" fontWeight="600">MODEL:</text>
      <text x="155" y="160" fill={COLORS.gray} fontSize="11">JOS-E-15</text>

      <text x="95" y="195" fill={COLORS.navy} fontSize="11" fontWeight="600">SERIAL:</text>
      <text x="155" y="195" fill={COLORS.gray} fontSize="11">PSV-2024-0815</text>

      <line x1="95" y1="210" x2="365" y2="210" stroke={COLORS.grayLight} />

      <text x="95" y="240" fill={COLORS.navy} fontSize="11" fontWeight="600">SET:</text>
      <text x="135" y="240" fill="#dc2626" fontSize="13" fontWeight="700">150 PSIG</text>

      <text x="95" y="275" fill={COLORS.navy} fontSize="11" fontWeight="600">ORIFICE:</text>
      <text x="160" y="275" fill={COLORS.gray} fontSize="11">E (0.196 sq.in)</text>

      <text x="95" y="310" fill={COLORS.navy} fontSize="11" fontWeight="600">CAPACITY:</text>
      <text x="175" y="310" fill={COLORS.gray} fontSize="11">45,200 SCFH AIR</text>

      <line x1="95" y1="325" x2="365" y2="325" stroke={COLORS.grayLight} />

      <text x="95" y="350" fill={COLORS.navy} fontSize="11" fontWeight="600">BODY:</text>
      <text x="140" y="350" fill={COLORS.gray} fontSize="11">WCB</text>
      <text x="200" y="350" fill={COLORS.navy} fontSize="11" fontWeight="600">TRIM:</text>
      <text x="240" y="350" fill={COLORS.gray} fontSize="11">316 SS</text>

      {/* Interactive hotspots */}
      {hotspots.map((hs) => (
        <g key={hs.id} onClick={() => handleClick(hs.id, hs.label)} style={{ cursor: "pointer" }}>
          <circle
            cx={hs.x}
            cy={hs.y}
            r={activeHotspot === hs.id ? 12 : 10}
            fill={activeHotspot === hs.id ? COLORS.warning : "#3b82f6"}
            stroke="white"
            strokeWidth="2"
          />
          <text x={hs.x} y={hs.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">
            ?
          </text>
        </g>
      ))}

      {/* Info panel */}
      <g transform="translate(420, 70)">
        <rect x="0" y="0" width="300" height="290" rx="8" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="0" width="300" height="35" rx="8" fill={COLORS.navy} />
        <rect x="0" y="25" width="300" height="10" fill={COLORS.navy} />
        <text x="150" y="24" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          Field Descriptions
        </text>

        {activeHotspot ? (
          <g>
            {hotspots.filter(h => h.id === activeHotspot).map((h) => (
              <g key={h.id}>
                <text x="150" y="65" textAnchor="middle" fill={COLORS.navy} fontSize="14" fontWeight="600">
                  {h.label}
                </text>
                <foreignObject x="15" y="80" width="270" height="180">
                  <div style={{ fontSize: "12px", color: COLORS.gray, lineHeight: 1.5 }}>
                    {h.desc}
                  </div>
                </foreignObject>
              </g>
            ))}
          </g>
        ) : (
          <g>
            <text x="150" y="120" textAnchor="middle" fill={COLORS.gray} fontSize="12">
              Click a blue circle
            </text>
            <text x="150" y="140" textAnchor="middle" fill={COLORS.gray} fontSize="12">
              to see details
            </text>
          </g>
        )}

        {/* Quick reference */}
        <line x1="15" y1="200" x2="285" y2="200" stroke={COLORS.grayLight} />
        <text x="150" y="225" textAnchor="middle" fill={COLORS.navy} fontSize="11" fontWeight="600">
          Key Takeaways
        </text>
        <text x="20" y="245" fill={COLORS.gray} fontSize="10">• SET pressure must ≤ MAWP</text>
        <text x="20" y="262" fill={COLORS.gray} fontSize="10">• Orifice letter → effective area</text>
        <text x="20" y="279" fill={COLORS.gray} fontSize="10">• Capacity rated at 10% overpressure</text>
      </g>

      {/* Legend */}
      <g transform="translate(80, 380)">
        <circle cx="10" cy="10" r="8" fill="#3b82f6" />
        <text x="25" y="14" fill={COLORS.gray} fontSize="10">Click to learn</text>
        <circle cx="140" cy="10" r="8" fill={COLORS.warning} />
        <text x="155" y="14" fill={COLORS.gray} fontSize="10">Currently selected</text>
      </g>
    </svg>
  );
}
