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
    // Add SSR error handling for Nuxt 3.18
    experimental: {
      wasm: true
    }
  },

  // Better error handling - explicit SSR with 3.18 fixes
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

  // Build optimizations for 3.18 compatibility
  vite: {
    build: {
      target: 'esnext'
    },
    // Add SSR-specific optimizations
    ssr: {
      noExternal: ['@nuxtjs/supabase']
    }
  },

  // Enable TypeScript strict mode for code quality
  typescript: {
    strict: true,
    typeCheck: false, // Temporarily disabled due to Vite plugin compatibility
  },

  // Enhanced error handling for 3.18
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true
  },

  // Enable Nuxt DevTools for development
  devtools: { enabled: true }
})
