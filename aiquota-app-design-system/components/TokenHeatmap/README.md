# TokenHeatmap

Codex token activity (`MobileTokenHistoryView` on iOS, `CodexTokenHistoryView` on the Mac): a column per week, a row per day, coloured by quartile. No title and no month labels.

- iOS 42 weeks, Mac 52. Square = (width − (weeks − 1)) ÷ weeks, 1px gaps, `radius-cell`. The grid takes the card's content width plus 10pt and is outset by `dial-outset` each side.
- `heat-none` no record, `heat-0` reported zero, `heat-1` to `heat-4` by quartile of active days. Future days empty.
- No data yet (Mac placeholder row): `aq-heat--empty`, every cell `overview-track` at 60%.
- Accessibility: *Token activity, past 42 weeks* (52 on the Mac), a label per day; the Mac shows each day's count as a tooltip.
