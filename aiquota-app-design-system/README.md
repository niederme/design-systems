The design system for the AIQuota apps on iPhone, iPad and Mac, documented as they ship. Every colour, size and string here comes from the SwiftUI code. Where the HTML can only approximate the system (glass, materials, SF Symbols), the note says so. Dark leads; light mirrors it.

## Shared with the site

The app and the site share the icon (`brand`, `brand-2`, `spark`, `icon-ground`), the heat ramp (`heat-0` to `heat-4`), the state colours and their thresholds, and the dial. Everything else here is the app's own: SF type on Apple's text styles, system materials and native controls.

## Rules the apps follow

- **Colour means quota state.** `accent` under 85%, `warning` from 85%, `critical` from 95%, chosen by the worst window and applied to the whole dial: rings, glyph and numbers. Plan lines, spend and chrome stay neutral.
- **Numbers inside the dial.** Both readings are the same size. A window label (*5h*, *7d*, *Monthly*) is the ring's key and takes the ring's colour.
- **Three depths.** Ground, the account surface (cards and rows), and controls. Cards have no border, shadow or blur.
- **History lives in the service card**, never on a screen of its own, and never repeats a number the dial already shows.
- **Native controls.** Toolbars, sheets, forms, segmented controls and buttons are SwiftUI's own.

## Colour

- Grounds: `base`. The overview adds the wash (`wash`, `wash-mid`, `wash-glow`); sheets add `surface-glow`. See `Grounds`.
- Text: `primary` for names, plans and titles; `secondary` for footnotes, spend, status and freshness; `tertiary` for chevrons, the Mac freshness time and a dial that isn't connected.
- `accent`: dials, links, toggles, prominent buttons, the notice link.
- `reset-accent`: reset captions on cards and Mac rows.
- `warning`, `critical`: dial states and warning lines; `critical` for Disconnect.
- Account surface, both platforms: `overview-glass` (accent at 6%) with a 1pt `overview-glass-highlight` (accent at 10%) top line. Resting on iOS cards; on hover and focus on Mac rows and footer buttons; the Mac refresh circle.
- Tracks: `overview-track` for dials, placeholder bars and empty heatmap cells on both platforms; `track` (quaternarySystemFill) for iOS chart placeholders and the demo banner.
- Notice: `notice-tint` with a `notice-edge` border, both platforms.
- Mac only: `gauge-accent` and `gauge-ink` in the service detail view and analytics; `brand-accent` as the app accent; `sheet-tint`, `sheet-glow`, `sheet-glow-trailing`, `sheet-rim` for the sheet.
- Glass (`glass`, `glass-raised`, `glass-edge`, `glass-highlight`) exists only for HTML mockups of the toolbar, the demo banner and enterprise cards. In code use `.glassEffect(.regular)`.

Contrast as measured on light glass at main@3d5aff4, for reference (not re-measured on the account surface): on light glass `accent` is 4.0:1, `secondary` 3.6:1, `warning` 2.1:1 and `critical` 3.4:1. In dark every text colour clears 4.5:1 on glass.

## Type

SF Pro through the system stack (`sans`), with Inter as the fallback off Apple devices. Everything scales with Dynamic Type; at accessibility sizes cards stack the dial above the details.

- Cards and Mac rows share one set: `card-title` (20/24), `card-detail` (13/16 semibold) and `card-caption` (13/16) for resets, spend and status. `notice` (15/20) for the reset notice on both platforms.
- Dial: `dial-value` (16pt semibold, monospaced digits) on both platforms.
- iOS: `large-title` for *AIQuota*; `headline` for sheet titles; `callout` for warning lines in sheets; `subheadline` for the plan in a sheet; `footnote` for freshness; `caption2` for chart labels.
- Mac: `mac-wordmark`, `mac-footer`.

## Shape and space

- Spacing `space-2` to `space-24`, as the views use them. Cards and rows pad 21pt top and bottom and `space-16` at the sides, and keep the dial `space-20` from the details. iOS cards stack `space-8` apart; Mac rows touch.
- Radii: `radius-account` (24) for cards, rows and the notice on both platforms; `radius-card` (28) for the remaining iOS glass surfaces; `radius-row` for Mac footer buttons; `radius-cell` for heatmap squares.
- Dials: `dial` (108 on both platforms; iOS scales it with Dynamic Type up to 200), `dial-outset` for the stroke past the frame; `ring`, `ring-single`, `ring-inset`; `ring-secondary` for the weekly ring.

## Materials

- iOS cards and Mac rows: no material. A flat `overview-glass` fill with the `overview-glass-highlight` line, clipped to 24pt (`OverviewAccountSurface`, `MacAccountRowSurface`). Blur was tried and rejected.
- The notice, both platforms: `.regularMaterial`, then `notice-tint`, then a 1px `notice-edge` border.
- The toolbar, demo banner and enterprise cards: `.glassEffect(.regular)` on iOS 26, `.regularMaterial` before.
- Mac sheet: ultraThinMaterial at 70% opacity on macOS 26, then `sheet-tint`, `sheet-glow`, `sheet-glow-trailing` and the `sheet-rim` edge.
- Reduce Transparency removes the wash and glows.

## Motion

System only: sheets present and dismiss as iOS does; Mac rows and footer buttons ease their hover fill over 0.12s, and cards and rows ease the press tint the same way; refresh swaps its glyph for a spinner; scroll edges fade only while content is hidden there. Reduce Motion removes the hover, press and sheet resize animations.

## Voice

Short, literal, numbers first, sentence case, no exclamation marks or emoji. Strings as the apps write them:

- Dial: *62% 5h*, *41% 7d*, *66%* over *Monthly*.
- iOS resets: *5h resets 3:40 PM* (today), *7d resets Tue 10:07 PM*, *Monthly resets Nov 1, 12:00 AM*.
- Mac resets: *Resets Fri at 3:40 PM*, *7d Resets Tue at 10:07 PM*.
- Status: *Limit reached*, *Reconnect to update*, *Couldn't update · Saved reading*, *Loading allowance…*, *No reading yet*, *Not connected*; Mac *Couldn’t load allowance*.
- Actions: *Connect* (placeholder rows), *Reconnect*, *Settings*, *Quit*.
- Freshness: *Updated just now*, *Older reading · 2 hours ago*, *Last updated 2 hours ago* (a saved reading), *Allowance · Updated 2 minutes ago*; on the Mac *just now*, *1m ago*.
- Demo: *Sample usage · No live account data*.
- The product is *AIQuota*, one word. Services are *Codex* and *Claude*.

## Iconography

- SF Symbols: `arrow.clockwise`, `gearshape`, `xmark`, `chevron.right.circle.fill`, `xmark.circle.fill`, `arrow.up.right`, `info.circle` and `exclamationmark.triangle.fill` (Mac row status). The previews draw stand-ins; use the symbols in code.
- Service glyphs (`assets/Glyphs`) are template images, drawn in the dial's colour.
- The app icon (`assets/Logos`) in light and dark versions.

## Where code and rules disagree

- iOS draws *Monthly* under a single-ring dial in `secondary`. The rule above (and the Mac since PR #123) puts window labels in the ring's colour, so the previews tint it.

## Not covered

Settings, onboarding screens, the analytics charts and the menu-bar icon. Tinted and clear widget modes. The iOS empty state (the design proposes placeholder cards; the app still shows onboarding). Built from niederme/ai-quota main@74bd0dd and the AIQuota Tokens variables in Figma. Light glass values are approximations. Components are static HTML styled by `components/bundle.css`.
