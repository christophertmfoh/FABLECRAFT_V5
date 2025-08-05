<template>
  <div class="inline-flex items-center gap-2">
    <!-- Pulsing dot -->
    <span :class="dotClasses" :aria-hidden="true">
      <span
        v-if="animated"
        class="absolute inset-0 rounded-full animate-ping"
        :class="dotPingClasses"
      />
      <span class="relative block w-full h-full rounded-full" :class="dotCoreClasses" />
    </span>

    <!-- Badge content -->
    <Badge :variant="variant" :size="size" :class="badgeClass">
      <slot />
    </Badge>
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface BadgeWithDotProps {
  // Badge props
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'landing'
  size?: 'default' | 'sm' | 'lg'
  badgeClass?: string | Record<string, boolean> | string[]

  // Dot specific props
  dotPosition?: 'left' | 'right'
  dotSize?: 'sm' | 'md' | 'lg'
  dotColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'current'
  animated?: boolean
  animationSpeed?: 'slow' | 'normal' | 'fast'
}

// Define props with defaults
const props = withDefaults(defineProps<BadgeWithDotProps>(), {
  variant: 'default',
  size: 'default',
  dotPosition: 'left',
  dotSize: 'md',
  dotColor: 'current',
  animated: true,
  animationSpeed: 'normal',
})

// Dot size classes
const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
}

// Dot color classes for core
const dotColorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-destructive',
  current: 'bg-current',
}

// Animation speed classes
const animationSpeedClasses = {
  slow: 'duration-1500',
  normal: 'duration-1000',
  fast: 'duration-700',
}

// Compute dot container classes
const dotClasses = computed(() => {
  return cn(
    'relative inline-flex',
    dotSizeClasses[props.dotSize],
    props.dotPosition === 'right' && 'order-2'
  )
})

// Compute dot ping animation classes
const dotPingClasses = computed(() => {
  return cn(
    dotColorClasses[props.dotColor],
    'opacity-75',
    animationSpeedClasses[props.animationSpeed]
  )
})

// Compute dot core classes
const dotCoreClasses = computed(() => {
  return cn(dotColorClasses[props.dotColor])
})
</script>
