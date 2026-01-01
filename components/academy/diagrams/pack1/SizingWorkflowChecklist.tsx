"use client";

import { COLORS } from "@/lib/psv/brand";

export default function SizingWorkflowChecklist() {
  const steps = [
    { num: 1, title: "Identify Relieving Scenarios", desc: "Fire, blocked outlet, tube rupture, etc.", color: "#3b82f6" },
    { num: 2, title: "Determine Governing Case", desc: "Highest required relief rate wins", color: "#22c55e" },
    { num: 3, title: "Gather Fluid Properties", desc: "MW, k, Z, T, μ, SG as applicable", color: "#f59e0b" },
    { num: 4, title: "Set Relieving Conditions", desc: "P₁ = Set + Overpressure (psia)", color: "#ec4899" },
    { num: 5, title: "Calculate Required Area", desc: "Use API 520 equations", color: "#8b5cf6" },
    { num: 6, title: "Select Next Orifice Size", desc: "From API 526 standard orifices", color: "#06b6d4" },
    { num: 7, title: "Verify Inlet/Outlet Sizing", desc: "3% inlet loss, 10% backpressure", color: "#10b981" },
    { num: 8, title: "Document & Review", desc: "Datasheet, calc package, peer review", color: "#6366f1" },
  ];

  return (
    <svg viewBox="0 0 700 550" className="w-full h-auto">
      <defs>
        <pattern id="grid-swc" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="700" height="550" fill="#f8fafc" />
      <rect width="700" height="550" fill="url(#grid-swc)" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        PSV Sizing Workflow Checklist
      </text>

      {/* Steps */}
      <g transform="translate(50, 60)">
        {steps.map((step, i) => {
          const y = i * 58;
          return (
            <g key={step.num}>
              {/* Connection line */}
              {i < steps.length - 1 && (
                <line x1="25" y1={y + 45} x2="25" y2={y + 58} stroke={COLORS.grayLight} strokeWidth="2" />
              )}
              
              {/* Step number circle */}
              <circle cx="25" cy={y + 22} r="20" fill={step.color} />
              <text x="25" y={y + 28} textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
                {step.num}
              </text>
              
              {/* Step content */}
              <rect x="55" y={y} width="520" height="44" rx="6" fill="white" stroke={step.color} strokeWidth="1.5" />
              <text x="70" y={y + 18} fill={COLORS.navy} fontSize="12" fontWeight="600">
                {step.title}
              </text>
              <text x="70" y={y + 34} fill={COLORS.gray} fontSize="10">
                {step.desc}
              </text>
              
              {/* Checkbox */}
              <rect x="535" y={y + 10} width="24" height="24" rx="4" fill="#f1f5f9" stroke={COLORS.grayLight} />
            </g>
          );
        })}
      </g>

      {/* Footer notes */}
      <g transform="translate(50, 530)">
        <text x="0" y="0" fill={COLORS.gray} fontSize="10">
          💡 Tip: Each step should be documented. Missing a step can lead to undersized PSVs.
        </text>
      </g>
    </svg>
  );
}
