/**
 * Academy Course Data Model
 * Step-by-step lesson structure for elite industrial training
 * 
 * PEDAGOGY: Define > Show > Practice > Prove
 * Every lesson follows: Plant Reality → Definitions → Diagram → Field Walkdown →
 * Decision Checklist → Common Wrong Moves → Mini-Drill → Supervisor Check →
 * Confidence Check → Quiz
 */

// =============================================================================
// STEP TYPES
// =============================================================================

export type StepType = 
  | "explain"
  | "diagram"
  | "gallery"
  | "rule"
  | "case"
  | "fieldwalkdown"
  | "supervisorcheck"
  | "confidence"
  | "drill"
  | "quiz";

/** Explanation step - the core teaching block */
export interface ExplainStep {
  type: "explain";
  title: string;
  body: string;
  bullets?: string[];
  stopAndCheck?: string[];      // Unit sanity or critical checks
  fieldCues?: string[];          // What you'd physically see in the plant
  whatGoodLooksLike?: string[];  // Positive examples
  commonMistakes?: string[];     // What NOT to do
}

/** Diagram step - visual teaching with CanvasFrame containment */
export interface DiagramStep {
  type: "diagram";
  title: string;
  diagramKey: string;           // Key into diagram registry
  caption?: string;
  stopAndCheck?: string[];
}

/** Gallery step - real photos with shot notes for placeholders */
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  shotNote?: string;            // Describes what the real photo should show
}

export interface GalleryStep {
  type: "gallery";
  title: string;
  images: GalleryImage[];
}

/** Rule step - paraphrased standard with optional short quote */
export interface RuleStep {
  type: "rule";
  title: string;
  paraphrase: string;           // Plain language explanation
  quote?: string;               // Optional short verbatim quote
  sourceLabel: string;          // e.g., "API 520 Part I, Section 5.2"
  sourceNote?: string;          // Additional context
}

/** Case step - scenario narrative for context */
export interface CaseStep {
  type: "case";
  title: string;
  caseId: string;               // Reference to case study
}

/** Field walkdown step - what to look for physically onsite */
export interface FieldWalkdownStep {
  type: "fieldwalkdown";
  title: string;
  steps: string[];              // Sequential walkdown steps
  lookFors: string[];           // Specific things to observe
  redFlags: string[];           // Warning signs that indicate problems
}

/** Supervisor check step - senior review lens */
export interface SupervisorCheckStep {
  type: "supervisorcheck";
  title: string;
  checklist: string[];          // Items a senior reviewer checks
  fastSanityChecks: string[];   // Quick calculations/spot checks
}

/** Confidence check step - student self-rating */
export interface ConfidenceAction {
  label: string;
  goToStepIndex: number;
}

export interface ConfidenceCheckStep {
  type: "confidence";
  title: string;
  prompt: string;
  actionsIfLow: ConfidenceAction[];
}

/** Drill step - practice before quiz */
export interface DrillStep {
  type: "drill";
  title: string;
  drillId: string;
}

/** Quiz step - assessment with remediation */
export interface QuizStep {
  type: "quiz";
  title: string;
  quizId: string;
}

export type Step =
  | ExplainStep
  | DiagramStep
  | GalleryStep
  | RuleStep
  | CaseStep
  | FieldWalkdownStep
  | SupervisorCheckStep
  | ConfidenceCheckStep
  | DrillStep
  | QuizStep;

// =============================================================================
// LESSON STRUCTURE
// =============================================================================

export interface LessonObjective {
  id: string;
  label: string;                // Short label for horizontal rail
  text: string;                 // Full objective text
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  estMinutes: number;
  required: boolean;            // Required to unlock next module/feature
  objectives: LessonObjective[];
  steps: Step[];
}

// =============================================================================
// MODULE STRUCTURE
// =============================================================================

export interface Module {
  id: string;
  title: string;
  summary: string;
  order: number;
  lessons: Lesson[];
}

// =============================================================================
// COURSE STRUCTURE
// =============================================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

// =============================================================================
// MODULE 1: PSV & TANK PROTECTION FUNDAMENTALS
// =============================================================================

