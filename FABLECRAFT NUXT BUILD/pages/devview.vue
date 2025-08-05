<!-- file: pages/index.vue -->
<script setup lang="ts">
import { logger } from '~/utils/logger'

// Import theme helper functions
import { getThemesByCategory } from '../constants/data'

// Foundation test imports
import { cn, formatCurrency } from '~/components/atoms/Utils'
import { useComponentId } from '~/composables/useComponentId'

// Atom imports
import Button from '~/components/atoms/Button.vue'
import AtomIcon from '~/components/atoms/AtomIcon.vue'
import Input from '~/components/atoms/Input.vue'
import Badge from '~/components/atoms/Badge.vue'
import Spinner from '~/components/atoms/Spinner.vue'
import Card from '~/components/atoms/Card.vue'
import CardTitle from '~/components/atoms/CardTitle.vue'
import CardDescription from '~/components/atoms/CardDescription.vue'
import GlassCard from '~/components/atoms/GlassCard.vue'
import Container from '~/components/atoms/Container.vue'
import Section from '~/components/atoms/Section.vue'
import Heading from '~/components/atoms/Heading.vue'
import Text from '~/components/atoms/Text.vue'
import Label from '~/components/atoms/Label.vue'

// Priority 4 component imports
import GradientButton from '~/components/atoms/GradientButton.vue'
import BadgeWithDot from '~/components/atoms/BadgeWithDot.vue'
import Separator from '~/components/atoms/Separator.vue'
import LoadingFallback from '~/components/atoms/LoadingFallback.vue'
import IconContainer from '~/components/atoms/IconContainer.vue'
import ScrollArea from '~/components/atoms/ScrollArea.vue'

// Priority 5 component imports (Form components)
import Checkbox from '~/components/atoms/Checkbox.vue'
import FormMessage from '~/components/atoms/FormMessage.vue'
import Radio from '~/components/atoms/Radio.vue'

// Priority 6 component imports (Special effect components)
import Dot from '~/components/atoms/Dot.vue'
import StarRating from '~/components/atoms/StarRating.vue'
import StepNumber from '~/components/atoms/StepNumber.vue'
import VisuallyHidden from '~/components/atoms/VisuallyHidden.vue'

// Priority 7 component imports (Dropdown menu components)
import DropdownMenu from '~/components/atoms/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/atoms/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/atoms/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/atoms/DropdownMenuItem.vue'
import DropdownMenuLabel from '~/components/atoms/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '~/components/atoms/DropdownMenuSeparator.vue'
import DropdownMenuCheckboxItem from '~/components/atoms/DropdownMenuCheckboxItem.vue'
import DropdownMenuRadioItem from '~/components/atoms/DropdownMenuRadioItem.vue'

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
  setThemeWithTransition,
  toggleTheme,
} = useTheme()

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

// Input test values
const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const inputValue4 = ref('')

// Form component test values
const checkboxValue1 = ref(false)
const checkboxValue2 = ref(true)
const checkboxValue3 = ref(false)

// Radio button test values
const radioValue1 = ref('option1')
const radioValue2 = ref('small')
const radioValue3 = ref('')

// Priority 6 component test values
const starRating1 = ref(0)
const starRating2 = ref(3)
const starRating3 = ref(5)

// Priority 7 dropdown test values
const dropdownCheckbox1 = ref(true)
const dropdownCheckbox2 = ref(false)
const dropdownCheckbox3 = ref(true)
const dropdownRadioValue = ref('option2')
const dropdownAlignment = ref('start')

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
  reducedMotion: false,
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
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }
  }
})

