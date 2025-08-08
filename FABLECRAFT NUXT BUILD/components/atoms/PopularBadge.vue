<template>
  <div v-if="show" :class="badgeClasses" role="img" :aria-label="ariaLabel">
    <Badge :variant="badgeVariant" :size="badgeSize" :class="innerBadgeClasses">
      {{ text }}
    </Badge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Component props
interface PopularBadgeProps {
  show?: boolean
  text?: string
  position?: 'top-right' | 'top-left' | 'top-center'
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'
  size?: 'xs' | 'sm' | 'base' | 'lg'
  class?: string | Record<string, boolean> | string[]
  ariaLabel?: string
}

// Define props with defaults
const props = withDefaults(defineProps<PopularBadgeProps>(), {
  show: true,
  text: 'Most Popular',
  position: 'top-right',
  variant: 'primary',
  size: 'sm',
  class: '',
  ariaLabel: 'Most popular plan',
})

// Position classes
const positionClasses = {
  'top-right': 'absolute top-3 right-3',
  'top-left': 'absolute top-3 left-3',
  'top-center': 'absolute top-3 left-1/2 transform -translate-x-1/2',
}

// Computed properties
const badgeClasses = computed(() => [positionClasses[props.position], 'z-10', props.class])

const badgeVariant = computed<"default" | "secondary" | "destructive" | "outline" | "landing">(() => {
  const map: Record<NonNullable<PopularBadgeProps['variant']>, 'default' | 'secondary' | 'destructive' | 'outline' | 'landing'> = {
    default: 'default',
    primary: 'default',
    secondary: 'secondary',
    success: 'default',
    warning: 'default',
    destructive: 'destructive',
  }
  return map[props.variant]
})

const badgeSize = computed<"default" | "sm" | "lg">(() => {
  const map: Record<NonNullable<PopularBadgeProps['size']>, 'default' | 'sm' | 'lg'> = {
    xs: 'sm',
    sm: 'sm',
    base: 'default',
    lg: 'lg',
  }
  return map[props.size]
})

const innerBadgeClasses = computed(() => [
  'font-semibold shadow-lg backdrop-blur-sm',
  'px-3 py-1.5',
  'border border-background/20',
  'animate-in fade-in slide-in-from-top-2 duration-300',
])
</script>
