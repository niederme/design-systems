# NoticeBanner

The dismissible reset announcement above the cards (`CodexResetNoticeBanner`, `MacResetNoticeBanner`). One style on both platforms.

- `aq-notice`: regular material plus `notice-tint`, a 1px `notice-edge` border, `radius-account`, 12 × 16pt padding.
- Title in `notice` semibold, `primary`. *Read more on Codex Resets* with `arrow.up.right`, 6pt apart, in `notice` regular, `accent`. Lines 6pt apart.
- Dismiss: `xmark.circle.fill`, 16pt, `secondary` at 75%, top-trailing in a 44pt target on iOS, 32pt on the Mac (`aq-notice--mac`).
- On iOS it sits first in the card column, 8pt above the cards. On the Mac it's the first item in the sheet body, 16pt above the rows.
