# UsageHeatmap

Codex's daily usage as week columns and day rows, the graph inside the Codex card on Mac and iPhone.

**Encoding** (from `CodexTokenHistoryView.swift`): active days ranked into quartiles, `data-1` to `data-4`; a reported zero is `data-0`; a day that wasn't reported is an empty outlined cell. 14px cells, 3px gaps, `radius-xs`, month labels in `footnote` `ink-2`.

**Use** inside a Codex `ServiceCard` or the history feature section. Claude doesn't report daily history, so never show this for Claude.