const lesson1: Lesson = {
  id: "m1-l1",
  moduleId: "module-1",
  title: "What is Pressure Relief (and What It Is NOT)",
  estMinutes: 12,
  required: true,
  objectives: [
    { id: "m1-l1-obj1", label: "Defense", text: "Understand PSV as last line of defense, not process control" },
    { id: "m1-l1-obj2", label: "Failure", text: "Recognize what happens when pressure relief fails" },
    { id: "m1-l1-obj3", label: "Standards", text: "Know the regulatory framework (API 520/521, ASME)" },
    { id: "m1-l1-obj4", label: "Terms", text: "Define MAWP, set pressure, accumulation, blowdown" },
  ],
  steps: [
    // Step 1: Plant Reality
    {
      type: "explain",
      title: "Plant Reality: The Blocked Outlet Incident",
      body: "Picture this: A refinery in Texas, 2:47 AM. An operator closes the wrong block valve on a distillation column outlet—a simple mistake during a shift handoff. The upstream pump keeps running. Pressure climbs. The PSV on top of the column lifts at 285 psig, venting hot vapors to the flare.\n\nWithout that PSV, the column would have exceeded its design pressure within 3 minutes. The weld seams would have failed. We'd be talking about a catastrophic rupture, not a successful relief event.\n\nThis is what pressure relief exists for: the last line of defense when everything else has failed.",
      bullets: [
        "PSVs exist because humans make mistakes and equipment fails",
        "They must work automatically—no operator action required",
        "A PSV that fails to open can result in fatalities",
        "A PSV that chatters or leaks costs money but doesn't kill people"
      ],
      fieldCues: [
        "Listen for the distinctive 'pop' and roar when a PSV lifts",
        "Watch for vapor discharge at flare or ATM stack",
        "Check discharge piping for heat (indicates recent relief)"
      ],
    },
    // Step 2: Definitions
    {
      type: "explain",
      title: "Core Definitions: The Language of Pressure Relief",
      body: "Before we go further, you need to speak the language. These terms appear on every datasheet, in every specification, and in every conversation with vendors or inspectors.",
      bullets: [
        "MAWP (Maximum Allowable Working Pressure): The highest pressure at which a vessel can legally operate. Stamped on the nameplate.",
        "Set Pressure: The inlet pressure at which the PSV begins to open. Usually at or below MAWP.",
        "Accumulation: Pressure rise above MAWP during relief—typically 10% for single valves, 21% for fire case.",
        "Overpressure: Pressure rise above SET pressure when the valve is relieving.",
        "Blowdown: The pressure drop from set pressure to when the valve reseats. Usually 7-10% of set."
      ],
      stopAndCheck: [
        "MAWP is stamped on the vessel nameplate—never exceed it during normal operations",
        "Set pressure ≤ MAWP (single valve); supplemental valves may be set at 105% MAWP"
      ],
      whatGoodLooksLike: [
        "PSV set pressure matches or is below the MAWP on the vessel nameplate",
        "Operating pressure is at least 10% below set pressure (to avoid chatter)",
        "Datasheet clearly shows set pressure, MAWP, and operating pressure"
      ],
      commonMistakes: [
        "Confusing MAWP with operating pressure—operating should always be BELOW MAWP",
        "Setting PSV above MAWP (illegal and dangerous)",
        "Operating too close to set pressure (causes chatter and premature wear)"
      ]
    },
    // Step 3: Diagram
    {
      type: "diagram",
      title: "MAWP, Set Pressure, and Accumulation",
      diagramKey: "mawp-set-accumulation",
      caption: "The relationship between operating pressure, set pressure, MAWP, and allowable accumulation during a relief event.",
      stopAndCheck: [
        "Can you identify where operating pressure should sit relative to set pressure?",
        "What happens at 110% of MAWP during a fire case?"
      ]
    },
    // Step 4: Gallery - PSVs in the Field
    {
      type: "gallery",
      title: "PSVs in the Field: What They Actually Look Like",
      images: [
        {
          src: "/academy/photos/psv/psv-vessel-mounted.jpg",
          alt: "PSV mounted on top of a pressure vessel",
          caption: "PSV mounted on vessel top head - note the inlet nozzle and discharge elbow",
          shotNote: "Full shot of a PSV installed on a vessel top head, showing the bonnet, body, test lever, and discharge piping connection"
        },
        {
          src: "/academy/photos/psv/nameplate-closeup.jpg",
          alt: "PSV nameplate showing set pressure and orifice size",
          caption: "PSV nameplate - always verify set pressure matches documentation",
          shotNote: "Close-up of a PSV nameplate clearly showing: SET PRESSURE (psig), ORIFICE DESIGNATION (letter), CDTP, and ASME UV stamp"
        },
        {
          src: "/academy/photos/psv/discharge-to-flare.jpg",
          alt: "PSV discharge piping routed to flare header",
          caption: "Discharge piping routed to flare header - typical closed system discharge",
          shotNote: "PSV discharge elbow connecting to flare header piping, showing proper support and no pockets where liquid could accumulate"
        },
        {
          src: "/academy/photos/psv/inlet-block-cso.jpg",
          alt: "Inlet block valve with car seal open tag",
          caption: "Inlet block valve with CSO (Car Seal Open) tag - this valve must remain open",
          shotNote: "Close-up of inlet block valve with CSO tag visible, showing the valve is locked in open position to ensure PSV is not isolated"
        }
      ]
    },
    // Step 5: Field Walkdown (renumbered from 4)
    {
      type: "fieldwalkdown",
      title: "Field Walkdown: Identifying PSVs in the Plant",
      steps: [
        "Find a vessel with a PSV mounted on the top head or outlet piping",
        "Locate the PSV nameplate—usually on the bonnet or body",
        "Read the set pressure and compare it to the vessel's nameplate MAWP",
        "Trace the discharge piping—where does it go? ATM, flare, closed system?",
        "Check for any signs of recent relief: discoloration, moisture, product residue"
      ],
      lookFors: [
        "Nameplate legibility—can you read set pressure and orifice designation?",
        "Inlet block valve position (should be locked open or car-sealed open)",
        "Discharge piping supports (sagging discharge piping is a red flag)",
        "Test lever condition (for valves that have one)"
      ],
      redFlags: [
        "Inlet block valve closed or partially closed (PSV is isolated—dangerous!)",
        "Discharge piping tied into a plugged header",
        "Visible corrosion or product buildup on the valve body",
        "Missing or illegible nameplate"
      ]
    },
    // Step 6: Decision Checklist (renumbered from 5)
    {
      type: "explain",
      title: "Decision Checklist: When Do I Need a PSV?",
      body: "Every pressure-containing piece of equipment needs overpressure protection. The question is: what type, what size, and where? Here's your decision checklist for any new vessel or equipment:",
      bullets: [
        "✓ Equipment has a defined MAWP (stamped on nameplate or per ASME)",
        "✓ There's a credible overpressure scenario (blocked outlet, fire, control valve failure)",
        "✓ Process conditions could exceed MAWP if something fails",
        "✓ No other credited relief path exists (e.g., rupture disk upstream)"
      ],
      stopAndCheck: [
        "If you can't identify a credible overpressure scenario, the PSV may not be required—but consult your process engineer before removing one"
      ],
      whatGoodLooksLike: [
        "Every vessel has at least one identified relief path",
        "Relief scenarios are documented in the process safety info (PSI)",
        "PSV sizing basis matches the documented relieving case"
      ],
      commonMistakes: [
        "Assuming 'it's always been there' means it's correctly sized",
        "Forgetting thermal relief on blocked-in liquid systems",
        "Not considering fire case for vessels in a fire zone"
      ]
    },
    // Step 7: Rule Card (renumbered from 6)
    {
      type: "rule",
      title: "API 520/521: The Governing Standards",
      paraphrase: "API 520 Part I covers the sizing and selection of pressure-relieving devices for petroleum and chemical plant services. API 521 addresses the design of pressure-relieving and depressuring systems. Together, they define how to protect equipment from overpressure.",
      quote: "Relief devices shall be designed and installed to prevent the pressure from rising more than the applicable accumulation above the MAWP of the equipment being protected.",
      sourceLabel: "API 520 Part I, Section 1.1",
      sourceNote: "ASME Section VIII also applies for pressure vessel certification."
    },
    // Step 8: Common Wrong Moves (renumbered from 7)
    {
      type: "explain",
      title: "Common Wrong Moves: What Gets People in Trouble",
      body: "Let's be direct about the mistakes that cause incidents. These aren't theoretical—they come from real investigations.",
      bullets: [
        "❌ Using a PSV as a process control device—PSVs should rarely lift in normal operations",
        "❌ Isolating a PSV without installing a spare—leaves equipment unprotected",
        "❌ Setting PSV above MAWP to 'stop nuisance trips'—illegal and defeats the purpose",
        "❌ Ignoring backpressure in valve selection—can prevent valve from opening",
        "❌ Not documenting the relieving scenario—future engineers won't know the sizing basis"
      ],
      commonMistakes: [
        "Operators sometimes isolate PSVs to 'stop product loss'—this is never acceptable",
        "Maintenance sometimes adjusts set pressure without engineering approval—this violates ASME certification",
        "Project teams sometimes copy PSV specs from similar services without verifying the sizing basis"
      ],
      fieldCues: [
        "If a PSV lifts frequently, the problem is the process—not the PSV",
        "If operators complain about 'nuisance' PSV lifts, investigate the root cause"
      ]
    },
    // Step 9: Mini-Drill (renumbered from 8)
    {
      type: "drill",
      title: "Mini-Drill: PSV Fundamentals",
      drillId: "drill-m1-l1"
    },
    // Step 10: Supervisor Check (renumbered from 9)
    {
      type: "supervisorcheck",
      title: "Supervisor Check: What a Senior Engineer Reviews",
      checklist: [
        "Is the set pressure at or below MAWP?",
        "Is the relieving case documented and credible?",
        "Does the orifice size match the required relief rate?",
        "Is the discharge destination appropriate for the fluid?",
        "Has backpressure been considered in valve type selection?"
      ],
      fastSanityChecks: [
        "Operating pressure should be at least 10% below set pressure",
        "Accumulation should not exceed 10% for single PSV, 16% for multiple, 21% for fire",
        "If discharging to flare, check if bellows or pilot valve is needed for backpressure"
      ]
    },
    // Step 11: Confidence Check (renumbered from 10)
    {
      type: "confidence",
      title: "Confidence Check",
      prompt: "Before moving to the quiz, rate your confidence: Can you explain why a PSV is the 'last line of defense' and not a process control device?",
      actionsIfLow: [
        { label: "Review the Plant Reality step", goToStepIndex: 0 },
        { label: "Review Common Wrong Moves", goToStepIndex: 8 }
      ]
    },
    // Step 12: Quiz (renumbered from 11)
    {
      type: "quiz",
      title: "Quiz: What is Pressure Relief?",
      quizId: "quiz-m1-l1"
    }
  ]
};

