<template>
  <button type="button" :class="socialIconClasses" :aria-label="ariaLabel" @click="handleClick">
    <AtomIcon :name="icon" :class="iconClasses" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface SocialIconProps {
  icon: string // Icon name (e.g., 'lucide:twitter')
  label: string // Platform name for accessibility
  href?: string // Link URL (optional for now)
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'subtle' | 'solid'
  class?: string
}

// Events interface
interface SocialIconEmits {
  (e: 'click', payload: { platform: string; href?: string }): void
}

// Component setup
const props = withDefaults(defineProps<SocialIconProps>(), {
  size: 'md',
  variant: 'default',
  class: '',
})

const emit = defineEmits<SocialIconEmits>()

// Computed properties
const ariaLabel = computed(() => {
  return `Follow us on ${props.label}`
})

const socialIconClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  const variantClasses = {
    default: 'bg-muted hover:bg-accent text-foreground/60 hover:text-foreground',
    subtle: 'bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground',
    solid: 'bg-primary hover:bg-primary/90 text-primary-foreground',
  }

  return cn(
    // Base classes
    'inline-flex items-center justify-center',
    'rounded-lg transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'group cursor-pointer',

    // Size classes
    sizeClasses[props.size],

    // Variant classes
    variantClasses[props.variant],

    // Hover effects
    'hover:scale-105 hover:shadow-md',

    // Custom classes
    props.class
  )
})

const iconClasses = computed(() => {
  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return cn('transition-all duration-200', 'group-hover:scale-110', iconSizeClasses[props.size])
})

// Event handlers
const handleClick = () => {
  emit('click', {
    platform: props.label,
    href: props.href,
  })

  // If href is provided, navigate to it
  if (props.href) {
    window.open(props.href, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
/* Additional hover effects */
.group:hover .transition-all {
  transform: scale(1.1);
}

/* Focus styles for better accessibility */
.group:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none;
  }

  .group:hover {
    transform: none;
  }
}
</style>
