<template>
  <button
    type="button"
    :class="toggleClasses"
    :aria-label="ariaLabel"
    :aria-pressed="isVisible"
    @click="handleToggle"
  >
    <AtomIcon :name="iconName" :class="iconClasses" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Toggle button variants using CVA
const toggleVariants = cva(
  'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground rounded-sm',
        subtle: 'text-muted-foreground/60 hover:text-muted-foreground',
      },
      size: {
        sm: 'h-7 w-7 rounded-sm',
        md: 'h-8 w-8 rounded-md',
        lg: 'h-9 w-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const iconVariants = cva('transition-transform duration-200', {
  variants: {
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-4.5 w-4.5',
    },
    state: {
      visible: 'scale-100',
      hidden: 'scale-100',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'hidden',
  },
})

// Component props
interface PasswordToggleProps {
  /** Whether password is currently visible */
  isVisible?: boolean
  /** Button variant style */
  variant?: 'default' | 'ghost' | 'subtle'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Custom aria-label */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
  /** Disabled state */
  disabled?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<PasswordToggleProps>(), {
  isVisible: false,
  variant: 'default',
  size: 'md',
  disabled: false,
})

// Define emits
const emit = defineEmits<{
  toggle: [isVisible: boolean]
}>()

// Computed properties
const iconName = computed(() => {
  return props.isVisible ? 'lucide:eye-off' : 'lucide:eye'
})

const ariaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  return props.isVisible ? 'Hide password' : 'Show password'
})

const toggleClasses = computed(() => {
  return cn(
    toggleVariants({
      variant: props.variant,
      size: props.size,
    }),
    {
      'cursor-not-allowed opacity-50': props.disabled,
    },
    props.class
  )
})

const iconClasses = computed(() => {
  return iconVariants({
    size: props.size,
    state: props.isVisible ? 'visible' : 'hidden',
  })
})

// Methods
const handleToggle = () => {
  if (props.disabled) return
  emit('toggle', !props.isVisible)
}
</script>

<style scoped>
/* Enhanced focus styles for accessibility */
button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Smooth icon transitions */
[data-lucide] {
  transition: transform 0.2s ease-in-out;
}

/* Hover animation */
button:hover:not(:disabled) [data-lucide] {
  transform: scale(1.1);
}

/* Active state */
button:active:not(:disabled) [data-lucide] {
  transform: scale(0.95);
}
</style>
