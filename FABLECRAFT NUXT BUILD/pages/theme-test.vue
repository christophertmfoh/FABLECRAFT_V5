<template>
  <div class="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
    <div class="container mx-auto p-8 max-w-4xl">
      <!-- Header -->
      <h1 class="text-4xl font-bold mb-8">Theme Persistence Test</h1>
      
      <!-- Current Theme Info -->
      <div class="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg p-6 mb-8 shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Current Theme Information</h2>
        <div class="space-y-2">
          <p><strong>Theme Name:</strong> {{ currentTheme }}</p>
          <p><strong>Theme Label:</strong> {{ currentThemeObject.label }}</p>
          <p><strong>Category:</strong> {{ currentThemeObject.category }}</p>
          <p><strong>Color Scheme:</strong> {{ currentThemeObject.colorScheme }}</p>
          <p><strong>Is Dark:</strong> {{ isDark ? 'Yes' : 'No' }}</p>
        </div>
        
        <!-- Theme Preview -->
        <div v-if="currentThemeObject.preview" class="mt-4">
          <h3 class="font-semibold mb-2">Theme Colors:</h3>
          <div class="flex gap-4">
            <div class="flex items-center gap-2">
              <div 
                class="w-8 h-8 rounded" 
                :style="{ backgroundColor: currentThemeObject.preview.primary }"
              ></div>
              <span class="text-sm">Primary</span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="w-8 h-8 rounded" 
                :style="{ backgroundColor: currentThemeObject.preview.secondary }"
              ></div>
              <span class="text-sm">Secondary</span>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="w-8 h-8 rounded border" 
                :style="{ backgroundColor: currentThemeObject.preview.background }"
              ></div>
              <span class="text-sm">Background</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg p-6 mb-8 shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div class="flex gap-4 flex-wrap">
          <button
            @click="toggleTheme"
            class="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded hover:opacity-90 transition-opacity"
          >
            Toggle Light/Dark
          </button>
          <button
            @click="setThemeWithTransition('light')"
            class="px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded hover:opacity-90 transition-opacity"
          >
            Set Light Theme
          </button>
          <button
            @click="setThemeWithTransition('dark')"
            class="px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded hover:opacity-90 transition-opacity"
          >
            Set Dark Theme
          </button>
          <button
            @click="refreshPage"
            class="px-4 py-2 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded hover:opacity-90 transition-opacity"
          >
            Refresh Page
          </button>
        </div>
      </div>
      
      <!-- Theme Selection Grid -->
      <div class="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg p-6 mb-8 shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">All Available Themes</h2>
        
        <div v-for="category in themeCategories" :key="category" class="mb-6">
          <h3 class="text-lg font-semibold mb-3 text-[hsl(var(--muted-foreground))]">{{ category }}</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <button
              v-for="theme in getThemesByCategory(category)"
              :key="theme.name"
              @click="setThemeWithTransition(theme.name)"
              class="p-3 rounded-lg border-2 transition-all hover:scale-105"
              :class="{
                'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]': currentTheme === theme.name,
                'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]': currentTheme !== theme.name
              }"
            >
              <div class="text-sm font-medium">{{ theme.label }}</div>
              <div v-if="theme.description" class="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                {{ theme.description }}
              </div>
              <div v-if="theme.preview" class="flex gap-1 mt-2 justify-center">
                <div 
                  class="w-4 h-4 rounded-full" 
                  :style="{ backgroundColor: theme.preview.primary }"
                ></div>
                <div 
                  class="w-4 h-4 rounded-full" 
                  :style="{ backgroundColor: theme.preview.secondary }"
                ></div>
                <div 
                  class="w-4 h-4 rounded-full border" 
                  :style="{ backgroundColor: theme.preview.background }"
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Persistence Test Instructions -->
      <div class="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-3">Testing Theme Persistence</h2>
        <ol class="list-decimal list-inside space-y-2">
          <li>Select any theme from the grid above</li>
          <li>Click "Refresh Page" or manually refresh your browser (F5)</li>
          <li>The selected theme should persist after the refresh</li>
          <li>Try navigating to another page and back</li>
          <li>Theme should remain consistent across navigation</li>
        </ol>
        
        <div class="mt-4 p-4 bg-[hsl(var(--background))] rounded">
          <p class="text-sm"><strong>Note:</strong> Themes are stored in both cookies (for SSR) and localStorage (for client-side). This ensures theme persistence works correctly with Nuxt's server-side rendering.</p>
        </div>
      </div>
      
      <!-- Navigation -->
      <div class="flex gap-4 justify-center">
        <NuxtLink
          to="/"
          class="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded hover:opacity-90 transition-opacity"
        >
          Back to Home
        </NuxtLink>
        <NuxtLink
          to="/typography-test"
          class="px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded hover:opacity-90 transition-opacity"
        >
          Typography Test
        </NuxtLink>
        <NuxtLink
          to="/visual-effects-test"
          class="px-4 py-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded hover:opacity-90 transition-opacity"
        >
          Visual Effects Test
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getThemesByCategory } from '../constants/data'

// Use the theme composable
const { 
  themes, 
  themeCategories, 
  currentTheme, 
  currentThemeObject,
  isDark,
  setTheme,
  setThemeWithTransition,
  toggleTheme 
} = useTheme()

// Refresh page function
const refreshPage = () => {
  window.location.reload()
}

// SEO
useSeoMeta({
  title: 'Theme Persistence Test - Fablecraft',
  description: 'Test page for verifying theme persistence across page refreshes and navigation'
})
</script>