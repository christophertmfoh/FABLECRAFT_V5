<template>
  <div :class="dotClasses" :style="dotStyles" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface PulsingDotProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  intensity?: 'subtle' | 'normal' | 'strong'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

// Component setup
const props = withDefaults(defineProps<PulsingDotProps>(), {
  size: 'md',
  color: 'primary',
  intensity: 'normal',
  speed: 'normal',
  className: '',
})

// Computed classes
const dotClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  }

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
  }

  const speedClasses = {
    slow: 'animate-pulse-slow',
    normal: 'animate-pulse',
    fast: 'animate-pulse-fast',
  }

  return cn(
    'rounded-full',
    'transition-all duration-300',
    sizeClasses[props.size],
    colorClasses[props.color],
    speedClasses[props.speed],
    props.className
  )
})

// Computed styles for opacity based on intensity
const dotStyles = computed(() => {
  const intensityValues = {
    subtle: '0.6',
    normal: '0.8',
    strong: '1.0',
  }

  return {
    opacity: intensityValues[props.intensity],
  }
})
</script>

<style scoped>
/* Custom pulse animation variants */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes pulse-fast {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced accessibility for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-pulse-slow,
  .animate-pulse-fast {
    animation: none;
    opacity: 0.8;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .rounded-full {
    border: 1px solid hsl(var(--foreground));
  }
}
</style>
