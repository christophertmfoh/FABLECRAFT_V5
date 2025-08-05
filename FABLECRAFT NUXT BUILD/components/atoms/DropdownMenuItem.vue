<template>
  <div
    ref="itemEl"
    role="menuitem"
    :tabindex="disabled ? undefined : -1"
    :aria-disabled="disabled || undefined"
    :class="itemClasses"
    @click="handleClick"
    @keydown="handleKeyDown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from './Utils'
import { useDropdownMenuContext } from '~/composables/useDropdownMenu'

// Component props
interface DropdownMenuItemProps {
  disabled?: boolean
  textValue?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  disabled: false,
})

// Define emits
const emit = defineEmits<{
  select: [event: Event]
}>()

// Get dropdown context
const context = useDropdownMenuContext()

// Template ref
const itemEl = ref<HTMLDivElement>()

// Local state
const isHighlighted = ref(false)

// Handle click
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('select', event)
    context.onItemSelect()
  }
}

// Handle keyboard interaction
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      emit('select', event)
      context.onItemSelect()
      break
  }
}

// Handle mouse enter
const handleMouseEnter = () => {
  if (!props.disabled) {
    isHighlighted.value = true
    itemEl.value?.focus()
  }
}

// Handle mouse leave
const handleMouseLeave = () => {
  isHighlighted.value = false
}

// Computed classes
const itemClasses = computed(() => {
  return cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
    'transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    !props.disabled && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
    props.disabled && 'cursor-not-allowed opacity-50',
    isHighlighted.value && !props.disabled && 'bg-accent text-accent-foreground',
    props.class
  )
})
</script>
