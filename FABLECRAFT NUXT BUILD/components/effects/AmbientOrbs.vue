<template>
  <div class="fixed inset-0 pointer-events-none" :style="{ zIndex: String(zIndex) }" aria-hidden="true">
    <div class="orb orb-a" />
    <div class="orb orb-b" />
    <div class="orb orb-c" />
  </div>
</template>

<script setup lang="ts">
interface AmbientOrbsProps {
  zIndex?: number
  opacity?: number
  blur?: number
}

const props = withDefaults(defineProps<AmbientOrbsProps>(), {
  zIndex: 0,
  opacity: 0.14,
  blur: 60,
})
</script>

<style scoped>
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(v-bind(blur)px) saturate(1.1);
  opacity: v-bind(opacity);
  will-change: transform;
  mix-blend-mode: screen;
}

/* Theme-aware hues */
.orb-a {
  width: 46vw;
  height: 46vw;
  left: -10vw;
  top: 10vh;
  background: radial-gradient(circle at 40% 40%, hsl(var(--primary) / 0.4), transparent 65%);
  animation: driftA 38s ease-in-out infinite alternate;
}

.orb-b {
  width: 36vw;
  height: 36vw;
  right: -8vw;
  top: 6vh;
  background: radial-gradient(circle at 55% 45%, hsl(var(--accent, var(--secondary)) / 0.35), transparent 60%);
  animation: driftB 46s ease-in-out infinite alternate;
}

.orb-c {
  width: 52vw;
  height: 52vw;
  left: 15vw;
  bottom: -18vh;
  background: radial-gradient(circle at 50% 60%, hsl(var(--muted) / 0.35), transparent 70%);
  animation: driftC 54s ease-in-out infinite alternate;
}

@keyframes driftA {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(6vw, -4vh, 0) scale(1.05); }
}

@keyframes driftB {
  0% { transform: translate3d(0, 0, 0) scale(1.05); }
  100% { transform: translate3d(-5vw, 5vh, 0) scale(1); }
}

@keyframes driftC {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(4vw, -6vh, 0) scale(1.03); }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; filter: blur(calc(v-bind(blur)px * 0.8)); }
}
</style>