<template>
  <div class="fixed top-4 right-4 bg-black/80 text-white p-3 rounded text-xs font-mono z-50">
    <div>Theme: {{ currentTheme }}</div>
    <div>Primary: {{ glowPrimary || 'NOT FOUND' }}</div>
    <div>Secondary: {{ glowSecondary || 'NOT FOUND' }}</div>
    <div>Opacity P: {{ glowOpacityPrimary || 'NOT FOUND' }}</div>
    <div>Opacity S: {{ glowOpacitySecondary || 'NOT FOUND' }}</div>
    <div>Blend: {{ glowBlendMode || 'NOT FOUND' }}</div>
    <div>Size P: {{ glowSizePrimary || 'NOT FOUND' }}</div>
    <div>Size S: {{ glowSizeSecondary || 'NOT FOUND' }}</div>
  </div>
</template>

<script setup lang="ts">
const currentTheme = ref('')
const glowPrimary = ref('')
const glowSecondary = ref('')
const glowOpacityPrimary = ref('')
const glowOpacitySecondary = ref('')
const glowBlendMode = ref('')
const glowSizePrimary = ref('')
const glowSizeSecondary = ref('')

onMounted(() => {
  const updateValues = () => {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    
    currentTheme.value = root.getAttribute('data-theme') || 'none'
    glowPrimary.value = computedStyle.getPropertyValue('--glow-primary').trim()
    glowSecondary.value = computedStyle.getPropertyValue('--glow-secondary').trim()
    glowOpacityPrimary.value = computedStyle.getPropertyValue('--glow-opacity-primary').trim()
    glowOpacitySecondary.value = computedStyle.getPropertyValue('--glow-opacity-secondary').trim()
    glowBlendMode.value = computedStyle.getPropertyValue('--glow-blend-mode').trim()
    glowSizePrimary.value = computedStyle.getPropertyValue('--glow-size-primary').trim()
    glowSizeSecondary.value = computedStyle.getPropertyValue('--glow-size-secondary').trim()
  }
  
  updateValues()
  
  // Watch for theme changes
  const observer = new MutationObserver(updateValues)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
  
  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>