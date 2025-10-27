<template>
  <component 
    :is="tag"
    :class="textClasses"
    :style="gradientStyles"
    v-bind="$attrs"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface GradientTextProps {
  text?: string
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div'
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'custom'
  direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
  intensity?: 'subtle' | 'normal' | 'vibrant'
  animation?: 'none' | 'shimmer' | 'pulse' | 'flow'
  className?: string
}

// Component setup
const props = withDefaults(defineProps<GradientTextProps>(), {
  text: '',
  tag: 'span',
  variant: 'primary',
  direction: 'to-r',
  intensity: 'normal',
  animation: 'none',
  className: ''
})

// Computed classes
const textClasses = computed(() => {
  const animationClasses = {
    none: '',
    shimmer: 'animate-shimmer',
    pulse: 'animate-pulse',
    flow: 'animate-flow'
  }

  return cn(
    'bg-clip-text text-transparent font-inherit',
    'transition-all duration-300',
    animationClasses[props.animation],
    props.className
  )
})

// Computed gradient styles
const gradientStyles = computed(() => {
  const gradientConfigs = {
    primary: {
      subtle: 'linear-gradient({direction}, hsl(var(--primary)), hsl(var(--primary) / 0.7))',
      normal: 'linear-gradient({direction}, hsl(var(--primary)), hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.6))',
      vibrant: 'linear-gradient({direction}, hsl(var(--primary)), hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.6))'
    },
    secondary: {
      subtle: 'linear-gradient({direction}, hsl(var(--secondary)), hsl(var(--secondary) / 0.7))',
      normal: 'linear-gradient({direction}, hsl(var(--secondary)), hsl(var(--secondary) / 0.8))',
      vibrant: 'linear-gradient({direction}, hsl(var(--secondary)), hsl(var(--primary)))'
    },
    accent: {
      subtle: 'linear-gradient({direction}, hsl(var(--accent)), hsl(var(--accent) / 0.7))',
      normal: 'linear-gradient({direction}, hsl(var(--accent)), hsl(var(--accent) / 0.8))',
      vibrant: 'linear-gradient({direction}, hsl(var(--accent)), hsl(var(--primary)))'
    },
    rainbow: {
      subtle: 'linear-gradient({direction}, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))',
      normal: 'linear-gradient({direction}, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary) / 0.8))',
      vibrant: 'linear-gradient({direction}, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary)), hsl(var(--accent)))'
    },
    custom: {
      subtle: 'linear-gradient({direction}, currentColor, transparent)',
      normal: 'linear-gradient({direction}, currentColor, hsl(var(--muted-foreground)))',
      vibrant: 'linear-gradient({direction}, currentColor, hsl(var(--primary)))'
    }
  }

  const directionMap = {
    'to-r': 'to right',
    'to-l': 'to left', 
    'to-t': 'to top',
    'to-b': 'to bottom',
    'to-br': 'to bottom right',
    'to-bl': 'to bottom left',
    'to-tr': 'to top right',
    'to-tl': 'to top left'
  }

  const gradient = gradientConfigs[props.variant][props.intensity]
    .replace('{direction}', directionMap[props.direction])

  return {
    backgroundImage: gradient,
    // Ensure proper text rendering across all themes
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    // Fallback for theme compatibility
    backgroundClip: 'text'
  }
})
</script>

<style scoped>
/* Custom animations for gradient text */
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes flow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-shimmer {
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

.animate-flow {
  background-size: 400% 400%;
  animation: flow 4s ease infinite;
}

/* Enhanced accessibility and fallbacks */
@media (prefers-reduced-motion: reduce) {
  .animate-shimmer,
  .animate-flow,
  .animate-pulse {
    animation: none;
  }
}

/* Fix webkit gradient text descender clipping */
.bg-clip-text {
  /* Ensure descenders aren't clipped in webkit gradient text */
  line-height: 1.2 !important;
  padding-bottom: 0.1em; /* Minimal padding for descenders */
  /* Webkit-specific fix for descender clipping */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

/* High contrast mode fallback */
@media (prefers-contrast: high) {
  .bg-clip-text {
    background-image: none !important;
    background-clip: unset !important;
    text-fill-color: unset !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: unset !important;
    color: hsl(var(--foreground));
  }
}

/* Print optimization */
@media print {
  .bg-clip-text {
    background-image: none !important;
    background-clip: unset !important;
    text-fill-color: unset !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: unset !important;
    color: black;
  }
}
</style>