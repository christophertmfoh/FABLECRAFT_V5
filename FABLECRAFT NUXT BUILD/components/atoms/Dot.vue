<template>
  <span
    :class="dotClasses"
    :aria-hidden="!ariaLabel"
    :aria-label="ariaLabel"
    :role="ariaLabel ? 'status' : undefined"
  >
    <span
      v-if="pulse && !reducedMotion"
      class="absolute inset-0 rounded-full animate-ping"
      :class="pulseClasses"
    />
    <span class="relative block w-full h-full rounded-full" :class="coreClasses" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'
import { usePreferredReducedMotion } from '~/composables/usePreferredReducedMotion'

// Component props
interface DotProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'current'
  pulse?: boolean
  pulseSpeed?: 'slow' | 'normal' | 'fast'
  pulseIntensity?: 'subtle' | 'normal' | 'strong'
  ariaLabel?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DotProps>(), {
  size: 'md',
  color: 'primary',
  pulse: true,
  pulseSpeed: 'normal',
  pulseIntensity: 'normal',
})

// Check for reduced motion preference
const reducedMotion = usePreferredReducedMotion()

// Size classes
const sizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
}

// Color classes for the core dot
const colorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-destructive',
  info: 'bg-info',
  neutral: 'bg-muted-foreground',
  current: 'bg-current',
}

// Pulse animation speed
const pulseSpeedClasses = {
  slow: 'duration-2000',
  normal: 'duration-1000',
  fast: 'duration-700',
}

// Pulse intensity (opacity)
const pulseIntensityClasses = {
  subtle: 'opacity-50',
  normal: 'opacity-75',
  strong: 'opacity-100',
}

// Computed container classes
const dotClasses = computed(() => {
  return cn('relative inline-flex', sizeClasses[props.size], props.class)
})

// Computed pulse animation classes
const pulseClasses = computed(() => {
  return cn(
    colorClasses[props.color],
    pulseSpeedClasses[props.pulseSpeed],
    pulseIntensityClasses[props.pulseIntensity]
  )
})

// Computed core dot classes
const coreClasses = computed(() => {
  return colorClasses[props.color]
})
</script>

<style scoped>
/* Custom animation duration classes that Tailwind doesn't provide */
.duration-2000 {
  animation-duration: 2s;
}

.duration-1000 {
  animation-duration: 1s;
}

.duration-700 {
  animation-duration: 0.7s;
}
</style>