const lesson2: Lesson = {
  id: "m1-l2",
  moduleId: "module-1",
  title: "Pressure & Temperature Basics (psig vs psia; °F vs °R)",
  estMinutes: 15,
  required: true,
  objectives: [
    { id: "m1-l2-obj1", label: "Units", text: "Convert confidently between psig, psia, °F, and °R" },
    { id: "m1-l2-obj2", label: "When", text: "Know when to use absolute vs gauge pressure" },
    { id: "m1-l2-obj3", label: "Errors", text: "Recognize unit errors before they cause sizing mistakes" },
    { id: "m1-l2-obj4", label: "Sanity", text: "Apply 'sanity check' rules to catch obvious errors" }
  ],
  steps: [
    // Step 1: Plant Reality
    {
      type: "explain",
      title: "Plant Reality: The $2 Million Orifice Mistake",
      body: "A young engineer was sizing a PSV for a high-pressure gas system. The process data sheet showed operating pressure as '850 psig.' She plugged 850 into the gas sizing equation—but the equation required psia.\n\nThe result: an undersized valve. When the blocked outlet scenario occurred during commissioning, the PSV couldn't pass enough flow. The vessel's relief path failed. Emergency shutdown systems caught it, but the project was delayed 6 weeks while a correctly-sized valve was sourced.\n\nCost: $2.1 million in delays, plus a near-miss investigation.\n\nThe fix would have been simple: 850 psig + 14.7 = 864.7 psia. A 14.7 psi difference doesn't sound like much—but in gas equations, it matters enormously.",
      bullets: [
        "Gas sizing equations require ABSOLUTE pressure (psia)",
        "Most process data sheets report GAUGE pressure (psig)",
        "The difference is atmospheric pressure: ~14.7 psi at sea level",
        "This is the #1 unit error in PSV sizing"
      ],
      fieldCues: [
        "Process gauges read psig (gauge) by default—zero at atmospheric",
        "If a data sheet doesn't specify, assume it's gauge pressure",
        "At altitude, atmospheric pressure is lower (Denver ≈ 12.1 psia)"
      ]
    },
    // Step 2: Definitions
    {
      type: "explain",
      title: "The Unit Conversion Essentials",
      body: "Let's nail down the conversions you'll use every day. Write these on a sticky note if you need to—there's no shame in having a reference until they're automatic.",
      bullets: [
        "PSIA = PSIG + atmospheric pressure (14.7 at sea level)",
        "PSIG = PSIA - 14.7 (converts absolute back to gauge)",
        "°R (Rankine) = °F + 460 (absolute temperature scale)",
        "°F = °R - 460 (converts back to Fahrenheit)",
        "Atmospheric pressure at sea level ≈ 14.7 psia = 0 psig"
      ],
      stopAndCheck: [
        "STOP: Before entering any pressure into a gas equation, ask: 'Is this psia or psig?'",
        "STOP: Before entering any temperature into an equation, ask: 'Does this formula need °F or °R?'"
      ],
      whatGoodLooksLike: [
        "Datasheet has a 'Units' column that clearly shows psig or psia",
        "Calculations include a unit conversion step with the result shown",
        "Reviewer can trace each value back to its source with units"
      ],
      commonMistakes: [
        "Forgetting to convert psig to psia in gas flow equations",
        "Using °F in equations that require absolute temperature (°R or K)",
        "Assuming 'psi' means psig—it could mean either, so always clarify"
      ]
    },
    // Step 3: Diagram
    {
      type: "diagram",
      title: "Gauge vs Absolute Pressure",
      diagramKey: "psig-psia",
      caption: "The relationship between gauge and absolute pressure scales. Note that vacuum is negative psig but always positive psia.",
      stopAndCheck: [
        "What would -5 psig be in psia? (Answer: 9.7 psia)",
        "At what psia value does perfect vacuum occur? (Answer: 0 psia = -14.7 psig)"
      ]
    },
    // Step 4: Gallery
    {
      type: "gallery",
      title: "Pressure Gauges in the Field",
      images: [
        {
          src: "/academy/photos/field/gauge-compound.jpg",
          alt: "Compound pressure gauge showing both pressure and vacuum",
          caption: "Compound gauge: reads both positive pressure and vacuum",
          shotNote: "Close-up of a compound gauge dial showing the 0 psig reference point and vacuum scale"
        },
        {
          src: "/academy/photos/psv/nameplate-set-pressure.jpg",
          alt: "PSV nameplate showing set pressure in psig",
          caption: "PSV nameplates always show set pressure in PSIG",
          shotNote: "Close-up of PSV nameplate with set pressure clearly visible (e.g., 'SET: 150 PSIG')"
        }
      ]
    },
    // Step 5: Field Walkdown
    {
      type: "fieldwalkdown",
      title: "Field Walkdown: Reading Pressure Instruments",
      steps: [
        "Find a local pressure gauge on a process vessel or piping",
        "Note the gauge range and current reading",
        "Check if the gauge face indicates the unit (psig, psia, bar, kPa)",
        "Convert the reading to psia mentally (add 14.7 at sea level)",
        "Compare to the design pressure shown on the equipment nameplate"
      ],
      lookFors: [
        "Gauge range appropriate for the service (should operate in middle third)",
        "Gauge is calibrated and has a current calibration sticker",
        "Gauge connection is not plugged or corroded"
      ],
      redFlags: [
        "Gauge reads at or above maximum scale (pegged high)",
        "Gauge reads zero when system should be pressurized",
        "Gauge glass is broken or obscured"
      ]
    },
    // Step 6: Decision Checklist
    {
      type: "explain",
      title: "Decision Checklist: Which Unit When?",
      body: "Here's when to use each pressure unit. Memorize this or keep it handy:",
      bullets: [
        "✓ PSIG: Set pressure, operating pressure, MAWP, field measurements, datasheets",
        "✓ PSIA: Gas sizing equations, thermodynamic calculations, compressibility",
        "✓ °F: Operating temperature, design temperature, field measurements",
        "✓ °R: Gas equations, ideal gas law, thermodynamic calculations"
      ],
      stopAndCheck: [
        "Gas flow equation? → Convert to PSIA and °R",
        "Liquid flow equation? → PSIG is usually acceptable (incompressible)",
        "Reporting to operations? → Always use PSIG and °F"
      ],
      whatGoodLooksLike: [
        "Sizing calculation shows: 'P₁ = 150 psig + 14.7 = 164.7 psia'",
        "Temperature shows: 'T = 200°F + 460 = 660°R'",
        "Final datasheet values converted back to psig and °F"
      ],
      commonMistakes: [
        "Copying a psia value to a datasheet field labeled psig",
        "Using software that auto-converts without verifying the output",
        "Forgetting that vacuum is negative psig but positive psia"
      ]
    },
    // Step 7: Rule Card
    {
      type: "rule",
      title: "API 520 on Pressure Units",
      paraphrase: "API 520 sizing equations for gas and vapor service require absolute pressure and absolute temperature. Using gauge values will produce incorrect results—typically undersized valves.",
      quote: "For gas and vapor, the relieving capacity shall be calculated using absolute relieving pressure.",
      sourceLabel: "API 520 Part I, Section 5.6",
      sourceNote: "Liquid sizing can use gauge pressure since liquids are incompressible."
    },
    // Step 8: Common Wrong Moves
    {
      type: "explain",
      title: "Common Wrong Moves: Unit Errors That Cause Incidents",
      body: "Unit errors are embarrassingly common and dangerously consequential. Here's what to avoid:",
      bullets: [
        "❌ Assuming 'psi' on a data sheet means psig—always verify",
        "❌ Using a calculator or spreadsheet without checking unit consistency",
        "❌ Copying values between documents without confirming units match",
        "❌ Trusting software unit conversions without spot-checking results",
        "❌ Forgetting altitude effects on atmospheric pressure"
      ],
      commonMistakes: [
        "At 5,000 ft elevation, atmospheric pressure is ~12.2 psia, not 14.7",
        "Some international data uses bar or kPa—always convert to consistent units",
        "°C to °F conversion is NOT °F = °C + 32 (that's only for differences)"
      ],
      fieldCues: [
        "If your calculated orifice seems way too big or too small, check your units first",
        "If the PSV capacity doesn't match the vendor data, suspect a unit mismatch"
      ]
    },
    // Step 9: Mini-Drill
    {
      type: "drill",
      title: "Mini-Drill: Unit Conversions",
      drillId: "drill-m1-l2"
    },
    // Step 10: Supervisor Check
    {
      type: "supervisorcheck",
      title: "Supervisor Check: Catching Unit Errors",
      checklist: [
        "Are all pressures in the sizing calc clearly labeled (psig or psia)?",
        "Are gas equation inputs in absolute units (psia, °R)?",
        "Has the engineer documented unit conversions step-by-step?",
        "Do final datasheet values match the expected units for each field?",
        "Has altitude correction been applied if site is >2,000 ft elevation?"
      ],
      fastSanityChecks: [
        "Relieving pressure (psia) should be ≈ Set pressure (psig) + 14.7 + overpressure",
        "Relieving temperature (°R) = °F + 460; should be >460 for any real process",
        "If molecular weight seems wrong, check if it's molar mass or specific gravity"
      ]
    },
    // Step 11: Confidence Check
    {
      type: "confidence",
      title: "Confidence Check",
      prompt: "Can you convert 100 psig at 200°F to absolute units for a gas sizing equation without hesitation?",
      actionsIfLow: [
        { label: "Review the Unit Conversion Essentials", goToStepIndex: 1 },
        { label: "Practice with the Diagram", goToStepIndex: 2 }
      ]
    },
    // Step 12: Quiz
    {
      type: "quiz",
      title: "Quiz: Pressure & Temperature Units",
      quizId: "quiz-m1-l2"
    }
  ]
};

