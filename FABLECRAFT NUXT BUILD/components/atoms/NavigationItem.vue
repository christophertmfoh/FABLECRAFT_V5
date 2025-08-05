<template>
  <button
    type="button"
    :class="navigationItemClasses"
    :aria-current="isActive ? 'page' : undefined"
    :aria-label="ariaLabel || `Navigate to ${label}`"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// Component props interface
interface NavigationItemProps {
  /** Navigation item label */
  label: string
  /** Navigation target (route path) */
  href?: string
  /** Whether item is currently active */
  active?: boolean
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationItemProps>(), {
  active: false,
})

// Define emits
const emit = defineEmits<{
  click: [href?: string]
}>()

// Get current route for active state detection
const route = useRoute()

// Compute active state
const isActive = computed(() => {
  // Use explicit active prop if provided
  if (props.active !== undefined) {
    return props.active
  }
  
  // Auto-detect active state based on route
  if (props.href) {
    // Handle exact match for home page
    if (props.href === '/' && route.path === '/') {
      return true
    }
    
    // Handle other routes (startsWith for nested routes)
    if (props.href !== '/' && route.path.startsWith(props.href)) {
      return true
    }
  }
  
  return false
})

// Handle click event
const handleClick = () => {
  emit('click', props.href)
}

// Compute navigation item classes
const navigationItemClasses = computed(() => {
  return cn(
    // Base styles
    'text-sm font-semibold tracking-wide cursor-pointer uppercase',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'rounded-md px-3 py-2',
    
    // State-dependent styles
    isActive.value
      ? 'text-foreground font-bold border-b-2 border-primary' // Active state
      : 'text-foreground/80 hover:text-foreground', // Inactive state
    
    // Custom classes
    props.class
  )
})
</script>

<style scoped>
/* Enhanced focus styles for better keyboard navigation */
button:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-background;
}

/* Smooth transitions with reduced motion support */
@media (prefers-reduced-motion: reduce) {
  button {
    @apply transition-none;
  }
}

/* Ensure proper text rendering for uppercase */
button {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>