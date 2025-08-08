<template>
  <Button
    v-bind="$props"
    :class="cn('relative overflow-hidden group button-premium button-feather rounded-xl [&>*]:rounded-inherit', $attrs.class)"
    @click="$emit('click', $event)"
  >
    <!-- Removed gradient overlay; feather-style surface handles visuals -->

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

  // Deprecated gradient props (ignored)
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
  showGradientOverlay: false,
  gradientDirection: 'to-r',
  gradientOpacity: 0,
  adaptiveGradient: false,
})

// Emit click event
defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
