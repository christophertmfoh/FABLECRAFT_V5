// file: tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app.vue',
    './error.vue',
    './pages/**/*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      // Extend Tailwind's spacing with our semantic aliases
      spacing: {
        'micro': '2px',    // --space-micro
        'tiny': '4px',     // --space-tiny  
        'xs': '8px',       // --space-xs
        'sm': '12px',      // --space-sm
        'md': '16px',      // --space-md
        'lg': '20px',      // --space-lg
        'xl': '24px',      // --space-xl
        '2xl': '32px',     // --space-2xl
        '3xl': '40px',     // --space-3xl
        '4xl': '48px',     // --space-4xl
        '5xl': '56px',     // --space-5xl
        '6xl': '64px',     // --space-6xl
      },
      
      // 4px-aligned typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5' }],      // 16px
        'lg': ['1.125rem', { lineHeight: '1.5' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.5' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '1.25' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '1.25' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.25' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],         // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
      },
      
      // Container max-widths aligned to Tailwind breakpoints
      maxWidth: {
        'container-sm': '640px',   
        'container-md': '768px',   
        'container-lg': '1024px',  
        'container-xl': '1280px',  
        'container-2xl': '1536px', 
      },
      
      // Font families for design tokens
      fontFamily: {
        'sans': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        'serif': [
          'Playfair Display', 
          'ui-serif', 
          'Georgia', 
          'Cambria', 
          'Times New Roman', 
          'Times', 
          'serif'
        ],
        'mono': [
          'JetBrains Mono', 
          'ui-monospace', 
          'SFMono-Regular', 
          'Menlo', 
          'Monaco', 
          'Consolas', 
          'Liberation Mono', 
          'Courier New', 
          'monospace'
        ]
      }
    },
  },
  plugins: [],
} satisfies Config