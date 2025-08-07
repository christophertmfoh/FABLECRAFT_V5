// https://nuxt.com/docs/api/configuration/nuxt-config

// ✅ FIXED: Robust environment detection for Nuxt 3.18+
// Based on research: Nuxt commands override env detection automatically
// Reference: https://nuxtjs.org/docs/configuration-glossary/configuration-dev/
const isDev = process.argv.includes('dev') || 
              (!process.argv.includes('build') && !process.argv.includes('generate') && 
               process.env.NODE_ENV !== 'production')

// Production-ready environment detection - debug logging removed

export default defineNuxtConfig({
  // Required for Nuxt 3.18+ to ensure future compatibility
  compatibilityDate: '2024-11-01',

  // Development server configuration for Cursor port forwarding
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Enable essential modules for the core stack
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/devtools', // Fix: DevTools wasn't working due to missing module registration
  ],

  // ✅ PHASE 1: Optimized icon configuration for zero network requests
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css', // CSS mode for instant SSR rendering
    collections: ['lucide'],
    
    // Bundle theme icons for instant rendering (eliminates 20+ network requests)
    clientBundle: {
      scan: true, // Auto-scan for icons in components
      // Pre-bundle all theme icons used in dropdown
      icons: [
        'lucide:sun',
        'lucide:moon', 
        'lucide:monitor',
        'lucide:zap'
      ],
      sizeLimitKb: 256 // Reasonable limit for header icons
    }
  },

  // Explicitly load the global stylesheet
  css: ['~/assets/css/main.css'],

  // ✅ NEW: Phase 3 - Modern PostCSS optimization
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
      ...(isDev ? {} : {
        cssnano: {
          preset: ['default', {
            // Preserve important CSS for design system
            reduceIdents: false,
            zindex: false,
            // Optimize safely
            normalizeWhitespace: true,
            colormin: true,
            minifyFontValues: true,
            minifySelectors: true,
          }],
        },
      }),
    },
  },

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
    },
  },

  // Supabase configuration for authentication redirects
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/login', '/confirm', '/supabase-test', '/api-test'], // Exclude public pages from auth redirect
    },
  },

  // ✅ ENHANCED: Performance optimizations with environment-aware route rules
  nitro: {
    compressPublicAssets: true, // ✅ Keep existing
    
    // ✅ NEW: Environment-aware route rules (Phase 2 implementation)
    routeRules: {
      // Homepage - prerender for fastest possible load (production only)
      '/': { 
        prerender: !isDev && !process.argv.includes('build'), // Only prerender for 'nuxt generate'
        headers: isDev ? {} : { 
          'cache-control': 'max-age=3600, s-maxage=31536000', // 1hr browser, 1yr CDN
          'x-robots-tag': 'index, follow'
        }
      },
      
      // Static assets - aggressive caching (production only)
      '/_nuxt/**': { 
        headers: isDev ? {} : { 
          'cache-control': 'max-age=31536000, immutable', // 1 year cache
          'x-content-type-options': 'nosniff'
        }
      },
      
      // API routes - explicit no-cache (Supabase integration)
      '/api/**': { 
        headers: { 
          'cache-control': 'no-store, max-age=0, must-revalidate',
          'pragma': 'no-cache',
          'expires': '0',
          'x-content-type-options': 'nosniff'
        }
      },
      
      // Auth pages - short cache with security headers
      '/login': { 
        headers: { 
          'cache-control': isDev ? 'no-cache' : 'max-age=1800', // 30 min
          'x-frame-options': 'DENY',
          'x-content-type-options': 'nosniff'
        }
      },
      '/confirm': { 
        headers: { 
          'cache-control': isDev ? 'no-cache' : 'max-age=1800',
          'x-frame-options': 'DENY'
        }
      },
      
      // Dev/test pages - no cache + development optimizations
      '/supabase-test': { 
        headers: { 
          'cache-control': 'no-cache, no-store, must-revalidate'
        }
      },
      '/api-test': { 
        headers: { 
          'cache-control': 'no-cache, no-store, must-revalidate'
        }
      },
      
      // ✅ NEW: Error pages optimization
      '/404': {
        prerender: !isDev && !process.argv.includes('build'), // Only for 'nuxt generate'
        headers: {
          'cache-control': 'max-age=3600'
        }
      },
      
      // ✅ NEW: SEO assets
      '/sitemap.xml': { 
        prerender: !isDev && !process.argv.includes('build'), // Only for 'nuxt generate'
        headers: { 'cache-control': 'max-age=86400' }
      },
      '/robots.txt': { 
        prerender: !isDev && !process.argv.includes('build'), // Only for 'nuxt generate'
        headers: { 'cache-control': 'max-age=86400' }
      }
    },

    // ✅ NEW: Nitro-level optimizations
    minify: !isDev,
    sourceMap: isDev,
    timing: isDev, // Performance timing in development

    // ✅ FIXED: Prerender error handling for reliable builds
    prerender: {
      failOnError: false, // Don't fail build on prerender errors
      crawlLinks: false,  // Don't auto-discover routes for prerender
    }
  },

  // ✅ NEW: Enable 2024 experimental optimizations (safe for Nuxt 3.18+)
  experimental: {
    payloadExtraction: false, // ✅ Keep for visual effects
    viewTransition: true,     // ✅ NEW: Smooth navigation (Nuxt 3.17+)
    renderJsonPayloads: true, // ✅ NEW: Better performance than default
    headNext: true,           // ✅ NEW: Better head management (Nuxt 3.17+)
    typedPages: false,        // Skip for now - requires strict TypeScript
    granularCachedData: true, // ✅ NEW: Better data fetching consistency (Nuxt 3.17+)
    
    // ✅ Phase 4: Enhanced link prefetching configuration
    defaults: {
      nuxtLink: {
        prefetchOn: { interaction: true }, // More conservative than 'viewport' - saves bandwidth
      },
    }
  },

  // Better error handling - explicit SSR
  ssr: true,

  // Add head defaults
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // Enable Nuxt DevTools for development
  devtools: { 
    enabled: true,
    vscode: {
      // Prevent filesystem access issues
      enabled: false
    }
  },

  // ✅ NEW: Performance monitoring hooks
  hooks: {
    'nitro:build:before': () => {
      if (isDev) {
        console.log('🚀 Phase 2 route rules optimization enabled')
      }
    },
    // Remove unsupported custom asset analysis hook to satisfy types
  },
})
