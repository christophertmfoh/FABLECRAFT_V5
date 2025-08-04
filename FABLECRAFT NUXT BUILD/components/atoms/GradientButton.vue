<template>
  <Button
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <!-- Gradient overlay that appears on hover -->
    <div
      v-if="showGradientOverlay"
      :class="overlayClasses"
      aria-hidden="true"
    />
    
    <!-- Button content with relative positioning to stay above overlay -->
    <span class="relative z-10 flex items-center justify-center">
      <slot />
    </span>
  </Button>
</template>

<script setup lang="ts">
import { cn } from './Utils'
import Button from './Button.vue'

// Component props
interface GradientButtonProps {
  /**
   * Whether to show the gradient overlay
   * @default true
   */
  showGradientOverlay?: boolean
  /**
   * Custom gradient colors for the overlay
   * @default 'from-white/20 to-transparent'
   */
  gradientColors?: string
  /**
   * Duration of the gradient transition
   * @default 'duration-500'
   */
  gradientDuration?: string
  /**
   * Additional classes for the button
   */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<GradientButtonProps>(), {
  showGradientOverlay: true,
  gradientColors: 'from-white/20 to-transparent',
  gradientDuration: 'duration-500'
})

// Compute button classes
const buttonClasses = computed(() => {
  return cn(
    'relative overflow-hidden group',
    // Default primary button styles if no variant is specified
    !$attrs.variant && 'bg-primary hover:bg-primary/90 text-primary-foreground',
    props.class
  )
})

// Compute overlay classes
const overlayClasses = computed(() => {
  return cn(
    'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity',
    props.gradientColors,
    props.gradientDuration
  )
})
</script>