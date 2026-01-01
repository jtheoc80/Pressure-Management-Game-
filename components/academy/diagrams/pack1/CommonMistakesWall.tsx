"use client";

import { COLORS } from "@/lib/psv/brand";

export default function CommonMistakesWall() {
  const mistakes = [
    { id: 1, title: "psig vs psia", desc: "Forgetting +14.7", color: "#dc2626" },
    { id: 2, title: "°F vs °R", desc: "Not +459.67", color: "#f59e0b" },
    { id: 3, title: "MW units", desc: "lb/lb-mol confusion", color: "#22c55e" },
    { id: 4, title: "Gas vs Liquid", desc: "Wrong equation", color: "#3b82f6" },
    { id: 5, title: "Kd value", desc: "0.975 vs 0.65", color: "#8b5cf6" },
    { id: 6, title: "Set > MAWP", desc: "Invalid spec", color: "#ec4899" },
    { id: 7, title: "Overpressure", desc: "10% vs 21%", color: "#06b6d4" },
    { id: 8, title: "Backpressure", desc: "Ignoring Kb", color: "#10b981" },
    { id: 9, title: "Two-phase", desc: "Not homogeneous", color: "#f97316" },
    { id: 10, title: "Inlet loss", desc: ">3% set = chatter", color: "#6366f1" },
    { id: 11, title: "Wrong k", desc: "Not at relieving T", color: "#14b8a6" },
    { id: 12, title: "Liquid viscosity", desc: "Skip Kv iteration", color: "#a855f7" },
  ];

  return (
    <svg viewBox="0 0 850 550" className="w-full h-auto">
      <defs>
        <pattern id="grid-cmw" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="850" height="550" fill="#f8fafc" />
      <rect width="850" height="550" fill="url(#grid-cmw)" />

      {/* Title */}
      <text x="425" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="20" fontWeight="700">
        The Wall of Common Mistakes
      </text>
      <text x="425" y="52" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Avoid these frequent PSV sizing errors
      </text>

      {/* Mistake bricks */}
      <g transform="translate(50, 80)">
        {mistakes.map((m, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const x = col * 185;
          const y = row * 105;
          const offset = row % 2 === 1 ? 40 : 0; // Brick offset pattern
          
          return (
            <g key={m.id} transform={`translate(${x + offset}, ${y})`}>
              <rect 
                x="0" y="0" 
                width="175" height="95" 
                rx="6" 
                fill="white" 
                stroke={m.color} 
                strokeWidth="3"
              />
              <rect x="0" y="0" width="175" height="30" rx="6" fill={m.color} />
              <rect x="0" y="22" width="175" height="8" fill={m.color} />
              
              {/* Number badge */}
              <circle cx="155" cy="15" r="12" fill="white" />
              <text x="155" y="20" textAnchor="middle" fill={m.color} fontSize="11" fontWeight="700">
                {m.id}
              </text>
              
              <text x="15" y="22" fill="white" fontSize="12" fontWeight="600">
                {m.title}
              </text>
              
              <text x="87" y="55" textAnchor="middle" fill={COLORS.navy} fontSize="11">
                {m.desc}
              </text>
              
              <text x="87" y="80" textAnchor="middle" fill={COLORS.gray} fontSize="9">
                {m.id === 1 && "P₁ must be psia!"}
                {m.id === 2 && "T must be °R!"}
                {m.id === 3 && "Check datasheet units"}
                {m.id === 4 && "ΔP vs √(T/MW·Z)"}
                {m.id === 5 && "Gas vs liquid Kd"}
                {m.id === 6 && "Violates ASME"}
                {m.id === 7 && "Fire case = 21%"}
                {m.id === 8 && "Capacity reduction"}
                {m.id === 9 && "Use HEM method"}
                {m.id === 10 && "Size inlet pipe!"}
                {m.id === 11 && "k varies with T"}
                {m.id === 12 && "Re must be >16k"}
              </text>
            </g>
          );
        })}
      </g>

      {/* Bottom message */}
      <g transform="translate(75, 420)">
        <rect x="0" y="0" width="700" height="115" rx="8" fill="white" stroke={COLORS.navy} strokeWidth="2" />
        <text x="350" y="25" textAnchor="middle" fill={COLORS.navy} fontSize="13" fontWeight="600">
          How to Avoid These Mistakes
        </text>
        
        <g transform="translate(30, 40)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="22" y="12" fill={COLORS.gray} fontSize="10">Use a checklist for every calculation</text>
        </g>
        
        <g transform="translate(250, 40)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="22" y="12" fill={COLORS.gray} fontSize="10">Peer review all sizing calcs</text>
        </g>
        
        <g transform="translate(450, 40)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="22" y="12" fill={COLORS.gray} fontSize="10">Document all assumptions</text>
        </g>
        
        <g transform="translate(30, 65)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="22" y="12" fill={COLORS.gray} fontSize="10">Double-check unit conversions</text>
        </g>
        
        <g transform="translate(250, 65)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="22" y="12" fill={COLORS.gray} fontSize="10">Verify against API 520/521</text>
        </g>
        
        <g transform="translate(450, 65)">
          <circle cx="8" cy="8" r="6" fill="#22c55e" />
          <text x="22" y="12" fill={COLORS.gray} fontSize="10">Use qualified software tools</text>
        </g>

        <rect x="100" y="85" width="500" height="22" rx="4" fill={COLORS.navy} />
        <text x="350" y="100" textAnchor="middle" fill="white" fontSize="10">
          Remember: An undersized PSV is worse than an oversized one — safety first!
        </text>
      </g>
    </svg>
  );
}
