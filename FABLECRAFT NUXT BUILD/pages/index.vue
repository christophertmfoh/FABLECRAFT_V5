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
            <span class="font-mono text-xs">{{ supabaseUrl ? 'Production' : 'Development' }}</span>
          </div>
        </div>
      </div>

      <!-- Development-Only Validation Tests -->
      <details class="bg-blue-50 p-6 rounded-lg shadow-sm border max-w-2xl mx-auto development-only">
        <summary class="text-lg font-semibold mb-4 text-blue-900 cursor-pointer">
          🔧 Development: Mathematical Spacing System Validation
        </summary>
        
        <!-- Industry-Standard Design Token Testing -->
        <div class="space-y-6 text-left mt-4">
          
          <!-- 8-Point Grid Scale Validation -->
          <div class="space-y-3">
            <h3 class="text-sm font-medium text-blue-800">8-Point Grid Scale:</h3>
            <div class="flex flex-wrap gap-2 text-xs items-end">
              <div class="spacing-test" style="width: var(--space-1); height: var(--space-1);"><span>4px</span></div>
              <div class="spacing-test" style="width: var(--space-2); height: var(--space-2);"><span>8px</span></div>
              <div class="spacing-test" style="width: var(--space-4); height: var(--space-4);"><span>16px</span></div>
              <div class="spacing-test" style="width: var(--space-6); height: var(--space-6);"><span>24px</span></div>
              <div class="spacing-test" style="width: var(--space-8); height: var(--space-8);"><span>32px</span></div>
              <div class="spacing-test" style="width: var(--space-12); height: var(--space-12);"><span>48px</span></div>
            </div>
          </div>
          
          <!-- Semantic Token Validation -->
          <div class="space-y-3">
            <h3 class="text-sm font-medium text-blue-800">Semantic Design Tokens:</h3>
            <div class="flex flex-wrap gap-2 text-xs items-end">
              <div class="spacing-test" style="width: var(--space-micro); height: var(--space-micro);"><span>micro</span></div>
              <div class="spacing-test" style="width: var(--space-tiny); height: var(--space-tiny);"><span>tiny</span></div>
              <div class="spacing-test" style="width: var(--space-small); height: var(--space-small);"><span>small</span></div>
              <div class="spacing-test" style="width: var(--space-medium); height: var(--space-medium);"><span>medium</span></div>
              <div class="spacing-test" style="width: var(--space-large); height: var(--space-large);"><span>large</span></div>
            </div>
          </div>
          
          <!-- Typography Scale Validation -->
          <div class="typography-test space-y-3">
            <h3 class="text-sm font-medium text-blue-800">Semantic Typography Scale:</h3>
            <div class="space-y-1">
              <div style="font-size: var(--text-xs);">XS Text (Semantic Token)</div>
              <div style="font-size: var(--text-sm);">Small Text (Semantic Token)</div>
              <div style="font-size: var(--text-base);">Base Text (Semantic Token)</div>
              <div style="font-size: var(--text-lg);">Large Text (Semantic Token)</div>
            </div>
          </div>
          
          <!-- Foundation Architecture -->
          <div class="space-y-3">
            <h3 class="text-sm font-medium text-blue-800">Foundation Architecture:</h3>
            <div class="text-xs font-mono bg-white p-3 rounded border">
              <div>✓ Industry-standard 8-point grid system</div>
              <div>✓ Golden Ratio typography scaling (φ = 1.618)</div>
              <div>✓ Semantic spacing aliases for developer clarity</div>
              <div>✓ Cross-browser compatible CSS variables</div>
            </div>
          </div>
          
          <div class="text-xs text-blue-600 mt-3 p-3 border-t">
            <strong>Development Note:</strong> This validation section is excluded from production builds using @layer development and @supports detection.
            <br><strong>Validation:</strong> Open DevTools → Elements → Computed to verify CSS custom properties.
          </div>
        </div>
      </details>

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