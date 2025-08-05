<template>
  <AtomsDropdownMenu>
    <!-- Trigger Button -->
    <AtomsDropdownMenuTrigger as-child>
      <AtomsButton 
        variant="ghost"
        size="icon"
        :class="triggerClasses"
        :aria-label="ariaLabel"
      >
        <AtomsAtomIcon 
          :name="themeIcon"
          size="md"
          aria-hidden="true"
        />
      </AtomsButton>
    </AtomsDropdownMenuTrigger>

    <!-- Dropdown Content -->
    <AtomsDropdownMenuContent 
      align="end"
      :class="contentClasses"
    >
      <!-- Current Theme Header -->
      <div class="theme-header">
        <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Current Theme
        </div>
        <div class="font-medium text-foreground">
          {{ currentThemeObject.label }}
        </div>
      </div>

      <AtomsDropdownMenuSeparator />

      <!-- Theme Categories -->
      <template
        v-for="category in themeCategories"
        :key="category"
      >
        <!-- Category Label -->
        <AtomsDropdownMenuLabel>
          {{ category }}
        </AtomsDropdownMenuLabel>

        <!-- Themes in Category -->
        <AtomsDropdownMenuItem
          v-for="theme in getThemesByCategory(category)"
          :key="theme.name"
          :class="themeItemClasses(theme)"
          @click="() => handleThemeChange(theme.name)"
        >
          <div class="theme-item">
            <!-- Theme Preview -->
            <div 
              v-if="theme.preview"
              class="theme-preview"
              :style="getThemePreviewStyle(theme)"
              aria-hidden="true"
            />
            
            <!-- Theme Info -->
            <div class="theme-info">
              <div class="theme-label">
                {{ theme.label }}
                <!-- Current indicator -->
                <AtomsAtomIcon 
                  v-if="currentTheme === theme.name"
                  name="lucide:check"
                  size="xs"
                  class="text-primary ml-auto"
                  aria-hidden="true"
                />
              </div>
              <div 
                v-if="theme.description"
                class="theme-description"
              >
                {{ theme.description }}
              </div>
            </div>
          </div>
        </AtomsDropdownMenuItem>

        <!-- Separator between categories (except last) -->
        <AtomsDropdownMenuSeparator 
          v-if="category !== themeCategories[themeCategories.length - 1]"
        />
      </template>
    </AtomsDropdownMenuContent>
  </AtomsDropdownMenu>
</template>

<script setup lang="ts">
import { cn } from './Utils'
import type { Theme } from '../constants/data'

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
  themes,
  themeCategories,
  currentTheme,
  currentThemeObject,
  isDark,
  setThemeWithTransition
} = useTheme()

// Handle theme change
const handleThemeChange = (themeName: string) => {
  setThemeWithTransition(themeName)
}

// Get themes by category
const getThemesByCategory = (category: string): Theme[] => {
  return themes.filter(theme => theme.category === category)
}

// Get theme icon based on current theme
const themeIcon = computed(() => {
  if (isDark.value) {
    return 'lucide:moon'
  }
  return 'lucide:sun'
})

// Compute trigger classes
const triggerClasses = computed(() => {
  return cn(
    'relative transition-all duration-300',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    props.class
  )
})

// Compute content classes
const contentClasses = computed(() => {
  return cn(
    'w-80 max-h-96 overflow-y-auto',
    'bg-popover/95 backdrop-blur-xl border border-border shadow-xl rounded-xl',
    'mt-2'
  )
})

// Compute theme item classes
const themeItemClasses = (theme: Theme) => {
  return cn(
    'cursor-pointer py-3 px-4 rounded-lg transition-colors',
    'hover:bg-accent/10 focus:bg-accent/10',
    currentTheme.value === theme.name 
      ? 'bg-accent/20 border-l-2 border-primary' 
      : ''
  )
}

// Get theme preview style
const getThemePreviewStyle = (theme: Theme) => {
  if (!theme.preview) return {}
  
  return {
    background: `linear-gradient(135deg, ${theme.preview.primary} 0%, ${theme.preview.secondary} 50%, ${theme.preview.background} 100%)`
  }
}
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