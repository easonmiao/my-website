# Portrait-inspired tertiary article system

## Reference

Primary references:

- `https://portrait.so/blog/announcing-portrait-beta-on-testnet`
- `https://portrait.so/blog/portrait-is-now-free-for-everyone`

Captured evidence:

- `docs/design-references/portrait-article-beta-desktop.png`
- `docs/design-references/portrait-article-free-desktop.png`

Applies to current and future content-detail routes, beginning with
`/articles/ai-morning/2026-07-06/`.

## Desktop

- Canvas: `#f7f7f7`; floating shared navigation.
- Article stage: pale blue/pastel beam with a broad rounded top.
- Outer article container: max-width 768px, top padding 256px, horizontal
  padding 64px.
- Reading column: 640px.
- Back link: 14px muted gray, margin-bottom 48px.
- H1: 48.83px/1.04, weight 500, tracking -1.56px, margin-bottom 48px.
- Author row: 20px avatar, compact name and date treatment.
- Cover image: 640 × 336px, 12px radius.
- Date line: 14px muted gray.
- Body: 16px/28px, `#1b1b1b`; paragraph margin-bottom 20px.
- Section headings use strong separation and no decorative card wrapper.
- End with related reading and shared structured footer.

## Mobile

- Top padding 128px.
- 32px horizontal gutter.
- H1 scales to 38px with balanced wrapping.
- Cover remains 16:9 and full column width.
- Body stays at least 16px to avoid zoom and preserve reading comfort.

## Behavior

- Plain browser scrolling; no scroll hijacking.
- Links have visible focus and underline states.
- Content remains visible without JavaScript.
- Reduced motion disables optional card or footer transitions.
