<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Background Orbs -->
    <BackgroundOrbs 
      :enabled="orbsEnabled"
      :performance-mode="performanceMode"
    />
    
    <!-- Firefly Effect -->
    <FireflyEffect 
      :enabled="firefliesEnabled"
      :count="fireflyCount"
      :performance-mode="performanceMode"
    />
    
    <!-- Atmospheric Effects -->
    <div v-if="atmosphericEnabled" class="atmospheric-gradient"/>
    
    <!-- Content -->
    <div class="relative z-10 p-8 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Visual Effects Test</h1>
      
      <!-- Controls -->
      <div class="bg-card p-6 rounded-lg border space-y-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Effect Controls</h2>
        
        <!-- Performance Mode -->
        <div>
          <label class="block text-sm font-medium mb-2">Performance Mode</label>
          <select 
            v-model="performanceMode" 
            class="w-full px-3 py-2 bg-background border rounded"
            @change="updatePerformance"
          >
            <option value="low">Low (Mobile)</option>
            <option value="medium">Medium (Default)</option>
            <option value="high">High (Desktop)</option>
          </select>
        </div>
        
        <!-- Effect Toggles -->
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input 
              v-model="orbsEnabled" 
              type="checkbox"
              class="rounded"
            >
            <span>Background Orbs</span>
          </label>
          
          <label class="flex items-center gap-2">
            <input 
              v-model="firefliesEnabled" 
              type="checkbox"
              class="rounded"
            >
            <span>Fireflies ({{ fireflyCount }} elements)</span>
          </label>
          
          <label class="flex items-center gap-2">
            <input 
              v-model="atmosphericEnabled" 
              type="checkbox"
              class="rounded"
            >
            <span>Atmospheric Gradient</span>
          </label>
        </div>
        
        <!-- Firefly Count -->
        <div v-if="firefliesEnabled">
          <label class="block text-sm font-medium mb-2">
            Firefly Count: {{ fireflyCount }}
          </label>
          <input 
            v-model.number="fireflyCount" 
            type="range"
            min="1"
            max="12"
            class="w-full"
          >
        </div>
      </div>
      
      <!-- Performance Metrics -->
      <div class="bg-card p-6 rounded-lg border space-y-4 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Performance Info</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium">Current Theme:</span>
            <span class="ml-2">{{ currentTheme }}</span>
          </div>
          <div>
            <span class="font-medium">Device Memory:</span>
            <span class="ml-2">{{ deviceMemory || 'Unknown' }} GB</span>
          </div>
          <div>
            <span class="font-medium">CPU Cores:</span>
            <span class="ml-2">{{ cpuCores || 'Unknown' }}</span>
          </div>
          <div>
            <span class="font-medium">Reduced Motion:</span>
            <span class="ml-2">{{ reducedMotion ? 'Yes' : 'No' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Theme Switcher -->
      <div class="bg-card p-6 rounded-lg border">
        <h2 class="text-2xl font-semibold mb-4">Theme Test</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="theme in themes.slice(0, 8)" 
            :key="theme.name"
            class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            @click="setTheme(theme.name)"
          >
            {{ theme.label }}
          </button>
        </div>
      </div>
      
      <!-- Content Examples -->
      <div class="mt-12 space-y-8">
        <section>
          <h2 class="text-3xl font-bold mb-4">Content with Effects</h2>
          <p class="text-lg leading-relaxed mb-4">
            This page demonstrates the visual effects system working with actual content. 
            The effects are GPU-accelerated and theme-reactive, providing subtle atmospheric 
            enhancement without impacting performance.
          </p>
          <p class="text-lg leading-relaxed">
            Notice how the orb colors change with different themes, and how the fireflies 
            use the theme's primary color. All effects respect the user's motion preferences 
            and adapt to device capabilities.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Extended Navigator interface for deviceMemory
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

// Theme management
const { themes, currentTheme, setTheme } = useTheme()

// Effect states
const orbsEnabled = ref(true)
const firefliesEnabled = ref(true)
const atmosphericEnabled = ref(true)
const fireflyCount = ref(12)
const performanceMode = ref<'low' | 'medium' | 'high'>('medium')

// Device info
const deviceMemory = ref<number | null>(null)
const cpuCores = ref<number | null>(null)
const reducedMotion = ref(false)

// Background orbs composable
const { setPerformanceMode } = useBackgroundOrbs()

// Update performance mode
const updatePerformance = () => {
  setPerformanceMode(performanceMode.value)
}

// Detect device capabilities
onMounted(() => {
  if (import.meta.client) {
    // Device memory
    const nav = navigator as NavigatorWithMemory
    deviceMemory.value = nav.deviceMemory || null
    
    // CPU cores
    cpuCores.value = navigator.hardwareConcurrency || null
    
    // Reduced motion
    reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Auto-set performance mode based on device
    if (deviceMemory.value && deviceMemory.value < 4) {
      performanceMode.value = 'low'
    } else if (deviceMemory.value && deviceMemory.value >= 8) {
      performanceMode.value = 'high'
    }
  }
})
</script>