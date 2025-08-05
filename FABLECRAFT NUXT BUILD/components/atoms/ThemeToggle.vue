<template>
  <DropdownMenu>
    <DropdownMenuTrigger ref="triggerRef" as-child>
      <Button 
        variant="outline" 
        size="icon" 
        class="relative border-border hover:border-foreground/50 hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none transition-all duration-300"
      >
        <AtomIcon 
          :name="currentThemeIcon" 
          class="h-5 w-5 text-foreground/80 hover:text-foreground transition-all duration-300" 
          aria-hidden="true"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent 
      align="end" 
      class="w-72 min-w-0 border-border bg-background/95 backdrop-blur-sm shadow-lg focus:outline-none"
    >
      <DropdownMenuLabel>Theme Selection</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <!-- Scrollable content area with responsive max height -->
      <div class="max-h-96 overflow-y-auto overflow-x-hidden">
        <!-- System preference -->
        <DropdownMenuItem
          @click="() => handleThemeChange('system')"
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
            @click="() => handleThemeChange(theme)"
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
            @click="() => handleThemeChange(theme)"
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
            @click="() => handleThemeChange(theme)"
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
            @click="() => handleThemeChange(theme)"
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
            @click="() => handleThemeChange(theme)"
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
            @click="() => handleThemeChange(theme)"
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
import { nextTick, ref } from 'vue'

// Template ref for the trigger button
const triggerRef = ref<HTMLElement>()

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

// Handle theme change with proper focus management
const handleThemeChange = (theme: string) => {
  setTheme(theme)
  
  // Allow menu to close naturally, then blur the trigger button
  nextTick(() => {
    // Use the template ref to blur the trigger button
    if (triggerRef.value) {
      const buttonElement = triggerRef.value.querySelector('button') as HTMLElement
      if (buttonElement) {
        buttonElement.blur()
      }
    }
  })
}
</script>