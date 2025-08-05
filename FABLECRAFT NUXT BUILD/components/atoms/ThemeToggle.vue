<template>
  <button
    :class="triggerClasses"
    :aria-label="ariaLabel"
    @click="handleToggle"
  >
    <!-- Simplified: Just text for now -->
    {{ isDark ? '🌙' : '☀️' }} Theme
  </button>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// Component props interface
interface ThemeToggleProps {
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<ThemeToggleProps>(), {
  ariaLabel: 'Toggle theme',
})

// Use theme system
const { 
  isDark,
  toggleTheme
} = useTheme()

// Handle theme toggle
const handleToggle = () => {
  toggleTheme()
}

// Compute trigger classes
const triggerClasses = computed(() => {
  return cn(
    'relative transition-all duration-300 px-3 py-2 rounded-md',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'text-sm font-medium cursor-pointer',
    props.class
  )
})
</script>

<style scoped>
.theme-header {
  @apply p-4 pb-2 border-b border-border/20;
}

.theme-item {
  @apply flex items-center space-x-3;
}

.theme-preview {
  @apply w-4 h-4 rounded-full border border-border/30 shadow-sm flex-shrink-0;
}

.theme-info {
  @apply flex-1 min-w-0;
}

.theme-label {
  @apply font-medium text-foreground flex items-center justify-between;
}

.theme-description {
  @apply text-xs text-muted-foreground mt-1 line-clamp-2;
}

/* Scroll styling for theme list */
:deep(.overflow-y-auto) {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted)) transparent;
}

:deep(.overflow-y-auto::-webkit-scrollbar) {
  @apply w-2;
}

:deep(.overflow-y-auto::-webkit-scrollbar-track) {
  @apply bg-transparent;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb) {
  @apply bg-muted rounded-full border-2 border-transparent bg-clip-content;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
  @apply bg-muted-foreground/50;
}

/* Animation for theme transitions */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    @apply transition-none;
  }
}
</style>