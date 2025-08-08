export {}
declare module 'vue' {
  export interface GlobalComponents {
    FireflyRise: typeof import('./effects/FireflyRise.vue')['default']
    LazyFireflyRise: typeof import('./effects/FireflyRise.vue')['default']
  }
}