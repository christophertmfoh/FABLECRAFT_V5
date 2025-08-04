import { ref, computed, provide, inject, type Ref, type InjectionKey } from 'vue'
import { useComponentId } from './useComponentId'

export interface DropdownMenuContext {
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  triggerId: string
  contentId: string
  triggerRef: Ref<HTMLElement | undefined>
  focusedIndex: Ref<number>
  onItemSelect: () => void
}

const DROPDOWN_MENU_INJECTION_KEY = Symbol('dropdown-menu') as InjectionKey<DropdownMenuContext>

export function useDropdownMenuProvider() {
  const open = ref(false)
  const triggerId = useComponentId('dropdown-trigger')
  const contentId = useComponentId('dropdown-content')
  const triggerRef = ref<HTMLElement>()
  const focusedIndex = ref(-1)

  const onOpenChange = (value: boolean) => {
    open.value = value
    if (!value) {
      // Reset focus index when closing
      focusedIndex.value = -1
      // Return focus to trigger
      if (triggerRef.value) {
        triggerRef.value.focus()
      }
    }
  }

  const onOpenToggle = () => {
    onOpenChange(!open.value)
  }

  const onItemSelect = () => {
    onOpenChange(false)
  }

  const context: DropdownMenuContext = {
    open,
    onOpenChange,
    onOpenToggle,
    triggerId,
    contentId,
    triggerRef,
    focusedIndex,
    onItemSelect
  }

  provide(DROPDOWN_MENU_INJECTION_KEY, context)

  return context
}

export function useDropdownMenuContext() {
  const context = inject(DROPDOWN_MENU_INJECTION_KEY)
  
  if (!context) {
    throw new Error('useDropdownMenuContext must be used within a DropdownMenu component')
  }
  
  return context
}

// Utility for managing focus within dropdown
export function useDropdownFocus(
  itemsRef: Ref<HTMLElement[]>,
  context: DropdownMenuContext
) {
  const focusItem = (index: number) => {
    const items = itemsRef.value
    if (items.length === 0) return
    
    // Wrap around
    if (index < 0) index = items.length - 1
    if (index >= items.length) index = 0
    
    context.focusedIndex.value = index
    items[index]?.focus()
  }

  const focusFirst = () => focusItem(0)
  const focusLast = () => focusItem(itemsRef.value.length - 1)
  const focusNext = () => focusItem(context.focusedIndex.value + 1)
  const focusPrevious = () => focusItem(context.focusedIndex.value - 1)

  return {
    focusItem,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious
  }
}