<template>
  <div class="fixed top-4 right-4 bg-black/90 text-white p-3 rounded text-xs font-mono z-50 max-w-xs">
    <div class="font-bold mb-2">Glow Debug</div>
    <div>Theme: {{ currentTheme }}</div>
    <hr class="my-2 opacity-30">
    <div>H1: {{ glowHPrimary || 'MISSING' }}</div>
    <div>S1: {{ glowSPrimary || 'MISSING' }}</div>
    <div>L1: {{ glowLPrimary || 'MISSING' }}</div>
    <div>H2: {{ glowHSecondary || 'MISSING' }}</div>
    <div>S2: {{ glowSSecondary || 'MISSING' }}</div>
    <div>L2: {{ glowLSecondary || 'MISSING' }}</div>
    <hr class="my-2 opacity-30">
    <div>Op1: {{ glowOpacityPrimary || 'MISSING' }}</div>
    <div>Op2: {{ glowOpacitySecondary || 'MISSING' }}</div>
    <div>Blend: {{ glowBlendMode || 'MISSING' }}</div>
    <div>Size1: {{ glowSizePrimary || 'MISSING' }}</div>
    <div>Size2: {{ glowSizeSecondary || 'MISSING' }}</div>
  </div>
</template>

<script setup lang="ts">
const currentTheme = ref('')
const glowHPrimary = ref('')
const glowSPrimary = ref('')
const glowLPrimary = ref('')
const glowHSecondary = ref('')
const glowSSecondary = ref('')
const glowLSecondary = ref('')
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
    glowHPrimary.value = computedStyle.getPropertyValue('--glow-h-primary').trim()
    glowSPrimary.value = computedStyle.getPropertyValue('--glow-s-primary').trim()
    glowLPrimary.value = computedStyle.getPropertyValue('--glow-l-primary').trim()
    glowHSecondary.value = computedStyle.getPropertyValue('--glow-h-secondary').trim()
    glowSSecondary.value = computedStyle.getPropertyValue('--glow-s-secondary').trim()
    glowLSecondary.value = computedStyle.getPropertyValue('--glow-l-secondary').trim()
    glowOpacityPrimary.value = computedStyle.getPropertyValue('--glow-opacity-primary').trim()
    glowOpacitySecondary.value = computedStyle.getPropertyValue('--glow-opacity-secondary').trim()
    glowBlendMode.value = computedStyle.getPropertyValue('--glow-blend-mode').trim()
    glowSizePrimary.value = computedStyle.getPropertyValue('--glow-size-primary').trim()
    glowSizeSecondary.value = computedStyle.getPropertyValue('--glow-size-secondary').trim()
  }
  
  updateValues()
  
  const observer = new MutationObserver(updateValues)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
  
  onUnmounted(() => observer.disconnect())
})
</script>