# Training Academy Photo Assets

This folder contains photos for the Training Academy lessons, case studies, and glossary.

## Usage Guidelines

1. **Source all photos from internal training materials** or licensed stock photography
2. **Include credit string** in the `credit` field for each image
3. **Optimize images** for web before adding (max 1200px wide, JPEG quality 80)
4. **Use descriptive filenames**: `[category]-[description].jpg`

## Folder Structure

```
photos/
├── psv/           # Pressure Safety Valve equipment
│   ├── conventional-installed.jpg
│   ├── bellows-cutaway.jpg
│   ├── pilot-operated.jpg
│   ├── nameplate-set-pressure.jpg
│   └── steam-service-psv.jpg
│
├── tank/          # Tank equipment (PVRVs, vents, arresters)
│   ├── pvrv-roof.jpg
│   ├── emergency-vent.jpg
│   ├── flame-arrester.jpg
│   ├── radar-gauge.jpg
│   └── vapor-recovery-unit.jpg
│
└── field/         # Field installations and general equipment
    ├── gauge-compound.jpg
    ├── flare-header.jpg
    ├── heat-exchanger.jpg
    └── loading-rack-vapor.jpg
```

## MODULE 1 SHOT LIST (Priority)

### Lesson 1: What is Pressure Relief?
| File Path | Shot Description |
|-----------|------------------|
| `psv/psv-vessel-mounted.jpg` | Full shot of a PSV installed on a vessel top head, showing the bonnet, body, test lever, and discharge piping connection |
| `psv/nameplate-closeup.jpg` | Close-up of a PSV nameplate clearly showing: SET PRESSURE (psig), ORIFICE DESIGNATION (letter), CDTP, and ASME UV stamp |
| `psv/discharge-to-flare.jpg` | PSV discharge elbow connecting to flare header piping, showing proper support and no pockets where liquid could accumulate |
| `psv/inlet-block-cso.jpg` | Close-up of inlet block valve with CSO (Car Seal Open) tag visible, showing the valve is locked in open position |

### Lesson 2: Pressure & Temperature Units
| File Path | Shot Description |
|-----------|------------------|
| `field/gauge-compound.jpg` | Close-up of a compound pressure gauge dial showing the 0 psig reference point and vacuum scale |
| `psv/nameplate-set-pressure.jpg` | Close-up of PSV nameplate with set pressure clearly visible (e.g., "SET: 150 PSIG") |

### Lesson 5: Valve Styles
| File Path | Shot Description |
|-----------|------------------|
| `psv/conventional-installed.jpg` | Full shot of a conventional PSV mounted on a vessel nozzle, showing bonnet, test lever, and discharge elbow |
| `psv/bellows-cutaway.jpg` | Cutaway or sectioned bellows valve showing the bellows element wrapped around the disc guide |
| `psv/pilot-operated.jpg` | Full shot of pilot-operated valve showing the main body and the small pilot valve mounted on top |

### Lesson 6: Tank Protection
| File Path | Shot Description |
|-----------|------------------|
| `tank/pvrv-roof.jpg` | PVRV installed on a tank roof, showing pressure and vacuum pallets |
| `tank/emergency-vent.jpg` | Emergency vent device on tank roof, showing the larger opening compared to normal PVRV |
| `tank/flame-arrester.jpg` | Flame arrester installed between PVRV and tank nozzle, showing the element housing |
| `tank/radar-gauge.jpg` | Radar gauge head mounted on tank roof with stilling well connection |

---

## Required Images for MVP

### PSV Track
- Conventional PSV installed on vessel
- Bellows PSV cutaway showing internal construction
- Pilot-operated PSV
- Steam service PSV with silencer
- Small thermal relief valve (TRV)

### Tank/Flame Track
- PVRV mounted on tank roof
- Floating roof seal area
- End-of-line flame arrester
- Flame arrester crimped ribbon element
- Emergency relief vent
- Gauge hatch
- Radar level switch for overfill protection
- Tank farm with containment
- Vapor recovery unit skid

### Field General
- Control valve with positioner
- Flare header piping
- Shell and tube heat exchanger
- Steam distribution header
- Horizontal separator (offshore)
- Marine loading arm with vapor return

## Placeholder Images

Until real photos are available, the application will use diagram components as fallbacks. You can also use placeholder images from:

- Internal training photo archives
- Licensed stock photography (Shutterstock, Getty, etc.)
- Equipment manufacturer documentation (with permission)

## Image Credits

Always include credit information:
- For internal photos: "Training photo"
- For stock photos: "© [Source Name]"
- For manufacturer images: "Courtesy [Manufacturer Name]"

## Adding New Images

1. Optimize the image (recommend: https://squoosh.app/)
2. Place in appropriate subfolder
3. Update the relevant lesson/case in `/lib/academy/lessons.ts` or `/lib/academy/cases.ts`
4. Include the credit string in the image metadata
