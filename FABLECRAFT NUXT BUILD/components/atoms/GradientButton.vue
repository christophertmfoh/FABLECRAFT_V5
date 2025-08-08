<template>
  <Button
    v-bind="$props"
    :class="cn('relative overflow-hidden group button-premium button-gradient-border button-color-glow rounded-xl [&>*]:rounded-inherit', $attrs.class)"
    @click="$emit('click', $event)"
  >
    <!-- Gradient overlay -->
    <span v-if="showGradientOverlay" :class="gradientOverlayClasses + ' rounded-inherit'" aria-hidden="true" />

    <!-- Button content with relative z-index -->
    <span class="relative z-10 flex items-center gap-2">
      <slot name="leading" />
      <slot />
      <slot name="trailing" />
    </span>
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { cn } from './Utils'

// Component props interface extending Button props
interface GradientButtonProps {
  // Button props
  label?: string
  icon?: string
  loadingIcon?: string
  loading?: boolean
  disabled?: boolean
  trailing?: boolean
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  type?: 'button' | 'submit' | 'reset'
  iconOnly?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'

  // Gradient specific props
  showGradientOverlay?: boolean
  gradientColors?: string
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl'
  gradientOpacity?: number
  adaptiveGradient?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<GradientButtonProps>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
  showGradientOverlay: true,
  gradientDirection: 'to-r',
  gradientOpacity: 0,
  adaptiveGradient: false,
})

// Emit click event
defineEmits<{
  click: [event: MouseEvent]
}>()

// Compute gradient colors based on variant (theme-reactive)
const variantGradients = {
  default: 'from-primary-foreground/25 to-transparent',
  destructive: 'from-destructive-foreground/25 to-transparent',
  outline: 'from-accent/30 to-transparent', // Changed to accent for better visibility on hover
  secondary: 'from-secondary-foreground/25 to-transparent',
  ghost: 'from-accent/25 to-transparent',
  link: 'from-primary/25 to-transparent',
} as const

// Compute gradient overlay classes
const gradientOverlayClasses = computed(() => {
  // Use adaptive gradient colors if enabled
  let gradientColors = props.gradientColors

  if (props.adaptiveGradient) {
    gradientColors =
      'from-[hsl(var(--gradient-overlay-light)/var(--gradient-overlay-opacity))] to-transparent'
  } else if (!props.gradientColors) {
    // Use variant-specific gradient if no custom colors provided
    gradientColors = variantGradients[props.variant] || 'from-primary/20 to-transparent'
  }

  return cn(
    'absolute inset-0',
    'bg-gradient-' + props.gradientDirection,
    gradientColors,
    'transition-opacity duration-300',
    props.gradientOpacity === 0
      ? 'opacity-0 group-hover:opacity-100'
      : `opacity-${props.gradientOpacity * 100}`,
    'pointer-events-none',
    'rounded-md' // Match button border radius
  )
})
</script>
