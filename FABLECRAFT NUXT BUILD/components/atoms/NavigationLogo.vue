<template>
  <button type="button" :class="logoClasses" :aria-label="ariaLabel" @click="handleClick">
    <!-- Feather Icon Container (static SVG for instant loading) -->
    <div class="icon-container">
      <svg 
        class="w-7 h-7 text-primary-foreground" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
        <path d="M16 8 2 22"/>
        <path d="M17.5 15H9"/>
      </svg>
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
  /** Icon size variant (currently unused - removed for simplicity) */
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationLogoProps>(), {
  brandText: 'Fablecraft',
  showText: true,
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
/* Icon container (matching footer solid style) - PERFORMANCE OPTIMIZED */
.icon-container {
  @apply w-14 h-14 rounded-xl flex items-center justify-center shadow-md;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
  transition: all 0.3s ease;
  /* CRITICAL: Reserve exact space to prevent layout shifts */
  min-width: 3.5rem;
  min-height: 3.5rem;
  width: 3.5rem;
  height: 3.5rem;
}

.icon-container:hover {
  @apply shadow-lg scale-105;
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

  .icon-container:hover {
    @apply scale-100;
  }
}
</style>
