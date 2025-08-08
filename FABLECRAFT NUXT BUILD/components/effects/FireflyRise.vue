<template>
  <div
    class="fixed inset-0 pointer-events-none"
    :style="{ zIndex: String(zIndex) }"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="w-full h-full block" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watchEffect } from 'vue'

interface FireflyRiseProps {
  density?: 'low' | 'medium' | 'high'
  maxParticles?: number // hard cap; overrides density
  speedScale?: number // 1 = default; >1 = faster
  colorVariable?: string // CSS variable name without leading --, e.g. 'primary'
  zIndex?: number
}

const props = withDefaults(defineProps<FireflyRiseProps>(), {
  density: 'medium',
  speedScale: 1,
  colorVariable: 'primary',
  zIndex: 0,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Performance guards
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

let rafId = 0
let resizeObs: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null
let ticking = false
let lastTs = 0

// Derived color from CSS variable tokens (hsl values like "222 47% 11%")
let baseFillColor = 'hsla(210 20% 98% / 0.8)'
function resolveThemeHSLA(alpha = 0.6) {
  try {
    const styles = getComputedStyle(document.documentElement)
    const raw = styles.getPropertyValue(`--${props.colorVariable}`).trim()
    if (raw) {
      // Tailwind tokens typically are like: "222 47% 11%"
      baseFillColor = `hsla(${raw} / ${alpha})`
    }
  } catch {}
}

// Particle system
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
  flickerSeed: number
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1
let particles: Particle[] = []

function capParticlesForDensity(): number {
  if (typeof props.maxParticles === 'number' && props.maxParticles > 0) {
    return props.maxParticles
  }
  // Scale by viewport area with density tiers
  const area = (width * height) / (1000 * 1000) // in megapx
  const base = props.density === 'high' ? 120 : props.density === 'low' ? 35 : 70
  // Mobile throttle
  const isMobile = width < 768
  const mobileFactor = isMobile ? 0.6 : 1
  const reducedFactor = prefersReducedMotion ? 0 : 1
  return Math.floor(base * area * mobileFactor * reducedFactor) || 0
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function respawn(p: Particle) {
  p.x = rand(-width * 0.1, width * 1.1)
  p.y = height + rand(0, height * 0.2) // start below viewport
  p.vx = rand(-8, 8) // gentle horizontal drift (px/s)
  p.vy = -rand(25, 70) * props.speedScale // upward (px/s)
  p.size = rand(0.8, 2.2)
  p.alpha = rand(0.4, 0.9)
  p.life = 0
  p.maxLife = rand(6, 14) // seconds
  p.flickerSeed = Math.random() * 10
}

function ensureParticles() {
  const target = capParticlesForDensity()
  if (particles.length > target) {
    particles.length = target
  } else {
    for (let i = particles.length; i < target; i++) {
      const p: Particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 1,
        alpha: 0.7,
        life: 0,
        maxLife: 10,
        flickerSeed: Math.random() * 10,
      }
      respawn(p)
      // randomize into viewport
      p.y = rand(0, height)
      particles.push(p)
    }
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  width = Math.max(1, Math.floor(rect.width))
  height = Math.max(1, Math.floor(rect.height))
  dpr = Math.min(2, window.devicePixelRatio || 1) // cap DPR for perf
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    ctx.globalCompositeOperation = 'lighter'
  }
  ensureParticles()
}

function step(ts: number) {
  if (!ctx) return
  if (document.hidden) {
    rafId = requestAnimationFrame(step)
    return
  }
  const dt = Math.min(0.033, (ts - lastTs) / 1000 || 0.016)
  lastTs = ts
  // Clear
  ctx.clearRect(0, 0, width, height)

  // Draw
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    // Update
    p.life += dt
    p.x += p.vx * dt + Math.sin((ts / 1000 + p.flickerSeed) * 0.6) * 4 * dt
    p.y += p.vy * dt

    // Flicker
    const flicker = 0.5 + 0.5 * Math.sin((ts / 1000 + p.flickerSeed) * 3)
    const alpha = Math.max(0, Math.min(1, p.alpha * (0.8 + 0.2 * flicker)))

    // Recycle if off top or lifespan exceeded
    if (p.y + p.size < -16 || p.life > p.maxLife) {
      respawn(p)
    }

    // Draw small soft dots with glow
    ctx.shadowBlur = 8
    ctx.shadowColor = baseFillColor
    ctx.fillStyle = baseFillColor
    ctx.globalAlpha = alpha

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  if (!import.meta.client) return
  if (prefersReducedMotion) return // honor user preference

  resolveThemeHSLA(0.65)
  resize()

  // Observe size of canvas container
  if ('ResizeObserver' in window) {
    resizeObs = new ResizeObserver(() => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          resize()
          ticking = false
        })
      }
    })
    if (canvasRef.value) resizeObs.observe(canvasRef.value)
  } else {
    window.addEventListener('resize', resize)
  }

  // Observe theme change via data-theme mutation
  themeObserver = new MutationObserver(() => resolveThemeHSLA(0.65))
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // Update base color periodically in case CSS vars change elsewhere
  const colorRefresh = window.setInterval(() => resolveThemeHSLA(0.65), 1500)

  // Visibility pause/resume
  const onVis = () => {
    if (document.hidden) return
    lastTs = performance.now()
  }
  document.addEventListener('visibilitychange', onVis)

  lastTs = performance.now()
  rafId = requestAnimationFrame(step)

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    if (resizeObs) resizeObs.disconnect()
    window.removeEventListener('resize', resize)
    if (themeObserver) themeObserver.disconnect()
    window.clearInterval(colorRefresh)
    document.removeEventListener('visibilitychange', onVis)
  })
})

// Keep re-evaluating particle count when density/maxParticles changes
watchEffect(() => {
  if (!ctx) return
  ensureParticles()
})
</script>

<style scoped>
/* Strongly optimized: GPU-composited layer, no pointer events, behind content */
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>