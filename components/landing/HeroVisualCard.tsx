"use client";

/**
 * HeroVisualCard - Technical diagram for landing hero
 * Shows PSV + flare header + datasheet overlay in Puffer brand style
 */

export function HeroVisualCard() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main diagram container */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
        <svg viewBox="0 0 320 240" className="w-full h-auto">
          {/* Background subtle gradient */}
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1F3B" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#12345A" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="flareGlow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          <rect width="320" height="240" fill="url(#heroGradient)" rx="8" />

          {/* Process vessel (left side) */}
          <g transform="translate(45, 100)">
            {/* Vessel body */}
            <rect 
              x="-30" y="-40" 
              width="60" height="80" 
              rx="6"
              fill="white" 
              stroke="#0B1F3B" 
              strokeWidth="2"
            />
            {/* Vessel internals (liquid level indication) */}
            <rect 
              x="-26" y="0" 
              width="52" height="36" 
              rx="3"
              fill="#0D9488" 
              opacity="0.15"
            />
            {/* Level line */}
            <line x1="-26" y1="0" x2="26" y2="0" stroke="#0D9488" strokeWidth="1" strokeDasharray="4,2" />
            {/* Vessel label */}
            <text x="0" y="-50" fontSize="8" fill="#6B7280" textAnchor="middle" fontWeight="500">
              V-101
            </text>
            <text x="0" y="55" fontSize="7" fill="#9CA3AF" textAnchor="middle">
              150 psig MAWP
            </text>
          </g>

          {/* Process line to PSV */}
          <line x1="75" y1="70" x2="120" y2="70" stroke="#0B1F3B" strokeWidth="2.5" />
          
          {/* Flow arrow */}
          <polygon points="115,67 122,70 115,73" fill="#0B1F3B" />

          {/* PSV Symbol (center) */}
          <g transform="translate(145, 70)">
            {/* Valve body - diamond shape */}
            <polygon 
              points="0,-22 -14,-5 0,12 14,-5" 
              fill="white" 
              stroke="#0B1F3B" 
              strokeWidth="2"
            />
            {/* Spring housing */}
            <rect x="-8" y="-40" width="16" height="18" rx="2" fill="white" stroke="#0B1F3B" strokeWidth="1.5" />
            {/* Spring coils */}
            <path 
              d="M-4 -38 L4 -35 L-4 -32 L4 -29 L-4 -26" 
              stroke="#0B1F3B" 
              strokeWidth="1.5" 
              fill="none"
            />
            {/* Bonnet cap */}
            <rect x="-10" y="-45" width="20" height="5" rx="1" fill="#0B1F3B" />
            {/* Inlet connection */}
            <rect x="-25" y="-4" width="11" height="8" fill="#0B1F3B" rx="1" />
            {/* PSV label */}
            <text x="0" y="28" fontSize="9" fill="#0B1F3B" textAnchor="middle" fontWeight="600">
              PSV-101
            </text>
          </g>

          {/* Discharge pipe (vertical then horizontal to flare) */}
          <path 
            d="M145 48 L145 25 L250 25" 
            fill="none" 
            stroke="#0D9488" 
            strokeWidth="2.5"
          />

          {/* Flare Header (right side) */}
          <g transform="translate(275, 25)">
            {/* Header pipe */}
            <rect x="-30" y="-8" width="60" height="16" rx="3" fill="white" stroke="#0D9488" strokeWidth="2" />
            {/* Flare tip representation */}
            <g transform="translate(15, -20)">
              {/* Flame glow */}
              <ellipse cx="0" cy="-10" rx="12" ry="15" fill="url(#flareGlow)" />
              {/* Flame shape */}
              <path 
                d="M0 5 Q-8 -5 -4 -15 Q0 -20 4 -15 Q8 -5 0 5" 
                fill="#0D9488" 
                opacity="0.8"
              />
              {/* Stack */}
              <rect x="-4" y="0" width="8" height="20" fill="#374151" rx="1" />
            </g>
            {/* Header label */}
            <text x="0" y="25" fontSize="7" fill="#6B7280" textAnchor="middle">
              FLARE HEADER
            </text>
          </g>

          {/* Callout badges */}
          {/* Discharge callout */}
          <g transform="translate(190, 55)">
            <rect x="-35" y="-10" width="70" height="20" rx="4" fill="#0D9488" opacity="0.15" stroke="#0D9488" strokeWidth="1" />
            <text x="0" y="4" fontSize="8" fill="#0D9488" textAnchor="middle" fontWeight="600">
              Discharge: Flare
            </text>
          </g>

          {/* Backpressure callout */}
          <g transform="translate(275, 70)">
            <rect x="-35" y="-10" width="70" height="20" rx="4" fill="#0B1F3B" opacity="0.1" stroke="#0B1F3B" strokeWidth="1" />
            <text x="0" y="4" fontSize="8" fill="#0B1F3B" textAnchor="middle" fontWeight="600">
              BP: Variable
            </text>
          </g>

          {/* Mini datasheet overlay (bottom right) */}
          <g transform="translate(220, 140)">
            <rect 
              x="0" y="0" 
              width="90" height="80" 
              rx="4" 
              fill="white" 
              stroke="#D1D5DB" 
              strokeWidth="1"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
            />
            {/* Header bar */}
            <rect x="0" y="0" width="90" height="16" rx="4" fill="#0B1F3B" />
            <text x="45" y="11" fontSize="7" fill="white" textAnchor="middle" fontWeight="600">
              DATASHEET
            </text>
            {/* Form fields */}
            <g transform="translate(8, 24)">
              <text fontSize="6" fill="#6B7280">Set Pressure</text>
              <rect x="0" y="6" width="74" height="10" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="0.5" />
              <text x="4" y="13" fontSize="6" fill="#0B1F3B" fontWeight="500">150 psig</text>
            </g>
            <g transform="translate(8, 44)">
              <text fontSize="6" fill="#6B7280">Valve Type</text>
              <rect x="0" y="6" width="74" height="10" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="0.5" />
              <text x="4" y="13" fontSize="6" fill="#0B1F3B" fontWeight="500">Bellows</text>
            </g>
            <g transform="translate(8, 64)">
              <text fontSize="6" fill="#6B7280">Orifice</text>
              <rect x="0" y="6" width="30" height="10" rx="2" fill="#0D9488" opacity="0.15" stroke="#0D9488" strokeWidth="0.5" />
              <text x="4" y="13" fontSize="6" fill="#0D9488" fontWeight="600">J</text>
            </g>
          </g>

          {/* Scenario preview badge (top left) */}
          <g transform="translate(10, 180)">
            <rect 
              x="0" y="0" 
              width="100" height="50" 
              rx="6" 
              fill="white" 
              stroke="#E5E7EB" 
              strokeWidth="1"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
            />
            <rect x="0" y="0" width="100" height="14" rx="6" fill="#0B1F3B" />
            <text x="50" y="10" fontSize="6" fill="white" textAnchor="middle" fontWeight="500">
              SCENARIO PREVIEW
            </text>
            <text x="8" y="28" fontSize="7" fill="#0B1F3B" fontWeight="600">
              Gas Service to Flare
            </text>
            <g transform="translate(8, 36)">
              <rect x="0" y="0" width="40" height="10" rx="2" fill="#0D9488" opacity="0.15" />
              <text x="20" y="7" fontSize="5" fill="#0D9488" textAnchor="middle" fontWeight="500">
                120 pts
              </text>
              <rect x="44" y="0" width="48" height="10" rx="2" fill="#F3F4F6" />
              <text x="68" y="7" fontSize="5" fill="#6B7280" textAnchor="middle">
                Moderate
              </text>
            </g>
          </g>
        </svg>

        {/* Floating accent dots */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-teal-400/60 rounded-full" />
      </div>
    </div>
  );
}
