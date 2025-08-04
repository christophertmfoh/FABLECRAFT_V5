<template>
  <div
    :class="containerClasses"
    :aria-label="ariaLabel || `Step ${step}`"
    :aria-current="status === 'active' ? 'step' : undefined"
    role="listitem"
  >
    <span
      :class="numberClasses"
      :aria-hidden="!!ariaLabel"
    >
      {{ step }}
    </span>
    <VisuallyHidden v-if="status !== 'pending' && includeStatusText">
      {{ status === 'completed' ? '(Completed)' : status === 'active' ? '(Current)' : '' }}
    </VisuallyHidden>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'
import VisuallyHidden from './VisuallyHidden.vue'

// Component props
interface StepNumberProps {
  step: number | string
  status?: 'pending' | 'active' | 'completed'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'outline' | 'solid'
  color?: 'primary' | 'secondary' | 'success' | 'neutral'
  ariaLabel?: string
  includeStatusText?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<StepNumberProps>(), {
  status: 'pending',
  size: 'md',
  variant: 'default',
  color: 'primary',
  includeStatusText: true
})

// Size classes
const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-14 h-14 text-xl'
}

// Base container classes
const baseContainerClasses = `
  relative inline-flex items-center justify-center
  rounded-full font-medium
  transition-all duration-200
`

// Variant and status classes
const getVariantClasses = (variant: string, status: string, color: string) => {
  const colorMap = {
    primary: {
      pending: {
        default: 'border-2 border-muted text-muted-foreground',
        outline: 'border-2 border-muted text-muted-foreground',
        solid: 'bg-muted text-muted-foreground'
      },
      active: {
        default: 'border-2 border-primary text-primary',
        outline: 'border-2 border-primary text-primary',
        solid: 'bg-primary text-primary-foreground'
      },
      completed: {
        default: 'border-2 border-primary bg-primary text-primary-foreground',
        outline: 'border-2 border-primary bg-primary text-primary-foreground',
        solid: 'bg-primary text-primary-foreground'
      }
    },
    secondary: {
      pending: {
        default: 'border-2 border-muted text-muted-foreground',
        outline: 'border-2 border-muted text-muted-foreground',
        solid: 'bg-muted text-muted-foreground'
      },
      active: {
        default: 'border-2 border-secondary text-secondary',
        outline: 'border-2 border-secondary text-secondary',
        solid: 'bg-secondary text-secondary-foreground'
      },
      completed: {
        default: 'border-2 border-secondary bg-secondary text-secondary-foreground',
        outline: 'border-2 border-secondary bg-secondary text-secondary-foreground',
        solid: 'bg-secondary text-secondary-foreground'
      }
    },
    success: {
      pending: {
        default: 'border-2 border-muted text-muted-foreground',
        outline: 'border-2 border-muted text-muted-foreground',
        solid: 'bg-muted text-muted-foreground'
      },
      active: {
        default: 'border-2 border-success text-success',
        outline: 'border-2 border-success text-success',
        solid: 'bg-success text-success-foreground'
      },
      completed: {
        default: 'border-2 border-success bg-success text-success-foreground',
        outline: 'border-2 border-success bg-success text-success-foreground',
        solid: 'bg-success text-success-foreground'
      }
    },
    neutral: {
      pending: {
        default: 'border-2 border-muted text-muted-foreground',
        outline: 'border-2 border-muted text-muted-foreground',
        solid: 'bg-muted text-muted-foreground'
      },
      active: {
        default: 'border-2 border-foreground text-foreground',
        outline: 'border-2 border-foreground text-foreground',
        solid: 'bg-foreground text-background'
      },
      completed: {
        default: 'border-2 border-foreground bg-foreground text-background',
        outline: 'border-2 border-foreground bg-foreground text-background',
        solid: 'bg-foreground text-background'
      }
    }
  }

  return colorMap[color]?.[status]?.[variant] || colorMap.primary[status][variant]
}

// Computed container classes
const containerClasses = computed(() => {
  return cn(
    baseContainerClasses,
    sizeClasses[props.size],
    getVariantClasses(props.variant, props.status, props.color),
    props.class
  )
})

// Number display classes
const numberClasses = computed(() => {
  return cn(
    'font-semibold leading-none',
    props.status === 'completed' && props.variant === 'default' && 'scale-90'
  )
})
</script>