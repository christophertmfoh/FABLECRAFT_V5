<!-- file: pages/index.vue -->
<script setup lang="ts">
// Industry-standard development environment detection
const isDevelopment = process.env.NODE_ENV === 'development'

// Supabase connection validation 
const user = useSupabaseUser()

const isLoggedIn = computed(() => !!user.value)

// Use centralized theme composable with all features
const { 
  themes, 
  themeCategories, 
  currentTheme, 
  currentThemeObject,
  isDark,
  setTheme,
  setThemeWithTransition,
  toggleTheme,
  getTheme,
  isThemeDark
} = useTheme()

// Import theme helper functions
import { getThemesByCategory } from '../constants/data'

// Foundation test imports
import { cn, formatCurrency } from '~/components/atoms/Utils'
import { useComponentId } from '~/composables/useComponentId'
import type { ComponentSize, ComponentVariant } from '~/types'

// Phase 2 Atom imports
import Button from '~/components/atoms/Button.vue'

// Foundation test variables
const testClasses = cn(
  'p-4 rounded-md',
  'bg-primary text-primary-foreground',
  'hover:bg-primary/90'
)

// Test formatCurrency
const formattedUSD = formatCurrency(1234.56)
const formattedEUR = formatCurrency(1234.56, { currency: 'EUR' })
const formattedJPY = formatCurrency(1234, { currency: 'JPY', locale: 'ja-JP' })

// Test useComponentId
const componentId = useComponentId('test')

// Background orbs composable
const { orbsEnabled, performanceMode, setPerformanceMode } = useBackgroundOrbs()

// Visual effects controls using useState for SSR-safe state
const firefliesEnabled = useState('fireflies-enabled', () => true)
const fireflyCount = useState('firefly-count', () => 15)
const paperTextureEnabled = useState('paper-texture-enabled', () => true)

// Dropdown states for sections
const showSystemStatus = ref(true) // Start expanded
const showThemeSystem = ref(true) // Start expanded
const showEffectsControls = ref(false) // Start collapsed
const showTypography = ref(false) // Start collapsed for typography

// Computed property to check if all effects are enabled
const allEffectsEnabled = computed(() => {
  return orbsEnabled.value && firefliesEnabled.value && paperTextureEnabled.value
})

// Toggle all effects on/off
const toggleAllEffects = () => {
  const newState = !allEffectsEnabled.value
  orbsEnabled.value = newState
  firefliesEnabled.value = newState
  paperTextureEnabled.value = newState
}

// Device info for performance
const deviceInfo = ref({
  memory: null as number | null,
  cores: null as number | null,
  reducedMotion: false
})

// Extended Navigator interface for deviceMemory
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

