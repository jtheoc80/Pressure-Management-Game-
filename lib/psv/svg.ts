/**
 * PSV Quest SVG Library
 * Technical drawing style thumbnails and diagrams.
 * Navy/gray stroke palette, light background, clean lines.
 * Updated with callout labels and flow legends.
 */

import type { VisualKey } from "./types";

const NAVY = "#0B1F3B";
const NAVY_2 = "#12345A";
const GRAY = "#6B7280";
const GRAY_2 = "#9CA3AF";
const GRAY_LIGHT = "#D1D5DB";
const LIGHT_BG = "#F8FAFC";
const WHITE = "#FFFFFF";

/**
 * Steam Header Thumbnail
 * Shows boiler feeding a header with PSV and atmospheric discharge
 */
export const steamHeaderThumbnail = `
<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with grid -->
  <rect width="200" height="120" fill="${LIGHT_BG}"/>
  <g stroke="${GRAY_LIGHT}" stroke-width="0.5" opacity="0.4">
    <line x1="0" y1="30" x2="200" y2="30"/>
    <line x1="0" y1="60" x2="200" y2="60"/>
    <line x1="0" y1="90" x2="200" y2="90"/>
    <line x1="40" y1="0" x2="40" y2="120"/>
    <line x1="80" y1="0" x2="80" y2="120"/>
    <line x1="120" y1="0" x2="120" y2="120"/>
    <line x1="160" y1="0" x2="160" y2="120"/>
  </g>
  
  <!-- Flow Legend -->
  <g transform="translate(10, 8)">
    <rect x="0" y="0" width="85" height="14" rx="2" fill="${WHITE}" stroke="${GRAY_LIGHT}" stroke-width="0.5"/>
    <text x="6" y="10" font-size="7" fill="${GRAY}" font-family="system-ui" font-weight="500">EQUIP → PSV → ATM</text>
  </g>
  
  <!-- Boiler (simplified) -->
  <rect x="15" y="38" width="28" height="40" rx="3" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="29" y="62" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">BOILER</text>
  
  <!-- Main header pipe -->
  <rect x="43" y="52" width="130" height="8" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Flow arrows -->
  <path d="M55 56 L65 56 M62 53 L65 56 L62 59" stroke="${NAVY_2}" stroke-width="1" fill="none"/>
  <path d="M140 56 L150 56 M147 53 L150 56 L147 59" stroke="${GRAY}" stroke-width="0.75" fill="none"/>
  
  <!-- PSV Symbol -->
  <g transform="translate(100, 32)">
    <polygon points="0,20 -7,28 7,28" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,20 -7,12 7,12" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="12" x2="0" y2="4" stroke="${NAVY}" stroke-width="1.5"/>
    <path d="M-3 7 L3 5 L-3 3 L3 1" stroke="${NAVY}" stroke-width="1" fill="none"/>
  </g>
  
  <!-- Discharge to ATM -->
  <line x1="100" y1="32" x2="100" y2="18" stroke="${NAVY}" stroke-width="1.5"/>
  <circle cx="100" cy="14" r="5" fill="none" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="100" y="8" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">ATM</text>
  
  <!-- Downstream units -->
  <rect x="145" y="48" width="14" height="16" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="152" y="59" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">U1</text>
  <rect x="162" y="48" width="14" height="16" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="169" y="59" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">U2</text>
  
  <!-- Callout: Blocked Outlet -->
  <g transform="translate(152, 72)">
    <rect x="-30" y="0" width="60" height="16" rx="3" fill="${NAVY}" stroke="${NAVY}" stroke-width="1"/>
    <polygon points="0,-4 -4,0 4,0" fill="${NAVY}"/>
    <text x="0" y="11" font-size="6" fill="${WHITE}" text-anchor="middle" font-family="system-ui" font-weight="500">BLOCKED</text>
  </g>
  
  <!-- Callout: Set Pressure -->
  <g transform="translate(100, 75)">
    <rect x="-22" y="0" width="44" height="14" rx="2" fill="${WHITE}" stroke="${GRAY_2}" stroke-width="0.75"/>
    <text x="0" y="10" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="system-ui">150 psig</text>
  </g>
  
  <!-- Label -->
  <text x="100" y="108" font-size="8" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">STEAM HEADER</text>
  <text x="100" y="117" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="system-ui">Blocked Outlet Case</text>
</svg>
`;

