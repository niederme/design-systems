# SiteNav

The site's navigation. On desktop (960px and up) it's a fixed 90px icon rail at the left: `nav.global-nav`. On phones it's a bottom bar: `nav.mobile-nav`. Each is hidden at the other's sizes.

- Each destination is a `global-nav-anchor` (or `mobile-nav-anchor`) holding three `<img>` states, `icon-off`, `icon-on` and `icon-hover`, from `assets/icons/side-nav/`, plus a `global-nav-popover` label. Add `is-active` to the current page's anchor.
- Below the links, `rail-controls-panel` holds two real buttons: `theme-toggle` (light/dark) and `cols-toggle` (shows the 12-column overlay). Each has `-switch`, `-label` and `-state` parts.
- Destinations: Home, Work Experience & Resume, About & Biography, Blog, Colophon.
- The rail reserves the left edge on desktop, so page content starts to its right.
