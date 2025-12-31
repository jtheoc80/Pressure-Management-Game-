"use client";

import type { DischargeTo, ServiceType } from "@/lib/psv/types";

interface ReliefPathDiagramProps {
  serviceType?: ServiceType;
  dischargeTo?: DischargeTo;
  hasBackpressure?: boolean;
  constraints?: string[];
}

export function ReliefPathDiagram({
  serviceType,
  dischargeTo,
  hasBackpressure = false,
  constraints = [],
}: ReliefPathDiagramProps) {
  const getDischargeColor = () => {
    switch (dischargeTo) {
      case "atm":
        return "#059669"; // Green - safe
      case "flare":
        return "#D97706"; // Amber - needs attention
      case "closed":
        return "#3B82F6"; // Blue - contained
      default:
        return "#9CA3AF"; // Gray - not selected
    }
  };

  const getDischargeLabel = () => {
    switch (dischargeTo) {
      case "atm":
        return "ATMOSPHERE";
      case "flare":
        return "FLARE HEADER";
      case "closed":
        return "CLOSED SYSTEM";
      default:
        return "SELECT DISCHARGE";
    }
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case "steam":
        return (
          <g>
            <path
              d="M-8 0 Q-4 -5 0 0 Q4 5 8 0"
              stroke="#0B1F3B"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M-6 5 Q-2 0 2 5 Q6 10 10 5"
              stroke="#0B1F3B"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </g>
        );
      case "gas":
        return (
          <g>
            <circle cx="0" cy="0" r="3" fill="#0B1F3B" opacity="0.3" />
            <circle cx="5" cy="-3" r="2" fill="#0B1F3B" opacity="0.3" />
            <circle cx="-4" cy="3" r="2.5" fill="#0B1F3B" opacity="0.3" />
          </g>
        );
      case "liquid":
        return (
          <g>
            <ellipse cx="0" cy="2" rx="8" ry="4" fill="#3B82F6" opacity="0.3" />
            <path
              d="M-8 2 Q0 -2 8 2"
              stroke="#3B82F6"
              strokeWidth="1"
              fill="none"
            />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-[var(--puffer-navy)] mb-3">
        Relief Path Diagram
      </h3>
      <svg viewBox="0 0 280 160" className="w-full h-auto">
        {/* Background */}
        <rect width="280" height="160" fill="var(--puffer-bg)" rx="4" />

        {/* Equipment box */}
        <g transform="translate(30, 55)">
          <rect
            x="-25"
            y="-25"
            width="50"
            height="50"
            rx="4"
            fill="white"
            stroke="var(--puffer-navy)"
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            fontSize="8"
            fill="var(--puffer-navy)"
            textAnchor="middle"
            fontWeight="600"
          >
            EQUIPMENT
          </text>
          {/* Service type indicator */}
          <g transform="translate(0, -10)">{getServiceIcon()}</g>
        </g>

        {/* Process line from equipment */}
        <line
          x1="55"
          y1="55"
          x2="95"
          y2="55"
          stroke="var(--puffer-navy)"
          strokeWidth="2"
        />

        {/* Flow arrow */}
        <polygon
          points="85,52 92,55 85,58"
          fill="var(--puffer-navy)"
        />

        {/* PSV Symbol */}
        <g transform="translate(120, 55)">
          {/* Valve body */}
          <polygon
            points="0,-20 -12,-8 12,-8"
            fill="white"
            stroke="var(--puffer-navy)"
            strokeWidth="2"
          />
          <polygon
            points="0,-20 -12,-32 12,-32"
            fill="white"
            stroke="var(--puffer-navy)"
            strokeWidth="2"
          />
          {/* Spring */}
          <line
            x1="0"
            y1="-32"
            x2="0"
            y2="-42"
            stroke="var(--puffer-navy)"
            strokeWidth="2"
          />
          <path
            d="M-5 -42 L5 -44 L-5 -46 L5 -48"
            stroke="var(--puffer-navy)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inlet */}
          <line
            x1="-25"
            y1="0"
            x2="0"
            y2="-8"
            stroke="var(--puffer-navy)"
            strokeWidth="2"
          />
          {/* Label */}
          <text
            x="0"
            y="15"
            fontSize="8"
            fill="var(--puffer-navy)"
            textAnchor="middle"
            fontWeight="600"
          >
            PSV
          </text>
        </g>

        {/* Discharge pipe */}
        <line
          x1="120"
          y1="35"
          x2="120"
          y2="15"
          stroke={getDischargeColor()}
          strokeWidth="2"
        />
        <line
          x1="120"
          y1="15"
          x2="220"
          y2="15"
          stroke={getDischargeColor()}
          strokeWidth="2"
        />

        {/* Discharge destination */}
        <g transform="translate(240, 15)">
          {dischargeTo === "atm" && (
            <>
              <circle
                cx="0"
                cy="0"
                r="12"
                fill="none"
                stroke={getDischargeColor()}
                strokeWidth="2"
              />
              <text
                x="0"
                y="4"
                fontSize="10"
                fill={getDischargeColor()}
                textAnchor="middle"
              >
                A
              </text>
            </>
          )}
          {dischargeTo === "flare" && (
            <>
              <polygon
                points="0,-15 -8,5 8,5"
                fill="#F97316"
                stroke={getDischargeColor()}
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="5"
                x2="0"
                y2="15"
                stroke={getDischargeColor()}
                strokeWidth="2"
              />
            </>
          )}
          {dischargeTo === "closed" && (
            <rect
              x="-12"
              y="-10"
              width="24"
              height="20"
              rx="2"
              fill="white"
              stroke={getDischargeColor()}
              strokeWidth="2"
            />
          )}
          {!dischargeTo && (
            <text
              x="0"
              y="4"
              fontSize="10"
              fill="#9CA3AF"
              textAnchor="middle"
            >
              ?
            </text>
          )}
        </g>

        {/* Discharge label */}
        <text
          x="180"
          y="38"
          fontSize="7"
          fill={getDischargeColor()}
          textAnchor="middle"
          fontWeight="500"
        >
          {getDischargeLabel()}
        </text>

        {/* Backpressure indicator */}
        {hasBackpressure && dischargeTo === "flare" && (
          <g transform="translate(180, 50)">
            <rect
              x="-25"
              y="-8"
              width="50"
              height="16"
              rx="3"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="1"
            />
            <text
              x="0"
              y="4"
              fontSize="6"
              fill="#92400E"
              textAnchor="middle"
              fontWeight="500"
            >
              BP PRESENT
            </text>
          </g>
        )}

        {/* Constraint badges */}
        <g transform="translate(10, 135)">
          {constraints.slice(0, 2).map((constraint, index) => (
            <g key={index} transform={`translate(${index * 135}, 0)`}>
              <rect
                x="0"
                y="-10"
                width="130"
                height="18"
                rx="3"
                fill="white"
                stroke="var(--puffer-border)"
                strokeWidth="1"
              />
              <text
                x="65"
                y="3"
                fontSize="6"
                fill="var(--puffer-gray)"
                textAnchor="middle"
              >
                {constraint.length > 28
                  ? constraint.substring(0, 28) + "..."
                  : constraint}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
