// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Required for Nuxt 3.18+ to ensure future compatibility
  compatibilityDate: '2024-11-01',

  // Enable essential modules for the core stack
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],

  // Explicitly load the global stylesheet
  css: ['~/assets/css/main.css'],

  // Supabase configuration for authentication redirects
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/login', '/confirm'], // Exclude public pages from auth redirect
    }
  },

  // Performance optimizations
  nitro: {
    compressPublicAssets: true,
  },

  // Better error handling - explicit SSR
  ssr: true,
  
  // Add head defaults
  app: {
    head: {
      title: 'Fablecraft',
      meta: [
        { name: 'description', content: 'Modern development foundation for scalable web applications' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  // Build optimizations
  vite: {
    build: {
      target: 'esnext'
    }
  },

  // Enable TypeScript strict mode for code quality
  typescript: {
    strict: true,
    typeCheck: false, // Temporarily disabled due to Vite plugin compatibility
  },

  // Enable Nuxt DevTools for development
  devtools: { enabled: true }
})
