# cali.so v3 behavior audit

## Interaction models

- **Global dock:** click/keyboard navigation. Preferences opens a compact
  settings surface. Route shortcuts use G then H/W/P/J/A.
- **Theme and locale:** click-driven preferences; theme switching suppresses
  transitions while values are applied.
- **Introduction marks:** pointer hover replays restrained SVG/text motion.
- **External and social links:** 300 ms cold hover intent on fine pointers;
  touch follows the ordinary link. Open cards have fixed dimensions and no
  network work during hover.
- **Portrait:** pointer-driven hidden shader field with a static fallback.
- **Lists:** focus-list siblings de-emphasize when another row is hovered or
  focused.
- **Record and book shelves:** click/touch selection plus horizontal scrolling;
  selected objects use physical spring motion and expose one external link.
- **Post navigation:** primary pointer/touch may opt into shared-element route
  motion; keyboard, history and reduced-motion navigation swap instantly.
- **Photo lightbox:** click opens a FLIP lightbox; Escape, click or the first
  scroll gesture closes it. The underlying page stays frozen during return.
- **Entrance choreography:** blur-to-focus and opacity only. No scroll
  hijacking or parallax. Reduced motion disables every entrance.

## Motion tokens

- UI chrome: 150–200 ms, `--ease-swift`.
- Physical objects: 300–350 ms, `--ease-spring`.
- Route defocus/focus: 250 ms exit / 300 ms enter.
- Gentle below-fold reveal: blur 2 px → 0 and fade, 300 ms.
- All motion has a `prefers-reduced-motion: reduce` branch.

## Responsive findings

- Desktop, tablet and mobile retain the same content order.
- At the small breakpoint the identity row becomes a stacked composition.
- Hover-only enhancements are removed on coarse/touch pointers.
- Fixed navigation respects device safe areas.

## Reference captures

- `docs/design-references/cali.so/original-desktop-1440.png`
- `docs/design-references/cali.so/original-tablet-768.png`
- `docs/design-references/cali.so/original-mobile-390.png`

