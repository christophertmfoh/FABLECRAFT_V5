<template>
  <div 
    :class="actionsContainerClasses"
    role="group"
    :aria-label="groupLabel"
  >
    <!-- Primary Action Button -->
    <Button
      :size="buttonSize"
      :variant="primaryVariant"
      :class="primaryButtonClasses"
      :disabled="primaryDisabled"
      :aria-label="primaryAriaLabel"
      @click="handlePrimaryClick"
    >
      <!-- Hover overlay effect (behind content) -->
      <div 
        class="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"
        aria-hidden="true"
      />
      
      <!-- Button Content -->
      <div class="relative flex items-center justify-center gap-3">
        <AtomIcon 
          v-if="primaryIcon"
          :name="primaryIcon"
          :class="iconClasses"
          aria-hidden="true"
        />
        <span class="font-semibold">
          {{ primaryText }}
        </span>
      </div>
    </Button>

    <!-- Secondary Action Button -->
    <Button
      :size="buttonSize"
      :variant="secondaryVariant"
      :class="secondaryButtonClasses"
      :disabled="secondaryDisabled"
      :aria-label="secondaryAriaLabel"
      @click="handleSecondaryClick"
    >
      <!-- Hover overlay effect (behind content) -->
      <div 
        class="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"
        aria-hidden="true"
      />
      
      <!-- Button Content -->
      <div class="relative flex items-center justify-center gap-3">
        <AtomIcon 
          v-if="secondaryIcon"
          :name="secondaryIcon"
          :class="iconClasses"
          aria-hidden="true"
        />
        <span class="font-semibold">
          {{ secondaryText }}
        </span>
      </div>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface HeroActionsProps {
  primaryText?: string
  secondaryText?: string
  primaryIcon?: string
  secondaryIcon?: string
  primaryVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  secondaryVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  buttonSize?: 'sm' | 'default' | 'lg' | 'icon'
  layout?: 'stacked' | 'inline' | 'responsive'
  alignment?: 'left' | 'center' | 'right'
  spacing?: 'tight' | 'normal' | 'relaxed'
  primaryDisabled?: boolean
  secondaryDisabled?: boolean
  groupLabel?: string
  className?: string
}

// Events interface
interface HeroActionsEmits {
  (e: 'primary:click', event: MouseEvent): void
  (e: 'secondary:click', event: MouseEvent): void
}

// Component setup
const props = withDefaults(defineProps<HeroActionsProps>(), {
  primaryText: 'Start Creating Free',
  secondaryText: 'Explore Examples',
  primaryIcon: 'lucide:zap',
  secondaryIcon: 'lucide:sparkles',
  primaryVariant: 'default',
  secondaryVariant: 'outline',
  buttonSize: 'lg',
  layout: 'responsive',
  alignment: 'center',
  spacing: 'normal',
  primaryDisabled: false,
  secondaryDisabled: false,
  groupLabel: 'Hero action buttons',
  className: ''
})

const emit = defineEmits<HeroActionsEmits>()

// Computed properties
const actionsContainerClasses = computed(() => {
  const layoutClasses = {
    stacked: 'flex flex-col items-center',
    inline: 'flex flex-row items-center',
    responsive: 'flex flex-col sm:flex-row items-center'
  }
  
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }
  
  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-4',
    relaxed: 'gap-6'
  }

  return cn(
    'action-group w-full max-w-lg mx-auto sm:max-w-none',
    'transition-all duration-300',
    layoutClasses[props.layout],
    alignmentClasses[props.alignment],
    spacingClasses[props.spacing],
    props.className
  )
})

const primaryButtonClasses = computed(() => {
  return cn(
    'group relative w-full sm:w-auto',
    'font-semibold shadow-lg hover:shadow-xl',
    'rounded-xl transition-all duration-300',
    'hover:scale-[1.02]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
  )
})

const secondaryButtonClasses = computed(() => {
  return cn(
    'group relative w-full sm:w-auto',
    'font-semibold shadow-md hover:shadow-lg',
    'rounded-xl transition-all duration-300',
    'hover:scale-[1.02]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
  )
})

const iconClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-4 h-4',
    lg: 'w-5 h-5',
    icon: 'w-4 h-4'
  }
  
  return cn(
    'group-hover:scale-110 transition-transform duration-300 flex-shrink-0',
    sizeClasses[props.buttonSize]
  )
})

// Computed ARIA labels
const primaryAriaLabel = computed(() => {
  return `${props.primaryText} - Primary action button`
})

const secondaryAriaLabel = computed(() => {
  return `${props.secondaryText} - Secondary action button`
})

// Event handlers
const handlePrimaryClick = (event: MouseEvent) => {
  if (!props.primaryDisabled) {
    emit('primary:click', event)
  }
}

const handleSecondaryClick = (event: MouseEvent) => {
  if (!props.secondaryDisabled) {
    emit('secondary:click', event)
  }
}
</script>

<style scoped>
/* Enhanced button animations and effects */
.action-group {
  /* Mathematical spacing using design system */
  gap: var(--space-2);
}

/* Responsive gap adjustments */
@media (min-width: 640px) {
  .action-group {
    gap: var(--space-3);
  }
}

/* Enhanced hover effects */
.group:hover {
  transform: translateY(-2px) scale(1.05);
}

/* Improved focus management */
.focus-visible\:ring-2:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px hsl(var(--background)),
    0 0 0 4px hsl(var(--primary)),
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Staggered animation for responsive layout */
.flex-col .group:first-child {
  animation-delay: 0ms;
}

.flex-col .group:last-child {
  animation-delay: 100ms;
}

/* Enhanced shadow effects */
.shadow-lg {
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .hover\:scale-105:hover,
  .hover\:-translate-y-0\.5:hover,
  .group-hover\:scale-110 {
    transition: none;
    transform: none;
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .shadow-lg,
  .hover\:shadow-xl:hover {
    box-shadow: 
      0 0 0 2px hsl(var(--foreground)),
      0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
}

/* Print optimization */
@media print {
  .action-group {
    flex-direction: column;
    gap: 1rem;
  }
  
  .shadow-lg,
  .hover\:shadow-xl:hover {
    box-shadow: none;
    border: 1px solid black;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .group:hover {
    transform: none;
  }
  
  .hover\:scale-105:hover,
  .hover\:-translate-y-0\.5:hover {
    transform: none;
  }
}
</style>