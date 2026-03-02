## Common AI Mistakes (Avoid in This Repo)

This repository has a **locked UI baseline**. AI assistance must be conservative and only do what is explicitly requested.

### Do not refactor UI structure unless asked
- Don’t change DOM hierarchy, wrappers, grids/flex layouts, breakpoints, or section order.
- Don’t “clean up” classnames or reorganize markup.

### Do not rename components unless asked
- Keep existing component names, exports, and file names stable.
- Do not rename props/functions for style or preference.

### Do not change styling systems
- Do not introduce new color palettes, token schemes, typography scales, or spacing systems.
- Do not replace Tailwind/CSS-variable usage with a different approach.

### Do not modify unrelated files
- Only edit files explicitly listed in the prompt.
- Avoid drive-by fixes, formatting changes, or dependency bumps unless requested.

### Do not introduce new design patterns
- No new layout conventions, new section templates, or new visual patterns without explicit instruction.

### Do not replace existing components with alternatives
- Don’t swap in different component libraries or rewrite primitives.
- Reuse existing components and patterns already present in the codebase.
