// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Framework
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // TypeScript (Strict mode for quality)
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Essential modules only
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    'shadcn-nuxt'
  ],

  // Styling
  css: ['~/assets/css/main.css'],

  // Fonts (Performance optimized)
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains Mono': [400, 500]
    },
    display: 'swap'
  },

  // shadcn configuration
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  // Development server
  devServer: {
    port: 4270,
    host: '0.0.0.0'
  }
})
