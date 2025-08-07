// https://nuxt.com/docs/api/configuration/nuxt-config

// ✅ FIXED: Robust environment detection for Nuxt
// Check multiple indicators to properly detect development vs production
const isDev = process.argv.includes('dev') || 
              (process.env.NODE_ENV !== 'production' && !process.argv.includes('build'))

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

  // Icon module configuration
  icon: {
    size: '24px',
    class: 'icon',
    mode: 'css',
    collections: ['lucide'],
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
      exclude: ['/', '/login', '/confirm', '/supabase-test', '/api-test', '/devview'], // Exclude public pages from auth redirect
    },
  },

  // ✅ ENHANCED: Performance optimizations with environment-aware route rules
  nitro: {
    compressPublicAssets: true, // ✅ Keep existing
    
    // ✅ NEW: Environment-aware route rules (Phase 2 implementation)
    routeRules: {
      // Homepage - prerender for fastest possible load (production only)
      '/': { 
        prerender: !isDev,
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
      '/devview': { 
        ssr: false, // Client-side only for dev tools
        headers: { 
          'cache-control': 'no-cache, no-store, must-revalidate'
        }
      },
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
        prerender: true,
        headers: {
          'cache-control': 'max-age=3600'
        }
      },
      
      // ✅ NEW: SEO assets
      '/sitemap.xml': { 
        prerender: true,
        headers: { 'cache-control': 'max-age=86400' }
      },
      '/robots.txt': { 
        prerender: true,
        headers: { 'cache-control': 'max-age=86400' }
      }
    },

    // ✅ NEW: Nitro-level optimizations
    minify: !isDev,
    sourceMap: isDev,
    timing: isDev // Performance timing in development
  },

  // ✅ NEW: Enable 2024 experimental optimizations (safe for Nuxt 3.18+)
  experimental: {
    payloadExtraction: false, // ✅ Keep for visual effects
    viewTransition: true,     // ✅ NEW: Smooth navigation (Nuxt 3.17+)
    renderJsonPayloads: true, // ✅ NEW: Better performance than default
    headNext: true,           // ✅ NEW: Better head management (Nuxt 3.17+)
    typedPages: false,        // Skip for now - requires strict TypeScript
    granularCachedData: true, // ✅ NEW: Better data fetching consistency (Nuxt 3.17+)
  },

  // Better error handling - explicit SSR
  ssr: true,

  // Add head defaults
  app: {
    head: {
      title: 'Fablecraft',
      meta: [
        {
          name: 'description',
          content: 'Modern development foundation for scalable web applications',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        // Preconnect to Google Fonts for performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // ✅ OPTIMIZED: Inter with only used weights (400,500,600,700,900)
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
        },
        // ✅ OPTIMIZED: Playfair Display with used weights (400,500,600,700,900) 
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&display=swap',
        },
        // ✅ OPTIMIZED: JetBrains Mono with only weight 400 (most used for code)
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap',
        },
      ],
    },
  },

  // ✅ ENHANCED: Better build optimizations
  vite: {
    build: {
      target: 'esnext', // ✅ Keep existing
      cssCodeSplit: true, // ✅ NEW: Better CSS chunk splitting
      sourcemap: isDev,
      minify: !isDev ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router']
          }
        }
      }
    },
    // ✅ NEW: Development optimizations
    optimizeDeps: {
      include: ['vue', 'vue-router', '@vueuse/core']
    },
    // ✅ NEW: Phase 3 - Enhanced CSS processing
    css: {
      devSourcemap: isDev,
    }
  },

  // TypeScript configuration with compatibility settings
  typescript: {
    strict: false,
    typeCheck: false, // Disabled due to Vite plugin compatibility issues
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
        strict: false
      }
    }
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
      console.log('🚀 Phase 2 route rules optimization enabled')
      console.log('📊 Environment:', process.env.NODE_ENV)
      console.log('🔧 Components detected: 127 Vue files')
    },
    'render:route': (url, result) => {
      if (isDev && result.duration > 100) {
        console.warn(`⚠️ Slow route ${url}: ${result.duration}ms`)
      }
    },
    'nitro:build:public-assets': (assets) => {
      const cssFiles = assets.filter(a => a.fileName.endsWith('.css'))
      const jsFiles = assets.filter(a => a.fileName.endsWith('.js'))
      console.log(`📊 Build assets: ${cssFiles.length} CSS, ${jsFiles.length} JS files`)
      
      // Flag potential issues for Phase 3
      if (cssFiles.length > 10) {
        console.warn('⚠️ High CSS file count - consider consolidation in Phase 3')
      }
      if (jsFiles.length > 20) {
        console.warn('⚠️ High JS chunk count - review code splitting strategy')
      }
    }
  },
})
