## UI System — Baseline Locked (v0)

### Baseline lock statement
The current UI (layout, styling, and component hierarchy) is **locked as the baseline**. This project was generated from a one-shot v0 UI, and that design is the reference implementation.

### Rule: design must not drift
Do **not** change **layout, structure, styling, spacing, typography, or component hierarchy** unless the prompt **explicitly requests** those changes.

This includes (but is not limited to) DOM structure, section order, wrappers/containers, grid/flex structure, and Tailwind class sets.

---

## Allowed changes (safe)
- Copy updates (text content, labels, headings) without changing layout.
- Wiring data (connect UI to APIs, replace mock data) while keeping the same rendered structure.
- Adding props to existing components (optional flags, callbacks, IDs).
- Adding state/handlers for UI behavior (loading, disabled, submit, error messages) without redesigning.
- Minor spacing fixes **only if explicitly requested** or required to fix an obvious regression (keep changes minimal and localized).

---

## Forbidden changes (unless explicitly requested)
- Rewriting or redesigning sections (Hero/Browse/Review/Footer/etc.).
- Replacing existing components with alternatives (new UI kits, different primitives, different patterns).
- Restructuring the DOM or component tree (moving wrappers, changing nesting, changing grid/flex layout, changing breakpoints).
- Changing the styling system (new token scheme, new color palette, new spacing scale, new typography scale).
- “Cleanup refactors” that alter markup/classnames even if visually similar.

---

## Working rule of thumb
If the change would cause a screenshot diff, it is **not allowed** unless explicitly requested.
