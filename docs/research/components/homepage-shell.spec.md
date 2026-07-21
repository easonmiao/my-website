# HomepageShell specification

## Overview

- **Target:** `app/_views/home-page.tsx`
- **Reference:** `docs/design-references/cali.so/original-desktop-1440.png`
- **Interaction model:** static composition with pointer, click and
  route-transition enhancements.

## Structure

- `max-width: 37.5rem`; horizontal padding `1.5rem`.
- Identity row, NavCards, Experience, Writing, VinylShelf and Bookshelf.
- Section gaps are 4 rem (`mt-16`).
- Numbered section tags are generated in render order so optional shelves do
  not leave gaps.

## Typography and color

- Body stack: Geist, Frex Sans GB, system UI.
- Chrome and home copy: 14 px with compact tracking.
- Main name: 16 px semibold.
- Body copy: 14 px with relaxed leading.
- Colors use the reversible `--gray-1` … `--gray-12` warm-paper scale.

## States and behaviors

- Entrances use source-defined `enter` and `enter-swing` delays.
- External links use fine-pointer hover cards and ordinary touch links.
- Lists and shelf objects expose hover/focus/selected states.
- Reduced motion removes all transition and entrance motion.

## Assets

- Portrait sources: `/images/headshot.jpg`, `/images/portrait-square.jpg`.
- Records and book covers: `/images/records/*`, `/images/books/*`.
- Published photos stream from configured Bunny renditions; local and empty
  states preserve layout.

## Responsive behavior

- Desktop identity: row with 15 rem portrait.
- Mobile identity: stacked, portrait first, copy second.
- Editorial column and global dock remain centered at all tested widths.

## Fork content boundary

The layout, components and motion may be reused under MIT. Names, biographies,
portraits, writing, personal registries, logos and third-party assets must be
replaced or separately licensed before publication.

