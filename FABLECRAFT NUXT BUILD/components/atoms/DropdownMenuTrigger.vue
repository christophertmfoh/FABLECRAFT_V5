<template>
  <button
    :id="context.triggerId"
    ref="triggerEl"
    :aria-expanded="context.open.value"
    :aria-controls="context.contentId"
    :aria-haspopup="true"
    :class="triggerClasses"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { cn } from './Utils'
import { useDropdownMenuContext } from '~/composables/useDropdownMenu'

// Component props
interface DropdownMenuTriggerProps {
  disabled?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  disabled: false,
})

// Get dropdown context
const context = useDropdownMenuContext()

// Template ref
const triggerEl = ref<HTMLButtonElement>()

// Store trigger ref in context
onMounted(() => {
  if (triggerEl.value) {
    context.triggerRef.value = triggerEl.value
  }
})

// Handle click
const handleClick = () => {
  if (!props.disabled) {
    context.onOpenToggle()
  }
}

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
    case 'ArrowDown':
      event.preventDefault()
      context.onOpenChange(true)
      break
    case 'ArrowUp':
      event.preventDefault()
      context.onOpenChange(true)
      // TODO: Focus last item when implemented
      break
  }
}

// Computed classes
const triggerClasses = computed(() => {
  return cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2',
    'text-sm font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=open]:bg-accent',
    props.disabled && 'cursor-not-allowed opacity-50',
    props.class
  )
})
</script>
