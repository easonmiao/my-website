# Portrait-inspired secondary listing system

## Reference

Primary reference: `https://portrait.so/blog`.
Captured evidence: `docs/design-references/portrait-blog-desktop.png`.

Applies to `/tech/`, `/life/`, `/pets/` and `/memories/`.

## Desktop geometry

- Page canvas: `#f7f7f7`.
- Floating navigation: centered pill, maximum width 980px, 58px high, 18px
  from the viewport top.
- Main width: `min(1137px, calc(100% - 48px))`.
- Featured section starts 190–220px below the navigation and is a two-column
  grid: 43% editorial copy / 49% feature card, with the remaining space as gap.
- Featured heading uses a Basier-like rounded sans treatment:
  48.83px, line-height 1.04, weight 500, tracking about -1.56px.
- Featured copy: 20px/1.5, muted gray.
- Feature card: 16px radius, subtle 1px hairline, translucent white surface,
  image on top and story metadata below.
- Story section starts 64px after the feature section.
- Desktop story grid: 3 equal columns with 20px gap. Cards have 16px radius,
  image aspect around 1.9:1, and a compact content block.
- Keep generous whitespace before a structured footer.

## Content mapping

- `/tech/`: AI 早报 is featured; cards cover 商业财经、科技分享、银行观察
  and工具实践.
- `/life/`: featured life note; cards cover 学习、影片、书籍、居家 and 美食.
- `/pets/`: BanBan feature portrait; cards use distinct BanBan photos and short
  diary-style captions.
- `/memories/`: featured archive introduction; cards lead to the preserved
  previous-site archive and its meaningful subsections.
- Use only existing HooMee-owned image assets. Do not add invented external
  imagery.

## Mobile

- 32px page gutters and 128px top padding.
- Featured copy and card stack in one column; heading scales to 38px.
- Story grid becomes one column.
- Navigation may scroll horizontally but logo and No.3 return action remain
  reachable.
- Cards never depend on hover for meaning.

## Motion and accessibility

- Cards may lift 2px using transform only.
- Reduced motion disables all transitions.
- Every image has content-specific alt text.
- Visible focus rings are required.
