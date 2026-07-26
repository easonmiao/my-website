# HooMee No.3 secondary and tertiary behaviors

- Navigation remains visible while scrolling and preserves the same pill
  geometry across every active route.
- Listing cards are whole-card links. Hover lifts at most 2px; focus uses a
  visible outline; touch has no hover dependency.
- Long-form details/FAQ controls use native `details` behavior.
- Tujie functional IDs and event contracts are preserved.
- Article pages use ordinary document scrolling and visible inline links.
- All optional transitions animate transform and opacity only.
- `prefers-reduced-motion: reduce` disables all transitions and animations.
- Desktop listing layout uses two-column feature and three-column cards;
  ≤760px stacks all sections to one column.
