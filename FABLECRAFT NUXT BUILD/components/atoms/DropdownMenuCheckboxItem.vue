<template>
  <div
    ref="itemEl"
    role="menuitemcheckbox"
    :tabindex="disabled ? undefined : -1"
    :aria-disabled="disabled || undefined"
    :aria-checked="checked"
    :class="itemClasses"
    @click="handleClick"
    @keydown="handleKeyDown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span :class="indicatorClasses">
      <Icon
        v-if="checked"
        name="lucide:check"
        :class="iconClasses"
      />
    </span>
    <span class="flex-1">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from './Utils'
import { useDropdownMenuContext } from '~/composables/useDropdownMenu'

// Component props
interface DropdownMenuCheckboxItemProps {
  checked?: boolean
  disabled?: boolean
  textValue?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DropdownMenuCheckboxItemProps>(), {
  checked: false,
  disabled: false
})

// Define emits
const emit = defineEmits<{
  select: [event: Event]
  'update:checked': [checked: boolean]
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
    emit('update:checked', !props.checked)
    emit('select', event)
    // Don't close menu on checkbox item click
  }
}

// Handle keyboard interaction
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      emit('update:checked', !props.checked)
      emit('select', event)
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
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
    'transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    !props.disabled && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
    props.disabled && 'cursor-not-allowed opacity-50',
    isHighlighted.value && !props.disabled && 'bg-accent text-accent-foreground',
    props.class
  )
})

const indicatorClasses = computed(() => {
  return cn(
    'absolute left-2 flex h-3.5 w-3.5 items-center justify-center'
  )
})

const iconClasses = computed(() => {
  return cn(
    'h-4 w-4'
  )
})
</script>