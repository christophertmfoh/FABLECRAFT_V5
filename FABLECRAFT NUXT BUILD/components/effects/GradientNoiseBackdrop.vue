<template>
  <div class="fixed inset-0 pointer-events-none" :style="{ zIndex: String(zIndex) }" aria-hidden="true">
    <div class="grain" />
    <div class="soft-gradient" />
  </div>
</template>

<script setup lang="ts">
interface BackdropProps {
  zIndex?: number
  gradientOpacity?: number
  grainOpacity?: number
}

const props = withDefaults(defineProps<BackdropProps>(), {
  zIndex: 0,
  gradientOpacity: 0.18,
  grainOpacity: 0.07,
})
</script>

<style scoped>
/* Subtle animated grain using a tiny repeated gradient; no images required */
.grain {
  position: absolute;
  inset: 0;
  opacity: v-bind(grainOpacity);
  mix-blend-mode: overlay;
  background-image: 
    repeating-radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03) 0 2px, rgba(0,0,0,0.03) 3px 6px),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 2px, rgba(0,0,0,0.03) 3px 4px);
  animation: grainShift 9s linear infinite;
}

@keyframes grainShift {
  0% { transform: translate3d(0,0,0) }
  50% { transform: translate3d(-2%, -1%, 0) }
  100% { transform: translate3d(0,0,0) }
}

/* Soft theme-aware corner glow using CSS variables */
.soft-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: v-bind(gradientOpacity);
  background:
    radial-gradient(40% 35% at 15% 15%, hsl(var(--primary) / 0.25), transparent 70%),
    radial-gradient(35% 30% at 85% 20%, hsl(var(--accent, var(--secondary)) / 0.18), transparent 70%),
    radial-gradient(50% 45% at 50% 100%, hsl(var(--muted) / 0.22), transparent 70%);
  filter: saturate(1.1) blur(0.5px);
}

@media (prefers-reduced-motion: reduce) {
  .grain { animation: none; }
}
</style>