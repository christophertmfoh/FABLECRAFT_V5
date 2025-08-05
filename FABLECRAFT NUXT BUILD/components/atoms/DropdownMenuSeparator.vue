<template>
  <div role="separator" aria-orientation="horizontal" :class="separatorClasses" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface DropdownMenuSeparatorProps {
  class?: any
}

// Define props
const props = defineProps<DropdownMenuSeparatorProps>()

// Computed classes
const separatorClasses = computed(() => {
  return cn('-mx-1 my-1 h-px bg-muted', props.class)
})
</script>
