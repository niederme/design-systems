# Typography

Type does most of the personality work. Scale changes can be bold, but weight, spacing and line length stay disciplined.

- One family, Söhne (`"Sohne"`, self-hosted): 300 Leicht, 400 Buch, 600 Dreiviertelfett and 700 Halbfett. True italics exist for 400 and 700 only, and are for emphasis.
- Display (h1/h2 hero): `clamp(52px, 7.7vw, 120px)`, 700, line-height 0.9, with the second line in `--accent`.
- Headings: 48 / 42 / 30 / 26 / 24px, 700, tight leading.
- Body: 16 to 18px at 300 to 400, line-height 1.35, measured width. Lead paragraphs reach 24px.
- Meta, eyebrow and caption: 13px spaced caps at lower contrast (`--muted`). Microcopy is 10 to 12px.
- Inline links sit in the sentence and turn `--accent` on hover.

On site pages, plain `h1` to `h6`, `p`, `ul` and `blockquote` inside `main.work-article` pick up these styles. The `styleguide-element-*` classes only reproduce them for the specimen.
