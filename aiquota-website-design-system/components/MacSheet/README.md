# MacSheet

The Mac menu-bar window rebuilt as a panel: plum glass with a violet glow from the top-left, a header, the notice, the services and a footer.

**Recipe** (from `PopoverView.swift` and `AdaptiveColors.swift`): `sheet` tint over `surface`, a `glow` ellipse from the top-left fading out at 75%, a `glow-2` ellipse from the bottom-right fading at 60%. `radius-sheet` corners, a `line` rim and `shadow-float`. The header and footer are split off by `line` hairlines.

**Use** wherever the site shows the Mac app in action, in place of a screenshot. It's good for the hero on the Mac page and the menu-bar section on the home page.

**You provide** the service rows (dial, name, plan, reset lines), the account count, and the footer text. Use sample readings and say so nearby.

**Rules**
- One sheet per section. It is the Mac app's surface, so don't use it for unrelated content.
- Footer actions read as text in `ink-2`, as in the app.