const lesson3: Lesson = {
  id: "m1-l3",
  moduleId: "module-1",
  title: "Relieving Cases: How to Identify the Scenario",
  estMinutes: 18,
  required: true,
  objectives: [
    { id: "m1-l3-obj1", label: "Scenarios", text: "Identify common overpressure scenarios (blocked outlet, fire, CV failure)" },
    { id: "m1-l3-obj2", label: "Governing", text: "Determine which case 'governs' and sets the PSV size" },
    { id: "m1-l3-obj3", label: "API 521", text: "Use API 521 Table 1 to systematically identify credible cases" },
    { id: "m1-l3-obj4", label: "Document", text: "Document the relieving case clearly on a datasheet" }
  ],
  steps: [
    // Step 1: Plant Reality
    {
      type: "explain",
      title: "Plant Reality: The Fire That Changed the Design",
      body: "A refinery's crude unit had PSVs sized for blocked outlet on all vessels—the most obvious case. During a unit-wide fire drill, the process safety engineer realized something terrifying: the large atmospheric crude tank had never been evaluated for fire case.\n\nThe calculation was sobering. Fire case required 4x the relief capacity of normal venting. The existing PVRV was grossly undersized. If a real pool fire had occurred, the tank could have buckled or ruptured from overpressure.\n\nThe fix required an emergency project to add three additional emergency vent devices. The lesson: you must evaluate ALL credible scenarios, not just the obvious ones.",
      bullets: [
        "The governing case is the scenario requiring the LARGEST relief capacity",
        "Don't assume blocked outlet always governs—fire case often does for large vessels",
        "Every credible scenario must be evaluated independently",
        "The PSV must handle the worst case, even if it's unlikely"
      ],
      fieldCues: [
        "Large surface area = potentially high fire case load",
        "Pumps in the system = blocked outlet is always credible",
        "Control valves = evaluate fail-open and fail-closed scenarios"
      ]
    },
    // Step 2: Definitions
    {
      type: "explain",
      title: "The Major Relieving Cases",
      body: "API 521 Table 1 lists credible overpressure scenarios. Here are the ones you'll encounter most often:",
      bullets: [
        "Blocked Outlet: Downstream valve closes while upstream flow continues. Size for max inlet flow.",
        "Fire Case: External fire heats the vessel, vaporizing contents. Size based on wetted area.",
        "Control Valve Failure: CV fails open (excess flow) or closed (blocked outlet).",
        "Cooling Water Failure: Loss of cooling causes temperature and pressure rise.",
        "Thermal Expansion: Trapped liquid heated by sun, steam tracing, or adjacent hot equipment.",
        "Tube Rupture: High-pressure fluid enters low-pressure side of a heat exchanger.",
        "Power Failure: Loss of all pumps, compressors, and controls simultaneously."
      ],
      stopAndCheck: [
        "Every vessel needs at least one identified relieving case—if you can't find one, consult a process engineer",
        "Multiple cases may apply to the same vessel—evaluate each independently"
      ],
      whatGoodLooksLike: [
        "Relieving case is documented on the PSV datasheet with a clear description",
        "Relief rate calculation references the specific scenario",
        "All credible cases were evaluated and the governing case is identified"
      ],
      commonMistakes: [
        "Only evaluating blocked outlet without considering fire case",
        "Assuming control valves are 'reliable' and won't fail",
        "Forgetting thermal expansion on blocked-in liquid systems"
      ]
    },
    // Step 3: Diagram
    {
      type: "diagram",
      title: "Relieving Case Decision Tree",
      diagramKey: "relieving-case-decision-tree",
      caption: "Systematic approach to identifying all credible relieving scenarios for a piece of equipment.",
      stopAndCheck: [
        "Can you trace through this tree for a pump discharge vessel?",
        "What scenarios would apply to a heat exchanger shell?"
      ]
    },
    // Step 4: Field Walkdown
    {
      type: "fieldwalkdown",
      title: "Field Walkdown: What Creates Overpressure Risk?",
      steps: [
        "Stand at a vessel and identify all inlet sources (pumps, compressors, other vessels)",
        "Identify all outlet paths and what could block them (valves, control valves)",
        "Check if the vessel is in a fire zone (within drainage area, near fired equipment)",
        "Look for any trapped liquid segments that could be heated",
        "Note control valves and consider their failure modes"
      ],
      lookFors: [
        "Pump discharge piping into the vessel = blocked outlet case applies",
        "Control valve in outlet line = consider fail-closed scenario",
        "Vessel in curbed area with other equipment = fire case applies",
        "Solar exposure on uninsulated liquid lines = thermal expansion possible"
      ],
      redFlags: [
        "No PSV on the low-pressure side of a heat exchanger (tube rupture risk)",
        "Blocked-in liquid segment with steam tracing but no thermal relief",
        "Large vessel with only a small PVRV (may be undersized for fire case)"
      ]
    },
    // Step 5: Case Study Reference
    {
      type: "case",
      title: "Case Study: Blocked Outlet at a Refinery",
      caseId: "case-refinery-blocked-outlet"
    },
    // Step 6: Decision Checklist
    {
      type: "explain",
      title: "Decision Checklist: Identifying the Governing Case",
      body: "Use this systematic approach for every new PSV or re-evaluation:",
      bullets: [
        "1. List ALL credible overpressure scenarios from API 521 Table 1",
        "2. Calculate the required relief rate for EACH scenario",
        "3. Identify the scenario requiring the LARGEST relief capacity",
        "4. That scenario is your GOVERNING case—document it on the datasheet",
        "5. Size the PSV for the governing case"
      ],
      stopAndCheck: [
        "Did you evaluate fire case for vessels in a fire zone?",
        "Did you consider tube rupture for heat exchangers?",
        "Did you check control valve failure modes?"
      ],
      whatGoodLooksLike: [
        "Spreadsheet shows all evaluated cases with calculated relief rates",
        "Governing case is clearly marked with the highest relief rate",
        "Datasheet references the governing case by name"
      ],
      commonMistakes: [
        "Assuming the previous engineer got it right—always verify",
        "Using 'typical' relief rates instead of calculating for your specific case",
        "Not updating the relieving case when process conditions change"
      ]
    },
    // Step 7: Rule Card
    {
      type: "rule",
      title: "API 521: The Governing Case Principle",
      paraphrase: "The PSV must be sized for the contingency giving the largest relieving requirements. This is the 'governing case.' All credible scenarios must be evaluated, and the valve sized for the worst one.",
      quote: "The pressure-relieving device shall be sized for the contingency giving the largest relieving requirements.",
      sourceLabel: "API 521, Section 4.2",
      sourceNote: "See API 521 Table 1 for a comprehensive list of overpressure causes."
    },
    // Step 8: Common Wrong Moves
    {
      type: "explain",
      title: "Common Wrong Moves: Scenario Identification Failures",
      body: "These mistakes lead to undersized PSVs and potential incidents:",
      bullets: [
        "❌ Sizing only for blocked outlet when fire case governs",
        "❌ Assuming 'it's a small vessel, fire case won't matter'—large wetted area = large vapor load",
        "❌ Forgetting that control valves can fail in BOTH directions",
        "❌ Not considering simultaneous events (e.g., power failure + cooling water failure)",
        "❌ Copying a relieving case from a 'similar' vessel without verifying"
      ],
      commonMistakes: [
        "Fire case often governs for vessels with large surface area",
        "Tube rupture case can require massive relief rates for high-pressure exchangers",
        "Power failure can be the governing case for complex systems with multiple control loops"
      ],
      fieldCues: [
        "If the PSV seems small for the vessel size, verify the relieving case",
        "If multiple PSVs are installed, check if they're sized for different scenarios"
      ]
    },
    // Step 9: Mini-Drill
    {
      type: "drill",
      title: "Mini-Drill: Identifying Relieving Cases",
      drillId: "drill-m1-l3"
    },
    // Step 10: Supervisor Check
    {
      type: "supervisorcheck",
      title: "Supervisor Check: Relieving Case Review",
      checklist: [
        "Has the engineer evaluated ALL credible scenarios from API 521 Table 1?",
        "Is the governing case clearly identified and documented?",
        "Does the calculated relief rate match the stated scenario?",
        "Has fire case been considered for vessels in fire zones?",
        "Have control valve failure modes been evaluated?"
      ],
      fastSanityChecks: [
        "Blocked outlet: relief rate ≈ max pump or compressor throughput",
        "Fire case: larger vessels typically have higher fire case loads",
        "If tube rupture applies, check that the relief rate is massive"
      ]
    },
    // Step 11: Confidence Check
    {
      type: "confidence",
      title: "Confidence Check",
      prompt: "Can you identify at least three credible relieving scenarios for a pump discharge vessel in a refinery fire zone?",
      actionsIfLow: [
        { label: "Review the Major Relieving Cases", goToStepIndex: 1 },
        { label: "Review the Decision Tree", goToStepIndex: 2 }
      ]
    },
    // Step 12: Quiz
    {
      type: "quiz",
      title: "Quiz: Relieving Cases",
      quizId: "quiz-m1-l3"
    }
  ]
};

