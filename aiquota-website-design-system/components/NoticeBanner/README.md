# NoticeBanner

A purple-tinted banner for one piece of news with one link, the same banner the apps show when a provider announces a reset.

**Recipe** (from `MacResetNoticeBanner.swift`): `notice` fill (accent at 22%), title in 17px semibold `ink`, link in `accent-ink` with ↗, and a round dismiss button in `ink-3`. The default has `radius-card` and a glass rim, like the iOS card. `aq-notice--mac` uses `radius-md` and no rim, as on the Mac sheet.

**Use** for a release announcement or a provider change, at most one per page, on `canvas`, `surface` or a sheet. Keep it below the brightest part of the wash, where the link holds 4.8:1.

**You provide** the title, the link and its URL, and what dismiss does.
