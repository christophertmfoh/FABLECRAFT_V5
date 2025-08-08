export {}
declare module 'vue' {
  export interface GlobalComponents {
    FireflyRise: typeof import('./effects/FireflyRise.vue')['default']
    LazyFireflyRise: typeof import('./effects/FireflyRise.vue')['default']
    FireflyRiseLite: typeof import('./effects/FireflyRiseLite.vue')['default']
    LazyFireflyRiseLite: typeof import('./effects/FireflyRiseLite.vue')['default']
    VignetteOverlay: typeof import('./effects/VignetteOverlay.vue')['default']
    LazyVignetteOverlay: typeof import('./effects/VignetteOverlay.vue')['default']
    GradientNoiseBackdrop: typeof import('./effects/GradientNoiseBackdrop.vue')['default']
    LazyGradientNoiseBackdrop: typeof import('./effects/GradientNoiseBackdrop.vue')['default']
    AmbientOrbs: typeof import('./effects/AmbientOrbs.vue')['default']
    LazyAmbientOrbs: typeof import('./effects/AmbientOrbs.vue')['default']
  }
}