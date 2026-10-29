# MacSheet

The Mac menu-bar window (`PopoverView`, `MacAccountGridView`).

- 420pt wide for one account (`aq-macsheet--single`), 480pt for more and for the empty state; height fits content up to 88% of the screen, then only the body scrolls.
- Header: *AIQuota* in `mac-wordmark`, refresh on the right (`aq-iconbtn--mac`, a 36pt circle of `overview-glass`); 16pt sides and top, 12pt bottom.
- Body: 8pt top, 16pt sides and bottom. The Mac `NoticeBanner` first when present, 16pt above the rows; then `MacAccountRow`s touching. With no accounts: a Codex and a Claude placeholder row.
- Scrolling: `aq-scroll` with `aq-scroll--top` / `aq-scroll--bottom` fades 24pt at whichever edge has hidden content, never when everything fits.
- Footer: 8pt top and sides, 10pt bottom. *Settings* left and *Quit* right are `aq-footbtn`s (32pt tall, 10pt sides, `radius-row`; hover `overview-glass`, pressed `overview-glass-highlight`). The last refresh (*1m ago*) is centred in `tertiary` (`aq-macsheet__time`), hidden with no accounts. `mac-footer`.
- Surface: the Mac sheet in `Grounds`.
