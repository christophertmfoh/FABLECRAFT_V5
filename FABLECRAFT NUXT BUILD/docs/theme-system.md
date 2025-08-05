# Theme System Documentation

## Overview

The Fablecraft theme system is built with Nuxt 3 + Tailwind CSS following industry best practices for SSR-safe, performant theming.

## Architecture

### 1. CSS Variables Foundation

- **Location**: `assets/css/theme-system.css`
- **Approach**: HSL-based CSS custom properties
- **Themes**: 15 production-ready themes + system theme
- **Pattern**: `data-theme` attribute on document element

### 2. Tailwind Integration

- **Config**: `tailwind.config.ts`
- **Colors**: Dynamic color aliases referencing CSS variables
- **Support**: Full opacity utilities with `<alpha-value>`

### 3. SSR-Safe Implementation

- **Composable**: `composables/useTheme.ts`
- **Persistence**: Cookie-based (SSR) + localStorage (client)
- **No Flash**: Theme applied before hydration

## Usage

### Basic Theme Switching

```vue
<script setup>
const { themes, currentTheme, setTheme } = useTheme()
</script>

<template>
  <button v-for="theme in themes" :key="theme.name" @click="setTheme(theme.name)">
    {{ theme.label }}
  </button>
</template>
```

### Access Current Theme

```vue
<script setup>
const { currentTheme } = useTheme()
</script>

<template>
  <div>Current theme: {{ currentTheme }}</div>
</template>
```

## Theme Structure

Each theme defines these CSS variables:

- **Colors**: background, foreground, card, primary, secondary, etc.
- **States**: muted, accent, destructive
- **Special**: orb colors, auth button styles
- **Borders**: border, input, ring colors

## Best Practices Implemented

1. **SSR-Safe**: Uses cookies for server-side theme persistence
2. **No Flash**: Theme applied via `useHead` before hydration
3. **Centralized**: Single composable manages all theme logic
4. **Performance**: CSS variables allow runtime switching without rebuilds
5. **Accessibility**: WCAG 2.2 AA compliant color contrasts

## Adding New Themes

1. Add theme definition in `assets/css/theme-system.css`:

```css
[data-theme='your-theme'] {
  --background: 45 25% 96%;
  --foreground: 15 25% 15%;
  /* ... other variables */
}
```

2. Add to theme list in `composables/useTheme.ts`:

```ts
const themes = [
  // ... existing themes
  { name: 'your-theme', label: 'Your Theme', category: 'Custom' },
]
```

## Performance Notes

- CSS variables are resolved at runtime (no build step needed)
- Tailwind JIT only includes used utilities
- Cookie-based persistence prevents unnecessary client-side work
- No JavaScript required for theme display (CSS-only)
