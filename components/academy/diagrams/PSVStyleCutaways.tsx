"use client";

import { COLORS } from "@/lib/psv/brand";

interface PSVStyleCutawaysProps {
  className?: string;
  highlightStyle?: "conventional" | "bellows" | "pilot";
}

/**
 * Technical cutaway diagrams of three PSV types:
 * - Conventional
 * - Balanced Bellows
 * - Pilot-Operated
 */
export function PSVStyleCutaways({ 
  className = "",
  highlightStyle,
}: PSVStyleCutawaysProps) {
  const getOpacity = (style: string) => {
    if (!highlightStyle) return 1;
    return highlightStyle === style ? 1 : 0.4;
  };

  const getBorder = (style: string) => {
    if (highlightStyle === style) return COLORS.accent;
    return COLORS.grayLight;
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conventional Valve */}
        <div 
          className="border rounded-lg p-3 transition-all"
          style={{ 
            borderColor: getBorder("conventional"),
            opacity: getOpacity("conventional"),
            borderWidth: highlightStyle === "conventional" ? 2 : 1,
          }}
        >
          <h4 className="text-sm font-semibold text-center mb-2" style={{ color: COLORS.navy }}>
            Conventional
          </h4>
          <svg viewBox="0 0 160 200" className="w-full h-auto" style={{ maxHeight: "180px" }}>
            {/* Valve body outline */}
            <rect x="40" y="100" width="80" height="80" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" rx="4" />
            
            {/* Bonnet/spring housing */}
            <rect x="55" y="20" width="50" height="80" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
            
            {/* Spring */}
            <path 
              d="M 65 35 L 95 35 M 65 45 L 95 45 M 65 55 L 95 55 M 65 65 L 95 65 M 65 75 L 95 75 M 65 85 L 95 85" 
              stroke={COLORS.navy} 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Disc */}
            <ellipse cx="80" cy="105" rx="25" ry="8" fill={COLORS.navy2} stroke={COLORS.navy} strokeWidth="1" />
            
            {/* Stem */}
            <rect x="75" y="85" width="10" height="25" fill={COLORS.gray} stroke={COLORS.navy} strokeWidth="1" />
            
            {/* Inlet */}
            <rect x="60" y="180" width="40" height="20" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="1" />
            <text x="80" y="195" fill={COLORS.navy} fontSize="8" textAnchor="middle">IN</text>
            
            {/* Outlet */}
            <rect x="120" y="120" width="30" height="30" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="1" />
            <text x="135" y="140" fill={COLORS.navy} fontSize="8" textAnchor="middle">OUT</text>
            
            {/* Backpressure arrow on disc back */}
            <path d="M 110 105 L 105 100 M 110 105 L 105 110" stroke={COLORS.warning} strokeWidth="1.5" />
            <line x1="130" y1="105" x2="105" y2="105" stroke={COLORS.warning} strokeWidth="1.5" />
            <text x="135" y="100" fill={COLORS.warning} fontSize="7">BP</text>
          </svg>
          <div className="text-xs text-center mt-2 space-y-1">
            <p className="text-slate-600">Simple, reliable design</p>
            <p className="text-amber-600 font-medium">BP affects set pressure</p>
            <p className="text-slate-500">Use when BP &lt; 10%</p>
          </div>
        </div>

        {/* Bellows Valve */}
        <div 
          className="border rounded-lg p-3 transition-all"
          style={{ 
            borderColor: getBorder("bellows"),
            opacity: getOpacity("bellows"),
            borderWidth: highlightStyle === "bellows" ? 2 : 1,
          }}
        >
          <h4 className="text-sm font-semibold text-center mb-2" style={{ color: COLORS.navy }}>
            Balanced Bellows
          </h4>
          <svg viewBox="0 0 160 200" className="w-full h-auto" style={{ maxHeight: "180px" }}>
            {/* Valve body outline */}
            <rect x="40" y="100" width="80" height="80" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" rx="4" />
            
            {/* Bonnet/spring housing */}
            <rect x="55" y="20" width="50" height="80" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
            
            {/* Spring */}
            <path 
              d="M 65 35 L 95 35 M 65 45 L 95 45 M 65 55 L 95 55 M 65 65 L 95 65 M 65 75 L 95 75 M 65 85 L 95 85" 
              stroke={COLORS.navy} 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Bellows (key differentiator) */}
            <path 
              d="M 70 95 Q 65 97 70 99 Q 75 101 70 103 Q 65 105 70 107 L 90 107 Q 95 105 90 103 Q 85 101 90 99 Q 95 97 90 95 Z" 
              fill="#EEF2FF" 
              stroke={COLORS.accent} 
              strokeWidth="1.5"
            />
            
            {/* Disc */}
            <ellipse cx="80" cy="115" rx="25" ry="8" fill={COLORS.navy2} stroke={COLORS.navy} strokeWidth="1" />
            
            {/* Stem */}
            <rect x="75" y="85" width="10" height="12" fill={COLORS.gray} stroke={COLORS.navy} strokeWidth="1" />
            
            {/* Inlet */}
            <rect x="60" y="180" width="40" height="20" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="1" />
            <text x="80" y="195" fill={COLORS.navy} fontSize="8" textAnchor="middle">IN</text>
            
            {/* Outlet */}
            <rect x="120" y="120" width="30" height="30" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="1" />
            <text x="135" y="140" fill={COLORS.navy} fontSize="8" textAnchor="middle">OUT</text>
            
            {/* BP blocked by bellows */}
            <path d="M 108 115 L 100 115" stroke={COLORS.success} strokeWidth="1.5" />
            <text x="115" y="112" fill={COLORS.success} fontSize="7">✓</text>
          </svg>
          <div className="text-xs text-center mt-2 space-y-1">
            <p className="text-slate-600">Bellows isolates spring</p>
            <p className="text-emerald-600 font-medium">BP-compensated design</p>
            <p className="text-slate-500">Use for variable BP</p>
          </div>
        </div>

        {/* Pilot-Operated Valve */}
        <div 
          className="border rounded-lg p-3 transition-all"
          style={{ 
            borderColor: getBorder("pilot"),
            opacity: getOpacity("pilot"),
            borderWidth: highlightStyle === "pilot" ? 2 : 1,
          }}
        >
          <h4 className="text-sm font-semibold text-center mb-2" style={{ color: COLORS.navy }}>
            Pilot-Operated
          </h4>
          <svg viewBox="0 0 160 200" className="w-full h-auto" style={{ maxHeight: "180px" }}>
            {/* Main valve body */}
            <rect x="40" y="100" width="80" height="80" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="2" rx="4" />
            
            {/* Pilot valve (small, to the side) */}
            <rect x="10" y="40" width="35" height="50" fill="white" stroke={COLORS.navy} strokeWidth="2" rx="2" />
            <text x="27" y="70" fill={COLORS.navy} fontSize="7" textAnchor="middle">PILOT</text>
            
            {/* Pilot sensing line */}
            <path d="M 27 90 L 27 140 L 40 140" stroke={COLORS.accent} strokeWidth="1.5" strokeDasharray="3,2" />
            
            {/* Pilot control line to main */}
            <path d="M 45 60 L 55 60 L 55 95" stroke={COLORS.accent} strokeWidth="1.5" />
            
            {/* Dome/piston area */}
            <rect x="55" y="95" width="50" height="20" fill="#EEF2FF" stroke={COLORS.accent} strokeWidth="1.5" rx="2" />
            <text x="80" y="108" fill={COLORS.accent} fontSize="7" textAnchor="middle">DOME</text>
            
            {/* Main disc */}
            <ellipse cx="80" cy="125" rx="25" ry="8" fill={COLORS.navy2} stroke={COLORS.navy} strokeWidth="1" />
            
            {/* Inlet */}
            <rect x="60" y="180" width="40" height="20" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="1" />
            <text x="80" y="195" fill={COLORS.navy} fontSize="8" textAnchor="middle">IN</text>
            
            {/* Outlet */}
            <rect x="120" y="120" width="30" height="30" fill={COLORS.grayLighter} stroke={COLORS.navy} strokeWidth="1" />
            <text x="135" y="140" fill={COLORS.navy} fontSize="8" textAnchor="middle">OUT</text>
          </svg>
          <div className="text-xs text-center mt-2 space-y-1">
            <p className="text-slate-600">Pilot controls main valve</p>
            <p className="text-blue-600 font-medium">Tight shutoff, pop action</p>
            <p className="text-slate-500">High BP tolerance</p>
          </div>
        </div>
      </div>

      {/* Summary comparison */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-slate-600">
              <th className="text-left py-1">Feature</th>
              <th className="text-center py-1">Conventional</th>
              <th className="text-center py-1">Bellows</th>
              <th className="text-center py-1">Pilot</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr>
              <td className="py-1">BP Tolerance</td>
              <td className="text-center">&lt;10%</td>
              <td className="text-center">~50%</td>
              <td className="text-center">&gt;50%</td>
            </tr>
            <tr>
              <td className="py-1">Complexity</td>
              <td className="text-center">Low</td>
              <td className="text-center">Medium</td>
              <td className="text-center">High</td>
            </tr>
            <tr>
              <td className="py-1">Best For</td>
              <td className="text-center text-xs">ATM discharge</td>
              <td className="text-center text-xs">Flare service</td>
              <td className="text-center text-xs">Tight shutoff</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
