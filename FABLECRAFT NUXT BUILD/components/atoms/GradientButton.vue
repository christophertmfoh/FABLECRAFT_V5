<template>
  <Button
    v-bind="$props"
    :class="cn('relative overflow-hidden group', $attrs.class)"
    @click="$emit('click', $event)"
  >
    <!-- Gradient overlay -->
    <span
      v-if="showGradientOverlay"
      :class="gradientOverlayClasses"
      aria-hidden="true"
    />
    
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
}

// Define props with defaults
const props = withDefaults(defineProps<GradientButtonProps>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
  showGradientOverlay: true,
  gradientColors: 'from-white/20 to-transparent',
  gradientDirection: 'to-r',
  gradientOpacity: 0,
})

// Emit click event
defineEmits<{
  click: [event: MouseEvent]
}>()

// Compute gradient overlay classes
const gradientOverlayClasses = computed(() => {
  return cn(
    'absolute inset-0',
    'bg-gradient-' + props.gradientDirection,
    props.gradientColors,
    'transition-opacity duration-300',
    props.gradientOpacity === 0 ? 'opacity-0 group-hover:opacity-100' : `opacity-${props.gradientOpacity * 100}`,
    'pointer-events-none',
    'rounded-md' // Match button border radius
  )
})
</script>