/**
 * Training Academy Quizzes
 * Quiz questions for each lesson
 */

import type { Quiz } from "./types";

export const quizzes: Quiz[] = [
  // ============================================================================
  // PSV TRACK QUIZZES
  // ============================================================================
  {
    id: "psv-intro-quiz",
    lessonId: "psv-101",
    title: "Introduction to Pressure Relief Quiz",
    passingScore: 80,
    questions: [
      {
        id: "intro-1",
        question: "What is the primary purpose of a pressure safety valve (PSV)?",
        options: [
          "To control process pressure during normal operations",
          "To prevent equipment from exceeding its maximum allowable working pressure",
          "To measure pressure in a vessel",
          "To regulate flow rate through piping",
        ],
        correctIndex: 1,
        explanation:
          "PSVs are safety devices that automatically relieve pressure when it exceeds safe limits, preventing equipment from exceeding MAWP.",
      },
      {
        id: "intro-2",
        question: "Which of the following standards governs PSV sizing and selection?",
        options: [
          "API 610",
          "ASME B31.3",
          "API 520/521",
          "API 650",
        ],
        correctIndex: 2,
        explanation:
          "API 520 covers PSV sizing and selection, while API 521 addresses relief system design and disposal.",
      },
      {
        id: "intro-3",
        question: "A PSV should be considered as:",
        options: [
          "A primary process control device",
          "A replacement for proper process design",
          "The last line of defense against overpressure",
          "Optional equipment for most vessels",
        ],
        correctIndex: 2,
        explanation:
          "Relief devices are the last line of defense, not a process control tool. Proper process design should prevent most overpressure scenarios.",
      },
      {
        id: "intro-4",
        question: "What happens if a vessel exceeds its MAWP without adequate relief?",
        options: [
          "Nothing, vessels are designed with safety factors",
          "The vessel will automatically depressurize",
          "Potential catastrophic failure, fire, or explosion",
          "The process will simply stop operating",
        ],
        correctIndex: 2,
        explanation:
          "Overpressure events without adequate relief can lead to equipment rupture, fires, explosions, and loss of life.",
      },
      {
        id: "intro-5",
        question: "Set pressure for a PSV should typically be:",
        options: [
          "Equal to normal operating pressure",
          "At or below the equipment MAWP",
          "10% above MAWP",
          "At least 50% above operating pressure",
        ],
        correctIndex: 1,
        explanation:
          "Set pressure must be at or below MAWP to ensure the equipment is protected before exceeding its design limit.",
      },
    ],
  },
  {
    id: "psv-terminology-quiz",
    lessonId: "psv-102",
    title: "PSV Terminology Quiz",
    passingScore: 80,
    questions: [
      {
        id: "term-1",
        question: "If a pressure gauge reads 100 psig at sea level, what is the absolute pressure?",
        options: [
          "100 psia",
          "85.3 psia",
          "114.7 psia",
          "100 + atmospheric pressure in inches Hg",
        ],
        correctIndex: 2,
        explanation: "psia = psig + 14.7 (atmospheric pressure at sea level). So 100 + 14.7 = 114.7 psia.",
      },
      {
        id: "term-2",
        question: "What is accumulation in PSV terminology?",
        options: [
          "The pressure increase above set pressure during relief",
          "The pressure increase above MAWP during relief",
          "The total pressure in the system",
          "The amount of fluid released during relief",
        ],
        correctIndex: 1,
        explanation:
          "Accumulation is the pressure increase above MAWP during a relief event, expressed as a percentage of MAWP.",
      },
      {
        id: "term-3",
        question: "A vessel has MAWP of 150 psig and 10% allowable accumulation. What is the maximum pressure during relief?",
        options: [
          "150 psig",
          "160 psig",
          "165 psig",
          "175 psig",
        ],
        correctIndex: 2,
        explanation: "With 10% accumulation: 150 × 1.10 = 165 psig maximum during relief.",
      },
      {
        id: "term-4",
        question: "What distinguishes a PSV from a rupture disk?",
        options: [
          "PSVs are for gas service only",
          "PSVs reclose after relieving; rupture disks do not",
          "Rupture disks have higher capacity",
          "PSVs require no maintenance",
        ],
        correctIndex: 1,
        explanation:
          "PSVs are reclosing devices that return to service after the overpressure is relieved. Rupture disks burst and must be replaced.",
      },
      {
        id: "term-5",
        question: "Overpressure is measured as a percentage above:",
        options: [
          "MAWP",
          "Operating pressure",
          "Set pressure",
          "Atmospheric pressure",
        ],
        correctIndex: 2,
        explanation:
          "Overpressure is the pressure increase above set pressure when the valve is relieving, expressed as a percentage of set pressure.",
      },
    ],
  },
  {
    id: "psv-relieving-cases-quiz",
    lessonId: "psv-103",
    title: "Common Relieving Cases Quiz",
    passingScore: 80,
    questions: [
      {
        id: "case-1",
        question: "In a blocked outlet scenario, the PSV should be sized for:",
        options: [
          "Normal operating flow rate",
          "Maximum inlet flow rate",
          "50% of maximum flow rate",
          "Flow rate at minimum operating pressure",
        ],
        correctIndex: 1,
        explanation:
          "In blocked outlet, all inlet flow must go through the PSV. It must handle the maximum possible inlet flow.",
      },
      {
        id: "case-2",
        question: "Fire case relief sizing is based primarily on:",
        options: [
          "Maximum pump flow rate",
          "Normal operating temperature",
          "Wetted surface area and heat input",
          "Downstream pressure",
        ],
        correctIndex: 2,
        explanation:
          "Fire case calculations use wetted surface area to determine heat input, which drives vaporization and relief rate.",
      },
      {
        id: "case-3",
        question: "Which statement about control valve failure is TRUE?",
        options: [
          "Only fail-open scenarios need analysis",
          "Only fail-closed scenarios need analysis",
          "Both fail-open and fail-closed modes should be analyzed",
          "Control valve failure cannot cause overpressure",
        ],
        correctIndex: 2,
        explanation:
          "Both failure modes should be analyzed: fail-open upstream can cause excess flow; fail-closed downstream can cause blocked outlet.",
      },
      {
        id: "case-4",
        question: "The governing relief case is:",
        options: [
          "The most likely scenario to occur",
          "The scenario requiring the largest relief capacity",
          "The scenario with the lowest set pressure",
          "Always the fire case",
        ],
        correctIndex: 1,
        explanation:
          "The governing case is the scenario that requires the largest relief capacity. The PSV must be sized for this worst case.",
      },
      {
        id: "case-5",
        question: "Which scenario is often overlooked but can govern for large storage vessels?",
        options: [
          "Blocked outlet",
          "Control valve failure",
          "Fire case",
          "Thermal expansion",
        ],
        correctIndex: 2,
        explanation:
          "Fire case is often overlooked but frequently governs for large vessels due to their large wetted surface area.",
      },
    ],
  },
  {
    id: "psv-backpressure-quiz",
    lessonId: "psv-104",
    title: "Backpressure Quiz",
    passingScore: 80,
    questions: [
      {
        id: "bp-1",
        question: "Total backpressure equals:",
        options: [
          "Set pressure plus overpressure",
          "Superimposed backpressure plus built-up backpressure",
          "MAWP minus operating pressure",
          "Inlet pressure minus outlet pressure",
        ],
        correctIndex: 1,
        explanation:
          "Total backpressure = superimposed (existing before valve opens) + built-up (develops from discharge flow).",
      },
      {
        id: "bp-2",
        question: "Superimposed backpressure exists:",
        options: [
          "Only when the PSV is relieving",
          "Before the PSV opens, from the downstream system",
          "Only in fire case scenarios",
          "Only for liquid service",
        ],
        correctIndex: 1,
        explanation:
          "Superimposed backpressure is the pressure at the PSV outlet BEFORE the valve opens, from the downstream system.",
      },
      {
        id: "bp-3",
        question: "For conventional PSVs, total backpressure should not exceed:",
        options: [
          "5% of set pressure",
          "10% of set pressure",
          "25% of set pressure",
          "50% of set pressure",
        ],
        correctIndex: 1,
        explanation:
          "The 10% rule: conventional valves should have total backpressure less than 10% of set pressure to maintain capacity.",
      },
      {
        id: "bp-4",
        question: "Built-up backpressure develops from:",
        options: [
          "The downstream system pressure",
          "Atmospheric pressure",
          "Flow through the discharge piping after the valve opens",
          "The spring force in the valve",
        ],
        correctIndex: 2,
        explanation:
          "Built-up backpressure develops AFTER the valve opens due to flow resistance in the discharge piping.",
      },
      {
        id: "bp-5",
        question: "Variable backpressure (as in a shared flare header) typically requires:",
        options: [
          "A conventional valve",
          "A larger orifice size",
          "A balanced bellows or pilot-operated valve",
          "No special consideration",
        ],
        correctIndex: 2,
        explanation:
          "Variable backpressure exceeding 10% requires bellows or pilot valves that compensate for backpressure effects.",
      },
    ],
  },
  {
    id: "psv-valve-types-quiz",
    lessonId: "psv-105",
    title: "PSV Types Quiz",
    passingScore: 80,
    questions: [
      {
        id: "type-1",
        question: "A conventional PSV is best suited for:",
        options: [
          "Discharge to a high-pressure flare header",
          "Discharge to atmosphere or low backpressure systems",
          "Services requiring tight shutoff",
          "Corrosive process fluids",
        ],
        correctIndex: 1,
        explanation:
          "Conventional valves are ideal for atmospheric discharge or when backpressure is less than 10% of set pressure.",
      },
      {
        id: "type-2",
        question: "What is the main advantage of a bellows PSV?",
        options: [
          "Lower cost than conventional valves",
          "Set pressure is independent of backpressure",
          "Higher flow capacity",
          "No maintenance required",
        ],
        correctIndex: 1,
        explanation:
          "The bellows isolates the spring from backpressure, maintaining constant set pressure regardless of downstream conditions.",
      },
      {
        id: "type-3",
        question: "Pilot-operated valves are preferred when:",
        options: [
          "Simple, low-cost installation is required",
          "Operating pressure is very close to set pressure requiring tight shutoff",
          "The process fluid is dirty or polymerizing",
          "Discharge is to atmosphere",
        ],
        correctIndex: 1,
        explanation:
          "Pilot valves provide excellent tight shutoff, making them ideal when operating pressure is close to set pressure.",
      },
      {
        id: "type-4",
        question: "On a conventional valve, backpressure acts on:",
        options: [
          "The inlet side of the disc",
          "The back of the disc, reducing opening force",
          "The spring directly",
          "It has no effect on conventional valves",
        ],
        correctIndex: 1,
        explanation:
          "Backpressure acts on the back of the disc in conventional valves, opposing the opening force and affecting performance.",
      },
      {
        id: "type-5",
        question: "A torn bellows in a bellows PSV will cause:",
        options: [
          "Improved sealing",
          "Loss of backpressure compensation",
          "Increased flow capacity",
          "No change in performance",
        ],
        correctIndex: 1,
        explanation:
          "A torn bellows allows backpressure to act on the disc, eliminating the backpressure compensation feature.",
      },
    ],
  },
  {
    id: "psv-orifice-sizing-quiz",
    lessonId: "psv-106",
    title: "Orifice Sizing Quiz",
    passingScore: 80,
    questions: [
      {
        id: "orf-1",
        question: "API 526 standard orifice letters range from:",
        options: [
          "A through Z",
          "D through T",
          "1 through 10",
          "Small, Medium, Large",
        ],
        correctIndex: 1,
        explanation: "API 526 defines standard orifice letters from D (smallest, 0.110 in²) to T (largest, 26.00 in²).",
      },
      {
        id: "orf-2",
        question: "If your calculated required area is 0.45 in², which orifice should you select?",
        options: [
          "F (0.307 in²)",
          "G (0.503 in²)",
          "H (0.785 in²)",
          "Either F or G",
        ],
        correctIndex: 1,
        explanation:
          "Always select the next LARGER orifice. G (0.503 in²) is the smallest that exceeds 0.45 in².",
      },
      {
        id: "orf-3",
        question: "What is a risk of excessive orifice oversizing?",
        options: [
          "Insufficient relief capacity",
          "Valve chatter and instability",
          "Higher set pressure",
          "Reduced backpressure",
        ],
        correctIndex: 1,
        explanation:
          "Excessive oversizing can cause chatter—rapid opening/closing that damages the valve and reduces capacity.",
      },
      {
        id: "orf-4",
        question: "The effective orifice area accounts for:",
        options: [
          "The geometric hole size only",
          "Flow losses represented by the discharge coefficient",
          "The valve body size",
          "Temperature expansion",
        ],
        correctIndex: 1,
        explanation:
          "Effective area = geometric area × discharge coefficient, accounting for flow contraction and losses.",
      },
      {
        id: "orf-5",
        question: "When selecting orifice size, you should NEVER:",
        options: [
          "Select a slightly larger orifice than calculated",
          "Use standard API 526 orifice sizes",
          "Select an orifice smaller than the calculated required area",
          "Consider future capacity requirements",
        ],
        correctIndex: 2,
        explanation:
          "Never undersize—an orifice smaller than required cannot pass the necessary flow and will fail to protect the equipment.",
      },
    ],
  },
  {
    id: "psv-gas-service-quiz",
    lessonId: "psv-107",
    title: "Gas Service Quiz",
    passingScore: 80,
    questions: [
      {
        id: "gas-1",
        question: "Gas PSV sizing is primarily based on:",
        options: [
          "Volumetric flow rate (GPM)",
          "Mass flow rate (lb/hr)",
          "Pressure drop",
          "Pipe diameter",
        ],
        correctIndex: 1,
        explanation: "Gas PSV sizing uses mass flow rate because gas density varies with pressure and temperature.",
      },
      {
        id: "gas-2",
        question: "Critical (choked) flow occurs when:",
        options: [
          "The gas is at its critical point",
          "Flow velocity at the throat reaches sonic velocity",
          "Temperature exceeds the critical temperature",
          "Pressure exceeds the critical pressure",
        ],
        correctIndex: 1,
        explanation:
          "Critical flow means the gas reaches sonic velocity at the orifice throat, maximizing mass flow rate.",
      },
      {
        id: "gas-3",
        question: "Higher molecular weight gas will:",
        options: [
          "Decrease mass flow capacity",
          "Have no effect on flow",
          "Increase mass flow capacity for the same orifice",
          "Require a smaller orifice",
        ],
        correctIndex: 2,
        explanation:
          "Higher MW = higher density = higher mass flow for the same volumetric flow through an orifice.",
      },
      {
        id: "gas-4",
        question: "The compressibility factor Z is typically:",
        options: [
          "Always equal to 1.0",
          "Greater than 1.0 for all gases",
          "Less than 1.0 for real gases at high pressure",
          "Only relevant for liquids",
        ],
        correctIndex: 2,
        explanation:
          "Real gases deviate from ideal behavior. At high pressure, Z is typically less than 1.0.",
      },
      {
        id: "gas-5",
        question: "The k-value (Cp/Cv) affects:",
        options: [
          "Only liquid calculations",
          "The critical flow function and discharge coefficient",
          "Pipe sizing only",
          "Valve material selection",
        ],
        correctIndex: 1,
        explanation:
          "The k-value affects the critical pressure ratio and the coefficient used in gas flow calculations.",
      },
    ],
  },
  {
    id: "psv-steam-service-quiz",
    lessonId: "psv-108",
    title: "Steam Service Quiz",
    passingScore: 80,
    questions: [
      {
        id: "stm-1",
        question: "For saturated steam, the relieving temperature is determined by:",
        options: [
          "Normal operating temperature",
          "Ambient temperature",
          "Saturation temperature at relieving pressure",
          "Design temperature of the equipment",
        ],
        correctIndex: 2,
        explanation:
          "Saturated steam temperature is fixed by pressure. At relieving pressure, use the saturation temperature.",
      },
      {
        id: "stm-2",
        question: "Steam at 150 psig and 450°F (saturation = 366°F) is:",
        options: [
          "Saturated steam",
          "Superheated by 84°F",
          "Subcooled",
          "At critical point",
        ],
        correctIndex: 1,
        explanation: "Superheat = actual temperature - saturation temperature = 450 - 366 = 84°F.",
      },
      {
        id: "stm-3",
        question: "Superheated steam compared to saturated steam has:",
        options: [
          "Higher density",
          "Lower density",
          "Same density",
          "Density not relevant",
        ],
        correctIndex: 1,
        explanation:
          "Superheated steam is at higher temperature for the same pressure, resulting in lower density.",
      },
      {
        id: "stm-4",
        question: "Steam molecular weight is approximately:",
        options: [
          "28",
          "18",
          "32",
          "44",
        ],
        correctIndex: 1,
        explanation: "Steam (H₂O) has a molecular weight of approximately 18 (2×1 + 16 = 18).",
      },
      {
        id: "stm-5",
        question: "For superheated steam, sizing calculations require:",
        options: [
          "No special consideration",
          "Using saturated steam properties",
          "Superheat correction factors",
          "Converting to equivalent gas flow",
        ],
        correctIndex: 2,
        explanation:
          "Superheated steam has different properties than saturated steam and requires correction factors.",
      },
    ],
  },
  {
    id: "psv-liquid-service-quiz",
    lessonId: "psv-109",
    title: "Liquid Service Quiz",
    passingScore: 80,
    questions: [
      {
        id: "liq-1",
        question: "Liquid PSV sizing is based on:",
        options: [
          "Mass flow rate (lb/hr)",
          "Volumetric flow rate (GPM)",
          "Linear velocity (ft/s)",
          "Reynolds number",
        ],
        correctIndex: 1,
        explanation:
          "Liquid sizing uses volumetric flow (GPM) because liquids are incompressible.",
      },
      {
        id: "liq-2",
        question: "Specific gravity affects liquid relief capacity how?",
        options: [
          "Higher SG = lower capacity",
          "Higher SG = higher mass flow for same volume",
          "SG has no effect",
          "SG only matters for gases",
        ],
        correctIndex: 1,
        explanation:
          "Higher SG means denser liquid, so the same volumetric flow carries more mass.",
      },
      {
        id: "liq-3",
        question: "High viscosity in liquid service requires:",
        options: [
          "No correction",
          "A viscosity correction factor",
          "Using gas sizing equations",
          "Reducing set pressure",
        ],
        correctIndex: 1,
        explanation:
          "High-viscosity liquids flow differently and require correction factors in sizing.",
      },
      {
        id: "liq-4",
        question: "Thermal relief valves protect against:",
        options: [
          "Fire exposure",
          "Blocked outlet from pumps",
          "Hydraulic overpressure from liquid expansion when heated",
          "Control valve failure",
        ],
        correctIndex: 2,
        explanation:
          "Thermal relief addresses hydraulic overpressure when trapped liquids expand due to heating.",
      },
      {
        id: "liq-5",
        question: "A blocked-in heat exchanger shell exposed to heat needs:",
        options: [
          "No relief device",
          "A large PSV sized for fire case",
          "A small thermal relief valve",
          "A rupture disk only",
        ],
        correctIndex: 2,
        explanation:
          "Thermal relief valves are small devices (often 3/4\" or 1\") sized for the thermal expansion flow.",
      },
    ],
  },
  {
    id: "psv-discharge-systems-quiz",
    lessonId: "psv-110",
    title: "Discharge Systems Quiz",
    passingScore: 80,
    questions: [
      {
        id: "dis-1",
        question: "Atmospheric discharge is appropriate for:",
        options: [
          "All PSV services",
          "Non-hazardous fluids with proper dispersion",
          "High-pressure gas services",
          "Corrosive chemicals",
        ],
        correctIndex: 1,
        explanation:
          "Atmospheric discharge is limited to non-hazardous fluids (steam, air, inert gas) with safe dispersion.",
      },
      {
        id: "dis-2",
        question: "Flare systems create what challenge for PSV selection?",
        options: [
          "Higher set pressure requirements",
          "Variable backpressure from multiple relief sources",
          "Lower relieving temperature",
          "Reduced orifice requirements",
        ],
        correctIndex: 1,
        explanation:
          "Shared flare headers have variable backpressure during upsets when multiple PSVs relieve simultaneously.",
      },
      {
        id: "dis-3",
        question: "A knockout drum in a flare system is used to:",
        options: [
          "Increase backpressure",
          "Separate liquids before the flare tip",
          "Preheat the flare gas",
          "Reduce noise",
        ],
        correctIndex: 1,
        explanation:
          "Knockout drums remove liquid droplets from the relief gas stream before it reaches the flare tip.",
      },
      {
        id: "dis-4",
        question: "When discharging to a closed system, you must:",
        options: [
          "Always use atmospheric discharge instead",
          "Evaluate backpressure on a case-by-case basis",
          "Assume zero backpressure",
          "Only use rupture disks",
        ],
        correctIndex: 1,
        explanation:
          "Closed systems have varying backpressure depending on the receiving equipment and conditions.",
      },
      {
        id: "dis-5",
        question: "The discharge destination affects PSV selection because:",
        options: [
          "It determines the fluid properties",
          "It impacts backpressure and valve type selection",
          "It sets the relieving case",
          "It determines the set pressure",
        ],
        correctIndex: 1,
        explanation:
          "Discharge destination determines backpressure conditions, which influences whether to use conventional, bellows, or pilot valves.",
      },
    ],
  },
  {
    id: "psv-datasheet-workflow-quiz",
    lessonId: "psv-111",
    title: "Datasheet Workflow Quiz",
    passingScore: 80,
    questions: [
      {
        id: "ds-1",
        question: "The PSV datasheet serves to:",
        options: [
          "Replace engineering calculations",
          "Communicate valve requirements to vendors and document design basis",
          "Provide operating procedures",
          "Eliminate the need for inspection",
        ],
        correctIndex: 1,
        explanation:
          "The datasheet formally specifies requirements for vendors and provides documentation for compliance and maintenance.",
      },
      {
        id: "ds-2",
        question: "Which information should always be on a PSV datasheet?",
        options: [
          "Only the orifice size",
          "Set pressure, relieving case, flow rate, and discharge destination",
          "Vendor contact information",
          "Equipment purchase date",
        ],
        correctIndex: 1,
        explanation:
          "Complete datasheets include service conditions, relieving requirements, and selection information.",
      },
      {
        id: "ds-3",
        question: "A common datasheet error is:",
        options: [
          "Including too much information",
          "Specifying the orifice size",
          "Mixing psig and psia units without clarity",
          "Listing the equipment tag number",
        ],
        correctIndex: 2,
        explanation:
          "Unit confusion between psig and psia is a frequent error that can cause significant sizing mistakes.",
      },
      {
        id: "ds-4",
        question: "The relieving case on the datasheet should indicate:",
        options: [
          "Only 'overpressure'",
          "The specific scenario: blocked outlet, fire case, CV failure, etc.",
          "The valve manufacturer",
          "The installation date",
        ],
        correctIndex: 1,
        explanation:
          "Documenting the specific relieving case explains WHY the valve is needed and its design basis.",
      },
      {
        id: "ds-5",
        question: "Before submitting a PSV datasheet, you should:",
        options: [
          "Skip review to save time",
          "Verify units, completeness, and have it independently checked",
          "Only check the set pressure",
          "Send it directly to the vendor",
        ],
        correctIndex: 1,
        explanation:
          "Independent review catches errors. Always verify units and completeness before submission.",
      },
    ],
  },
  {
    id: "psv-common-mistakes-quiz",
    lessonId: "psv-112",
    title: "Common Mistakes Quiz",
    passingScore: 80,
    questions: [
      {
        id: "err-1",
        question: "Using a conventional valve in high-backpressure service can cause:",
        options: [
          "Improved capacity",
          "The valve to not open at set pressure or have reduced capacity",
          "Lower cost",
          "Better sealing",
        ],
        correctIndex: 1,
        explanation:
          "High backpressure on conventional valves opposes opening force, potentially preventing opening or reducing capacity.",
      },
      {
        id: "err-2",
        question: "Sizing for a non-governing case results in:",
        options: [
          "An oversized PSV",
          "An undersized PSV that won't protect the equipment",
          "The correct valve selection",
          "Higher cost only",
        ],
        correctIndex: 1,
        explanation:
          "If you don't size for the worst case (governing case), the PSV will be undersized for that scenario.",
      },
      {
        id: "err-3",
        question: "Confusing psig and psia in calculations can lead to:",
        options: [
          "Minor documentation errors only",
          "Significant sizing errors",
          "No impact",
          "Better safety margins",
        ],
        correctIndex: 1,
        explanation:
          "Using psig instead of psia (or vice versa) introduces 14.7 psi error, significantly affecting sizing.",
      },
      {
        id: "err-4",
        question: "Best practice for PSV specifications includes:",
        options: [
          "Skipping backpressure evaluation for simple systems",
          "Using non-standard orifice sizes",
          "Independent review of all specifications",
          "Assuming fire case never governs",
        ],
        correctIndex: 2,
        explanation:
          "Independent review catches errors and is essential for critical safety equipment like PSVs.",
      },
      {
        id: "err-5",
        question: "The consequences of improper PSV selection include:",
        options: [
          "Only paperwork issues",
          "Potential equipment failure, fire, explosion, and loss of life",
          "Minor efficiency losses",
          "Vendor inconvenience",
        ],
        correctIndex: 1,
        explanation:
          "PSV errors can be deadly. Proper selection is critical for process safety.",
      },
    ],
  },

  // ============================================================================
  // TANK & FLAME TRACK QUIZZES
  // ============================================================================
  {
    id: "tank-intro-quiz",
    lessonId: "tank-101",
    title: "Tank Protection Introduction Quiz",
    passingScore: 80,
    questions: [
      {
        id: "tnk-1",
        question: "Atmospheric storage tanks differ from pressure vessels because:",
        options: [
          "They don't need any pressure protection",
          "They have very low pressure tolerance (inches of water column)",
          "They always operate at high pressure",
          "They are never subject to vacuum",
        ],
        correctIndex: 1,
        explanation:
          "Tanks have thin shells designed for low pressure. Even small differentials (inches WC) can damage them.",
      },
      {
        id: "tnk-2",
        question: "In-breathing occurs when:",
        options: [
          "The tank is being filled",
          "Temperature increases",
          "Liquid is withdrawn or temperature decreases",
          "Pressure relief is needed",
        ],
        correctIndex: 2,
        explanation:
          "In-breathing is air flowing INTO the tank due to liquid withdrawal or vapor contraction from cooling.",
      },
      {
        id: "tnk-3",
        question: "API 2000 governs:",
        options: [
          "PSV sizing for pressure vessels",
          "Venting requirements for atmospheric storage tanks",
          "Pump selection",
          "Pipe stress analysis",
        ],
        correctIndex: 1,
        explanation:
          "API 2000 provides guidelines for normal and emergency venting of atmospheric tanks.",
      },
      {
        id: "tnk-4",
        question: "A vacuum failure in a tank can cause:",
        options: [
          "Minor leaks only",
          "Tank collapse in seconds",
          "Gradual pressure buildup",
          "No damage",
        ],
        correctIndex: 1,
        explanation:
          "Vacuum can collapse a tank extremely quickly because the thin shell cannot resist external pressure.",
      },
      {
        id: "tnk-5",
        question: "Out-breathing requires:",
        options: [
          "Vacuum relief",
          "Pressure relief to vent expanding vapors",
          "No venting",
          "Emergency venting only",
        ],
        correctIndex: 1,
        explanation:
          "Out-breathing is vapor/air flowing OUT of the tank due to filling or heating, requiring pressure relief.",
      },
    ],
  },
  {
    id: "tank-venting-requirements-quiz",
    lessonId: "tank-102",
    title: "Venting Requirements Quiz",
    passingScore: 80,
    questions: [
      {
        id: "vent-1",
        question: "Normal venting includes:",
        options: [
          "Fire exposure only",
          "Thermal breathing and liquid movement",
          "Emergency scenarios only",
          "Neither breathing nor movement",
        ],
        correctIndex: 1,
        explanation:
          "Normal venting covers thermal breathing (temperature changes) and liquid movement (filling/emptying).",
      },
      {
        id: "vent-2",
        question: "Emergency venting is sized for:",
        options: [
          "Normal pump rates",
          "Fire exposure generating massive vapor volumes",
          "Daily temperature swings",
          "Small thermal breathing",
        ],
        correctIndex: 1,
        explanation:
          "Emergency venting handles fire case, where heat input causes rapid vaporization exceeding normal vent capacity.",
      },
      {
        id: "vent-3",
        question: "Total venting requirement equals:",
        options: [
          "Normal + emergency added together",
          "The maximum of normal OR emergency",
          "Normal venting only",
          "Emergency venting only",
        ],
        correctIndex: 1,
        explanation:
          "Use the MAX of normal or emergency because they don't occur simultaneously.",
      },
      {
        id: "vent-4",
        question: "When filling a tank, out-breathing must accommodate:",
        options: [
          "Only vapor expansion",
          "Displaced vapor equal to fill rate plus flash vapors",
          "Vacuum relief only",
          "No venting needed",
        ],
        correctIndex: 1,
        explanation:
          "Filling displaces vapor (1:1 with fill rate) plus any flash vapors from product above bubble point.",
      },
      {
        id: "vent-5",
        question: "API 2000 provides venting factors based on:",
        options: [
          "Product value",
          "Tank size and geographic location",
          "Operator preference",
          "Vendor recommendations",
        ],
        correctIndex: 1,
        explanation:
          "API 2000 tables use tank size and factors like latitude (for thermal breathing) to determine requirements.",
      },
    ],
  },
  {
    id: "tank-pvrv-selection-quiz",
    lessonId: "tank-103",
    title: "PVRV Selection Quiz",
    passingScore: 80,
    questions: [
      {
        id: "pvrv-1",
        question: "A PVRV protects against:",
        options: [
          "Overpressure only",
          "Vacuum only",
          "Both overpressure and vacuum",
          "Fire exposure only",
        ],
        correctIndex: 2,
        explanation:
          "PVRV = Pressure/Vacuum Relief Valve, providing both pressure and vacuum protection.",
      },
      {
        id: "pvrv-2",
        question: "PVRV pressure settings are typically expressed in:",
        options: [
          "psig (pounds per square inch)",
          "oz/sq in or inches water column",
          "MPa (megapascals)",
          "Bar",
        ],
        correctIndex: 1,
        explanation:
          "Tank pressures are low, so settings are expressed in oz/sq in or inches WC.",
      },
      {
        id: "pvrv-3",
        question: "PVRV capacity should be:",
        options: [
          "Less than normal venting requirement",
          "Equal to or greater than normal venting requirement",
          "Only sized for emergency venting",
          "Based on tank color",
        ],
        correctIndex: 1,
        explanation:
          "PVRV capacity must meet or exceed the normal venting requirement to protect the tank.",
      },
      {
        id: "pvrv-4",
        question: "When selecting PVRV settings, consider:",
        options: [
          "Only atmospheric pressure",
          "Blanket gas pressure, pump rates, and thermal effects",
          "Product price",
          "Tank age",
        ],
        correctIndex: 1,
        explanation:
          "Settings must account for all normal operating pressures including blanket gas and operational variations.",
      },
      {
        id: "pvrv-5",
        question: "Multiple PVRVs may be installed to:",
        options: [
          "Decrease total capacity",
          "Achieve required total capacity for large tanks",
          "Eliminate maintenance",
          "Reduce cost",
        ],
        correctIndex: 1,
        explanation:
          "Large tanks may need multiple PVRVs to provide sufficient total venting capacity.",
      },
    ],
  },
  {
    id: "tank-flame-arresters-quiz",
    lessonId: "tank-104",
    title: "Flame Arresters Quiz",
    passingScore: 80,
    questions: [
      {
        id: "flame-1",
        question: "Flame arresters protect tanks by:",
        options: [
          "Increasing pressure",
          "Quenching flames through heat absorption in small passages",
          "Adding fire suppressant chemicals",
          "Cooling the tank contents",
        ],
        correctIndex: 1,
        explanation:
          "Flame arresters divide and cool the flame front through small passages, extinguishing it.",
      },
      {
        id: "flame-2",
        question: "Deflagration arresters are designed for:",
        options: [
          "Supersonic flame fronts",
          "Subsonic flame fronts",
          "Liquid fires only",
          "Electrical fires",
        ],
        correctIndex: 1,
        explanation:
          "Deflagration = subsonic combustion. Deflagration arresters handle slower-moving flame fronts.",
      },
      {
        id: "flame-3",
        question: "Detonation arresters are required when:",
        options: [
          "Only at tank vents",
          "Flame front could accelerate to supersonic speeds in pipe runs",
          "For all applications",
          "Never",
        ],
        correctIndex: 1,
        explanation:
          "Long pipe runs can allow deflagration to accelerate into detonation, requiring detonation-rated arresters.",
      },
      {
        id: "flame-4",
        question: "A fouled flame arrester element can cause:",
        options: [
          "Improved flame stopping",
          "Blocked flow and compromised safety",
          "Better sealing",
          "No issues",
        ],
        correctIndex: 1,
        explanation:
          "Fouling blocks flow through the element and may compromise flame-stopping ability.",
      },
      {
        id: "flame-5",
        question: "End-of-line flame arresters are typically:",
        options: [
          "Detonation type",
          "Deflagration type",
          "Not needed",
          "Liquid service only",
        ],
        correctIndex: 1,
        explanation:
          "End-of-line (at tank vents) typically see deflagration, not detonation, so deflagration type is standard.",
      },
    ],
  },
  {
    id: "tank-vapor-control-quiz",
    lessonId: "tank-105",
    title: "Vapor Control Systems Quiz",
    passingScore: 80,
    questions: [
      {
        id: "vap-1",
        question: "Vapor control systems are required primarily for:",
        options: [
          "All tanks regardless of contents",
          "Environmental compliance to limit VOC emissions",
          "Fire protection only",
          "Increasing tank capacity",
        ],
        correctIndex: 1,
        explanation:
          "Regulations limit VOC emissions, requiring vapor control for tanks with volatile products.",
      },
      {
        id: "vap-2",
        question: "A Vapor Recovery Unit (VRU) works by:",
        options: [
          "Burning all vapors",
          "Compressing and recovering vapors for reuse",
          "Releasing vapors to atmosphere",
          "Converting vapors to liquid instantly",
        ],
        correctIndex: 1,
        explanation:
          "VRUs compress tank vapors and return them to process or fuel gas systems.",
      },
      {
        id: "vap-3",
        question: "When a VRU trips or is overloaded:",
        options: [
          "The tank has no protection",
          "PVRVs provide backup protection",
          "Vapors are stored in the tank",
          "Operations must stop immediately",
        ],
        correctIndex: 1,
        explanation:
          "PVRVs remain essential backup protection when vapor control is offline or overwhelmed.",
      },
      {
        id: "vap-4",
        question: "Vapor control systems should be sized for:",
        options: [
          "Emergency venting rates",
          "Normal operating venting rates",
          "Maximum historical flow",
          "Minimum expected flow",
        ],
        correctIndex: 1,
        explanation:
          "Vapor control handles normal operations; emergency venting is handled by separate devices.",
      },
      {
        id: "vap-5",
        question: "Relying solely on vapor control without PVRV backup is:",
        options: [
          "Best practice",
          "Dangerous because vapor control can fail or be overwhelmed",
          "Required by code",
          "Cost-effective and safe",
        ],
        correctIndex: 1,
        explanation:
          "Never rely solely on vapor control. PVRVs are required for safety when VRU fails.",
      },
    ],
  },
  {
    id: "tank-overfill-protection-quiz",
    lessonId: "tank-106",
    title: "Overfill Protection Quiz",
    passingScore: 80,
    questions: [
      {
        id: "over-1",
        question: "Overfill protection uses:",
        options: [
          "A single instrument for all functions",
          "Multiple independent layers of detection and response",
          "Only visual inspection",
          "Vendor warranties",
        ],
        correctIndex: 1,
        explanation:
          "Defense in depth: multiple independent layers provide reliable overfill protection.",
      },
      {
        id: "over-2",
        question: "High-high level switches must be:",
        options: [
          "The same as process level instruments",
          "Independent from process instruments with separate sensing",
          "Only visual indicators",
          "Optional for most tanks",
        ],
        correctIndex: 1,
        explanation:
          "Independence is critical—separate sensing, wiring, and alarm paths for safety-critical high-high switches.",
      },
      {
        id: "over-3",
        question: "Automatic shutdown in overfill protection:",
        options: [
          "Should be bypassed during normal operations",
          "Closes inlet valves when high-high level is reached",
          "Is only needed for small tanks",
          "Replaces the need for alarms",
        ],
        correctIndex: 1,
        explanation:
          "Automatic shutdown is the final protection layer, stopping flow when operators don't respond.",
      },
      {
        id: "over-4",
        question: "API 2350 covers:",
        options: [
          "PSV sizing",
          "Overfill protection requirements for storage tanks",
          "Flame arrester selection",
          "Pump design",
        ],
        correctIndex: 1,
        explanation:
          "API 2350 defines overfill prevention categories and reliability requirements.",
      },
      {
        id: "over-5",
        question: "SPCC regulations require:",
        options: [
          "No documentation",
          "Documented overfill prevention procedures and inspections",
          "Only tank painting",
          "Annual tank replacement",
        ],
        correctIndex: 1,
        explanation:
          "SPCC requires documented plans, procedures, and regular equipment inspection for oil storage.",
      },
    ],
  },
];

// Helper functions
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return quizzes.find((q) => q.lessonId === lessonId);
}

export function calculateQuizScore(
  quizId: string,
  answers: Record<string, number>
): { score: number; passed: boolean; correctCount: number; totalQuestions: number } {
  const quiz = getQuizById(quizId);
  if (!quiz) {
    return { score: 0, passed: false, correctCount: 0, totalQuestions: 0 };
  }

  let correctCount = 0;
  for (const question of quiz.questions) {
    if (answers[question.id] === question.correctIndex) {
      correctCount++;
    }
  }

  const score = Math.round((correctCount / quiz.questions.length) * 100);
  return {
    score,
    passed: score >= quiz.passingScore,
    correctCount,
    totalQuestions: quiz.questions.length,
  };
}