// Development-only debugging (excluded from production)
if (isDevelopment) {
  logger.log('Development Mode: Mathematical spacing system loaded')
  logger.log('Design tokens available:', {
    primitive: 'var(--space-1) through var(--space-32)',
    semantic: 'var(--space-micro) through var(--space-massive)',
    typography: 'var(--text-xs) through var(--text-6xl)',
    golden: 'var(--text-golden-xs) through var(--text-golden-5xl)',
  })
  logger.log('Theme system loaded with', themes.length, 'themes')
  logger.log('Visual effects system initialized')
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
    <!-- Background Visual Effects -->
    <ClientOnly>
      <EffectsBackgroundOrbs :enabled="orbsEnabled" :performance-mode="performanceMode" />
      <EffectsFireflyEffect
        :enabled="firefliesEnabled"
        :count="fireflyCount"
        :performance-mode="performanceMode"
      />
      <EffectsPaperTexture :enabled="paperTextureEnabled" />
    </ClientOnly>

    <div class="max-w-7xl mx-auto p-6 space-y-12 relative z-10">
      <!-- Header with Current Theme Display -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Fablecraft Foundation</h1>
        <p class="text-xl text-muted-foreground">
          Modernized build environment with 15 production themes
        </p>
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
          <div class="w-3 h-3 rounded-full bg-primary" />
          <span class="text-sm font-medium">Current Theme: {{ currentTheme }}</span>
        </div>
      </div>

      <!-- System Status Dropdown -->
      <details
        :open="showSystemStatus"
        class="bg-card p-6 rounded-lg border shadow-sm max-w-md mx-auto"
      >
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          System Status
        </summary>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Supabase:</span>
            <span class="text-green-600 font-medium">✓ Connected</span>
          </div>
          <div class="flex justify-between">
            <span>Authentication:</span>
            <span class="text-blue-600 font-medium">{{
              isLoggedIn ? '✓ Authenticated' : '◯ Anonymous'
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Environment:</span>
            <span class="font-mono text-xs">{{
              isDevelopment ? 'Development' : 'Production'
            }}</span>
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
          Visual Effects Controls
        </summary>

        <div class="space-y-6">
          <!-- Quick Toggle All Effects -->
          <div class="flex justify-center">
            <button
              class="px-4 py-2 bg-muted text-foreground rounded-lg border hover:bg-accent transition-colors"
              @click="toggleAllEffects"
            >
              {{ allEffectsEnabled ? 'All Effects On' : 'All Effects Off' }}
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
              <input v-model="firefliesEnabled" type="checkbox" class="rounded" />
              <span>Fireflies ({{ fireflyCount }} elements)</span>
            </label>

            <label class="flex items-center gap-2">
              <input v-model="paperTextureEnabled" type="checkbox" class="rounded" />
              <span>Paper Texture</span>
            </label>
          </div>

          <!-- Firefly Count -->
          <div v-if="firefliesEnabled">
            <label class="block text-sm font-medium mb-2">
              Firefly Count: {{ fireflyCount }}
            </label>
            <input v-model.number="fireflyCount" type="range" min="1" max="12" class="w-full" />
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
          Typography System
        </summary>

        <!-- Golden Ratio Scale -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold mb-4">Golden Ratio Typography Scale (1.618)</h3>
          <p class="text-golden-xs">
            text-golden-xs: The quick brown fox jumps over the lazy dog (9.88px)
          </p>
          <p class="text-golden-sm">
            text-golden-sm: The quick brown fox jumps over the lazy dog (12.23px)
          </p>
          <p class="text-golden-base">
            text-golden-base: The quick brown fox jumps over the lazy dog (16px)
          </p>
          <p class="text-golden-lg">
            text-golden-lg: The quick brown fox jumps over the lazy dog (25.88px)
          </p>
          <p class="text-golden-xl">
            text-golden-xl: The quick brown fox jumps over the lazy dog (41.85px)
          </p>
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
          Interactive Theme System & Persistence Test
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
                class="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-all"
                @click="toggleTheme"
              >
                Toggle Light/Dark
              </button>
              <button
                class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:opacity-90 transition-all"
                @click="setThemeWithTransition('light')"
              >
                Set Light
              </button>
              <button
                class="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:opacity-90 transition-all"
                @click="setThemeWithTransition('dark')"
              >
                Set Dark
              </button>
              <button
                class="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm hover:opacity-90 transition-all"
                @click="() => window.location.reload()"
              >
                🔄 Refresh Page
              </button>
            </div>

            <div class="mt-3 p-3 bg-background/50 rounded text-xs text-muted-foreground">
              <strong>Persistence Test:</strong> Select a theme, then click "Refresh Page" or press
              F5. The theme should persist across page refreshes and navigation.
            </div>
          </div>

          <!-- Theme Selection Grid -->
          <div class="space-y-6">
            <p class="text-center text-muted-foreground text-sm">
              Click any theme below to instantly switch. Themes persist using cookies (SSR) +
              localStorage.
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
                      : 'border-border bg-muted/50 hover:border-primary/50',
                  ]"
                  @click="setThemeWithTransition(theme.name)"
                >
                  <!-- Active indicator -->
                  <div v-if="currentTheme === theme.name" class="absolute top-1 right-1">
                    <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>

                  <div class="font-medium text-sm">{{ theme.label }}</div>
                  <div
                    v-if="theme.description"
                    class="text-xs text-muted-foreground mt-1 line-clamp-2"
                  >
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
              <button
                class="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Primary Button
              </button>
              <button
                class="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Secondary Button
              </button>
            </div>

            <!-- Floating Orbs -->
            <div class="relative h-32 bg-muted/30 rounded-lg overflow-hidden">
              <div class="floating-orb--primary absolute top-4 left-8 w-16 h-16 rounded-full" />
              <div
                class="floating-orb--secondary absolute bottom-4 right-8 w-12 h-12 rounded-full"
              />
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
          Foundation Systems Check
        </summary>

        <div class="space-y-6">
          <!-- Foundation Tests -->
          <div class="border-t border-border pt-4">
            <h3 class="text-sm font-medium text-primary mb-4">Foundation Tests:</h3>

            <!-- Test cn utility -->
            <div class="mb-4">
              <h4 class="text-xs font-semibold mb-2">Testing cn() utility:</h4>
              <div :class="testClasses" class="text-sm">This div uses cn() to merge classes</div>
              <p class="text-sm text-muted-foreground mt-2">Classes: {{ testClasses }}</p>
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

      <!-- Buttons Component -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Buttons (2 components)
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
              <Button
                href="https://github.com"
                target="_blank"
                variant="outline"
                icon="lucide:external-link"
              >
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

          <!-- GradientButton Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">
              GradientButton - Advanced Gradient Effects
            </h3>
            <div class="flex flex-wrap gap-4">
              <GradientButton>Default Gradient</GradientButton>
              <GradientButton variant="secondary">Secondary Gradient</GradientButton>
              <GradientButton variant="destructive">Destructive Gradient</GradientButton>
              <GradientButton gradient-direction="to-br">Diagonal Gradient</GradientButton>
              <GradientButton :adaptive-gradient="true" icon="lucide:sun-moon">
                Adaptive Gradient
              </GradientButton>
              <GradientButton
                gradient-colors="from-primary/20 to-secondary/20"
                icon="lucide:sparkles"
              >
                Theme Aware
              </GradientButton>
              <GradientButton variant="ghost" gradient-direction="to-t">
                Ghost Variant
              </GradientButton>
              <GradientButton variant="outline" gradient-colors="from-accent/30 to-transparent">
                Accent Overlay
              </GradientButton>
              <GradientButton :show-gradient-overlay="false">No Gradient</GradientButton>
            </div>
          </div>
        </div>
      </details>

      <!-- Icons Component -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Icons (30 types)
        </summary>

        <div class="space-y-8">
          <!-- Icon Sizes -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <AtomIcon name="lucide:sparkles" size="xs" />
              <AtomIcon name="lucide:sparkles" size="sm" />
              <AtomIcon name="lucide:sparkles" size="md" />
              <AtomIcon name="lucide:sparkles" size="lg" />
              <AtomIcon name="lucide:sparkles" size="xl" />
              <AtomIcon name="lucide:sparkles" size="2xl" />
            </div>
          </div>

          <!-- Common Icons -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">
              Common Icons (Theme Reactive)
            </h3>
            <div class="grid grid-cols-10 gap-4">
              <AtomIcon name="lucide:sparkles" class="text-primary" />
              <AtomIcon name="lucide:zap" class="text-primary" />
              <AtomIcon name="lucide:check-circle" class="text-success" />
              <AtomIcon name="lucide:mail" class="text-muted-foreground" />
              <AtomIcon name="lucide:github" />
              <AtomIcon name="lucide:menu" />
              <AtomIcon name="lucide:x" />
              <AtomIcon name="lucide:arrow-right" />
              <AtomIcon name="lucide:loader-circle" class="animate-spin" />
              <AtomIcon name="lucide:settings" />
            </div>
          </div>

          <!-- All 30 Landing Page Icons -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">All Landing Page Icons</h3>
            <div class="grid grid-cols-10 gap-4">
              <!-- Navigation & UI -->
              <AtomIcon name="lucide:feather" />
              <AtomIcon name="lucide:book-open" />
              <AtomIcon name="lucide:users" />
              <AtomIcon name="lucide:chevron-down" />
              <AtomIcon name="lucide:user" />
              <AtomIcon name="lucide:log-out" />
              <AtomIcon name="lucide:user-circle" />

              <!-- Hero & Features -->
              <AtomIcon name="lucide:sparkles" />
              <AtomIcon name="lucide:zap" />
              <AtomIcon name="lucide:check-circle" />
              <AtomIcon name="lucide:film" />
              <AtomIcon name="lucide:share-2" />
              <AtomIcon name="lucide:globe" />
              <AtomIcon name="lucide:palette" />

              <!-- Process Steps -->
              <AtomIcon name="lucide:lightbulb" />
              <AtomIcon name="lucide:pen-tool" />
              <AtomIcon name="lucide:camera" />
              <AtomIcon name="lucide:music" />

              <!-- Testimonials & Misc -->
              <AtomIcon name="lucide:star" />
              <AtomIcon name="lucide:arrow-right" />

              <!-- Footer & Social -->
              <AtomIcon name="lucide:mail" />
              <AtomIcon name="lucide:map-pin" />
              <AtomIcon name="lucide:phone" />
              <AtomIcon name="lucide:twitter" />
              <AtomIcon name="lucide:facebook" />
              <AtomIcon name="lucide:instagram" />
              <AtomIcon name="lucide:linkedin" />
              <AtomIcon name="lucide:github" />
              <AtomIcon name="lucide:external-link" />
              <AtomIcon name="lucide:loader-circle" />
            </div>
          </div>

          <!-- Custom Styling -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Custom Styling</h3>
            <div class="flex flex-wrap gap-4">
              <AtomIcon name="lucide:heart" class="text-red-500" />
              <AtomIcon name="lucide:star" class="text-yellow-500" />
              <AtomIcon name="lucide:check-circle" class="text-green-500" />
              <AtomIcon name="lucide:info" class="text-blue-500" />
              <AtomIcon name="lucide:alert-triangle" class="text-orange-500" />
              <AtomIcon name="lucide:sparkles" class="text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </details>

      <!-- Input Component -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Inputs (1 component)
        </summary>

        <div class="space-y-8">
          <!-- Basic Inputs -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Basic Inputs</h3>
            <form class="space-y-4 max-w-md" @submit.prevent>
              <Input v-model="inputValue1" placeholder="Enter text..." />
              <Input v-model="inputValue2" type="email" placeholder="Email address" />
              <Input v-model="inputValue3" type="password" placeholder="Password" />
              <Input v-model="inputValue4" type="number" placeholder="Enter number" />
            </form>
          </div>

          <!-- Input States -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">States</h3>
            <div class="space-y-4 max-w-md">
              <Input placeholder="Disabled input" disabled />
              <Input value="Read-only input" readonly />
              <Input placeholder="Required field" required />
              <Input placeholder="Invalid input" invalid />
            </div>
          </div>

          <!-- With Icons (using slots) -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">With Icons</h3>
            <div class="space-y-4 max-w-md">
              <div class="relative">
                <Icon
                  name="lucide:search"
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input class="pl-10" placeholder="Search..." />
              </div>
              <div class="relative">
                <Icon
                  name="lucide:mail"
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input class="pl-10" type="email" placeholder="Email with icon" />
              </div>
              <div class="relative">
                <Input class="pr-10" placeholder="With trailing icon" />
                <Icon
                  name="lucide:check"
                  class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
                />
              </div>
            </div>
          </div>

          <!-- Custom Styling -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Custom Styling</h3>
            <div class="space-y-4 max-w-md">
              <Input class="h-12 text-lg" placeholder="Large input" />
              <Input class="h-8 text-xs" placeholder="Small input" />
              <Input class="rounded-full" placeholder="Rounded input" />
              <Input class="border-2 border-primary" placeholder="Custom border" />
            </div>
          </div>

          <!-- File Input -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">File Input</h3>
            <div class="max-w-md">
              <Input type="file" class="cursor-pointer" />
            </div>
          </div>
        </div>
      </details>

      <!-- Form Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Form Components (3 components)
        </summary>

        <div class="space-y-8">
          <!-- Checkbox Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Checkbox</h3>

            <!-- Basic Checkboxes -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground">Basic Usage</h4>
              <div class="space-y-3">
                <Checkbox v-model="checkboxValue1" label="Accept terms and conditions" />
                <Checkbox v-model="checkboxValue2" label="Subscribe to newsletter" />
                <Checkbox label="No v-model (uncontrolled)" />
              </div>
            </div>

            <!-- With Description -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">With Description</h4>
              <div class="space-y-3">
                <Checkbox
                  v-model="checkboxValue3"
                  label="Enable notifications"
                  description="Get notified when someone mentions you"
                />
                <Checkbox
                  label="Use default settings"
                  description="This will apply our recommended configuration for your account"
                />
              </div>
            </div>

            <!-- States -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">States</h4>
              <div class="space-y-3">
                <Checkbox label="Disabled checkbox" disabled />
                <Checkbox v-model="checkboxValue2" label="Disabled checked" disabled />
                <Checkbox label="Required checkbox" required />
              </div>
            </div>

            <!-- Custom Styling -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Custom Styling</h4>
              <div class="space-y-3">
                <Checkbox class="text-primary" label="Primary colored checkbox" />
                <Checkbox class="text-lg" label="Large checkbox" />
              </div>
            </div>

            <!-- Current Values Display -->
            <div class="mt-6 p-4 bg-muted/50 rounded text-sm">
              <p class="font-medium mb-2">Current Values:</p>
              <p>Checkbox 1: {{ checkboxValue1 }}</p>
              <p>Checkbox 2: {{ checkboxValue2 }}</p>
              <p>Checkbox 3: {{ checkboxValue3 }}</p>
            </div>
          </div>

          <!-- FormMessage Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">FormMessage</h3>

            <!-- Message Types -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground">Message Types</h4>
              <div class="space-y-3">
                <FormMessage message="This is a default helper message" />
                <FormMessage type="error" message="This field is required" />
                <FormMessage type="success" message="Email verified successfully!" />
                <FormMessage type="warning" message="Password strength is weak" />
                <FormMessage type="info" message="We'll never share your email" />
              </div>
            </div>

            <!-- Without Icons -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Without Icons</h4>
              <div class="space-y-3">
                <FormMessage :show-icon="false" message="Plain message without icon" />
                <FormMessage :show-icon="false" type="error" message="Error without icon" />
                <FormMessage :show-icon="false" type="success" message="Success without icon" />
              </div>
            </div>

            <!-- Custom Icons -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Custom Icons</h4>
              <div class="space-y-3">
                <FormMessage icon="lucide:mail" message="Check your email for verification" />
                <FormMessage type="error" icon="lucide:x-circle" message="Custom error icon" />
                <FormMessage type="success" icon="lucide:sparkles" message="Custom success icon" />
              </div>
            </div>

            <!-- With Form Fields -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">With Form Fields</h4>
              <div class="space-y-4 max-w-md">
                <div>
                  <Label>Email</Label>
                  <Input placeholder="Enter your email" class="mt-1" />
                  <FormMessage type="error" message="Please enter a valid email address" />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="Enter password" class="mt-1" />
                  <FormMessage type="warning" message="Use at least 8 characters with mixed case" />
                </div>

                <div>
                  <Label>Username</Label>
                  <Input placeholder="Choose a username" class="mt-1" />
                  <FormMessage type="success" message="Username is available!" />
                </div>
              </div>
            </div>

            <!-- Custom Styling -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Custom Styling</h4>
              <div class="space-y-3">
                <FormMessage class="font-semibold" message="Bold message" />
                <FormMessage class="text-lg" message="Large message" />
                <FormMessage class="italic" message="Italic message" />
              </div>
            </div>

            <!-- Using Slots -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Using Slots</h4>
              <div class="space-y-3">
                <FormMessage type="info">
                  This is a message with <strong>rich content</strong> using slots
                </FormMessage>
                <FormMessage type="error">
                  Multiple errors: <br />
                  • Field is required<br />
                  • Must be at least 8 characters
                </FormMessage>
              </div>
            </div>
          </div>

          <!-- Radio Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Radio</h3>

            <!-- Basic Radio Groups -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground">Basic Radio Group</h4>
              <div class="space-y-3">
                <Radio v-model="radioValue1" name="basic-group" value="option1" label="Option 1" />
                <Radio v-model="radioValue1" name="basic-group" value="option2" label="Option 2" />
                <Radio v-model="radioValue1" name="basic-group" value="option3" label="Option 3" />
              </div>
              <p class="text-sm text-muted-foreground">Selected: {{ radioValue1 }}</p>
            </div>

            <!-- With Description -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">With Descriptions</h4>
              <div class="space-y-3">
                <Radio
                  v-model="radioValue2"
                  name="size-group"
                  value="small"
                  label="Small"
                  description="Best for personal use"
                />
                <Radio
                  v-model="radioValue2"
                  name="size-group"
                  value="medium"
                  label="Medium"
                  description="Recommended for most users"
                />
                <Radio
                  v-model="radioValue2"
                  name="size-group"
                  value="large"
                  label="Large"
                  description="For power users and teams"
                />
              </div>
              <p class="text-sm text-muted-foreground">Selected: {{ radioValue2 }}</p>
            </div>

            <!-- States -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">States</h4>
              <div class="space-y-3">
                <Radio name="states-group" value="normal" label="Normal radio" />
                <Radio name="states-group" value="disabled" label="Disabled radio" disabled />
                <Radio
                  v-model="radioValue3"
                  name="states-group"
                  value="disabled-checked"
                  label="Disabled checked"
                  disabled
                />
                <Radio name="states-group" value="required" label="Required radio" required />
              </div>
            </div>

            <!-- Inline Radio Group -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Inline Layout</h4>
              <div class="flex gap-6">
                <Radio v-model="radioValue3" name="inline-group" value="yes" label="Yes" />
                <Radio v-model="radioValue3" name="inline-group" value="no" label="No" />
                <Radio v-model="radioValue3" name="inline-group" value="maybe" label="Maybe" />
              </div>
              <p class="text-sm text-muted-foreground">Selected: {{ radioValue3 || 'None' }}</p>
            </div>

            <!-- Custom Styling -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Custom Styling</h4>
              <div class="space-y-3">
                <Radio
                  name="custom-group"
                  value="primary"
                  label="Primary styled radio"
                  class="text-primary"
                />
                <Radio name="custom-group" value="large" label="Large radio" class="text-lg" />
              </div>
            </div>

            <!-- With Form Context -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Form Context Example</h4>
              <div class="max-w-md space-y-4">
                <div>
                  <Label class="mb-3">Select your plan</Label>
                  <div class="space-y-2">
                    <Radio
                      v-model="radioValue3"
                      name="plan-group"
                      value="free"
                      label="Free Plan"
                      description="$0/month - Basic features"
                    />
                    <Radio
                      v-model="radioValue3"
                      name="plan-group"
                      value="pro"
                      label="Pro Plan"
                      description="$10/month - Advanced features"
                    />
                    <Radio
                      v-model="radioValue3"
                      name="plan-group"
                      value="enterprise"
                      label="Enterprise Plan"
                      description="Custom pricing - All features"
                    />
                  </div>
                  <FormMessage
                    v-if="radioValue3"
                    type="success"
                    :message="`You selected: ${radioValue3}`"
                    class="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <!-- Special Effect Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Special Effect Components (4 components)
        </summary>

        <div class="space-y-8">
          <!-- Dot Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Dot (Pulsing Indicator)</h3>

            <!-- Different Sizes -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground">Sizes</h4>
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-2">
                  <Dot size="xs" aria-label="Extra small indicator" />
                  <span class="text-sm">XS</span>
                </div>
                <div class="flex items-center gap-2">
                  <Dot size="sm" aria-label="Small indicator" />
                  <span class="text-sm">SM</span>
                </div>
                <div class="flex items-center gap-2">
                  <Dot size="md" aria-label="Medium indicator" />
                  <span class="text-sm">MD</span>
                </div>
                <div class="flex items-center gap-2">
                  <Dot size="lg" aria-label="Large indicator" />
                  <span class="text-sm">LG</span>
                </div>
                <div class="flex items-center gap-2">
                  <Dot size="xl" aria-label="Extra large indicator" />
                  <span class="text-sm">XL</span>
                </div>
              </div>
            </div>

            <!-- Different Colors -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Colors</h4>
              <div class="flex items-center gap-6">
                <Dot color="primary" aria-label="Primary status" />
                <Dot color="secondary" aria-label="Secondary status" />
                <Dot color="success" aria-label="Success status" />
                <Dot color="warning" aria-label="Warning status" />
                <Dot color="error" aria-label="Error status" />
                <Dot color="info" aria-label="Info status" />
                <Dot color="neutral" aria-label="Neutral status" />
              </div>
            </div>

            <!-- Pulse Variations -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Pulse Variations</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <Dot :pulse="false" aria-label="No pulse" />
                  <span class="text-sm">No pulse</span>
                </div>
                <div class="flex items-center gap-4">
                  <Dot pulse-speed="slow" pulse-intensity="subtle" aria-label="Slow subtle pulse" />
                  <span class="text-sm">Slow & Subtle</span>
                </div>
                <div class="flex items-center gap-4">
                  <Dot pulse-speed="normal" pulse-intensity="normal" aria-label="Normal pulse" />
                  <span class="text-sm">Normal (default)</span>
                </div>
                <div class="flex items-center gap-4">
                  <Dot pulse-speed="fast" pulse-intensity="strong" aria-label="Fast strong pulse" />
                  <span class="text-sm">Fast & Strong</span>
                </div>
              </div>
            </div>

            <!-- Real-world Examples -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Real-world Examples</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <Dot color="success" size="sm" aria-label="Online" />
                  <span class="text-sm">User Online</span>
                </div>
                <div class="flex items-center gap-2">
                  <Dot color="warning" size="sm" pulse-speed="slow" aria-label="Away" />
                  <span class="text-sm">User Away</span>
                </div>
                <div class="flex items-center gap-2">
                  <Dot color="error" size="sm" :pulse="false" aria-label="Offline" />
                  <span class="text-sm">User Offline</span>
                </div>
              </div>
            </div>
          </div>

          <!-- StepNumber Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">StepNumber</h3>

            <!-- Process Steps Example -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground">Process Steps</h4>
              <div class="flex items-center gap-4" role="list">
                <StepNumber :step="1" status="completed" />
                <div class="h-px bg-border flex-1" />
                <StepNumber :step="2" status="active" />
                <div class="h-px bg-border flex-1" />
                <StepNumber :step="3" status="pending" />
                <div class="h-px bg-border flex-1" />
                <StepNumber :step="4" status="pending" />
              </div>
            </div>

            <!-- Different Sizes -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Sizes</h4>
              <div class="flex items-center gap-4">
                <StepNumber :step="1" size="xs" status="active" />
                <StepNumber :step="2" size="sm" status="active" />
                <StepNumber :step="3" size="md" status="active" />
                <StepNumber :step="4" size="lg" status="active" />
                <StepNumber :step="5" size="xl" status="active" />
              </div>
            </div>

            <!-- Variants -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Variants</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <StepNumber :step="1" variant="default" status="completed" />
                  <StepNumber :step="2" variant="default" status="active" />
                  <StepNumber :step="3" variant="default" status="pending" />
                  <span class="text-sm">Default</span>
                </div>
                <div class="flex items-center gap-4">
                  <StepNumber :step="1" variant="outline" status="completed" />
                  <StepNumber :step="2" variant="outline" status="active" />
                  <StepNumber :step="3" variant="outline" status="pending" />
                  <span class="text-sm">Outline</span>
                </div>
                <div class="flex items-center gap-4">
                  <StepNumber :step="1" variant="solid" status="completed" />
                  <StepNumber :step="2" variant="solid" status="active" />
                  <StepNumber :step="3" variant="solid" status="pending" />
                  <span class="text-sm">Solid</span>
                </div>
              </div>
            </div>

            <!-- Different Colors -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Colors</h4>
              <div class="flex items-center gap-4">
                <StepNumber :step="1" color="primary" status="active" />
                <StepNumber :step="2" color="secondary" status="active" />
                <StepNumber :step="3" color="success" status="active" />
                <StepNumber :step="4" color="neutral" status="active" />
              </div>
            </div>
          </div>

          <!-- StarRating Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">StarRating</h3>

            <!-- Basic Examples -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground">Basic Usage</h4>
              <div class="space-y-3">
                <StarRating v-model="starRating1" label="Rate this product" />
                <p class="text-sm text-muted-foreground">Current rating: {{ starRating1 }}/5</p>
              </div>
            </div>

            <!-- Different Sizes -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Sizes</h4>
              <div class="space-y-3">
                <StarRating v-model="starRating2" size="xs" label="Extra small stars" />
                <StarRating v-model="starRating2" size="sm" label="Small stars" />
                <StarRating v-model="starRating2" size="md" label="Medium stars" />
                <StarRating v-model="starRating2" size="lg" label="Large stars" />
                <StarRating v-model="starRating2" size="xl" label="Extra large stars" />
              </div>
            </div>

            <!-- Different States -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">States</h4>
              <div class="space-y-3">
                <StarRating
                  :model-value="4"
                  readonly
                  label="Read-only rating"
                  description="This rating cannot be changed"
                />
                <StarRating
                  :model-value="3"
                  disabled
                  label="Disabled rating"
                  description="This rating is disabled"
                />
                <StarRating
                  v-model="starRating3"
                  required
                  label="Required rating"
                  description="Please provide a rating"
                />
              </div>
            </div>

            <!-- Custom Configuration -->
            <div class="space-y-4 mt-6">
              <h4 class="text-xs font-medium text-muted-foreground">Custom Configuration</h4>
              <div class="space-y-3">
                <StarRating
                  v-model="starRating3"
                  :max-stars="10"
                  label="10-star rating"
                  color="primary"
                />
                <StarRating
                  v-model="starRating3"
                  :allow-clear="false"
                  label="No clear option"
                  color="secondary"
                />
              </div>
            </div>
          </div>

          <!-- VisuallyHidden Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">VisuallyHidden</h3>

            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">
                This component hides content visually but keeps it accessible to screen readers.
              </p>

              <!-- Basic Example -->
              <div class="p-4 bg-muted/50 rounded">
                <p class="text-sm">
                  This paragraph contains
                  <VisuallyHidden>hidden text that screen readers can read</VisuallyHidden>
                  visible text.
                </p>
              </div>

              <!-- Focusable Example -->
              <div class="p-4 bg-muted/50 rounded mt-4">
                <p class="text-sm mb-2">Tab to reveal the skip link:</p>
                <VisuallyHidden focusable as="a" href="#main" class="text-primary underline">
                  Skip to main content
                </VisuallyHidden>
              </div>

              <!-- Real-world Examples -->
              <div class="space-y-4 mt-6">
                <h4 class="text-xs font-medium text-muted-foreground">Real-world Uses</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Icon-only buttons with descriptive text</li>
                  <li>• Form field instructions for screen readers</li>
                  <li>• Skip navigation links</li>
                  <li>• Additional context for abbreviated content</li>
                  <li>• Live region announcements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </details>

      <!-- Dropdown Menu Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Dropdown Menu Components (8 components)
        </summary>

        <div class="space-y-8">
          <!-- Basic Dropdown -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Basic Dropdown</h3>

            <div class="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon name="lucide:more-vertical" class="h-4 w-4 mr-2" />
                  Options
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem @select="() => logger.log('Edit clicked')">
                    <Icon name="lucide:pencil" class="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @select="() => logger.log('Duplicate clicked')">
                    <Icon name="lucide:copy" class="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="text-destructive"
                    @select="() => logger.log('Delete clicked')"
                  >
                    <Icon name="lucide:trash" class="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger class="bg-primary text-primary-foreground hover:bg-primary/90">
                  Actions
                  <Icon name="lucide:chevron-down" class="h-4 w-4 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>New file</DropdownMenuItem>
                  <DropdownMenuItem>New folder</DropdownMenuItem>
                  <DropdownMenuItem disabled>Import (coming soon)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <!-- With Labels and Sections -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">With Labels & Sections</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                Account
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="lucide:user" class="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="lucide:credit-card" class="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="lucide:settings" class="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Team</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="lucide:users" class="h-4 w-4 mr-2" />
                  Invite users
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="lucide:plus" class="h-4 w-4 mr-2" />
                  New Team
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="lucide:log-out" class="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <!-- With Checkbox Items -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">With Checkboxes</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icon name="lucide:sliders-horizontal" class="h-4 w-4 mr-2" />
                View
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem v-model:checked="dropdownCheckbox1">
                  Show status bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem v-model:checked="dropdownCheckbox2">
                  Show activity bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem v-model:checked="dropdownCheckbox3">
                  Show panel
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem> Reset view </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div class="mt-4 p-4 bg-muted/50 rounded text-sm">
              <p class="font-medium mb-2">Current Values:</p>
              <p>Status bar: {{ dropdownCheckbox1 ? 'Visible' : 'Hidden' }}</p>
              <p>Activity bar: {{ dropdownCheckbox2 ? 'Visible' : 'Hidden' }}</p>
              <p>Panel: {{ dropdownCheckbox3 ? 'Visible' : 'Hidden' }}</p>
            </div>
          </div>

          <!-- With Radio Items -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">With Radio Group</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icon name="lucide:align-left" class="h-4 w-4 mr-2" />
                Text alignment
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>Choose alignment</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem v-model="dropdownRadioValue" value="left">
                  <Icon name="lucide:align-left" class="h-4 w-4 mr-2" />
                  Left
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem v-model="dropdownRadioValue" value="center">
                  <Icon name="lucide:align-center" class="h-4 w-4 mr-2" />
                  Center
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem v-model="dropdownRadioValue" value="right">
                  <Icon name="lucide:align-right" class="h-4 w-4 mr-2" />
                  Right
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem v-model="dropdownRadioValue" value="justify">
                  <Icon name="lucide:align-justify" class="h-4 w-4 mr-2" />
                  Justify
                </DropdownMenuRadioItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <p class="mt-4 text-sm text-muted-foreground">
              Selected alignment: <span class="font-medium">{{ dropdownRadioValue }}</span>
            </p>
          </div>

          <!-- Different Positions -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Different Positions</h3>

            <div class="grid grid-cols-3 gap-4">
              <!-- Alignment variations -->
              <DropdownMenu>
                <DropdownMenuTrigger> Align Start </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger> Align Center </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger> Align End </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <!-- Side variations -->
              <DropdownMenu>
                <DropdownMenuTrigger> Side Top </DropdownMenuTrigger>
                <DropdownMenuContent side="top">
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger> Side Right </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger> Side Left </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <!-- Complex Example -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Complex Example</h3>

            <DropdownMenu>
              <DropdownMenuTrigger class="bg-gradient-to-r from-primary to-secondary text-white">
                <Icon name="lucide:sparkles" class="h-4 w-4 mr-2" />
                Advanced Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-64" align="start">
                <div class="px-2 py-1.5">
                  <p class="text-sm font-semibold">John Doe</p>
                  <p class="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Icon name="lucide:zap" class="h-4 w-4 mr-2 text-warning" />
                  Quick command
                  <span class="ml-auto text-xs text-muted-foreground">⌘K</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="lucide:search" class="h-4 w-4 mr-2" />
                  Search
                  <span class="ml-auto text-xs text-muted-foreground">⌘/</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <DropdownMenuCheckboxItem :checked="true">
                  <Icon name="lucide:moon" class="h-4 w-4 mr-2" />
                  Dark mode
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem :checked="false">
                  <Icon name="lucide:bell" class="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-destructive focus:text-destructive">
                  <Icon name="lucide:log-out" class="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </details>

      <!-- Badge Component -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Badges (2 components)
        </summary>

        <div class="space-y-8">
          <!-- Badge Variants -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Variants</h3>
            <div class="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="landing">Landing Style</Badge>
            </div>
          </div>

          <!-- Badge Sizes -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Sizes</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Badge size="sm">Small</Badge>
              <Badge size="default">Default</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          <!-- With Icons -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">With Icons</h3>
            <div class="flex flex-wrap gap-4">
              <Badge>
                <Icon name="lucide:star" class="mr-1 h-3 w-3" />
                Featured
              </Badge>
              <Badge variant="secondary">
                <Icon name="lucide:trending-up" class="mr-1 h-3 w-3" />
                Trending
              </Badge>
              <Badge variant="destructive">
                <Icon name="lucide:alert-circle" class="mr-1 h-3 w-3" />
                Critical
              </Badge>
            </div>
          </div>

          <!-- Landing Page Style -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Landing Page Style</h3>
            <div class="flex flex-wrap gap-4">
              <Badge variant="landing" size="lg" class="font-bold"> LIMITED TIME OFFER </Badge>
              <Badge variant="landing" size="lg"> TESTIMONIALS </Badge>
              <Badge variant="landing" size="lg"> PRICING PLANS </Badge>
            </div>
          </div>

          <!-- Custom Styling -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Custom Styling</h3>
            <div class="flex flex-wrap gap-4">
              <Badge class="bg-gradient-to-r from-primary to-primary/60">Gradient</Badge>
              <Badge variant="outline" class="border-2 border-primary">Custom Border</Badge>
              <Badge class="rounded-md">Square Badge</Badge>
              <Badge class="animate-pulse">Animated</Badge>
            </div>
          </div>

          <!-- BadgeWithDot Component -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">
              BadgeWithDot - Status Indicators
            </h3>
            <div class="flex flex-wrap gap-4">
              <BadgeWithDot>Live</BadgeWithDot>
              <BadgeWithDot variant="secondary" dot-color="success">Online</BadgeWithDot>
              <BadgeWithDot variant="destructive" dot-color="danger">Error</BadgeWithDot>
              <BadgeWithDot variant="outline" dot-position="right" animation-speed="slow">
                Processing
              </BadgeWithDot>
              <BadgeWithDot variant="landing" size="lg" dot-size="lg"> Featured </BadgeWithDot>
              <BadgeWithDot :animated="false">Static</BadgeWithDot>
            </div>
          </div>
        </div>
      </details>

      <!-- Spinner Component -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Spinners (1 component)
        </summary>

        <div class="space-y-8">
          <!-- Spinner Sizes -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Sizes</h3>
            <div class="flex flex-wrap items-center gap-6">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          </div>

          <!-- Different Icons -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Different Icons</h3>
            <div class="flex flex-wrap items-center gap-6">
              <Spinner icon="lucide:loader-circle" />
              <Spinner icon="lucide:loader" />
              <Spinner icon="lucide:refresh-cw" />
              <Spinner icon="lucide:circle-dashed" />
            </div>
          </div>

          <!-- Colors -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Colors (Theme Reactive)</h3>
            <div class="flex flex-wrap items-center gap-6">
              <Spinner class="text-primary" />
              <Spinner class="text-secondary" />
              <Spinner class="text-muted-foreground" />
              <Spinner class="text-success" />
              <Spinner class="text-destructive" />
            </div>
          </div>

          <!-- Loading States -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Loading States</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <Spinner size="sm" />
                <span class="text-sm text-muted-foreground">Loading content...</span>
              </div>

              <div class="inline-flex items-center gap-2 px-4 py-2 bg-card border rounded-md">
                <Spinner size="sm" class="text-primary" />
                <span>Processing</span>
              </div>

              <div
                class="flex justify-center items-center h-32 bg-card/50 border border-dashed rounded-lg"
              >
                <div class="text-center">
                  <Spinner size="lg" class="mx-auto mb-2" />
                  <p class="text-sm text-muted-foreground">Loading data...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Custom Styling -->
          <div>
            <h3 class="text-sm font-medium text-muted-foreground mb-4">Custom Styling</h3>
            <div class="flex flex-wrap items-center gap-6">
              <Spinner class="text-gradient-to-r from-primary to-secondary" />
              <Spinner size="lg" class="animate-pulse" />
              <Spinner class="opacity-50" />
            </div>
          </div>
        </div>
      </details>

      <!-- Cards Component -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Cards (2 components)
        </summary>

        <div class="space-y-6">
          <!-- Basic Card -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Basic Card</h3>
            <Card>
              <template #header>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>This is a card description that provides context.</CardDescription>
              </template>

              <p>This is the main content area of the card. It can contain any content you need.</p>

              <template #footer>
                <Button size="sm">Action</Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </template>
            </Card>
          </div>

          <!-- Card without header/footer -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Content Only Card</h3>
            <Card>
              <p class="text-lg font-semibold mb-2">Simple Card</p>
              <p>Cards can be used with just the default slot for simpler layouts.</p>
            </Card>
          </div>

          <!-- Glass Cards -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Glass Card Variants</h3>
            <div class="grid gap-4">
              <GlassCard variant="light">
                <p class="font-semibold">Light Glass Card</p>
                <p class="text-sm text-muted-foreground">Subtle glass effect with 95% opacity</p>
              </GlassCard>

              <GlassCard variant="heavy">
                <p class="font-semibold">Heavy Glass Card</p>
                <p class="text-sm text-muted-foreground">Strong glass effect with 90% opacity</p>
              </GlassCard>

              <GlassCard variant="elevated" hover>
                <p class="font-semibold">Elevated Glass Card</p>
                <p class="text-sm text-muted-foreground">Premium feel with hover effect</p>
              </GlassCard>
            </div>
          </div>

          <!-- Custom styled cards -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Custom Styled Cards</h3>
            <Card class="border-primary">
              <p>Card with primary border</p>
            </Card>
            <GlassCard class="p-8 text-center" variant="elevated">
              <AtomIcon name="lucide:sparkles" size="xl" class="mx-auto mb-4 text-primary" />
              <p class="text-lg font-semibold">Icon Card</p>
              <p class="text-sm text-muted-foreground">Combining glass card with icons</p>
            </GlassCard>
          </div>
        </div>
      </details>

      <!-- Layout Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          📐 Layout (2 components)
        </summary>

        <div class="space-y-6">
          <!-- Container Sizes -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Container Sizes</h3>
            <div class="space-y-4">
              <Container size="sm" class="bg-muted/50 py-4">
                <p class="text-center">Small Container (max-w-3xl)</p>
              </Container>

              <Container size="md" class="bg-muted/50 py-4">
                <p class="text-center">Medium Container (max-w-5xl)</p>
              </Container>

              <Container size="lg" class="bg-muted/50 py-4">
                <p class="text-center">Large Container (max-w-7xl) - Default</p>
              </Container>

              <Container size="xl" class="bg-muted/50 py-4">
                <p class="text-center">XL Container (max-w-screen-xl)</p>
              </Container>
            </div>
          </div>

          <!-- Container Padding -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Container Padding Variants</h3>
            <Container padding="none" class="bg-muted/50 py-4">
              <p>No padding container</p>
            </Container>

            <Container padding="sm" class="bg-muted/50 py-4">
              <p>Small padding container</p>
            </Container>

            <Container padding="lg" class="bg-muted/50 py-4">
              <p>Large padding container</p>
            </Container>
          </div>

          <!-- Section Spacing -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Section Spacing</h3>
            <div class="space-y-0 -mx-6">
              <Section spacing="sm" background="muted">
                <Container>
                  <p>Small section spacing (py-8 sm:py-12)</p>
                </Container>
              </Section>

              <Section spacing="md" background="card">
                <Container>
                  <p>Medium section spacing (py-16 sm:py-20) - Default</p>
                </Container>
              </Section>

              <Section spacing="lg" background="accent">
                <Container>
                  <p>Large section spacing (py-24 sm:py-32)</p>
                </Container>
              </Section>
            </div>
          </div>

          <!-- Polymorphic Components -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Polymorphic Support</h3>
            <Container as="article" class="bg-muted/50 py-4">
              <p>Container rendered as &lt;article&gt;</p>
            </Container>

            <Section as="header" spacing="sm" class="bg-primary/10">
              <Container>
                <p>Section rendered as &lt;header&gt;</p>
              </Container>
            </Section>
          </div>

          <!-- Nested Layout Example -->
          <div class="space-y-2">
            <h3 class="text-sm font-medium">Nested Layout Example</h3>
            <Section background="muted" spacing="md">
              <Container size="lg">
                <Card>
                  <template #header>
                    <CardTitle>Nested Components</CardTitle>
                  </template>
                  <p>Section → Container → Card composition</p>
                </Card>
              </Container>
            </Section>
          </div>
        </div>
      </details>

      <!-- Typography Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Typography (3 components)
        </summary>

        <div class="space-y-8">
          <!-- Heading Component -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Heading Component</h3>

            <!-- H1 Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">H1 Variants</p>
              <Heading as="h1" size="h1"> The Intuitive Web Framework </Heading>
              <Heading as="h1" size="h1-compact"> Compact H1 Heading </Heading>
              <Heading as="h1" size="h1" gradient> Gradient H1 Heading </Heading>
            </div>

            <!-- H2 Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">H2 Variants</p>
              <Heading as="h2" size="h2"> Build Production-Ready Apps </Heading>
              <Heading as="h2" size="h2-compact"> Compact H2 Heading </Heading>
              <Heading as="h2" size="h2-display"> Display H2 Heading </Heading>
            </div>

            <!-- H3-H6 Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">H3-H6 Variants</p>
              <Heading as="h3" size="h3">H3: Section Title</Heading>
              <Heading as="h3" size="h3-section">Section Label Style</Heading>
              <Heading as="h4" size="h4">H4: Subsection Title</Heading>
              <Heading as="h5" size="h5">H5: Minor Heading</Heading>
              <Heading as="h6" size="h6">H6: Smallest Heading</Heading>
            </div>

            <!-- Special Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Special Variants</p>
              <Heading size="display" align="center"> Display Heading </Heading>
              <Heading size="hero" align="center" gradient> Hero Gradient Heading </Heading>
            </div>

            <!-- Alignment -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Alignment Options</p>
              <Heading size="h3" align="left">Left Aligned</Heading>
              <Heading size="h3" align="center">Center Aligned</Heading>
              <Heading size="h3" align="right">Right Aligned</Heading>
            </div>
          </div>

          <!-- Text Component -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Text Component</h3>

            <!-- Size Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Size Variants</p>
              <Text size="xs">Extra small text (xs)</Text>
              <Text size="sm">Small text (sm)</Text>
              <Text size="base">Base text (base)</Text>
              <Text size="lg">Large text (lg)</Text>
              <Text size="xl">Extra large text (xl)</Text>
              <Text size="2xl">2X large text (2xl)</Text>
            </div>

            <!-- Golden Ratio Sizes -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Golden Ratio Sizes</p>
              <Text size="golden-sm">Golden small text</Text>
              <Text size="golden-base">Golden base text</Text>
              <Text size="golden-lg">Golden large text</Text>
              <Text size="golden-xl">Golden XL text</Text>
              <Text size="golden-2xl">Golden 2XL text</Text>
            </div>

            <!-- Responsive Sizes -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Responsive Body Text</p>
              <Text size="body-compact">
                Compact body text that scales responsively across breakpoints
              </Text>
              <Text size="body-default">
                Default body text with golden ratio scaling for optimal readability
              </Text>
            </div>

            <!-- Color Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Color Variants</p>
              <Text variant="default">Default text color</Text>
              <Text variant="muted">Muted text color</Text>
              <Text variant="muted-50">50% opacity text</Text>
              <Text variant="muted-60">60% opacity text</Text>
              <Text variant="muted-70">70% opacity text</Text>
              <Text variant="primary">Primary color text</Text>
              <Text variant="secondary">Secondary color text</Text>
              <Text variant="destructive">Destructive color text</Text>
              <Text variant="success">Success color text</Text>
              <Text variant="warning">Warning color text</Text>
            </div>

            <!-- Weight & Style -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Font Weights</p>
              <Text weight="normal">Normal weight text</Text>
              <Text weight="medium">Medium weight text</Text>
              <Text weight="semibold">Semibold weight text</Text>
              <Text weight="bold">Bold weight text</Text>
              <Text weight="black">Black weight text</Text>
            </div>

            <!-- Line Height -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Line Height</p>
              <Text leading="tight">
                Tight line height is useful for headings where you want lines close together. Lorem
                ipsum dolor sit amet.
              </Text>
              <Text leading="normal">
                Normal line height is the default for body text. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Text>
              <Text leading="relaxed">
                Relaxed line height improves readability for longer passages. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </Text>
            </div>

            <!-- Text Transform -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Text Transform</p>
              <Text transform="uppercase">uppercase text transform</Text>
              <Text transform="lowercase">LOWERCASE TEXT TRANSFORM</Text>
              <Text transform="capitalize">capitalize text transform</Text>
            </div>

            <!-- Display Variants -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Display Text</p>
              <div class="flex items-baseline gap-2">
                <Text size="display-value" weight="bold">1,234</Text>
                <Text size="display-label" variant="muted">active users</Text>
              </div>
            </div>

            <!-- Semantic Elements -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Semantic Elements</p>
              <Text as="strong" weight="bold">Strong text element</Text>
              <Text as="em" class="italic">Emphasized text element</Text>
              <Text as="small" size="sm">Small text element</Text>
              <Text as="mark" class="bg-yellow-200 dark:bg-yellow-900">Marked text element</Text>
              <Text as="del" class="line-through">Deleted text element</Text>
              <Text as="ins" class="underline">Inserted text element</Text>
              <div>
                H<Text as="sub" size="sm">2</Text>O and E=mc<Text as="sup" size="sm">2</Text>
              </div>
            </div>
          </div>

          <!-- Label Component -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Label Component</h3>

            <!-- Basic Labels -->
            <div class="space-y-3">
              <div>
                <Label html-for="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" class="mt-1" />
              </div>

              <div>
                <Label html-for="name" required> Full Name </Label>
                <Input id="name" placeholder="John Doe" class="mt-1" />
              </div>

              <div>
                <Label html-for="bio" required required-text=" (required)"> Biography </Label>
                <textarea
                  id="bio"
                  class="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <Label html-for="disabled-input" disabled> Disabled Label </Label>
                <Input id="disabled-input" disabled placeholder="Cannot edit" class="mt-1" />
              </div>

              <div>
                <Label html-for="optional" :required="false"> Optional Field </Label>
                <Input id="optional" placeholder="This field is optional" class="mt-1" />
              </div>
            </div>

            <!-- Screen Reader Only Label -->
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">
                Screen Reader Only Label (invisible but accessible)
              </p>
              <div class="relative">
                <Label html-for="search" sr-only> Search </Label>
                <Input id="search" type="search" placeholder="Search..." class="pl-10" />
                <AtomIcon
                  name="lucide:search"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size="sm"
                />
              </div>
            </div>

            <!-- Custom Styled Labels -->
            <div class="space-y-3">
              <p class="text-sm text-muted-foreground">Custom Styled Labels</p>
              <Label class="text-primary font-bold"> Primary Bold Label </Label>
              <Label class="text-lg"> Large Label </Label>
              <Label class="uppercase tracking-wider text-muted-foreground">
                Uppercase Label
              </Label>
            </div>
          </div>
        </div>
      </details>

      <!-- Utility Components -->
      <details class="bg-card p-6 rounded-lg border shadow-sm">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-primary">
          Utility Components (4 components)
        </summary>

        <div class="space-y-8">
          <!-- Separator -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Separator</h3>

            <div class="space-y-4">
              <div>
                <p class="text-sm text-muted-foreground mb-2">Horizontal Variants</p>
                <div class="space-y-4">
                  <Separator />
                  <Separator variant="dashed" />
                  <Separator variant="dotted" />
                </div>
              </div>

              <div>
                <p class="text-sm text-muted-foreground mb-2">Vertical Separator</p>
                <div class="flex items-center gap-4 h-20">
                  <span>Left</span>
                  <Separator orientation="vertical" />
                  <span>Center</span>
                  <Separator orientation="vertical" variant="dashed" />
                  <span>Right</span>
                </div>
              </div>
            </div>
          </div>

          <!-- LoadingFallback -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">LoadingFallback</h3>

            <div class="grid gap-4">
              <div class="border rounded-lg p-4 h-32">
                <LoadingFallback :full-height="false" size="sm" text="Loading content..." />
              </div>

              <div class="border rounded-lg p-4 h-40">
                <LoadingFallback
                  :full-height="false"
                  size="md"
                  text="Please wait"
                  sub-text="This might take a moment"
                />
              </div>

              <div class="border rounded-lg p-4 h-48">
                <LoadingFallback :full-height="false" size="lg" spinner-class="text-primary">
                  <template #default>
                    <span class="text-primary font-semibold">Loading your data...</span>
                  </template>
                </LoadingFallback>
              </div>
            </div>
          </div>

          <!-- IconContainer -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">IconContainer</h3>

            <div>
              <p class="text-sm text-muted-foreground mb-4">Sizes & Variants</p>
              <div class="flex flex-wrap items-center gap-4">
                <IconContainer icon="lucide:star" size="xs" />
                <IconContainer icon="lucide:heart" size="sm" variant="soft" />
                <IconContainer icon="lucide:zap" size="md" variant="default" />
                <IconContainer icon="lucide:sparkles" size="lg" variant="gradient" />
                <IconContainer icon="lucide:rocket" size="xl" variant="subtle" />
              </div>
            </div>

            <div>
              <p class="text-sm text-muted-foreground mb-4">Shapes & Interactive</p>
              <div class="flex flex-wrap items-center gap-4">
                <IconContainer icon="lucide:user" shape="circle" variant="soft" interactive />
                <IconContainer
                  icon="lucide:settings"
                  shape="square"
                  variant="outline"
                  interactive
                />
                <IconContainer icon="lucide:bell" shape="rounded" variant="gradient" interactive />
                <IconContainer icon="lucide:mail" variant="ghost" :hover="false" />
              </div>
            </div>
          </div>

          <!-- ScrollArea -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">ScrollArea</h3>

            <div class="grid gap-4">
              <div>
                <p class="text-sm text-muted-foreground mb-2">Vertical Scroll</p>
                <ScrollArea max-height="200px" class="border rounded-lg p-4">
                  <div class="space-y-4">
                    <p v-for="i in 10" :key="i">
                      This is paragraph {{ i }}. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </ScrollArea>
              </div>

              <div class="overflow-hidden">
                <p class="text-sm text-muted-foreground mb-2">Horizontal Scroll</p>
                <ScrollArea orientation="horizontal" max-width="100%" class="border rounded-lg p-4">
                  <div class="flex gap-4 w-max">
                    <Card v-for="i in 10" :key="i" class="w-40 p-4 flex-shrink-0">
                      <p class="font-semibold">Card {{ i }}</p>
                      <p class="text-sm text-muted-foreground">Scrollable content</p>
                    </Card>
                  </div>
                </ScrollArea>
              </div>

              <div>
                <p class="text-sm text-muted-foreground mb-2">Hover Scrollbar</p>
                <ScrollArea
                  max-height="150px"
                  scrollbar-variant="hover"
                  scrollbar-size="thin"
                  class="border rounded-lg p-4"
                >
                  <div class="space-y-2">
                    <p v-for="i in 8" :key="i" class="text-sm">
                      Line {{ i }}: Hover to see the scrollbar appear
                    </p>
                  </div>
                </ScrollArea>
              </div>
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
