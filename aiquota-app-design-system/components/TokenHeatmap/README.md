# TokenHeatmap

Codex token activity for 42 weeks (`MobileTokenHistoryView`, `CodexTokenHistoryView`): a column per week, a row per day, coloured by quartile.

- 42 × 7 squares, 1px gaps, `radius-cell`; square = (width − 41) ÷ 42.
- `heat-none` no record, `heat-0` reported zero, `heat-1` to `heat-4` by quartile of active days. Future days empty.
- Month labels in `heat-label`, `secondary`, at the week holding the 1st, at least 24pt apart.
- Mac adds *Token activity* above it in `caption2`, `secondary`.
- Accessibility: *Token activity, past 42 weeks*, hint *Dim cells have no record. Dates are in UTC.*, a label per day.
