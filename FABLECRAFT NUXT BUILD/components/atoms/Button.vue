<template>
  <component
    :is="componentTag"
    :type="componentTag === 'button' ? type : undefined"
    :to="to"
    :href="href"
    :target="target"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <Icon
      v-if="loading"
      name="i-lucide-loader-2"
      size="sm"
      class="animate-spin"
    />
    <Icon
      v-else-if="iconLeft"
      :name="iconLeft"
      size="sm"
    />
    
    <span :class="{ 'opacity-0': loading && !$slots.default }">
      <slot />
    </span>
    
    <Icon
      v-if="iconRight && !loading"
      :name="iconRight"
      size="sm"
    />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant } from '~/types'
import { cn } from './Utils'

interface ButtonProps {
  variant?: ComponentVariant | 'destructive' | 'link'
  size?: ComponentSize | 'icon'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: string
  iconRight?: string
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Polymorphic component resolution
const NuxtLink = resolveComponent('NuxtLink')
const componentTag = computed(() => {
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
})

// Size classes - exact match to original
const sizeClasses = {
  xs: 'h-8 px-3 text-xs',       // Our addition
  sm: 'h-9 rounded-md px-3',    // Match original
  md: 'h-10 px-4 py-2',         // Match original (default)
  lg: 'h-11 rounded-md px-8',   // Match original
  xl: 'h-12 px-10 text-base',   // Our addition
  icon: 'h-10 w-10'             // Match original
}

// Variant classes - exact match to original styling
const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  // Our theme system additions
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
  success: 'bg-success text-success-foreground hover:bg-success/90',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
}

// Combined classes - exact match to original structure
const buttonClasses = computed(() => 
  cn(
    // Base styles - exact match
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    
    // Size
    sizeClasses[props.size as keyof typeof sizeClasses],
    
    // Variant
    variantClasses[props.variant as keyof typeof variantClasses],
    
    // Full width
    props.fullWidth && 'w-full',
    
    // Loading state
    props.loading && 'cursor-wait',
    
    // Custom classes
    props.class
  )
)

// Click handler
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>