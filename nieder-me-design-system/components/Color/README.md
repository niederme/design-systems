# Color

Color is assigned a job before it's assigned a value. The site is designed dark first. Light mode is an alternate reading environment, not a separate design.

| Job | Token | Dark | Light |
| --- | --- | --- | --- |
| Page background | `--bg` | `#000000` | `#ffffff` |
| Primary text | `--fg` | `#ffffff` | `#121212` |
| Divider and rule | `--line` | `rgba(255,255,255,0.2)` | `#d6d0c6` |
| Muted text | `--muted` | `#ebebf5` | `#474a51` |
| Accent | `--accent`, `--accent-hover` | `#ff453a`, `#ff6a60` | unchanged |

Theme behavior: changing themes shouldn't change the hierarchy, only the materials. Light mode is `data-theme="light"` on `<html>`, and every token re-resolves.
