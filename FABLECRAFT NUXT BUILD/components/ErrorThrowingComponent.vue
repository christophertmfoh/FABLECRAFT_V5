<template>
  <div>
    <p v-if="!shouldError">This component will throw an error when clicked.</p>
    <p v-else>{{ throwError() }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  shouldError?: boolean
}>()

const shouldError = ref(props.shouldError || false)

const throwError = () => {
  throw new Error('This is a test error from ErrorThrowingComponent!')
}

// Expose method to trigger error from parent
defineExpose({
  triggerError: () => {
    shouldError.value = true
  }
})
</script>