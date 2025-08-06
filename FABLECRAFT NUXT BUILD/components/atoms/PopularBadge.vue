<template>
  <div
    v-if="show"
    :class="badgeClasses"
    role="img"
    :aria-label="ariaLabel"
  >
    <Badge
      :variant="badgeVariant"
      :size="badgeSize"
      :class="innerBadgeClasses"
    >
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
  ariaLabel: 'Most popular plan'
})

// Position classes
const positionClasses = {
  'top-right': 'absolute top-0 right-0 -mt-3 mr-4',
  'top-left': 'absolute top-0 left-0 -mt-3 ml-4',
  'top-center': 'absolute top-0 left-1/2 transform -translate-x-1/2 -mt-3'
}

// Computed properties
const badgeClasses = computed(() => [
  positionClasses[props.position],
  'z-10',
  props.class
])

const badgeVariant = computed(() => props.variant)

const badgeSize = computed(() => props.size)

const innerBadgeClasses = computed(() => [
  'font-semibold shadow-lg backdrop-blur-sm',
  'px-3 py-1.5',
  'border border-background/20',
  'animate-in fade-in slide-in-from-top-2 duration-300'
])
</script>