const lesson4: Lesson = {
  id: "m1-l4",
  moduleId: "module-1",
  title: "Backpressure: Superimposed vs Built-up (Why Selections Change)",
  estMinutes: 18,
  required: true,
  objectives: [
    { id: "m1-l4-obj1", label: "Types", text: "Define superimposed and built-up backpressure" },
    { id: "m1-l4-obj2", label: "Effects", text: "Understand how backpressure affects conventional PSV performance" },
    { id: "m1-l4-obj3", label: "10%", text: "Apply the 10% rule for conventional valve limits" },
    { id: "m1-l4-obj4", label: "Selection", text: "Know when to specify bellows or pilot-operated valves" }
  ],
  steps: [
    // Step 1: Plant Reality
    {
      type: "explain",
      title: "Plant Reality: The Flare Header Disaster",
      body: "A chemical plant had 12 PSVs discharging to a common flare header. All were conventional spring-loaded valves. During a plant-wide upset, several PSVs lifted simultaneously. The flare header pressure spiked to 45 psig.\n\nOne PSV, protecting a vessel with 100 psig MAWP and 100 psig set pressure, simply didn't open. The backpressure was 45% of set pressure—way over the 10% limit for conventional valves. The effective set pressure had shifted upward, and the valve couldn't overcome the combined spring force plus backpressure.\n\nThe vessel reached 125 psig before operators could manually depressure. It survived—barely. The post-incident investigation revealed that variable backpressure had never been evaluated when the flare system was designed.\n\nAll 12 PSVs were replaced with balanced bellows valves. Cost: $1.8 million.",
      bullets: [
        "Backpressure opposes the opening force on a conventional PSV disc",
        "High backpressure can prevent a PSV from opening at set pressure",
        "Flare headers create variable backpressure—especially during upsets",
        "This is why valve TYPE selection matters, not just sizing"
      ],
      fieldCues: [
        "Multiple PSVs discharging to a common header = variable BP risk",
        "Long discharge piping = significant built-up BP",
        "If flare header pressure gauge shows >10% of any connected PSV's set pressure during upsets, investigate"
      ]
    },
    // Step 2: Definitions
    {
      type: "explain",
      title: "Backpressure: The Two Types",
      body: "Total backpressure = Superimposed + Built-up. You must understand both to select the right valve type.",
      bullets: [
        "Superimposed Backpressure: Pressure at the PSV outlet BEFORE the valve opens. Comes from the downstream system (flare header, closed system pressure).",
        "Built-up Backpressure: Pressure that develops AFTER the valve opens, due to flow through discharge piping. Depends on flow rate and pipe sizing.",
        "Total Backpressure: The sum of both. This is what affects valve performance.",
        "Constant Backpressure: Doesn't change during relief (e.g., discharging to a fixed-pressure header).",
        "Variable Backpressure: Changes during relief or when other valves lift (e.g., shared flare header)."
      ],
      stopAndCheck: [
        "Atmospheric discharge: Superimposed BP = 0 psig",
        "Flare header at 5 psig normal: Superimposed BP = 5 psig, but it may spike higher during upsets"
      ],
      whatGoodLooksLike: [
        "Datasheet shows both superimposed and built-up BP separately",
        "Total BP as % of set pressure is calculated and documented",
        "Valve type is selected based on BP evaluation"
      ],
      commonMistakes: [
        "Ignoring superimposed BP because 'the flare header is usually at low pressure'",
        "Not calculating built-up BP because 'the pipe is short'",
        "Assuming constant BP when the header is shared with other PSVs"
      ]
    },
    // Step 3: Diagram
    {
      type: "diagram",
      title: "Superimposed vs Built-up Backpressure",
      diagramKey: "backpressure-impact",
      caption: "How backpressure affects conventional PSV performance. Note the set pressure shift and capacity reduction above 10%.",
      stopAndCheck: [
        "At 20% backpressure, by how much does set pressure shift?",
        "What happens to capacity at 30% backpressure?"
      ]
    },
    // Step 4: Diagram - Flare Header
    {
      type: "diagram",
      title: "Variable Backpressure in Flare Headers",
      diagramKey: "flare-header-bp",
      caption: "During plant upsets, multiple PSVs lifting simultaneously can spike flare header pressure dramatically.",
      stopAndCheck: [
        "If 5 PSVs lift simultaneously, what happens to header pressure?",
        "Which PSVs are most affected by this pressure spike?"
      ]
    },
    // Step 5: Field Walkdown
    {
      type: "fieldwalkdown",
      title: "Field Walkdown: Tracing Discharge Piping",
      steps: [
        "Find a PSV and trace its discharge piping",
        "Where does it terminate? Atmosphere, flare header, closed system?",
        "If it connects to a header, how many other PSVs share that header?",
        "Check the header for a pressure gauge—what's the normal pressure?",
        "Measure the discharge pipe length and count fittings (elbows, tees)"
      ],
      lookFors: [
        "Discharge pipe diameter—is it as large as the PSV outlet?",
        "Pipe supports—sagging discharge pipe increases flow resistance",
        "Rain cap or weatherhood on ATM discharge—can restrict flow",
        "Flare header tie-in angle—should sweep in direction of flow"
      ],
      redFlags: [
        "Long, small-diameter discharge pipe (high built-up BP)",
        "Shared header with multiple large PSVs (variable BP risk)",
        "Bellows valve discharging to ATM (may be overspecified or wrong replacement)",
        "No pressure gauge on flare header (can't monitor BP during upsets)"
      ]
    },
    // Step 6: Decision Checklist
    {
      type: "explain",
      title: "Decision Checklist: Valve Type Selection Based on Backpressure",
      body: "Use this systematic approach to select the right valve type:",
      bullets: [
        "1. Determine discharge destination (ATM, flare, closed system)",
        "2. Estimate superimposed BP (normal header pressure + upset spike potential)",
        "3. Calculate built-up BP using discharge pipe sizing tools",
        "4. Sum to get total BP, express as % of set pressure",
        "5. Select valve type based on total BP:"
      ],
      stopAndCheck: [
        "Total BP ≤ 10% of set: Conventional valve OK",
        "Total BP 10-50% of set: Balanced bellows required",
        "Total BP >50% of set or tight shutoff needed: Pilot-operated"
      ],
      whatGoodLooksLike: [
        "Calculation shows: 'Superimposed = 15 psig, Built-up = 8 psig, Total = 23 psig (23% of 100 psig set) → Bellows required'",
        "Datasheet valve type matches the BP evaluation",
        "For variable BP cases, both normal and upset header pressures are documented"
      ],
      commonMistakes: [
        "Using 'normal' header pressure without considering upset scenarios",
        "Not accounting for additional PSVs that may lift during the same event",
        "Specifying conventional valve because 'it's cheaper' when BP exceeds 10%"
      ]
    },
    // Step 7: Rule Card
    {
      type: "rule",
      title: "API 520: Conventional Valve Backpressure Limit",
      paraphrase: "Conventional PSVs should not be used when total backpressure exceeds 10% of set pressure. Above this limit, both set pressure and capacity are significantly affected. Balanced bellows or pilot-operated valves are required for higher backpressure applications.",
      quote: "The performance of conventional pressure relief valves is affected when the backpressure exceeds approximately 10 percent of set pressure.",
      sourceLabel: "API 520 Part I, Section 5.3.3",
      sourceNote: "Bellows valves can handle ~50% BP; pilot valves even higher."
    },
    // Step 8: Common Wrong Moves
    {
      type: "explain",
      title: "Common Wrong Moves: Backpressure Failures",
      body: "These mistakes have caused real incidents:",
      bullets: [
        "❌ Installing a conventional valve on a high-BP flare header because 'it's what was there before'",
        "❌ Assuming 'the header is oversized, BP won't be an issue'—upset conditions can spike BP dramatically",
        "❌ Forgetting that built-up BP depends on FLOW RATE—fire case may have higher BP than blocked outlet",
        "❌ Not checking the bellows for damage during turnaround—a torn bellows = conventional valve behavior",
        "❌ Specifying pilot-operated for simple ATM discharge (overspecified, unnecessary cost/complexity)"
      ],
      commonMistakes: [
        "Variable BP in shared headers can exceed 30-40% during plant upsets",
        "Built-up BP for high-flow cases (like fire) can be much higher than normal",
        "Long horizontal discharge runs accumulate significant friction losses"
      ],
      fieldCues: [
        "If a PSV chatters during relief, backpressure might be oscillating",
        "If set pressure seems to 'drift' during relief, check for excessive BP"
      ]
    },
    // Step 9: Mini-Drill
    {
      type: "drill",
      title: "Mini-Drill: Backpressure Calculations",
      drillId: "drill-m1-l4"
    },
    // Step 10: Supervisor Check
    {
      type: "supervisorcheck",
      title: "Supervisor Check: Backpressure Evaluation",
      checklist: [
        "Has both superimposed AND built-up backpressure been calculated?",
        "Is total BP expressed as % of set pressure?",
        "Does the selected valve type match the BP conditions?",
        "For variable BP (flare header), has upset condition been considered?",
        "Is the discharge pipe adequately sized to limit built-up BP?"
      ],
      fastSanityChecks: [
        "ATM discharge: Total BP should be just built-up (typically 3-5% if pipe is sized correctly)",
        "Flare header: Check the header design pressure and normal operating pressure",
        "If bellows valve is specified, verify BP really exceeds 10%"
      ]
    },
    // Step 11: Confidence Check
    {
      type: "confidence",
      title: "Confidence Check",
      prompt: "Can you calculate total backpressure as a percentage of set pressure and determine if a conventional valve is acceptable?",
      actionsIfLow: [
        { label: "Review Backpressure Definitions", goToStepIndex: 1 },
        { label: "Review the Flare Header Diagram", goToStepIndex: 3 }
      ]
    },
    // Step 12: Quiz
    {
      type: "quiz",
      title: "Quiz: Backpressure",
      quizId: "quiz-m1-l4"
    }
  ]
};

