<template>
  <div :class="labelClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface DropdownMenuLabelProps {
  inset?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DropdownMenuLabelProps>(), {
  inset: false,
})

// Computed classes
const labelClasses = computed(() => {
  return cn('px-2 py-1.5 text-sm font-semibold', props.inset && 'pl-8', props.class)
})
</script>
