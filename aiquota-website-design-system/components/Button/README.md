# Button

Capsule buttons, built the way the apps build them: a prominent filled capsule for the main action, Liquid Glass for everything else.

**Use**
- `aq-btn--primary`: `brand` fill (the icon's violet) with `on-brand`, plus a faint top highlight that stands in for iOS's glassProminent. One per view: *Download for Mac*.
- `aq-btn--secondary aq-glass`: glass with an `ink` label, as the app's glass buttons. *Get the iPhone app*, *Release notes*.
- `aq-btn--plain`: `accent-ink` words with no fill.
- `aq-icongroup aq-glass`: a glass capsule holding 44px icon buttons, like the refresh and settings pair at the top of the iOS overview.

**You provide** the element (`<a>` or `<button>`), the label, and an optional 18px SVG icon in `currentColor`. Icon buttons need an `aria-label`.

**Rules**
- Never two filled buttons side by side.
- Sentence-case verbs: *Download for Mac*.
- Focus: a 2px `accent` ring, 3px offset.