/**
 * Flare Line Thumbnail
 * Shows vessel with PSV discharging to flare header
 */
export const flareLineThumbnail = `
<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with grid -->
  <rect width="200" height="120" fill="${LIGHT_BG}"/>
  <g stroke="${GRAY_LIGHT}" stroke-width="0.5" opacity="0.4">
    <line x1="0" y1="30" x2="200" y2="30"/>
    <line x1="0" y1="60" x2="200" y2="60"/>
    <line x1="0" y1="90" x2="200" y2="90"/>
    <line x1="40" y1="0" x2="40" y2="120"/>
    <line x1="80" y1="0" x2="80" y2="120"/>
    <line x1="120" y1="0" x2="120" y2="120"/>
    <line x1="160" y1="0" x2="160" y2="120"/>
  </g>
  
  <!-- Flow Legend -->
  <g transform="translate(10, 8)">
    <rect x="0" y="0" width="95" height="14" rx="2" fill="${WHITE}" stroke="${GRAY_LIGHT}" stroke-width="0.5"/>
    <text x="6" y="10" font-size="7" fill="${GRAY}" font-family="system-ui" font-weight="500">EQUIP → PSV → FLARE</text>
  </g>
  
  <!-- Compressor symbol -->
  <circle cx="28" cy="58" r="14" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <polygon points="28,48 38,58 28,68 18,58" fill="none" stroke="${NAVY}" stroke-width="1"/>
  <text x="28" y="78" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">K-101</text>
  
  <!-- Discharge vessel -->
  <rect x="58" y="42" width="22" height="32" rx="3" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="69" y="61" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">V-101</text>
  
  <!-- Connection pipe -->
  <line x1="42" y1="58" x2="58" y2="58" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- PSV on vessel (bellows style indicated) -->
  <g transform="translate(69, 22)">
    <polygon points="0,20 -5,26 5,26" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,20 -5,14 5,14" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <rect x="-3" y="8" width="6" height="4" fill="${NAVY_2}" stroke="${NAVY}" stroke-width="0.5"/>
    <line x1="0" y1="8" x2="0" y2="2" stroke="${NAVY}" stroke-width="1.5"/>
  </g>
  
  <!-- Discharge pipe to flare header -->
  <line x1="69" y1="22" x2="69" y2="12" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="69" y1="12" x2="165" y2="12" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Flare header -->
  <rect x="115" y="7" width="55" height="10" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="142" y="14" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">FLARE HDR</text>
  
  <!-- Variable BP callout -->
  <g transform="translate(142, 25)">
    <rect x="-28" y="0" width="56" height="18" rx="3" fill="#FEF3C7" stroke="#F59E0B" stroke-width="0.75"/>
    <text x="0" y="8" font-size="5" fill="#92400E" text-anchor="middle" font-family="system-ui" font-weight="600">⚠ VARIABLE BP</text>
    <text x="0" y="15" font-size="5" fill="#92400E" text-anchor="middle" font-family="system-ui">15-45 psig</text>
  </g>
  
  <!-- Flare tip -->
  <g transform="translate(175, 2)">
    <line x1="0" y1="15" x2="0" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,5 -4,10 4,10" fill="#F97316" stroke="${NAVY}" stroke-width="0.5"/>
  </g>
  
  <!-- Callout: Bellows Required -->
  <g transform="translate(69, 82)">
    <rect x="-25" y="0" width="50" height="14" rx="2" fill="${NAVY_2}" stroke="${NAVY_2}" stroke-width="1"/>
    <text x="0" y="10" font-size="5" fill="${WHITE}" text-anchor="middle" font-family="system-ui" font-weight="500">BELLOWS REQ'D</text>
  </g>
  
  <!-- Label -->
  <text x="100" y="108" font-size="8" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">GAS TO FLARE</text>
  <text x="100" y="117" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="system-ui">Variable Backpressure</text>
</svg>
`;

/**
 * Pump Thermal Thumbnail
 * Shows heat exchanger with thermal relief valve
 */
