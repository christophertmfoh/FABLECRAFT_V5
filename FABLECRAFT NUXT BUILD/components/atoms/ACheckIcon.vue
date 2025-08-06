<template>
  <Icon
    :name="iconName"
    :class="iconClasses"
    :aria-label="ariaLabel"
    :aria-hidden="ariaHidden"
  />
</template>

<script setup lang="ts">
interface CheckIconProps {
  /**
   * Visual variant of the check icon
   * @default 'default'
   */
  variant?: 'default' | 'success' | 'primary' | 'muted'
  
  /**
   * Size of the check icon
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the feature is included/active
   * @default true
   */
  included?: boolean
  
  /**
   * Accessibility label for screen readers
   */
  label?: string
  
  /**
   * Additional CSS classes
   */
  class?: string
  
  /**
   * Whether to hide from screen readers
   * @default false
   */
  ariaHidden?: boolean
}

const props = withDefaults(defineProps<CheckIconProps>(), {
  variant: 'default',
  size: 'md',
  included: true,
  ariaHidden: false
})

// Icon name based on inclusion state
const iconName = computed(() => 
  props.included ? 'lucide:check-circle' : 'lucide:x-circle'
)

// Accessibility label
const ariaLabel = computed(() => {
  if (props.label) return props.label
  return props.included ? 'Feature included' : 'Feature not included'
})

// Dynamic classes using cva for consistent variants
const iconClasses = computed(() => {
  const baseClasses = 'flex-shrink-0 transition-colors duration-200'
  
  // Size variants
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  }
  
  // Color variants based on inclusion and variant
  const colorClasses = {
    default: props.included 
      ? 'text-primary' 
      : 'text-muted-foreground',
    success: props.included 
      ? 'text-success' 
      : 'text-destructive',
    primary: props.included 
      ? 'text-primary' 
      : 'text-muted-foreground',
    muted: props.included 
      ? 'text-muted-foreground' 
      : 'text-muted-foreground/50'
  }
  
  return [
    baseClasses,
    sizeClasses[props.size],
    colorClasses[props.variant],
    props.class
  ].filter(Boolean).join(' ')
})
</script>

<style scoped>
/**
 * ACheckIcon Component Styles
 * 
 * Provides consistent visual styling for feature checkmarks
 * in pricing tables and feature lists.
 */

/* Icon hover effects */
.check-icon:hover {
  @apply scale-110 transition-transform duration-200;
}

/* Theme-aware color adjustments */
.dark .check-icon {
  filter: brightness(1.1);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .check-icon {
    filter: contrast(1.2);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .check-icon {
    @apply transition-none;
  }
}
</style>