const lesson5: Lesson = {
  id: "m1-l5",
  moduleId: "module-1",
  title: "Valve Styles: Conventional vs Bellows vs Pilot (Selection Cues)",
  estMinutes: 15,
  required: true,
  objectives: [
    { id: "m1-l5-obj1", label: "How", text: "Understand how each valve type operates mechanically" },
    { id: "m1-l5-obj2", label: "When", text: "Know when to select each type based on service conditions" },
    { id: "m1-l5-obj3", label: "Limits", text: "Recognize the limitations of each valve style" },
    { id: "m1-l5-obj4", label: "Justify", text: "Write a brief rationale for valve type selection" }
  ],
  steps: [
    // Step 1: Plant Reality
    {
      type: "explain",
      title: "Plant Reality: The Wrong Valve for the Job",
      body: "A specialty chemical unit had a reactor operating at 95 psig—just 5% below its 100 psig set pressure. The conventional PSV leaked constantly. Operations complained. Maintenance replaced the valve three times in one year.\n\nThe problem wasn't the valve—it was the type. Conventional valves need at least 10% differential between operating and set pressure to maintain a reliable seal. At 95% of set, seat leakage is expected.\n\nThe solution was a pilot-operated valve, which provides tight shutoff even at 98% of set pressure. Leakage stopped. Maintenance costs dropped by 80%.\n\nMatching valve TYPE to SERVICE CONDITIONS is just as important as sizing.",
      bullets: [
        "Conventional: Simple, cheap, but needs 10%+ margin below set",
        "Bellows: Compensates for backpressure, isolates process from spring",
        "Pilot-operated: Tight shutoff to 98% of set, handles high BP"
      ],
      fieldCues: [
        "Constant seat leakage on a conventional valve may indicate operating too close to set",
        "Corrosion on a conventional bonnet may indicate need for bellows isolation",
        "If a valve 'weeps' product, check the operating/set pressure margin"
      ]
    },
    // Step 2: Diagram
    {
      type: "diagram",
      title: "PSV Style Cutaways: How Each Type Works",
      diagramKey: "PSVStyleCutaways",
      caption: "Cross-sectional comparison of conventional, balanced bellows, and pilot-operated PSV designs.",
      stopAndCheck: [
        "Where does backpressure act on a conventional valve?",
        "What does the bellows isolate in a bellows valve?",
        "How does a pilot-operated valve stay closed during normal operation?"
      ]
    },
    // Step 3: Gallery
    {
      type: "gallery",
      title: "Valve Types in the Field",
      images: [
        {
          src: "/academy/photos/psv/conventional-installed.jpg",
          alt: "Conventional PSV installed on a process vessel",
          caption: "Conventional PSV: Note the simple bonnet with test lever",
          shotNote: "Full shot of a conventional PSV mounted on a vessel nozzle, showing bonnet, test lever, and discharge elbow"
        },
        {
          src: "/academy/photos/psv/bellows-cutaway.jpg",
          alt: "Bellows PSV cutaway showing bellows assembly",
          caption: "Bellows PSV: The bellows isolates the spring from backpressure",
          shotNote: "Cutaway or sectioned bellows valve showing the bellows element wrapped around the disc guide"
        },
        {
          src: "/academy/photos/psv/pilot-operated.jpg",
          alt: "Pilot-operated PSV with pilot valve visible",
          caption: "Pilot-operated PSV: The small pilot controls the main valve",
          shotNote: "Full shot of pilot-operated valve showing the main body and the small pilot valve mounted on top"
        }
      ]
    },
    // Step 4: Definitions
    {
      type: "explain",
      title: "Valve Type Characteristics",
      body: "Here's what you need to know about each type to make the right selection:",
      bullets: [
        "CONVENTIONAL: Spring-loaded, disc opens when inlet pressure overcomes spring force + backpressure on disc back. Use when: ATM discharge OR backpressure <10% of set. Pros: Simple, low cost. Cons: BP-sensitive, needs 10% margin.",
        "BALANCED BELLOWS: Bellows around disc stem isolates spring chamber from backpressure. Use when: Variable backpressure >10% of set OR corrosive bonnet conditions. Pros: BP-compensated, bonnet isolation. Cons: Bellows can fail, higher cost.",
        "PILOT-OPERATED: Process pressure holds main valve closed; pilot senses pressure and releases to open main valve. Use when: Tight shutoff needed OR very high backpressure. Pros: Operates to 98% of set, handles 50%+ BP. Cons: Complex, pilot can plug in dirty service."
      ],
      stopAndCheck: [
        "Operating at 90% of set? → Consider pilot-operated",
        "Discharging to high-BP flare? → Bellows or pilot required",
        "Simple ATM discharge, low operating pressure? → Conventional is fine"
      ],
      whatGoodLooksLike: [
        "Datasheet includes rationale for valve type selection",
        "Type matches backpressure conditions AND operating margin",
        "Bellows not specified for ATM discharge (overspecified)"
      ],
      commonMistakes: [
        "Using bellows 'just in case' when backpressure is <10%—adds cost and complexity",
        "Using conventional in high-BP service because 'it's always been conventional'",
        "Not considering corrosive process in type selection (bellows isolates bonnet)"
      ]
    },
    // Step 5: Field Walkdown
    {
      type: "fieldwalkdown",
      title: "Field Walkdown: Identifying Valve Types",
      steps: [
        "Find a PSV and look at its nameplate—valve type is usually indicated",
        "Check for a bonnet vent (bellows valves have a vent to detect bellows failure)",
        "Look for a pilot assembly on top of the valve (pilot-operated indicator)",
        "If conventional, check the test lever mechanism",
        "Note the inlet and outlet sizes relative to the orifice designation"
      ],
      lookFors: [
        "Nameplate shows 'balanced bellows' or 'pilot-operated'",
        "Bonnet vent piped to safe location (bellows failure detection)",
        "Small tubing from pilot to main valve (pilot-operated)",
        "Lever marked 'LIFT' for manual test (all types may have this)"
      ],
      redFlags: [
        "Bonnet vent plugged (can't detect bellows failure)",
        "Pilot tubing corroded or blocked (pilot won't sense pressure)",
        "Bellows valve on ATM discharge service (likely overspecified)",
        "Conventional valve on a high-BP flare header (wrong type)"
      ]
    },
    // Step 6: Decision Checklist
    {
      type: "explain",
      title: "Decision Checklist: Valve Type Selection",
      body: "Use this systematic approach for every PSV specification:",
      bullets: [
        "1. Determine total backpressure as % of set pressure",
        "2. Determine operating pressure as % of set pressure",
        "3. Consider if process fluid is corrosive to spring materials",
        "4. Apply selection criteria:"
      ],
      stopAndCheck: [
        "BP ≤10%, Operating <90% of set, non-corrosive → CONVENTIONAL",
        "BP 10-50%, OR corrosive bonnet conditions → BALANCED BELLOWS",
        "BP >50%, OR operating >90% of set, OR tight shutoff critical → PILOT-OPERATED"
      ],
      whatGoodLooksLike: [
        "Selection rationale documented: 'BP = 25% of set (>10%) → Bellows required'",
        "Operating margin noted: 'Operating at 85 psig, Set at 100 psig (85%) → Conventional acceptable'",
        "Corrosive service flag: 'H2S in process, bonnet isolation required → Bellows'"
      ],
      commonMistakes: [
        "Not considering that pilot-operated valves can fail closed in dirty service",
        "Specifying bellows for every flare discharge without checking actual BP",
        "Forgetting to check operating pressure margin for conventional valves"
      ]
    },
    // Step 7: Rule Card
    {
      type: "rule",
      title: "API 520: Valve Style Selection",
      paraphrase: "The style of valve selected depends on the service conditions, primarily backpressure and operating pressure margin. Conventional valves are suitable for low-backpressure applications. Balanced valves compensate for backpressure effects. Pilot-operated valves provide tight shutoff and handle high backpressure.",
      quote: "The selection of valve style depends on the expected backpressure and operating conditions.",
      sourceLabel: "API 520 Part I, Section 5.3",
      sourceNote: "Each manufacturer publishes performance curves showing BP effects."
    },
    // Step 8: Common Wrong Moves
    {
      type: "explain",
      title: "Common Wrong Moves: Valve Type Selection",
      body: "These selection errors cause real problems:",
      bullets: [
        "❌ Defaulting to conventional because it's the cheapest option",
        "❌ Specifying bellows for every application 'to be safe'—adds unnecessary cost/complexity",
        "❌ Using pilot-operated in extremely dirty or polymerizing service (pilot plugs)",
        "❌ Not checking if bellows is intact during turnaround inspections",
        "❌ Replacing a bellows valve with conventional during emergency repairs"
      ],
      commonMistakes: [
        "Bellows failure converts the valve to conventional behavior—check bonnet vent for leakage",
        "Pilot-operated valves have sensing lines that can plug in dirty service",
        "Conventional valves chatter if operating too close to set pressure"
      ],
      fieldCues: [
        "Liquid leaking from bellows bonnet vent = bellows has failed",
        "Pilot valve leaking gas = pilot diaphragm may have failed",
        "Constant chatter = may need pilot-operated for tighter shutoff"
      ]
    },
    // Step 9: Mini-Drill
    {
      type: "drill",
      title: "Mini-Drill: Valve Type Selection",
      drillId: "drill-m1-l5"
    },
    // Step 10: Supervisor Check
    {
      type: "supervisorcheck",
      title: "Supervisor Check: Valve Type Selection",
      checklist: [
        "Is the valve type justified based on backpressure?",
        "Has operating pressure margin been considered?",
        "Is bonnet corrosion a concern (favors bellows)?",
        "For pilot-operated, is the process clean enough?",
        "Does the rationale appear on the datasheet or in the sizing calc?"
      ],
      fastSanityChecks: [
        "ATM discharge → conventional is usually fine",
        "Flare header → check BP at upset conditions, likely bellows or pilot",
        "Operating >90% of set → pilot-operated for tight shutoff"
      ]
    },
    // Step 11: Confidence Check
    {
      type: "confidence",
      title: "Confidence Check",
      prompt: "Can you write a one-sentence rationale for selecting bellows over conventional based on backpressure conditions?",
      actionsIfLow: [
        { label: "Review Valve Type Characteristics", goToStepIndex: 3 },
        { label: "Review the Selection Checklist", goToStepIndex: 5 }
      ]
    },
    // Step 12: Quiz
    {
      type: "quiz",
      title: "Quiz: Valve Styles",
      quizId: "quiz-m1-l5"
    }
  ]
};

