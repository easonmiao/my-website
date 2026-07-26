# Portrait-inspired secondary long-form system

## Reference

Primary reference: `https://portrait.so/hosting`.
Captured evidence: `docs/design-references/portrait-hosting-desktop.png`.

Applies to `/about/` and `/tujie/`.

## Visual grammar

- Use the same floating navigation and `#f7f7f7` canvas as the listing pages.
- The main experience sits inside a large pale-blue rounded canvas
  (`#eef8ff` to `#dff2ff`, 28–32px radius).
- Hero uses oversized, balanced copy with restrained rainbow accents. Supporting
  copy is muted and never wider than 640px.
- Follow with one large rounded media/banner block and a sequence of feature
  cards separated by generous vertical space.
- Use diagrams, cards or functional panels inside pale stages; do not place
  raw content directly on the white page.
- Finish with a compact FAQ/details group and the shared structured footer.

## About page topology

1. Global navigation.
2. Pale-blue oversized welcome hero.
3. Full-width HooMee image/banner statement.
4. Three numbered principles.
5. Three owner cards: EMiAO, HannaH, BanBan.
6. Compact FAQ.
7. Shared footer.

## Tujie page topology

1. Global navigation plus quota indicator.
2. Pale-blue product hero.
3. Existing source tabs, input, settings and generate button inside a large
   rounded functional stage.
4. Existing progress and result panels, unchanged IDs and JS contracts.
5. Three-step explanation.
6. Privacy/usage FAQ.
7. Shared footer.

Do not rename or remove functional IDs used by `tujie/app.js`, including
`quotaButton`, `sourceInput`, `fileDrop`, `fileInput`, `settingsCard`,
`generateButton`, `progressPanel`, `resultPanel`, `resultImage`,
`downloadButton`, `welcomeModal` and `welcomeButton`.

## Responsive

- At ≤760px all columns stack, canvas radius reduces to 22px and gutters to
  16–20px.
- Controls remain at least 44px tall.
- Functional panels preserve DOM order and keyboard access.
