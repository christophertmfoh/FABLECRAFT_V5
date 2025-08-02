# FABLECRAFT FOUNDATION BUILD - PROFESSIONAL STANDARDS

**GOAL:** Build a clean, professional, industry-standard foundation for a creative writing platform. 
**NO FEATURES YET** - Just a solid base to build upon.

## Research-Based Tech Stack Decisions

### Core Framework: Nuxt 3
**Why:** Vue.js ecosystem leader, SSR/SSG capabilities, TypeScript-first, enterprise adoption
**Industry Standard:** Used by GitLab, Adobe, BMW, Nintendo
**Version:** 3.18+ (stable LTS)

### Database: Supabase 
**Why:** PostgreSQL with real-time features, built-in auth, edge functions
**Industry Standard:** Alternative to Firebase, better for complex apps
**Research:** PostgreSQL most loved database (Stack Overflow 2024)

### Styling: Tailwind CSS v3
**Why:** Utility-first, smaller bundle sizes, design consistency
**Industry Standard:** Used by GitHub, Netflix, Shopify, Discord
**Research:** 78% developer satisfaction (State of CSS 2024)

### State Management: Pinia
**Why:** Official Vue.js store, TypeScript-first, DevTools support
**Industry Standard:** Replaces Vuex, recommended by Vue team
**Research:** Better DX and performance than Vuex

### UI Components: shadcn/ui + Radix Vue
**Why:** Copy-paste components, accessible by default, customizable
**Industry Standard:** Radix primitives used by Vercel, Linear, Framer
**Research:** Accessibility-first approach, WCAG compliant

### Rich Text: Tiptap
**Why:** Headless editor, extensible, Vue-native
**Industry Standard:** Used by GitLab, Substack, TypeForm
**Research:** Better performance than Quill/CKEditor for Vue apps

## PHASE 1: CLEAN FOUNDATION BUILD

### Step 1.1: Project Setup
```bash
# Already have Nuxt 3 base - keeping it
# pnpm already configured - keeping it
```

### Step 1.2: Install Core Dependencies (Research-Based)
```bash
# TypeScript (Industry standard for enterprise apps)
pnpm add -D typescript @types/node

# Essential Nuxt Modules (Most adopted in Vue ecosystem)
pnpm add -D @nuxtjs/tailwindcss@latest    # 2M+ weekly downloads
pnpm add -D @pinia/nuxt@latest           # Official Vue store
pnpm add -D @vueuse/nuxt@latest          # Vue composition utilities
pnpm add -D @nuxtjs/google-fonts@latest # Web font optimization

# Supabase (PostgreSQL + Real-time)
pnpm add @supabase/supabase-js@latest
pnpm add -D @nuxtjs/supabase@latest

# UI Foundation (Accessibility-first)
pnpm add -D shadcn-nuxt@latest
pnpm add radix-vue@latest               # Primitive components
pnpm add lucide-vue-next@latest         # Icon system
pnpm add class-variance-authority@latest # Component variants
pnpm add clsx@latest                    # Conditional classes
pnpm add tailwind-merge@latest          # Tailwind class merging

# Tailwind Plugins (Essential only)
pnpm add -D tailwindcss-animate@latest
pnpm add -D @tailwindcss/typography@latest

# Rich Text Editor (Vue-optimized)
pnpm add @tiptap/vue-3@latest
pnpm add @tiptap/pm@latest
pnpm add @tiptap/starter-kit@latest
```

### Step 1.3: Minimal Project Structure (Industry Standard)
```
fablecraft-app/
├── app.vue                    # Root component
├── nuxt.config.ts            # Framework config
├── tailwind.config.ts        # Styling config
├── assets/css/main.css       # Global styles
├── components/               # Vue components
│   └── ui/                  # shadcn components
├── composables/             # Vue composition functions
├── stores/                  # Pinia stores
├── types/                   # TypeScript definitions
├── pages/                   # Route pages
│   └── index.vue           # Home page (blank)
└── public/                  # Static assets
```

### Step 1.4: Configuration Files (Best Practices)

**nuxt.config.ts** (Minimal, production-ready)
```typescript
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
```

**tailwind.config.ts** (shadcn-compatible)
```typescript
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: [animate, typography]
} satisfies Config
```

**assets/css/main.css** (CSS Variables for theming)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 220.9 39.3% 11%;
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 224 71.4% 4.1%;
    --radius: 0.5rem;
  }
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### Step 1.5: Essential Files

**app.vue** (Clean root)
```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

**pages/index.vue** (Blank starter)
```vue
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-semibold">Fablecraft</h1>
      <p class="text-muted-foreground">Ready to build</p>
    </div>
  </div>
</template>
```

### Step 1.6: TypeScript Setup

**types/index.ts** (Basic types)
```typescript
// Core application types
export interface User {
  id: string
  email: string
  username?: string
}

export interface Project {
  id: string
  title: string
  description?: string
  created_at: string
  updated_at: string
}
```

## Quality Checks

### ✅ Foundation Complete When:
- [ ] All dependencies installed without errors
- [ ] TypeScript strict mode working
- [ ] Tailwind classes applying correctly
- [ ] No console errors in browser
- [ ] Hot reload working
- [ ] shadcn components importable
- [ ] Pinia store accessible
- [ ] Clean, minimal index page loads

### ✅ Industry Standards Met:
- [ ] TypeScript strict mode enabled
- [ ] ESLint configured and passing
- [ ] Proper folder structure
- [ ] No hardcoded values
- [ ] Accessible HTML structure
- [ ] Performance optimized fonts
- [ ] CSS variables for theming

## Development Workflow
```bash
# Start development
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Clean start (if needed)
pnpm clean && pnpm install
```

---

**RESULT:** Clean, professional foundation following industry best practices. Ready for landing page development with proper tooling, structure, and no technical debt.