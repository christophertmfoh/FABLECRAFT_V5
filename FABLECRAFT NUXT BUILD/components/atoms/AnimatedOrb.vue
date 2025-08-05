<template>
  <div :class="orbClasses" :style="orbStyles">
    <div class="orb-inner" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface AnimatedOrbProps {
  size?: 'sm' | 'md' | 'lg'
  animation?: 'pulse' | 'spin' | 'bounce' | 'glow'
  colors?: {
    primary?: string
    secondary?: string
  }
  class?: string
}

// Component setup
const props = withDefaults(defineProps<AnimatedOrbProps>(), {
  size: 'md',
  animation: 'pulse',
  colors: () => ({
    primary: 'hsl(var(--orb-primary))',
    secondary: 'hsl(var(--orb-secondary))',
  }),
  class: '',
})

// Computed properties
const orbClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    glow: 'animate-pulse animate-bounce',
  }

  return cn(
    'rounded-full',
    'relative overflow-hidden',
    'inline-block',
    sizeClasses[props.size],
    animationClasses[props.animation],
    props.class
  )
})

const orbStyles = computed(() => {
  const primary = props.colors?.primary || 'hsl(var(--orb-primary))'
  const secondary = props.colors?.secondary || 'hsl(var(--orb-secondary))'

  return {
    background: `linear-gradient(45deg, ${primary}, ${secondary})`,
    backgroundSize: '200% 200%',
    animation: `gradient-shift 3s ease infinite, ${props.animation === 'pulse' ? 'pulse' : props.animation} 2s ease-in-out infinite`,
  }
})
</script>

<style scoped>
/* Gradient animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Enhanced glow effect */
.orb-inner {
  @apply absolute inset-0 rounded-full;
  background: inherit;
  filter: blur(1px);
  opacity: 0.7;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-spin,
  .animate-bounce {
    animation: none;
  }

  div {
    animation: none !important;
  }
}

/* Custom animation variants */
.animate-glow {
  animation:
    pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite,
    bounce 2s ease-in-out infinite;
}

/* Hover enhancement */
.orb-container:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>
