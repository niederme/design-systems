# ServiceSheet

Tapping a card presents the service as a sheet (`ServiceAccountSheet`, `ServiceDetailContent`).

- `.presentationDetents([.large])`, drag indicator visible, background `base` with `BrandSurfaceBackground`. The overview recedes behind it.
- Inline title (the service name) with refresh and close in the trailing toolbar, separated by a fixed spacer.
- Content, 16pt sides, `space-16` apart: the plan in `subheadline`, `secondary`; *Allowance · Updated 2 minutes ago* in `footnote`; warning lines in `callout`, `warning`; the analytics view (a 7 days / 30 days segmented control, then charts); a divider; *Check Codex resets* with `arrow.up.right` in `accent`.
- Analytics charts are not yet in this system; the preview marks the space.
