/**
 * Training Academy Case Studies
 * Real-world scenarios for contextual learning
 */

import type { CaseStudy, CaseEnvironment } from "./types";

// Re-export types for use in components
export type { CaseStudy, CaseEnvironment } from "./types";

export const cases: CaseStudy[] = [
  // PSV TRACK CASES
  {
    id: "case-refinery-blocked-outlet",
    track: "psv",
    environment: "refinery",
    title: "Refinery Crude Unit – Blocked Outlet Event",
    summary: "A control valve failed closed on a crude unit charge pump discharge, creating a blocked outlet condition requiring immediate PSV relief.",
    narrative: `During a routine shift change at a Gulf Coast refinery, the main charge pump discharge control valve (FCV-101) failed closed due to a positioner malfunction. The crude charge pump continued running at full rate, rapidly building pressure in the vessel upstream of the blocked valve.

The PSV (PSV-101) on the flash drum opened at its set pressure of 150 psig and successfully relieved the excess flow to the flare system. The operator noticed the high-pressure alarm and shut down the charge pump within 3 minutes.

Post-incident review confirmed the PSV was correctly sized for the blocked outlet case (maximum pump flow of 8,500 BPD). Had the PSV been sized only for fire case, it would have been undersized for this event.`,
    diagramKey: "ReliefPathDiagram",
    photos: [
      { src: "/academy/photos/psv/conventional-valve-installed.jpg", alt: "Conventional PSV installed on vessel", caption: "PSV-101 installation on flash drum", credit: "Training photo" },
      { src: "/academy/photos/field/control-valve-positioner.jpg", alt: "Control valve with positioner", caption: "FCV-101 positioner that failed", credit: "Training photo" },
    ],
    requiredInputs: [
      "Set pressure (psig)",
      "Relieving case identification",
      "Maximum pump flow rate (BPD or GPM)",
      "Discharge destination",
      "Backpressure conditions",
    ],
    commonMistakes: [
      "Sizing only for fire case and ignoring blocked outlet",
      "Assuming control valve failure cannot happen",
      "Not verifying PSV discharge path is clear",
      "Using design flow instead of maximum pump capacity",
    ],
    ruleRefs: [
      {
        title: "API 521 Relief Scenarios",
        body: "API 521 Table 1 lists credible overpressure scenarios including blocked outlet, which often governs for pump or compressor discharge.",
        quote: "Size for maximum possible flow from upstream source.",
        sourceLabel: "API 521 Section 4",
      },
    ],
    linkedScenarioId: "gas-flare-backpressure",
  },
  {
    id: "case-chemical-backpressure",
    track: "psv",
    environment: "chemical",
    title: "Chemical Plant – Variable Backpressure Problem",
    summary: "A conventional PSV failed to open at set pressure due to excessive flare header backpressure during a plant-wide upset.",
    narrative: `A specialty chemical plant experienced multiple simultaneous relief events during a cooling water failure. Several PSVs discharged to a common flare header, raising header pressure to 45 psig.

PSV-301 on reactor R-101 was a conventional valve with a 100 psig set pressure. With 45 psig superimposed backpressure (45% of set), the effective set pressure shifted significantly higher. The valve did not open until pressure reached 135 psig, exceeding the vessel's 110 psig MAWP.

Investigation revealed the valve should have been balanced bellows or pilot-operated. The replacement bellows valve maintains constant set pressure regardless of backpressure variations in the flare header.`,
    diagramKey: "BackpressureDiagram",
    photos: [
      { src: "/academy/photos/psv/bellows-valve-cutaway.jpg", alt: "Bellows PSV cutaway", caption: "Balanced bellows valve construction", credit: "Training photo" },
      { src: "/academy/photos/field/flare-header.jpg", alt: "Flare header piping", caption: "Shared flare header system", credit: "Training photo" },
    ],
    requiredInputs: [
      "Set pressure (psig)",
      "Maximum superimposed backpressure (psig)",
      "Built-up backpressure estimate (psig)",
      "Total backpressure as % of set",
      "Valve style selection",
    ],
    commonMistakes: [
      "Using conventional valve with >10% backpressure",
      "Ignoring flare header pressure during upsets",
      "Not calculating total backpressure (superimposed + built-up)",
      "Assuming constant backpressure when it varies",
    ],
    ruleRefs: [
      {
        title: "Conventional Valve Backpressure Limit",
        body: "Conventional PSVs are limited to applications where total backpressure does not exceed 10% of set pressure.",
        quote: "Capacity is affected when backpressure exceeds 10% of set.",
        sourceLabel: "API 520 Part I, Section 5",
      },
      {
        title: "Balanced Bellows Application",
        body: "Balanced bellows valves compensate for backpressure up to approximately 50% of set pressure by isolating the spring chamber.",
        sourceLabel: "API 520 Part I, Section 5",
      },
    ],
    linkedScenarioId: "gas-flare-backpressure",
  },
  {
    id: "case-terminal-thermal",
    track: "psv",
    environment: "terminal",
    title: "Product Terminal – Thermal Relief Failure",
    summary: "A blocked-in heat exchanger overpressured due to missing thermal relief, causing a flange leak.",
    narrative: `At a petroleum products terminal, maintenance isolated heat exchanger E-201 for tube bundle inspection. Both inlet and outlet block valves were closed, trapping light naphtha in the shell side.

The following day, ambient temperature rose to 105°F, heating the trapped liquid. Thermal expansion of the incompressible liquid generated hydraulic pressure exceeding the exchanger's 75 psig MAWP. A shell-side flange began leaking product.

Investigation found no thermal relief valve was installed. The original design assumed the exchanger would never be blocked in, but operating procedures had changed. A 3/4" thermal relief valve (TRV) was subsequently installed, set at 75 psig with discharge to closed drain.`,
    diagramKey: "ReliefPathDiagram",
    photos: [
      { src: "/academy/photos/psv/thermal-relief-valve.jpg", alt: "Small thermal relief valve", caption: "Thermal relief valve (TRV) for blocked-in equipment", credit: "Training photo" },
      { src: "/academy/photos/field/heat-exchanger.jpg", alt: "Shell and tube heat exchanger", caption: "Heat exchanger E-201 shell side", credit: "Training photo" },
    ],
    requiredInputs: [
      "Equipment MAWP (psig)",
      "Trapped liquid volume (gallons)",
      "Expected temperature rise (°F)",
      "Liquid thermal expansion coefficient",
      "TRV flow rate (GPM)",
    ],
    commonMistakes: [
      "Assuming equipment will never be blocked in",
      "Forgetting thermal relief when procedures change",
      "Sizing TRV for fire case instead of thermal expansion",
      "Not considering solar heating or ambient temperature changes",
    ],
    ruleRefs: [
      {
        title: "Thermal Relief Requirement",
        body: "Equipment that can be isolated and contains liquid must have thermal relief to prevent hydraulic overpressure from temperature increase.",
        sourceLabel: "API 521 Section 4.4",
      },
    ],
    linkedScenarioId: "liquid-thermal-expansion",
  },
  {
    id: "case-offshore-fire",
    track: "psv",
    environment: "offshore",
    title: "Offshore Platform – Fire Case Sizing",
    summary: "Fire case analysis determined PSV sizing for a large separator vessel, accounting for wetted area and drainage.",
    narrative: `A new offshore platform required PSV sizing for a three-phase production separator (V-100). The vessel operates at 450 psig with dimensions of 10 ft diameter × 40 ft length, oriented horizontal.

Engineering analyzed multiple relieving scenarios. While blocked outlet required 15,000 lb/hr, fire case analysis based on API 521 wetted area calculation required 42,000 lb/hr – nearly three times the blocked outlet case.

The design team initially sized for blocked outlet only. Design review caught the error, and the PSV was resized to handle fire case as the governing scenario. A J orifice (1.287 in²) was selected instead of the original F orifice (0.307 in²).`,
    diagramKey: "PSVStyleCutaways",
    photos: [
      { src: "/academy/photos/field/offshore-separator.jpg", alt: "Horizontal separator on offshore platform", caption: "Three-phase separator V-100", credit: "Training photo" },
      { src: "/academy/photos/psv/pilot-operated-valve.jpg", alt: "Pilot-operated PSV", caption: "Pilot-operated PSV for offshore service", credit: "Training photo" },
    ],
    requiredInputs: [
      "Vessel dimensions (diameter, length)",
      "Vessel orientation (horizontal/vertical)",
      "Wetted area calculation (ft²)",
      "Heat input (BTU/hr) from API 521",
      "Latent heat of vaporization",
      "Required relief rate (lb/hr)",
    ],
    commonMistakes: [
      "Only sizing for process scenarios, ignoring fire case",
      "Including area above 25 ft elevation in wetted area",
      "Using incorrect drainage factor",
      "Not rechecking fire case when vessel size changes",
    ],
    ruleRefs: [
      {
        title: "Fire Case Heat Input",
        body: "API 521 provides equations for calculating heat absorption from pool fires based on wetted surface area and drainage conditions.",
        sourceLabel: "API 521 Section 5.15",
      },
      {
        title: "Wetted Area Definition",
        body: "Wetted area for fire case includes only the liquid-wetted surface up to 25 feet above grade or fire source.",
        sourceLabel: "API 521 Section 5.15.2",
      },
    ],
  },
  {
    id: "case-refinery-steam",
    track: "psv",
    environment: "refinery",
    title: "Refinery Steam System – Saturated Steam Relief",
    summary: "Steam header PSV sizing for blocked outlet during boiler maximum output conditions.",
    narrative: `A refinery's 150 psig steam header serves multiple process units. PSV-501 protects the header from overpressure if downstream isolation occurs while the boiler continues producing steam.

The governing case is blocked outlet with full boiler output of 75,000 lb/hr saturated steam. At 150 psig (164.7 psia), saturation temperature is 366°F. Key steam properties: MW = 18.02, k = 1.33, Z ≈ 0.95.

The PSV discharges to atmosphere through a silencer stack. Since discharge is to atmosphere, a conventional valve is acceptable (no backpressure concerns). An L orifice (2.853 in²) was selected to handle the full boiler output.`,
    diagramKey: "DischargePathsDiagram",
    photos: [
      { src: "/academy/photos/psv/steam-service-psv.jpg", alt: "Steam service PSV with silencer", caption: "PSV-501 with atmospheric discharge silencer", credit: "Training photo" },
      { src: "/academy/photos/field/steam-header.jpg", alt: "High pressure steam header", caption: "150 psig steam distribution header", credit: "Training photo" },
    ],
    requiredInputs: [
      "Set pressure (psig)",
      "Steam condition (saturated/superheated)",
      "Saturation temperature at set pressure (°F)",
      "Maximum steam flow (lb/hr)",
      "Discharge destination",
    ],
    commonMistakes: [
      "Using normal operating flow instead of maximum boiler capacity",
      "Forgetting steam properties vary with pressure",
      "Not accounting for superheat if present",
      "Incorrect k-value for steam (should be ~1.33)",
    ],
    ruleRefs: [
      {
        title: "Steam Relief Sizing",
        body: "Steam PSV sizing uses specific steam flow equations. For saturated steam, the relieving temperature equals saturation temperature at relieving pressure.",
        sourceLabel: "API 520 Part I, Section 5.6",
      },
    ],
    linkedScenarioId: "steam-header-blocked",
  },

  // TANK & FLAME TRACK CASES
  {
    id: "case-terminal-tank-breathing",
    track: "tank_flame",
    environment: "terminal",
    title: "Bulk Terminal – Tank Breathing Failure",
    summary: "Inadequate PVRV sizing caused tank roof damage during rapid product receipt.",
    narrative: `A 50,000 barrel crude oil storage tank at a marine terminal received cargo from a tanker at maximum pump rate of 15,000 BPH. The tank's PVRV was sized only for thermal breathing based on API 2000 tables.

During rapid filling, displaced vapors exceeded PVRV capacity. Tank internal pressure rose to 12 inches WC, exceeding the 8 inch WC design pressure. The floating roof seals lifted, releasing vapors and causing minor roof edge damage.

Root cause: The PVRV was sized for thermal outbreathing only (~3,000 CFH) and did not account for liquid displacement during filling (~25,000 CFH). API 2000 requires sizing for BOTH thermal and liquid movement, taking the larger value.`,
    diagramKey: "TankBreathingDiagram",
    photos: [
      { src: "/academy/photos/tank/pvrv-on-tank.jpg", alt: "PVRV mounted on tank roof", caption: "PVRV installation on tank roof nozzle", credit: "Training photo" },
      { src: "/academy/photos/tank/floating-roof.jpg", alt: "Floating roof tank", caption: "Floating roof seal area", credit: "Training photo" },
    ],
    requiredInputs: [
      "Tank diameter and height",
      "Maximum fill rate (BPH or GPM)",
      "Product vapor pressure",
      "PVRV pressure and vacuum settings",
      "Thermal breathing requirement",
      "Liquid movement requirement",
    ],
    commonMistakes: [
      "Sizing only for thermal breathing",
      "Ignoring flash vapors during filling",
      "Not accounting for maximum pump rate",
      "Forgetting inbreathing during withdrawal",
    ],
    ruleRefs: [
      {
        title: "API 2000 Venting Requirements",
        body: "Normal venting must accommodate both thermal breathing and liquid movement (filling and emptying). Use the larger of thermal or liquid movement requirements.",
        sourceLabel: "API 2000 Section 4",
      },
      {
        title: "Liquid Movement Venting",
        body: "Outbreathing for filling equals the volumetric fill rate plus any flash vapors. Inbreathing for emptying equals the withdrawal rate.",
        sourceLabel: "API 2000 Section 4.3",
      },
    ],
  },
  {
    id: "case-chemical-flame-arrester",
    track: "tank_flame",
    environment: "chemical",
    title: "Chemical Storage – Flame Arrester Selection",
    summary: "Incorrect flame arrester rating led to propagation risk assessment failure.",
    narrative: `A chemical plant storing toluene (IIA gas group) installed end-of-line flame arresters on tank vent outlets. During a Management of Change (MOC) review, engineers discovered the arresters were rated for IIB gases only.

Toluene has a Maximum Experimental Safe Gap (MESG) of 0.94 mm, placing it in Group IIA. The installed IIB-rated arresters have larger passage sizes designed for gases with MESG > 0.9 mm. While technically the rating was adequate, the margin was minimal.

The facility replaced all arresters with IIA-rated units to provide appropriate safety margin. Additionally, the inspection program was updated to verify MESG compatibility for all new product storage.`,
    diagramKey: "FlameArresterDiagram",
    photos: [
      { src: "/academy/photos/tank/flame-arrester.jpg", alt: "End-of-line flame arrester", caption: "Deflagration flame arrester on tank vent", credit: "Training photo" },
      { src: "/academy/photos/tank/arrester-element.jpg", alt: "Flame arrester crimped ribbon element", caption: "Crimped ribbon element detail", credit: "Training photo" },
    ],
    requiredInputs: [
      "Product/vapor MESG (mm)",
      "Gas group classification (IIA, IIB, IIC)",
      "Arrester location (end-of-line vs in-line)",
      "Deflagration vs detonation rating",
      "Required flow capacity",
    ],
    commonMistakes: [
      "Using wrong gas group rating for product",
      "Installing deflagration arrester where detonation possible",
      "Not considering pipe run-up distance",
      "Forgetting to maintain/inspect arrester elements",
    ],
    ruleRefs: [
      {
        title: "Flame Arrester Classification",
        body: "Flame arresters must be rated for the gas group of the vapor being handled. Group IIC (hydrogen, acetylene) requires the smallest passages; Group IIA allows larger passages.",
        sourceLabel: "API 2028 Section 4",
      },
      {
        title: "MESG and Gas Groups",
        body: "MESG (Maximum Experimental Safe Gap) determines gas group: IIC < 0.5 mm, IIB 0.5-0.9 mm, IIA > 0.9 mm.",
        sourceLabel: "IEC 60079-20-1",
      },
    ],
  },
  {
    id: "case-refinery-overfill",
    track: "tank_flame",
    environment: "refinery",
    title: "Refinery Tank Farm – Overfill Prevention Upgrade",
    summary: "API 2350 Category 3 upgrade required independent high-high shutdown system.",
    narrative: `A refinery tank farm underwent API 2350 compliance review for overfill protection. Tank T-301 (diesel storage, 100,000 bbl) was classified as Category 3 based on potential consequences of overflow.

Existing protection relied on a single level transmitter providing both high alarm and high-high shutdown. This violated the independence requirement – a single failure could disable both protection layers.

The upgrade installed an independent radar level switch for high-high shutdown, wired to a separate safety PLC. The existing level transmitter retained the high alarm function. Testing procedures were established to verify both systems quarterly.`,
    diagramKey: "OverfillLayersDiagram",
    photos: [
      { src: "/academy/photos/tank/radar-level-switch.jpg", alt: "Radar level switch on tank", caption: "Independent HH level switch for overfill shutdown", credit: "Training photo" },
      { src: "/academy/photos/tank/tank-farm-aerial.jpg", alt: "Tank farm aerial view", caption: "Refinery tank farm with containment", credit: "Training photo" },
    ],
    requiredInputs: [
      "API 2350 category determination",
      "High alarm setpoint (%)",
      "High-high shutdown setpoint (%)",
      "Level instrument types",
      "Independence verification",
    ],
    commonMistakes: [
      "Using same instrument for alarm and shutdown",
      "Setting HH too close to H alarm (nuisance trips)",
      "Not testing shutdown function regularly",
      "Incorrect category classification",
    ],
    ruleRefs: [
      {
        title: "API 2350 Category Requirements",
        body: "Category 3 tanks require independent high-high level detection with automatic overfill prevention (shutdown). The HH device must be separate from process level instruments.",
        sourceLabel: "API 2350 Section 6",
      },
      {
        title: "Independence Requirement",
        body: "Independence means the overfill prevention system continues to function if the normal level measurement system fails.",
        sourceLabel: "API 2350 Section 4.4",
      },
    ],
  },
  {
    id: "case-pipeline-emergency-vent",
    track: "tank_flame",
    environment: "pipeline",
    title: "Pipeline Terminal – Emergency Venting Adequacy",
    summary: "Fire case analysis showed emergency venting via gauge hatch was inadequate for large tank.",
    narrative: `A pipeline terminal evaluated fire case venting for a 250,000 barrel crude tank per API 2000. Normal venting through two PVRVs provided 50,000 SCFH capacity – adequate for thermal breathing and filling operations.

Fire case analysis per API 2000 environmental factor method required 180,000 SCFH emergency venting capacity. The existing gauge hatch (lifting at 2.5 oz/sq in) provided only 40,000 SCFH additional capacity.

Total emergency capacity of 90,000 SCFH was less than half the requirement. The solution: install a dedicated emergency vent (lifting at 1.5 oz/sq in) sized for the balance of fire case requirement.`,
    diagramKey: "EmergencyVentDiagram",
    photos: [
      { src: "/academy/photos/tank/emergency-vent.jpg", alt: "Emergency vent on tank roof", caption: "Emergency relief vent for fire case", credit: "Training photo" },
      { src: "/academy/photos/tank/gauge-hatch.jpg", alt: "Tank gauge hatch", caption: "Gauge hatch that lifts during overpressure", credit: "Training photo" },
    ],
    requiredInputs: [
      "Tank wetted area (sq ft)",
      "API 2000 environmental factor",
      "Required emergency venting (SCFH)",
      "Normal vent capacity (SCFH)",
      "Emergency vent capacity (SCFH)",
    ],
    commonMistakes: [
      "Assuming normal PVRVs handle fire case",
      "Not calculating wetted area correctly",
      "Forgetting environmental factor for insulation",
      "Relying only on frangible roof joint",
    ],
    ruleRefs: [
      {
        title: "Emergency Venting Requirement",
        body: "API 2000 requires emergency venting capacity for fire exposure in addition to normal venting. The total must handle the calculated fire case heat input.",
        sourceLabel: "API 2000 Section 5",
      },
    ],
  },
  {
    id: "case-terminal-vapor-recovery",
    track: "tank_flame",
    environment: "terminal",
    title: "Marine Terminal – Vapor Recovery Integration",
    summary: "VRU integration with tank venting required careful analysis of backup scenarios.",
    narrative: `A marine terminal installed a Vapor Recovery Unit (VRU) to capture displaced vapors during tank filling and ship loading. The VRU compresses vapors and returns them to a holding tank.

Design review identified that if the VRU trips during loading, the full displacement flow (~40,000 SCFH) must be handled by PVRVs. Original PVRVs were sized only for thermal breathing.

The final design included: (1) VRU sized for normal vapor displacement, (2) PVRVs upgraded to handle full loading displacement as backup, (3) High pressure permissive to stop loading if PVRVs lift.`,
    diagramKey: "VaporControlPathDiagram",
    photos: [
      { src: "/academy/photos/tank/vapor-recovery-unit.jpg", alt: "Vapor recovery unit skid", caption: "VRU compressor and controls", credit: "Training photo" },
      { src: "/academy/photos/field/marine-loading-arm.jpg", alt: "Marine loading arm", caption: "Ship loading with vapor return", credit: "Training photo" },
    ],
    requiredInputs: [
      "Normal vapor flow to VRU (SCFH)",
      "VRU design capacity (SCFH)",
      "PVRV backup capacity (SCFH)",
      "VRU trip scenarios",
      "Loading rate (BPH)",
    ],
    commonMistakes: [
      "Not sizing PVRV for VRU failure scenario",
      "Assuming VRU is always available",
      "Forgetting to stop operations when backup activates",
      "Not testing VRU/PVRV integration",
    ],
    ruleRefs: [
      {
        title: "Vapor Recovery Backup",
        body: "When vapor control devices (VRUs) are installed, adequate venting must still be provided for when the device is out of service or overwhelmed.",
        sourceLabel: "API 2000 Section 6",
      },
    ],
  },
];

// Helper functions
export function getCaseById(id: string): CaseStudy | undefined {
  return cases.find((c) => c.id === id);
}

export function getCasesByTrack(track: "psv" | "tank_flame"): CaseStudy[] {
  return cases.filter((c) => c.track === track);
}

export function getCasesByEnvironment(environment: CaseEnvironment): CaseStudy[] {
  return cases.filter((c) => c.environment === environment);
}

export function getCasesFiltered(track?: string, environment?: string): CaseStudy[] {
  return cases.filter((c) => {
    if (track && c.track !== track) return false;
    if (environment && c.environment !== environment) return false;
    return true;
  });
}
