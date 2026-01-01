"use client";

import React from "react";

export function API2350CategoriesDiagram() {
  return (
    <svg viewBox="0 0 700 450" className="w-full h-auto max-w-3xl mx-auto">
      {/* Background */}
      <rect x="0" y="0" width="700" height="450" fill="#f8fafc" rx="8" />

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg font-semibold" fill="#003366">
        API 2350 Overfill Protection Categories
      </text>

      {/* Category Cards */}
      {/* Category 1 */}
      <g transform="translate(30, 60)">
        <rect x="0" y="0" width="200" height="200" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
        <rect x="0" y="0" width="200" height="35" fill="#22c55e" rx="8" />
        <rect x="0" y="25" width="200" height="10" fill="#22c55e" />
        <text x="100" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Category 1</text>
        
        <text x="100" y="55" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Lowest Consequence</text>
        
        <g transform="translate(20, 70)">
          <text x="0" y="0" fill="#14532d" fontSize="10">Requirements:</text>
          <text x="0" y="18" fill="#166534" fontSize="9">• Basic level gauge</text>
          <text x="0" y="33" fill="#166534" fontSize="9">• Manual monitoring</text>
          <text x="0" y="48" fill="#166534" fontSize="9">• Operator attention</text>
          <text x="0" y="70" fill="#14532d" fontSize="10">Examples:</text>
          <text x="0" y="88" fill="#166534" fontSize="9">• Remote, low-value</text>
          <text x="0" y="103" fill="#166534" fontSize="9">• Minimal consequence</text>
          <text x="0" y="118" fill="#166534" fontSize="9">• Good containment</text>
        </g>
      </g>

      {/* Category 2 */}
      <g transform="translate(250, 60)">
        <rect x="0" y="0" width="200" height="200" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
        <rect x="0" y="0" width="200" height="35" fill="#f59e0b" rx="8" />
        <rect x="0" y="25" width="200" height="10" fill="#f59e0b" />
        <text x="100" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Category 2</text>
        
        <text x="100" y="55" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Moderate Consequence</text>
        
        <g transform="translate(20, 70)">
          <text x="0" y="0" fill="#78350f" fontSize="10">Requirements:</text>
          <text x="0" y="18" fill="#92400e" fontSize="9">• High level alarm (H)</text>
          <text x="0" y="33" fill="#92400e" fontSize="9">• Operator response</text>
          <text x="0" y="48" fill="#92400e" fontSize="9">• Documented procedures</text>
          <text x="0" y="70" fill="#78350f" fontSize="10">Examples:</text>
          <text x="0" y="88" fill="#92400e" fontSize="9">• Moderate value</text>
          <text x="0" y="103" fill="#92400e" fontSize="9">• Some consequence</text>
          <text x="0" y="118" fill="#92400e" fontSize="9">• Adequate containment</text>
        </g>
      </g>

      {/* Category 3 */}
      <g transform="translate(470, 60)">
        <rect x="0" y="0" width="200" height="200" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
        <rect x="0" y="0" width="200" height="35" fill="#ef4444" rx="8" />
        <rect x="0" y="25" width="200" height="10" fill="#ef4444" />
        <text x="100" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Category 3</text>
        
        <text x="100" y="55" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">Highest Consequence</text>
        
        <g transform="translate(20, 70)">
          <text x="0" y="0" fill="#7f1d1d" fontSize="10">Requirements:</text>
          <text x="0" y="18" fill="#dc2626" fontSize="9">• High alarm (H)</text>
          <text x="0" y="33" fill="#dc2626" fontSize="9" fontWeight="bold">• HH auto shutdown</text>
          <text x="0" y="48" fill="#dc2626" fontSize="9" fontWeight="bold">• INDEPENDENT devices</text>
          <text x="0" y="70" fill="#7f1d1d" fontSize="10">Examples:</text>
          <text x="0" y="88" fill="#dc2626" fontSize="9">• Near waterways</text>
          <text x="0" y="103" fill="#dc2626" fontSize="9">• Near population</text>
          <text x="0" y="118" fill="#dc2626" fontSize="9">• High consequence</text>
        </g>
      </g>

      {/* Independence Explanation */}
      <g transform="translate(30, 280)">
        <rect x="0" y="0" width="640" height="110" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="8" />
        <text x="320" y="25" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">
          Why Independence Matters (Category 3)
        </text>
        
        {/* Not Independent */}
        <g transform="translate(30, 40)">
          <rect x="0" y="0" width="260" height="60" fill="#fee2e2" stroke="#ef4444" rx="4" />
          <text x="130" y="18" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">NOT Independent (Wrong)</text>
          <rect x="80" y="25" width="100" height="30" fill="#f87171" stroke="#dc2626" rx="2" />
          <text x="130" y="45" textAnchor="middle" fill="white" fontSize="9">Single Level TX</text>
          <text x="15" y="45" textAnchor="start" fill="#7f1d1d" fontSize="8">H alarm</text>
          <text x="195" y="45" textAnchor="start" fill="#7f1d1d" fontSize="8">HH shutdown</text>
          <line x1="60" y1="40" x2="80" y2="40" stroke="#dc2626" strokeWidth="1" />
          <line x1="180" y1="40" x2="200" y2="40" stroke="#dc2626" strokeWidth="1" />
        </g>
        
        {/* Independent */}
        <g transform="translate(350, 40)">
          <rect x="0" y="0" width="260" height="60" fill="#dcfce7" stroke="#22c55e" rx="4" />
          <text x="130" y="18" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Independent (Correct)</text>
          <rect x="30" y="25" width="80" height="30" fill="#4ade80" stroke="#22c55e" rx="2" />
          <text x="70" y="45" textAnchor="middle" fill="white" fontSize="8">Level TX</text>
          <rect x="150" y="25" width="80" height="30" fill="#22c55e" stroke="#166534" rx="2" />
          <text x="190" y="45" textAnchor="middle" fill="white" fontSize="8">Level SW</text>
          <text x="5" y="45" textAnchor="start" fill="#14532d" fontSize="8">H</text>
          <text x="235" y="45" textAnchor="start" fill="#14532d" fontSize="8">HH</text>
        </g>
      </g>

      {/* Key Message */}
      <rect x="30" y="400" width="640" height="40" fill="#f1f5f9" stroke="#94a3b8" rx="4" />
      <text x="350" y="418" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
        Independence = If one device fails, the other still provides protection
      </text>
      <text x="350" y="433" textAnchor="middle" fill="#64748b" fontSize="9">
        Category assignment considers: Environmental sensitivity, Population density, Product hazard, Containment adequacy
      </text>
    </svg>
  );
}
