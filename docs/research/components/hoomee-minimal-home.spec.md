# HooMeeMinimalHome specification

## Overview

- **Target files:** `app/_views/home-page.tsx`,
  `components/home-introduction.tsx`, `components/site-footer.tsx`,
  `components/dock.tsx`
- **Interaction model:** static content with click-driven locale/theme
  preferences.

## Content contract

- Display name: `HooMee Coffee`.
- Chinese description: `HooMee Coffee 的个人网站。`
- English description: `The personal website of HooMee Coffee.`
- Public email: `emiiao@qq.com`.
- No portrait, experience, projects, social profiles, photos, records, books,
  posts, newsletter or AMA content.

## Layout

- Preserve the upstream 37.5 rem editorial column and warm-paper canvas.
- Homepage content is a single compact identity block at the top of the column.
- Footer preserves the Swiss three-column rhythm but contains only colophon,
  email and Home.
- Fixed liquid Dock contains Home and Preferences only.

## States and behavior

- Language preference switches between `/` and `/en`.
- Appearance preference supports light, system and dark.
- Email opens `mailto:emiiao@qq.com`.
- Disabled route families return 404 and are absent from sitemap/navigation.
- Reduced-motion behavior remains inherited from the upstream design system.

## Responsive behavior

- 1440 px, 768 px and 390 px use the same content order.
- The narrow content column remains centered; mobile retains 1.5 rem padding.
- Dock respects safe areas and does not reserve empty item slots.

