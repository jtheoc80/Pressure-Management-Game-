"use client";

interface BackpressureGaugeProps {
  superimposedBP?: number;
  builtUpBP?: number;
  setPressure?: number;
}

export function BackpressureGauge({
  superimposedBP = 0,
  builtUpBP = 0,
  setPressure = 100,
}: BackpressureGaugeProps) {
  const totalBP = (superimposedBP || 0) + (builtUpBP || 0);
  const bpPercentage = setPressure > 0 ? (totalBP / setPressure) * 100 : 0;

  const getRiskLevel = (): { label: string; color: string; bgColor: string } => {
    if (bpPercentage <= 10) {
      return {
        label: "STABLE",
        color: "#059669",
        bgColor: "#D1FAE5",
      };
    }
    if (bpPercentage <= 25) {
      return {
        label: "CAUTION",
        color: "#D97706",
        bgColor: "#FEF3C7",
      };
    }
    return {
      label: "HIGH RISK",
      color: "#DC2626",
      bgColor: "#FEE2E2",
    };
  };

  const risk = getRiskLevel();
  const maxBarWidth = 180;
  const superimposedWidth = setPressure > 0 
    ? Math.min((superimposedBP / setPressure) * maxBarWidth, maxBarWidth)
    : 0;
  const builtUpWidth = setPressure > 0
    ? Math.min((builtUpBP / setPressure) * maxBarWidth, maxBarWidth - superimposedWidth)
    : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-[var(--puffer-navy)] mb-3">
        Backpressure Gauge
      </h3>
      <svg viewBox="0 0 240 140" className="w-full h-auto">
        {/* Background */}
        <rect width="240" height="140" fill="var(--puffer-bg)" rx="4" />

        {/* Risk indicator */}
        <g transform="translate(120, 20)">
          <rect
            x="-40"
            y="-12"
            width="80"
            height="24"
            rx="4"
            fill={risk.bgColor}
            stroke={risk.color}
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="5"
            fontSize="10"
            fill={risk.color}
            textAnchor="middle"
            fontWeight="700"
          >
            {risk.label}
          </text>
        </g>

        {/* Superimposed Backpressure Bar */}
        <g transform="translate(30, 55)">
          <text
            x="0"
            y="-5"
            fontSize="8"
            fill="var(--puffer-gray)"
            fontWeight="500"
          >
            Superimposed BP
          </text>
          {/* Track */}
          <rect
            x="0"
            y="0"
            width={maxBarWidth}
            height="20"
            rx="3"
            fill="white"
            stroke="var(--puffer-border)"
            strokeWidth="1"
          />
          {/* Fill */}
          <rect
            x="0"
            y="0"
            width={superimposedWidth}
            height="20"
            rx="3"
            fill="#3B82F6"
          />
          {/* Value */}
          <text
            x={maxBarWidth + 8}
            y="14"
            fontSize="9"
            fill="var(--puffer-navy)"
            fontWeight="600"
          >
            {superimposedBP || 0} psig
          </text>
        </g>

        {/* Built-up Backpressure Bar */}
        <g transform="translate(30, 95)">
          <text
            x="0"
            y="-5"
            fontSize="8"
            fill="var(--puffer-gray)"
            fontWeight="500"
          >
            Built-up BP
          </text>
          {/* Track */}
          <rect
            x="0"
            y="0"
            width={maxBarWidth}
            height="20"
            rx="3"
            fill="white"
            stroke="var(--puffer-border)"
            strokeWidth="1"
          />
          {/* Fill */}
          <rect
            x="0"
            y="0"
            width={builtUpWidth}
            height="20"
            rx="3"
            fill="#8B5CF6"
          />
          {/* Value */}
          <text
            x={maxBarWidth + 8}
            y="14"
            fontSize="9"
            fill="var(--puffer-navy)"
            fontWeight="600"
          >
            {builtUpBP || 0} psig
          </text>
        </g>

        {/* Total indicator */}
        <g transform="translate(30, 130)">
          <text
            x="0"
            y="0"
            fontSize="8"
            fill="var(--puffer-gray)"
          >
            Total: {totalBP} psig ({bpPercentage.toFixed(1)}% of set pressure)
          </text>
        </g>

        {/* 10% threshold line */}
        <g transform="translate(30, 55)">
          <line
            x1={maxBarWidth * 0.1}
            y1="-2"
            x2={maxBarWidth * 0.1}
            y2="62"
            stroke="#D97706"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <text
            x={maxBarWidth * 0.1}
            y="70"
            fontSize="6"
            fill="#D97706"
            textAnchor="middle"
          >
            10%
          </text>
        </g>
      </svg>

      {/* Info text */}
      <div className="mt-2 text-xs text-[var(--puffer-gray)]">
        {bpPercentage > 10 ? (
          <p className="text-[var(--puffer-warning)]">
            ⚠️ Backpressure exceeds 10% of set pressure. Consider bellows or pilot valve.
          </p>
        ) : (
          <p>
            ✓ Backpressure within acceptable range for conventional valve.
          </p>
        )}
      </div>
    </div>
  );
}
