# Patterns

Repeated patterns make the site easier to scan. They carry navigation, hierarchy and state without extra explanation.

- **Navigation**: rails, local jumps and section states describe the same structure. The left rail is page-level navigation, local jumps help scan a long page, and active states follow scroll position, not just clicks.
- **Responsive**: 1501px and up opens the grid and scales hero type harder. 960 to 1500px is the 12-column baseline with the persistent rail. 521 to 959px keeps the structure with tighter spacing and simpler compositions. 520px and below is the phone treatment: narrower insets, tighter spacing, horizontal scrollers only where peeking content adds meaning.
- **Framed objects**: most content lives directly on the page. Frames are for moments that need separation or emphasis.
- **Theme state**: dark first; light is a controlled remapping of tokens. Don't redesign components per theme.
- **Copy blocks**: paragraph width stays measured even when the layout gets dramatic.
