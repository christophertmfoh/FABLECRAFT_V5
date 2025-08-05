<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        :class="triggerClasses"
        :aria-label="ariaLabel"
        variant="ghost"
        size="icon"
      >
        <!-- Dynamic icon based on current theme -->
        <AtomIcon 
          :name="currentThemeIcon" 
          class="h-4 w-4 transition-transform duration-300" 
          aria-hidden="true"
        />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent 
      align="end" 
      class="w-80 bg-card/95 backdrop-blur-xl border border-border shadow-xl rounded-xl mt-2 max-h-96 overflow-y-auto"
    >
      <!-- Theme Header -->
      <div class="theme-header">
        <div class="text-sm font-semibold text-foreground">
          Choose Theme
        </div>
        <div class="text-xs text-muted-foreground mt-1">
          Current: {{ currentThemeObject.label }}
        </div>
      </div>

      <!-- Theme Categories -->
      <div v-for="category in themeCategories" :key="category" class="p-2 border-b border-border/20 last:border-b-0">
        <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {{ category }}
        </div>
        
        <template v-for="theme in getThemesByCategory(category)" :key="theme.name">
          <DropdownMenuItem
            class="cursor-pointer hover:bg-accent/10 p-3 rounded-lg transition-colors theme-item"
            @click="() => handleThemeChange(theme.name)"
          >
            <!-- Theme Preview Circle -->
            <div 
              class="theme-preview"
              :style="{ backgroundColor: theme.preview?.primary || 'currentColor' }"
            />
            
            <!-- Theme Info -->
            <div class="theme-info">
              <div class="theme-label">
                {{ theme.label }}
                <!-- Current theme indicator -->
                <AtomIcon 
                  v-if="currentTheme === theme.name"
                  name="lucide:check"
                  class="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
              </div>
              <div v-if="theme.description" class="theme-description">
                {{ theme.description }}
              </div>
            </div>
          </DropdownMenuItem>
        </template>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
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
  ariaLabel: 'Change theme',
})

// Use theme system with all features
const { 
  themes, 
  themeCategories, 
  currentTheme, 
  currentThemeObject,
  isDark,
  setThemeWithTransition,
} = useTheme()

// Get themes by category
const getThemesByCategory = (category: string) => {
  return themes.filter(theme => theme.category === category)
}

// Get current theme icon
const currentThemeIcon = computed(() => {
  const theme = currentThemeObject.value
  if (!theme) return 'lucide:sun'
  
  // Icon based on color scheme
  switch (theme.colorScheme) {
    case 'dark':
      return 'lucide:moon'
    case 'auto':
      return 'lucide:monitor'
    default:
      return 'lucide:sun'
  }
})

// Handle theme change
const handleThemeChange = (themeName: string) => {
  setThemeWithTransition(themeName)
}

// Compute trigger classes
const triggerClasses = computed(() => {
  return cn(
    'relative transition-all duration-300 hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
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