<template>
  <div class="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
    <div ref="containerRef" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
/*
  Reusable Vanta Fog background (theme-reactive).
  - Loads three.js and Vanta Fog from CDN only on client
  - Derives colors from CSS variables to match theme
  - Observes theme changes and reinitializes effect
  - Keeps pointer-events none and fixed positioning behind content

  Based on Vanta.js docs: https://www.vantajs.com/?effect=fog
*/

interface VantaFogProps {
  speed?: number
  zoom?: number
  blurFactor?: number
  mouseControls?: boolean
  touchControls?: boolean
  gyroControls?: boolean
  scale?: number
  scaleMobile?: number
}

const props = withDefaults(defineProps<VantaFogProps>(), {
  speed: 0.3,
  zoom: 0.6,
  blurFactor: 0.52,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  scale: 2,
  scaleMobile: 4,
})

const containerRef = ref<HTMLDivElement | null>(null)
let vantaInstance: any | null = null
let themeObserver: MutationObserver | null = null

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

function parseHslToken(token: string) {
  // token example: "222 47% 11%"
  try {
    const [hRaw, sRaw, lRaw] = token.trim().split(/\s+/)
    const h = parseFloat(hRaw)
    const s = parseFloat(sRaw.replace('%', '')) / 100
    const l = parseFloat(lRaw.replace('%', '')) / 100
    // hsl to rgb
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0
    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0]
    else if (h < 120) [r, g, b] = [x, c, 0]
    else if (h < 180) [r, g, b] = [0, c, x]
    else if (h < 240) [r, g, b] = [0, x, c]
    else if (h < 300) [r, g, b] = [x, 0, c]
    else [r, g, b] = [c, 0, x]
    const R = Math.round((r + m) * 255)
    const G = Math.round((g + m) * 255)
    const B = Math.round((b + m) * 255)
    return { r: R, g: G, b: B }
  } catch {
    return { r: 200, g: 200, b: 200 }
  }
}

function cssVarToRgbInt(varName: string, fallback: { r: number; g: number; b: number }) {
  const styles = getComputedStyle(document.documentElement)
  const token = styles.getPropertyValue(varName)
  if (!token) {
    return (fallback.r << 16) + (fallback.g << 8) + fallback.b
  }
  const { r, g, b } = parseHslToken(token)
  return (r << 16) + (g << 8) + b
}

function getThemeColors() {
  // Map brand tokens to Vanta colors; tweak if desired
  const baseColor = cssVarToRgbInt('--card', { r: 22, g: 22, b: 24 })
  const highlightColor = cssVarToRgbInt('--primary', { r: 0, g: 220, b: 130 })
  const lowlightColor = cssVarToRgbInt('--muted', { r: 80, g: 90, b: 110 })
  const midtoneColor = cssVarToRgbInt('--accent', { r: 80, g: 140, b: 250 })
  return { baseColor, highlightColor, lowlightColor, midtoneColor }
}

function destroyVanta() {
  try { vantaInstance?.destroy?.() } catch {}
  vantaInstance = null
}

async function initVanta() {
  if (!containerRef.value) return
  // Load scripts if needed
  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
  const VANTA_URL = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js'
  await loadScript(THREE_URL)
  await loadScript(VANTA_URL)

  // @ts-ignore
  const VANTA = (window as any)?.VANTA
  // @ts-ignore
  const THREE = (window as any)?.THREE
  if (!VANTA || !THREE || !VANTA.FOG) return

  const { baseColor, highlightColor, lowlightColor, midtoneColor } = getThemeColors()

  destroyVanta()
  vantaInstance = VANTA.FOG({
    el: containerRef.value,
    THREE,
    mouseControls: props.mouseControls,
    touchControls: props.touchControls,
    gyroControls: props.gyroControls,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: props.scale,
    scaleMobile: props.scaleMobile,
    speed: props.speed,
    zoom: props.zoom,
    blurFactor: props.blurFactor,
    baseColor,
    highlightColor,
    lowlightColor,
    midtoneColor,
    backgroundAlpha: 0.0, // keep page bg visible
  })
}

onMounted(() => {
  if (!import.meta.client) return
  initVanta()
  // React to theme changes
  themeObserver = new MutationObserver(() => initVanta())
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onBeforeUnmount(() => {
  destroyVanta()
  themeObserver?.disconnect()
})
</script>