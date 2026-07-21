# cali.so v3 page topology

Captured from `https://cali.so/` on 2026-07-21 at 1440 px, 768 px, and
390 px. The checked-in v3 source is the implementation source of truth.

## Global shell

- Warm paper background with ambient drafting guides and viewport-edge fades.
- Geist → Frex Sans GB → system font stack.
- Chinese routes are unprefixed; English mirrors them under `/en`.
- Public content uses a 37.5 rem maximum column with 1.5 rem inline padding.
- A fixed bottom-center liquid-glass dock is the primary navigation.
- Footer and dock remain global chrome across public routes.

## Homepage order

1. **Identity and portrait** — name, animated bilingual introduction, social
   hover cards, halftone portrait and hidden shader field.
2. **Primary cards** — Writing, Photos and Projects counts and destinations.
3. **Experience** — ruled rows with company, role and tabular date range.
4. **Writing** — latest five MDX posts and a View all route.
5. **On rotation** — horizontally staged record shelf with selection state.
6. **Books I Love** — horizontally staged bookshelf with selection state.
7. **Footer** — contact tree, route index, colophon, Braille signature, clock
   and coordinates.
8. **Fixed dock** — Home, Writing, Photos, Projects, AMA and Preferences.

## Responsive layout

- **Desktop (1440 px):** identity copy and portrait share a row; the portrait
  is 15 rem wide. Footer uses the full Swiss-grid composition.
- **Tablet (768 px):** the narrow editorial column remains centered; global
  guides and the fixed dock remain visible.
- **Mobile (390 px):** identity stacks with the portrait above the copy;
  shelves become touch-scroll surfaces and the dock stays inside safe-area
  spacing.

## Route families

- `/`, `/en`
- `/blog`, `/en/blog`, and localized MDX post routes
- `/photos`, `/en/photos`
- `/projects`, `/en/projects`
- `/ama`, `/en/ama`, booking and manage-link routes
- `/admin/*` owner-only operations
- localized RSS, sitemap, metadata and Open Graph image routes

