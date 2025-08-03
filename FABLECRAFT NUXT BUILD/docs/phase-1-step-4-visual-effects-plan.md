# Visual Effects Implementation Plan

## Analysis of Old Build

### Firefly Effect (Old Build)
- **Visual**: Small glowing particles (2-4px) that drift upward from bottom of screen
- **Movement**: Curved drift pattern with horizontal sway
- **Variants**: 
  - Small (2px, opacity 0.4)
  - Normal (3px, opacity 0.8)
  - Bright (4px, opacity 0.8)
- **Animation**: 
  - Drift: 10-18s duration, moves from bottom -10px to 100vh
  - Glow: 3-5s breathing effect
- **Positioning**: Spread across screen width (8%, 16%, 28%, 37%, etc.)
- **Colors**: Uses theme colors with radial gradients

### Floating Orbs (Old Build)
- **Visual**: Large blurred circles (180-320px)
- **Movement**: Gentle floating with scale changes
- **Positioning**:
  - Orb 1: 320px, top 15%, left 8%
  - Orb 2: 220px, top 65%, right 15%
  - Orb 3: 180px, bottom 25%, left 55%
- **Animation**: 25s float animation with translateY/X and scale
- **Blur**: 80px filter blur
- **Opacity**: 0.2

## Nuxt 3 Implementation Strategy

### 1. Fix Firefly Component
- Generate fireflies dynamically with proper positioning
- Use absolute positioning spread across viewport width
- Implement upward drift animation from bottom
- Add glow breathing effect
- Ensure visibility with proper z-index

### 2. Fix Background Orbs Component
- Position orbs correctly across viewport (not stuck on right)
- Implement proper float animation
- Use CSS blur filter for soft effect
- Ensure proper layering

### 3. Fix State Management
- Use Nuxt 3 useState for SSR-safe state
- Connect checkboxes to actual effect visibility
- Make firefly count slider functional
- Ensure performance mode affects animations

### 4. Performance Optimizations (2024-2025 Standards)
- Use CSS transforms for GPU acceleration
- Implement will-change for animated properties
- Use CSS containment for isolation
- Add prefers-reduced-motion support
- Optimize with IntersectionObserver

## Implementation Steps

1. **Fix FireflyEffect.vue**
   - Generate fireflies with spread positioning
   - Implement proper drift animation
   - Add size variants
   - Fix visibility issues

2. **Fix BackgroundOrbs.vue**
   - Position orbs correctly
   - Implement float animation
   - Fix blur and opacity

3. **Fix State Reactivity**
   - Connect controls to actual effects
   - Ensure state changes update visuals
   - Fix checkbox bindings

4. **Update CSS**
   - Add missing animations
   - Fix positioning classes
   - Ensure GPU optimization