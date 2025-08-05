<template>
  <AtomsButton
    :class="authButtonClasses"
    :aria-label="ariaLabel"
    :disabled="loading"
    @click="handleClick"
  >
    <span class="auth-button-content">
      <!-- Loading state icon -->
      <AtomsAtomIcon
        v-if="loading"
        name="lucide:loader-2"
        size="sm"
        class="mr-2 animate-spin"
        aria-hidden="true"
      />
      
      <!-- Auth icon (when not loading) -->
      <AtomsAtomIcon
        v-else
        :name="iconName"
        size="sm"
        class="mr-2"
        aria-hidden="true"
      />
      
      <!-- Button text -->
      {{ buttonText }}
    </span>
  </AtomsButton>
</template>

<script setup lang="ts">
import { cn } from '../atoms/Utils'

// Component props interface
interface AuthButtonProps {
  /** Custom button text */
  text?: string
  /** Loading state */
  loading?: boolean
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Button size */
  size?: 'sm' | 'default' | 'lg'
  /** Icon to display */
  icon?: string
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<AuthButtonProps>(), {
  text: 'Sign Up / Sign In',
  loading: false,
  variant: 'primary',
  size: 'default',
  icon: 'lucide:users',
})

// Define emits
const emit = defineEmits<{
  click: []
}>()

// Computed button text
const buttonText = computed(() => {
  if (props.loading) {
    return 'Please wait...'
  }
  return props.text
})

// Computed icon name
const iconName = computed(() => {
  return props.icon
})

// Computed aria label
const ariaLabel = computed(() => {
  return props.ariaLabel || props.text
})

// Handle click event
const handleClick = () => {
  if (props.loading) return
  emit('click')
}

// Compute auth button classes
const authButtonClasses = computed(() => {
  return cn(
    // Base button styling handled by AtomsButton
    'group transition-all duration-300 hover:scale-105 rounded-xl',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    
    // Variant-specific styles
    props.variant === 'primary' && [
      'bg-primary hover:bg-primary/90 text-primary-foreground',
      'shadow-md hover:shadow-lg'
    ],
    
    props.variant === 'secondary' && [
      'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
      'shadow-md hover:shadow-lg'
    ],
    
    props.variant === 'outline' && [
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      'shadow-sm hover:shadow-md'
    ],
    
    props.variant === 'ghost' && [
      'hover:bg-accent hover:text-accent-foreground'
    ],
    
    // Size-specific styles
    props.size === 'lg' && 'px-8 py-3 text-base font-semibold',
    props.size === 'default' && 'px-4 py-2 font-semibold',
    props.size === 'sm' && 'px-3 py-1.5 text-sm font-medium',
    
    // Loading state
    props.loading && 'opacity-80 cursor-not-allowed',
    
    // Custom classes
    props.class
  )
})
</script>

<style scoped>
.auth-button-content {
  @apply flex items-center justify-center;
}

/* Enhanced loading animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Focus enhancement */
.group:focus-visible {
  @apply outline-none;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    @apply transition-none;
  }
  
  .hover\:scale-105 {
    @apply scale-100;
  }
  
  .animate-spin {
    @apply animate-none;
  }
  
  .group:hover {
    @apply scale-100;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .group {
    @apply border-2 border-current;
  }
}

/* Touch device improvements */
@media (hover: none) and (pointer: coarse) {
  .group {
    @apply active:scale-95; /* Tap feedback instead of hover */
  }
}
</style>