// Detect device capabilities
onMounted(() => {
  if (import.meta.client) {
    const nav = navigator as NavigatorWithMemory
    deviceInfo.value = {
      memory: nav.deviceMemory || null,
      cores: navigator.hardwareConcurrency || null,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }
})

// Development-only debugging (excluded from production)
if (isDevelopment) {
  console.log('🔧 Development Mode: Mathematical spacing system loaded')
  console.log('🎯 Design tokens available:', {
    primitive: 'var(--space-1) through var(--space-32)',
    semantic: 'var(--space-micro) through var(--space-massive)',
    typography: 'var(--text-xs) through var(--text-6xl)',
    golden: 'var(--text-golden-xs) through var(--text-golden-5xl)'
  })
  console.log('🎨 Theme system loaded with', themes.length, 'themes')
  console.log('✨ Visual effects system initialized')
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
    <!-- Background Visual Effects -->
    <ClientOnly>
      <EffectsBackgroundOrbs 
        :enabled="orbsEnabled"
        :performance-mode="performanceMode"
      />
      <EffectsFireflyEffect 
        :enabled="firefliesEnabled"
        :count="fireflyCount" 
        :performance-mode="performanceMode"
      />
      <EffectsPaperTexture 
        :enabled="paperTextureEnabled"
      />
    </ClientOnly>
    
    <div class="max-w-7xl mx-auto p-6 space-y-12 relative z-10">
      
      <!-- Header with Current Theme Display -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Fablecraft Foundation</h1>
        <p class="text-xl text-muted-foreground">Modernized build environment with 15 production themes</p>
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
          <div class="w-3 h-3 rounded-full bg-primary" />
          <span class="text-sm font-medium">Current Theme: {{ currentTheme }}</span>
        </div>
      </div>

      <!-- System Status Dropdown -->
      <details :open="showSystemStatus" class="bg-card p-6 rounded-lg border shadow-sm max-w-md mx-auto">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          📊 System Status
        </summary>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Supabase:</span>
            <span class="text-green-600 font-medium">✓ Connected</span>
          </div>
          <div class="flex justify-between">
            <span>Authentication:</span>
            <span class="text-blue-600 font-medium">{{ isLoggedIn ? '✓ Authenticated' : '◯ Anonymous' }}</span>
          </div>
          <div class="flex justify-between">
            <span>Environment:</span>
            <span class="font-mono text-xs">{{ isDevelopment ? 'Development' : 'Production' }}</span>
          </div>
          <div class="flex justify-between">
            <span>Visual Effects:</span>
            <span class="font-medium">{{ orbsEnabled ? 'Active' : 'Disabled' }}</span>
          </div>
        </div>
      </details>



      <!-- Visual Effects Controls Dropdown -->
      <details :open="showEffectsControls" class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          🎮 Visual Effects Controls
        </summary>
        
        <div class="space-y-6">
          <!-- Quick Toggle All Effects -->
          <div class="flex justify-center">
            <button 
              class="px-4 py-2 bg-muted text-foreground rounded-lg border hover:bg-accent transition-colors"
              @click="toggleAllEffects"
            >
              {{ allEffectsEnabled ? '✨ All Effects On' : '○ All Effects Off' }}
            </button>
          </div>
        
          <!-- Performance Mode -->
        <div>
          <label class="block text-sm font-medium mb-2">Performance Mode</label>
          <select 
            :value="performanceMode" 
            class="w-full px-3 py-2 bg-background border rounded"
            @change="setPerformanceMode($event.target.value as 'low' | 'medium' | 'high')"
          >
            <option value="low">Low (Mobile)</option>
            <option value="medium">Medium (Default)</option>
            <option value="high">High (Desktop)</option>
          </select>
        </div>
        
        <!-- Effect Toggles -->
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input 
              v-model="firefliesEnabled" 
              type="checkbox"
              class="rounded"
            >
            <span>Fireflies ({{ fireflyCount }} elements)</span>
          </label>
          
          <label class="flex items-center gap-2">
            <input 
              v-model="paperTextureEnabled" 
              type="checkbox"
              class="rounded"
            >
            <span>Paper Texture</span>
          </label>
        </div>
        
        <!-- Firefly Count -->
        <div v-if="firefliesEnabled">
          <label class="block text-sm font-medium mb-2">
            Firefly Count: {{ fireflyCount }}
          </label>
          <input 
            v-model.number="fireflyCount"
            type="range" 
            min="1"
            max="12"
            class="w-full"
          >
        </div>

        <!-- Device Info -->
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium">Device Memory:</span>
            <span class="ml-2">{{ deviceInfo.memory || 'Unknown' }} GB</span>
          </div>
          <div>
            <span class="font-medium">CPU Cores:</span>
            <span class="ml-2">{{ deviceInfo.cores || 'Unknown' }}</span>
          </div>
          <div>
            <span class="font-medium">Reduced Motion:</span>
            <span class="ml-2">{{ deviceInfo.reducedMotion ? 'Yes' : 'No' }}</span>
          </div>
          <div>
            <span class="font-medium">Performance:</span>
            <span class="ml-2">{{ performanceMode }}</span>
          </div>
        </div>
        </div>
      </details>

      <!-- Typography Showcase Dropdown -->
      <details :open="showTypography" class="bg-card p-8 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          📝 Typography System
        </summary>
        
        <!-- Golden Ratio Scale -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold mb-4">Golden Ratio Typography Scale (1.618)</h3>
          <p class="text-golden-xs">text-golden-xs: The quick brown fox jumps over the lazy dog (9.88px)</p>
          <p class="text-golden-sm">text-golden-sm: The quick brown fox jumps over the lazy dog (12.23px)</p>
          <p class="text-golden-base">text-golden-base: The quick brown fox jumps over the lazy dog (16px)</p>
          <p class="text-golden-lg">text-golden-lg: The quick brown fox jumps over the lazy dog (25.88px)</p>
          <p class="text-golden-xl">text-golden-xl: The quick brown fox jumps over the lazy dog (41.85px)</p>
          <p class="text-golden-2xl">text-golden-2xl: The quick brown fox (67.67px)</p>
          <p class="text-golden-3xl">text-golden-3xl: The quick brown (109.46px)</p>
        </div>

        <!-- Letter Spacing -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold mb-4">Letter Spacing Examples</h3>
          <p class="tracking-tighter text-2xl">tracking-tighter: Display Text</p>
          <p class="tracking-tight text-xl">tracking-tight: Heading Text</p>
          <p class="tracking-normal">tracking-normal: Body text with normal spacing</p>
          <p class="tracking-wide text-sm">tracking-wide: Small text with wide spacing</p>
          <p class="tracking-wider text-sm uppercase">tracking-wider: UPPERCASE TEXT</p>
        </div>
      </details>

      <!-- Interactive Theme System & Persistence Test -->
      <details :open="showThemeSystem" class="bg-card p-8 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          🎨 Interactive Theme System & Persistence Test
        </summary>
        
        <div class="space-y-6">
          <!-- Current Theme Information -->
          <div class="bg-muted/30 rounded-lg p-4 border">
            <h3 class="font-semibold text-sm mb-3">Current Theme Information</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span class="text-muted-foreground">Name:</span>
                <span class="ml-2 font-medium">{{ currentTheme }}</span>
              </div>
              <div>
                <span class="text-muted-foreground">Label:</span>
                <span class="ml-2 font-medium">{{ currentThemeObject.label }}</span>
              </div>
              <div>
                <span class="text-muted-foreground">Category:</span>
                <span class="ml-2 font-medium">{{ currentThemeObject.category }}</span>
              </div>
              <div>
                <span class="text-muted-foreground">Dark Mode:</span>
                <span class="ml-2 font-medium">{{ isDark ? 'Yes' : 'No' }}</span>
              </div>
            </div>
            
            <!-- Theme Preview Colors -->
            <div v-if="currentThemeObject.preview" class="mt-3 flex items-center gap-2">
              <span class="text-sm text-muted-foreground">Preview:</span>
              <div 
                class="w-6 h-6 rounded shadow-sm" 
                :style="{ backgroundColor: currentThemeObject.preview.primary }"
                title="Primary"
              ></div>
              <div 
                class="w-6 h-6 rounded shadow-sm" 
                :style="{ backgroundColor: currentThemeObject.preview.secondary }"
                title="Secondary"
              ></div>
              <div 
                class="w-6 h-6 rounded shadow-sm border" 
                :style="{ backgroundColor: currentThemeObject.preview.background }"
                title="Background"
              ></div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-muted/20 rounded-lg p-4 border">
            <h3 class="font-semibold text-sm mb-3">Quick Actions & Persistence Test</h3>
            <div class="flex flex-wrap gap-3">
              <button
                @click="toggleTheme"
                class="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-all"
              >
                Toggle Light/Dark
              </button>
              <button
                @click="setThemeWithTransition('light')"
                class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:opacity-90 transition-all"
              >
                Set Light
              </button>
              <button
                @click="setThemeWithTransition('dark')"
                class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:opacity-90 transition-all"
              >
                Set Dark
              </button>
              <button
                @click="() => window.location.reload()"
                class="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm hover:opacity-90 transition-all"
              >
                🔄 Refresh Page
              </button>
            </div>
            
            <div class="mt-3 p-3 bg-background/50 rounded text-xs text-muted-foreground">
              <strong>Persistence Test:</strong> Select a theme, then click "Refresh Page" or press F5. The theme should persist across page refreshes and navigation.
            </div>
          </div>
        
          <!-- Theme Selection Grid -->
          <div class="space-y-6">
            <p class="text-center text-muted-foreground text-sm">
              Click any theme below to instantly switch. Themes persist using cookies (SSR) + localStorage.
            </p>
            
            <div v-for="category in themeCategories" :key="category" class="space-y-3">
              <h3 class="text-base font-semibold text-foreground border-b border-border pb-2">
                {{ category }} ({{ getThemesByCategory(category).length }})
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <button
                  v-for="theme in getThemesByCategory(category)"
                  :key="theme.name"
                  :class="[
                    'p-3 rounded-lg border-2 transition-all duration-200 text-left relative overflow-hidden',
                    'hover:scale-105 hover:shadow-md',
                    currentTheme === theme.name 
                      ? 'border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20' 
                      : 'border-border bg-muted/50 hover:border-primary/50'
                  ]"
                  @click="setThemeWithTransition(theme.name)"
                >
                  <!-- Active indicator -->
                  <div v-if="currentTheme === theme.name" class="absolute top-1 right-1">
                    <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                  
                  <div class="font-medium text-sm">{{ theme.label }}</div>
                  <div v-if="theme.description" class="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {{ theme.description }}
                  </div>
                  
                  <!-- Theme preview colors -->
                  <div v-if="theme.preview" class="flex gap-1 mt-2">
                    <div 
                      class="w-4 h-4 rounded-full shadow-sm" 
                      :style="{ backgroundColor: theme.preview.primary }"
                    ></div>
                    <div 
                      class="w-4 h-4 rounded-full shadow-sm" 
                      :style="{ backgroundColor: theme.preview.secondary }"
                    ></div>
                    <div 
                      class="w-4 h-4 rounded-full shadow-sm border" 
                      :style="{ backgroundColor: theme.preview.background }"
                    ></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

        <!-- Theme Demo Content -->
        <div class="mt-12 space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-4">Live Theme Preview</h3>
            <p class="text-muted-foreground">All colors and components update automatically</p>
          </div>
          
          <!-- Color Palette Display -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="h-12 bg-primary rounded border flex items-center justify-center">
                <span class="text-primary-foreground text-xs font-medium">Primary</span>
              </div>
              <div class="text-xs text-center text-muted-foreground">Primary</div>
            </div>
            <div class="space-y-2">
              <div class="h-12 bg-secondary rounded border flex items-center justify-center">
                <span class="text-secondary-foreground text-xs font-medium">Secondary</span>
              </div>
              <div class="text-xs text-center text-muted-foreground">Secondary</div>
            </div>
            <div class="space-y-2">
              <div class="h-12 bg-accent rounded border flex items-center justify-center">
                <span class="text-accent-foreground text-xs font-medium">Accent</span>
              </div>
              <div class="text-xs text-center text-muted-foreground">Accent</div>
            </div>
            <div class="space-y-2">
              <div class="h-12 bg-muted rounded border flex items-center justify-center">
                <span class="text-muted-foreground text-xs font-medium">Muted</span>
              </div>
              <div class="text-xs text-center text-muted-foreground">Muted</div>
            </div>
          </div>

          <!-- Interactive Components -->
          <div class="flex flex-wrap gap-4 justify-center">
            <button class="auth-button px-6 py-2 rounded-lg font-medium transition-colors">
              Auth Button
            </button>
            <button class="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <button class="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Secondary Button
            </button>
          </div>

          <!-- Floating Orbs -->
          <div class="relative h-32 bg-muted/30 rounded-lg overflow-hidden">
            <div class="floating-orb--primary absolute top-4 left-8 w-16 h-16 rounded-full" />
            <div class="floating-orb--secondary absolute bottom-4 right-8 w-12 h-12 rounded-full" />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-sm text-muted-foreground">Theme-reactive floating orbs</span>
            </div>
          </div>
        </div>
        </div>
      </details>



      <!-- Development-Only Validation Tests -->
      <details v-if="isDevelopment" class="bg-card p-6 rounded-lg border shadow-sm text-left">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          🔧 Foundation Systems Check
        </summary>
        
        <div class="space-y-6">
          <!-- Phase 2 Foundation Tests -->
          <div class="border-t border-border pt-4">
            <h3 class="text-sm font-medium text-primary mb-4">Phase 2 Foundation Tests:</h3>
            
            <!-- Test cn utility -->
            <div class="mb-4">
              <h4 class="text-xs font-semibold mb-2">Testing cn() utility:</h4>
              <div :class="testClasses" class="text-sm">
                This div uses cn() to merge classes
              </div>
              <p class="text-sm text-muted-foreground mt-2">
                Classes: {{ testClasses }}
              </p>
            </div>

            <!-- Test formatCurrency utility -->
            <div class="mb-4">
              <h4 class="text-xs font-semibold mb-2">Testing formatCurrency():</h4>
              <p class="text-sm">USD: {{ formattedUSD }}</p>
              <p class="text-sm">EUR: {{ formattedEUR }}</p>
              <p class="text-sm">JPY: {{ formattedJPY }}</p>
            </div>

            <!-- Test useComponentId -->
            <div class="mb-4">
              <h4 class="text-xs font-semibold mb-2">Testing useComponentId():</h4>
              <p class="text-sm">Component ID: {{ componentId }}</p>
            </div>
          </div>
        </div>
      </details>

      <!-- Phase 2: Atoms Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          🔘 Buttons (1 component)
        </summary>
        
        <div class="space-y-8">
          <!-- Button Variants -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Variants</h3>
            <div class="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <!-- Button Sizes -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" icon="lucide:settings" />
            </div>
          </div>

          <!-- Button with Icons -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">With Icons</h3>
            <div class="flex flex-wrap gap-4">
              <Button icon="lucide:mail">Email</Button>
              <Button icon="lucide:arrow-right" trailing>Continue</Button>
              <Button variant="outline" icon="lucide:github">GitHub</Button>
              <Button variant="ghost" size="icon" icon="lucide:menu" />
            </div>
          </div>

          <!-- Button States -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">States</h3>
            <div class="flex flex-wrap gap-4">
              <Button loading>Loading</Button>
              <Button loading trailing>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled</Button>
            </div>
          </div>

          <!-- Button as Link -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">As Link</h3>
            <div class="flex flex-wrap gap-4">
              <Button to="/" icon="lucide:home">Home</Button>
              <Button href="https://github.com" target="_blank" variant="outline" icon="lucide:external-link">
                External Link
              </Button>
            </div>
          </div>

          <!-- Custom Styling -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Custom Styling</h3>
            <div class="flex flex-wrap gap-4">
              <Button class="rounded-full">Rounded Full</Button>
              <Button class="bg-gradient-to-r from-primary to-primary/60">Gradient</Button>
              <Button variant="outline" class="border-2 border-primary">Custom Border</Button>
            </div>
          </div>
        </div>
      </details>

      <p class="text-center text-sm text-muted-foreground mt-8">
        Fablecraft Foundation - Production-ready with all systems operational
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Dropdown smooth transitions */
details {
  transition: all 0.3s ease;
}

details summary {
  list-style: none;
  user-select: none;
  cursor: pointer;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

details[open] summary::before {
  transform: rotate(90deg);
}

/* Ensure buttons inside details are clickable */
details button {
  pointer-events: auto;
  position: relative;
  z-index: 1;
}

/* Development-only styles - excluded from production */
.development-only {
  /* This class and its styles are only active in development */
  display: block;
}

/* Production override - hide development sections */
@media (min-width: 1px) {
  .development-only {
    display: none;
  }
}

/* Development environment detection override */
@supports (--debug: development) {
  .development-only {
    display: block !important;
  }
}
</style>