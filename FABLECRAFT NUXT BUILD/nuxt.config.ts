// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Required for Nuxt 3.18+ to ensure future compatibility
  compatibilityDate: '2024-11-01',

  // Enable essential modules for the core stack
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/devtools'  // Fix: DevTools wasn't working due to missing module registration
  ],

  // Icon module configuration
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css',
    collections: ['lucide']
  },

  // Explicitly load the global stylesheet
  css: ['~/assets/css/main.css'],

  // Component auto-import configuration (disable path prefixing for atomic design)
  components: [
    {
      path: '~/components',
      pathPrefix: false, // Disable auto-prefixing for atomic design structure
    },
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }
  },

  // Supabase configuration for authentication redirects
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/', 
        '/login', 
        '/confirm',
        '/supabase-test',
        '/api-test',
        '/devview'
      ], // Exclude public pages from auth redirect
    }
  },

  // Performance optimizations
  nitro: {
    compressPublicAssets: true,
  },
  
  // Experimental optimizations for visual effects
  experimental: {
    payloadExtraction: false // Better for visual effects
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
      ],
      link: [
        // Preconnect to Google Fonts for performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // Load Inter with multiple weights
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap' 
        },
        // Load Playfair Display for serif headings
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap' 
        },
        // Load JetBrains Mono for code blocks
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' 
        }
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
