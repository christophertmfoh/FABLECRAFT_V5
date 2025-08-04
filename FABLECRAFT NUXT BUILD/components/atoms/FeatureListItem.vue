<template>
  <component
    :is="as"
    :class="itemClasses"
  >
    <Icon
      :name="icon"
      :class="iconClasses"
    />
    <span :class="textClasses">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface FeatureListItemProps {
  as?: string
  icon?: string
  iconColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'current'
  size?: 'sm' | 'md' | 'lg'
  spacing?: 'tight' | 'normal' | 'loose'
  class?: any
  iconClass?: any
  textClass?: any
}

// Define props with defaults
const props = withDefaults(defineProps<FeatureListItemProps>(), {
  as: 'li',
  icon: 'lucide:check-circle',
  iconColor: 'success',
  size: 'md',
  spacing: 'normal'
})

// Size mappings
const sizeClasses = {
  sm: {
    icon: 'h-4 w-4',
    text: 'text-sm'
  },
  md: {
    icon: 'h-5 w-5',
    text: 'text-base'
  },
  lg: {
    icon: 'h-6 w-6',
    text: 'text-lg'
  }
}

// Spacing mappings
const spacingClasses = {
  tight: 'gap-2',
  normal: 'gap-3',
  loose: 'gap-4'
}

// Color mappings
const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  current: 'text-current'
}

// Computed classes
const itemClasses = computed(() => {
  return cn(
    'flex items-start',
    spacingClasses[props.spacing],
    props.class
  )
})

const iconClasses = computed(() => {
  return cn(
    sizeClasses[props.size].icon,
    colorClasses[props.iconColor],
    'flex-shrink-0 mt-0.5',
    props.iconClass
  )
})

const textClasses = computed(() => {
  return cn(
    sizeClasses[props.size].text,
    'leading-relaxed',
    props.textClass
  )
})
</script>