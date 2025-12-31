/**
 * PSV Quest SVG Library
 * Technical drawing style thumbnails and diagrams.
 * Navy/gray stroke palette, light background, clean lines.
 */

import type { VisualKey } from "./types";

const NAVY = "#0B1F3B";
const NAVY_2 = "#12345A";
const GRAY = "#6B7280";
const GRAY_2 = "#9CA3AF";
const LIGHT_BG = "#F5F7FA";
const WHITE = "#FFFFFF";

/**
 * Steam Header Thumbnail
 * Shows boiler feeding a header with PSV and atmospheric discharge
 */
export const steamHeaderThumbnail = `
<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="120" fill="${LIGHT_BG}"/>
  
  <!-- Grid lines for technical look -->
  <g stroke="${GRAY_2}" stroke-width="0.25" opacity="0.3">
    <line x1="0" y1="30" x2="200" y2="30"/>
    <line x1="0" y1="60" x2="200" y2="60"/>
    <line x1="0" y1="90" x2="200" y2="90"/>
    <line x1="50" y1="0" x2="50" y2="120"/>
    <line x1="100" y1="0" x2="100" y2="120"/>
    <line x1="150" y1="0" x2="150" y2="120"/>
  </g>
  
  <!-- Boiler (simplified) -->
  <rect x="10" y="35" width="30" height="50" rx="3" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="25" y="65" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">BOILER</text>
  
  <!-- Main header pipe -->
  <rect x="40" y="55" width="140" height="10" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Flow arrows -->
  <path d="M50 60 L60 60 M57 57 L60 60 L57 63" stroke="${NAVY_2}" stroke-width="1" fill="none"/>
  
  <!-- PSV Symbol -->
  <g transform="translate(100, 35)">
    <!-- Valve body -->
    <polygon points="0,20 -8,30 8,30" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,20 -8,10 8,10" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <!-- Spring -->
    <line x1="0" y1="10" x2="0" y2="0" stroke="${NAVY}" stroke-width="1.5"/>
    <path d="M-4 5 L4 3 L-4 1 L4 -1" stroke="${NAVY}" stroke-width="1" fill="none"/>
  </g>
  
  <!-- Discharge to ATM -->
  <line x1="100" y1="35" x2="100" y2="15" stroke="${NAVY}" stroke-width="1.5"/>
  <circle cx="100" cy="12" r="5" fill="none" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="100" y="7" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">ATM</text>
  
  <!-- Downstream blocks -->
  <rect x="140" y="50" width="15" height="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="147" y="63" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">U100</text>
  
  <rect x="160" y="50" width="15" height="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="167" y="63" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">U200</text>
  
  <!-- Labels -->
  <text x="100" y="110" font-size="7" fill="${NAVY}" text-anchor="middle" font-family="sans-serif" font-weight="600">STEAM HEADER - BLOCKED OUTLET</text>
</svg>
`;

/**
 * Flare Line Thumbnail
 * Shows vessel with PSV discharging to flare header
 */
export const flareLineThumbnail = `
<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="120" fill="${LIGHT_BG}"/>
  
  <!-- Grid lines -->
  <g stroke="${GRAY_2}" stroke-width="0.25" opacity="0.3">
    <line x1="0" y1="30" x2="200" y2="30"/>
    <line x1="0" y1="60" x2="200" y2="60"/>
    <line x1="0" y1="90" x2="200" y2="90"/>
    <line x1="50" y1="0" x2="50" y2="120"/>
    <line x1="100" y1="0" x2="100" y2="120"/>
    <line x1="150" y1="0" x2="150" y2="120"/>
  </g>
  
  <!-- Compressor symbol -->
  <circle cx="30" cy="60" r="15" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <polygon points="30,50 40,60 30,70 20,60" fill="none" stroke="${NAVY}" stroke-width="1"/>
  <text x="30" y="80" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">K-101</text>
  
  <!-- Discharge vessel -->
  <rect x="60" y="40" width="25" height="40" rx="4" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="72" y="63" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">V-101</text>
  
  <!-- Connection pipe -->
  <line x1="45" y1="60" x2="60" y2="60" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- PSV on vessel -->
  <g transform="translate(72, 20)">
    <polygon points="0,20 -6,28 6,28" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,20 -6,12 6,12" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="12" x2="0" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
    <!-- Bellows indicator -->
    <rect x="-4" y="6" width="8" height="4" fill="${NAVY_2}" stroke="${NAVY}" stroke-width="0.5"/>
  </g>
  
  <!-- Discharge pipe to flare header -->
  <line x1="72" y1="20" x2="72" y2="10" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="72" y1="10" x2="160" y2="10" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Flare header -->
  <rect x="120" y="5" width="60" height="10" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="150" y="12" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">FLARE HDR</text>
  
  <!-- Variable BP indicator -->
  <g transform="translate(150, 25)">
    <rect x="-20" y="0" width="40" height="15" rx="2" fill="#FEF3C7" stroke="${GRAY}" stroke-width="0.5"/>
    <text x="0" y="10" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">BP: 15-45 psig</text>
  </g>
  
  <!-- Flare tip -->
  <g transform="translate(185, 0)">
    <line x1="0" y1="20" x2="0" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,5 -5,12 5,12" fill="#F97316" stroke="${NAVY}" stroke-width="0.5"/>
  </g>
  
  <!-- Label -->
  <text x="100" y="110" font-size="7" fill="${NAVY}" text-anchor="middle" font-family="sans-serif" font-weight="600">GAS TO FLARE - VARIABLE BP</text>
</svg>
`;

