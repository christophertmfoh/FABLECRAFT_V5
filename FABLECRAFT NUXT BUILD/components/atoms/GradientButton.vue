<template>
  <Button
    v-bind="buttonProps"
    :class="gradientClasses"
    @click="$emit('click', $event)"
  >
    <div
      v-if="showGradientOverlay"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-md pointer-events-none"
      :class="overlayClasses"
    />
    <span class="relative z-10">
      <slot />
    </span>
  </Button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ComponentSize, ComponentVariant } from '~/types'
import { cn } from './Utils'

interface GradientButtonProps {
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
  showGradientOverlay?: boolean
  gradientColors?: string
  gradientDuration?: string
  class?: string
}

const props = withDefaults(defineProps<GradientButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  showGradientOverlay: true,
  gradientColors: 'from-white/20 to-transparent',
  gradientDuration: 'duration-300'
})

defineEmits<{
  click: [event: MouseEvent]
}>()

// Extract button-specific props
const buttonProps = computed(() => {
  const { showGradientOverlay, gradientColors, gradientDuration, class: _, ...rest } = props
  return rest
})

const gradientClasses = computed(() =>
  cn(
    'group relative overflow-hidden',
    props.class
  )
)

const overlayClasses = computed(() =>
  cn(
    'bg-gradient-to-r',
    props.gradientColors,
    props.gradientDuration
  )
)
</script>