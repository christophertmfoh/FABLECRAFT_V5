<!-- file: error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-destructive">{{ error?.statusCode || 500 }}</h1>
      <p class="text-xl mt-2">{{ error?.statusMessage || 'An error occurred' }}</p>
      <button
        class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        @click="handleError"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error?: {
    statusCode?: number
    statusMessage?: string
  }
}>()

const error = computed(() => props.error || { statusCode: 500, statusMessage: 'An error occurred' })

const handleError = () => clearError({ redirect: '/' })
</script>
