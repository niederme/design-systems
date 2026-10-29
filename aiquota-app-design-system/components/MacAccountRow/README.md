# MacAccountRow

One account in the Mac sheet (`MacAccountCard`), and the placeholder row the sheet shows when nothing is connected (`MacAccountPlaceholderRow`).

- `aq-macrow`: clear at rest. Hover or keyboard focus shows the account surface (`overview-glass` plus the 1pt `overview-glass-highlight` top line, `radius-account`), fading in over 0.12s; pressing adds accent at 5%. One row at a time. `aq-macrow--highlighted` pins the hover look in a mockup.
- Padding 21pt top and bottom, 16pt sides; 8pt at the bottom when the heatmap closes the row. Rows touch: no gap between them.
- `aq-dial-frame`, then details `space-20` away and 8pt down: name in `card-title`, plan in `card-detail`, reset captions in `card-caption`, `reset-accent` (*Resets Fri at 3:40 PM*, *7d Resets Tue at 10:07 PM*).
- Status sits in a fixed 16pt slot 8pt after the name (`aq-macrow__title` holding `aq-macrow__name` and `aq-macrow__status`), never as a line of its own, so a state change never moves the captions. The text goes in the icon's tooltip (`title`).
  - Problems: `aq-macrow__status--warning`, a triangle in `warning` (*Couldn’t update · Saved reading*, or *Couldn’t load allowance* with no reading). The dial keeps its state colour.
  - Neutral status: plain `aq-macrow__status`, an info circle in `secondary` (*Not connected*, *No reading yet*).
  - Nothing to say: `aq-macrow__status--none` keeps the slot empty.
  - Signed out with no reading: dial off, the info circle (*Not connected*), and a regular bordered *Reconnect* (`aq-btn aq-btn--mac aq-btn--bordered`).
- Codex adds a 52-week `TokenHeatmap`, 8pt below, outset by `dial-outset`. No title.
- Placeholder row: dial off with *— 5h* / *— 7d*, the service name, *Not connected* as the plan, two `aq-placeholder` bars (136 and `--long` 172pt, 8pt tall in a 16pt line), then a small prominent *Connect* (`aq-btn aq-btn--mac aq-btn--small aq-btn--prominent aq-macrow__connect`). Codex adds the empty heatmap (`aq-heat--empty`). The whole row connects.