const lesson6: Lesson = {
  id: "m1-l6",
  moduleId: "module-1",
  title: "Tank Breathing + Vapor Control + Overfill Layers",
  estMinutes: 20,
  required: true,
  objectives: [
    { id: "m1-l6-obj1", label: "Breathing", text: "Understand tank in-breathing and out-breathing mechanisms" },
    { id: "m1-l6-obj2", label: "Devices", text: "Know the difference between PVRVs, emergency vents, and flame arresters" },
    { id: "m1-l6-obj3", label: "Vapor", text: "Understand vapor control system requirements at loading racks" },
    { id: "m1-l6-obj4", label: "Overfill", text: "Recognize the layers of overfill protection per API 2350" }
  ],
  steps: [
    // Step 1: Plant Reality - Tank Breathing
    {
      type: "explain",
      title: "Plant Reality: The Tank That Collapsed Overnight",
      body: "A crude oil storage tank in Oklahoma had its PVRV removed for maintenance on a Friday afternoon. The mechanic placed a blind flange on the nozzle, planning to reinstall the PVRV Monday morning.\n\nFriday night brought a cold front. The temperature dropped 40°F. The vapor inside the tank contracted. With no vacuum relief path, the tank pulled an internal vacuum. By 6 AM Saturday, the tank roof had buckled inward—a total loss.\n\nCost: $2.5 million for a new tank, plus 10,000 barrels of contaminated crude.\n\nAtmospheric tanks have very low pressure tolerance. They breathe—and if you block that breathing, they fail.",
      bullets: [
        "In-breathing: Tank needs air IN when liquid is pumped out OR vapor contracts from cooling",
        "Out-breathing: Tank needs to vent OUT when liquid is pumped in OR vapor expands from heating",
        "Tank design pressures are measured in INCHES of water column, not PSI",
        "Even 1-2 psig can exceed the design pressure of an atmospheric tank"
      ],
      fieldCues: [
        "Listen for the 'puff' of PVRV operating during filling",
        "Watch for vacuum pallets lifting during pump-out operations",
        "Check that gauge hatches aren't sealed tight (they provide emergency relief)"
      ]
    },
    // Step 2: Plant Reality - Overfill
    {
      type: "explain",
      title: "Plant Reality: The Buncefield Disaster",
      body: "December 11, 2005, Buncefield Terminal, UK. A gasoline storage tank overflowed. The level gauge had stuck—operators didn't know the tank was full. An independent high-level alarm existed, but it had been disabled during maintenance and never re-enabled.\n\n300 tons of gasoline cascaded down the tank roof. A vapor cloud formed. At 6:01 AM, it ignited. The explosion registered 2.4 on the Richter scale. 43 people were injured. The terminal was destroyed.\n\nOverfill protection requires INDEPENDENT LAYERS. A single gauge failure shouldn't cause a catastrophe.",
      bullets: [
        "Overfill events release large volumes of product outside containment",
        "Vapor clouds from gasoline or light products can travel and find ignition",
        "API 2350 requires independent layers: gauge → high alarm → high-high shutdown",
        "The high-high switch must be INDEPENDENT from the primary level measurement"
      ],
      fieldCues: [
        "Check if the high-high level switch is truly independent (different sensing element)",
        "Verify the high-high trips the correct shutdown function (inlet valve closure)",
        "Test records should show regular proof tests of the safety function"
      ]
    },
    // Step 3: Diagram - Tank Breathing
    {
      type: "diagram",
      title: "Tank Breathing: In-Breathing vs Out-Breathing",
      diagramKey: "breathing-triggers",
      caption: "What triggers tank breathing and why PVRV sizing must account for both thermal effects and liquid movement.",
      stopAndCheck: [
        "What triggers in-breathing? (Pump-out, cooling)",
        "What triggers out-breathing? (Fill, heating)",
        "Which typically requires larger venting capacity—thermal or liquid movement?"
      ]
    },
    // Step 4: Diagram - Overfill Layers
    {
      type: "diagram",
      title: "Overfill Protection Layers (API 2350)",
      diagramKey: "OverfillLayersDiagram",
      caption: "Defense-in-depth: Level gauge → High alarm → Independent high-high → Automatic shutdown",
      stopAndCheck: [
        "Why must the high-high switch be independent from the primary gauge?",
        "What should trigger when high-high is reached?",
        "Who must respond to a high alarm before automatic shutdown activates?"
      ]
    },
    // Step 5: Gallery
    {
      type: "gallery",
      title: "Tank Protection Equipment",
      images: [
        {
          src: "/academy/photos/tank/pvrv-roof.jpg",
          alt: "PVRV mounted on tank roof nozzle",
          caption: "Pressure/Vacuum Relief Valve (PVRV) - protects against both overpressure and vacuum",
          shotNote: "Close-up of a PVRV installed on a tank roof, showing pressure and vacuum pallets"
        },
        {
          src: "/academy/photos/tank/emergency-vent.jpg",
          alt: "Emergency vent on tank roof",
          caption: "Emergency vent - provides additional relief for fire case",
          shotNote: "Emergency vent device on tank roof, showing the larger opening compared to normal PVRV"
        },
        {
          src: "/academy/photos/tank/flame-arrester.jpg",
          alt: "Flame arrester on tank vent",
          caption: "Flame arrester - prevents flame propagation into tank vapor space",
          shotNote: "Flame arrester installed between PVRV and tank nozzle, showing the element housing"
        },
        {
          src: "/academy/photos/tank/radar-gauge.jpg",
          alt: "Radar level gauge on tank roof",
          caption: "Radar level gauge - primary level measurement for tank inventory",
          shotNote: "Radar gauge head mounted on tank roof with stilling well connection"
        }
      ]
    },
    // Step 6: Field Walkdown
    {
      type: "fieldwalkdown",
      title: "Field Walkdown: Tank Protection Systems",
      steps: [
        "Stand at a storage tank and identify all roof-mounted devices",
        "Locate the PVRV(s)—how many are installed? What's the total capacity?",
        "Find the gauge hatch—is it weighted or bolted? (Weighted can provide emergency relief)",
        "Identify the level instruments—primary gauge, high alarm, high-high shutdown",
        "Trace the high-high switch signal—does it go to an independent shutdown system?"
      ],
      lookFors: [
        "PVRV condition—are pallets free to move? Any corrosion?",
        "Flame arrester element—is it clean and unobstructed?",
        "Level instrument independence—are high-high and primary gauge different devices?",
        "Emergency vent sizing placard—does it match API 2000 requirements?"
      ],
      redFlags: [
        "PVRV pallets stuck from corrosion or product buildup",
        "Only one level instrument for both measurement and high-high",
        "Flame arrester element visibly plugged or corroded",
        "Emergency vent blocked or undersized for tank wetted area"
      ]
    },
    // Step 7: Decision Checklist
    {
      type: "explain",
      title: "Decision Checklist: Tank Protection Requirements",
      body: "For any atmospheric storage tank, verify these protection elements:",
      bullets: [
        "✓ Normal venting: PVRV sized for MAX of thermal breathing OR liquid movement",
        "✓ Emergency venting: Sized per API 2000 for fire case (wetted area basis)",
        "✓ Flame protection: Flame arrester required if product is flammable",
        "✓ Overfill protection: Independent layers per API 2350 category",
        "✓ Vapor control: Required for VOC-containing products per environmental permits"
      ],
      stopAndCheck: [
        "Normal venting = MAX of (thermal + liquid movement) vs emergency—don't add them",
        "Fire case often requires much larger venting than normal operations",
        "API 2350 Category 3 requires automatic shutdown—check your site's category"
      ],
      whatGoodLooksLike: [
        "Tank data sheet shows normal and emergency venting calculations separately",
        "High-high level switch is clearly identified as independent from primary",
        "Flame arrester is included for all flammable product tanks",
        "Vapor control (VRU or flare) is specified where required by permit"
      ],
      commonMistakes: [
        "Adding normal and emergency venting requirements (should take the MAX)",
        "Using the primary level gauge for high-high function (not independent)",
        "Forgetting flame arrester maintenance—they can plug with corrosion products"
      ]
    },
    // Step 8: Diagram - Vapor Control
    {
      type: "diagram",
      title: "Vapor Control at Loading Racks",
      diagramKey: "vapor-manifold",
      caption: "How vapor recovery systems capture displaced vapors during loading operations.",
      stopAndCheck: [
        "Where do the recovered vapors go?",
        "What happens if the VRU is offline during a loading operation?"
      ]
    },
    // Step 9: Rule Card
    {
      type: "rule",
      title: "API 2000 & API 2350: Tank Protection Standards",
      paraphrase: "API 2000 provides requirements for normal and emergency venting of atmospheric storage tanks. API 2350 establishes requirements for overfill protection based on consequence categories. Together, they define the minimum protection for safe tank operations.",
      quote: "The tank shall be protected against overpressure and vacuum by properly designed and maintained venting systems.",
      sourceLabel: "API 2000, Section 1 Scope",
      sourceNote: "API 2350 categorizes tanks by overfill consequence severity (Cat 1, 2, 3)."
    },
    // Step 10: Common Wrong Moves
    {
      type: "explain",
      title: "Common Wrong Moves: Tank Protection",
      body: "These tank protection mistakes have caused real incidents:",
      bullets: [
        "❌ Removing PVRV for maintenance without installing a temporary vent path",
        "❌ Relying on a single level gauge for both inventory and high-high protection",
        "❌ Disabling the high-high shutdown to 'avoid nuisance trips' during receipts",
        "❌ Plugging flame arresters without understanding the fire risk",
        "❌ Undersizing emergency vents by forgetting fire case calculations"
      ],
      commonMistakes: [
        "Tank vacuum can collapse a tank in SECONDS—never block vacuum relief",
        "High-high shutdowns should be tested regularly (at least annually)",
        "Flame arrester plugging reduces venting capacity AND defeats fire protection"
      ],
      fieldCues: [
        "If PVRV hasn't operated in months, check for stuck pallets",
        "If high-high alarm has never activated, question if it's working",
        "If flame arrester element hasn't been inspected recently, schedule it"
      ]
    },
    // Step 11: Mini-Drill
    {
      type: "drill",
      title: "Mini-Drill: Tank Protection",
      drillId: "drill-m1-l6"
    },
    // Step 12: Supervisor Check
    {
      type: "supervisorcheck",
      title: "Supervisor Check: Tank Protection Review",
      checklist: [
        "Is normal venting calculated correctly (MAX of thermal+liquid vs emergency)?",
        "Is emergency venting sized per API 2000 for the tank wetted area?",
        "Is the high-high level switch truly independent from primary measurement?",
        "Has the high-high shutdown logic been proof-tested recently?",
        "Is flame arrester element inspection current?"
      ],
      fastSanityChecks: [
        "Large tanks need multiple PVRVs—check that total capacity is adequate",
        "Fire case venting often exceeds normal venting by 3-5x for large tanks",
        "If high-high trips don't close an inlet valve, the protection is incomplete"
      ]
    },
    // Step 13: Confidence Check
    {
      type: "confidence",
      title: "Confidence Check",
      prompt: "Can you explain why overfill protection requires INDEPENDENT layers and what 'independent' means in practice?",
      actionsIfLow: [
        { label: "Review the Buncefield Case", goToStepIndex: 1 },
        { label: "Review the Overfill Layers Diagram", goToStepIndex: 3 }
      ]
    },
    // Step 14: Quiz
    {
      type: "quiz",
      title: "Quiz: Tank Protection Systems",
      quizId: "quiz-m1-l6"
    }
  ]
};

