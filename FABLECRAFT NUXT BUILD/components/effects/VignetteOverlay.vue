<template>
  <div class="fixed inset-0 pointer-events-none" :style="{ zIndex: String(zIndex) }" aria-hidden="true">
    <div class="vignette" />
  </div>
</template>

<script setup lang="ts">
interface VignetteProps {
  strength?: 'subtle' | 'medium' | 'strong'
  tintVariable?: string // e.g. 'foreground' | 'background'
  zIndex?: number
}

const props = withDefaults(defineProps<VignetteProps>(), {
  strength: 'subtle',
  tintVariable: 'foreground',
  zIndex: 0,
})
</script>

<style scoped>
.vignette {
  position: absolute;
  inset: 0;
  /* theme-aware using CSS variables */
  --tint: hsl(var(--foreground));
  background: 
    radial-gradient(120% 90% at 50% 10%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%),
    radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.12) 100%);
  mix-blend-mode: multiply;
  opacity: 0.4;
}

:host([strength="subtle"]) .vignette, .vignette[strength="subtle"] { opacity: 0.25; }
:host([strength="medium"]) .vignette, .vignette[strength="medium"] { opacity: 0.4; }
:host([strength="strong"]) .vignette, .vignette[strength="strong"] { opacity: 0.6; }

@media (prefers-contrast: more) {
  .vignette { opacity: 0.2; }
}
</style>