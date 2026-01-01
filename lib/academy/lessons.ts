/**
 * Training Academy Lessons
 * PSV and Tank/Flame track lessons
 */

import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // ============================================================================
  // PSV TRACK - 12 LESSONS
  // ============================================================================
  {
    id: "psv-intro",
    track: "psv",
    title: "Introduction to Pressure Relief",
    estMinutes: 8,
    objectives: [
      "Understand why pressure relief devices are critical to process safety",
      "Identify the role of PSVs in preventing overpressure incidents",
      "Recognize the regulatory framework governing relief devices",
    ],
    sections: [
      {
        type: "text",
        heading: "What is Pressure Relief?",
        body: "Pressure relief is a safety function that prevents equipment from exceeding its maximum allowable working pressure (MAWP). When process conditions cause pressure to rise beyond safe limits, relief devices open automatically to vent excess pressure and protect equipment, personnel, and the environment.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "Overpressure events can lead to catastrophic equipment failure, fires, explosions, and loss of life. Relief devices are your last line of defense.",
      },
      {
        type: "diagram",
        key: "PressureBasicsDiagram",
        caption: "Relationship between operating pressure, set pressure, and MAWP",
      },
      {
        type: "text",
        heading: "Key Regulatory Standards",
        body: "API 520/521 and ASME Section VIII govern the design and application of pressure relief devices. API 520 covers sizing and selection, while API 521 addresses disposal systems. ASME provides the mechanical design code for pressure vessels and their relief devices.",
      },
      {
        type: "check",
        items: [
          "PSVs protect equipment from exceeding MAWP",
          "Set pressure is typically at or below MAWP",
          "Relief devices are a last line of defense, not a process control tool",
          "API 520/521 and ASME govern PSV applications",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-intro-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 1,
  },
  {
    id: "psv-terminology",
    track: "psv",
    title: "PSV Terminology & Definitions",
    estMinutes: 10,
    objectives: [
      "Define key pressure terms: MAWP, set pressure, accumulation, overpressure",
      "Understand the difference between psig and psia",
      "Learn relief device naming conventions",
    ],
    sections: [
      {
        type: "text",
        heading: "Pressure Units: PSIG vs PSIA",
        body: "Pressure is measured in two ways: psig (pounds per square inch gauge) measures pressure relative to atmospheric pressure, while psia (pounds per square inch absolute) measures total pressure including atmospheric. At sea level, atmospheric pressure is approximately 14.7 psia, so psig = psia - 14.7.",
      },
      {
        type: "diagram",
        key: "PressureBasicsDiagram",
        caption: "Understanding psig vs psia conversions",
      },
      {
        type: "text",
        heading: "Critical Pressure Terms",
        body: "MAWP (Maximum Allowable Working Pressure): The maximum pressure at which equipment is designed to operate. Set Pressure: The pressure at which the PSV begins to open. Accumulation: The pressure increase above MAWP during a relief event, expressed as a percentage. Overpressure: The pressure increase above set pressure when the valve is relieving.",
      },
      {
        type: "callout",
        variant: "example",
        body: "For a vessel with 100 psig MAWP: Set pressure = 100 psig. With 10% allowable accumulation, maximum pressure during relief = 110 psig.",
      },
      {
        type: "text",
        heading: "Relief Device Types",
        body: "PSV (Pressure Safety Valve): Spring-loaded valve that opens automatically at set pressure. PRV (Pressure Relief Valve): Generic term often used interchangeably with PSV. Rupture Disk: Non-reclosing pressure relief device that bursts at a predetermined pressure. PVRV (Pressure/Vacuum Relief Valve): Protects against both overpressure and vacuum conditions.",
      },
      {
        type: "check",
        items: [
          "psig = psia - 14.7 (at sea level)",
          "MAWP is the maximum designed operating pressure",
          "Set pressure ≤ MAWP for single relief devices",
          "Accumulation is expressed as % above MAWP",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-terminology-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 2,
    prerequisiteIds: ["psv-intro"],
  },
  {
    id: "psv-relieving-cases",
    track: "psv",
    title: "Common Relieving Cases",
    estMinutes: 12,
    objectives: [
      "Identify common causes of overpressure in process equipment",
      "Understand how to determine the governing relief case",
      "Learn to analyze blocked outlet, fire case, and control valve failure scenarios",
    ],
    sections: [
      {
        type: "text",
        heading: "What Causes Overpressure?",
        body: "Overpressure can result from many process upsets. The most common causes include: blocked outlet (valve closure), external fire exposure, control valve failure, cooling water failure, power failure, and thermal expansion of trapped liquids. Each scenario must be analyzed to determine required relief capacity.",
      },
      {
        type: "text",
        heading: "Blocked Outlet",
        body: "A blocked outlet scenario occurs when a downstream valve is closed while flow continues into the equipment. The PSV must be sized to handle the maximum inlet flow rate. This is often the governing case for vessels fed by pumps or compressors.",
      },
      {
        type: "text",
        heading: "Fire Case",
        body: "External fire heats equipment, causing liquid to vaporize and pressure to rise. Fire case relief rates are calculated based on wetted surface area and heat input. Fire case often governs for large storage vessels and reactors.",
      },
      {
        type: "text",
        heading: "Control Valve Failure",
        body: "Control valves can fail open or closed. A fail-open upstream control valve can deliver excess flow; a fail-closed downstream valve creates a blocked outlet. Analyze the failure modes to determine worst-case relief requirements.",
      },
      {
        type: "callout",
        variant: "tip",
        body: "Always analyze ALL potential relief cases. The governing case (largest required relief rate) determines the PSV sizing.",
      },
      {
        type: "check",
        items: [
          "Blocked outlet: size for maximum inlet flow",
          "Fire case: based on wetted surface area and heat input",
          "CV failure: analyze fail-open and fail-closed modes",
          "The governing case determines PSV sizing",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-relieving-cases-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 3,
    prerequisiteIds: ["psv-terminology"],
  },
  {
    id: "psv-backpressure",
    track: "psv",
    title: "Understanding Backpressure",
    estMinutes: 15,
    objectives: [
      "Define superimposed and built-up backpressure",
      "Understand how backpressure affects PSV performance",
      "Learn the 10% rule for conventional valves",
    ],
    sections: [
      {
        type: "text",
        heading: "What is Backpressure?",
        body: "Backpressure is the pressure existing at the PSV outlet. It affects valve capacity and can cause chatter, reduced lift, or failure to open properly. Total backpressure = superimposed + built-up backpressure.",
      },
      {
        type: "diagram",
        key: "BackpressureDiagram",
        caption: "Superimposed vs built-up backpressure",
      },
      {
        type: "text",
        heading: "Superimposed Backpressure",
        body: "Superimposed backpressure exists at the PSV outlet BEFORE the valve opens. It comes from the downstream system (e.g., flare header pressure). For valves discharging to atmosphere, superimposed backpressure is zero.",
      },
      {
        type: "text",
        heading: "Built-Up Backpressure",
        body: "Built-up backpressure develops AFTER the valve opens due to flow through the discharge piping. It is a function of the relief flow rate and discharge system design. Built-up backpressure is typically 3-10% of set pressure for properly designed discharge systems.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "For conventional valves, total backpressure should not exceed 10% of set pressure. Higher backpressure requires balanced bellows or pilot-operated valves.",
      },
      {
        type: "text",
        heading: "Variable vs Constant Backpressure",
        body: "Constant backpressure (from atmosphere or a fixed-pressure header) is easier to compensate for. Variable backpressure (from shared flare headers during upsets) is more challenging and typically requires balanced or pilot valves.",
      },
      {
        type: "check",
        items: [
          "Superimposed BP exists before valve opens",
          "Built-up BP develops from discharge flow",
          "Total BP = superimposed + built-up",
          "Conventional valves: keep total BP < 10% of set",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-backpressure-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 4,
    prerequisiteIds: ["psv-relieving-cases"],
  },
  {
    id: "psv-valve-types",
    track: "psv",
    title: "PSV Types: Conventional, Bellows, Pilot",
    estMinutes: 12,
    objectives: [
      "Understand the operating principles of each valve type",
      "Learn when to select each type based on service conditions",
      "Recognize limitations of each valve style",
    ],
    sections: [
      {
        type: "diagram",
        key: "PSVStyleCutaways",
        caption: "Cross-section comparison of valve types",
      },
      {
        type: "text",
        heading: "Conventional Valves",
        body: "Conventional PSVs are the simplest and most common type. The spring force is opposed by system pressure on the inlet side. Backpressure acts on the back of the disc, REDUCING the opening force. Use when: discharging to atmosphere OR backpressure < 10% of set pressure.",
      },
      {
        type: "text",
        heading: "Balanced Bellows Valves",
        body: "Bellows valves have a bellows assembly that isolates the spring from backpressure, making the set pressure independent of backpressure. Use when: variable backpressure exceeds 10% of set pressure, or when process fluid must be isolated from the spring bonnet.",
      },
      {
        type: "text",
        heading: "Pilot-Operated Valves",
        body: "Pilot-operated valves use a pilot to sense pressure and control the main valve. They can handle higher backpressure ratios and provide tighter shutoff than spring-loaded valves. Use when: very high backpressure, tight shutoff required, or operating pressure close to set pressure.",
      },
      {
        type: "callout",
        variant: "tip",
        body: "Selection rule of thumb: ATM discharge → Conventional. Flare with variable BP → Bellows. High BP ratio or tight shutoff → Pilot.",
      },
      {
        type: "check",
        items: [
          "Conventional: simple, backpressure affects performance",
          "Bellows: BP-compensated, corrosion-resistant bonnet",
          "Pilot: high BP tolerance, tight shutoff",
          "Match valve type to backpressure conditions",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-valve-types-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 5,
    prerequisiteIds: ["psv-backpressure"],
  },
  {
    id: "psv-orifice-sizing",
    track: "psv",
    title: "Orifice Letter Designations",
    estMinutes: 10,
    objectives: [
      "Understand standard API orifice letter designations",
      "Learn to match orifice size to required relief capacity",
      "Know when to size up vs select next smaller orifice",
    ],
    sections: [
      {
        type: "text",
        heading: "Standard Orifice Letters",
        body: "API 526 defines standard orifice letter designations from D (smallest) to T (largest). Each letter corresponds to a specific effective orifice area. The orifice must be large enough to pass the required relief flow at the calculated relieving conditions.",
      },
      {
        type: "text",
        heading: "Orifice Area Table",
        body: "D: 0.110 in², E: 0.196 in², F: 0.307 in², G: 0.503 in², H: 0.785 in², J: 1.287 in², K: 1.838 in², L: 2.853 in², M: 3.600 in², N: 4.340 in², P: 6.380 in², Q: 11.05 in², R: 16.00 in², T: 26.00 in².",
      },
      {
        type: "callout",
        variant: "example",
        body: "If your calculated required area is 0.45 in², select orifice G (0.503 in²) – the smallest standard orifice that exceeds the required area.",
      },
      {
        type: "text",
        heading: "Selection Principles",
        body: "Always select the next larger standard orifice when your calculated area falls between sizes. Oversizing slightly is acceptable; undersizing is dangerous. However, excessive oversizing can cause chatter and instability.",
      },
      {
        type: "check",
        items: [
          "API 526 defines standard orifice letters D through T",
          "Each letter = specific effective area",
          "Always round UP to next larger orifice",
          "Avoid excessive oversizing (chatter risk)",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-orifice-sizing-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: ["psv_play"],
    order: 6,
    prerequisiteIds: ["psv-valve-types"],
  },
  {
    id: "psv-gas-service",
    track: "psv",
    title: "Gas Service PSV Applications",
    estMinutes: 12,
    objectives: [
      "Understand gas relief sizing fundamentals",
      "Learn the role of molecular weight, k-value, and compressibility",
      "Recognize critical vs subcritical flow conditions",
    ],
    sections: [
      {
        type: "text",
        heading: "Gas Relief Fundamentals",
        body: "Gas relief sizing is based on mass flow rate (lb/hr) through the orifice. Key properties include: molecular weight (MW), ratio of specific heats (k = Cp/Cv), compressibility factor (Z), and relieving temperature. These properties determine the gas density and flow characteristics.",
      },
      {
        type: "text",
        heading: "Critical vs Subcritical Flow",
        body: "Gas flow through an orifice is typically critical (choked) when the downstream pressure is less than about 53% of upstream pressure. Critical flow means the flow rate is limited by sonic velocity at the orifice throat and is independent of downstream pressure.",
      },
      {
        type: "callout",
        variant: "tip",
        body: "Most gas relief calculations assume critical flow. This is conservative because critical flow represents the maximum achievable mass flow through a given orifice.",
      },
      {
        type: "text",
        heading: "Key Gas Properties",
        body: "Molecular Weight (MW): Higher MW = higher density = higher mass flow for same volumetric flow. k-value: Affects the critical flow function and discharge coefficient. Z: Compressibility factor; Z < 1 for real gases at high pressure.",
      },
      {
        type: "check",
        items: [
          "Gas sizing based on mass flow (lb/hr)",
          "Critical flow = choked at sonic velocity",
          "Higher MW = higher mass flow capacity",
          "Include compressibility factor Z for real gases",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-gas-service-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 7,
    prerequisiteIds: ["psv-orifice-sizing"],
  },
  {
    id: "psv-steam-service",
    track: "psv",
    title: "Steam Service PSV Applications",
    estMinutes: 10,
    objectives: [
      "Understand steam relief sizing considerations",
      "Learn saturated vs superheated steam differences",
      "Apply steam capacity correction factors",
    ],
    sections: [
      {
        type: "text",
        heading: "Steam Relief Basics",
        body: "Steam is a common relief service in refineries and chemical plants. Steam relief sizing uses specific steam flow equations that account for steam properties at relieving conditions. The relieving temperature for saturated steam is determined by the saturation pressure.",
      },
      {
        type: "text",
        heading: "Saturated vs Superheated",
        body: "Saturated steam exists at the boiling point for a given pressure. Superheated steam is above the saturation temperature. Superheated steam has lower density and requires superheat correction factors in sizing calculations.",
      },
      {
        type: "callout",
        variant: "example",
        body: "At 150 psig (164.7 psia), saturated steam temperature is approximately 366°F. If your steam is at 450°F, it's superheated by 84°F.",
      },
      {
        type: "text",
        heading: "Sizing Considerations",
        body: "For steam, you typically know the mass flow rate (lb/hr) from heat and material balance. Steam properties (MW=18.02, k≈1.33) are well-defined. The discharge coefficient (Kd) may vary from gas service values.",
      },
      {
        type: "check",
        items: [
          "Steam relief uses mass flow basis",
          "Saturated steam T determined by pressure",
          "Superheat requires correction factors",
          "Steam: MW = 18.02, k ≈ 1.33",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-steam-service-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 8,
    prerequisiteIds: ["psv-gas-service"],
  },
  {
    id: "psv-liquid-service",
    track: "psv",
    title: "Liquid Service PSV Applications",
    estMinutes: 12,
    objectives: [
      "Understand liquid relief sizing differences from gas",
      "Learn the role of specific gravity and viscosity",
      "Recognize thermal relief applications",
    ],
    sections: [
      {
        type: "text",
        heading: "Liquid Relief Basics",
        body: "Liquid relief sizing is based on volumetric flow rate (GPM) rather than mass flow. Liquids are incompressible, so flow rate depends on differential pressure across the valve, fluid density (specific gravity), and viscosity.",
      },
      {
        type: "text",
        heading: "Specific Gravity and Viscosity",
        body: "Specific Gravity (SG): Ratio of liquid density to water. Higher SG = higher mass flow for same volumetric flow. Viscosity: Affects flow through the orifice. High-viscosity liquids require viscosity correction factors.",
      },
      {
        type: "text",
        heading: "Thermal Expansion Relief",
        body: "Liquid trapped in equipment (blocked-in heat exchangers, piping) can expand when heated, generating hydraulic pressure. Thermal relief valves are sized for small flow rates (often 1-10 GPM) to relieve this expansion.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "Liquid thermal relief is often overlooked. Any equipment that can be blocked in AND heated needs thermal relief protection.",
      },
      {
        type: "check",
        items: [
          "Liquid sizing uses volumetric flow (GPM)",
          "SG affects mass capacity",
          "High viscosity requires correction",
          "Thermal relief for blocked-in heated equipment",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-liquid-service-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 9,
    prerequisiteIds: ["psv-steam-service"],
  },
  {
    id: "psv-discharge-systems",
    track: "psv",
    title: "Discharge Systems: ATM vs Flare vs Closed",
    estMinutes: 10,
    objectives: [
      "Compare atmospheric, flare, and closed discharge systems",
      "Understand when each discharge type is appropriate",
      "Learn environmental and safety considerations",
    ],
    sections: [
      {
        type: "text",
        heading: "Atmospheric Discharge",
        body: "Discharge to atmosphere is the simplest option but is limited to non-hazardous fluids. Steam, air, and inert gases may be discharged to atmosphere with proper location and dispersion. Environmental regulations restrict atmospheric discharge of VOCs and toxics.",
      },
      {
        type: "text",
        heading: "Flare System Discharge",
        body: "Flare systems collect relief discharges and combust them safely. Flare headers are shared among multiple relief sources, creating variable backpressure. Flare systems include knockout drums to separate liquids before the flare tip.",
      },
      {
        type: "text",
        heading: "Closed System Discharge",
        body: "Closed systems route relief discharges to containment vessels, scrubbers, or process equipment for recovery. Used when discharge fluid has value or cannot be released to atmosphere or flare.",
      },
      {
        type: "callout",
        variant: "tip",
        body: "The discharge destination affects valve selection: ATM = no backpressure concerns; Flare = variable backpressure, consider bellows/pilot; Closed = evaluate back pressure case-by-case.",
      },
      {
        type: "check",
        items: [
          "ATM: simple but limited to safe fluids",
          "Flare: handles hazardous fluids, creates BP",
          "Closed: for recovery or containment",
          "Discharge type influences valve selection",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-discharge-systems-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 10,
    prerequisiteIds: ["psv-liquid-service"],
  },
  {
    id: "psv-datasheet-workflow",
    track: "psv",
    title: "The PSV Datasheet Workflow",
    estMinutes: 12,
    objectives: [
      "Understand the purpose and structure of a PSV datasheet",
      "Learn to populate key datasheet fields correctly",
      "Practice the end-to-end PSV specification workflow",
    ],
    sections: [
      {
        type: "text",
        heading: "Purpose of the Datasheet",
        body: "The PSV datasheet is a formal specification document that captures all requirements for valve selection. It communicates design basis to vendors, provides documentation for regulatory compliance, and serves as reference for maintenance and operations.",
      },
      {
        type: "text",
        heading: "Key Datasheet Sections",
        body: "1) Header: Unit, equipment, tag number, revision. 2) Service Conditions: Set pressure, relieving temp, fluid type. 3) Relieving Requirements: Case, flow rate, fluid properties. 4) Discharge: Destination, backpressure. 5) Selection: Valve type, orifice, materials.",
      },
      {
        type: "callout",
        variant: "example",
        body: "A properly completed datasheet tells the full story: WHY the valve is needed (relieving case), WHAT it must handle (flow, properties), and HOW it connects (discharge system).",
      },
      {
        type: "text",
        heading: "Common Datasheet Errors",
        body: "Missing relieving case identification, incorrect pressure units (psig vs psia), omitting backpressure, incomplete fluid properties, and mismatched inlet/outlet connections. Always double-check units and completeness.",
      },
      {
        type: "check",
        items: [
          "Datasheet = formal PSV specification",
          "Include all required fields for your service",
          "Verify units (psig vs psia)",
          "Document relieving case and discharge destination",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-datasheet-workflow-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 11,
    prerequisiteIds: ["psv-discharge-systems"],
  },
  {
    id: "psv-common-mistakes",
    track: "psv",
    title: "Common Mistakes & Best Practices",
    estMinutes: 8,
    objectives: [
      "Recognize common PSV selection errors",
      "Learn best practices for reliable relief system design",
      "Understand the consequences of improper PSV selection",
    ],
    sections: [
      {
        type: "text",
        heading: "Mistake: Ignoring Backpressure",
        body: "Using a conventional valve in high-backpressure service is a common and dangerous mistake. The valve may not open at set pressure, or may have significantly reduced capacity. Always evaluate backpressure and select appropriate valve type.",
      },
      {
        type: "text",
        heading: "Mistake: Wrong Relieving Case",
        body: "Sizing for a non-governing case undersizes the PSV. Always analyze all credible overpressure scenarios and size for the worst case. Fire case is often overlooked for vessels with large surface area.",
      },
      {
        type: "text",
        heading: "Mistake: Unit Confusion",
        body: "Mixing psig and psia, or lb/hr and kg/hr, leads to sizing errors. Establish clear unit conventions and verify at each step. Document units clearly on datasheets.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "PSV errors can be deadly. An undersized or improperly selected valve may not protect the equipment when needed most.",
      },
      {
        type: "text",
        heading: "Best Practices",
        body: "1) Always identify the governing relieving case. 2) Evaluate backpressure for every PSV. 3) Match valve type to service conditions. 4) Use standard orifice sizes (API 526). 5) Document assumptions clearly. 6) Have designs independently checked.",
      },
      {
        type: "check",
        items: [
          "Evaluate ALL backpressure sources",
          "Identify and size for the governing case",
          "Verify units throughout calculations",
          "Independent review of PSV specifications",
        ],
      },
      {
        type: "quiz",
        quizId: "psv-common-mistakes-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: ["coach_mode_off"],
    order: 12,
    prerequisiteIds: ["psv-datasheet-workflow"],
  },

  // ============================================================================
  // TANK & FLAME TRACK - 6 LESSONS
  // ============================================================================
  {
    id: "tank-intro",
    track: "tank_flame",
    title: "Introduction to Tank Protection",
    estMinutes: 10,
    objectives: [
      "Understand the unique pressure challenges of atmospheric storage tanks",
      "Learn the difference between pressure venting and vacuum protection",
      "Recognize API 2000 as the governing standard",
    ],
    sections: [
      {
        type: "text",
        heading: "Why Tanks Are Different",
        body: "Atmospheric storage tanks operate near ambient pressure and have thin shells compared to pressure vessels. They cannot withstand significant overpressure or vacuum. Even small pressure differentials (inches of water column) can cause tank failure.",
      },
      {
        type: "diagram",
        key: "TankBreathingDiagram",
        caption: "Tank breathing: in-breathing and out-breathing scenarios",
      },
      {
        type: "text",
        heading: "Tank Breathing",
        body: "Tanks 'breathe' due to thermal effects and pumping operations. Out-breathing (pressure relief) occurs during filling or heating. In-breathing (vacuum relief) occurs during emptying or cooling. Both must be accommodated to prevent damage.",
      },
      {
        type: "text",
        heading: "API 2000 Standard",
        body: "API 2000 provides guidelines for venting atmospheric and low-pressure storage tanks. It covers normal venting (thermal breathing, filling, emptying) and emergency venting (fire exposure). Compliance is essential for safe tank operations.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "Tank failures can occur rapidly. A vacuum failure can collapse a tank in seconds; overpressure can rupture the roof-to-shell seam.",
      },
      {
        type: "check",
        items: [
          "Tanks have low pressure tolerance (inches WC)",
          "Out-breathing = pressure relief",
          "In-breathing = vacuum relief",
          "API 2000 governs tank venting",
        ],
      },
      {
        type: "quiz",
        quizId: "tank-intro-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 1,
  },
  {
    id: "tank-venting-requirements",
    track: "tank_flame",
    title: "Calculating Venting Requirements",
    estMinutes: 12,
    objectives: [
      "Calculate normal venting requirements for thermal breathing",
      "Determine venting needs for liquid movement operations",
      "Understand emergency venting for fire exposure",
    ],
    sections: [
      {
        type: "text",
        heading: "Normal Venting Components",
        body: "Normal venting includes: 1) Thermal breathing (temperature changes causing vapor expansion/contraction), 2) Liquid movement (filling displaces vapor, emptying requires air), 3) Operating variations. These are calculated per API 2000 tables and formulas.",
      },
      {
        type: "text",
        heading: "Thermal Breathing",
        body: "Temperature changes cause tank contents to expand and contract. A tank may require both outbreathing (during heating or sun exposure) and inbreathing (during cooling or cold weather). API 2000 provides factors based on tank size and latitude.",
      },
      {
        type: "text",
        heading: "Liquid Movement",
        body: "During filling, liquid entering the tank displaces vapor that must be vented. During emptying, vapor space increases and air (or inert gas) must enter. Maximum pump rates determine liquid movement venting requirements.",
      },
      {
        type: "text",
        heading: "Emergency Venting",
        body: "Fire exposure generates massive vapor volumes that exceed normal venting capacity. Emergency vents (usually open in fire) provide the additional capacity. Sized per API 2000 fire exposure calculations based on wetted surface area.",
      },
      {
        type: "callout",
        variant: "tip",
        body: "Total venting requirement = MAX of (thermal + movement, emergency). Don't add normal and emergency—they don't occur simultaneously.",
      },
      {
        type: "check",
        items: [
          "Normal = thermal + liquid movement",
          "Emergency = fire exposure based",
          "Total = MAX of normal or emergency",
          "API 2000 provides calculation methods",
        ],
      },
      {
        type: "quiz",
        quizId: "tank-venting-requirements-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: [],
    order: 2,
    prerequisiteIds: ["tank-intro"],
  },
  {
    id: "tank-pvrv-selection",
    track: "tank_flame",
    title: "PVRV Selection and Sizing",
    estMinutes: 10,
    objectives: [
      "Understand PVRV operating principles",
      "Learn to select appropriate PVRV settings",
      "Match PVRV capacity to venting requirements",
    ],
    sections: [
      {
        type: "text",
        heading: "What is a PVRV?",
        body: "A Pressure/Vacuum Relief Valve (PVRV) protects tanks against both overpressure and vacuum. It has two settings: pressure setting for out-breathing relief and vacuum setting for in-breathing relief. PVRVs are the primary protection for most storage tanks.",
      },
      {
        type: "text",
        heading: "Setting Selection",
        body: "Pressure setting should be below tank design pressure (typically 1-2 oz/sq in or inches WC). Vacuum setting should exceed maximum expected vacuum during operations. Consider instrument purge, blanket gas, and pump rates when setting.",
      },
      {
        type: "text",
        heading: "Capacity Matching",
        body: "PVRV capacity must meet or exceed normal venting requirements. Multiple PVRVs may be installed to achieve required capacity. Capacity is stated in SCFH (standard cubic feet per hour) of air at specified differential pressures.",
      },
      {
        type: "callout",
        variant: "example",
        body: "A tank requiring 50,000 SCFH out-breathing might use two PVRVs each rated for 30,000 SCFH, providing adequate margin.",
      },
      {
        type: "check",
        items: [
          "PVRV = pressure AND vacuum protection",
          "Settings below tank design limits",
          "Capacity ≥ normal venting requirement",
          "Multiple units for large tanks",
        ],
      },
      {
        type: "quiz",
        quizId: "tank-pvrv-selection-quiz",
      },
    ],
    requiredToUnlock: true,
    unlocks: ["tank_flame_play"],
    order: 3,
    prerequisiteIds: ["tank-venting-requirements"],
  },
  {
    id: "tank-flame-arresters",
    track: "tank_flame",
    title: "Flame Arresters Fundamentals",
    estMinutes: 10,
    objectives: [
      "Understand how flame arresters prevent fire propagation",
      "Learn the difference between deflagration and detonation arresters",
      "Know when flame arresters are required",
    ],
    sections: [
      {
        type: "text",
        heading: "Why Flame Arresters?",
        body: "Tanks containing flammable liquids can have combustible vapor spaces. A flame arrester prevents external ignition sources from propagating back into the tank. It quenches flames by absorbing heat through a matrix of small passages.",
      },
      {
        type: "text",
        heading: "Operating Principle",
        body: "Flame arresters contain a 'crimped ribbon' or matrix element with passages smaller than the flame quenching diameter. The flame front is divided into small segments and heat is absorbed, extinguishing the flame before it passes through.",
      },
      {
        type: "text",
        heading: "Deflagration vs Detonation",
        body: "Deflagration arresters handle subsonic flame fronts (slower burning). Detonation arresters handle supersonic flame fronts from pipe detonations. End-of-line arresters (at tank vents) are typically deflagration type; in-line arresters may be detonation type.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "Flame arresters must be properly maintained. Fouling or corrosion can block flow or compromise flame-stopping ability.",
      },
      {
        type: "check",
        items: [
          "Flame arresters stop fire propagation",
          "Work by absorbing heat from flame front",
          "Deflagration = subsonic flames",
          "Detonation = supersonic flames",
        ],
      },
      {
        type: "quiz",
        quizId: "tank-flame-arresters-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 4,
    prerequisiteIds: ["tank-pvrv-selection"],
  },
  {
    id: "tank-vapor-control",
    track: "tank_flame",
    title: "Vapor Control Systems",
    estMinutes: 12,
    objectives: [
      "Understand vapor recovery unit (VRU) operations",
      "Learn when vapor control is required by regulation",
      "Integrate vapor control with tank venting systems",
    ],
    sections: [
      {
        type: "diagram",
        key: "VaporControlPathDiagram",
        caption: "Vapor routing options: ATM, VRU, or Flare",
      },
      {
        type: "text",
        heading: "Why Vapor Control?",
        body: "Environmental regulations limit VOC emissions from tanks. Vapor control systems capture displaced vapors during filling or breathing. Options include vapor recovery units (VRUs), vapor combustion units, or connection to flare systems.",
      },
      {
        type: "text",
        heading: "Vapor Recovery Units",
        body: "VRUs compress and recover tank vapors, either returning them to the tank as liquid or sending them to a fuel gas system. They require reliable operation; PVRV bypass protection is essential for VRU trips or overload.",
      },
      {
        type: "text",
        heading: "Integration with Venting",
        body: "Vapor control systems must be sized for normal venting rates. PVRVs still required for emergency venting (fire) and VRU failure scenarios. Proper sequencing ensures VRU operates first, PVRVs open only if VRU capacity exceeded.",
      },
      {
        type: "callout",
        variant: "tip",
        body: "Never rely solely on vapor control for tank protection. PVRVs remain the safety backup when vapor control systems are offline or overwhelmed.",
      },
      {
        type: "check",
        items: [
          "Vapor control captures VOC emissions",
          "VRU returns vapors to process",
          "PVRVs required as backup protection",
          "Size vapor control for normal operations",
        ],
      },
      {
        type: "quiz",
        quizId: "tank-vapor-control-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 5,
    prerequisiteIds: ["tank-flame-arresters"],
  },
  {
    id: "tank-overfill-protection",
    track: "tank_flame",
    title: "Overfill Protection Systems",
    estMinutes: 10,
    objectives: [
      "Understand the layers of overfill protection",
      "Learn about independent high-high level alarms",
      "Know regulatory requirements for overfill prevention",
    ],
    sections: [
      {
        type: "diagram",
        key: "OverfillLayersDiagram",
        caption: "Layers of protection: gauge → alarm → shutdown",
      },
      {
        type: "text",
        heading: "Why Overfill Matters",
        body: "Overfilling a tank can cause environmental spills, equipment damage, fires, and loss of containment. Overfill protection uses multiple layers of detection and response to prevent these incidents.",
      },
      {
        type: "text",
        heading: "Protection Layers",
        body: "Layer 1: Manual gauging and inspection. Layer 2: High level alarm (alerts operators). Layer 3: High-high level alarm (independent, safety-critical). Layer 4: Automatic shutdown (closes inlet valves). Defense in depth provides reliable protection.",
      },
      {
        type: "text",
        heading: "Independent High-High Alarms",
        body: "Safety-critical high-high level switches must be independent from process level instruments. They should have separate sensing elements, separate wiring, and alarm to a safety system (not just DCS). Test regularly to ensure functionality.",
      },
      {
        type: "callout",
        variant: "warning",
        body: "API 2350 and EPA SPCC rules mandate specific overfill protection requirements. Non-compliance can result in significant penalties and increased incident risk.",
      },
      {
        type: "check",
        items: [
          "Multiple independent protection layers",
          "High-high alarm separate from process instruments",
          "Automatic shutdown as last resort",
          "API 2350 and SPCC compliance required",
        ],
      },
      {
        type: "quiz",
        quizId: "tank-overfill-protection-quiz",
      },
    ],
    requiredToUnlock: false,
    unlocks: [],
    order: 6,
    prerequisiteIds: ["tank-vapor-control"],
  },
];

// Helper functions
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByTrack(track: "psv" | "tank_flame"): Lesson[] {
  return lessons.filter((l) => l.track === track).sort((a, b) => a.order - b.order);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const current = getLessonById(currentLessonId);
  if (!current) return undefined;
  
  const trackLessons = getLessonsByTrack(current.track);
  const currentIndex = trackLessons.findIndex((l) => l.id === currentLessonId);
  
  if (currentIndex >= 0 && currentIndex < trackLessons.length - 1) {
    return trackLessons[currentIndex + 1];
  }
  return undefined;
}

export function isLessonUnlocked(
  lessonId: string,
  completedLessons: string[]
): boolean {
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;
  
  // First lesson in each track is always unlocked
  const trackLessons = getLessonsByTrack(lesson.track);
  if (trackLessons[0]?.id === lessonId) return true;
  
  // Check if all prerequisites are completed
  if (lesson.prerequisiteIds && lesson.prerequisiteIds.length > 0) {
    return lesson.prerequisiteIds.every((prereqId) =>
      completedLessons.includes(prereqId)
    );
  }
  
  return true;
}

export function getRequiredLessonsForUnlock(
  unlockKey: "psv_play" | "tank_flame_play" | "coach_mode_off"
): Lesson[] {
  // Find all lessons that are required AND lead to this unlock
  const track = unlockKey === "tank_flame_play" ? "tank_flame" : "psv";
  const trackLessons = getLessonsByTrack(track);
  
  // Find the lesson that grants this unlock
  const unlockingLesson = trackLessons.find((l) => l.unlocks.includes(unlockKey));
  
  if (!unlockingLesson) return [];
  
  // Return all required lessons up to and including the unlocking lesson
  return trackLessons.filter(
    (l) => l.requiredToUnlock && l.order <= unlockingLesson.order
  );
}