// =============================================================================
// ASSEMBLE MODULE 1
// =============================================================================

const module1: Module = {
  id: "module-1",
  title: "Start Here: PSV & Tank Protection Fundamentals",
  summary: "Build your foundation in pressure relief and tank protection. Learn the terminology, identify relieving scenarios, understand backpressure, select valve types, and recognize tank protection layers. Complete this module before tackling sizing calculations.",
  order: 1,
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6]
};

// =============================================================================
// COURSE DEFINITION
// =============================================================================

export const academyCourse: Course = {
  id: "puffer-academy",
  title: "Puffer Training Academy",
  description: "Master pressure relief, tank venting, flame protection, and overfill prevention. Learn from experienced trainers and process engineers through guided, step-by-step lessons.",
  modules: [module1]
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getModuleById(moduleId: string): Module | undefined {
  return academyCourse.modules.find(m => m.id === moduleId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const mod of academyCourse.modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getLessonsByModule(moduleId: string): Lesson[] {
  const mod = getModuleById(moduleId);
  return mod?.lessons ?? [];
}

export function getStepByIndex(lessonId: string, stepIndex: number): Step | undefined {
  const lesson = getLessonById(lessonId);
  return lesson?.steps[stepIndex];
}

export function getTotalSteps(lessonId: string): number {
  const lesson = getLessonById(lessonId);
  return lesson?.steps.length ?? 0;
}

export function getModuleProgress(moduleId: string, completedLessons: string[]): number {
  const mod = getModuleById(moduleId);
  if (!mod) return 0;
  const completed = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
  return Math.round((completed / mod.lessons.length) * 100);
}

export function isLessonComplete(lessonId: string, completedSteps: number[]): boolean {
  // A lesson is complete when drill and quiz steps have been completed
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;
  
  // Find drill and quiz step indices
  const drillIndex = lesson.steps.findIndex(s => s.type === 'drill');
  const quizIndex = lesson.steps.findIndex(s => s.type === 'quiz');
  
  const drillComplete = drillIndex === -1 || completedSteps.includes(drillIndex);
  const quizComplete = quizIndex === -1 || completedSteps.includes(quizIndex);
  
  return drillComplete && quizComplete;
}

// Export all course content
export default academyCourse;
