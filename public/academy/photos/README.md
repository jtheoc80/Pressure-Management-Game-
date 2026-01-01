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
│   ├── conventional-valve-installed.jpg
│   ├── bellows-valve-cutaway.jpg
│   ├── pilot-operated-valve.jpg
│   ├── steam-service-psv.jpg
│   └── thermal-relief-valve.jpg
│
├── tank/          # Tank equipment (PVRVs, vents, arresters)
│   ├── pvrv-on-tank.jpg
│   ├── floating-roof.jpg
│   ├── flame-arrester.jpg
│   ├── arrester-element.jpg
│   ├── emergency-vent.jpg
│   ├── gauge-hatch.jpg
│   ├── radar-level-switch.jpg
│   ├── tank-farm-aerial.jpg
│   └── vapor-recovery-unit.jpg
│
└── field/         # Field installations and general equipment
    ├── control-valve-positioner.jpg
    ├── flare-header.jpg
    ├── heat-exchanger.jpg
    ├── steam-header.jpg
    ├── offshore-separator.jpg
    └── marine-loading-arm.jpg
```

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
