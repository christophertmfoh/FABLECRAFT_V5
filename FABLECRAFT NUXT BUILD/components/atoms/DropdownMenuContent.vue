<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="context.open.value"
        ref="contentEl"
        :id="context.contentId"
        role="menu"
        :aria-labelledby="context.triggerId"
        :class="contentClasses"
        :style="floatingStyles"
        tabindex="-1"
        @keydown="handleKeyDown"
      >
        <div ref="itemsContainer">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from './Utils'
import { useDropdownMenuContext, useDropdownFocus } from '~/composables/useDropdownMenu'
import { onClickOutside } from '@vueuse/core'

// Component props
interface DropdownMenuContentProps {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  alignOffset?: number
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  align: 'start',
  side: 'bottom',
  sideOffset: 4,
  alignOffset: 0
})

// Get dropdown context
const context = useDropdownMenuContext()

// Template refs
const contentEl = ref<HTMLDivElement>()
const itemsContainer = ref<HTMLDivElement>()
const menuItems = ref<HTMLElement[]>([])

// Simple positioning (in production, use floating-ui/vue)
const floatingStyles = computed(() => {
  const offset = props.sideOffset
  const styles: Record<string, string> = {
    position: 'fixed',
    zIndex: '50'
  }

  // Position based on trigger
  if (context.triggerRef.value) {
    const rect = context.triggerRef.value.getBoundingClientRect()
    
    switch (props.side) {
      case 'bottom':
        styles.top = `${rect.bottom + offset}px`
        break
      case 'top':
        styles.bottom = `${window.innerHeight - rect.top + offset}px`
        break
      case 'left':
        styles.right = `${window.innerWidth - rect.left + offset}px`
        break
      case 'right':
        styles.left = `${rect.right + offset}px`
        break
    }

    // Align horizontally for top/bottom
    if (props.side === 'top' || props.side === 'bottom') {
      switch (props.align) {
        case 'start':
          styles.left = `${rect.left + props.alignOffset}px`
          break
        case 'center':
          styles.left = `${rect.left + rect.width / 2 + props.alignOffset}px`
          styles.transform = 'translateX(-50%)'
          break
        case 'end':
          styles.right = `${window.innerWidth - rect.right + props.alignOffset}px`
          break
      }
    }

    // Align vertically for left/right
    if (props.side === 'left' || props.side === 'right') {
      switch (props.align) {
        case 'start':
          styles.top = `${rect.top + props.alignOffset}px`
          break
        case 'center':
          styles.top = `${rect.top + rect.height / 2 + props.alignOffset}px`
          styles.transform = 'translateY(-50%)'
          break
        case 'end':
          styles.bottom = `${window.innerHeight - rect.bottom + props.alignOffset}px`
          break
      }
    }
  }

  return styles
})

// Collect menu items
const collectMenuItems = () => {
  if (itemsContainer.value) {
    menuItems.value = Array.from(
      itemsContainer.value.querySelectorAll('[role="menuitem"]:not([disabled])')
    )
  }
}

// Focus management
const { focusFirst, focusLast, focusNext, focusPrevious } = useDropdownFocus(
  menuItems,
  context
)

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      context.onOpenChange(false)
      break
    case 'ArrowDown':
      event.preventDefault()
      if (context.focusedIndex.value === -1) {
        focusFirst()
      } else {
        focusNext()
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (context.focusedIndex.value === -1) {
        focusLast()
      } else {
        focusPrevious()
      }
      break
    case 'Home':
    case 'PageUp':
      event.preventDefault()
      focusFirst()
      break
    case 'End':
    case 'PageDown':
      event.preventDefault()
      focusLast()
      break
    case 'Tab':
      event.preventDefault()
      context.onOpenChange(false)
      break
  }
}

// Click outside handler
onClickOutside(contentEl, (event) => {
  // Don't close if clicking the trigger
  if (context.triggerRef.value?.contains(event.target as Node)) {
    return
  }
  context.onOpenChange(false)
})

// Watch for open state changes
watch(() => context.open.value, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    collectMenuItems()
    // Focus the content element first
    contentEl.value?.focus()
  }
})

// Computed classes
const contentClasses = computed(() => {
  return cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1',
    'text-popover-foreground shadow-md',
    'focus:outline-none',
    props.class
  )
})
</script>