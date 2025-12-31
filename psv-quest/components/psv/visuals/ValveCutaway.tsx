"use client";

import type { ValveStyle } from "@/lib/psv/types";

interface ValveCutawayProps {
  selectedStyle?: ValveStyle;
  onSelect?: (style: ValveStyle) => void;
  interactive?: boolean;
}

const VALVE_INFO: Record<ValveStyle, { title: string; features: string[] }> = {
  conventional: {
    title: "Conventional",
    features: [
      "Spring directly exposed to back pressure",
      "Set pressure affected by backpressure",
      "Best for atmospheric discharge",
      "Most economical option",
    ],
  },
  bellows: {
    title: "Bellows",
    features: [
      "Bellows isolates spring from backpressure",
      "Maintains set pressure accuracy",
      "Handles variable superimposed BP",
      "Recommended for flare service",
    ],
  },
  pilot: {
    title: "Pilot Operated",
    features: [
      "Pilot controls main valve opening",
      "Handles highest backpressure",
      "Minimal seat leakage",
      "Best for high-pressure applications",
    ],
  },
};

export function ValveCutaway({
  selectedStyle,
  onSelect,
  interactive = false,
}: ValveCutawayProps) {
  const styles: ValveStyle[] = ["conventional", "bellows", "pilot"];

  const renderConventionalCutaway = (isSelected: boolean) => (
    <svg viewBox="0 0 100 140" className="w-full h-auto">
      <rect width="100" height="140" fill="var(--puffer-bg)" rx="4" />
      
      {/* Body outline */}
      <path
        d="M30 90 L30 50 L50 35 L70 50 L70 90 L60 90 L60 70 L40 70 L40 90 Z"
        fill="white"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth={isSelected ? "2" : "1.5"}
      />
      
      {/* Disc */}
      <ellipse
        cx="50"
        cy="55"
        rx="12"
        ry="4"
        fill={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray-2)"}
      />
      
      {/* Stem */}
      <rect
        x="47"
        y="30"
        width="6"
        height="25"
        fill={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray-2)"}
      />
      
      {/* Spring */}
      <path
        d="M42 25 L58 20 L42 15 L58 10 L42 5"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth="2"
        fill="none"
      />
      
      {/* Spring bonnet (open to backpressure) */}
      <path
        d="M35 30 L35 5 L65 5 L65 30"
        fill="none"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth="1.5"
      />
      
      {/* Backpressure arrows (showing exposure) */}
      <g fill="var(--puffer-warning)" opacity="0.7">
        <polygon points="30,20 25,25 25,15" />
        <polygon points="70,20 75,25 75,15" />
      </g>
      
      {/* Labels */}
      <text x="50" y="125" fontSize="8" fill="var(--puffer-navy)" textAnchor="middle" fontWeight="600">
        CONVENTIONAL
      </text>
      <text x="50" y="135" fontSize="6" fill="var(--puffer-gray)" textAnchor="middle">
        BP affects set point
      </text>
    </svg>
  );

  const renderBellowsCutaway = (isSelected: boolean) => (
    <svg viewBox="0 0 100 140" className="w-full h-auto">
      <rect width="100" height="140" fill="var(--puffer-bg)" rx="4" />
      
      {/* Body outline */}
      <path
        d="M30 90 L30 50 L50 35 L70 50 L70 90 L60 90 L60 70 L40 70 L40 90 Z"
        fill="white"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth={isSelected ? "2" : "1.5"}
      />
      
      {/* Disc */}
      <ellipse
        cx="50"
        cy="55"
        rx="12"
        ry="4"
        fill={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray-2)"}
      />
      
      {/* Stem */}
      <rect
        x="47"
        y="30"
        width="6"
        height="25"
        fill={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray-2)"}
      />
      
      {/* Bellows (accordion shape) */}
      <path
        d="M42 38 L58 38 M40 42 L60 42 M42 46 L58 46 M40 50 L60 50"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="40"
        y="36"
        width="20"
        height="16"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
        rx="1"
      />
      
      {/* Spring */}
      <path
        d="M42 25 L58 20 L42 15 L58 10 L42 5"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth="2"
        fill="none"
      />
      
      {/* Bonnet (sealed) */}
      <path
        d="M35 30 L35 5 L65 5 L65 30"
        fill="none"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth="1.5"
      />
      
      {/* Shield indicator */}
      <g fill="#059669" opacity="0.5">
        <rect x="38" y="32" width="24" height="4" rx="1" />
      </g>
      
      {/* Labels */}
      <text x="50" y="125" fontSize="8" fill="var(--puffer-navy)" textAnchor="middle" fontWeight="600">
        BELLOWS
      </text>
      <text x="50" y="135" fontSize="6" fill="var(--puffer-gray)" textAnchor="middle">
        Isolates spring from BP
      </text>
    </svg>
  );

  const renderPilotCutaway = (isSelected: boolean) => (
    <svg viewBox="0 0 100 140" className="w-full h-auto">
      <rect width="100" height="140" fill="var(--puffer-bg)" rx="4" />
      
      {/* Main valve body */}
      <path
        d="M30 95 L30 55 L50 40 L70 55 L70 95 L60 95 L60 75 L40 75 L40 95 Z"
        fill="white"
        stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
        strokeWidth={isSelected ? "2" : "1.5"}
      />
      
      {/* Main disc (larger) */}
      <ellipse
        cx="50"
        cy="60"
        rx="14"
        ry="5"
        fill={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray-2)"}
      />
      
      {/* Piston */}
      <rect
        x="44"
        y="35"
        width="12"
        height="25"
        fill={isSelected ? "#12345A" : "var(--puffer-gray-2)"}
        rx="1"
      />
      
      {/* Pilot valve (small, on top) */}
      <g transform="translate(50, 15)">
        <rect
          x="-12"
          y="-5"
          width="24"
          height="20"
          rx="2"
          fill="white"
          stroke={isSelected ? "var(--puffer-navy)" : "var(--puffer-gray)"}
          strokeWidth="1.5"
        />
        <circle
          cx="0"
          cy="5"
          r="4"
          fill="#8B5CF6"
        />
        <text
          x="0"
          y="7"
          fontSize="5"
          fill="white"
          textAnchor="middle"
        >
          P
        </text>
      </g>
      
      {/* Sense line */}
      <line
        x1="62"
        y1="25"
        x2="62"
        y2="65"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        strokeDasharray="2,2"
      />
      
      {/* Labels */}
      <text x="50" y="115" fontSize="8" fill="var(--puffer-navy)" textAnchor="middle" fontWeight="600">
        PILOT
      </text>
      <text x="50" y="125" fontSize="6" fill="var(--puffer-gray)" textAnchor="middle">
        Pilot controls main valve
      </text>
    </svg>
  );

  const renderCutaway = (style: ValveStyle, isSelected: boolean) => {
    switch (style) {
      case "conventional":
        return renderConventionalCutaway(isSelected);
      case "bellows":
        return renderBellowsCutaway(isSelected);
      case "pilot":
        return renderPilotCutaway(isSelected);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-[var(--puffer-navy)] mb-3">
        Valve Cutaway Comparison
      </h3>
      
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => {
          const isSelected = selectedStyle === style;
          
          return (
            <button
              key={style}
              onClick={() => interactive && onSelect?.(style)}
              disabled={!interactive}
              className={`
                relative rounded-lg border-2 transition-all
                ${isSelected
                  ? "border-[var(--puffer-navy)] bg-white shadow-md"
                  : "border-transparent bg-transparent hover:border-[var(--puffer-border)]"
                }
                ${interactive ? "cursor-pointer" : "cursor-default"}
              `}
            >
              {renderCutaway(style, isSelected)}
              {isSelected && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-[var(--puffer-navy)] rounded-full flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5 L4 7 L8 3" stroke="white" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected valve info */}
      {selectedStyle && (
        <div className="mt-3 p-3 bg-[var(--puffer-bg)] rounded-lg">
          <h4 className="text-sm font-semibold text-[var(--puffer-navy)] mb-2">
            {VALVE_INFO[selectedStyle].title} Valve
          </h4>
          <ul className="space-y-1">
            {VALVE_INFO[selectedStyle].features.map((feature, index) => (
              <li
                key={index}
                className="text-xs text-[var(--puffer-gray)] flex items-start gap-2"
              >
                <span className="text-[var(--puffer-navy)]">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
