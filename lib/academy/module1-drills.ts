/**
 * Module 1 Drills - Practice questions with immediate feedback
 * Each drill maps to a lesson and includes remediation links to specific steps
 */

export interface DrillQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint?: string;
  explanation: string;
  remediationStepIndex?: number;  // Which step to review if wrong
  remediationLabel?: string;      // Label for the remediation link
}

export interface Drill {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  questions: DrillQuestion[];
}

export const module1Drills: Drill[] = [
  // =============================================================================
  // LESSON 1: What is Pressure Relief
  // =============================================================================
  {
    id: "drill-m1-l1",
    lessonId: "m1-l1",
    title: "PSV Fundamentals",
    description: "Practice identifying PSV purpose and terminology before the quiz",
    questions: [
      {
        id: "m1l1-q1",
        question: "A PSV is described as the 'last line of defense.' What does this mean?",
        options: [
          "PSVs are the most expensive safety device",
          "PSVs act after all other protections have failed",
          "PSVs should be the first device to respond",
          "PSVs require manual operation"
        ],
        correctIndex: 1,
        hint: "Think about when a PSV should actually open",
        explanation: "PSVs are designed to open automatically AFTER process controls, alarms, and operator intervention have failed to prevent overpressure. They are the last layer of protection.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality step"
      },
      {
        id: "m1l1-q2",
        question: "What is MAWP?",
        options: [
          "Maximum Actual Working Pressure",
          "Minimum Allowable Working Pressure", 
          "Maximum Allowable Working Pressure",
          "Measured Average Working Pressure"
        ],
        correctIndex: 2,
        explanation: "MAWP = Maximum Allowable Working Pressure. It's the highest pressure at which a vessel can legally operate, stamped on the nameplate.",
        remediationStepIndex: 1,
        remediationLabel: "Review Core Definitions"
      },
      {
        id: "m1l1-q3",
        question: "What is the relationship between set pressure and MAWP for a single PSV?",
        options: [
          "Set pressure must equal MAWP",
          "Set pressure must be at or below MAWP",
          "Set pressure must be 10% above MAWP",
          "Set pressure has no relationship to MAWP"
        ],
        correctIndex: 1,
        hint: "The PSV must open BEFORE the vessel exceeds its design limit",
        explanation: "For a single PSV, set pressure must be at or below MAWP to ensure protection before the vessel exceeds its design pressure.",
        remediationStepIndex: 1,
        remediationLabel: "Review Core Definitions"
      },
      {
        id: "m1l1-q4",
        question: "What is accumulation?",
        options: [
          "Pressure increase above operating pressure",
          "Pressure increase above MAWP during relief",
          "The amount of fluid released",
          "The time it takes for the PSV to open"
        ],
        correctIndex: 1,
        explanation: "Accumulation is the pressure rise above MAWP during a relief event, typically limited to 10% for single PSVs.",
        remediationStepIndex: 1,
        remediationLabel: "Review Core Definitions"
      },
      {
        id: "m1l1-q5",
        question: "During a field walkdown, you notice the inlet block valve to a PSV is partially closed. This is:",
        options: [
          "Normal procedure for maintenance",
          "A serious safety issue - the PSV may be isolated",
          "Required by API standards",
          "Only a problem if the valve is fully closed"
        ],
        correctIndex: 1,
        hint: "What happens if the PSV can't sense system pressure?",
        explanation: "A partially or fully closed inlet block valve can isolate the PSV from the protected equipment, defeating its protective function. This is a critical safety finding.",
        remediationStepIndex: 3,
        remediationLabel: "Review Field Walkdown"
      },
      {
        id: "m1l1-q6",
        question: "Which of the following is a common mistake that could lead to a PSV failure?",
        options: [
          "Setting the PSV at MAWP",
          "Using a PSV as a process control device",
          "Installing the PSV on the top of a vessel",
          "Sizing for the governing case"
        ],
        correctIndex: 1,
        hint: "PSVs should rarely lift during normal operations",
        explanation: "Using a PSV as a process control device causes excessive wear, seat damage, and potential failure when actually needed. PSVs should only lift during upsets.",
        remediationStepIndex: 6,
        remediationLabel: "Review Common Wrong Moves"
      }
    ]
  },

  // =============================================================================
  // LESSON 2: Pressure & Temperature Units
  // =============================================================================
  {
    id: "drill-m1-l2",
    lessonId: "m1-l2",
    title: "Unit Conversions",
    description: "Practice converting between pressure and temperature units",
    questions: [
      {
        id: "m1l2-q1",
        question: "A vessel operates at 150 psig. What is this in psia?",
        options: [
          "135.3 psia",
          "150 psia",
          "164.7 psia",
          "165 psia"
        ],
        correctIndex: 2,
        hint: "Add atmospheric pressure (14.7 psi at sea level)",
        explanation: "PSIA = PSIG + 14.7, so 150 + 14.7 = 164.7 psia",
        remediationStepIndex: 1,
        remediationLabel: "Review Unit Conversion Essentials"
      },
      {
        id: "m1l2-q2",
        question: "Gas sizing equations require which type of pressure?",
        options: [
          "Gauge pressure (psig)",
          "Absolute pressure (psia)",
          "Either one - it doesn't matter",
          "Differential pressure"
        ],
        correctIndex: 1,
        explanation: "Gas sizing equations are based on gas laws (like PV=nRT) which require absolute pressure and temperature values.",
        remediationStepIndex: 1,
        remediationLabel: "Review Unit Conversion Essentials"
      },
      {
        id: "m1l2-q3",
        question: "Convert 200°F to absolute temperature (Rankine):",
        options: [
          "200°R",
          "460°R",
          "660°R",
          "260°R"
        ],
        correctIndex: 2,
        hint: "°R = °F + 460",
        explanation: "To convert Fahrenheit to Rankine: °R = °F + 460, so 200 + 460 = 660°R",
        remediationStepIndex: 1,
        remediationLabel: "Review Unit Conversion Essentials"
      },
      {
        id: "m1l2-q4",
        question: "What does it mean when a gauge reads 0 psig?",
        options: [
          "Perfect vacuum",
          "Atmospheric pressure",
          "Zero absolute pressure",
          "Maximum pressure"
        ],
        correctIndex: 1,
        explanation: "0 psig = atmospheric pressure = 14.7 psia at sea level. Gauge pressure reads relative to atmosphere.",
        remediationStepIndex: 2,
        remediationLabel: "Review the Diagram"
      },
      {
        id: "m1l2-q5",
        question: "An engineer uses 100 psig in a gas sizing equation instead of converting to psia. The result will be:",
        options: [
          "Slightly oversized",
          "Significantly undersized",
          "Correct - conversion isn't needed",
          "Slightly undersized"
        ],
        correctIndex: 1,
        hint: "Using 100 instead of 114.7 is a ~13% error in pressure",
        explanation: "Using psig instead of psia causes significant undersizing because the pressure value is lower than it should be. This error has caused real incidents.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      },
      {
        id: "m1l2-q6",
        question: "At 5,000 ft elevation, atmospheric pressure is approximately:",
        options: [
          "14.7 psia (same as sea level)",
          "12.2 psia",
          "16.5 psia",
          "10.0 psia"
        ],
        correctIndex: 1,
        explanation: "Atmospheric pressure decreases with elevation. At 5,000 ft, it's approximately 12.2 psia, not 14.7. This matters for high-altitude facilities.",
        remediationStepIndex: 7,
        remediationLabel: "Review Common Wrong Moves"
      }
    ]
  },

  // =============================================================================
  // LESSON 3: Relieving Cases
  // =============================================================================
  {
    id: "drill-m1-l3",
    lessonId: "m1-l3",
    title: "Identifying Relieving Scenarios",
    description: "Practice identifying the correct relieving case for different situations",
    questions: [
      {
        id: "m1l3-q1",
        question: "A pump delivers 500 GPM to a vessel. If the outlet valve closes, what is the relieving case?",
        options: [
          "Fire case",
          "Blocked outlet",
          "Thermal expansion",
          "Control valve failure"
        ],
        correctIndex: 1,
        hint: "All inlet flow must go somewhere",
        explanation: "This is a classic blocked outlet scenario. The PSV must be sized to handle the full pump capacity (500 GPM) when the outlet is blocked.",
        remediationStepIndex: 1,
        remediationLabel: "Review Major Relieving Cases"
      },
      {
        id: "m1l3-q2",
        question: "What determines fire case relief capacity?",
        options: [
          "Maximum pump flow rate",
          "Wetted surface area and heat input",
          "Normal operating temperature",
          "Pipe diameter"
        ],
        correctIndex: 1,
        explanation: "Fire case is calculated based on wetted surface area (liquid-contacted area up to 25 ft elevation) and the resulting heat input from the fire.",
        remediationStepIndex: 1,
        remediationLabel: "Review Major Relieving Cases"
      },
      {
        id: "m1l3-q3",
        question: "The 'governing case' for PSV sizing is:",
        options: [
          "The most likely scenario to occur",
          "The scenario requiring the largest relief capacity",
          "The easiest scenario to calculate",
          "Always the blocked outlet case"
        ],
        correctIndex: 1,
        explanation: "The governing case is the scenario that requires the largest relief capacity. The PSV must be sized for this worst case.",
        remediationStepIndex: 5,
        remediationLabel: "Review Decision Checklist"
      },
      {
        id: "m1l3-q4",
        question: "A large storage vessel has a small PSV that was sized for blocked outlet only. What might have been overlooked?",
        options: [
          "Control valve failure",
          "Fire case (which often governs for large vessels)",
          "Tube rupture",
          "Power failure"
        ],
        correctIndex: 1,
        hint: "Large surface area = large heat input from fire",
        explanation: "Fire case often governs for large vessels because their large wetted surface area creates a massive vapor generation rate during a fire.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      },
      {
        id: "m1l3-q5",
        question: "When should thermal relief be evaluated?",
        options: [
          "Only on steam systems",
          "When liquid can be blocked in and heated",
          "Only on cryogenic systems",
          "Thermal relief is never required"
        ],
        correctIndex: 1,
        explanation: "Thermal relief is needed any time liquid can be isolated (blocked in) and subsequently heated—by sun, steam tracing, or adjacent hot equipment.",
        remediationStepIndex: 3,
        remediationLabel: "Review Field Walkdown"
      },
      {
        id: "m1l3-q6",
        question: "For a heat exchanger with 500 psig on the tube side and 50 psig on the shell side, which side needs tube rupture protection?",
        options: [
          "The tube side (500 psig)",
          "The shell side (50 psig)",
          "Both sides equally",
          "Neither - tube rupture doesn't apply"
        ],
        correctIndex: 1,
        hint: "High pressure flows to low pressure if tubes fail",
        explanation: "The low-pressure side (shell, 50 psig) needs protection because high-pressure fluid (500 psig) could cause massive overpressure if tubes rupture.",
        remediationStepIndex: 1,
        remediationLabel: "Review Major Relieving Cases"
      }
    ]
  },

  // =============================================================================
  // LESSON 4: Backpressure
  // =============================================================================
  {
    id: "drill-m1-l4",
    lessonId: "m1-l4",
    title: "Backpressure Calculations",
    description: "Practice identifying and calculating backpressure effects",
    questions: [
      {
        id: "m1l4-q1",
        question: "A PSV with 100 psig set pressure discharges to a flare header at 15 psig. What is the superimposed backpressure?",
        options: [
          "100 psig",
          "15 psig",
          "85 psig",
          "115 psig"
        ],
        correctIndex: 1,
        explanation: "Superimposed backpressure is the pressure at the PSV outlet BEFORE the valve opens—in this case, the flare header pressure of 15 psig.",
        remediationStepIndex: 1,
        remediationLabel: "Review Backpressure Types"
      },
      {
        id: "m1l4-q2",
        question: "Built-up backpressure develops from:",
        options: [
          "The flare header pressure",
          "Atmospheric pressure",
          "Flow through the discharge piping after the valve opens",
          "The spring force"
        ],
        correctIndex: 2,
        explanation: "Built-up backpressure is the pressure increase that develops AFTER the valve opens, caused by flow resistance in the discharge piping.",
        remediationStepIndex: 1,
        remediationLabel: "Review Backpressure Types"
      },
      {
        id: "m1l4-q3",
        question: "If superimposed BP = 15 psig and built-up BP = 8 psig, what is total BP as % of 100 psig set?",
        options: [
          "15%",
          "8%",
          "23%",
          "7%"
        ],
        correctIndex: 2,
        hint: "Total = superimposed + built-up",
        explanation: "Total BP = 15 + 8 = 23 psig. As % of set: 23/100 × 100 = 23%",
        remediationStepIndex: 1,
        remediationLabel: "Review Backpressure Types"
      },
      {
        id: "m1l4-q4",
        question: "A conventional PSV is acceptable when total backpressure is:",
        options: [
          "Less than 50% of set pressure",
          "Less than 10% of set pressure",
          "Any backpressure is fine",
          "Less than 25% of set pressure"
        ],
        correctIndex: 1,
        explanation: "The 10% rule: conventional valves should have total backpressure less than 10% of set pressure to maintain proper performance.",
        remediationStepIndex: 5,
        remediationLabel: "Review Valve Selection Criteria"
      },
      {
        id: "m1l4-q5",
        question: "During a plant upset, 5 PSVs lift simultaneously to a shared flare header. What happens to header pressure?",
        options: [
          "It stays constant",
          "It decreases",
          "It spikes significantly higher",
          "It has no effect on PSV performance"
        ],
        correctIndex: 2,
        hint: "More flow = higher pressure drop in the header",
        explanation: "Multiple PSVs lifting simultaneously creates a surge of flow into the header, significantly increasing backpressure on all connected PSVs.",
        remediationStepIndex: 3,
        remediationLabel: "Review Flare Header Diagram"
      },
      {
        id: "m1l4-q6",
        question: "A conventional valve on a flare system with 30% backpressure may:",
        options: [
          "Work perfectly fine",
          "Fail to open at set pressure or have reduced capacity",
          "Have increased capacity",
          "Only affect liquid service"
        ],
        correctIndex: 1,
        explanation: "At 30% backpressure (exceeding the 10% limit), a conventional valve's set pressure shifts up and capacity is reduced—it may not protect the equipment.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      }
    ]
  },

  // =============================================================================
  // LESSON 5: Valve Styles
  // =============================================================================
  {
    id: "drill-m1-l5",
    lessonId: "m1-l5",
    title: "Valve Type Selection",
    description: "Practice selecting the right PSV type for different service conditions",
    questions: [
      {
        id: "m1l5-q1",
        question: "Which valve type is simplest and lowest cost?",
        options: [
          "Pilot-operated",
          "Balanced bellows",
          "Conventional",
          "Rupture disk"
        ],
        correctIndex: 2,
        explanation: "Conventional PSVs have the simplest construction (spring-loaded, no bellows or pilot) and lowest cost.",
        remediationStepIndex: 3,
        remediationLabel: "Review Valve Type Characteristics"
      },
      {
        id: "m1l5-q2",
        question: "A PSV is needed for a service with 25% variable backpressure. Which type?",
        options: [
          "Conventional - backpressure doesn't matter",
          "Balanced bellows or pilot-operated",
          "Either type works",
          "Rupture disk only"
        ],
        correctIndex: 1,
        explanation: "25% backpressure exceeds the 10% limit for conventional valves. Balanced bellows (compensates for BP) or pilot-operated (handles high BP) is required.",
        remediationStepIndex: 5,
        remediationLabel: "Review Selection Checklist"
      },
      {
        id: "m1l5-q3",
        question: "A process operates at 95 psig with a 100 psig set pressure. What valve type provides the best seal?",
        options: [
          "Conventional - tight shutoff above 90%",
          "Pilot-operated - tight shutoff to 98% of set",
          "Either type is fine at 95%",
          "No valve will work at 95%"
        ],
        correctIndex: 1,
        hint: "Conventional valves need 10%+ margin",
        explanation: "Pilot-operated valves provide tight shutoff even at 98% of set pressure. Conventional valves leak when operating above 90% of set.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      },
      {
        id: "m1l5-q4",
        question: "What does the bellows in a balanced bellows valve do?",
        options: [
          "Increases flow capacity",
          "Isolates the spring chamber from backpressure",
          "Measures inlet pressure",
          "Provides additional spring force"
        ],
        correctIndex: 1,
        explanation: "The bellows isolates the spring chamber from discharge backpressure, maintaining constant set pressure regardless of downstream conditions.",
        remediationStepIndex: 1,
        remediationLabel: "Review PSV Style Cutaways"
      },
      {
        id: "m1l5-q5",
        question: "What happens if the bellows fails (tears) in a bellows valve?",
        options: [
          "The valve won't open at all",
          "The valve behaves like a conventional valve",
          "Set pressure increases",
          "Flow capacity doubles"
        ],
        correctIndex: 1,
        explanation: "A torn bellows allows backpressure to act on the disc, eliminating the backpressure compensation. The valve behaves like a conventional valve.",
        remediationStepIndex: 7,
        remediationLabel: "Review Common Wrong Moves"
      },
      {
        id: "m1l5-q6",
        question: "For a simple atmospheric discharge with operating pressure at 70% of set, which valve type is most appropriate?",
        options: [
          "Pilot-operated for best performance",
          "Balanced bellows for safety margin",
          "Conventional - simplest and adequate",
          "Rupture disk"
        ],
        correctIndex: 2,
        explanation: "For ATM discharge (zero superimposed BP) with adequate operating margin (70% of set), a conventional valve is the simplest and most cost-effective choice.",
        remediationStepIndex: 5,
        remediationLabel: "Review Selection Checklist"
      }
    ]
  },

  // =============================================================================
  // LESSON 6: Tank Protection
  // =============================================================================
  {
    id: "drill-m1-l6",
    lessonId: "m1-l6",
    title: "Tank Protection Systems",
    description: "Practice understanding tank breathing, vapor control, and overfill prevention",
    questions: [
      {
        id: "m1l6-q1",
        question: "What triggers tank in-breathing (vacuum)?",
        options: [
          "Filling the tank with product",
          "Heating of tank contents",
          "Product withdrawal or cooling",
          "None of these cause in-breathing"
        ],
        correctIndex: 2,
        hint: "In-breathing = air needs to come IN",
        explanation: "In-breathing occurs when the vapor space shrinks—either from product withdrawal (liquid out) or cooling (vapor contracts). Air must enter to prevent vacuum.",
        remediationStepIndex: 2,
        remediationLabel: "Review Tank Breathing Diagram"
      },
      {
        id: "m1l6-q2",
        question: "A tank's PVRV is removed for maintenance. What should be done?",
        options: [
          "No action needed - tank can operate without PVRV",
          "Install a temporary vent path or stop tank operations",
          "Bolt the nozzle closed to prevent contamination",
          "Only replace it within 1 month"
        ],
        correctIndex: 1,
        hint: "Remember the Oklahoma tank collapse story",
        explanation: "Atmospheric tanks can collapse from vacuum in seconds. A temporary vent path must be provided, or tank operations must cease.",
        remediationStepIndex: 0,
        remediationLabel: "Review Tank Collapse story"
      },
      {
        id: "m1l6-q3",
        question: "API 2350 requires the high-high level switch to be:",
        options: [
          "Connected to the primary level gauge",
          "Independent from the primary level measurement",
          "Manual alarm only",
          "Tested once every 5 years"
        ],
        correctIndex: 1,
        explanation: "The high-high switch must be INDEPENDENT—separate sensing element, separate wiring—so it works even if the primary gauge fails.",
        remediationStepIndex: 1,
        remediationLabel: "Review Buncefield story"
      },
      {
        id: "m1l6-q4",
        question: "Emergency venting for fire case is sized based on:",
        options: [
          "Maximum fill rate",
          "Normal thermal breathing",
          "Wetted surface area per API 2000",
          "Tank volume only"
        ],
        correctIndex: 2,
        explanation: "Fire case emergency venting is calculated from wetted surface area (area heated by fire) per API 2000 formulas.",
        remediationStepIndex: 3,
        remediationLabel: "Review Overfill Layers Diagram"
      },
      {
        id: "m1l6-q5",
        question: "What is the purpose of a flame arrester on a tank vent?",
        options: [
          "Increase venting capacity",
          "Prevent external ignition from propagating into the tank",
          "Reduce vapor emissions",
          "Measure vapor flow rate"
        ],
        correctIndex: 1,
        explanation: "Flame arresters contain elements that quench flames by absorbing heat, preventing external ignition sources from propagating into the flammable vapor space.",
        remediationStepIndex: 4,
        remediationLabel: "Review Gallery - Flame Arrester"
      },
      {
        id: "m1l6-q6",
        question: "When a VRU (Vapor Recovery Unit) is offline, what provides tank protection?",
        options: [
          "The tank can operate without any protection",
          "The VRU backup system",
          "PVRVs must handle the vapor load",
          "Flare system only"
        ],
        correctIndex: 2,
        explanation: "PVRVs remain the essential backup when vapor control is offline or overwhelmed. They must be sized to handle the full vapor load.",
        remediationStepIndex: 7,
        remediationLabel: "Review Vapor Control Diagram"
      },
      {
        id: "m1l6-q7",
        question: "The Buncefield disaster was primarily caused by:",
        options: [
          "PVRV failure",
          "Fire without containment",
          "Level gauge stuck + disabled high alarm = overfill",
          "Vapor recovery unit failure"
        ],
        correctIndex: 2,
        explanation: "Buncefield occurred because the level gauge stuck AND the independent high-level alarm had been disabled. Multiple layer failures led to catastrophic overfill.",
        remediationStepIndex: 1,
        remediationLabel: "Review Buncefield story"
      }
    ]
  }
];

// Helper functions
export function getModule1DrillById(id: string): Drill | undefined {
  return module1Drills.find((d) => d.id === id);
}

export function getModule1DrillByLessonId(lessonId: string): Drill | undefined {
  return module1Drills.find((d) => d.lessonId === lessonId);
}

export function calculateModule1DrillScore(
  drill: Drill,
  answers: number[]
): { score: number; passed: boolean; total: number; wrongQuestions: DrillQuestion[] } {
  let correct = 0;
  const wrongQuestions: DrillQuestion[] = [];
  
  drill.questions.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      correct++;
    } else {
      wrongQuestions.push(q);
    }
  });
  
  const total = drill.questions.length;
  const score = Math.round((correct / total) * 100);
  
  return { score, passed: score >= 70, total, wrongQuestions };
}
