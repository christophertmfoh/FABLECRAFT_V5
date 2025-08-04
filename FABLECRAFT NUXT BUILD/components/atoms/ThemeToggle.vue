<template>
  <button
    type="button"
    role="switch"
    :aria-checked="currentTheme === 'dark'"
    :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`"
    :class="toggleClasses"
    @click="toggleTheme"
  >
    <span class="sr-only">Toggle theme</span>
    
    <!-- Sun icon for light mode -->
    <Icon
      name="lucide:sun"
      :class="iconClasses"
      :style="{ opacity: currentTheme === 'light' ? 1 : 0 }"
    />
    
    <!-- Moon icon for dark mode -->
    <Icon
      name="lucide:moon"
      :class="iconClasses"
      :style="{ opacity: currentTheme === 'dark' ? 1 : 0 }"
    />
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { cn } from './Utils'

// Component props
interface ThemeToggleProps {
  defaultTheme?: 'light' | 'dark' | 'system'
  storageKey?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<ThemeToggleProps>(), {
  defaultTheme: 'system',
  storageKey: 'nuxt-theme'
})

// State
const currentTheme = ref<'light' | 'dark'>('light')
const isHydrated = ref(false)

// Get system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (import.meta.client && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

// Apply theme to document
const applyTheme = (theme: 'light' | 'dark') => {
  if (import.meta.client) {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.removeAttribute('data-theme')
      root.classList.remove('dark')
    }
    
    // Store preference
    try {
      localStorage.setItem(props.storageKey, theme)
    } catch (e) {
      console.warn('Failed to save theme preference:', e)
    }
  }
}

// Initialize theme
const initializeTheme = () => {
  if (import.meta.client) {
    // Check stored preference first
    try {
      const stored = localStorage.getItem(props.storageKey)
      if (stored === 'light' || stored === 'dark') {
        currentTheme.value = stored
        applyTheme(stored)
        return
      }
    } catch (e) {
      console.warn('Failed to read theme preference:', e)
    }
    
    // Fall back to system preference or default
    const theme = props.defaultTheme === 'system' ? getSystemTheme() : props.defaultTheme
    currentTheme.value = theme as 'light' | 'dark'
    applyTheme(currentTheme.value)
  }
}

// Toggle theme
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  applyTheme(currentTheme.value)
}

// Listen for system preference changes
if (import.meta.client) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    try {
      if (!localStorage.getItem(props.storageKey)) {
        currentTheme.value = e.matches ? 'dark' : 'light'
        applyTheme(currentTheme.value)
      }
    } catch (err) {
      console.warn('Failed to check theme preference:', err)
    }
  })
}

// Initialize on mount
onMounted(() => {
  initializeTheme()
  isHydrated.value = true
})

// For SSR, also run initialization immediately if on client
if (import.meta.client && !isHydrated.value) {
  initializeTheme()
}

// Computed classes
const toggleClasses = computed(() => {
  return cn(
    'relative inline-flex h-10 w-10 items-center justify-center rounded-lg',
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'transition-colors',
    props.class
  )
})

const iconClasses = computed(() => {
  return cn(
    'h-[1.2rem] w-[1.2rem] transition-all duration-200',
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  )
})

// Add inline script to prevent FOUC
if (import.meta.server) {
  useHead({
    script: [
      {
        innerHTML: `
          (function() {
            try {
              const theme = localStorage.getItem('${props.storageKey}') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.classList.add('dark');
              }
            } catch (e) {
              // Fallback to light theme if localStorage fails
            }
          })();
        `.trim(),
        type: 'text/javascript',
        tagPosition: 'head'
      }
    ]
  })
}
</script>