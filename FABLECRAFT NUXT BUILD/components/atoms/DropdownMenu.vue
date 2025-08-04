<template>
  <div :class="dropdownClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'
import { useDropdownMenuProvider } from '~/composables/useDropdownMenu'

// Component props
interface DropdownMenuProps {
  defaultOpen?: boolean
  modal?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DropdownMenuProps>(), {
  defaultOpen: false,
  modal: true
})

// Provide dropdown context to children
const context = useDropdownMenuProvider()

// Initialize with default open state
if (props.defaultOpen) {
  context.open.value = true
}

// Computed classes
const dropdownClasses = computed(() => {
  return cn(
    'relative inline-block text-left',
    props.class
  )
})
</script>