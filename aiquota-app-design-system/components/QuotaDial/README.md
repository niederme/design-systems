# QuotaDial

The AIQuota gauge: 270° arcs open at the bottom, with the service glyph and readings inside, all in one state colour. One geometry on iOS and the Mac (`MacAccountDial`; iOS mirrors it in `ProviderDialCardContent.dial`).

**Geometry**
- `dial` (108pt). Wrap it in `aq-dial-frame`: it keeps the outer stroke (`dial-outset`, 5pt) at the top and drops the circle's unused lower quarter, so the frame is 103pt tall.
- Each ring is a circle trimmed to 75%, rotated 135°, butt caps. Fill = `0.75 × percent`. Copy the arc paths from `QuotaDial.html` (viewBox `0 0 108 108`, outer radius 54, inner 45).
- Two windows: outer ring is the short window (*5h*), inner ring the weekly (*7d*), `ring-inset` (9pt) inside, at `ring-secondary` opacity. Both `ring` (7pt). The readings lift 5pt to clear the inner arc.
- One window or a monthly allowance: one ring, `ring-single` (10pt).
- Inside: the glyph, then the readings 5pt below in `dial-value` (16pt semibold, monospaced digits, 80pt wide). A monthly dial reads *66%* over *Monthly* in `card-caption`, in the ring's colour (see "Where code and rules disagree" in the system README).
- Tracks are `overview-track`, solid. No reading: tracks only, readings *— 5h* and *— 7d*.
- On iOS the whole dial scales with Dynamic Type, capped at 200pt.

**State** by the worst window: `accent` under 85%, `aq-dial--warning` from 85%, `aq-dial--critical` from 95%, `aq-dial--off` (`tertiary`) when not connected. An error keeps the state colour; the status line says what went wrong.

**You provide** the percentages, window labels, service glyph, and an `aria-label` with every value.
