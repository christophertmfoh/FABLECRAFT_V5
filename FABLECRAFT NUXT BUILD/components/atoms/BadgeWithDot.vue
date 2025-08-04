<template>
  <div :class="containerClasses">
    <div
      :class="dotClasses"
      aria-hidden="true"
    />
    <Badge
      :class="badgeClasses"
      :aria-label="ariaLabel"
    >
      <slot />
    </Badge>
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'
import Badge from './Badge.vue'

// Component props
interface BadgeWithDotProps {
  /**
   * Additional classes for the container
   */
  class?: string | Record<string, boolean> | string[]
  /**
   * Additional classes for the dot
   */
  dotClass?: string | Record<string, boolean> | string[]
  /**
   * Additional classes for the badge
   */
  badgeClass?: string | Record<string, boolean> | string[]
  /**
   * Accessible label for the badge
   */
  ariaLabel?: string
}

// Define props
const props = defineProps<BadgeWithDotProps>()

// Compute container classes
const containerClasses = computed(() => {
  return cn(
    'flex items-center justify-center gap-2',
    props.class
  )
})

// Compute dot classes
const dotClasses = computed(() => {
  return cn(
    'w-4 h-4 rounded-full animate-pulse bg-primary',
    props.dotClass
  )
})

// Compute badge classes
const badgeClasses = computed(() => {
  return cn(
    'bg-card/95 text-foreground border-border font-semibold backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300 text-base px-4 py-2',
    props.badgeClass
  )
})
</script>