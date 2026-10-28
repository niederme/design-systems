# Cover

The design system's own page header, built from the site's real page-top classes. Use the same structure to open any subpage.

- `work-index-header`: a `rule`, then `work-index-header-copy` with an `h1` and an `h2`. The `h2` line takes the accent red (`--accent`). Display type: Söhne halbfett, tight 0.9 leading.
- `work-article-grid`: a meta column (`work-article-meta`, made of `work-article-meta-card` pairs of `work-article-meta-label` and `work-article-meta-value`) beside `work-article-body`, which holds `work-article-section` blocks with an `h2` and paragraphs.
- Everything sits inside `body.is-subpage > .work-page > main.work-article`.
