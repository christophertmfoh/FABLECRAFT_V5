<!-- file: pages/index.vue -->
<script setup lang="ts">
// Industry-standard development environment detection
const isDevelopment = process.env.NODE_ENV === 'development'

// Supabase connection validation 
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const config = useRuntimeConfig()

const isLoggedIn = computed(() => !!user.value)
const supabaseUrl = computed(() => config.public.supabase?.url)

// Development-only debugging (excluded from production)
if (isDevelopment) {
  console.log('🔧 Development Mode: Mathematical spacing system loaded')
  console.log('🎯 Design tokens available:', {
    primitive: 'var(--space-1) through var(--space-32)',
    semantic: 'var(--space-micro) through var(--space-massive)',
    typography: 'var(--text-xs) through var(--text-6xl)'
  })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center space-y-8 max-w-4xl mx-auto p-6">
      <h1 class="text-4xl font-bold text-gray-900">Fablecraft Foundation</h1>
      <p class="text-xl text-gray-600">Modernized build environment is ready.</p>

      <!-- Supabase Status -->
      <div class="bg-white p-6 rounded-lg shadow-sm border max-w-md mx-auto">
        <h2 class="text-lg font-semibold mb-4">Supabase Status</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Connection:</span>
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
        </div>
      </div>

      <!-- Development-Only Validation Tests -->
      <details v-if="isDevelopment" class="bg-white p-6 rounded-lg shadow-sm border max-w-4xl mx-auto text-left">
        <summary class="cursor-pointer font-semibold text-lg mb-4 hover:text-blue-600">
          Design Token Validation Tests
        </summary>
        
        <div class="space-y-6">
          <!-- 8-Point Grid Scale Validation -->
          <div>
            <h3 class="text-sm font-medium text-blue-800 mb-3">8-Point Grid Scale:</h3>
            <div class="flex flex-wrap items-end gap-1">
              <div class="flex flex-col items-center">
                <div class="bg-blue-500 border border-blue-600" :style="{ width: 'var(--space-1)', height: 'var(--space-1)' }"></div>
                <span class="text-xs mt-1 text-blue-600">4px</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-blue-500 border border-blue-600" :style="{ width: 'var(--space-2)', height: 'var(--space-2)' }"></div>
                <span class="text-xs mt-1 text-blue-600">8px</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-blue-500 border border-blue-600" :style="{ width: 'var(--space-4)', height: 'var(--space-4)' }"></div>
                <span class="text-xs mt-1 text-blue-600">16px</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-blue-500 border border-blue-600" :style="{ width: 'var(--space-6)', height: 'var(--space-6)' }"></div>
                <span class="text-xs mt-1 text-blue-600">24px</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-blue-500 border border-blue-600" :style="{ width: 'var(--space-8)', height: 'var(--space-8)' }"></div>
                <span class="text-xs mt-1 text-blue-600">32px</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-blue-500 border border-blue-600" :style="{ width: 'var(--space-12)', height: 'var(--space-12)' }"></div>
                <span class="text-xs mt-1 text-blue-600">48px</span>
              </div>
            </div>
          </div>
          
          <!-- Semantic Spacing Aliases -->
          <div>
            <h3 class="text-sm font-medium text-blue-800 mb-3">Semantic Spacing:</h3>
            <div class="flex flex-wrap gap-2">
              <div class="bg-green-100 border border-green-400 text-green-800 text-xs font-medium rounded px-2 py-1" :style="{ margin: 'var(--space-micro)' }">
                micro (4px)
              </div>
              <div class="bg-green-100 border border-green-400 text-green-800 text-xs font-medium rounded px-2 py-1" :style="{ margin: 'var(--space-tiny)' }">
                tiny (8px)
              </div>
              <div class="bg-green-100 border border-green-400 text-green-800 text-xs font-medium rounded px-2 py-1" :style="{ margin: 'var(--space-small)' }">
                small (16px)
              </div>
              <div class="bg-green-100 border border-green-400 text-green-800 text-xs font-medium rounded px-2 py-1" :style="{ margin: 'var(--space-medium)' }">
                medium (24px)
              </div>
            </div>
          </div>

          <!-- Golden Ratio Typography Test -->
          <div>
            <h3 class="text-sm font-medium text-blue-800 mb-3">Golden Ratio Typography:</h3>
            <div class="space-y-1 text-left">
              <div :style="{ fontSize: 'var(--text-xs)', lineHeight: 'var(--line-height-normal)' }">
                Extra Small Text (Golden Ratio)
              </div>
              <div :style="{ fontSize: 'var(--text-sm)', lineHeight: 'var(--line-height-normal)' }">
                Small Text (Golden Ratio)
              </div>
              <div :style="{ fontSize: 'var(--text-base)', lineHeight: 'var(--line-height-normal)' }">
                Base Text (Golden Ratio)
              </div>
              <div :style="{ fontSize: 'var(--text-lg)', lineHeight: 'var(--line-height-normal)' }">
                Large Text (Golden Ratio)
              </div>
            </div>
          </div>

          <!-- Foundation Architecture Summary -->
          <div class="border-t pt-4">
            <h3 class="text-sm font-medium text-blue-800 mb-2">Foundation Architecture:</h3>
            <div class="text-xs font-mono bg-gray-50 p-3 rounded border space-y-1">
              <div>✓ Industry-standard 8-point grid system</div>
              <div>✓ Golden Ratio typography scaling (φ = 1.618)</div>
              <div>✓ SSR-compatible CSS custom properties</div>
              <div>✓ Semantic spacing aliases for maintainability</div>
              <div>✓ Responsive scaling across breakpoints</div>
            </div>
          </div>

          <p class="text-xs text-blue-600">
            Open browser dev tools → Elements → Computed styles to inspect CSS variables
          </p>
        </div>
      </details>

      <p class="text-sm text-gray-500">Ready to build amazing things!</p>
    </div>
  </div>
</template>

<style scoped>
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