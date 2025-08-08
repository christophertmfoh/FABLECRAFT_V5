export {}
declare module 'vue' {
  export interface GlobalComponents {
    VignetteOverlay: typeof import('./effects/VignetteOverlay.vue')['default']
    LazyVignetteOverlay: typeof import('./effects/VignetteOverlay.vue')['default']
    GradientNoiseBackdrop: typeof import('./effects/GradientNoiseBackdrop.vue')['default']
    LazyGradientNoiseBackdrop: typeof import('./effects/GradientNoiseBackdrop.vue')['default']
    VantaFog: typeof import('./effects/VantaFog.vue')['default']
    LazyVantaFog: typeof import('./effects/VantaFog.vue')['default']
  }
}