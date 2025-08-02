<!-- file: error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-500">{{ error.statusCode }}</h1>
      <p class="text-xl mt-2">{{ error.statusMessage }}</p>
      <button 
        @click="handleError"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>