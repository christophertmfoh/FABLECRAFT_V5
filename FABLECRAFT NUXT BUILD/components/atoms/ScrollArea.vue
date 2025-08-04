<template>
  <div
    ref="viewportRef"
    :class="viewportClasses"
    :style="viewportStyles"
  >
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface ScrollAreaProps {
  orientation?: 'vertical' | 'horizontal' | 'both'
  scrollbarSize?: 'thin' | 'default' | 'thick'
  scrollbarVariant?: 'auto' | 'always' | 'hover'
  maxHeight?: string
  maxWidth?: string
  class?: string | Record<string, boolean> | string[]
  contentClass?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<ScrollAreaProps>(), {
  orientation: 'vertical',
  scrollbarSize: 'default',
  scrollbarVariant: 'auto',
})

// Template ref for viewport
const viewportRef = ref<HTMLElement>()

// Scrollbar size classes
const scrollbarSizeClasses = {
  thin: 'scrollbar-thin',
  default: 'scrollbar',
  thick: 'scrollbar-thick',
}

// Orientation overflow classes
const overflowClasses = {
  vertical: 'overflow-y-auto overflow-x-hidden',
  horizontal: 'overflow-x-auto overflow-y-hidden',
  both: 'overflow-auto',
}

// Compute viewport styles
const viewportStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.maxHeight) {
    styles.maxHeight = props.maxHeight
  }
  
  if (props.maxWidth) {
    styles.maxWidth = props.maxWidth
  }
  
  return styles
})

// Compute viewport classes
const viewportClasses = computed(() => {
  return cn(
    // Base classes
    'relative',
    
    // Overflow classes
    overflowClasses[props.orientation],
    
    // Scrollbar styling - using custom CSS classes
    scrollbarSizeClasses[props.scrollbarSize],
    'scrollbar-track-transparent',
    'scrollbar-thumb-muted-foreground/20',
    'hover:scrollbar-thumb-muted-foreground/30',
    'scrollbar-corner-transparent',
    
    // Scrollbar visibility
    props.scrollbarVariant === 'hover' && 'scrollbar-hover',
    props.scrollbarVariant === 'always' && 'scrollbar-always',
    
    // Custom classes
    props.class
  )
})

// Compute content classes
const contentClasses = computed(() => {
  return cn(
    props.contentClass
  )
})

// Expose scroll methods
defineExpose({
  scrollTo: (options?: ScrollToOptions) => {
    viewportRef.value?.scrollTo(options)
  },
  scrollBy: (options?: ScrollToOptions) => {
    viewportRef.value?.scrollBy(options)
  },
  scrollToTop: () => {
    viewportRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  },
  scrollToBottom: () => {
    if (viewportRef.value) {
      viewportRef.value.scrollTo({
        top: viewportRef.value.scrollHeight,
        behavior: 'smooth',
      })
    }
  },
})
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.scrollbar-thick::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thumb-muted-foreground\/20::-webkit-scrollbar-thumb {
  background-color: rgb(var(--muted-foreground) / 0.2);
  border-radius: 9999px;
}

.scrollbar-thumb-muted-foreground\/30:hover::-webkit-scrollbar-thumb {
  background-color: rgb(var(--muted-foreground) / 0.3);
}

.scrollbar-corner-transparent::-webkit-scrollbar-corner {
  background: transparent;
}

/* Hover visibility */
.scrollbar-hover {
  scrollbar-width: none;
}

.scrollbar-hover::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.scrollbar-hover:hover {
  scrollbar-width: thin;
}

.scrollbar-hover:hover::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Firefox scrollbar support */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar {
  scrollbar-width: auto;
}

.scrollbar-thick {
  scrollbar-width: auto;
}

/* Firefox color support */
* {
  scrollbar-color: rgb(var(--muted-foreground) / 0.2) transparent;
}

*:hover {
  scrollbar-color: rgb(var(--muted-foreground) / 0.3) transparent;
}
</style>