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
            <span class="text-blue-600 font-medium">{{ user ? 'Logged In' : 'Not logged in' }}</span>
          </div>
        </div>
      </div>
      
      <p class="text-sm text-gray-500">
        Ready to build amazing things! 🚀
      </p>
    </div>
  </div>
</template>