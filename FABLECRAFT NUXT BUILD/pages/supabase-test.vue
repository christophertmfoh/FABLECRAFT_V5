<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
      <div class="space-y-6">
        <!-- Connection Status -->
        <div class="p-6 rounded-lg border bg-card">
          <h2 class="text-xl font-semibold mb-4">Connection Status</h2>
          <div class="space-y-2">
            <p><strong>Supabase URL:</strong> {{ supabaseUrl }}</p>
            <p><strong>Status:</strong> 
              <span v-if="connectionStatus === 'connected'" class="text-green-500">✅ Connected</span>
              <span v-else-if="connectionStatus === 'checking'" class="text-yellow-500">⏳ Checking...</span>
              <span v-else class="text-red-500">❌ Not Connected</span>
            </p>
            <p v-if="error" class="text-red-500"><strong>Error:</strong> {{ error }}</p>
          </div>
        </div>

        <!-- Test Database Query -->
        <div class="p-6 rounded-lg border bg-card">
          <h2 class="text-xl font-semibold mb-4">Database Test</h2>
          <button 
            @click="testDatabaseConnection" 
            class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            :disabled="testing"
          >
            {{ testing ? 'Testing...' : 'Test Database Query' }}
          </button>
          <div v-if="queryResult" class="mt-4 p-4 bg-muted rounded">
            <pre>{{ JSON.stringify(queryResult, null, 2) }}</pre>
          </div>
        </div>

        <!-- Supabase Client Info -->
        <div class="p-6 rounded-lg border bg-card">
          <h2 class="text-xl font-semibold mb-4">Supabase Client Info</h2>
          <div class="space-y-2">
            <p><strong>Client Available:</strong> {{ clientAvailable ? '✅ Yes' : '❌ No' }}</p>
            <p><strong>Auth Available:</strong> {{ authAvailable ? '✅ Yes' : '❌ No' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const config = useRuntimeConfig()

// State
const connectionStatus = ref<'checking' | 'connected' | 'error'>('checking')
const error = ref<string | null>(null)
const queryResult = ref<any>(null)
const testing = ref(false)

// Computed
const supabaseUrl = computed(() => config.public.supabaseUrl || 'Not configured')
const clientAvailable = computed(() => !!supabase)
const authAvailable = computed(() => !!supabase?.auth)

// Check connection on mount
onMounted(async () => {
  try {
    // Simple connection test - try to get the current session
    const { data, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      throw authError
    }
    
    connectionStatus.value = 'connected'
  } catch (err: any) {
    connectionStatus.value = 'error'
    error.value = err.message || 'Failed to connect to Supabase'
  }
})

// Test database connection
const testDatabaseConnection = async () => {
  testing.value = true
  queryResult.value = null
  
  try {
    // Try a simple query - this will fail if no tables exist, but proves connection works
    const { data, error: queryError, count } = await supabase
      .from('_test_connection')
      .select('*', { count: 'exact', head: true })
    
    if (queryError) {
      // If error is about missing table, that's actually good - means we connected!
      if (queryError.message.includes('relation') || queryError.message.includes('does not exist')) {
        queryResult.value = {
          status: 'success',
          message: 'Successfully connected to Supabase! (No tables exist yet)',
          details: queryError.message
        }
      } else {
        throw queryError
      }
    } else {
      queryResult.value = {
        status: 'success',
        message: 'Query successful',
        data,
        count
      }
    }
  } catch (err: any) {
    queryResult.value = {
      status: 'error',
      message: err.message || 'Query failed'
    }
  } finally {
    testing.value = false
  }
}
</script>