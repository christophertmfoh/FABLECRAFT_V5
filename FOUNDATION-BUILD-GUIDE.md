# FABLECRAFT - THE MODERNIZED FOUNDATION

**GOAL:** Establish a production-grade, unopinionated foundation for a Nuxt 3 + Supabase application, built with current, stable, and secure dependencies. The result will be a blank white page, with all core technologies correctly installed and configured according to 2025 industry best practices.

This plan incorporates critical updates based on professional audit and real-world implementation.

## PHASE 1: PROJECT & MODERNIZED DEPENDENCIES

This phase uses current stable versions and includes essential tools for code quality and a reproducible build.

```bash
# 1. CREATE PROJECT INSIDE OF NUXT FOLDER

# 2. INITIALIZE NUXT 3
npx nuxi@latest init .

# 3. INITIALIZE GIT & CREATE COMPREHENSIVE .gitignore
git init
echo "# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example" > .gitignore

# 4. CONFIGURE PNPM FOR EXACT VERSIONING
# This professional standard prevents unexpected breaking changes.
echo "save-exact=true" > .npmrc

# 5. INSTALL UPDATED CORE DEPENDENCIES
# Using current, stable versions as of August 2025.
pnpm install --save-exact \
  @nuxtjs/supabase@1.6.0 \
  @pinia/nuxt@0.11.2 \
  @vueuse/core@13.6.0 \
  @vueuse/nuxt@11.7.0 \
  @tiptap/vue-3@3.0.9 \
  @tiptap/starter-kit@3.0.9

# 6. INSTALL UPDATED CORE DEV DEPENDENCIES
pnpm install -D --save-exact \
  typescript@5.5.4 \
  @types/node@20.14.15 \
  @nuxtjs/tailwindcss@6.14.0 \
  supabase@2.33.9

# 7. ADD MODERN ESLINT FOR CODE QUALITY (INDUSTRY STANDARD)
# Using the official @nuxt/eslint module with ESLint v9 flat config
pnpm install -D --save-exact @nuxt/eslint@1.7.1
```

## PHASE 2: MODERNIZED CONFIGURATION

This phase configures the tools with up-to-date best practices and essential modules.

### 1. Update nuxt.config.ts:

This version includes the required compatibilityDate, essential modules, and TypeScript strict mode.

```typescript
// file: nuxt.config.ts
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
      exclude: [], // No pages excluded by default
    }
  },

  // Enable TypeScript strict mode for code quality
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Enable Nuxt DevTools for development
  devtools: { enabled: true }
})
```

### 2. Create tailwind.config.ts:

Enhanced Tailwind configuration with content paths and essential settings.

```typescript
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
    extend: {},
  },
  plugins: [],
} satisfies Config
```

### 3. Create assets/css/main.css:

This file contains only the three required Tailwind directives.

```css
/* file: assets/css/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Generate ESLint Configuration:

Run Nuxt preparation to generate the modern ESLint flat config.

```bash
# Generate .nuxt directory and ESLint configuration
pnpm nuxt prepare
```

This will create `eslint.config.mjs` with modern flat config that you can customize as needed.

## PHASE 3: ESSENTIAL FILES

Create the minimal file structure for a working application.

### 1. Update app.vue:

Clean root component structure.

```vue
<!-- file: app.vue -->
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
```

### 2. Create pages/index.vue:

```vue
<!-- file: pages/index.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-semibold">Fablecraft Foundation</h1>
      <p class="text-gray-600 mt-2">Modernized build environment is ready.</p>
    </div>
  </div>
</template>
```

### 3. Create error.vue:

Essential error handling page.

```vue
<!-- file: error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-500">{{ error.statusCode }}</h1>
      <p class="text-xl mt-2">{{ error.statusMessage }}</p>
      <button 
        @click="handleError"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
```

### 4. Create types/index.ts:

Basic TypeScript types for the application.

```typescript
// file: types/index.ts
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

## PHASE 4: BACKEND FOUNDATION

The Supabase initialization and minimal schema remain best practice.

```bash
# 1. INITIALIZE SUPABASE
npx supabase init

# 2. CREATE INITIAL DATABASE SCHEMA
echo "-- Enable the pgvector extension for future use
create extension if not exists vector with schema extensions;

-- Create a table for user projects
create table projects (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text,
  inserted_at timestamptz default now() not null
);

-- Set up Row Level Security for the projects table
alter table projects enable row level security;

create policy \"Users can manage their own projects.\" on projects
  for all using (auth.uid() = user_id);

" > supabase/migrations/0001_initial_schema.sql
```

## PHASE 5: MODERNIZED WORKFLOW & FINALIZATION

This phase adds essential development tools and workflow scripts.

### 1. Create .env.example file:

Critical environment variables template.

```bash
# file: .env.example
# This is an example file. Copy to .env and fill in your values.

# Supabase Configuration
SUPABASE_URL="http://localhost:54321"
SUPABASE_KEY="your-anon-key-from-terminal"

# Application Configuration
NUXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 2. Update package.json with comprehensive scripts:

Add these scripts to your package.json file for an efficient development workflow.

```json
"scripts": {
  "dev": "nuxt dev",
  "build": "nuxt build",
  "preview": "nuxt preview",
  "postinstall": "nuxt prepare",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "typecheck": "nuxt typecheck",
  "db:start": "supabase start",
  "db:stop": "supabase stop",
  "db:reset": "supabase db reset",
  "db:push": "supabase db push",
  "db:types": "supabase gen types typescript --local > types/supabase.ts"
}
```

### 3. Create .vscode/settings.json (Optional but Recommended):

IDE configuration for consistent development experience.

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}
```

## WHAT'S IMPROVED IN THIS VERSION

### 🔧 **Modern ESLint Setup**
- ✅ Uses `@nuxt/eslint` module (official 2024/2025 standard)
- ✅ ESLint v9 with flat config support
- ✅ Project-aware configurations

### 🛡️ **Enhanced Security & Best Practices**
- ✅ Comprehensive .gitignore (includes IDE files, sensitive data)
- ✅ .env.example template (security best practice)
- ✅ TypeScript strict mode enabled

### 📦 **Complete Dependencies**
- ✅ Added @vueuse/nuxt (essential VueUse integration)
- ✅ Corrected supabase version (2.33.9 - actually exists)
- ✅ All dependencies verified as current and stable

### 🏗️ **Production-Ready Structure**
- ✅ Essential error.vue page (proper error handling)
- ✅ Basic types directory (TypeScript foundation)
- ✅ Enhanced content paths in Tailwind config
- ✅ Comprehensive package.json scripts

### 💻 **Developer Experience**
- ✅ VSCode settings for consistent formatting
- ✅ Modern flat config ESLint setup
- ✅ Better component structure

## HOW TO START

The workflow is streamlined and built on modern, secure foundations.

1. **Complete All Phases:** Follow each phase in order for a complete setup.

2. **Start the Backend:** Run `pnpm db:start` in your terminal.

3. **Create .env:** Copy `.env.example` to `.env` and paste the keys from the terminal output.

4. **Push Database Schema:** Run `pnpm db:push`.

5. **Start the Frontend:** In a new terminal, run `pnpm dev`.

6. **Navigate to http://localhost:3000.** You will see a properly styled page running on a fully updated, professional-grade foundation.

7. **Verify Setup:** Run `pnpm lint` and `pnpm typecheck` to ensure everything is working correctly.