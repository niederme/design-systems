# ServiceCard

One account on the iOS overview (`ProviderDialCardContent`): dial, name, plan and reset times on one glass card, with Codex token history inside.

- `aq-card aq-glass`, `radius-card`, `space-16` padding. The whole card opens the service sheet.
- Dial then details, `space-24` apart; stacked (`aq-card--stacked`, `space-12`) when narrower than the dial plus 180pt or at accessibility text sizes.
- Name in `card-title` with `chevron.right.circle.fill` in `tertiary`. Plan in `card-detail` (*Pro plan · Work*). Reset captions in `card-caption`, `reset-accent`, `space-4` apart.
- Monthly spend: *$65.57 of $100.00*, *monthly spend* (or *credits this month*, *monthly allowance*) in `secondary`, then *Monthly resets Nov 1, 12:00 AM*. Credits used, when reported: *Credits used  $12.40* in `secondary`.
- Status in `footnote`, `secondary`, only for *Limit reached*, *Reconnect to update*, *Couldn't update · Saved reading*, *Loading allowance…* or *No reading yet*.
- Needs sign-in: dashed dial, no chevron, and a large prominent *Reconnect* (or *Connect*) button.
- Codex: `TokenHeatmap` below the summary, `space-8` down.
