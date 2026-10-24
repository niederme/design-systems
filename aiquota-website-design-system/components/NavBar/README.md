# NavBar

A floating glass capsule with the app icon, the name, four links and Download, sitting in the wash like the iOS toolbar buttons.

**Use** at the top of every page, sticky at `top: env(safe-area-inset-top)` with `space-4` around it. Add `aq-nav--raised` (adds `shadow-float`) once the page scrolls.

**You provide** a compact `ThemeToggle` to the left of Download, the links with `aria-current="page"` on the current one, and one primary button.

**Rules**
- The current link is `ink`, semibold, on `glass`. Download is the only filled control.
- Under 640px, collapse the links into a menu and keep Download.
- The name is *AIQuota* in text beside the real app icon.
