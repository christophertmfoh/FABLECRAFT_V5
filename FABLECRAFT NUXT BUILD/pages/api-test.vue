<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Simple Supabase Test</h1>
    <div class="space-y-4">
      <div>
        <p><strong>Environment Variables:</strong></p>
        <p>URL: {{ config.public.supabaseUrl || 'Not set' }}</p>
        <p>Key: {{ config.public.supabaseAnonKey ? 'Set (hidden)' : 'Not set' }}</p>
      </div>

      <div>
        <p><strong>Client Status:</strong></p>
        <p>Supabase client exists: {{ supabaseExists ? '✅' : '❌' }}</p>
      </div>

      <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="testConnection">
        Test Connection
      </button>

      <div v-if="result" class="p-4 bg-gray-100 rounded">
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const supabase = useSupabaseClient()
const result = ref(null)

const supabaseExists = computed(() => !!supabase)

const testConnection = async () => {
  result.value = { testing: true }

  try {
    // Simple test - just try to use the client
    const { data, error } = await supabase.from('test').select('*').limit(1)

    result.value = {
      success: !error || error.message.includes('does not exist'),
      message: error ? error.message : 'Query successful',
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    result.value = {
      success: false,
      error: err.message,
      timestamp: new Date().toISOString(),
    }
  }
}
</script>
