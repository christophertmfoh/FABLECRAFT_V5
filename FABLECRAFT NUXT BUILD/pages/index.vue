<template>
  <div class="min-h-screen bg-background text-foreground flex items-center justify-center">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold">Fablecraft</h1>
      <p class="text-xl text-muted-foreground">Redirecting to development view...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Redirect to devview page after component is mounted
onMounted(() => {
  navigateTo('/devview')
})
</script>