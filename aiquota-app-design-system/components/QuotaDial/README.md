# QuotaDial

The AIQuota gauge: 270° arcs open at the bottom, with the service glyph and readings inside, all in one state colour.

**Geometry** (`OverviewView.swift`, `MacAccountDial.swift`)
- Each ring is a circle trimmed to 75%, rotated 135°, butt caps. Fill = `0.75 × percent`.
- Two windows: outer ring is the short window (*5h*), inner ring the weekly (*7d*), `ring-inset` inside, at `ring-secondary` opacity. Both `ring` wide.
- One window or a monthly allowance: one ring, `ring-single` wide.
- iOS: `dial` (124pt, scales with Dynamic Type up to 200), glyph `glyph` 6pt above the readings, readings in `dial-value`.
- Mac: `dial-mac` (120pt; frame trimmed to 114pt below the arc), readings in `dial-value-mac`.
- Tracks `track` (iOS) or `track-mac` (Mac). No reading: the tracks are dashed (4/5pt on iOS, 3/4 on the Mac) and the numbers become em dashes.

**State** by the worst window: `accent` under 85%, `aq-dial--warning` from 85%, `aq-dial--critical` from 95%, `aq-dial--off` (`secondary`) when disconnected or failed.

**You provide** the percentages, window labels, service glyph, and an `aria-label` with every value.
