<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button 
        variant="ghost" 
        size="icon" 
        class="relative group overflow-hidden border border-border/50 hover:border-border hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none transition-all duration-300"
        aria-label="Open theme selection menu"
      >
        <!-- Gradient overlay effect (like old GradientButton) -->
        <div 
          class="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          aria-hidden="true"
        />
        
        <!-- Icon with relative positioning -->
        <div class="relative z-10">
          <AtomIcon 
            :name="currentThemeIcon" 
            class="h-5 w-5 text-foreground transition-all duration-300" 
            aria-hidden="true"
          />
        </div>
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent 
      align="end" 
      class="w-72 min-w-0 border-border bg-background/95 backdrop-blur-sm shadow-lg focus:outline-none theme-toggle-dropdown"
    >
      <DropdownMenuLabel>Theme Selection</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <!-- Scrollable content area with responsive max height -->
      <div class="max-h-96 overflow-y-auto overflow-x-hidden">
        <!-- System preference -->
        <DropdownMenuItem
          @click="(event) => handleThemeChange('system', event)"
          class="cursor-pointer"
        >
          <div class="flex items-center gap-3 w-full min-w-0">
            <AtomIcon name="lucide:monitor" class="h-4 w-4 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="font-medium truncate">System</div>
              <div class="text-xs text-muted-foreground truncate">Follow system preference</div>
            </div>
            <div 
              v-if="currentTheme === 'system'" 
              class="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          Core Themes
        </DropdownMenuLabel>

        <!-- Core themes -->
        <template v-for="theme in coreThemes" :key="theme">
          <DropdownMenuItem
            @click="(event) => handleThemeChange(theme, event)"
            class="cursor-pointer"
          >
            <div class="flex items-center gap-3 w-full min-w-0">
              <AtomIcon :name="themeConfig[theme].icon" class="h-4 w-4 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ themeConfig[theme].label }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ themeConfig[theme].description }}</div>
              </div>
              <div 
                v-if="currentTheme === theme" 
                class="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            </div>
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator />
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          Classic Light Themes
        </DropdownMenuLabel>

        <!-- Classic light themes -->
        <template v-for="theme in classicLightThemes" :key="theme">
          <DropdownMenuItem
            @click="(event) => handleThemeChange(theme, event)"
            class="cursor-pointer"
          >
            <div class="flex items-center gap-3 w-full min-w-0">
              <AtomIcon :name="themeConfig[theme].icon" class="h-4 w-4 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ themeConfig[theme].label }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ themeConfig[theme].description }}</div>
              </div>
              <div 
                v-if="currentTheme === theme" 
                class="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            </div>
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator />
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          Classic Dark Themes
        </DropdownMenuLabel>

        <!-- Classic dark themes -->
        <template v-for="theme in classicDarkThemes" :key="theme">
          <DropdownMenuItem
            @click="(event) => handleThemeChange(theme, event)"
            class="cursor-pointer"
          >
            <div class="flex items-center gap-3 w-full min-w-0">
              <AtomIcon :name="themeConfig[theme].icon" class="h-4 w-4 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ themeConfig[theme].label }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ themeConfig[theme].description }}</div>
              </div>
              <div 
                v-if="currentTheme === theme" 
                class="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            </div>
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator />
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          Modern Light Themes
        </DropdownMenuLabel>

        <!-- Modern light themes -->
        <template v-for="theme in modernLightThemes" :key="theme">
          <DropdownMenuItem
            @click="(event) => handleThemeChange(theme, event)"
            class="cursor-pointer"
          >
            <div class="flex items-center gap-3 w-full min-w-0">
              <AtomIcon :name="themeConfig[theme].icon" class="h-4 w-4 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ themeConfig[theme].label }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ themeConfig[theme].description }}</div>
              </div>
              <div 
                v-if="currentTheme === theme" 
                class="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            </div>
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator />
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          Modern Dark Themes
        </DropdownMenuLabel>

        <!-- Modern dark themes -->
        <template v-for="theme in modernDarkThemes" :key="theme">
          <DropdownMenuItem
            @click="(event) => handleThemeChange(theme, event)"
            class="cursor-pointer"
          >
            <div class="flex items-center gap-3 w-full min-w-0">
              <AtomIcon :name="themeConfig[theme].icon" class="h-4 w-4 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ themeConfig[theme].label }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ themeConfig[theme].description }}</div>
              </div>
              <div 
                v-if="currentTheme === theme" 
                class="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            </div>
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator />
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          Specialty Themes
        </DropdownMenuLabel>

        <!-- Specialty themes -->
        <template v-for="theme in specialtyThemes" :key="theme">
          <DropdownMenuItem
            @click="(event) => handleThemeChange(theme, event)"
            class="cursor-pointer"
          >
            <div class="flex items-center gap-3 w-full min-w-0">
              <AtomIcon :name="themeConfig[theme].icon" class="h-4 w-4 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ themeConfig[theme].label }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ themeConfig[theme].description }}</div>
              </div>
              <div 
                v-if="currentTheme === theme" 
                class="ml-auto h-2 w-2 rounded-full bg-primary"
              />
            </div>
          </DropdownMenuItem>
        </template>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
