<template>
  <div class="theme-glow" :class="glowClasses">
    <!-- Slot for content that sits above the glow -->
    <div class="theme-glow__content">
      <slot />
    </div>
    
    <!-- The glow effects layer -->
    <div 
      v-if="!reducedMotion"
      class="theme-glow__effects"
      :style="customProperties"
      aria-hidden="true"
    >
      <div class="theme-glow__gradient"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // Glow positioning
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom'
  customPosition?: { x: string; y: string }
  
  // Glow sizing
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  intensity?: number // 0-1, controls opacity multiplier
  
  // Glow behavior
  blur?: boolean
  animate?: boolean
  interactive?: boolean // Responds to hover
  
  // Performance
  lazy?: boolean // Only render when in viewport
}

const props = withDefaults(defineProps<Props>(), {
  position: 'center',
  size: 'md',
  intensity: 1,
  blur: true,
  animate: false,
  interactive: false,
  lazy: false
})

// Respect user motion preferences
const reducedMotion = usePreferredReducedMotion()

// Position mappings
const positionMap = {
  'center': { x: '50%', y: '50%' },
  'top-left': { x: '20%', y: '20%' },
  'top-right': { x: '80%', y: '20%' },
  'bottom-left': { x: '20%', y: '80%' },
  'bottom-right': { x: '80%', y: '80%' }
}

// Size mappings (in pixels for consistent rendering)
const sizeMap = {
  'sm': { primary: '300px', secondary: '200px' },
  'md': { primary: '500px', secondary: '400px' },
  'lg': { primary: '700px', secondary: '600px' },
  'xl': { primary: '900px', secondary: '800px' },
  'full': { primary: '100%', secondary: '80%' }
}

// Computed position
const glowPosition = computed(() => {
  if (props.position === 'custom' && props.customPosition) {
    return props.customPosition
  }
  return positionMap[props.position] || positionMap.center
})

// Computed size
const glowSize = computed(() => {
  return sizeMap[props.size] || sizeMap.md
})

// Dynamic CSS custom properties
const customProperties = computed(() => ({
  '--glow-x': glowPosition.value.x,
  '--glow-y': glowPosition.value.y,
  '--glow-size-primary': glowSize.value.primary,
  '--glow-size-secondary': glowSize.value.secondary,
  '--glow-intensity': props.intensity
}))

// Class bindings
const glowClasses = computed(() => ({
  'theme-glow--blur': props.blur,
  'theme-glow--animate': props.animate && !reducedMotion.value,
  'theme-glow--interactive': props.interactive,
  [`theme-glow--${props.size}`]: true
}))

// Lazy loading with Intersection Observer
const glowRef = ref<HTMLElement>()
const isVisible = ref(!props.lazy)

if (props.lazy && process.client) {
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (glowRef.value) {
      observer.observe(glowRef.value)
    }
    
    onUnmounted(() => observer.disconnect())
  })
}
</script>

<style scoped>
.theme-glow {
  position: relative;
  isolation: isolate;
}

.theme-glow__content {
  position: relative;
  z-index: 1;
}

.theme-glow__effects {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  
  /* Performance optimization */
  will-change: transform;
  contain: layout style paint;
}

.theme-glow__gradient {
  position: absolute;
  inset: -50%;
  
  /* Theme-aware gradient using CSS variables from current theme */
  background: 
    radial-gradient(
      ellipse var(--glow-size-primary) var(--glow-size-primary) at var(--glow-x) var(--glow-y),
      hsl(var(--primary) / calc(0.4 * var(--glow-intensity))),
      transparent 50%
    ),
    radial-gradient(
      ellipse var(--glow-size-secondary) var(--glow-size-secondary) at var(--glow-x) var(--glow-y),
      hsl(var(--secondary) / calc(0.2 * var(--glow-intensity))),
      transparent 60%
    );
  
  /* Use the best blend mode based on theme */
  mix-blend-mode: var(--glow-blend-mode, screen);
  
  /* GPU acceleration */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Dark theme adjustments */
:root[data-theme*="dark"] .theme-glow__gradient,
:root[data-theme="midnight-ink"] .theme-glow__gradient,
:root[data-theme="netrunner"] .theme-glow__gradient,
:root[data-theme="forest-manuscript"] .theme-glow__gradient,
:root[data-theme="starlit-prose"] .theme-glow__gradient,
:root[data-theme="coffee-house"] .theme-glow__gradient,
:root[data-theme="cherry-lacquer"] .theme-glow__gradient,
:root[data-theme="dragons-hoard"] .theme-glow__gradient,
:root[data-theme="halloween"] .theme-glow__gradient {
  --glow-blend-mode: screen;
}

/* Light theme adjustments */
:root[data-theme="light"] .theme-glow__gradient,
:root[data-theme="arctic-focus"] .theme-glow__gradient,
:root[data-theme="golden-hour"] .theme-glow__gradient,
:root[data-theme="sunset-coral"] .theme-glow__gradient,
:root[data-theme="lavender-dusk"] .theme-glow__gradient,
:root[data-theme="moonlit-garden"] .theme-glow__gradient,
:root[data-theme="ocean-breeze"] .theme-glow__gradient,
:root[data-theme="cherry-blossom"] .theme-glow__gradient,
:root[data-theme="desert-sand"] .theme-glow__gradient,
:root[data-theme="vintage-coffee"] .theme-glow__gradient {
  --glow-blend-mode: overlay;
  
  /* Boost intensity for light themes */
  background: 
    radial-gradient(
      ellipse var(--glow-size-primary) var(--glow-size-primary) at var(--glow-x) var(--glow-y),
      hsl(var(--primary) / calc(0.6 * var(--glow-intensity))),
      transparent 50%
    ),
    radial-gradient(
      ellipse var(--glow-size-secondary) var(--glow-size-secondary) at var(--glow-x) var(--glow-y),
      hsl(var(--secondary) / calc(0.3 * var(--glow-intensity))),
      transparent 60%
    );
}

/* Blur effect */
.theme-glow--blur .theme-glow__gradient {
  filter: blur(40px);
}

/* Animation */
.theme-glow--animate .theme-glow__gradient {
  animation: glow-pulse 4s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  from {
    transform: translateZ(0) scale(0.9);
    opacity: 0.7;
  }
  to {
    transform: translateZ(0) scale(1.1);
    opacity: 1;
  }
}

/* Interactive hover effect */
.theme-glow--interactive {
  transition: transform 0.3s ease;
}

.theme-glow--interactive:hover .theme-glow__gradient {
  transform: translateZ(0) scale(1.05);
}

/* Size-specific adjustments */
.theme-glow--sm .theme-glow__effects {
  inset: -20%;
}

.theme-glow--lg .theme-glow__effects,
.theme-glow--xl .theme-glow__effects {
  inset: -100%;
}

.theme-glow--full .theme-glow__effects {
  inset: 0;
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .theme-glow__gradient {
    animation: none !important;
    transition: none !important;
  }
}

/* Performance: Reduce effects on low-end devices */
@media (max-width: 768px) {
  .theme-glow__gradient {
    filter: blur(20px);
  }
  
  .theme-glow--lg .theme-glow__effects,
  .theme-glow--xl .theme-glow__effects {
    inset: -50%;
  }
}
</style>