The design system for the AIQuota apps on iPhone, iPad and Mac, documented as they ship. Every colour, size and string here comes from the SwiftUI code. Where the HTML can only approximate the system (glass, materials, SF Symbols), the note says so. Dark leads; light mirrors it.

## Shared with the site

The app and the site share the icon (`brand`, `brand-2`, `spark`, `icon-ground`), the heat ramp (`heat-0` to `heat-4`), the state colours and their thresholds, and the dial. Everything else here is the app's own: SF type on Apple's text styles, system materials and native controls.

## Rules the apps follow

- **Colour means quota state.** `accent` under 85%, `warning` from 85%, `critical` from 95%, chosen by the worst window and applied to the whole dial: rings, glyph and numbers. Plan lines, spend and chrome stay neutral.
- **Numbers inside the dial.** Both readings are the same size. A window label (*5h*, *7d*, *Monthly*) is the ring's key and takes the ring's colour.
- **Three depths.** Ground, glass, and controls on glass. Cards have no shadow.
- **History lives in the service card**, never on a screen of its own, and never repeats a number the dial already shows.
- **Native controls.** Toolbars, sheets, forms, segmented controls and buttons are SwiftUI's own.

## Colour

- Grounds: `base`. The overview adds the wash (`wash`, `wash-mid`, `wash-glow`); sheets add `surface-glow`. See `Grounds`.
- Text: `primary` for names, plans and titles; `secondary` for footnotes, spend, status and freshness; `tertiary` for chevrons and dismiss glyphs.
- `accent`: dials, links, toggles, prominent buttons, the notice link.
- `reset-accent`: reset captions on cards and Mac rows.
- `warning`, `critical`: dial states and warning lines; `critical` for Disconnect.
- Mac only: `gauge-accent` and `gauge-ink` in the service detail view and analytics; `brand-accent` as the app accent; `sheet-tint`, `sheet-glow`, `sheet-glow-trailing`, `sheet-rim` for the sheet; `card-edge-mac`, `hover-mac`, `control-mac`, `notice-tint`, `track-mac`.
- Tracks: `track` on iOS, `track-mac` on the Mac.
- Glass (`glass`, `glass-raised`, `glass-edge`, `glass-highlight`) exists only for HTML mockups. In code use `.glassEffect(.regular)`.

Contrast as shipped, for reference: on light glass `accent` is 4.0:1, `secondary` 3.6:1, `warning` 2.1:1 and `critical` 3.4:1. In dark every text colour clears 4.5:1 on glass.

## Type

SF Pro through the system stack (`sans`), with Inter as the fallback off Apple devices. Everything scales with Dynamic Type; at accessibility sizes cards stack the dial above the details.

- iOS: `large-title` for *AIQuota*; `headline` for sheet titles; `card-title`, `card-detail` and `card-caption` on cards (the app's compact 22pt and 15pt line boxes); `body` in the notice; `callout` for warning lines; `subheadline` for the plan in a sheet; `footnote` for freshness and status; `caption2` for *Monthly*.
- Dial: `dial-value` (subheadline, medium, monospaced digits) on iOS, `dial-value-mac` (16pt semibold) on the Mac.
- Mac: `mac-wordmark`, `mac-service`, `mac-detail`, `mac-caption`, `mac-notice`, `mac-footer`.

## Shape and space

- Spacing `space-2` to `space-24`, as the views use them: cards pad `space-16`, stack `space-24` apart, and keep the dial `space-24` from its details (`space-20` on the Mac).
- Radii: `radius-card` (28) on iOS, `radius-mac-card` (24) on the Mac, `radius-cell` for heatmap squares.
- Dials: `dial` (124, scaled with Dynamic Type up to 200) and `dial-mac` (120); `ring`, `ring-single`, `ring-inset`; `ring-secondary` for the weekly ring.

## Materials

- iOS cards and the notice: `.glassEffect(.regular, in: RoundedRectangle(cornerRadius: 28))` on iOS 26, `.regularMaterial` before.
- Mac rows and the Mac notice: `.regularMaterial` with a 1px `card-edge-mac` border.
- Mac sheet: ultraThinMaterial at 70% opacity on macOS 26, then `sheet-tint`, `sheet-glow`, `sheet-glow-trailing` and the `sheet-rim` edge.
- Reduce Transparency removes the wash and glows.

## Motion

System only: sheets present and dismiss as iOS does, Mac rows ease their hover fill over 0.12s, refresh swaps its glyph for a spinner. Reduce Motion removes the hover and sheet resize animations.

## Voice

Short, literal, numbers first, sentence case, no exclamation marks or emoji. Strings as the apps write them:

- Dial: *62% 5h*, *41% 7d*, *66%* over *Monthly*.
- iOS resets: *5h resets 3:40 PM* (today), *7d resets Tue 10:07 PM*, *Monthly resets Nov 1, 12:00 AM*.
- Mac resets: *Resets Fri at 3:40 PM*, *7d Resets Tue at 10:07 PM*.
- Status: *Limit reached*, *Reconnect to update*, *Couldn't update · Saved reading*, *Loading allowance…*, *No reading yet*, *Not connected*.
- Freshness: *Updated just now*, *Older reading · 2 hours ago*, *Allowance · Updated 2 minutes ago*.
- Demo: *Sample usage · No live account data*.
- The product is *AIQuota*, one word. Services are *Codex* and *Claude*.

## Iconography

- SF Symbols: `arrow.clockwise`, `gearshape`, `xmark`, `chevron.right.circle.fill`, `xmark.circle.fill`, `arrow.up.right`. The previews draw stand-ins; use the symbols in code.
- Service glyphs (`assets/Glyphs`) are template images, drawn in the dial's colour.
- The app icon (`assets/Logos`) in light and dark versions.

## Where code and rules disagree

- iOS draws *Monthly* under a single-ring dial in `secondary`. The rule above (and the Mac since PR #123) puts window labels in the ring's colour, so the previews tint it.

## Not covered

Settings, onboarding screens, the analytics charts, widgets and the menu-bar icon. Built from niederme/ai-quota main@3d5aff4 and the AIQuota Tokens variables in Figma. Light glass values are approximations. Components are static HTML styled by `components/bundle.css`.
