/**
 * Training Academy Drills
 * Practice question sets before quizzes
 */

import type { Drill } from "./types";

export const drills: Drill[] = [
  // PSV TRACK DRILLS
  {
    id: "drill-psv-101",
    lessonId: "psv-101",
    title: "PSV Purpose & Terminology",
    description: "Quick check on PSV fundamentals before the quiz",
    questions: [
      {
        id: "d1q1",
        question: "What is the primary purpose of a Pressure Safety Valve?",
        options: [
          "Control operating pressure",
          "Prevent overpressure beyond MAWP",
          "Regulate flow rate",
          "Measure vessel pressure"
        ],
        correctIndex: 1,
        hint: "Think about what 'safety' in the name implies",
        explanation: "PSVs are safety devices that open automatically to prevent pressure from exceeding the vessel's Maximum Allowable Working Pressure (MAWP)."
      },
      {
        id: "d1q2",
        question: "What does MAWP stand for?",
        options: [
          "Maximum Actual Working Pressure",
          "Maximum Allowable Working Pressure",
          "Minimum Allowable Working Pressure",
          "Maximum Allowable Water Pressure"
        ],
        correctIndex: 1,
        explanation: "MAWP is the Maximum Allowable Working Pressure – the highest pressure at which a vessel can safely operate."
      },
      {
        id: "d1q3",
        question: "What is 'set pressure'?",
        options: [
          "Normal operating pressure",
          "Pressure at which the PSV opens",
          "Pressure after PSV closes",
          "Maximum test pressure"
        ],
        correctIndex: 1,
        hint: "This is the pressure you 'set' the valve to open at",
        explanation: "Set pressure is the inlet gauge pressure at which the PSV is adjusted to open under service conditions."
      },
      {
        id: "d1q4",
        question: "What is 'blowdown'?",
        options: [
          "Fluid escaping past the valve seat",
          "Pressure drop from set to reseat",
          "Valve completely opening",
          "Initial pressure rise"
        ],
        correctIndex: 1,
        explanation: "Blowdown is the difference between set pressure and reseating pressure, expressed as a percentage of set pressure."
      },
      {
        id: "d1q5",
        question: "Where does PSV discharge typically go?",
        options: [
          "Always to atmosphere",
          "Always to flare",
          "Depends on service (ATM, flare, closed drain)",
          "Back to the vessel"
        ],
        correctIndex: 2,
        explanation: "Discharge destination depends on the fluid being relieved – hazardous vapors go to flare, steam may go to atmosphere, liquids to closed drain."
      },
      {
        id: "d1q6",
        question: "What is accumulation?",
        options: [
          "Pressure rise above MAWP during relief",
          "Fluid building up in the valve",
          "Normal pressure increase during operation",
          "Backpressure in the discharge line"
        ],
        correctIndex: 0,
        hint: "Think about what happens WHILE the PSV is relieving",
        explanation: "Accumulation is the pressure increase above MAWP that occurs during discharge. For single PSVs, it's typically limited to 10% of MAWP."
      }
    ]
  },
  {
    id: "drill-psv-102",
    lessonId: "psv-102",
    title: "Pressure Units Practice",
    description: "Practice converting between pressure units",
    questions: [
      {
        id: "d2q1",
        question: "What is atmospheric pressure at sea level in psia?",
        options: ["0 psia", "14.7 psia", "14.7 psig", "100 psia"],
        correctIndex: 1,
        explanation: "Standard atmospheric pressure at sea level is 14.7 psia (pounds per square inch absolute)."
      },
      {
        id: "d2q2",
        question: "If a gauge reads 100 psig, what is the absolute pressure?",
        options: ["100 psia", "85.3 psia", "114.7 psia", "147 psia"],
        correctIndex: 2,
        hint: "Add atmospheric pressure to gauge pressure",
        explanation: "Psia = psig + 14.7, so 100 + 14.7 = 114.7 psia"
      },
      {
        id: "d2q3",
        question: "A vessel has MAWP of 150 psig. What is this in psia?",
        options: ["150 psia", "135.3 psia", "164.7 psia", "165 psia"],
        correctIndex: 2,
        hint: "Remember: psia = psig + 14.7",
        explanation: "150 psig + 14.7 = 164.7 psia"
      },
      {
        id: "d2q4",
        question: "Why do gas sizing equations use absolute pressure?",
        options: [
          "It's easier to calculate",
          "Gas laws require absolute values",
          "API standards require it",
          "It gives larger numbers"
        ],
        correctIndex: 1,
        hint: "Think about the Ideal Gas Law (PV = nRT)",
        explanation: "Gas laws (like PV = nRT) require absolute temperature and pressure. Using gauge pressure would give incorrect results."
      },
      {
        id: "d2q5",
        question: "What is vacuum in pressure terms?",
        options: [
          "Pressure above atmospheric",
          "Pressure below atmospheric",
          "Zero pressure",
          "Negative absolute pressure"
        ],
        correctIndex: 1,
        explanation: "Vacuum is pressure below atmospheric. A perfect vacuum would be 0 psia (-14.7 psig)."
      }
    ]
  },
  {
    id: "drill-psv-103",
    lessonId: "psv-103",
    title: "Relieving Scenarios Recognition",
    description: "Identify credible relieving scenarios",
    questions: [
      {
        id: "d3q1",
        question: "Which is typically the governing relieving scenario for a vessel downstream of a pump?",
        options: [
          "Fire case",
          "Blocked outlet",
          "Thermal expansion",
          "Tube rupture"
        ],
        correctIndex: 1,
        hint: "Think about what happens if the outlet valve closes while the pump runs",
        explanation: "Blocked outlet is often governing for pumped systems because the pump can deliver maximum flow regardless of downstream conditions."
      },
      {
        id: "d3q2",
        question: "What determines the 'wetted area' for fire case sizing?",
        options: [
          "Total vessel surface area",
          "Liquid-contacted area up to 25 ft elevation",
          "Area above the liquid level",
          "External insulation area"
        ],
        correctIndex: 1,
        explanation: "Wetted area includes only the liquid-wetted surface up to 25 feet above grade. Area above this elevation is excluded because flames typically don't reach that high."
      },
      {
        id: "d3q3",
        question: "When is thermal relief needed?",
        options: [
          "Always on every vessel",
          "When liquid can be blocked in and heated",
          "Only on hot oil systems",
          "Only on steam systems"
        ],
        correctIndex: 1,
        hint: "Liquids expand when heated and are incompressible",
        explanation: "Thermal relief is required when liquid can be isolated (blocked in) and subsequently heated, causing hydraulic expansion pressure."
      },
      {
        id: "d3q4",
        question: "API 521 Table 1 lists credible overpressure scenarios. Which is NOT typically included?",
        options: [
          "Blocked outlet",
          "Fire case",
          "Operator error during startup",
          "Normal process variations"
        ],
        correctIndex: 3,
        explanation: "Normal process variations are handled by control systems, not PSVs. PSVs protect against abnormal conditions like blocked outlets, fire, equipment failure, etc."
      },
      {
        id: "d3q5",
        question: "For a shell-and-tube heat exchanger, which side typically needs tube rupture protection?",
        options: [
          "Always the shell side",
          "Always the tube side",
          "The lower-pressure side",
          "Neither side needs protection"
        ],
        correctIndex: 2,
        hint: "Think about pressure differential if tubes fail",
        explanation: "The lower-pressure side needs protection because high-pressure fluid from the other side could cause overpressure if tubes rupture."
      },
      {
        id: "d3q6",
        question: "What's the relationship between multiple relieving scenarios?",
        options: [
          "Size for the average case",
          "Size for the most likely case",
          "Size for the largest (governing) case",
          "Add all cases together"
        ],
        correctIndex: 2,
        explanation: "The PSV must be sized for the largest (governing) relieving case. Different scenarios are evaluated independently, and the largest determines required capacity."
      }
    ]
  },
  {
    id: "drill-psv-104",
    lessonId: "psv-104",
    title: "Backpressure Fundamentals",
    description: "Understand backpressure types and effects",
    questions: [
      {
        id: "d4q1",
        question: "What is superimposed backpressure?",
        options: [
          "Pressure created by PSV flow through discharge piping",
          "Pressure existing at PSV outlet before it opens",
          "Total pressure at the PSV outlet",
          "Pressure from the atmosphere"
        ],
        correctIndex: 1,
        hint: "Think about what's 'superimposed' on the outlet BEFORE the valve opens",
        explanation: "Superimposed backpressure is the static pressure at the PSV outlet before it opens, typically from a common discharge header."
      },
      {
        id: "d4q2",
        question: "What is built-up backpressure?",
        options: [
          "Pressure existing before the PSV opens",
          "Pressure increase caused by PSV discharge flow",
          "Atmospheric pressure",
          "Pressure from other valves lifting"
        ],
        correctIndex: 1,
        explanation: "Built-up backpressure is the pressure increase at the PSV outlet caused by flow through the discharge piping when the valve relieves."
      },
      {
        id: "d4q3",
        question: "A conventional PSV works best when total backpressure is:",
        options: [
          "Less than 10% of set pressure",
          "Less than 50% of set pressure",
          "Any backpressure is acceptable",
          "Greater than set pressure"
        ],
        correctIndex: 0,
        hint: "Conventional valves are most affected by backpressure",
        explanation: "Conventional PSVs have both set pressure shift and capacity reduction when backpressure exceeds 10% of set. Above 10%, consider bellows or pilot valves."
      },
      {
        id: "d4q4",
        question: "How does a balanced bellows valve handle backpressure?",
        options: [
          "It doesn't – same as conventional",
          "Bellows isolates the spring chamber from backpressure",
          "It has a stronger spring",
          "It uses two discs"
        ],
        correctIndex: 1,
        explanation: "The bellows isolates the spring chamber from discharge pressure, so backpressure on the disc back is counterbalanced by bellows area. Set pressure remains constant."
      },
      {
        id: "d4q5",
        question: "Total backpressure equals:",
        options: [
          "Superimposed only",
          "Built-up only",
          "Superimposed + Built-up",
          "Set pressure minus operating pressure"
        ],
        correctIndex: 2,
        hint: "It's the SUM of both types",
        explanation: "Total backpressure = superimposed backpressure + built-up backpressure. Both must be considered in PSV selection and sizing."
      }
    ]
  },
  {
    id: "drill-psv-105",
    lessonId: "psv-105",
    title: "PSV Style Selection",
    description: "Practice selecting the right PSV style",
    questions: [
      {
        id: "d5q1",
        question: "Which PSV style is simplest and lowest cost?",
        options: ["Conventional", "Balanced bellows", "Pilot-operated", "Rupture disc"],
        correctIndex: 0,
        explanation: "Conventional PSVs have the simplest construction (spring-loaded, no bellows or pilot) and lowest cost. They work well when backpressure is low."
      },
      {
        id: "d5q2",
        question: "When is a balanced bellows PSV preferred over conventional?",
        options: [
          "When cost is the only concern",
          "When backpressure is variable or >10% of set",
          "When the fluid is extremely corrosive",
          "When inlet piping is very long"
        ],
        correctIndex: 1,
        hint: "Bellows is about handling backpressure",
        explanation: "Balanced bellows valves maintain constant set pressure despite backpressure variations. They're chosen when backpressure exceeds 10% of set or varies significantly."
      },
      {
        id: "d5q3",
        question: "Pilot-operated PSVs are good for:",
        options: [
          "Low set pressures only",
          "Small orifice requirements",
          "Operating pressure close to set pressure",
          "Atmospheric discharge only"
        ],
        correctIndex: 2,
        hint: "Think about the advantage of a 'pilot' controlling the main valve",
        explanation: "Pilot-operated valves allow operating pressure very close to set (up to 98% of set) because the pilot provides sharp opening characteristics with minimal leak."
      },
      {
        id: "d5q4",
        question: "What is a limitation of balanced bellows PSVs?",
        options: [
          "Cannot handle any backpressure",
          "Bellows can fatigue or fail",
          "Only work with gases",
          "Cannot reseat after relieving"
        ],
        correctIndex: 1,
        explanation: "Bellows are metal components that can fatigue or be damaged by corrosion or excessive pressure. They add complexity and require inspection."
      },
      {
        id: "d5q5",
        question: "For discharge to a closed flare header with 30 psig normal pressure, which valve style at 100 psig set?",
        options: [
          "Conventional (30% BP is fine)",
          "Balanced bellows (30% BP exceeds conventional limit)",
          "Any style works",
          "PSVs cannot discharge to flare"
        ],
        correctIndex: 1,
        hint: "30 psig is what percentage of 100 psig set?",
        explanation: "30 psig is 30% of 100 psig set, exceeding the 10% limit for conventional valves. A balanced bellows valve is needed to maintain proper set pressure."
      },
      {
        id: "d5q6",
        question: "Which PSV style has NO moving parts in the main valve body during normal operation?",
        options: ["Conventional", "Balanced bellows", "Pilot-operated", "All have moving parts"],
        correctIndex: 2,
        explanation: "Pilot-operated valves keep the main valve closed with process pressure during normal operation. The only moving parts are in the small pilot valve."
      }
    ]
  },
  {
    id: "drill-psv-106",
    lessonId: "psv-106",
    title: "Orifice Letter Designations",
    description: "Practice with standard orifice sizes",
    questions: [
      {
        id: "d6q1",
        question: "What do orifice letters (D, E, F, G, etc.) represent?",
        options: [
          "Manufacturer codes",
          "Standard effective discharge areas",
          "Material grades",
          "Temperature ratings"
        ],
        correctIndex: 1,
        hint: "Each letter corresponds to a specific flow capacity",
        explanation: "API 526 defines standard orifice letters representing specific effective discharge areas. This standardization allows interchangeability between manufacturers."
      },
      {
        id: "d6q2",
        question: "As you go from D orifice to T orifice, the area:",
        options: [
          "Decreases",
          "Stays the same",
          "Increases",
          "Varies by manufacturer"
        ],
        correctIndex: 2,
        explanation: "Orifice areas increase as you go up the alphabet: D (0.110 in²) is smallest, T (26.0 in²) is largest in the standard series."
      },
      {
        id: "d6q3",
        question: "Why is it important to use API 526 standard orifice sizes?",
        options: [
          "Reduced cost only",
          "Interchangeability and standardized ratings",
          "Better performance",
          "Required by law everywhere"
        ],
        correctIndex: 1,
        hint: "Think about spare parts and multiple vendors",
        explanation: "API 526 ensures valves from different manufacturers with the same orifice letter have the same capacity. This allows standardization and interchangeability."
      },
      {
        id: "d6q4",
        question: "If calculation shows you need 0.45 in² effective area, which orifice do you select?",
        options: [
          "The orifice closest to 0.45 in²",
          "The next larger standard orifice",
          "The next smaller standard orifice",
          "Any orifice will work"
        ],
        correctIndex: 1,
        hint: "Safety first – always round UP",
        explanation: "Always select the next larger standard orifice. Undersizing would mean the valve cannot handle the required relief rate. G orifice (0.503 in²) would be selected."
      },
      {
        id: "d6q5",
        question: "A J orifice has 1.287 in² area. Which of these orifices is smaller?",
        options: ["K orifice", "L orifice", "H orifice", "M orifice"],
        correctIndex: 2,
        hint: "H comes before J in the alphabet",
        explanation: "H orifice (0.785 in²) is smaller than J (1.287 in²). Orifice area increases as letters progress through the alphabet."
      }
    ]
  },
  // TANK & FLAME DRILLS
  {
    id: "drill-tank-101",
    lessonId: "tank-101",
    title: "Tank Breathing Basics",
    description: "Practice tank venting fundamentals",
    questions: [
      {
        id: "dt1q1",
        question: "What causes tank 'inbreathing'?",
        options: [
          "Product being pumped into the tank",
          "Product withdrawal or cooling causing vapor space reduction",
          "Normal daytime heating",
          "Tank overflow"
        ],
        correctIndex: 1,
        hint: "Think about when air needs to come IN",
        explanation: "Inbreathing occurs when vapor space decreases – either from product withdrawal (liquid out) or cooling (vapor contracts). Air must enter to prevent vacuum."
      },
      {
        id: "dt1q2",
        question: "What causes tank 'outbreathing'?",
        options: [
          "Product withdrawal",
          "Tank cooling at night",
          "Product filling or heating",
          "None of these"
        ],
        correctIndex: 2,
        hint: "Think about when vapor needs to go OUT",
        explanation: "Outbreathing occurs when vapor space increases – from product filling (vapor displaced) or heating (vapor expands). Vapor must exit to prevent overpressure."
      },
      {
        id: "dt1q3",
        question: "API 2000 requires venting for which conditions?",
        options: [
          "Thermal breathing only",
          "Liquid movement only",
          "Both thermal and liquid movement",
          "Emergency fire case only"
        ],
        correctIndex: 2,
        hint: "Normal venting covers both types",
        explanation: "API 2000 requires sizing for both thermal breathing (temperature changes) and liquid movement (filling/emptying). Use the larger requirement."
      },
      {
        id: "dt1q4",
        question: "A PVRV (Pressure/Vacuum Relief Valve) provides:",
        options: [
          "Pressure relief only",
          "Vacuum relief only",
          "Both pressure and vacuum relief",
          "Emergency venting only"
        ],
        correctIndex: 2,
        explanation: "A PVRV protects tanks from both overpressure (outbreathing) and vacuum (inbreathing) in a single device."
      },
      {
        id: "dt1q5",
        question: "Tank pressure settings are typically expressed in:",
        options: [
          "psig",
          "Inches of water column (in WC)",
          "psia",
          "Bar"
        ],
        correctIndex: 1,
        hint: "Atmospheric tanks operate at very low pressure",
        explanation: "Atmospheric storage tanks operate at very low pressures (fractions of psi), so inches of water column is a more practical unit. 1 psig ≈ 27.7 in WC."
      },
      {
        id: "dt1q6",
        question: "If a tank has 8 oz/sq in maximum pressure, approximately what is this in inches WC?",
        options: [
          "About 8 in WC",
          "About 14 in WC",
          "About 28 in WC",
          "About 55 in WC"
        ],
        correctIndex: 1,
        hint: "1 oz/sq in ≈ 1.73 in WC",
        explanation: "8 oz/sq in × 1.73 ≈ 13.8 in WC, approximately 14 in WC. This is typical for welded steel storage tanks."
      }
    ]
  },
  {
    id: "drill-tank-102",
    lessonId: "tank-102",
    title: "Emergency Venting for Fire",
    description: "Practice fire case venting concepts",
    questions: [
      {
        id: "dt2q1",
        question: "Emergency venting is required in addition to normal venting to handle:",
        options: [
          "Maximum fill rate",
          "Fire exposure heat input",
          "Normal thermal breathing",
          "Product withdrawal"
        ],
        correctIndex: 1,
        hint: "Emergency = abnormal condition",
        explanation: "Emergency venting provides additional capacity for fire case – when external fire heats the tank and rapidly vaporizes the contents."
      },
      {
        id: "dt2q2",
        question: "API 2000 calculates emergency venting requirement based on:",
        options: [
          "Tank volume",
          "Tank wetted surface area",
          "Tank diameter only",
          "Product vapor pressure"
        ],
        correctIndex: 1,
        hint: "Fire heats through the tank surface",
        explanation: "Emergency venting is calculated from wetted surface area because fire heat transfer is proportional to the area being heated by flames."
      },
      {
        id: "dt2q3",
        question: "Which devices can provide emergency venting credit? (Select the best answer)",
        options: [
          "Only dedicated emergency vents",
          "Normal PVRVs, emergency vents, gauge hatches, or frangible roof joints",
          "Only frangible roof joints",
          "Only gauge hatches"
        ],
        correctIndex: 1,
        explanation: "Multiple devices can contribute to emergency venting: normal PVRVs (at higher pressure), dedicated emergency vents, gauge hatches, and frangible roof-to-shell joints."
      },
      {
        id: "dt2q4",
        question: "A frangible roof-to-shell joint on a tank provides:",
        options: [
          "Normal breathing capacity",
          "Last-resort emergency relief by roof separation",
          "Better tank insulation",
          "Fire suppression"
        ],
        correctIndex: 1,
        hint: "'Frangible' means it can break or separate",
        explanation: "A frangible joint is designed to fail (allow roof separation) at a pressure below shell failure, providing ultimate emergency relief during a fire."
      },
      {
        id: "dt2q5",
        question: "Environmental factors in API 2000 fire case calculations account for:",
        options: [
          "Weather conditions",
          "Tank insulation or protection systems",
          "Local fire department response",
          "Tank contents"
        ],
        correctIndex: 1,
        hint: "Insulation reduces heat input from fire",
        explanation: "Environmental factors reduce the calculated heat input when tanks have insulation, water spray systems, or other fire protection that reduces heat transfer."
      }
    ]
  },
  {
    id: "drill-tank-103",
    lessonId: "tank-103",
    title: "Flame Arrester Selection",
    description: "Practice flame arrester fundamentals",
    questions: [
      {
        id: "dt3q1",
        question: "What is a flame arrester's primary function?",
        options: [
          "Extinguish fires inside tanks",
          "Prevent flame propagation through piping",
          "Reduce vapor emissions",
          "Cool hot gases"
        ],
        correctIndex: 1,
        hint: "It 'arrests' (stops) flame propagation",
        explanation: "Flame arresters contain elements that absorb heat from a flame front, cooling it below ignition temperature and preventing propagation."
      },
      {
        id: "dt3q2",
        question: "MESG (Maximum Experimental Safe Gap) determines:",
        options: [
          "Flame arrester size",
          "Required passage size in arrester element",
          "Vapor flow rate",
          "Operating temperature"
        ],
        correctIndex: 1,
        hint: "Safe 'gap' relates to how flames can propagate",
        explanation: "MESG is the maximum gap that will prevent flame propagation for a specific gas. Arrester elements must have passages smaller than the MESG."
      },
      {
        id: "dt3q3",
        question: "Gas Group IIC (hydrogen, acetylene) requires:",
        options: [
          "The largest arrester passages",
          "The smallest arrester passages",
          "No flame arrester needed",
          "Same passages as any other group"
        ],
        correctIndex: 1,
        hint: "IIC gases have the smallest MESG",
        explanation: "Group IIC gases have MESG < 0.5 mm, requiring the finest arrester elements. They're the most difficult to arrest."
      },
      {
        id: "dt3q4",
        question: "What determines whether you need deflagration or detonation flame arrester?",
        options: [
          "Tank size",
          "Product flash point",
          "Pipe length and potential for flame acceleration",
          "Operating pressure"
        ],
        correctIndex: 2,
        hint: "Detonations need longer pipes to develop",
        explanation: "Deflagration arresters are for end-of-line applications. When piping exceeds run-up distances that could allow detonation, detonation arresters are required."
      },
      {
        id: "dt3q5",
        question: "An 'end-of-line' flame arrester is installed:",
        options: [
          "In the middle of a vent pipe",
          "At the vent outlet to atmosphere",
          "Inside the tank",
          "At the tank inlet"
        ],
        correctIndex: 1,
        hint: "End-of-line = atmospheric terminus",
        explanation: "End-of-line (deflagration) arresters mount at the termination of vent piping to atmosphere. They protect against external ignition sources."
      },
      {
        id: "dt3q6",
        question: "Why must flame arrester elements be inspected regularly?",
        options: [
          "They wear out from flow",
          "They can clog with corrosion products or debris",
          "The metal fatigues",
          "Government requirement only"
        ],
        correctIndex: 1,
        explanation: "Arrester elements have fine passages that can become blocked by corrosion, scale, or debris. Blocked elements restrict breathing and don't protect properly."
      }
    ]
  },
  {
    id: "drill-tank-104",
    lessonId: "tank-104",
    title: "Vapor Control Systems",
    description: "Practice vapor control and recovery concepts",
    questions: [
      {
        id: "dt4q1",
        question: "Why might vapors be routed to a VRU instead of atmosphere?",
        options: [
          "Lower equipment cost",
          "Recover valuable product and reduce emissions",
          "Simpler design",
          "Higher flow capacity"
        ],
        correctIndex: 1,
        hint: "VRU = Vapor Recovery Unit",
        explanation: "VRUs capture displaced vapors, recover the valuable hydrocarbons, and reduce emissions to atmosphere – both environmental and economic benefits."
      },
      {
        id: "dt4q2",
        question: "If a VRU is offline, what happens to tank vapors?",
        options: [
          "They stay in the tank",
          "Operations must stop completely",
          "They must go through backup venting (PVRV)",
          "They go directly to flare"
        ],
        correctIndex: 2,
        hint: "Think about backup protection",
        explanation: "When VRUs are offline, PVRVs must handle the displaced vapors. PVRVs must be sized for the case when VRU is unavailable."
      },
      {
        id: "dt4q3",
        question: "A vapor control path to flare is used when:",
        options: [
          "VRU is adequate",
          "Vapors can safely vent to atmosphere",
          "Vapors are hazardous and cannot be released to atmosphere",
          "Only during fire case"
        ],
        correctIndex: 2,
        hint: "Flare combusts hazardous vapors",
        explanation: "Flare systems are used when vapors are too hazardous for atmospheric release – typically containing H2S, high toxicity, or high VOC content."
      },
      {
        id: "dt4q4",
        question: "What determines whether vapors can vent to atmosphere vs. requiring VRU/flare?",
        options: [
          "Tank size",
          "Vapor toxicity, flammability, and emission regulations",
          "Weather conditions",
          "Operator preference"
        ],
        correctIndex: 1,
        hint: "Safety and environmental factors",
        explanation: "The decision depends on vapor properties (toxicity, flammability), local emission regulations, and permit requirements."
      },
      {
        id: "dt4q5",
        question: "When using a VRU, why must PVRVs still be sized for maximum fill rate?",
        options: [
          "They don't need to be",
          "VRUs may trip or be unavailable",
          "PVRVs are always the primary vent",
          "Regulations require it"
        ],
        correctIndex: 1,
        hint: "What if the VRU isn't working?",
        explanation: "PVRVs serve as backup when the VRU trips or is down for maintenance. They must handle full vapor load to prevent tank overpressure."
      }
    ]
  },
  {
    id: "drill-tank-105",
    lessonId: "tank-105",
    title: "Overfill Prevention Systems",
    description: "Practice API 2350 overfill protection concepts",
    questions: [
      {
        id: "dt5q1",
        question: "API 2350 addresses protection against:",
        options: [
          "Fire damage",
          "Tank overfill during filling operations",
          "Corrosion",
          "Lightning strikes"
        ],
        correctIndex: 1,
        hint: "The standard is about overfill prevention",
        explanation: "API 2350 'Overfill Protection for Storage Tanks' provides guidance for preventing overfill incidents during product receipt."
      },
      {
        id: "dt5q2",
        question: "API 2350 categorizes tanks into categories (1, 2, 3) based on:",
        options: [
          "Tank size only",
          "Consequence of overflow",
          "Product type only",
          "Tank age"
        ],
        correctIndex: 1,
        hint: "Higher category = higher consequence",
        explanation: "Categories are based on potential consequences of an overfill event – considering environmental sensitivity, population density, and product hazards."
      },
      {
        id: "dt5q3",
        question: "A Category 3 tank requires:",
        options: [
          "Only a high alarm",
          "High alarm and automatic high-high shutdown",
          "Manual monitoring only",
          "No specific requirements"
        ],
        correctIndex: 1,
        hint: "Highest category = most protection",
        explanation: "Category 3 requires independent H alarm AND automatic HH shutdown. The HH device must be independent from normal level measurement."
      },
      {
        id: "dt5q4",
        question: "Why must the high-high shutdown level switch be 'independent'?",
        options: [
          "It's more accurate",
          "So it still works if the process level transmitter fails",
          "It costs less",
          "Easier maintenance"
        ],
        correctIndex: 1,
        hint: "Independence prevents common-mode failure",
        explanation: "Independence ensures the safety function (shutdown) remains available even if the normal level measurement fails. This is a fundamental safety system principle."
      },
      {
        id: "dt5q5",
        question: "What is the typical sequence during a filling operation approaching overfill?",
        options: [
          "Shutdown → Alarm → Normal operation",
          "Normal operation → High alarm → High-high shutdown",
          "High-high first, then high alarm",
          "No sequence, random"
        ],
        correctIndex: 1,
        hint: "Levels increase: first alarm, then shutdown",
        explanation: "As level rises: (1) high alarm alerts operator to take action, (2) if no action, high-high automatically shuts down filling before overflow."
      },
      {
        id: "dt5q6",
        question: "The setpoints for high alarm and high-high shutdown should be:",
        options: [
          "The same value",
          "High alarm below high-high, with adequate separation",
          "High-high below high alarm",
          "As close as possible"
        ],
        correctIndex: 1,
        hint: "Operator needs time to respond to alarm before shutdown",
        explanation: "High alarm is set below high-high to give operators time to respond before automatic shutdown. Adequate separation prevents nuisance trips while maintaining protection."
      }
    ]
  },
  {
    id: "drill-tank-106",
    lessonId: "tank-106",
    title: "Tank Inspection and Maintenance",
    description: "Practice tank equipment maintenance concepts",
    questions: [
      {
        id: "dt6q1",
        question: "PVRV pallets should be inspected for:",
        options: [
          "Color fading",
          "Corrosion, damage, and proper seating",
          "Brand name markings",
          "Installation date only"
        ],
        correctIndex: 1,
        hint: "What affects their ability to seal and open properly?",
        explanation: "Pallets must seat properly to prevent leakage and lift freely to provide relief. Corrosion and damage can cause sticking or leaking."
      },
      {
        id: "dt6q2",
        question: "Flame arrester elements should be inspected for:",
        options: [
          "Blockage, corrosion, and damage",
          "Paint condition",
          "Manufacturer labels",
          "Installation orientation only"
        ],
        correctIndex: 0,
        explanation: "Element passages can become blocked with corrosion, scale, ice, or debris. Damaged elements won't arrest flames properly."
      },
      {
        id: "dt6q3",
        question: "What could happen if a PVRV pressure pallet sticks closed?",
        options: [
          "Normal operation continues",
          "Tank could overpressure during outbreathing",
          "Tank could collapse from vacuum",
          "No effect"
        ],
        correctIndex: 1,
        hint: "Pressure pallet = outbreathing relief",
        explanation: "If the pressure pallet sticks closed, displaced vapors during filling or thermal expansion cannot escape, potentially overpressuring the tank."
      },
      {
        id: "dt6q4",
        question: "What could happen if a PVRV vacuum pallet sticks closed?",
        options: [
          "Tank could overpressure",
          "Tank could collapse from vacuum",
          "No effect during withdrawal",
          "Only a minor issue"
        ],
        correctIndex: 1,
        hint: "Vacuum pallet = inbreathing relief",
        explanation: "If the vacuum pallet sticks closed, air cannot enter during withdrawal or cooling, potentially causing the tank to collapse from vacuum."
      },
      {
        id: "dt6q5",
        question: "Routine testing of overfill prevention systems should verify:",
        options: [
          "Paint condition",
          "Level switches activate at correct setpoints and trigger shutdown",
          "Tank color",
          "Nameplate legibility"
        ],
        correctIndex: 1,
        hint: "Test that the safety function actually works",
        explanation: "Testing must verify the complete safety function: level switch trips at the correct point, signal reaches the logic solver, and shutdown actually occurs."
      }
    ]
  },
];

// Helper functions
export function getDrillById(id: string): Drill | undefined {
  return drills.find((d) => d.id === id);
}

export function getDrillByLessonId(lessonId: string): Drill | undefined {
  return drills.find((d) => d.lessonId === lessonId);
}

export function calculateDrillScore(drill: Drill, answers: number[]): { score: number; passed: boolean; total: number } {
  let correct = 0;
  drill.questions.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      correct++;
    }
  });
  const total = drill.questions.length;
  const score = Math.round((correct / total) * 100);
  // Drills have lower passing threshold (70%) than quizzes (80%)
  return { score, passed: score >= 70, total };
}
