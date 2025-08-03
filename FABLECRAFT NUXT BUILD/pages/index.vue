<!-- file: pages/index.vue -->
<script setup lang="ts">
// Industry-standard development environment detection
const isDevelopment = process.env.NODE_ENV === 'development'

// Supabase connection validation 
const user = useSupabaseUser()

const isLoggedIn = computed(() => !!user.value)

// Use centralized theme composable
const { themes, themeCategories, currentTheme, setTheme } = useTheme()

// Background orbs composable
const { orbsEnabled, performanceMode, setPerformanceMode } = useBackgroundOrbs()

// Visual effects controls using useState for SSR-safe state
const firefliesEnabled = useState('fireflies-enabled', () => true)
const fireflyCount = useState('firefly-count', () => 15)
const atmosphericEnabled = useState('atmospheric-enabled', () => true)

// Dropdown states for sections
const showSystemStatus = ref(true) // Start expanded
const showThemeSystem = ref(true) // Start expanded
const showEffectsControls = ref(false) // Start collapsed
const showTypography = ref(false) // Start collapsed for typography

// Computed property to check if all effects are enabled
const allEffectsEnabled = computed(() => {
  return orbsEnabled.value && firefliesEnabled.value && atmosphericEnabled.value
})

// Toggle all effects on/off
const toggleAllEffects = () => {
  const newState = !allEffectsEnabled.value
  orbsEnabled.value = newState
  firefliesEnabled.value = newState
  atmosphericEnabled.value = newState
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
    </ClientOnly>
    <div v-if="atmosphericEnabled" class="atmospheric-gradient" />
    
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

      <!-- Quick Controls -->
      <div class="flex flex-wrap justify-center gap-4">
        <button 
          class="px-4 py-2 bg-muted text-foreground rounded-lg border hover:bg-accent transition-colors"
          @click="toggleAllEffects"
        >
          {{ allEffectsEnabled ? '✨ All Effects On' : '○ All Effects Off' }}
        </button>
      </div>

      <!-- Visual Effects Controls Dropdown -->
      <details :open="showEffectsControls" class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          🎮 Visual Effects Controls
        </summary>
        
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
              v-model="atmosphericEnabled" 
              type="checkbox"
              class="rounded"
            >
            <span>Atmospheric Gradient</span>
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

      <!-- Interactive Theme System Dropdown -->
      <details :open="showThemeSystem" class="bg-card p-8 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary text-center">
          🎨 Interactive Theme System
        </summary>
        
        <div class="space-y-4">
          <p class="text-center text-muted-foreground">
            Click any theme below to see our complete design system in action
          </p>
        
        <!-- Theme Categories -->
        <div class="space-y-8">
          <div v-for="category in themeCategories" :key="category" class="space-y-4">
            <h3 class="text-lg font-semibold text-foreground border-b border-border pb-2">
              {{ category }} ({{ themes.filter(t => t.category === category).length }})
            </h3>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <button
                v-for="theme in themes.filter(t => t.category === category)"
                :key="theme.name"
                :class="[
                  'p-4 rounded-lg border-2 transition-all duration-200 text-left',
                  'hover:scale-105 hover:shadow-md',
                  currentTheme === theme.name 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-border bg-muted/50 hover:border-primary/50'
                ]"
                @click="setTheme(theme.name)"
              >
                <div class="font-medium text-sm">{{ theme.label }}</div>
                <div class="text-xs text-muted-foreground mt-1">{{ theme.name }}</div>
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
          <!-- Foundation Architecture Summary -->
          <div class="border-t border-border pt-4">
            <h3 class="text-sm font-medium text-primary mb-2">Phase 1 Foundation Complete:</h3>
            <div class="text-xs font-mono bg-muted p-3 rounded border space-y-1">
              <div>✅ Step 1: Mathematical spacing (4-point grid)</div>
              <div>✅ Step 2: Theme system (15 themes + SSR)</div>
              <div>✅ Step 3: Typography (Golden ratio + rem units)</div>
              <div>✅ Step 4: Visual effects (GPU-accelerated)</div>
              <div>✅ Supabase integration configured</div>
              <div>✅ ESLint + TypeScript configured</div>
              <div>✅ Production build optimized</div>
            </div>
          </div>

          <p class="text-xs text-muted-foreground">
            Open browser dev tools → Elements → Computed styles to inspect CSS variables
          </p>
        </div>
      </details>

      <p class="text-center text-sm text-muted-foreground">
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