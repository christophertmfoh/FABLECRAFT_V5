# Step 4: Visual Effects - Performance Research Findings (2024-2025)

## 🔍 Key Research Insights

### 1. GPU Acceleration is Mandatory

**Transform & Opacity Only**:
- These properties bypass layout and paint phases
- Direct GPU compositing = 60fps performance
- Granola.ai case study: 60% CPU reduction by replacing height animations

**Properties to Use**:
```css
/* ✅ GPU-Accelerated */
transform: translateX/Y/Z()
transform: scale()
transform: rotate()
opacity: 0-1
filter: (with caution)
```

**Properties to Avoid**:
```css
/* ❌ Causes Reflow/Repaint */
width, height
margin, padding
top, left, right, bottom
background-color
box-shadow (without will-change)
```

### 2. Will-Change Usage (2024 Best Practices)

**Do**:
- Apply just before animation
- Remove after animation completes
- Use for expensive properties only

**Don't**:
- Apply globally or to many elements
- Leave on indefinitely (memory leak)
- Use on properties already GPU-accelerated

```javascript
// Correct usage
element.style.willChange = 'transform';
// Animate...
setTimeout(() => {
  element.style.willChange = 'auto';
}, animationDuration);
```

### 3. Performance Metrics That Matter

From DebugBear's 2024 Nuxt SSR guide:
- **TTFB**: < 200ms (server response)
- **FCP**: < 1.8s (first content)
- **LCP**: < 2.5s (largest content)
- **CLS**: 0 (no layout shift)

### 4. Animation vs Transition Performance

Dev.to performance tests (2024) show:
- **Transitions**: 14.11% less memory usage
- **Animations**: 16.80% lower FPS at scale
- **Conclusion**: Use transitions for simple state changes

### 5. Modern Optimization Techniques

**CSS Containment** (2024 standard):
```css
.effect-container {
  contain: layout style paint;
}
```

**Intersection Observer** (performance pattern):
```javascript
// Only animate visible elements
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.style.animationPlayState = 
      entry.isIntersecting ? 'running' : 'paused';
  });
});
```

### 6. Accessibility Requirements

**Prefers-Reduced-Motion** (WCAG 2.1):
```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
    transition: none !important;
  }
}
```

### 7. SSR-Specific Considerations

For Nuxt 3 + SSR:
- No client-only animations in initial HTML
- Use v-if="isClient" for effect components
- CSS animations work during SSR, JS doesn't
- Avoid hydration mismatches

## 📊 Performance Benchmarks

Based on industry research:

| Metric | Target | Why |
|--------|--------|-----|
| FPS | 60 | Smooth animation |
| Paint Time | < 5ms | No jank |
| GPU Memory | < 10MB | Mobile friendly |
| CLS | 0 | No layout shift |
| CPU Usage | < 10% | Battery life |

## 🚀 Implementation Strategy

1. **CSS-First**: All core animations in CSS
2. **Progressive Enhancement**: JS for advanced features only
3. **Performance Budget**: Max 12 animated elements
4. **Mobile First**: Test on mid-range devices
5. **Accessibility First**: Reduced motion by default

## 🔗 References

- [DebugBear: Nuxt SSR Performance (2024)](https://www.debugbear.com/blog/nuxt-ssr-performance)
- [Dev.to: CSS Animation Performance (2024)](https://dev.to/senior-debugger/css-animation-vs-transition)
- [Granola.ai: Don't Animate Height](https://www.granola.ai/blog/dont-animate-height)
- [Medium: Will-Change Best Practices (2025)](https://medium.com/design-bootcamp/improve-css-animation-with-will-change)
- [Chuck's Academy: Animation Optimization](https://www.chucksacademy.com/en/topic/css-animations/animation-best-practices)