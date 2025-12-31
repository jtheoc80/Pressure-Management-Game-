"use client";

import type { OrificeLetter } from "@/lib/psv/types";

interface OrificeWheelProps {
  selectedOrifice?: OrificeLetter;
  onSelect?: (orifice: OrificeLetter) => void;
  interactive?: boolean;
}

const ORIFICE_DATA: Array<{ letter: OrificeLetter; size: string; description: string }> = [
  { letter: "D", size: "0.110", description: "Smallest standard orifice" },
  { letter: "E", size: "0.196", description: "Small capacity" },
  { letter: "F", size: "0.307", description: "Small-medium capacity" },
  { letter: "G", size: "0.503", description: "Medium capacity" },
  { letter: "H", size: "0.785", description: "Medium capacity" },
  { letter: "J", size: "1.287", description: "Medium-large capacity" },
  { letter: "K", size: "1.838", description: "Large capacity" },
  { letter: "L", size: "2.853", description: "Large capacity" },
  { letter: "M", size: "3.600", description: "Very large capacity" },
  { letter: "N", size: "4.340", description: "Very large capacity" },
  { letter: "P", size: "6.380", description: "Extra large capacity" },
  { letter: "Q", size: "11.05", description: "Extra large capacity" },
  { letter: "R", size: "16.00", description: "Maximum standard size" },
  { letter: "T", size: "26.00", description: "Largest standard orifice" },
];

export function OrificeWheel({
  selectedOrifice,
  onSelect,
  interactive = false,
}: OrificeWheelProps) {
  const selectedData = ORIFICE_DATA.find((o) => o.letter === selectedOrifice);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-[var(--puffer-navy)] mb-3">
        Orifice Selection
      </h3>
      
      {/* Horizontal selector */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-1 pb-2 scrollbar-thin">
          {ORIFICE_DATA.map((orifice, index) => {
            const isSelected = selectedOrifice === orifice.letter;
            // Calculate relative size for visual representation
            const baseSize = 24;
            const sizeMultiplier = 1 + (index / ORIFICE_DATA.length) * 0.8;
            const displaySize = Math.round(baseSize * sizeMultiplier);

            return (
              <button
                key={orifice.letter}
                onClick={() => interactive && onSelect?.(orifice.letter)}
                disabled={!interactive}
                className={`
                  flex-shrink-0 flex flex-col items-center justify-center
                  p-2 rounded-lg border-2 transition-all min-w-[48px]
                  ${isSelected
                    ? "border-[var(--puffer-navy)] bg-[var(--puffer-navy)] text-white"
                    : "border-[var(--puffer-border)] bg-white hover:border-[var(--puffer-navy-2)]"
                  }
                  ${interactive ? "cursor-pointer" : "cursor-default"}
                `}
                title={`Orifice ${orifice.letter}: ${orifice.size} in²`}
              >
                {/* Orifice circle representation */}
                <div
                  className={`
                    rounded-full border-2 mb-1
                    ${isSelected
                      ? "border-white bg-white/20"
                      : "border-[var(--puffer-navy)] bg-[var(--puffer-bg)]"
                    }
                  `}
                  style={{
                    width: displaySize,
                    height: displaySize,
                  }}
                />
                {/* Letter */}
                <span
                  className={`
                    text-sm font-bold
                    ${isSelected ? "text-white" : "text-[var(--puffer-navy)]"}
                  `}
                >
                  {orifice.letter}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Gradient fade indicators */}
        <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      </div>

      {/* Capacity scale indicator */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-[var(--puffer-gray)]">Capacity:</span>
        <div className="flex-1 h-2 bg-gradient-to-r from-[var(--puffer-gray-2)] to-[var(--puffer-navy)] rounded-full" />
        <span className="text-xs text-[var(--puffer-gray)]">Small → Large</span>
      </div>

      {/* Selected orifice info */}
      {selectedData && (
        <div className="mt-3 p-3 bg-[var(--puffer-bg)] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-[var(--puffer-navy)]">
              Orifice {selectedData.letter}
            </h4>
            <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-[var(--puffer-border)]">
              {selectedData.size} in²
            </span>
          </div>
          <p className="text-xs text-[var(--puffer-gray)]">
            {selectedData.description}
          </p>
        </div>
      )}

      {/* Note */}
      <p className="mt-2 text-xs text-[var(--puffer-gray-2)] italic">
        Note: Orifice letters represent API standard capacity classes. 
        Actual sizing requires engineering calculations.
      </p>
    </div>
  );
}
