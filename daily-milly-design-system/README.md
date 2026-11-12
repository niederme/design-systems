The Daily Milly design system: the family's school newsletter, as a website (milly.nieder.me) and a 4 PM email. Both should read like one calm printed page: white paper, one rounded system font, a house green, and one colour per child. Hierarchy comes from colour and weight, never from shrinking type.

Taken from the live site at niederme/daily-milly main@579294c (2026-11-12). Names in the previews are made up; this repo is public, so no real family or school data goes here.

## Principles

- **Restraint.** No new rules, boxes, pills or labels unless they earn their place. When in doubt, take one away.
- **Colour for hierarchy.** Green is the house, each child has a colour, everything else is ink, text or muted. Never shrink type to rank it.
- **15px is the floor.** Nothing smaller, anywhere.
- **One size per row.** A date beside a title is the title's size.
- **& in headings.**
- **Roles, not one-offs.** A new heading uses a role (`.heading`) plus, at most, a size. It doesn't get its own weight, leading or tracking.

## Colour

- Ground: `paper`. Panels: `soft` (the brief), `warn-bg` (notices).
- Text: `ink` for titles and the brief, `text` for notes, `muted` for dates, sources and status.
- House: `green` for the brand, school and home headings, links and the primary button.
- Children: `child-1` (red), `child-2` (blue), `child-3` (purple), in name order. On the site, set `--child-accent` on the child's container and everything inside follows.
- State: `warn` for something not yet checked, `red` for a source that failed.

## Type

One family: `ui-rounded`, then the system sans.

- `brand`: The Daily Milly, green, 800.
- `title`: the day at the top of the page.
- `heading`: the big name over a column (school, child, home, calendar), under a 5px rule in the same colour. Leading 1.1. **Live as `.heading` on the site.**
- `label`: a group inside a column or panel (*Today*, *To do*). Same weight as a heading, smaller only because it's a different role, coloured green or the child's colour.
- `item-title`, `body`, `meta`: an item's title, its note, its date and source.
- `brief`: the sentence or two that opens the Family and child pages.

## Shape and space

- Heavy rule: 5px over a column heading (3px over a child on a wide screen), 14px to the name.
- Items are split by a `hairline`, 20px apart. No cards.
- Page tops out at 1200px; reading text stops near 70ch.
- Radii: 7px controls, 8px panels, 10px toasts and menus.

## Email

The email can only use inline styles. `milly/src/design.ts` holds the same tokens for it, and a test in that repo fails if the site CSS and `design.ts` drift. The email isn't on the tokens yet.

## Open

- Heading sizes still differ by page: school 28 / 21 (desktop / phone), child 24 / 29, calendar 28 / 25. Next step: one size per width.
- The email's muted is #7a8089 and its headings are 28 / 34 at 800; the site's are #7a8080 and 1.1 at 750.

## Not synced

Copied by hand from `milly/public/dashboard.css` and `milly/src/design.ts`. `tokens.css` is generated from `tokens.json`. Components are static HTML previews styled by `components/bundle.css`.
