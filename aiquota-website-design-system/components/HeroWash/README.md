# HeroWash

The page-top background: the iOS overview's purple wash, ported line for line from `OverviewBackground`. It is the app's signature, so the site opens with it.

**Recipe**
- A vertical gradient from `wash` at 72% (dark) or 18% (light), through `accent` at 12% / 5% at 40%, to clear at 70%.
- A radial `accent` light from the top-right at 35% / 12%, reaching 85% of the width.
- With Reduce Transparency it is removed, as in the app.

**Use** once per page, behind the hero. Put glass cards and glass buttons on it, as the app does. Give the section at least 640px of height so the gradient has room to fade. A short band looks muddy.

**Rules**
- Body copy on the wash uses `ink` and the lead `ink-2`. Both hold 4.5:1 at the wash's darkest point.
- No other gradients on the page, except a MacSheet's own glow.
