# QuotaDial

The gauge from the apps: 270° arcs that open at the bottom, with the reading in the middle in the same colour as the ring.

**Geometry (from `OverviewView.swift`)**
- Arcs trimmed to 75% and rotated 135°, butt caps. Fill = `0.75 × percent`.
- Dual dial: outer ring is the short window (5h), inner ring the weekly (7d), 10px inside, at `opacity-secondary-ring`. Rings are `stroke-ring` (8px) at 124px and double at 248px.
- Single dial (`aq-dial--single`): one ring at `stroke-ring-single` (12px) for a 7d-only or monthly allowance, with the percentage over its label ('66%' over 'Monthly').
- Tracks use `track`.

**State, by the worst window** (the apps' rule)
- Under 85%: ring `accent`, numbers `accent-ink`.
- 85% and up: `aq-dial--warning`.
- 95% and up or at the limit: `aq-dial--critical`, the full red dial on the Mac sheet.
- Not reported: dashed `ink-3` tracks and em dashes. A reported zero is a solid empty track.

**You provide** the percentages and labels (*5h*, *7d*, *Monthly*) and an `aria-label` with both values in words.

**Rules**
- Both readings are the same size.
- Colour only ever means quota state.
- The apps put the provider's glyph above the numbers. The site leaves it out and names the service beside the dial in text.
