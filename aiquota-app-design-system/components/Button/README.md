# Button

The apps use SwiftUI's buttons; these are mockup stand-ins.

- Prominent (`aq-btn--prominent`): `.buttonStyle(.glassProminent)`, `.controlSize(.large)`, tinted `accent`, label `on-fill`. *Continue*, *Connect*, *Reconnect*.
- Glass (`aq-btn--glass aq-glass`): `.buttonStyle(.glass)`, large. *Try Demo*, *Back*.
- Before iOS 26 these fall back to `.borderedProminent` and `.bordered`.
- Overview toolbar (`aq-toolbar` with `aq-iconbtn`): refresh (`arrow.clockwise`, spinner while loading) and settings (`gearshape`), tinted `primary`, grouped in one glass capsule.
- Mac refresh (`aq-iconbtn--mac`): 30pt glyph, 3pt padding, circle of `overview-glass`.
- Mac controls (`aq-btn--mac`): small `.borderedProminent` *Connect* (`aq-btn--small aq-btn--prominent`) on placeholder rows; regular `.bordered` *Reconnect* (`aq-btn--bordered`) on a signed-out row. Footer *Settings* and *Quit* are `aq-footbtn`s.
