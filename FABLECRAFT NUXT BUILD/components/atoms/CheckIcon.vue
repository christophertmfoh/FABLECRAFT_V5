<template>
  <span
    :class="iconClasses"
    :aria-hidden="ariaHidden"
    role="img"
    :aria-label="ariaLabel"
  >
    <AtomIcon
      :name="iconName"
      :size="iconSize"
      :class="iconColorClasses"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Component props
interface CheckIconProps {
  variant?: 'check' | 'x' | 'minus'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  color?: 'success' | 'error' | 'warning' | 'primary' | 'muted'
  class?: string | Record<string, boolean> | string[]
  ariaHidden?: boolean
  ariaLabel?: string
}

// Define props with defaults
const props = withDefaults(defineProps<CheckIconProps>(), {
  variant: 'check',
  size: 'base',
  color: 'success',
  class: '',
  ariaHidden: true,
  ariaLabel: 'Feature included'
})

// Icon name mapping
const iconNameMap = {
  check: 'lucide:check',
  x: 'lucide:x',
  minus: 'lucide:minus'
}

// Size classes for the container
const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4', 
  base: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7'
}

// Color classes for the icon
const colorClasses = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  primary: 'text-primary',
  muted: 'text-muted-foreground'
}

// Computed properties
const iconName = computed(() => iconNameMap[props.variant])

const iconSize = computed(() => props.size)

const iconClasses = computed(() => [
  'inline-flex items-center justify-center flex-shrink-0',
  sizeClasses[props.size],
  props.class
])

const iconColorClasses = computed(() => [
  colorClasses[props.color],
  'transition-colors duration-200'
])
</script>