# ServiceCard

One account on the iOS overview (`ProviderDialCardContent`): dial, name, plan and reset times on the account surface, with Codex token history inside.

- `aq-card` (no `aq-glass`): the account surface at rest, `overview-glass` with a 1pt `overview-glass-highlight` top line, `radius-account` (24). No blur, border or shadow. Pressing adds accent at 5% (`aq-card--pressed` to pin it in a mockup). The whole card opens the service sheet.
- Padding 21pt top and bottom, 16pt sides; 16pt at the bottom when the heatmap closes the card. Cards stack `space-8` apart.
- Dial (`aq-dial-frame`) then details, `space-20` apart; stacked (`aq-card--stacked`, `space-12`) when narrower than the dial plus 180pt or at accessibility text sizes.
- Details sit 8pt down. Name in `card-title` with `chevron.right.circle.fill` (20pt, `tertiary`) on the name line. Plan in `card-detail` (*Pro plan*, or *Pro plan · Work* when the label isn't a default). Reset captions in `card-caption`, `reset-accent`, no gap between them.
- Monthly spend: *$65.57 of $100.00*, *monthly spend* (or *credits this month*, *monthly allowance*) in `secondary`, then *Monthly resets Nov 1, 12:00 AM*. Credits used, when reported: *Credits used  $12.40* in `secondary`.
- Status in `card-caption`, only for *Limit reached*, *Loading allowance…* or *No reading yet* (`secondary`), and *Reconnect to update* or *Couldn't update · Saved reading* (`aq-card__status--warning`). The dial keeps the saved reading. Reconnecting is an accessibility action and lives in the sheet; the card has no button.
- Codex: `TokenHeatmap` (42 weeks) 8pt below the summary, outset by `dial-outset` so it lines up with the ring.
