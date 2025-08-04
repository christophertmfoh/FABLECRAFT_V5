# Typography Units Decision: REM vs PX

## Why We Chose REM for Typography

### Industry Consensus (2024-2025)

Based on research from multiple sources, the current best practice is:

1. **Typography**: Use `rem` units ✅
2. **Spacing/Layout**: Can use `px` or `rem` (both valid)
3. **Borders**: Usually `px` (1px borders don't need to scale)

### Our Implementation

```css
/* Typography - ALL in rem */
--text-golden-xs: 0.618rem;     /* Scales with user preference */
--text-golden-base: 1rem;       /* Respects browser settings */
--text-golden-3xl: 6.854rem;    /* Maintains proportions */

/* Letter spacing - em units */
--letter-spacing-tight: -0.025em;  /* Scales with font size */
```

### Why REM for Typography?

1. **Accessibility**: Respects user's browser font size settings
2. **WCAG Compliance**: Meets "Resize Text" criterion (200% zoom)
3. **Proportional Scaling**: Maintains harmony at all sizes
4. **User Preference**: 16px base = 1rem (user can change this)

### The Modern Debate (from dbushell.com)

Some developers now advocate:
- REM for font-size only
- PX for spacing to allow more content when fonts scale

We chose to keep spacing in our existing 4-point grid system (which could be px or rem) but ensured all typography uses rem.

### Practical Example

```css
/* User sets browser to 20px base font */
/* Our typography scales perfectly: */
--text-base: 1rem;        /* Now 20px */
--text-golden-lg: 1.618rem; /* Now 32.36px */

/* If we used px: */
font-size: 16px;  /* ❌ Stays 16px, ignores user preference */
```

### Conclusion

For Step 3 Typography Foundation, using `rem` units is the correct choice because:
- It's an accessibility requirement
- Industry standard for font sizing
- SSR-safe (no JavaScript needed)
- Respects user preferences
- Maintains mathematical ratios

This aligns with Nuxt 3 best practices and modern web standards.