// Use theme composable 
const { currentTheme, setTheme } = useTheme()

// Theme configuration matching React version exactly
const themeConfig = {
  system: { icon: 'lucide:monitor', label: 'System', description: 'Follow system preference' },
  light: { icon: 'lucide:sun', label: 'Light', description: 'Default light theme' },
  dark: { icon: 'lucide:moon', label: 'Dark', description: 'Default dark theme' },
  'arctic-focus': { icon: 'lucide:sun', label: 'Arctic Focus', description: 'Cool blues and whites' },
  'golden-hour': { icon: 'lucide:sun', label: 'Golden Hour', description: 'Warm yellows' },
  'midnight-ink': { icon: 'lucide:moon', label: 'Midnight Ink', description: 'Deep blue-black' },
  'forest-manuscript': { icon: 'lucide:moon', label: 'Forest Manuscript', description: 'Green and brown' },
  'starlit-prose': { icon: 'lucide:moon', label: 'Starlit Prose', description: 'Purple cosmic' },
  'coffee-house': { icon: 'lucide:moon', label: 'Coffee House', description: 'Warm browns' },
  'sunset-coral': { icon: 'lucide:sun', label: 'Sunset Coral', description: 'Warm coral and gold' },
  'lavender-dusk': { icon: 'lucide:sun', label: 'Lavender Dusk', description: 'Soft lavender and grey' },
  'moonlit-garden': { icon: 'lucide:sun', label: 'Moonlit Garden', description: 'Mystical garden greens' },
  halloween: { icon: 'lucide:zap', label: 'Halloween', description: 'Spooky orange and black' },
  'cherry-lacquer': { icon: 'lucide:moon', label: 'Cherry Lacquer', description: 'Luxury deep red' },
  netrunner: { icon: 'lucide:zap', label: 'Netrunner', description: 'Electric yellow and cyan' },
  'dragons-hoard': { icon: 'lucide:moon', label: "Dragon's Hoard", description: 'Fantasy gold treasures' },
} as const

// Theme arrays organized by category (matching React version exactly)
const coreThemes = ['light', 'dark'] as const
const classicLightThemes = ['arctic-focus', 'golden-hour'] as const
const classicDarkThemes = ['midnight-ink', 'forest-manuscript', 'starlit-prose', 'coffee-house'] as const
const modernLightThemes = ['sunset-coral', 'lavender-dusk', 'moonlit-garden'] as const
const modernDarkThemes = ['cherry-lacquer', 'dragons-hoard'] as const
const specialtyThemes = ['halloween', 'netrunner'] as const

// Get current theme icon with proper fallback
const currentThemeIcon = computed(() => {
  const config = themeConfig[currentTheme.value as keyof typeof themeConfig]
  return config?.icon ?? themeConfig.light.icon
})

// Handle theme change with proper focus management (Claude's approach)
const handleThemeChange = (theme: string, event?: Event) => {
  setTheme(theme)
  
  // Claude's recommended approach: Remove focus after selection
  if (event?.target) {
    (event.target as HTMLElement).blur()
  }
}
</script>

<style scoped>
/* Theme-reactive scrollbar styling for dropdown */
.theme-toggle-dropdown :deep() {
  /* Custom scrollbar for webkit browsers */
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--border)) transparent;
}

.theme-toggle-dropdown :deep(*::-webkit-scrollbar) {
  width: 8px;
}

.theme-toggle-dropdown :deep(*::-webkit-scrollbar-track) {
  background: transparent;
}

.theme-toggle-dropdown :deep(*::-webkit-scrollbar-thumb) {
  background-color: hsl(var(--border));
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.theme-toggle-dropdown :deep(*::-webkit-scrollbar-thumb:hover) {
  background-color: hsl(var(--border) / 0.8);
}

/* Enhanced button styling with theme reactivity */
.group:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* Improved focus management - Claude's approach handles this better */
.group:focus:not(:focus-visible) {
  outline: none;
}

/* Enhanced gradient effect */
.group:hover .bg-gradient-to-r {
  background: linear-gradient(
    to right, 
    hsl(var(--foreground) / 0.1) 0%, 
    transparent 70%
  );
}

/* Theme-reactive border enhancement */
.group:hover {
  background-color: hsl(var(--accent) / 0.2);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .group {
    border-color: hsl(var(--foreground));
  }
  
  .theme-toggle-dropdown :deep(*::-webkit-scrollbar-thumb) {
    background-color: hsl(var(--foreground));
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .group,
  .bg-gradient-to-r,
  .theme-toggle-dropdown :deep(*::-webkit-scrollbar-thumb) {
    transition: none !important;
  }
}
</style>