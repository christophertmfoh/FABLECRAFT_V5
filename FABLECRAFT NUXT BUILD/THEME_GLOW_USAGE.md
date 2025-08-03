# ThemeGlow Component Usage Guide

A reusable, theme-aware glow effect component for Nuxt 3 that automatically adapts to all 15 themes.

## Features

- ✅ **Theme-aware**: Automatically uses theme colors (primary/secondary)
- ✅ **SSR-safe**: No hydration mismatches
- ✅ **Performance optimized**: GPU acceleration, lazy loading, containment
- ✅ **Accessible**: Respects `prefers-reduced-motion`
- ✅ **Flexible positioning**: Predefined positions or custom placement
- ✅ **Multiple sizes**: From small accents to full-page glows
- ✅ **Interactive options**: Hover effects, animations
- ✅ **No bloat**: Zero dependencies, pure CSS

## Basic Usage

```vue
<template>
  <!-- Simple glow behind a card -->
  <UiThemeGlow>
    <div class="card">
      <h2>Card Title</h2>
      <p>Card content with a beautiful glow effect behind it.</p>
    </div>
  </UiThemeGlow>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'center' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'custom'` | `'center'` | Glow position |
| `customPosition` | `{ x: string, y: string }` | - | Custom position when `position="custom"` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Glow size |
| `intensity` | `number` | `1` | Opacity multiplier (0-1) |
| `blur` | `boolean` | `true` | Apply blur filter |
| `animate` | `boolean` | `false` | Enable pulse animation |
| `interactive` | `boolean` | `false` | Enable hover effects |
| `lazy` | `boolean` | `false` | Lazy load with Intersection Observer |

## Examples

### Hero Section with Animated Glow

```vue
<template>
  <UiThemeGlow 
    size="xl" 
    position="top-right" 
    :animate="true"
    :intensity="0.8"
  >
    <section class="hero">
      <h1>Welcome to FableCraft</h1>
      <p>Build amazing experiences with our modern stack.</p>
      <button class="cta-button">Get Started</button>
    </section>
  </UiThemeGlow>
</template>
```

### Interactive Card with Hover Glow

```vue
<template>
  <UiThemeGlow 
    size="sm" 
    :interactive="true"
    :blur="true"
  >
    <article class="feature-card">
      <Icon name="rocket" />
      <h3>Lightning Fast</h3>
      <p>Optimized for performance with SSR and edge rendering.</p>
    </article>
  </UiThemeGlow>
</template>
```

### Custom Positioned CTA

```vue
<template>
  <UiThemeGlow 
    position="custom"
    :customPosition="{ x: '70%', y: '30%' }"
    size="md"
    :intensity="0.6"
  >
    <div class="cta-section">
      <h2>Ready to start?</h2>
      <button>Sign up now</button>
    </div>
  </UiThemeGlow>
</template>
```

### Full Page Background Glow

```vue
<template>
  <div class="page-container">
    <!-- Full page subtle glow -->
    <UiThemeGlow 
      size="full" 
      :intensity="0.3"
      :blur="false"
      class="fixed inset-0"
    />
    
    <!-- Page content -->
    <main class="relative z-10">
      <!-- Your content here -->
    </main>
  </div>
</template>
```

### Lazy Loading for Performance

```vue
<template>
  <!-- Only render glow when section is in viewport -->
  <UiThemeGlow 
    :lazy="true"
    size="lg"
    :animate="true"
  >
    <section class="testimonials">
      <!-- Heavy content that loads later -->
    </section>
  </UiThemeGlow>
</template>
```

### Multiple Glows Composition

```vue
<template>
  <div class="multi-glow-section">
    <!-- Primary glow -->
    <UiThemeGlow 
      position="top-left" 
      size="lg"
      :intensity="0.5"
    />
    
    <!-- Secondary glow -->
    <UiThemeGlow 
      position="bottom-right" 
      size="md"
      :intensity="0.3"
    />
    
    <!-- Content -->
    <div class="content">
      <!-- Your content here -->
    </div>
  </div>
</template>
```

## Styling Considerations

The component uses CSS `isolation: isolate` to create a new stacking context, ensuring the glow stays behind the content. The content is automatically placed above the glow with `z-index: 1`.

### Custom Styling

You can override styles using CSS:

```css
/* Make glow more intense for a specific section */
.hero-section .theme-glow__gradient {
  filter: blur(60px) !important;
}

/* Custom blend mode for special cases */
.dark-section .theme-glow__gradient {
  mix-blend-mode: color-dodge;
}
```

## Performance Tips

1. **Use appropriate sizes**: Don't use `xl` or `full` for small components
2. **Enable lazy loading**: For below-the-fold content
3. **Limit animations**: Use sparingly for best performance
4. **Mobile considerations**: The component automatically reduces effects on mobile

## Theme Compatibility

The component automatically adjusts for each theme:

- **Light themes**: Uses `overlay` blend mode with higher intensity
- **Dark themes**: Uses `screen` blend mode for additive glow
- **Colors**: Pulls from theme's `--primary` and `--secondary` CSS variables

## Migration from Old Atmospheric Glow

Replace old atmospheric glow usage:

```vue
<!-- Old -->
<div class="atmospheric-gradient" />

<!-- New -->
<UiThemeGlow size="full" :intensity="0.5" />
```

## Browser Support

- Modern browsers with CSS `radial-gradient` support
- CSS `mix-blend-mode` support (graceful degradation)
- Intersection Observer API (for lazy loading)

The component gracefully degrades in older browsers, showing content without the glow effect.