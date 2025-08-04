<template>
  <p
    v-if="message || $slots.default"
    :id="id"
    :class="messageClasses"
    role="alert"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
  >
    <Icon
      v-if="showIcon && iconName"
      :name="iconName"
      :class="iconClasses"
    />
    <span>
      <slot>{{ message }}</slot>
    </span>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface FormMessageProps {
  message?: string
  type?: 'error' | 'success' | 'warning' | 'info' | 'default'
  showIcon?: boolean
  icon?: string
  id?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<FormMessageProps>(), {
  type: 'default',
  showIcon: true
})

// Icon mapping for different types
const iconMap = {
  error: 'lucide:alert-circle',
  success: 'lucide:check-circle',
  warning: 'lucide:alert-triangle',
  info: 'lucide:info',
  default: ''
}

// Computed icon name
const iconName = computed(() => {
  return props.icon || iconMap[props.type]
})

// Base classes
const baseClasses = 'text-sm mt-1.5 flex items-center gap-1.5'

// Type-specific classes
const typeClasses = {
  error: 'text-destructive',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  default: 'text-muted-foreground'
}

// Computed message classes
const messageClasses = computed(() => {
  return cn(
    baseClasses,
    typeClasses[props.type],
    props.class
  )
})

// Icon classes
const iconClasses = computed(() => {
  return cn(
    'h-3.5 w-3.5 flex-shrink-0',
    props.type === 'default' && 'opacity-70'
  )
})
</script>