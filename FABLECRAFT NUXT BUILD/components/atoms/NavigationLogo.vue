<template>
  <button
    type="button"
    :class="logoClasses"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <!-- Feather Icon Container (matching React original) -->
    <div class="icon-container">
      <AtomIcon 
        name="lucide:feather" 
        class="w-7 h-7 text-primary" 
        aria-hidden="true" 
      />
    </div>
    
    <!-- Brand Text (matching React original) -->
    <span v-if="showText" class="brand-text">
      {{ brandText }}
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

// Compute logo classes (matching React original)
const logoClasses = computed(() => {
  return cn(
    'group flex items-center space-x-3 cursor-pointer',
    'transition-all duration-300 hover:scale-105',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'rounded-lg p-2 -m-2',
    props.class
  )
})
</script>

<style scoped>
/* Icon container (exact match to React version) */
.icon-container {
  @apply w-14 h-14 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-center shadow-md;
  @apply group-hover:shadow-lg group-hover:scale-105 transition-all duration-300;
}

/* Brand text (slightly smaller for better proportions) */
.brand-text {
  @apply text-2xl font-black text-foreground tracking-wide;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .icon-container,
  .brand-text {
    @apply transition-none;
  }
  
  .group:hover .icon-container {
    @apply scale-100;
  }
}
</style>