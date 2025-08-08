export {}
declare module 'vue' {
  export interface GlobalComponents {
    FireflyRise: typeof import('./effects/FireflyRise.vue')['default']
    LazyFireflyRise: typeof import('./effects/FireflyRise.vue')['default']
    FireflyRiseLite: typeof import('./effects/FireflyRiseLite.vue')['default']
    LazyFireflyRiseLite: typeof import('./effects/FireflyRiseLite.vue')['default']
  }
}