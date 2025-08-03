<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- Theme Switcher -->
      <div class="bg-card p-6 rounded-lg border">
        <h2 class="text-2xl font-bold mb-4">Typography Test - Theme: {{ currentTheme }}</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="theme in themes.slice(0, 6)" 
            :key="theme.name"
            @click="setTheme(theme.name)"
            class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
          >
            {{ theme.label }}
          </button>
        </div>
      </div>

      <!-- Standard Typography Scale -->
      <div class="bg-card p-6 rounded-lg border space-y-4">
        <h3 class="text-xl font-semibold mb-6">Standard Typography Scale</h3>
        <p style="font-size: var(--text-xs)">--text-xs: The quick brown fox (12px)</p>
        <p style="font-size: var(--text-sm)">--text-sm: The quick brown fox (14px)</p>
        <p style="font-size: var(--text-base)">--text-base: The quick brown fox (16px)</p>
        <p style="font-size: var(--text-lg)">--text-lg: The quick brown fox (18px)</p>
        <p style="font-size: var(--text-xl)">--text-xl: The quick brown fox (20px)</p>
        <p style="font-size: var(--text-2xl)">--text-2xl: The quick brown fox (24px)</p>
        <p style="font-size: var(--text-3xl)">--text-3xl: The quick brown fox (30px)</p>
        <p style="font-size: var(--text-4xl)">--text-4xl: Quick brown fox (36px)</p>
        <p style="font-size: var(--text-5xl)">--text-5xl: Quick fox (48px)</p>
        <p style="font-size: var(--text-6xl)">--text-6xl: Fox (60px)</p>
      </div>

      <!-- Golden Ratio Typography Scale -->
      <div class="bg-card p-6 rounded-lg border space-y-4">
        <h3 class="text-xl font-semibold mb-6">Golden Ratio Typography Scale (1.618)</h3>
        <p class="text-golden-xs">text-golden-xs: The quick brown fox jumps over the lazy dog (9.88px)</p>
        <p class="text-golden-sm">text-golden-sm: The quick brown fox jumps over the lazy dog (12.23px)</p>
        <p class="text-golden-base">text-golden-base: The quick brown fox jumps over the lazy dog (16px)</p>
        <p class="text-golden-lg">text-golden-lg: The quick brown fox jumps over the lazy dog (25.88px)</p>
        <p class="text-golden-xl">text-golden-xl: The quick brown fox jumps (41.85px)</p>
        <p class="text-golden-2xl">text-golden-2xl: The quick brown (67.67px)</p>
        <p class="text-golden-3xl">text-golden-3xl: Quick fox (109.46px)</p>
      </div>

      <!-- Letter Spacing Examples -->
      <div class="bg-card p-6 rounded-lg border space-y-4">
        <h3 class="text-xl font-semibold mb-6">Letter Spacing Optimization</h3>
        <p class="text-4xl tracking-tighter">tracking-tighter: Display Text</p>
        <p class="text-2xl tracking-tight">tracking-tight: Heading Text</p>
        <p class="text-base tracking-normal">tracking-normal: Body text is optimized for readability</p>
        <p class="text-sm tracking-wide">tracking-wide: Small text and labels</p>
        <p class="text-sm uppercase tracking-wider">tracking-wider: UPPERCASE TEXT</p>
        <p class="text-xs tracking-widest">tracking-widest: MICRO TEXT</p>
      </div>

      <!-- Font Families -->
      <div class="bg-card p-6 rounded-lg border space-y-4">
        <h3 class="text-xl font-semibold mb-6">Font Families</h3>
        <p class="text-lg" style="font-family: var(--font-sans)">Sans: Inter - The quick brown fox</p>
        <p class="text-lg" style="font-family: var(--font-serif)">Serif: Playfair Display - The quick brown fox</p>
        <p class="text-lg" style="font-family: var(--font-mono)">Mono: JetBrains Mono - The quick brown fox</p>
      </div>

      <!-- CSS Variable Values -->
      <div class="bg-card p-6 rounded-lg border">
        <h3 class="text-xl font-semibold mb-4">CSS Variable Inspector</h3>
        <pre class="text-xs bg-muted p-4 rounded overflow-x-auto">
Golden Ratio: {{ cssVars.goldenRatio }}
text-golden-lg: {{ cssVars.textGoldenLg }}
letter-spacing-tight: {{ cssVars.letterSpacingTight }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const { themes, currentTheme, setTheme } = useTheme()

// Get CSS variable values for inspection
const cssVars = ref({})

onMounted(() => {
  if (process.client) {
    const computedStyle = getComputedStyle(document.documentElement)
    cssVars.value = {
      goldenRatio: computedStyle.getPropertyValue('--golden-ratio'),
      textGoldenLg: computedStyle.getPropertyValue('--text-golden-lg'),
      letterSpacingTight: computedStyle.getPropertyValue('--letter-spacing-tight')
    }
  }
})
</script>