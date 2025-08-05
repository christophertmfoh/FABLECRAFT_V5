<template>
  <button
    type="button"
    :class="logoClasses"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <!-- Simplified: Just text for now -->
    <span class="text-2xl font-bold text-primary">
      🪶 {{ brandText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// Component props interface
interface NavigationLogoProps {
  /** Brand text to display */
  brandText?: string
  /** Whether to show brand text */
  showText?: boolean
  /** Icon size variant */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationLogoProps>(), {
  brandText: 'Fablecraft',
  showText: true,
  iconSize: 'lg',
  ariaLabel: 'Navigate to homepage',
})

// Define emits
const emit = defineEmits<{
  click: []
}>()

// Handle click event
const handleClick = () => {
  emit('click')
}

// Compute logo classes
const logoClasses = computed(() => {
  return cn(
    'group flex items-center space-x-3 cursor-pointer',
    'transition-all duration-300 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'rounded-lg p-2 -m-2',
    'hover:scale-105',
    props.class
  )
})
</script>

<style scoped>
.icon-container {
  @apply w-14 h-14 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-center shadow-md;
  @apply group-hover:shadow-lg transition-all duration-300;
}

.brand-text {
  @apply text-3xl font-black text-foreground tracking-wide;
  @apply transition-colors duration-300;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .icon-container,
  .brand-text {
    @apply transition-none;
  }
  
  .group:hover {
    @apply scale-100;
  }
}

/* Focus styles for better keyboard navigation */
.group:focus-visible .icon-container {
  @apply ring-2 ring-primary ring-offset-2;
}
</style>