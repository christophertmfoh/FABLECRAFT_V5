<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <h1 class="text-4xl font-bold text-center mb-12">ThemeGlow Component Demo</h1>
    
    <!-- Grid of Examples -->
    <div class="max-w-7xl mx-auto space-y-16">
      
      <!-- Hero Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Hero Section with Animated Glow</h2>
        <UiThemeGlow size="xl" position="top-right" :animate="true" :intensity="0.8">
          <div class="bg-card p-16 rounded-lg border text-center">
            <h1 class="text-5xl font-bold mb-4">Welcome to FableCraft</h1>
            <p class="text-xl text-muted-foreground mb-8">Build amazing experiences with our modern stack</p>
            <button class="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </UiThemeGlow>
      </section>

      <!-- Interactive Cards -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Interactive Feature Cards</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UiThemeGlow size="sm" :interactive="true">
            <div class="bg-card p-6 rounded-lg border h-full">
              <div class="text-3xl mb-4">🚀</div>
              <h3 class="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p class="text-sm text-muted-foreground">Optimized for performance with SSR and edge rendering.</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow size="sm" :interactive="true">
            <div class="bg-card p-6 rounded-lg border h-full">
              <div class="text-3xl mb-4">🎨</div>
              <h3 class="text-lg font-semibold mb-2">Theme Aware</h3>
              <p class="text-sm text-muted-foreground">Automatically adapts to all 15 themes in your system.</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow size="sm" :interactive="true">
            <div class="bg-card p-6 rounded-lg border h-full">
              <div class="text-3xl mb-4">⚡</div>
              <h3 class="text-lg font-semibold mb-2">Zero Bloat</h3>
              <p class="text-sm text-muted-foreground">Pure CSS implementation with no JavaScript overhead.</p>
            </div>
          </UiThemeGlow>
        </div>
      </section>

      <!-- CTA with Custom Position -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Call to Action with Custom Positioned Glow</h2>
        <UiThemeGlow 
          position="custom" 
          :customPosition="{ x: '70%', y: '30%' }" 
          size="md" 
          :intensity="0.6"
        >
          <div class="bg-card p-12 rounded-lg border text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to start building?</h2>
            <p class="text-lg text-muted-foreground mb-6">Join thousands of developers using FableCraft</p>
            <div class="flex gap-4 justify-center">
              <button class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Sign up now
              </button>
              <button class="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Learn more
              </button>
            </div>
          </div>
        </UiThemeGlow>
      </section>

      <!-- Multiple Glows Composition -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Multiple Glows Composition</h2>
        <div class="relative">
          <UiThemeGlow position="top-left" size="lg" :intensity="0.5" />
          <UiThemeGlow position="bottom-right" size="md" :intensity="0.3" />
          
          <div class="bg-card p-16 rounded-lg border relative z-10">
            <h3 class="text-2xl font-bold mb-4">Advanced Glow Effects</h3>
            <p class="text-muted-foreground">
              You can layer multiple glow components to create complex lighting effects.
              Each glow can have its own position, size, and intensity.
            </p>
          </div>
        </div>
      </section>

      <!-- Size Comparison -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Size Comparison</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <UiThemeGlow size="sm">
            <div class="bg-card p-4 rounded-lg border text-center">
              <p class="font-semibold">Small</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow size="md">
            <div class="bg-card p-4 rounded-lg border text-center">
              <p class="font-semibold">Medium</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow size="lg">
            <div class="bg-card p-4 rounded-lg border text-center">
              <p class="font-semibold">Large</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow size="xl">
            <div class="bg-card p-4 rounded-lg border text-center">
              <p class="font-semibold">Extra Large</p>
            </div>
          </UiThemeGlow>
        </div>
      </section>

      <!-- Intensity Comparison -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Intensity Levels</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UiThemeGlow :intensity="0.3">
            <div class="bg-card p-6 rounded-lg border text-center">
              <p class="font-semibold">30% Intensity</p>
              <p class="text-sm text-muted-foreground">Subtle background accent</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow :intensity="0.6">
            <div class="bg-card p-6 rounded-lg border text-center">
              <p class="font-semibold">60% Intensity</p>
              <p class="text-sm text-muted-foreground">Balanced glow effect</p>
            </div>
          </UiThemeGlow>
          
          <UiThemeGlow :intensity="1">
            <div class="bg-card p-6 rounded-lg border text-center">
              <p class="font-semibold">100% Intensity</p>
              <p class="text-sm text-muted-foreground">Maximum visual impact</p>
            </div>
          </UiThemeGlow>
        </div>
      </section>

      <!-- No Blur Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Sharp Gradient (No Blur)</h2>
        <UiThemeGlow size="lg" :blur="false" :intensity="0.8">
          <div class="bg-card p-12 rounded-lg border">
            <h3 class="text-xl font-bold mb-4">Crisp Gradient Effect</h3>
            <p class="text-muted-foreground">
              Disable blur for a sharper, more defined gradient appearance.
              Useful for creating distinct color zones or geometric effects.
            </p>
          </div>
        </UiThemeGlow>
      </section>

      <!-- Theme Switcher -->
      <section class="pb-16">
        <h2 class="text-2xl font-semibold mb-6">Try Different Themes</h2>
        <p class="text-muted-foreground mb-4">
          The glow automatically adapts to each theme's color palette and optimal blend mode.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <button
            v-for="theme in themes"
            :key="theme.name"
            class="px-4 py-2 rounded-lg border transition-all"
            :class="currentTheme === theme.name ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-accent'"
            @click="setTheme(theme.name)"
          >
            {{ theme.label }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Use the theme composable
const { themes, currentTheme, setTheme } = useTheme()
</script>