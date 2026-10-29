# iPhoneOverview

The iOS overview as it ships (`OverviewView`).

- `aq-wash`. Title *AIQuota* (`large-title`, inline with the toolbar). Refresh and settings in the trailing toolbar.
- Column (`aq-screen`): 16pt gutters, 8pt top, 16pt bottom, items `space-8` apart, capped at `content-max`.
- Order: demo banner, notice when present, a `ServiceCard` per connected service, then the freshness line (`aq-freshness`, 8pt above) in `footnote`, `secondary`, centred. Demo mode adds *Sample usage · No live account data*.
- The list scrolls under the navigation bar; edges fade 24pt only where content is hidden (`aq-scroll`). Pull to refresh.
