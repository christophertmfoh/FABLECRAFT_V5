<template>
  <label :for="htmlFor" :class="labelClasses">
    <slot />
    <span v-if="required" :class="requiredClasses" aria-label="required">
      {{ requiredText }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface LabelProps {
  htmlFor?: string
  required?: boolean
  requiredText?: string
  disabled?: boolean
  srOnly?: boolean
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
  requiredText: '*',
  disabled: false,
  srOnly: false,
})

// Compute label classes
const labelClasses = computed(() => {
  return cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    {
      'text-muted-foreground': props.disabled,
      'sr-only': props.srOnly,
    },
    props.class
  )
})

// Compute required indicator classes
const requiredClasses = computed(() => {
  return cn('text-destructive ml-1', {
    'text-destructive/50': props.disabled,
  })
})
</script>
