<template>
  <div v-if="hasError" :class="errorClasses">
    <slot 
      name="error" 
      :error="error" 
      :reset="reset"
      :info="errorInfo"
    >
      <!-- Default error fallback -->
      <div class="text-center py-8">
        <Icon 
          name="lucide:alert-triangle" 
          class="h-12 w-12 mx-auto mb-4 text-destructive"
        />
        <h3 class="text-lg font-semibold mb-2">
          {{ isDev ? 'Component Error' : 'Something went wrong' }}
        </h3>
        <p v-if="isDev" class="text-sm text-muted-foreground mb-4 font-mono">
          {{ error?.message || 'Unknown error' }}
        </p>
        <p v-else class="text-sm text-muted-foreground mb-4">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <Button 
          v-if="!hideReset"
          @click="reset"
          size="sm"
          variant="outline"
        >
          <Icon name="lucide:refresh-cw" class="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    </slot>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, computed, onErrorCaptured } from 'vue'
import { cn } from './Utils'

// Component props
interface ErrorBoundaryProps {
  onError?: (error: Error, instance: any, info: string) => void
  fallback?: any
  hideReset?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  hideReset: false
})

// State
const error = ref<Error | null>(null)
const errorInfo = ref<string>('')
const hasError = computed(() => error.value !== null)

// Check if in development mode
const isDev = process.dev || import.meta.env.DEV

// Error handler
onErrorCaptured((err: Error, instance: any, info: string) => {
  console.error('ErrorBoundary caught:', err)
  
  error.value = err
  errorInfo.value = info
  
  // Call custom error handler if provided
  if (props.onError) {
    props.onError(err, instance, info)
  }
  
  // Prevent the error from propagating
  return false
})

// Reset function
const reset = () => {
  error.value = null
  errorInfo.value = ''
}

// Computed classes
const errorClasses = computed(() => {
  return cn(
    'min-h-[200px] flex items-center justify-center',
    props.class
  )
})

// Expose reset method to parent
defineExpose({
  reset,
  hasError
})
</script>