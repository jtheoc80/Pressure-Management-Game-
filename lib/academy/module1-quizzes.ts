/**
 * Module 1 Quizzes - Assessment with explanations and remediation links
 * Quizzes should feel like a summary of drills, not new material
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  remediationStepIndex?: number;
  remediationLabel?: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export const module1Quizzes: Quiz[] = [
  // =============================================================================
  // LESSON 1: What is Pressure Relief
  // =============================================================================
  {
    id: "quiz-m1-l1",
    lessonId: "m1-l1",
    title: "What is Pressure Relief?",
    passingScore: 80,
    questions: [
      {
        id: "q1-1",
        question: "What is the primary purpose of a Pressure Safety Valve (PSV)?",
        options: [
          "Control operating pressure during normal operations",
          "Prevent equipment from exceeding its Maximum Allowable Working Pressure",
          "Measure pressure in a vessel",
          "Regulate flow rate through piping"
        ],
        correctIndex: 1,
        explanation: "PSVs are safety devices that automatically relieve pressure when it exceeds safe limits, preventing equipment from exceeding MAWP.",
        remediationStepIndex: 1,
        remediationLabel: "Review Core Definitions"
      },
      {
        id: "q1-2",
        question: "Set pressure for a single PSV protecting a vessel should be:",
        options: [
          "Equal to normal operating pressure",
          "At or below the equipment MAWP",
          "10% above MAWP for safety margin",
          "At least 50% above operating pressure"
        ],
        correctIndex: 1,
        explanation: "Set pressure must be at or below MAWP to ensure the equipment is protected before exceeding its design limit.",
        remediationStepIndex: 1,
        remediationLabel: "Review Core Definitions"
      },
      {
        id: "q1-3",
        question: "What is 'accumulation' in PSV terminology?",
        options: [
          "Pressure increase above set pressure during relief",
          "Pressure increase above MAWP during relief",
          "Total fluid released during relief",
          "Time delay before PSV opens"
        ],
        correctIndex: 1,
        explanation: "Accumulation is the pressure increase above MAWP during a relief event, expressed as a percentage of MAWP.",
        remediationStepIndex: 2,
        remediationLabel: "Review Diagram"
      },
      {
        id: "q1-4",
        question: "Which regulatory standards govern PSV sizing and selection?",
        options: [
          "API 610 / ASME B31.3",
          "API 520/521 / ASME Section VIII",
          "API 650 / ASME B31.1",
          "OSHA 1910 / EPA 40 CFR"
        ],
        correctIndex: 1,
        explanation: "API 520 covers sizing and selection, API 521 covers disposal systems, and ASME Section VIII governs pressure vessel certification.",
        remediationStepIndex: 5,
        remediationLabel: "Review Rule Card"
      },
      {
        id: "q1-5",
        question: "During a field walkdown, which finding is a critical safety concern?",
        options: [
          "PSV nameplate shows set pressure at MAWP",
          "Inlet block valve is partially closed",
          "Discharge piping goes to a flare header",
          "PSV has a test lever on the bonnet"
        ],
        correctIndex: 1,
        explanation: "A partially closed inlet block valve may isolate the PSV from the protected equipment, defeating its protective function.",
        remediationStepIndex: 3,
        remediationLabel: "Review Field Walkdown"
      }
    ]
  },

  // =============================================================================
  // LESSON 2: Pressure & Temperature Units
  // =============================================================================
  {
    id: "quiz-m1-l2",
    lessonId: "m1-l2",
    title: "Pressure & Temperature Units",
    passingScore: 80,
    questions: [
      {
        id: "q2-1",
        question: "Convert 200 psig to absolute pressure (psia) at sea level:",
        options: [
          "185.3 psia",
          "200 psia",
          "214.7 psia",
          "200 + 460 = 660 psia"
        ],
        correctIndex: 2,
        explanation: "PSIA = PSIG + 14.7, so 200 + 14.7 = 214.7 psia",
        remediationStepIndex: 1,
        remediationLabel: "Review Unit Conversion Essentials"
      },
      {
        id: "q2-2",
        question: "Which pressure type is required for gas flow sizing equations?",
        options: [
          "Gauge pressure (psig)",
          "Absolute pressure (psia)",
          "Differential pressure",
          "Atmospheric pressure"
        ],
        correctIndex: 1,
        explanation: "Gas sizing equations are based on thermodynamic laws that require absolute pressure and temperature values.",
        remediationStepIndex: 5,
        remediationLabel: "Review Rule Card"
      },
      {
        id: "q2-3",
        question: "Convert 150°F to Rankine:",
        options: [
          "150°R",
          "460°R",
          "610°R",
          "310°R"
        ],
        correctIndex: 2,
        explanation: "°R = °F + 460, so 150 + 460 = 610°R",
        remediationStepIndex: 1,
        remediationLabel: "Review Unit Conversion Essentials"
      },
      {
        id: "q2-4",
        question: "An engineer accidentally uses psig instead of psia in a gas sizing calculation. The result is:",
        options: [
          "A slightly oversized valve",
          "A significantly undersized valve",
          "No effect on sizing",
          "A slightly undersized valve"
        ],
        correctIndex: 1,
        explanation: "Using psig instead of psia (missing ~14.7 psi) causes significant undersizing because the calculated capacity is based on lower pressure.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      },
      {
        id: "q2-5",
        question: "When should you use gauge pressure (psig)?",
        options: [
          "In gas flow equations",
          "For set pressure on datasheets and field measurements",
          "For thermodynamic calculations",
          "Never - always use absolute"
        ],
        correctIndex: 1,
        explanation: "PSIG is used for set pressure, operating pressure, MAWP, and field measurements. Convert to PSIA for gas equations.",
        remediationStepIndex: 5,
        remediationLabel: "Review Decision Checklist"
      }
    ]
  },

  // =============================================================================
  // LESSON 3: Relieving Cases
  // =============================================================================
  {
    id: "quiz-m1-l3",
    lessonId: "m1-l3",
    title: "Relieving Cases",
    passingScore: 80,
    questions: [
      {
        id: "q3-1",
        question: "In a blocked outlet scenario, the PSV should be sized for:",
        options: [
          "Normal operating flow rate",
          "Maximum inlet flow rate",
          "50% of design flow",
          "Fire case heat input"
        ],
        correctIndex: 1,
        explanation: "In blocked outlet, all inlet flow must be relieved. The PSV must handle the maximum possible inlet flow rate.",
        remediationStepIndex: 1,
        remediationLabel: "Review Major Relieving Cases"
      },
      {
        id: "q3-2",
        question: "What is the 'governing case' for PSV sizing?",
        options: [
          "The most likely scenario",
          "The scenario requiring the largest relief capacity",
          "The easiest to calculate",
          "The first scenario identified"
        ],
        correctIndex: 1,
        explanation: "The governing case is the scenario requiring the largest relief capacity. The PSV must be sized for this worst case.",
        remediationStepIndex: 6,
        remediationLabel: "Review Rule Card"
      },
      {
        id: "q3-3",
        question: "Fire case relief sizing is based on:",
        options: [
          "Maximum pump flow rate",
          "Wetted surface area and heat input per API 521",
          "Normal operating temperature",
          "Tank volume"
        ],
        correctIndex: 1,
        explanation: "Fire case calculations use wetted surface area (up to 25 ft elevation) to determine heat input and resulting vapor generation.",
        remediationStepIndex: 1,
        remediationLabel: "Review Major Relieving Cases"
      },
      {
        id: "q3-4",
        question: "Which scenario is often overlooked for large storage vessels?",
        options: [
          "Blocked outlet",
          "Control valve failure",
          "Fire case",
          "Thermal expansion"
        ],
        correctIndex: 2,
        explanation: "Fire case is often overlooked but frequently governs for large vessels due to their large wetted surface area creating massive vapor loads.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      },
      {
        id: "q3-5",
        question: "For control valve failure analysis, which modes should be evaluated?",
        options: [
          "Only fail-open scenarios",
          "Only fail-closed scenarios",
          "Both fail-open AND fail-closed modes",
          "Control valves don't cause overpressure"
        ],
        correctIndex: 2,
        explanation: "Both failure modes must be analyzed: fail-open upstream can cause excess flow; fail-closed downstream can cause blocked outlet.",
        remediationStepIndex: 1,
        remediationLabel: "Review Major Relieving Cases"
      }
    ]
  },

  // =============================================================================
  // LESSON 4: Backpressure
  // =============================================================================
  {
    id: "quiz-m1-l4",
    lessonId: "m1-l4",
    title: "Backpressure",
    passingScore: 80,
    questions: [
      {
        id: "q4-1",
        question: "Total backpressure equals:",
        options: [
          "Set pressure + overpressure",
          "Superimposed + built-up backpressure",
          "MAWP - operating pressure",
          "Inlet pressure - outlet pressure"
        ],
        correctIndex: 1,
        explanation: "Total backpressure = superimposed (before valve opens) + built-up (from discharge flow after valve opens).",
        remediationStepIndex: 1,
        remediationLabel: "Review Backpressure Types"
      },
      {
        id: "q4-2",
        question: "For conventional PSVs, total backpressure should not exceed:",
        options: [
          "5% of set pressure",
          "10% of set pressure",
          "25% of set pressure",
          "50% of set pressure"
        ],
        correctIndex: 1,
        explanation: "The 10% rule: conventional valves need backpressure below 10% of set to maintain proper set pressure and capacity.",
        remediationStepIndex: 6,
        remediationLabel: "Review Rule Card"
      },
      {
        id: "q4-3",
        question: "A PSV has 100 psig set, 12 psig superimposed BP, and 5 psig built-up BP. Is a conventional valve acceptable?",
        options: [
          "Yes - total BP is less than 10%",
          "No - total BP (17%) exceeds the 10% limit",
          "It depends on the fluid",
          "Backpressure doesn't affect conventional valves"
        ],
        correctIndex: 1,
        explanation: "Total BP = 12 + 5 = 17 psig = 17% of set. This exceeds the 10% limit, so bellows or pilot valve is required.",
        remediationStepIndex: 5,
        remediationLabel: "Review Selection Criteria"
      },
      {
        id: "q4-4",
        question: "Variable backpressure in a shared flare header typically requires:",
        options: [
          "A conventional valve",
          "A larger orifice size",
          "A balanced bellows or pilot-operated valve",
          "No special consideration"
        ],
        correctIndex: 2,
        explanation: "Variable backpressure that can exceed 10% of set (especially during upsets) requires bellows or pilot valves.",
        remediationStepIndex: 3,
        remediationLabel: "Review Flare Header Diagram"
      },
      {
        id: "q4-5",
        question: "High backpressure on a conventional valve can cause:",
        options: [
          "Increased capacity",
          "Failure to open at set pressure and reduced capacity",
          "Better sealing",
          "No effect on performance"
        ],
        correctIndex: 1,
        explanation: "High backpressure opposes the opening force, potentially preventing opening at set pressure and reducing discharge capacity.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      }
    ]
  },

  // =============================================================================
  // LESSON 5: Valve Styles
  // =============================================================================
  {
    id: "quiz-m1-l5",
    lessonId: "m1-l5",
    title: "Valve Styles",
    passingScore: 80,
    questions: [
      {
        id: "q5-1",
        question: "A conventional PSV is best suited for:",
        options: [
          "Discharge to a high-pressure flare header",
          "Discharge to atmosphere or low backpressure systems",
          "Services requiring tight shutoff at 95% of set",
          "All applications - it's the universal choice"
        ],
        correctIndex: 1,
        explanation: "Conventional valves work best for ATM discharge or when backpressure is less than 10% of set pressure.",
        remediationStepIndex: 3,
        remediationLabel: "Review Valve Type Characteristics"
      },
      {
        id: "q5-2",
        question: "What is the main advantage of a balanced bellows PSV?",
        options: [
          "Lower cost than conventional",
          "Set pressure is independent of backpressure",
          "Higher flow capacity",
          "No maintenance required"
        ],
        correctIndex: 1,
        explanation: "The bellows isolates the spring chamber from backpressure, maintaining constant set pressure regardless of downstream conditions.",
        remediationStepIndex: 1,
        remediationLabel: "Review PSV Style Cutaways"
      },
      {
        id: "q5-3",
        question: "Pilot-operated valves are preferred when:",
        options: [
          "Simple, low-cost installation is the priority",
          "Operating pressure is close to set pressure (tight shutoff needed)",
          "The process fluid is highly corrosive",
          "Atmospheric discharge is used"
        ],
        correctIndex: 1,
        explanation: "Pilot valves provide tight shutoff up to 98% of set pressure, making them ideal when operating pressure is close to set.",
        remediationStepIndex: 0,
        remediationLabel: "Review Plant Reality story"
      },
      {
        id: "q5-4",
        question: "A torn bellows in a balanced bellows valve will cause:",
        options: [
          "Improved sealing",
          "Loss of backpressure compensation (behaves like conventional)",
          "Increased flow capacity",
          "No change in performance"
        ],
        correctIndex: 1,
        explanation: "A torn bellows allows backpressure to act on the disc, eliminating backpressure compensation. The valve behaves like a conventional valve.",
        remediationStepIndex: 7,
        remediationLabel: "Review Common Wrong Moves"
      },
      {
        id: "q5-5",
        question: "For ATM discharge with operating pressure at 75% of set, which valve type is most appropriate?",
        options: [
          "Pilot-operated for best performance",
          "Balanced bellows for safety margin",
          "Conventional - simplest and adequate for these conditions",
          "Only a rupture disk will work"
        ],
        correctIndex: 2,
        explanation: "For ATM discharge (zero BP) with adequate margin (75% of set), a conventional valve is the simplest and most cost-effective choice.",
        remediationStepIndex: 5,
        remediationLabel: "Review Selection Checklist"
      }
    ]
  },

  // =============================================================================
  // LESSON 6: Tank Protection
  // =============================================================================
  {
    id: "quiz-m1-l6",
    lessonId: "m1-l6",
    title: "Tank Protection Systems",
    passingScore: 80,
    questions: [
      {
        id: "q6-1",
        question: "In-breathing (vacuum) in a tank is caused by:",
        options: [
          "Filling the tank with product",
          "Heating of tank contents",
          "Product withdrawal or cooling",
          "Fire exposure"
        ],
        correctIndex: 2,
        explanation: "In-breathing occurs when vapor space shrinks—from product withdrawal or cooling. Air must enter to prevent vacuum.",
        remediationStepIndex: 2,
        remediationLabel: "Review Tank Breathing Diagram"
      },
      {
        id: "q6-2",
        question: "API 2350 requires the high-high level switch to be:",
        options: [
          "Part of the primary level gauge system",
          "Independent from the primary level measurement",
          "Manually operated only",
          "Alarm-only with no shutdown function"
        ],
        correctIndex: 1,
        explanation: "The high-high switch must be independent—separate sensing element and wiring—so it works even if the primary gauge fails.",
        remediationStepIndex: 3,
        remediationLabel: "Review Overfill Layers Diagram"
      },
      {
        id: "q6-3",
        question: "What provides emergency venting capacity for fire exposure on tanks?",
        options: [
          "Normal PVRVs only",
          "PVRVs at higher setting, emergency vents, gauge hatches, or frangible roof",
          "Flame arresters",
          "Vapor recovery units"
        ],
        correctIndex: 1,
        explanation: "Multiple devices can provide emergency venting: PVRVs (at emergency setting), emergency vents, gauge hatches, and frangible roof-to-shell joints.",
        remediationStepIndex: 6,
        remediationLabel: "Review Decision Checklist"
      },
      {
        id: "q6-4",
        question: "What is the purpose of a flame arrester on a tank vent?",
        options: [
          "Increase venting capacity",
          "Prevent external ignition from propagating into the tank",
          "Reduce vapor emissions",
          "Measure vent flow rate"
        ],
        correctIndex: 1,
        explanation: "Flame arresters contain elements that quench flames, preventing external ignition sources from propagating into the flammable vapor space.",
        remediationStepIndex: 4,
        remediationLabel: "Review Gallery"
      },
      {
        id: "q6-5",
        question: "The Buncefield disaster was primarily caused by:",
        options: [
          "PVRV mechanical failure",
          "Fire without containment",
          "Level gauge stuck + independent alarm disabled = overfill",
          "Vapor recovery unit failure"
        ],
        correctIndex: 2,
        explanation: "Buncefield: level gauge stuck AND independent high-level alarm was disabled. Multiple protection layer failures led to catastrophic overfill.",
        remediationStepIndex: 1,
        remediationLabel: "Review Buncefield story"
      }
    ]
  }
];

// Helper functions
export function getModule1QuizById(id: string): Quiz | undefined {
  return module1Quizzes.find((q) => q.id === id);
}

export function getModule1QuizByLessonId(lessonId: string): Quiz | undefined {
  return module1Quizzes.find((q) => q.lessonId === lessonId);
}

export function calculateModule1QuizScore(
  quiz: Quiz,
  answers: Record<string, number>
): { score: number; passed: boolean; correctCount: number; totalQuestions: number; wrongQuestions: QuizQuestion[] } {
  let correctCount = 0;
  const wrongQuestions: QuizQuestion[] = [];
  
  for (const question of quiz.questions) {
    if (answers[question.id] === question.correctIndex) {
      correctCount++;
    } else {
      wrongQuestions.push(question);
    }
  }

  const score = Math.round((correctCount / quiz.questions.length) * 100);
  return {
    score,
    passed: score >= quiz.passingScore,
    correctCount,
    totalQuestions: quiz.questions.length,
    wrongQuestions
  };
}
