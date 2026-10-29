# Grounds

The three backgrounds the apps draw.

- Overview (`aq-wash`, `OverviewBackground`): `base`, a vertical gradient (`wash` at 0%, `wash-mid` at 40%, clear at 70%) and a radial `wash-glow` from the top-trailing corner, radius 85% of the width.
- Sheets (`aq-surface`, `BrandSurfaceBackground`): `base` with one `surface-glow` glow at (50%, 38%) of a 320pt band, radius 210pt.
- Mac sheet (`aq-macsheet`): `sheet-tint` over ultraThinMaterial at 70%, `sheet-glow` from the top-leading corner to 75%, `sheet-glow-trailing` from the bottom-trailing corner to 60%, and a 1px `sheet-rim` gradient edge.
- Reduce Transparency drops the gradients and glows, leaving `base`.
- On the overview, cards sit on the account surface (`aq-card`: `overview-glass` with a 1pt `overview-glass-highlight` top line), not glass. Glass (`aq-glass`) stays for the toolbar, the demo banner and enterprise detail cards.
