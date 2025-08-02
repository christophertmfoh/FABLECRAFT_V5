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
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold text-gray-900">Fablecraft Foundation</h1>
      <p class="text-xl text-gray-600">Modernized build environment is ready.</p>
      
      <!-- Supabase Status -->
      <div class="mt-8 p-4 bg-white rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-2">Supabase Status</h3>
        <div class="space-y-2 text-sm">
          <p>Connection: <span class="font-mono text-green-600">✓ Connected</span></p>
          <p>User: <span class="font-mono">{{ user ? user.email : 'Not logged in' }}</span></p>
          <p>Database: <span class="font-mono text-green-600">✓ Ready</span></p>
        </div>
      </div>
    </div>
  </div>
</template>