export const pumpThermalThumbnail = `
<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with grid -->
  <rect width="200" height="120" fill="${LIGHT_BG}"/>
  <g stroke="${GRAY_LIGHT}" stroke-width="0.5" opacity="0.4">
    <line x1="0" y1="30" x2="200" y2="30"/>
    <line x1="0" y1="60" x2="200" y2="60"/>
    <line x1="0" y1="90" x2="200" y2="90"/>
    <line x1="40" y1="0" x2="40" y2="120"/>
    <line x1="80" y1="0" x2="80" y2="120"/>
    <line x1="120" y1="0" x2="120" y2="120"/>
    <line x1="160" y1="0" x2="160" y2="120"/>
  </g>
  
  <!-- Flow Legend -->
  <g transform="translate(10, 8)">
    <rect x="0" y="0" width="95" height="14" rx="2" fill="${WHITE}" stroke="${GRAY_LIGHT}" stroke-width="0.5"/>
    <text x="6" y="10" font-size="7" fill="${GRAY}" font-family="system-ui" font-weight="500">EQUIP → PSV → DRAIN</text>
  </g>
  
  <!-- Heat exchanger (shell & tube) -->
  <ellipse cx="55" cy="52" rx="7" ry="22" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <rect x="55" y="30" width="55" height="44" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <ellipse cx="110" cy="52" rx="7" ry="22" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Tube bundle indication -->
  <g stroke="${GRAY}" stroke-width="0.5">
    <line x1="60" y1="38" x2="105" y2="38"/>
    <line x1="60" y1="46" x2="105" y2="46"/>
    <line x1="60" y1="54" x2="105" y2="54"/>
    <line x1="60" y1="62" x2="105" y2="62"/>
  </g>
  
  <!-- Block valves (closed - showing isolation) -->
  <line x1="30" y1="42" x2="48" y2="42" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="117" y1="42" x2="135" y2="42" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="30" y1="62" x2="48" y2="62" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="117" y1="62" x2="135" y2="62" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Block valve symbols (X = closed) -->
  <g transform="translate(38, 42)">
    <rect x="-4" y="-4" width="8" height="8" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
    <line x1="-2" y1="-2" x2="2" y2="2" stroke="${NAVY}" stroke-width="1"/>
    <line x1="2" y1="-2" x2="-2" y2="2" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(38, 62)">
    <rect x="-4" y="-4" width="8" height="8" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
    <line x1="-2" y1="-2" x2="2" y2="2" stroke="${NAVY}" stroke-width="1"/>
    <line x1="2" y1="-2" x2="-2" y2="2" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(127, 42)">
    <rect x="-4" y="-4" width="8" height="8" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
    <line x1="-2" y1="-2" x2="2" y2="2" stroke="${NAVY}" stroke-width="1"/>
    <line x1="2" y1="-2" x2="-2" y2="2" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(127, 62)">
    <rect x="-4" y="-4" width="8" height="8" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
    <line x1="-2" y1="-2" x2="2" y2="2" stroke="${NAVY}" stroke-width="1"/>
    <line x1="2" y1="-2" x2="-2" y2="2" stroke="${NAVY}" stroke-width="1"/>
  </g>
  
  <!-- PSV (thermal relief) on shell -->
  <g transform="translate(82, 12)">
    <polygon points="0,18 -4,24 4,24" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,18 -4,12 4,12" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="12" x2="0" y2="6" stroke="${NAVY}" stroke-width="1.5"/>
  </g>
  <line x1="82" y1="30" x2="82" y2="12" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Discharge to closed drain -->
  <line x1="82" y1="12" x2="82" y2="6" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="82" y1="6" x2="170" y2="6" stroke="${NAVY}" stroke-width="1.5"/>
  <rect x="160" y="2" width="25" height="12" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  <text x="172" y="10" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">DRAIN</text>
  
  <!-- Equipment tag -->
  <text x="82" y="82" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">E-101</text>
  
  <!-- Solar/heat callout -->
  <g transform="translate(155, 50)">
    <circle cx="0" cy="0" r="12" fill="#FEF9C3" stroke="#EAB308" stroke-width="1"/>
    <g stroke="#EAB308" stroke-width="1">
      <line x1="0" y1="-16" x2="0" y2="-13"/>
      <line x1="0" y1="13" x2="0" y2="16"/>
      <line x1="-16" y1="0" x2="-13" y2="0"/>
      <line x1="13" y1="0" x2="16" y2="0"/>
      <line x1="-11" y1="-11" x2="-9" y2="-9"/>
      <line x1="9" y1="9" x2="11" y2="11"/>
      <line x1="11" y1="-11" x2="9" y2="-9"/>
      <line x1="-9" y1="9" x2="-11" y2="11"/>
    </g>
    <text x="0" y="4" font-size="10" fill="#CA8A04" text-anchor="middle" font-family="system-ui">☀</text>
  </g>
  
  <!-- Thermal expansion callout -->
  <g transform="translate(82, 88)">
    <rect x="-32" y="0" width="64" height="14" rx="2" fill="${WHITE}" stroke="${GRAY_2}" stroke-width="0.75"/>
    <text x="0" y="10" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">Thermal Expansion</text>
  </g>
  
  <!-- Label -->
  <text x="100" y="108" font-size="8" fill="${NAVY}" text-anchor="middle" font-family="system-ui" font-weight="600">LIQUID THERMAL</text>
  <text x="100" y="117" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="system-ui">Heat Exchanger Relief</text>
</svg>
`;

