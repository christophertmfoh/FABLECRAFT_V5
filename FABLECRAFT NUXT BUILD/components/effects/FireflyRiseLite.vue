<template>
  <div class="fixed inset-0 pointer-events-none" :style="{ zIndex: String(zIndex) }" aria-hidden="true">
    <canvas ref="canvasRef" class="w-full h-full block" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface FireflyRiseLiteProps {
  density?: 'low' | 'medium' | 'high'
  maxParticles?: number
  speedScale?: number
  colorVariable?: string
  zIndex?: number
  glow?: boolean // if true, use 'lighter' composite
  targetFps?: number // throttle rendering target
  adaptive?: boolean // adapt stride based on FPS
  mobileDprCap?: number
  desktopDprCap?: number
}

const props = withDefaults(defineProps<FireflyRiseLiteProps>(), {
  density: 'medium',
  speedScale: 1,
  colorVariable: 'primary',
  zIndex: 0,
  glow: false,
  targetFps: 30,
  adaptive: true,
  mobileDprCap: 1,
  desktopDprCap: 1.5,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
  seed: number
}

let particles: Particle[] = []
let rafId = 0
let lastTs = 0
let fpsEMA = 60
let drawStride = 1 // increase to skip draws for some particles on low FPS

// Theme-aware color
let baseHSLA = '210 20% 98%'
function resolveThemeHSLA() {
  try {
    const styles = getComputedStyle(document.documentElement)
    const raw = styles.getPropertyValue(`--${props.colorVariable}`).trim()
    if (raw) baseHSLA = raw
  } catch {}
}

// Pre-rendered glow sprite
let sprite: HTMLCanvasElement | null = null
let spriteSize = 64 // base sprite size in css px
function buildSprite() {
  const c = document.createElement('canvas')
  const S = Math.floor(spriteSize * dpr)
  c.width = S
  c.height = S
  const sctx = c.getContext('2d')
  if (!sctx) return
  const grad = sctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  // center bright, fade to transparent
  grad.addColorStop(0, `hsla(${baseHSLA} / 0.85)`)
  grad.addColorStop(0.6, `hsla(${baseHSLA} / 0.35)`)
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  sctx.fillStyle = grad
  sctx.fillRect(0, 0, S, S)
  sprite = c
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function capParticles(): number {
  if (prefersReducedMotion) return 0
  if (typeof props.maxParticles === 'number' && props.maxParticles > 0) return props.maxParticles
  const areaMPx = (width * height) / 1_000_000
  const base = props.density === 'high' ? 100 : props.density === 'low' ? 30 : 60
  const isMobile = width < 768
  const mobileFactor = isMobile ? 0.5 : 1
  return Math.floor(base * areaMPx * mobileFactor)
}

function respawn(p: Particle) {
  p.x = rand(-width * 0.05, width * 1.05)
  p.y = height + rand(0, height * 0.25)
  p.vx = rand(-6, 6)
  p.vy = -rand(20, 55) * props.speedScale
  p.size = rand(0.9, 2.2)
  p.alpha = rand(0.45, 0.9)
  p.life = 0
  p.maxLife = rand(7, 14)
  p.seed = Math.random() * 10
}

function ensureParticles() {
  const target = capParticles()
  if (particles.length > target) particles.length = target
  while (particles.length < target) {
    const p: Particle = { x: 0, y: 0, vx: 0, vy: 0, size: 1, alpha: 0.7, life: 0, maxLife: 10, seed: Math.random() * 10 }
    respawn(p)
    p.y = rand(0, height)
    particles.push(p)
  }
}

function resize() {
  const el = canvasRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  width = Math.max(1, Math.floor(rect.width))
  height = Math.max(1, Math.floor(rect.height))
  const isMobile = width < 768
  const cap = isMobile ? props.mobileDprCap : props.desktopDprCap
  dpr = Math.min(cap, window.devicePixelRatio || 1)
  el.width = Math.floor(width * dpr)
  el.height = Math.floor(height * dpr)
  ctx = el.getContext('2d')
  if (!ctx) return
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  ctx.globalCompositeOperation = props.glow ? 'lighter' : 'source-over'
  ensureParticles()
  buildSprite()
}

function step(ts: number) {
  if (!ctx) return
  const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016)
  lastTs = ts

  // FPS estimate & adaptive stride
  const instFps = dt > 0 ? 1 / dt : 60
  fpsEMA = fpsEMA * 0.9 + instFps * 0.1
  if (props.adaptive) {
    if (fpsEMA < props.targetFps - 5) drawStride = 2
    else if (fpsEMA < props.targetFps - 10) drawStride = 3
    else drawStride = 1
  }

  // Throttle drawing to target fps (still update positions every frame)
  const shouldDraw = ts % Math.max(16, 1000 / props.targetFps) < 16

  // Clear
  if (shouldDraw) ctx.clearRect(0, 0, width, height)

  // Update & draw
  let strideCounter = 0
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.life += dt
    p.x += p.vx * dt + Math.sin((ts / 1000 + p.seed) * 0.5) * 3 * dt
    p.y += p.vy * dt

    if (p.y + p.size < -12 || p.life > p.maxLife) respawn(p)

    if (!shouldDraw) continue

    // Skip some particles when stride > 1
    strideCounter++
    if (drawStride > 1 && strideCounter % drawStride !== 0) continue

    const alpha = p.alpha * (0.85 + 0.15 * Math.sin((ts / 1000 + p.seed) * 2.5))
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha))

    // Draw pre-rendered sprite, scale by particle size
    const scale = 10 // visual radius multiplier
    const size = p.size * scale
    const half = size / 2
    if (sprite) ctx.drawImage(sprite, p.x - half, p.y - half, size, size)
  }
  ctx.globalAlpha = 1

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  if (!import.meta.client || prefersReducedMotion) return
  resolveThemeHSLA()
  buildSprite()
  resize()
  const ro = new ResizeObserver(() => resize())
  if (canvasRef.value) ro.observe(canvasRef.value)

  const mo = new MutationObserver(() => {
    resolveThemeHSLA()
    buildSprite()
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  lastTs = performance.now()
  rafId = requestAnimationFrame(step)

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    ro.disconnect()
    mo.disconnect()
  })
})
</script>

<style scoped>
canvas { width: 100%; height: 100%; display: block; }
</style>