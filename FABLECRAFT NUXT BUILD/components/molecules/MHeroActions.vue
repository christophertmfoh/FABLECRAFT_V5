<template>
  <div 
    :class="actionsContainerClasses"
    role="group"
    :aria-label="groupLabel"
  >
    <!-- Primary Action Button -->
    <GradientButton
      :size="buttonSize"
      :variant="primaryVariant"
      :class="primaryButtonClasses"
      :disabled="primaryDisabled"
      :aria-label="primaryAriaLabel"
      :show-gradient-overlay="true"
      gradient-colors="from-primary-foreground/25 to-transparent"
      @click="handlePrimaryClick"
    >
      <template #leading>
        <AtomIcon 
          v-if="primaryIcon"
          :name="primaryIcon"
          :class="iconClasses"
          aria-hidden="true"
        />
      </template>
      {{ primaryText }}
    </GradientButton>

    <!-- Secondary Action Button -->
    <GradientButton
      :size="buttonSize"
      :variant="secondaryVariant"
      :class="secondaryButtonClasses"
      :disabled="secondaryDisabled"
      :aria-label="secondaryAriaLabel"
      :show-gradient-overlay="true"
      @click="handleSecondaryClick"
    >
      <template #leading>
        <AtomIcon 
          v-if="secondaryIcon"
          :name="secondaryIcon"
          :class="iconClasses"
          aria-hidden="true"
        />
      </template>
      {{ secondaryText }}
    </GradientButton>
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
    normal: 'gap-10',  // Increased from gap-8 to ensure adequate spacing even on hover
    relaxed: 'gap-12'  // Increased from gap-10 for maximum spacing
  }

  return cn(
    'action-group w-full max-w-md mx-auto sm:max-w-none sm:ml-8',  // Adjusted: smaller max-width and left margin on larger screens
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
    'hover:scale-[1.01]',  // Reduced from 1.02 to prevent buttons from appearing too close on hover
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'text-xl px-8 py-4'  // Enhanced sizing to match React original
  )
})

const secondaryButtonClasses = computed(() => {
  return cn(
    'group relative w-full sm:w-auto',
    'font-semibold shadow-md hover:shadow-lg',
    'rounded-xl transition-all duration-300',
    'hover:scale-[1.01]',  // Reduced from 1.02 to prevent buttons from appearing too close on hover
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'text-xl px-8 py-4'  // Enhanced sizing to match React original
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
  /* Mathematical spacing using design system - increased for better button separation even on hover */
  gap: 2.5rem; /* 40px - matches gap-10 */
}

/* Responsive gap adjustments */
@media (min-width: 640px) {
  .action-group {
    gap: 2.5rem; /* Consistent larger spacing across breakpoints */
  }
}

/* Enhanced hover effects - removed conflicting transform */
.group:hover {
  /* Transform handled by hover:scale-[1.02] class */
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