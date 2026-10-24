# ThemeToggle

A three-way glass control (System, Light, Dark) that lets a visitor override the site's appearance. It starts on System.

**Behaviour**
- Default is **System**: the page follows `prefers-color-scheme` and keeps following it if the visitor changes their OS setting.
- Choosing Light or Dark sets `data-theme="light"` or `data-theme="dark"` on `<html>` and remembers the choice in `localStorage` (`aiquota-theme`). Choosing System removes the stored choice.
- Set the theme in a small inline script in `<head>`, before the first paint, so a returning visitor never sees a flash of the other theme.

```html
<script>
  (function () {
    var saved = null; try { saved = localStorage.getItem('aiquota-theme'); } catch (e) {}
    var mq = matchMedia('(prefers-color-scheme: dark)');
    function apply(mode) {
      var theme = mode === 'light' || mode === 'dark' ? mode : (mq.matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    }
    apply(saved);
    mq.addEventListener('change', function () { var m = null; try { m = localStorage.getItem('aiquota-theme'); } catch (e) {} if (!m) apply(null); });
    window.aiquotaSetTheme = function (mode) {
      try { mode === 'system' ? localStorage.removeItem('aiquota-theme') : localStorage.setItem('aiquota-theme', mode); } catch (e) {}
      apply(mode === 'system' ? null : mode);
    };
  })();
</script>
```

**Variants**
- `aq-theme aq-glass`: icon and label. Use it in the footer or a settings area.
- `aq-theme aq-theme--compact aq-glass`: icons only, with the label kept for screen readers. Use it in the nav bar, to the left of Download.

**You provide** the three buttons with `data-mode` and `aria-pressed`, wired to `aiquotaSetTheme`. Keep the group's `aria-label="Appearance"`.

**Rules**
- Always three states. A two-way switch can't get back to following the system.
- The pressed segment is `ink` on `glass-edge`; the others are `ink-2`.
