# ColumnHeading

The big name over a column: a school, a child, the home, the 30-day calendar. A heavy rule, then the name, read as one block.

**Use**
- `.heading` on the `h2` or `h3`, inside a container with the 5px rule (`.dm-column` here; `.shared-feed` and `.child-header` on the site).
- A child's name takes the larger `name` size (`.dm-name`; on the site `.child-header .heading`): 44px, 36px on a phone. Schools, home and calendar stay at `heading`: 28px, 21px.
- Colour follows the child (`--child-accent`), otherwise green. The rule matches the name.

**Rules**
- Leading 1.1. A two-line school name must not look like two headings.
- Hierarchy is colour and weight. Never shrink a heading to rank it under another.
- Use & in headings, not "and".
- No new boxes, pills or labels around it.

**Email**: `heading(size)` in `milly/src/design.ts` gives the same role as an inline style (`heading(28)` → 28px / 31px, 750, -.025em). The email doesn't use it yet; it still sets 28px / 34px, 800.
