/**
 * Training Academy Glossary
 * 60+ terms covering PSV, Tank, and Flame Arrester topics
 */

import type { GlossaryTerm, GlossaryCategory } from "./types";

export const glossaryTerms: GlossaryTerm[] = [
  // ============================================================================
  // PRESSURE CATEGORY
  // ============================================================================
  {
    term: "MAWP",
    category: "Pressure",
    definition: "Maximum Allowable Working Pressure. The maximum pressure at which equipment is designed to operate per ASME code.",
    whyItMatters: "PSV set pressure must not exceed MAWP. Understanding MAWP is fundamental to relief device specification.",
    commonMistake: "Confusing MAWP with design pressure or operating pressure. MAWP is the equipment's rated limit, not its normal operating point.",
    example: "A vessel with 150 psig MAWP can operate safely up to 150 psig. The PSV set pressure is typically set at MAWP (150 psig).",
    related: ["Set Pressure", "Design Pressure", "Operating Pressure"],
  },
  {
    term: "Set Pressure",
    category: "Pressure",
    definition: "The inlet pressure at which a PSV begins to open under service conditions. Stamped on the valve nameplate.",
    whyItMatters: "Set pressure determines when relief begins. It must be at or below MAWP for single relief devices.",
    commonMistake: "Setting pressure too close to operating pressure causes premature opening and seat leakage.",
    example: "For a vessel with 100 psig MAWP and 80 psig operating pressure, set pressure might be 100 psig.",
    related: ["MAWP", "Overpressure", "Accumulation"],
  },
  {
    term: "Accumulation",
    category: "Pressure",
    definition: "The pressure increase above MAWP during a relief event, expressed as a percentage of MAWP.",
    whyItMatters: "Equipment is designed to withstand limited accumulation. Typical limits are 10% for single devices, 16-21% for multiple devices or fire case.",
    commonMistake: "Confusing accumulation (above MAWP) with overpressure (above set pressure).",
    example: "For 100 psig MAWP with 10% accumulation, maximum pressure during relief is 110 psig.",
    related: ["Overpressure", "MAWP", "Set Pressure"],
  },
  {
    term: "Overpressure",
    category: "Pressure",
    definition: "The pressure increase above set pressure when the PSV is actively relieving. Expressed as a percentage of set pressure.",
    whyItMatters: "PSV capacity is rated at a specific overpressure (typically 10%). Higher overpressure = more flow capacity.",
    commonMistake: "Using overpressure and accumulation interchangeably. They have different reference points.",
    example: "At 10% overpressure on a 100 psig set pressure valve, the relieving pressure is 110 psig.",
    related: ["Accumulation", "Set Pressure", "Blowdown"],
  },
  {
    term: "psig",
    category: "Pressure",
    definition: "Pounds per square inch gauge. Pressure measured relative to atmospheric pressure.",
    whyItMatters: "Most process pressures are stated in psig. Converting between psig and psia is essential for calculations.",
    commonMistake: "Using psig values in equations that require psia (absolute pressure).",
    example: "At sea level: 0 psig = 14.7 psia. A 100 psig gauge reading = 114.7 psia.",
    related: ["psia", "Atmospheric Pressure"],
  },
  {
    term: "psia",
    category: "Pressure",
    definition: "Pounds per square inch absolute. Total pressure including atmospheric pressure.",
    whyItMatters: "Thermodynamic calculations and relief sizing equations require absolute pressure.",
    commonMistake: "Forgetting to add 14.7 when converting psig to psia, leading to significant sizing errors.",
    example: "Relieving pressure of 100 psig = 114.7 psia for calculation purposes.",
    related: ["psig", "Atmospheric Pressure"],
  },
  {
    term: "Design Pressure",
    category: "Pressure",
    definition: "The pressure used in the mechanical design of equipment. May be equal to or higher than MAWP.",
    whyItMatters: "Understanding the relationship between design pressure and MAWP helps in relief device specification.",
    commonMistake: "Assuming design pressure equals MAWP. They can differ based on design method and corrosion allowance.",
    related: ["MAWP", "Operating Pressure"],
  },
  {
    term: "Operating Pressure",
    category: "Pressure",
    definition: "The normal working pressure of equipment during standard operations.",
    whyItMatters: "Operating pressure should be sufficiently below set pressure to prevent valve simmer and premature opening.",
    commonMistake: "Operating too close to set pressure (within 10%) causes seat wear and leakage.",
    example: "For 100 psig set pressure, normal operating pressure should be below 90 psig.",
    related: ["Set Pressure", "MAWP"],
  },
  {
    term: "Relieving Pressure",
    category: "Pressure",
    definition: "The inlet pressure at which rated flow capacity is achieved. Equal to set pressure plus overpressure.",
    whyItMatters: "PSV sizing calculations use relieving pressure, not set pressure, for capacity determination.",
    commonMistake: "Using set pressure instead of relieving pressure in sizing equations.",
    example: "100 psig set + 10% overpressure = 110 psig relieving pressure.",
    related: ["Set Pressure", "Overpressure"],
  },
  {
    term: "Blowdown",
    category: "Pressure",
    definition: "The difference between set pressure and reseating pressure, expressed as a percentage of set pressure.",
    whyItMatters: "Blowdown affects how much pressure must drop before the valve closes. Important for process control and repeated relief events.",
    commonMistake: "Assuming the valve reseats at set pressure. It actually reseats lower due to blowdown.",
    example: "With 10% blowdown on a 100 psig valve, the valve reseats around 90 psig.",
    related: ["Set Pressure", "Reseating Pressure"],
  },

  // ============================================================================
  // THERMO CATEGORY
  // ============================================================================
  {
    term: "Relieving Temperature",
    category: "Thermo",
    definition: "The fluid temperature at the PSV inlet during a relief event. Used for capacity calculations.",
    whyItMatters: "Temperature affects fluid density and flow capacity. Use the actual relieving temperature, not normal operating temperature.",
    commonMistake: "Using normal operating temperature instead of the elevated temperature during the relief scenario.",
    example: "For fire case on a liquid vessel, relieving temperature may be the bubble point at relieving pressure.",
    related: ["Saturation Temperature", "Superheat"],
  },
  {
    term: "Saturation Temperature",
    category: "Thermo",
    definition: "The temperature at which a liquid boils at a given pressure. Also the temperature at which vapor condenses.",
    whyItMatters: "For saturated steam and boiling liquids, the saturation temperature at relieving pressure determines the relief temperature.",
    commonMistake: "Using normal boiling point instead of saturation temperature at relieving pressure.",
    example: "Water saturates at 366°F at 150 psig (164.7 psia).",
    related: ["Relieving Temperature", "Superheat"],
  },
  {
    term: "Superheat",
    category: "Thermo",
    definition: "Temperature above the saturation temperature for a given pressure. Applies to vapor/steam.",
    whyItMatters: "Superheated steam has lower density than saturated steam and requires correction factors in sizing.",
    commonMistake: "Treating superheated steam the same as saturated steam in calculations.",
    example: "Steam at 150 psig and 450°F has 84°F of superheat (saturation = 366°F).",
    related: ["Saturation Temperature", "Steam"],
  },
  {
    term: "Latent Heat",
    category: "Thermo",
    definition: "The heat required to change phase (liquid to vapor) at constant temperature and pressure.",
    whyItMatters: "Fire case relief calculations require latent heat to determine vaporization rate from heat input.",
    commonMistake: "Forgetting that latent heat varies with pressure and temperature.",
    related: ["Fire Case", "Vaporization"],
  },
  {
    term: "Thermal Expansion",
    category: "Thermo",
    definition: "The increase in volume of a material (especially liquid) when heated.",
    whyItMatters: "Trapped liquids expand when heated, creating hydraulic pressure that requires thermal relief.",
    commonMistake: "Overlooking thermal relief needs when equipment can be blocked in and heated.",
    example: "A blocked-in heat exchanger shell exposed to sun or residual heat needs thermal relief.",
    related: ["Thermal Relief", "Hydraulic"],
  },

  // ============================================================================
  // GAS CATEGORY
  // ============================================================================
  {
    term: "Molecular Weight",
    category: "Gas",
    definition: "The mass of one mole of a substance, expressed in g/mol or lb/lb-mol. Symbol: MW.",
    whyItMatters: "MW directly affects gas density and relief capacity. Higher MW = higher mass flow for same orifice.",
    commonMistake: "Using the wrong MW for mixtures. Use the mixture MW, not a component MW.",
    example: "Air MW = 29, Methane MW = 16, Steam MW = 18.",
    related: ["Specific Gravity", "Compressibility Factor"],
  },
  {
    term: "k-value",
    category: "Gas",
    definition: "Ratio of specific heats (Cp/Cv). Also called the isentropic exponent or gamma (γ).",
    whyItMatters: "The k-value affects the critical flow function and discharge coefficient in gas sizing equations.",
    commonMistake: "Assuming k = 1.4 for all gases. Different gases have different k-values.",
    example: "Air k = 1.4, Steam k ≈ 1.33, Methane k = 1.31.",
    related: ["Critical Flow", "Compressibility Factor"],
  },
  {
    term: "Compressibility Factor",
    category: "Gas",
    definition: "Factor (Z) that accounts for deviation of real gas behavior from ideal gas law. Z = PV/nRT.",
    whyItMatters: "Real gases deviate from ideal behavior, especially at high pressure. Z < 1 for most gases at high pressure.",
    commonMistake: "Assuming Z = 1 for all conditions. This can cause significant errors at high pressure.",
    example: "Methane at 1000 psia and 100°F has Z ≈ 0.85.",
    related: ["Molecular Weight", "k-value"],
  },
  {
    term: "Critical Flow",
    category: "Gas",
    definition: "Choked flow condition where gas velocity at the orifice throat reaches sonic velocity. Flow rate is maximum.",
    whyItMatters: "Most gas PSV sizing assumes critical flow. Flow rate becomes independent of downstream pressure.",
    commonMistake: "Not recognizing when subcritical flow occurs (high backpressure relative to inlet).",
    example: "Critical flow occurs when downstream pressure < ~53% of upstream pressure (for k=1.4).",
    related: ["k-value", "Backpressure"],
  },
  {
    term: "Mass Flow Rate",
    category: "Gas",
    definition: "The rate of mass passing through a system, typically in lb/hr or kg/hr.",
    whyItMatters: "Gas PSV sizing is based on required mass flow rate, which must be determined from relief scenario analysis.",
    commonMistake: "Confusing mass flow (lb/hr) with volumetric flow (SCFH). They are not interchangeable.",
    example: "A gas relief scenario might require 10,000 lb/hr mass flow through the PSV.",
    related: ["Volumetric Flow", "Molecular Weight"],
  },

  // ============================================================================
  // LIQUID CATEGORY
  // ============================================================================
  {
    term: "Specific Gravity",
    category: "Liquid",
    definition: "Ratio of liquid density to water density at reference conditions. Dimensionless. Symbol: SG.",
    whyItMatters: "SG directly affects liquid relief capacity. Higher SG = higher mass flow for same volumetric flow.",
    commonMistake: "Using SG at the wrong temperature. SG changes with temperature.",
    example: "Gasoline SG ≈ 0.74, Water SG = 1.0, Heavy fuel oil SG ≈ 0.95.",
    related: ["Viscosity", "Volumetric Flow"],
  },
  {
    term: "Viscosity",
    category: "Liquid",
    definition: "A measure of a fluid's resistance to flow. Units: centipoise (cP) or centistokes (cSt).",
    whyItMatters: "High-viscosity liquids require correction factors in PSV sizing due to reduced flow through the orifice.",
    commonMistake: "Ignoring viscosity for thick fluids. Correction factors can be significant for viscosity > 100 cP.",
    example: "Water viscosity ≈ 1 cP, Light oil ≈ 10 cP, Heavy oil can exceed 1000 cP.",
    related: ["Specific Gravity", "Reynolds Number"],
  },
  {
    term: "Vapor Pressure",
    category: "Liquid",
    definition: "The pressure exerted by vapor in equilibrium with its liquid at a given temperature.",
    whyItMatters: "For liquid relief, back pressure should not cause flashing. Vapor pressure determines bubble point.",
    commonMistake: "Ignoring vapor pressure effects in high-temperature liquid relief applications.",
    example: "Propane vapor pressure is ~190 psia at 100°F, requiring special considerations.",
    related: ["Flashing", "Saturation Temperature"],
  },
  {
    term: "GPM",
    category: "Liquid",
    definition: "Gallons per minute. Common unit for liquid volumetric flow rate in US systems.",
    whyItMatters: "Liquid PSV sizing uses volumetric flow rate, typically expressed in GPM.",
    commonMistake: "Confusing US gallons with imperial gallons. US gallon = 3.785 liters.",
    example: "A thermal relief valve might be sized for 3 GPM of blocked-in liquid expansion.",
    related: ["Volumetric Flow", "Specific Gravity"],
  },
  {
    term: "Hydraulic",
    category: "Liquid",
    definition: "Related to liquids under pressure. Hydraulic overpressure occurs when incompressible liquid is heated in a confined space.",
    whyItMatters: "Liquids are incompressible—even small thermal expansion creates extreme pressure in confined spaces.",
    commonMistake: "Underestimating the speed and severity of hydraulic overpressure events.",
    example: "A 100-gallon exchanger shell blocked in can exceed MAWP within minutes if heated.",
    related: ["Thermal Expansion", "Thermal Relief"],
  },

  // ============================================================================
  // VALVE CATEGORY
  // ============================================================================
  {
    term: "Conventional Valve",
    category: "Valve",
    definition: "A spring-loaded PSV where backpressure acts on the back of the disc, reducing lift force.",
    whyItMatters: "Conventional valves are simple and reliable but limited when backpressure exceeds 10% of set pressure.",
    commonMistake: "Using conventional valves in high-backpressure service, leading to reduced capacity or failure to open.",
    example: "Use conventional valves for atmospheric discharge or when total backpressure < 10% of set.",
    related: ["Bellows Valve", "Pilot-Operated Valve", "Backpressure"],
  },
  {
    term: "Bellows Valve",
    category: "Valve",
    definition: "A balanced PSV with a bellows that isolates the spring from backpressure, maintaining constant set pressure.",
    whyItMatters: "Bellows valves handle variable backpressure without set point shift. Essential for flare header discharge.",
    commonMistake: "Not checking bellows integrity. A torn bellows loses backpressure compensation.",
    example: "Use bellows valves when discharging to flare with variable backpressure >10% of set.",
    related: ["Conventional Valve", "Backpressure"],
  },
  {
    term: "Pilot-Operated Valve",
    category: "Valve",
    definition: "A PSV where a pilot senses pressure and controls the main valve. Can handle high backpressure ratios.",
    whyItMatters: "Pilot valves offer tight shutoff, pop action, and backpressure immunity. Good for high-pressure applications.",
    commonMistake: "Using pilot valves in dirty or polymerizing services where the pilot can plug.",
    example: "Use pilot valves when operating pressure is very close to set pressure (needs tight shutoff).",
    related: ["Conventional Valve", "Bellows Valve"],
  },
  {
    term: "Orifice",
    category: "Valve",
    definition: "The flow-restricting element in a PSV. Standard orifice letters (D through T) per API 526.",
    whyItMatters: "The orifice determines the maximum relief capacity. Always select the next larger standard size.",
    commonMistake: "Selecting an orifice that's too small for the required flow, or excessive oversizing causing chatter.",
    example: "Orifice G = 0.503 in², Orifice J = 1.287 in², Orifice M = 3.600 in².",
    related: ["API 526", "Effective Area"],
  },
  {
    term: "Effective Area",
    category: "Valve",
    definition: "The actual flow area of a PSV orifice, accounting for discharge coefficient. Used in sizing calculations.",
    whyItMatters: "Effective area is less than geometric area due to flow contraction and other losses.",
    commonMistake: "Using geometric orifice area instead of effective area in sizing equations.",
    related: ["Orifice", "Discharge Coefficient"],
  },
  {
    term: "Discharge Coefficient",
    category: "Valve",
    definition: "A factor (Kd) that relates actual flow to theoretical flow through an orifice. Typically 0.85-0.975.",
    whyItMatters: "Kd accounts for flow losses. API 520 specifies Kd values based on service type and valve certification.",
    commonMistake: "Using the wrong Kd for the service type (gas vs liquid vs steam).",
    example: "ASME-certified valves typically use Kd = 0.975 for gas, 0.65 for liquid.",
    related: ["Effective Area", "Orifice"],
  },
  {
    term: "Chatter",
    category: "Valve",
    definition: "Rapid opening and closing of a PSV, causing mechanical damage and reduced capacity.",
    whyItMatters: "Chatter can destroy a valve in minutes and prevent proper relief. Proper sizing and installation prevent chatter.",
    commonMistake: "Excessive oversizing (valve too big for flow) is a common cause of chatter.",
    example: "A grossly oversized valve may open, relieve excess capacity, drop pressure, close, repeat rapidly.",
    related: ["Simmer", "Orifice"],
  },
  {
    term: "Simmer",
    category: "Valve",
    definition: "Leakage through a PSV seat when pressure approaches set pressure but valve hasn't fully opened.",
    whyItMatters: "Simmer causes product loss and seat damage. Maintain adequate margin between operating and set pressure.",
    commonMistake: "Operating within 10% of set pressure for extended periods causes simmer and seat wear.",
    related: ["Set Pressure", "Chatter"],
  },
  {
    term: "Rupture Disk",
    category: "Valve",
    definition: "A non-reclosing pressure relief device that bursts at a predetermined pressure differential.",
    whyItMatters: "Rupture disks provide instant full-open relief, are leak-tight, and can protect PSVs from corrosion.",
    commonMistake: "Installing rupture disk backwards or not accounting for burst tolerance in set pressure selection.",
    example: "Rupture disks are often installed upstream of PSVs to protect against corrosive fluids.",
    related: ["PSV", "Burst Pressure"],
  },

  // ============================================================================
  // BACKPRESSURE (continuing VALVE/PRESSURE)
  // ============================================================================
  {
    term: "Backpressure",
    category: "Valve",
    definition: "The pressure existing at the PSV outlet. Sum of superimposed and built-up backpressure.",
    whyItMatters: "Backpressure affects valve capacity and set point (for conventional valves). Must be evaluated for all PSVs.",
    commonMistake: "Ignoring backpressure when discharging to flare or closed system.",
    example: "Total BP = 15 psig superimposed + 20 psig built-up = 35 psig total.",
    related: ["Superimposed Backpressure", "Built-up Backpressure"],
  },
  {
    term: "Superimposed Backpressure",
    category: "Valve",
    definition: "Backpressure existing at the PSV outlet BEFORE the valve opens. From downstream system pressure.",
    whyItMatters: "Superimposed BP affects conventional valve set point. It's typically constant or varies with downstream system conditions.",
    commonMistake: "Assuming zero superimposed BP when discharging to a pressurized header.",
    example: "A flare header at 25 psig creates 25 psig superimposed backpressure.",
    related: ["Backpressure", "Built-up Backpressure"],
  },
  {
    term: "Built-up Backpressure",
    category: "Valve",
    definition: "Backpressure that develops AFTER the valve opens due to flow through discharge piping.",
    whyItMatters: "Built-up BP depends on relief rate and discharge system design. Affects valve capacity.",
    commonMistake: "Underestimating built-up BP in long or undersized discharge piping.",
    example: "A properly designed discharge system typically has 3-10% built-up BP.",
    related: ["Backpressure", "Superimposed Backpressure"],
  },

  // ============================================================================
  // TANK CATEGORY
  // ============================================================================
  {
    term: "PVRV",
    category: "Tank",
    definition: "Pressure/Vacuum Relief Valve. Protects tanks against both overpressure and vacuum conditions.",
    whyItMatters: "PVRVs are the primary protection for atmospheric storage tanks. They handle both in-breathing and out-breathing.",
    commonMistake: "Sizing only for pressure relief and ignoring vacuum relief requirements.",
    example: "A typical PVRV might be set at +2 oz/in² pressure and -0.5 oz/in² vacuum.",
    related: ["In-breathing", "Out-breathing", "API 2000"],
  },
  {
    term: "In-breathing",
    category: "Tank",
    definition: "Airflow INTO a tank due to liquid withdrawal, vapor condensation, or temperature decrease.",
    whyItMatters: "Inadequate in-breathing capacity causes vacuum that can collapse a tank.",
    commonMistake: "Sizing in-breathing only for pump-out rate and ignoring thermal contraction.",
    example: "Pumping out at 500 GPM requires equivalent in-breathing capacity plus thermal factors.",
    related: ["Out-breathing", "PVRV", "API 2000"],
  },
  {
    term: "Out-breathing",
    category: "Tank",
    definition: "Vapor/air flow OUT of a tank due to filling, heating, or temperature increase.",
    whyItMatters: "Inadequate out-breathing capacity causes overpressure that can rupture the tank roof or shell.",
    commonMistake: "Ignoring flash vapors when filling with product above its bubble point.",
    example: "Filling at 500 GPM plus thermal expansion requires out-breathing capacity for displaced volume.",
    related: ["In-breathing", "PVRV", "API 2000"],
  },
  {
    term: "API 2000",
    category: "Tank",
    definition: "American Petroleum Institute standard for venting atmospheric and low-pressure storage tanks.",
    whyItMatters: "API 2000 provides the methodology for calculating normal and emergency venting requirements.",
    commonMistake: "Not distinguishing between normal venting (Table 1/2) and emergency venting (fire exposure).",
    example: "API 2000 Table 1 provides thermal breathing requirements based on tank size.",
    related: ["PVRV", "Emergency Vent"],
  },
  {
    term: "Emergency Vent",
    category: "Tank",
    definition: "A venting device that opens fully during fire exposure to prevent tank rupture.",
    whyItMatters: "Fire generates massive vapor volumes that exceed normal PVRV capacity. Emergency vents provide backup.",
    commonMistake: "Relying solely on normal PVRVs for fire case without emergency venting provisions.",
    example: "Gauge hatches that lift during fire, or dedicated emergency vent valves sized per API 2000.",
    related: ["API 2000", "Fire Case", "PVRV"],
  },
  {
    term: "Frangible Roof",
    category: "Tank",
    definition: "A tank roof designed to fail at the roof-to-shell seam before the shell fails.",
    whyItMatters: "Frangible design provides emergency pressure relief by sacrificing the roof to protect the shell.",
    commonMistake: "Assuming a frangible roof eliminates the need for emergency venting calculations.",
    related: ["Emergency Vent", "API 650"],
  },
  {
    term: "Thermal Breathing",
    category: "Tank",
    definition: "Tank venting caused by temperature changes expanding or contracting tank contents.",
    whyItMatters: "Daily temperature swings cause regular breathing cycles. Must be accommodated by PVRV sizing.",
    commonMistake: "Underestimating thermal breathing in hot climates with large diurnal temperature swings.",
    example: "A tank may out-breathe during hot afternoons and in-breathe during cool nights.",
    related: ["In-breathing", "Out-breathing", "API 2000"],
  },
  {
    term: "Inches Water Column",
    category: "Tank",
    definition: "A unit of low pressure measurement. 1 inch WC = 0.036 psi.",
    whyItMatters: "Tank pressures and PVRV settings are typically expressed in inches WC or oz/sq in due to low pressure tolerance.",
    commonMistake: "Converting units incorrectly between psig and inches WC.",
    example: "2 oz/sq in ≈ 3.5 inches WC ≈ 0.125 psig.",
    related: ["PVRV", "Tank Pressure"],
  },

  // ============================================================================
  // FLAME CATEGORY
  // ============================================================================
  {
    term: "Flame Arrester",
    category: "Flame",
    definition: "A device that stops flame propagation by quenching the flame through a matrix of small passages.",
    whyItMatters: "Flame arresters prevent external ignition sources from reaching tank vapor spaces.",
    commonMistake: "Installing flame arresters on non-flammable services where they cause unnecessary pressure drop.",
    example: "End-of-line flame arresters are installed at tank vents to protect against atmospheric ignition.",
    related: ["Deflagration", "Detonation"],
  },
  {
    term: "Deflagration",
    category: "Flame",
    definition: "A subsonic flame propagation where the flame front moves slower than the speed of sound.",
    whyItMatters: "Deflagration arresters are designed for slower flame speeds. Used at end-of-line locations.",
    commonMistake: "Using deflagration arresters in-line where detonation could occur in long pipe runs.",
    example: "A flame at a tank vent typically propagates as deflagration, not detonation.",
    related: ["Detonation", "Flame Arrester"],
  },
  {
    term: "Detonation",
    category: "Flame",
    definition: "A supersonic flame propagation with pressure wave traveling faster than the speed of sound.",
    whyItMatters: "Detonation creates extreme pressure spikes. In-line arresters must be rated for detonation if run-up distance allows it.",
    commonMistake: "Underestimating pipe run-up distance that allows deflagration to transition to detonation.",
    example: "Long straight pipe runs can accelerate a deflagration into a detonation.",
    related: ["Deflagration", "Flame Arrester"],
  },
  {
    term: "Quenching Diameter",
    category: "Flame",
    definition: "The maximum passage size through which a flame cannot propagate due to heat loss to walls.",
    whyItMatters: "Flame arrester elements have passages smaller than the quenching diameter for the service.",
    commonMistake: "Using an arrester rated for a different vapor group with larger quenching diameter.",
    example: "Hydrogen has a very small quenching diameter (0.6mm) requiring special arresters.",
    related: ["Flame Arrester", "MESG"],
  },
  {
    term: "MESG",
    category: "Flame",
    definition: "Maximum Experimental Safe Gap. The largest gap that prevents flame passage for a specific gas/vapor.",
    whyItMatters: "MESG determines vapor group classification and required flame arrester rating.",
    commonMistake: "Selecting flame arresters based on the wrong vapor group classification.",
    example: "IIC gases (hydrogen, acetylene) have MESG < 0.5mm, requiring Group IIC arresters.",
    related: ["Quenching Diameter", "Flame Arrester"],
  },
  {
    term: "Crimped Ribbon",
    category: "Flame",
    definition: "A type of flame arrester element made from corrugated metal ribbon wound into a matrix.",
    whyItMatters: "Crimped ribbon elements provide the small passages needed for flame quenching.",
    commonMistake: "Not cleaning fouled elements, which blocks flow and reduces capacity.",
    related: ["Flame Arrester", "Quenching Diameter"],
  },

  // ============================================================================
  // OVERFILL CATEGORY
  // ============================================================================
  {
    term: "High Level Alarm",
    category: "Overfill",
    definition: "An alarm that alerts operators when tank level exceeds a defined setpoint.",
    whyItMatters: "High level alarms provide early warning to prevent overfill events.",
    commonMistake: "Setting alarm points too close to operating level, causing nuisance alarms that get ignored.",
    example: "High level alarm might be set at 85% of tank capacity.",
    related: ["High-High Level", "Overfill Protection"],
  },
  {
    term: "High-High Level",
    category: "Overfill",
    definition: "A safety-critical independent level switch that triggers automatic shutdown.",
    whyItMatters: "High-high switches are the last line of defense before overfill. Must be independent from process instruments.",
    commonMistake: "Using the same instrument for process control and safety high-high, losing independence.",
    example: "High-high at 95% of capacity triggers automatic inlet valve closure.",
    related: ["High Level Alarm", "Overfill Protection", "SIS"],
  },
  {
    term: "Overfill Protection",
    category: "Overfill",
    definition: "The combination of alarms, switches, and automatic actions that prevent tank overfilling.",
    whyItMatters: "Overfill events cause environmental releases, fires, and regulatory violations. Multiple layers required.",
    commonMistake: "Relying on a single layer of protection or non-safety-rated instruments.",
    example: "API 2350 defines overfill protection categories and required reliability levels.",
    related: ["High Level Alarm", "High-High Level", "API 2350"],
  },
  {
    term: "API 2350",
    category: "Overfill",
    definition: "American Petroleum Institute standard for overfill protection for storage tanks.",
    whyItMatters: "API 2350 defines overfill prevention categories and the required reliability of protection systems.",
    commonMistake: "Not classifying tanks correctly per API 2350, leading to inadequate protection.",
    example: "Category 3 tanks require independent high-high shutdown per API 2350.",
    related: ["Overfill Protection", "High-High Level"],
  },
  {
    term: "SPCC",
    category: "Overfill",
    definition: "Spill Prevention, Control, and Countermeasure. US EPA regulation for oil storage facilities.",
    whyItMatters: "SPCC requires documented overfill prevention procedures and equipment inspection.",
    commonMistake: "Not maintaining SPCC plan updates when tank configurations change.",
    related: ["Overfill Protection", "API 2350"],
  },
  {
    term: "Automatic Shutdown",
    category: "Overfill",
    definition: "Instrumented system that closes inlet valves automatically on high-high level.",
    whyItMatters: "Automatic shutdown stops flow when operators fail to respond to alarms.",
    commonMistake: "Bypassing or defeating automatic shutdown systems during operations.",
    example: "SIS closes inlet block valve when high-high level switch activates.",
    related: ["High-High Level", "SIS"],
  },
  {
    term: "SIS",
    category: "Overfill",
    definition: "Safety Instrumented System. An independent control system designed to bring a process to a safe state.",
    whyItMatters: "SIS provides high-reliability automatic protection independent from basic process control.",
    commonMistake: "Using BPCS instruments for SIS functions, compromising independence and reliability.",
    example: "Overfill SIS with dedicated level switch, logic solver, and shutdown valve.",
    related: ["High-High Level", "Automatic Shutdown"],
  },

  // ============================================================================
  // ADDITIONAL TERMS (to exceed 60 total)
  // ============================================================================
  {
    term: "Fire Case",
    category: "Pressure",
    definition: "A relief scenario where external fire heats equipment, vaporizing contents and causing pressure rise.",
    whyItMatters: "Fire case often governs PSV sizing for large vessels. API 521 provides heat input calculations.",
    commonMistake: "Using fire case relief rate for non-fire scenarios or vice versa.",
    example: "Fire case relief might require 50,000 lb/hr while blocked outlet only requires 20,000 lb/hr.",
    related: ["API 521", "Wetted Area"],
  },
  {
    term: "Wetted Area",
    category: "Pressure",
    definition: "The surface area of equipment in contact with liquid, relevant for fire case heat input calculations.",
    whyItMatters: "Heat input in fire case is proportional to wetted area. Only the first 25-30 feet of height counts.",
    commonMistake: "Including unwetted surfaces or areas above 25 feet in wetted area calculations.",
    related: ["Fire Case", "API 521"],
  },
  {
    term: "API 520",
    category: "Valve",
    definition: "API standard covering sizing, selection, and installation of pressure relief devices.",
    whyItMatters: "API 520 is the primary reference for PSV sizing calculations and methodology.",
    commonMistake: "Using outdated editions of API 520. Standards are updated periodically.",
    related: ["API 521", "API 526"],
  },
  {
    term: "API 521",
    category: "Valve",
    definition: "API standard covering guide for pressure-relieving and depressuring systems.",
    whyItMatters: "API 521 provides guidance on relief scenarios, disposal systems, and system design.",
    commonMistake: "Not considering all relief scenarios listed in API 521 Table 1.",
    related: ["API 520", "Fire Case"],
  },
  {
    term: "API 526",
    category: "Valve",
    definition: "API standard covering flanged steel pressure relief valves.",
    whyItMatters: "API 526 defines standard orifice sizes, inlet/outlet connections, and valve dimensions.",
    commonMistake: "Specifying non-standard orifice sizes when standard sizes are available.",
    related: ["Orifice", "API 520"],
  },
  {
    term: "Blocked Outlet",
    category: "Pressure",
    definition: "A relief scenario where a downstream valve closure prevents normal flow, directing all inlet flow to the PSV.",
    whyItMatters: "Blocked outlet is often the governing case for equipment fed by pumps or compressors.",
    commonMistake: "Not identifying all credible blocked outlet scenarios for each piece of equipment.",
    example: "If a pump can deliver 500 GPM to a vessel, the PSV must handle 500 GPM in blocked outlet.",
    related: ["Control Valve Failure", "Governing Case"],
  },
  {
    term: "Control Valve Failure",
    category: "Pressure",
    definition: "A relief scenario where a control valve fails in an open or closed position.",
    whyItMatters: "CV failure can cause blocked outlet (fail closed downstream) or excess flow (fail open upstream).",
    commonMistake: "Only considering one failure mode when both fail-open and fail-closed should be analyzed.",
    related: ["Blocked Outlet", "Relief Scenario"],
  },
  {
    term: "Thermal Relief",
    category: "Valve",
    definition: "A small relief valve protecting against hydraulic overpressure from thermal expansion of trapped liquid.",
    whyItMatters: "Any equipment that can be blocked in AND heated requires thermal relief protection.",
    commonMistake: "Forgetting thermal relief on infrequently isolated equipment like heat exchangers.",
    example: "A 3/4\" thermal relief valve sized for 3 GPM on a blocked-in exchanger.",
    related: ["Thermal Expansion", "Hydraulic"],
  },
  {
    term: "SCFH",
    category: "Gas",
    definition: "Standard Cubic Feet per Hour. Volumetric flow rate at standard conditions (60°F, 14.7 psia).",
    whyItMatters: "Tank venting capacities and some gas flows are stated in SCFH for comparison purposes.",
    commonMistake: "Not converting actual conditions to standard conditions when comparing capacities.",
    related: ["Mass Flow Rate", "Volumetric Flow"],
  },
  {
    term: "Lift",
    category: "Valve",
    definition: "The height the PSV disc rises above the seat during relief.",
    whyItMatters: "Adequate lift is required for full flow capacity. Backpressure reduces lift on conventional valves.",
    commonMistake: "Not recognizing that insufficient lift causes capacity reduction.",
    related: ["Backpressure", "Capacity"],
  },
];

// Helper functions
export function getTermByName(term: string): GlossaryTerm | undefined {
  return glossaryTerms.find(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(lowerQuery) ||
      t.definition.toLowerCase().includes(lowerQuery) ||
      t.whyItMatters.toLowerCase().includes(lowerQuery)
  );
}

export function getAllCategories(): GlossaryCategory[] {
  return [
    "Pressure",
    "Thermo",
    "Gas",
    "Liquid",
    "Valve",
    "Tank",
    "Flame",
    "Overfill",
  ];
}

// Terms that should trigger tooltips in the application
export const tooltipTerms = glossaryTerms.map((t) => t.term.toLowerCase());

export function shouldShowTooltip(text: string): string | null {
  const lowerText = text.toLowerCase();
  for (const term of glossaryTerms) {
    if (lowerText.includes(term.term.toLowerCase())) {
      return term.term;
    }
  }
  return null;
}