/**
 * Pump Thermal Thumbnail
 * Shows heat exchanger with thermal relief valve
 */
export const pumpThermalThumbnail = `
<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="200" height="120" fill="${LIGHT_BG}"/>
  
  <!-- Grid lines -->
  <g stroke="${GRAY_2}" stroke-width="0.25" opacity="0.3">
    <line x1="0" y1="30" x2="200" y2="30"/>
    <line x1="0" y1="60" x2="200" y2="60"/>
    <line x1="0" y1="90" x2="200" y2="90"/>
    <line x1="50" y1="0" x2="50" y2="120"/>
    <line x1="100" y1="0" x2="100" y2="120"/>
    <line x1="150" y1="0" x2="150" y2="120"/>
  </g>
  
  <!-- Heat exchanger (shell & tube) -->
  <ellipse cx="55" cy="55" rx="8" ry="25" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <rect x="55" y="30" width="60" height="50" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <ellipse cx="115" cy="55" rx="8" ry="25" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Tube bundle indication -->
  <g stroke="${GRAY}" stroke-width="0.5">
    <line x1="60" y1="40" x2="110" y2="40"/>
    <line x1="60" y1="50" x2="110" y2="50"/>
    <line x1="60" y1="60" x2="110" y2="60"/>
    <line x1="60" y1="70" x2="110" y2="70"/>
  </g>
  
  <!-- Inlet/outlet nozzles with block valves -->
  <line x1="30" y1="45" x2="47" y2="45" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="123" y1="45" x2="140" y2="45" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="30" y1="65" x2="47" y2="65" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="123" y1="65" x2="140" y2="65" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Block valves -->
  <g transform="translate(35, 45)">
    <polygon points="0,-4 4,0 0,4 -4,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(35, 65)">
    <polygon points="0,-4 4,0 0,4 -4,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(135, 45)">
    <polygon points="0,-4 4,0 0,4 -4,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  <g transform="translate(135, 65)">
    <polygon points="0,-4 4,0 0,4 -4,0" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  </g>
  
  <!-- PSV (thermal relief) on shell -->
  <g transform="translate(85, 15)">
    <polygon points="0,15 -5,22 5,22" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,15 -5,8 5,8" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="8" x2="0" y2="2" stroke="${NAVY}" stroke-width="1.5"/>
  </g>
  <line x1="85" y1="30" x2="85" y2="15" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- Discharge to closed drain -->
  <line x1="85" y1="15" x2="85" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="85" y1="5" x2="170" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
  <rect x="160" y="0" width="25" height="12" fill="${WHITE}" stroke="${NAVY}" stroke-width="1"/>
  <text x="172" y="8" font-size="4" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">DRAIN</text>
  
  <!-- Equipment tag -->
  <text x="85" y="95" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">E-101</text>
  
  <!-- Solar/heat indicator -->
  <g transform="translate(160, 45)">
    <circle cx="0" cy="0" r="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
    <g stroke="#F59E0B" stroke-width="1">
      <line x1="0" y1="-14" x2="0" y2="-11"/>
      <line x1="0" y1="11" x2="0" y2="14"/>
      <line x1="-14" y1="0" x2="-11" y2="0"/>
      <line x1="11" y1="0" x2="14" y2="0"/>
    </g>
    <text x="0" y="3" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">☀</text>
  </g>
  
  <!-- Label -->
  <text x="100" y="110" font-size="7" fill="${NAVY}" text-anchor="middle" font-family="sans-serif" font-weight="600">LIQUID THERMAL EXPANSION</text>
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
  <text x="245" y="135" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">P&ID-100-001</text>
  <text x="245" y="142" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">STEAM HEADER</text>
  
  <!-- Boiler -->
  <rect x="20" y="40" width="40" height="60" rx="3" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="40" y="75" font-size="7" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">BOILER</text>
  
  <!-- Main header -->
  <line x1="60" y1="70" x2="280" y2="70" stroke="${NAVY}" stroke-width="2"/>
  <text x="170" y="65" font-size="6" fill="${GRAY}" font-family="sans-serif">8" STEAM HDR - 150# MAWP</text>
  
  <!-- PSV -->
  <g transform="translate(120, 45)">
    <polygon points="0,25 -10,35 10,35" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,25 -10,15 10,15" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <line x1="0" y1="15" x2="0" y2="5" stroke="${NAVY}" stroke-width="1.5"/>
    <circle cx="0" cy="3" r="6" fill="none" stroke="${NAVY}" stroke-width="1"/>
    <text x="0" y="5" font-size="5" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">A</text>
  </g>
  <text x="120" y="95" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">PSV-101</text>
  <text x="120" y="102" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">SET: 150 PSIG</text>
  
  <!-- Units -->
  <rect x="200" y="60" width="25" height="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="212" y="73" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">U100</text>
  <rect x="240" y="60" width="25" height="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="1"/>
  <text x="252" y="73" font-size="6" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">U200</text>
</svg>
`,
  gas: `
<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="${WHITE}"/>
  <rect x="5" y="5" width="290" height="140" fill="none" stroke="${NAVY}" stroke-width="1"/>
  
  <!-- Title block -->
  <rect x="200" y="120" width="90" height="25" fill="${LIGHT_BG}" stroke="${NAVY}" stroke-width="0.5"/>
  <text x="245" y="135" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">P&ID-200-001</text>
  <text x="245" y="142" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">COMPRESSOR DISCHARGE</text>
  
  <!-- Compressor -->
  <circle cx="40" cy="70" r="20" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <polygon points="40,55 55,70 40,85 25,70" fill="none" stroke="${NAVY}" stroke-width="1"/>
  <text x="40" y="100" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">K-101</text>
  
  <!-- Vessel -->
  <rect x="90" y="45" width="35" height="50" rx="5" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="107" y="73" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">V-101</text>
  <text x="107" y="105" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">200# MAWP</text>
  
  <!-- Connection -->
  <line x1="60" y1="70" x2="90" y2="70" stroke="${NAVY}" stroke-width="1.5"/>
  
  <!-- PSV -->
  <g transform="translate(107, 20)">
    <polygon points="0,25 -8,33 8,33" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <polygon points="0,25 -8,17 8,17" fill="${WHITE}" stroke="${NAVY}" stroke-width="1.5"/>
    <rect x="-5" y="10" width="10" height="5" fill="${NAVY_2}" stroke="${NAVY}" stroke-width="0.5"/>
    <line x1="0" y1="10" x2="0" y2="0" stroke="${NAVY}" stroke-width="1.5"/>
  </g>
  <text x="145" y="30" font-size="6" fill="${NAVY}" font-family="sans-serif">PSV-201 (BELLOWS)</text>
  
  <!-- Flare header -->
  <line x1="107" y1="20" x2="107" y2="10" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="107" y1="10" x2="280" y2="10" stroke="${NAVY}" stroke-width="2"/>
  <text x="200" y="25" font-size="6" fill="${GRAY}" font-family="sans-serif">8" FLARE HDR (BP: 15-45 PSIG)</text>
</svg>
`,
  liquid: `
<svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="${WHITE}"/>
  <rect x="5" y="5" width="290" height="140" fill="none" stroke="${NAVY}" stroke-width="1"/>
  
  <!-- Title block -->
  <rect x="200" y="120" width="90" height="25" fill="${LIGHT_BG}" stroke="${NAVY}" stroke-width="0.5"/>
  <text x="245" y="135" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">P&ID-300-001</text>
  <text x="245" y="142" font-size="5" fill="${GRAY}" text-anchor="middle" font-family="sans-serif">HEAT EXCHANGER</text>
  
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
  
  <text x="120" y="110" font-size="6" fill="${NAVY}" text-anchor="middle" font-family="sans-serif">E-101 (75# MAWP)</text>
  
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
  <text x="140" y="25" font-size="5" fill="${NAVY}" font-family="sans-serif">PSV-301</text>
  <text x="140" y="32" font-size="4" fill="${GRAY}" font-family="sans-serif">THERMAL RELIEF</text>
  
  <!-- Drain -->
  <line x1="120" y1="15" x2="120" y2="8" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="120" y1="8" x2="250" y2="8" stroke="${NAVY}" stroke-width="1.5"/>
  <text x="250" y="20" font-size="5" fill="${GRAY}" font-family="sans-serif">TO CLOSED DRAIN</text>
</svg>
`,
};
