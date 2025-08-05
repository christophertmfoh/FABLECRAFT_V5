<template>
  <div 
    :class="badgeContainerClasses"
    role="banner"
    aria-label="Product announcement badge"
  >
    <APulsingDot 
      :size="dotSize"
      :color="dotColor"
      :speed="dotSpeed"
      :intensity="dotIntensity"
    />
    
    <Badge
      :class="badgeClasses"
      v-bind="$attrs"
      @click="handleBadgeClick"
    >
      <slot>{{ text }}</slot>
    </Badge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface HeroBadgeProps {
  text?: string
  variant?: 'default' | 'accent' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  dotColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  dotSpeed?: 'slow' | 'normal' | 'fast'
  dotIntensity?: 'subtle' | 'normal' | 'strong'
  clickable?: boolean
  className?: string
}

// Events interface
interface HeroBadgeEmits {
  (e: 'click', event: MouseEvent): void
}

// Component setup
const props = withDefaults(defineProps<HeroBadgeProps>(), {
  text: '',
  variant: 'default',
  size: 'md',
  dotColor: 'primary',
  dotSpeed: 'normal', 
  dotIntensity: 'normal',
  clickable: false,
  className: ''
})

const emit = defineEmits<HeroBadgeEmits>()

// Computed properties
const badgeContainerClasses = computed(() => {
  const sizeClasses = {
    sm: 'gap-1.5',
    md: 'gap-2', 
    lg: 'gap-3'
  }

  return cn(
    'flex items-center justify-center',
    'transition-all duration-300',
    sizeClasses[props.size],
    props.clickable && 'cursor-pointer hover:scale-105',
    props.className
  )
})

const badgeClasses = computed(() => {
  const variantClasses = {
    default: 'bg-card/95 text-foreground border-border backdrop-blur-md',
    accent: 'bg-accent/95 text-accent-foreground border-accent backdrop-blur-md',
    secondary: 'bg-secondary/95 text-secondary-foreground border-secondary backdrop-blur-md', 
    outline: 'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return cn(
    'font-semibold shadow-md hover:shadow-lg',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.clickable && 'hover:scale-102'
  )
})

// Computed dot properties based on badge size
const dotSize = computed(() => {
  const dotSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  } as const
  
  return dotSizes[props.size]
})

// Event handlers
const handleBadgeClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Custom hover effects for enhanced interactivity */
.cursor-pointer:hover .badge {
  transform: translateY(-1px);
}

/* Improved focus handling */
.badge:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px hsl(var(--background)),
    0 0 0 4px hsl(var(--primary));
}

/* Enhanced scale animation */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .hover\:scale-102:hover,
  .hover\:scale-105:hover {
    transition: none;
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .backdrop-blur-md {
    backdrop-filter: none;
    background: hsl(var(--background));
    border-width: 2px;
  }
}

/* Print optimization */
@media print {
  .backdrop-blur-md {
    backdrop-filter: none;
    background: white;
    color: black;
    border: 1px solid black;
  }
}
</style>