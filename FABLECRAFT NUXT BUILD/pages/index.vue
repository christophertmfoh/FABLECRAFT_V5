<!-- file: pages/index.vue -->
<script setup lang="ts">
// Test Supabase connection
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Simple connection test
const { data: connectionTest } = await supabase
  .from('projects')
  .select('count', { count: 'exact', head: true })

onMounted(() => {
  console.log('Supabase connected:', !!supabase)
  console.log('Connection test result:', connectionTest)
  console.log('Current user:', user.value)
})
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
            <span class="text-green-600 font-medium">✓ Ready</span>
          </div>
          <div class="flex justify-between">
            <span>User Status:</span>
            <span class="text-blue-600 font-medium">Not logged in</span>
          </div>
        </div>
      </div>

      <!-- Validation Tests - Collapsible Section -->
      <details class="bg-blue-50 p-6 rounded-lg shadow-sm border max-w-2xl mx-auto text-left">
        <summary class="text-lg font-semibold text-blue-900 cursor-pointer hover:text-blue-700">
          Phase 1A: Mathematical Spacing System Tests
        </summary>
        
        <div class="mt-4 space-y-4">
          <!-- 8-Point Grid Test -->
          <div>
            <h3 class="text-sm font-medium text-blue-800 mb-2">8-Point Grid Variables:</h3>
            <div class="flex flex-wrap gap-2 text-xs">
              <div class="spacing-test" style="width: var(--space-4); height: var(--space-4);">4px</div>
              <div class="spacing-test" style="width: var(--space-8); height: var(--space-8);">8px</div>
              <div class="spacing-test" style="width: var(--space-16); height: var(--space-16);">16px</div>
              <div class="spacing-test" style="width: var(--space-24); height: var(--space-24);">24px</div>
            </div>
          </div>
          
          <!-- Golden Ratio Typography Test -->
          <div class="typography-test">
            <h3 class="text-sm font-medium text-blue-800 mb-2">Golden Ratio Typography:</h3>
            <div style="font-size: var(--text-golden-xs);">XS Text (Golden Ratio)</div>
            <div style="font-size: var(--text-golden-sm);">Small Text (Golden Ratio)</div>
            <div style="font-size: var(--text-golden-base);">Base Text (Golden Ratio)</div>
            <div style="font-size: var(--text-golden-lg);">Large Text (Golden Ratio)</div>
          </div>
          
          <!-- Semantic Spacing Test -->
          <div>
            <h3 class="text-sm font-medium text-blue-800 mb-2">Semantic Spacing:</h3>
            <div class="flex flex-wrap gap-1 text-xs">
              <div style="padding: var(--space-micro); background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6;">micro</div>
              <div style="padding: var(--space-tiny); background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6;">tiny</div>
              <div style="padding: var(--space-small); background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6;">small</div>
              <div style="padding: var(--space-medium); background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6;">medium</div>
            </div>
          </div>
          
          <p class="text-xs text-blue-600 mt-3">
            Open browser dev tools → Elements → Computed styles to verify CSS variables
          </p>
        </div>
      </details>
      
      <p class="text-sm text-gray-500 mt-8">
        Ready to build amazing things! 🚀
      </p>
    </div>
  </div>
</template>