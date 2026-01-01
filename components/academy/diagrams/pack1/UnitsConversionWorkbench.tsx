"use client";

import { useState } from "react";
import { COLORS } from "@/lib/psv/brand";

interface UnitsConversionWorkbenchProps {
  onCheck?: (result: { correct: boolean; message: string }) => void;
}

export default function UnitsConversionWorkbench({ onCheck }: UnitsConversionWorkbenchProps) {
  const [psigInput, setPsigInput] = useState("");
  const [psiaResult, setPsiaResult] = useState<string | null>(null);
  const [tempFInput, setTempFInput] = useState("");
  const [tempRResult, setTempRResult] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const checkPsigToPsia = () => {
    const psig = parseFloat(psigInput);
    if (isNaN(psig)) {
      setFeedback({ type: "error", message: "Enter a valid number" });
      return;
    }
    const correctAnswer = psig + 14.7;
    setPsiaResult(correctAnswer.toFixed(2));
    const message = `${psig} psig + 14.7 = ${correctAnswer.toFixed(2)} psia ✓`;
    setFeedback({ type: "success", message });
    onCheck?.({ correct: true, message });
  };

  const checkTempToRankine = () => {
    const tempF = parseFloat(tempFInput);
    if (isNaN(tempF)) {
      setFeedback({ type: "error", message: "Enter a valid number" });
      return;
    }
    const correctAnswer = tempF + 459.67;
    setTempRResult(correctAnswer.toFixed(2));
    const message = `${tempF}°F + 459.67 = ${correctAnswer.toFixed(2)}°R ✓`;
    setFeedback({ type: "success", message });
    onCheck?.({ correct: true, message });
  };

  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <defs>
        <pattern id="grid-ucw" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#f8fafc" />
      <rect width="800" height="500" fill="url(#grid-ucw)" />

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="600">
        Units Conversion Workbench
      </text>
      <text x="400" y="50" textAnchor="middle" fill={COLORS.gray} fontSize="12">
        Practice common PSV sizing unit conversions
      </text>

      {/* Pressure conversion section */}
      <g transform="translate(50, 80)">
        <rect x="0" y="0" width="320" height="180" rx="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
        <rect x="0" y="0" width="320" height="35" rx="8" fill="#dbeafe" />
        <rect x="0" y="27" width="320" height="8" fill="#dbeafe" />
        <text x="160" y="24" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="600">
          PSIG → PSIA
        </text>
        
        <text x="20" y="65" fill={COLORS.navy} fontSize="11">Gauge pressure to absolute:</text>
        <text x="20" y="85" fill={COLORS.gray} fontSize="11" fontFamily="monospace">
          psia = psig + 14.7
        </text>
        
        <text x="20" y="115" fill={COLORS.navy} fontSize="10">Enter psig:</text>
        <foreignObject x="100" y="100" width="80" height="30">
          <input 
            type="number" 
            value={psigInput}
            onChange={(e) => setPsigInput(e.target.value)}
            style={{ 
              width: "70px", 
              padding: "4px 8px", 
              border: "1px solid #94a3b8", 
              borderRadius: "4px",
              fontSize: "12px"
            }}
            placeholder="100"
          />
        </foreignObject>
        
        <foreignObject x="190" y="100" width="60" height="30">
          <button 
            onClick={checkPsigToPsia}
            style={{
              padding: "4px 12px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "11px",
              cursor: "pointer"
            }}
          >
            Check
          </button>
        </foreignObject>
        
        {psiaResult && (
          <text x="20" y="155" fill="#22c55e" fontSize="12" fontWeight="500">
            Result: {psiaResult} psia
          </text>
        )}
      </g>

      {/* Temperature conversion section */}
      <g transform="translate(430, 80)">
        <rect x="0" y="0" width="320" height="180" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2" />
        <rect x="0" y="0" width="320" height="35" rx="8" fill="#fef3c7" />
        <rect x="0" y="27" width="320" height="8" fill="#fef3c7" />
        <text x="160" y="24" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="600">
          °F → °R (Rankine)
        </text>
        
        <text x="20" y="65" fill={COLORS.navy} fontSize="11">Fahrenheit to absolute:</text>
        <text x="20" y="85" fill={COLORS.gray} fontSize="11" fontFamily="monospace">
          °R = °F + 459.67
        </text>
        
        <text x="20" y="115" fill={COLORS.navy} fontSize="10">Enter °F:</text>
        <foreignObject x="80" y="100" width="80" height="30">
          <input 
            type="number" 
            value={tempFInput}
            onChange={(e) => setTempFInput(e.target.value)}
            style={{ 
              width: "70px", 
              padding: "4px 8px", 
              border: "1px solid #94a3b8", 
              borderRadius: "4px",
              fontSize: "12px"
            }}
            placeholder="100"
          />
        </foreignObject>
        
        <foreignObject x="170" y="100" width="60" height="30">
          <button 
            onClick={checkTempToRankine}
            style={{
              padding: "4px 12px",
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "11px",
              cursor: "pointer"
            }}
          >
            Check
          </button>
        </foreignObject>
        
        {tempRResult && (
          <text x="20" y="155" fill="#22c55e" fontSize="12" fontWeight="500">
            Result: {tempRResult} °R
          </text>
        )}
      </g>

      {/* Common conversions reference */}
      <g transform="translate(50, 280)">
        <rect x="0" y="0" width="700" height="200" rx="8" fill="white" stroke={COLORS.navy} />
        <rect x="0" y="0" width="700" height="30" rx="8" fill={COLORS.navy} />
        <rect x="0" y="22" width="700" height="8" fill={COLORS.navy} />
        <text x="350" y="22" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          Quick Reference: Common Conversions
        </text>

        {/* Column 1: Pressure */}
        <text x="30" y="55" fill={COLORS.navy} fontSize="11" fontWeight="600">Pressure</text>
        <text x="30" y="75" fill={COLORS.gray} fontSize="10">1 bar = 14.504 psi</text>
        <text x="30" y="92" fill={COLORS.gray} fontSize="10">1 MPa = 145.04 psi</text>
        <text x="30" y="109" fill={COLORS.gray} fontSize="10">1 atm = 14.696 psi</text>
        <text x="30" y="126" fill={COLORS.gray} fontSize="10">1 kPa = 0.145 psi</text>

        {/* Column 2: Temperature */}
        <text x="200" y="55" fill={COLORS.navy} fontSize="11" fontWeight="600">Temperature</text>
        <text x="200" y="75" fill={COLORS.gray} fontSize="10">°C = (°F - 32) × 5/9</text>
        <text x="200" y="92" fill={COLORS.gray} fontSize="10">K = °C + 273.15</text>
        <text x="200" y="109" fill={COLORS.gray} fontSize="10">°R = °F + 459.67</text>
        <text x="200" y="126" fill={COLORS.gray} fontSize="10">°R = K × 1.8</text>

        {/* Column 3: Flow */}
        <text x="380" y="55" fill={COLORS.navy} fontSize="11" fontWeight="600">Flow</text>
        <text x="380" y="75" fill={COLORS.gray} fontSize="10">1 GPM = 3.785 L/min</text>
        <text x="380" y="92" fill={COLORS.gray} fontSize="10">1 SCFM = 28.32 NL/min</text>
        <text x="380" y="109" fill={COLORS.gray} fontSize="10">1 BPD = 0.0292 GPM</text>
        <text x="380" y="126" fill={COLORS.gray} fontSize="10">1 kg/hr = 2.205 lb/hr</text>

        {/* Column 4: Area */}
        <text x="550" y="55" fill={COLORS.navy} fontSize="11" fontWeight="600">Area</text>
        <text x="550" y="75" fill={COLORS.gray} fontSize="10">1 in² = 645.2 mm²</text>
        <text x="550" y="92" fill={COLORS.gray} fontSize="10">1 ft² = 0.0929 m²</text>
        <text x="550" y="109" fill={COLORS.gray} fontSize="10">π × D²/4 = Area</text>

        {/* Important note */}
        <rect x="30" y="150" width="640" height="35" fill="#fef3c7" rx="4" />
        <text x="350" y="170" textAnchor="middle" fill="#92400e" fontSize="10">
          ⚠️ Always convert to absolute units (psia, °R or K) before using in gas sizing equations!
        </text>
      </g>

      {/* Feedback area */}
      {feedback && (
        <g transform="translate(300, 265)">
          <rect x="0" y="0" width="200" height="25" rx="4" 
                fill={feedback.type === "success" ? "#dcfce7" : "#fee2e2"} />
          <text x="100" y="17" textAnchor="middle" fontSize="10"
                fill={feedback.type === "success" ? "#166534" : "#dc2626"}>
            {feedback.message}
          </text>
        </g>
      )}
    </svg>
  );
}
