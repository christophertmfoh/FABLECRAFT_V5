<template>
  <Icon
    name="i-lucide-loader-2"
    :size="size"
    :class="spinnerClasses"
  />
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'
import { cn } from './Utils'

interface SpinnerProps {
  size?: ComponentSize
  class?: string
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md'
})

const spinnerClasses = computed(() =>
  cn(
    'animate-spin',
    'text-current',
    props.class
  )
)
</script>