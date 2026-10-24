# ServiceCard

One account's allowance as the iOS overview shows it: a glass card with the dial on the left, the service on the right, and Codex's daily history below when there is some.

**Content order (from the app)**
1. Service name, 28px semibold.
2. Plan line, 17px semibold `ink`: *Pro plan*, *Enterprise plan*.
3. Reset lines in `accent-ink`: *7d resets Tue 10:07 PM*. Spend or credits lines in `ink-2`: *$65.57 of $100.00 monthly spend*.
4. A status line in `ink-2` when needed: *Limit reached*.
5. Optional `UsageHeatmap` for Codex, inside the card.
A glass chevron button sits top-right when the card opens a detail view.

**Use** stacked in a column over the wash, as in the app, or two across on desktop. Cards are glass (`aq-glass`), `radius-card`, `space-6` padding.

**Rules**
- Label the readings as samples somewhere nearby on the site.
- Write service names in plain text. Don't use the providers' logos on the site.
