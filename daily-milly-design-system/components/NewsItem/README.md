# NewsItem

One entry in a school column or a child's list: when, what, a note, where it came from.

**Use**
- `dm-meta` for the date (muted), or `dm-label` for an undated group such as *To do* (green or the child's colour).
- `dm-item-title` in ink, `dm-body` in text, then `dm-meta` for *Source:* with the source as a link.
- A portal status (Missing, Assigned) is a `dm-status` pill over the title at 15px, the source line's size: white on `red` for Missing or Incomplete, ink on `soft` otherwise.
- Items in a column are split by a `hairline`, never boxed.

**Rules**
- The date and the title are the same size or the date is quieter by colour, never by shrinking below 15px.
- Notes stop near 70 characters.
- The ⋯ menu sits flush right on the source line.