/**
 * Get thumbnail SVG by key
 */
export function getThumbnailSvg(key: VisualKey): string {
  switch (key) {
    case "steam_header_thumbnail":
      return steamHeaderThumbnail;
    case "flare_line_thumbnail":
      return flareLineThumbnail;
    case "pump_thermal_thumbnail":
      return pumpThermalThumbnail;
    default:
      return steamHeaderThumbnail;
  }
}

/**
 * P&ID Snippet SVGs for attachments
 */
export const pidSnippets = {
  steam: `
<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="${WHITE}"/>
  <rect x="5" y="5" width="290" height="140" fill="none" stroke="${NAVY}" stroke-width="1"/>
  
  <!-- Title block -->
  <rect x="200" y="120" width="90" height="25" fill="${LIGHT_BG}" stroke="${NAVY}" stroke-width="0.5"/>
  <text x="245" y="135" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">P&ID-100-001</text>
  <text x="245" y="142" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">STEAM HEADER</text>
  
  <!-- Boiler -->
  <rect x="20" y="40" width="40" height="60" rx="3" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="40" y="75" font-size="7" fill="${NAVY}" text-anchor="middle" font-family="system-ui">BOILER</text>
  
  <!-- Main header -->
  <line x1="60" y1="70" x2="280" y2="70" stroke="${NAVY}" stroke-width="2"/>
  <text x="170" y="65" font-size="6" fill="${GRAY}" font-family="system-ui">8" STEAM HDR - 150# MAWP</text>
  
  <!-- PSV -->
  <g transform="translate(120, 45)">
    <polygon points="0,25 -10,35 10,35" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,25 -10,15 10,15" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="15" x2="0" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
    <circle cx="0" cy="3" r="6" fill="none" stroke="${NAVY}" stroke-width="1"/>
    <text x="0" y="5" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="system-ui">A</text>
  </g>
  <text x="120" y="95" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">PSV-101</text>
  <text x="120" y="102" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">SET: 150 PSIG</text>
  
  <!-- Units -->
  <rect x="200" y="60" width="25" height="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="212" y="73" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="system-ui">U100</text>
  <rect x="240" y="60" width="25" height="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="252" y="73" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="system-ui">U200</text>
</svg>
`,
  gas: `
<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="${WHITE}"/>
  <rect x="5" y="5" width="290" height="140" fill="none" stroke="${NAVY}" stroke-width="1"/>
  
  <!-- Title block -->
  <rect x="200" y="120" width="90" height="25" fill="${LIGHT_BG}" stroke="${NAVY}" stroke-width="0.5"/>
  <text x="245" y="135" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">P&ID-200-001</text>
  <text x="245" y="142" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">COMPRESSOR DISCHARGE</text>
  
  <!-- Compressor -->
  <circle cx="40" cy="70" r="20" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <polygon points="40,55 55,70 40,85 25,70" fill="none" stroke="${NAVY}" stroke-width="1"/>
  <text x="40" y="100" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">K-101</text>
  
  <!-- Vessel -->
  <rect x="90" y="45" width="35" height="50" rx="5" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="107" y="73" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">V-101</text>
  <text x="107" y="105" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">200# MAWP</text>
  
  <!-- Connection -->
  <line x1="60" y1="70" x2="90" y2="70" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- PSV -->
  <g transform="translate(107, 20)">
    <polygon points="0,25 -8,33 8,33" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,25 -8,17 8,17" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <rect x="-5" y="10" width="10" height="5" fill="${NAVY_2}" stroke="${NAVY}" stroke-width="0.5"/>
    <line x1="0" y1="10" x2="0" y2="0" stroke="${NAVY}" stroke-width="1.5"/>
  </g>
  <text x="145" y="30" font-size="6" fill="${NAVY}" font-family="system-ui">PSV-201 (BELLOWS)</text>
  
  <!-- Flare header -->
  <line x1="107" y1="20" x2="107" y2="10" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="107" y1="10" x2="280" y2="10" stroke="${NAVY}" stroke-width="2"/>
  <text x="200" y="25" font-size="6" fill="${GRAY}" font-family="system-ui">8" FLARE HDR (BP: 15-45 PSIG)</text>
</svg>
`,
  liquid: `
<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="${WHITE}"/>
  <rect x="5" y="5" width="290" height="140" fill="none" stroke="${NAVY}" stroke-width="1"/>
  
  <!-- Title block -->
  <rect x="200" y="120" width="90" height="25" fill="${LIGHT_BG}" stroke="${NAVY}" stroke-width="0.5"/>
  <text x="245" y="135" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">P&ID-300-001</text>
  <text x="245" y="142" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="system-ui">HEAT EXCHANGER</text>
  
  <!-- Heat exchanger -->
  <ellipse cx="80" cy="70" rx="10" ry="30" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <rect x="80" y="40" width="80" height="60" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <ellipse cx="160" cy="70" rx="10" ry="30" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Tubes -->
  <g stroke="${GRAY}" stroke-width="0.5">
    <line x1="85" y1="50" x2="155" y2="50"/>
    <line x1="85" y1="60" x2="155" y2="60"/>
    <line x1="85" y1="70" x2="155" y2="70"/>
    <line x1="85" y1="80" x2="155" y2="80"/>
    <line x1="85" y1="90" x2="155" y2="90"/>
  </g>
  
  <text x="120" y="110" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="system-ui">E-101 (75# MAWP)</text>
  
  <!-- Block valves -->
  <line x1="40" y1="55" x2="70" y2="55" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="40" y1="85" x2="70" y2="85" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="170" y1="55" x2="200" y2="55" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="170" y1="85" x2="200" y2="85" stroke="${NAVY}" stroke-width="1.5"/>
  
  <g transform="translate(55, 55)">
    <polygon points="0,-5 6,0 0,5 -6,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(55, 85)">
    <polygon points="0,-5 6,0 0,5 -6,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(185, 55)">
    <polygon points="0,-5 6,0 0,5 -6,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(185, 85)">
    <polygon points="0,-5 6,0 0,5 -6,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  
  <!-- PSV -->
  <g transform="translate(120, 15)">
    <polygon points="0,25 -6,32 6,32" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,25 -6,18 6,18" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="18" x2="0" y2="10" stroke="${NAVY}" stroke-width="1.5"/>
  </g>
  <line x1="120" y1="40" x2="120" y2="15" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="140" y="25" font-size="5" fill="${NAVY}" font-family="system-ui">PSV-301</text>
  <text x="140" y="32" font-size="4" fill="${GRAY}" font-family="system-ui">THERMAL RELIEF</text>
  
  <!-- Drain -->
  <line x1="120" y1="15" x2="120" y2="8" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="120" y1="8" x2="250" y2="8" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="250" y="20" font-size="5" fill="${GRAY}" font-family="system-ui">TO CLOSED DRAIN</text>
</svg>
`,
};
