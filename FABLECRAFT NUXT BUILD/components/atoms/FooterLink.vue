<template>
  <button
    type="button"
    :class="footerLinkClasses"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface FooterLinkProps {
  text: string          // Link text
  href?: string         // Link URL (optional for now)
  variant?: 'default' | 'subtle' | 'legal'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

// Events interface
interface FooterLinkEmits {
  (e: 'click', payload: { text: string; href?: string }): void
}

// Component setup
const props = withDefaults(defineProps<FooterLinkProps>(), {
  variant: 'default',
  size: 'md',
  class: ''
})

const emit = defineEmits<FooterLinkEmits>()

// Computed properties
const footerLinkClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const variantClasses = {
    default: 'text-foreground/60 hover:text-foreground',
    subtle: 'text-foreground/50 hover:text-foreground/70',
    legal: 'text-foreground/50 hover:text-foreground'
  }

  return cn(
    // Base classes
    'inline-block text-left',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'cursor-pointer',
    'tracking-normal',
    
    // Remove button styling
    'border-none bg-transparent p-0',
    'font-inherit',
    
    // Size classes
    sizeClasses[props.size],
    
    // Variant classes
    variantClasses[props.variant],
    
    // Hover effects
    'hover:underline hover:underline-offset-4',
    
    // Custom classes
    props.class
  )
})

// Event handlers
const handleClick = () => {
  emit('click', {
    text: props.text,
    href: props.href
  })
  
  // Future: Handle navigation when href is provided
  if (props.href) {
    // For now, just emit - parent can handle navigation
    console.log(`Navigate to: ${props.href}`)
  }
}
</script>

<style scoped>
/* Ensure consistent button reset */
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

/* Hover effects */
button:hover {
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-underline-offset: 4px;
}

/* Focus styles for accessibility */
button:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}

/* Legal variant specific styling */
button.legal {
  font-weight: 400;
}
</style>