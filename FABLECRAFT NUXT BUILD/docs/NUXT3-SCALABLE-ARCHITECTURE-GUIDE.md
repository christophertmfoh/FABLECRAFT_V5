# 🏗️ NUXT 3 SCALABLE ARCHITECTURE GUIDE

## Best Practices for Enterprise-Ready Applications

### 📋 Overview

This guide consolidates the latest best practices for building scalable, maintainable Nuxt 3 applications based on current research and industry standards.

---

## 🎯 CORE PRINCIPLES

### 1. **Atomic Design Architecture**

Following Brad Frost's methodology adapted for Vue/Nuxt:

- **Atoms**: Pure, single-purpose components (buttons, inputs, icons)
- **Molecules**: Simple combinations with minimal logic (search bars, form groups)
- **Organisms**: Self-contained, reusable components (headers, cards, navigation)
- **Templates**: Nuxt layouts defining page structure
- **Pages**: Components handling data and API calls

### 2. **Feature-First Organization**

Structure by domain/feature rather than file type:

```
src/
├── features/           # Domain-specific modules
│   ├── auth/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   └── types/
│   └── landing/
│       ├── components/
│       ├── composables/
│       └── types/
├── shared/            # Cross-feature utilities
│   ├── components/    # Reusable UI components
│   ├── composables/   # Shared logic
│   └── utils/        # Helper functions
```

### 3. **Composition API First**

Leverage Vue 3's Composition API for:

- Better TypeScript integration
- Improved code reusability
- Cleaner component logic
- Enhanced tree-shaking

---

## 🔧 TECHNICAL IMPLEMENTATION

### 1. **Auto-Import Strategy**

Leverage Nuxt 3's auto-import for:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: ['composables', 'composables/*/index.{ts,js,mjs,mts}', 'features/*/composables'],
  },
  components: {
    dirs: ['~/components', '~/features/*/components'],
  },
})
```

### 2. **State Management with Pinia**

Modular store architecture:

```typescript
// features/auth/stores/auth.store.ts
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  // Actions
  async function login(credentials: LoginCredentials) {
    const { data } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
    user.value = data.user
  }

  return {
    user: readonly(user),
    isAuthenticated,
    login,
  }
})
```

### 3. **Type-Safe Component Props**

```vue
<script setup lang="ts">
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
```

### 4. **Composable Patterns**

```typescript
// composables/useAsyncData.ts
export function useAsyncData<T>(key: string, fetcher: () => Promise<T>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function execute() {
    loading.value = true
    error.value = null

    try {
      data.value = await fetcher()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    data: readonly(data),
    error: readonly(error),
    loading: readonly(loading),
    execute,
  }
}
```

---

## 🎨 STYLING ARCHITECTURE

### 1. **CSS Custom Properties for Theming**

```css
/* assets/css/themes.css */
:root {
  --color-primary: 220 90% 56%;
  --color-background: 0 0% 100%;
  --spacing-unit: 0.5rem;
}

[data-theme='dark'] {
  --color-primary: 220 90% 66%;
  --color-background: 222 47% 11%;
}
```

### 2. **Utility-First with Tailwind CSS**

```typescript
// tailwind.config.ts
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './features/**/components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        background: 'hsl(var(--color-background) / <alpha-value>)',
      },
    },
  },
}
```

### 3. **Component-Scoped Styles**

```vue
<style scoped>
/* Use CSS Modules for component-specific styles */
.button {
  @apply inline-flex items-center justify-center;
  @apply rounded-md font-medium;
  @apply transition-all duration-200;
}

.button--primary {
  @apply bg-primary text-white;
  @apply hover:bg-primary/90;
}
</style>
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### 1. **Lazy Loading Routes**

```typescript
// router/routes.ts
export default [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('~/pages/dashboard.vue'),
    meta: { requiresAuth: true },
  },
]
```

### 2. **Component Code Splitting**

```vue
<script setup>
// Lazy load heavy components
const HeavyChart = defineAsyncComponent(() => import('~/components/charts/HeavyChart.vue'))
</script>
```

### 3. **Image Optimization**

```vue
<template>
  <NuxtImg
    src="/hero-image.jpg"
    alt="Hero"
    width="1920"
    height="1080"
    loading="lazy"
    :modifiers="{ quality: 80, format: 'webp' }"
  />
</template>
```

---

## 🧪 TESTING STRATEGY

### 1. **Unit Testing with Vitest**

```typescript
// components/BaseButton.test.ts
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
```

### 2. **Component Testing Structure**

```
components/
├── BaseButton.vue
├── BaseButton.test.ts
└── BaseButton.stories.ts  # Storybook stories
```

---

## 📁 RECOMMENDED PROJECT STRUCTURE

```
nuxt-app/
├── .nuxt/              # Build output
├── assets/             # Uncompiled assets
│   ├── css/
│   ├── fonts/
│   └── images/
├── components/         # Shared components
│   ├── base/          # Atoms
│   ├── ui/            # Molecules
│   └── layout/        # Organisms
├── composables/        # Shared composables
├── features/          # Feature modules
│   ├── auth/
│   ├── dashboard/
│   └── landing/
├── layouts/           # Page layouts
├── middleware/        # Route middleware
├── pages/            # File-based routing
├── plugins/          # Nuxt plugins
├── public/           # Static files
├── server/           # Server routes
│   ├── api/
│   └── middleware/
├── stores/           # Global Pinia stores
├── types/            # TypeScript types
└── utils/            # Utility functions
```

---

## ✅ CHECKLIST FOR SCALABLE ARCHITECTURE

### Foundation

- [ ] TypeScript configuration with strict mode
- [ ] ESLint + Prettier setup
- [ ] Husky for pre-commit hooks
- [ ] Conventional commits

### Architecture

- [ ] Atomic design component structure
- [ ] Feature-based module organization
- [ ] Composable-first logic extraction
- [ ] Type-safe prop definitions

### State Management

- [ ] Pinia stores with TypeScript
- [ ] Modular store architecture
- [ ] Proper state encapsulation
- [ ] Computed getters for derived state

### Performance

- [ ] Route-based code splitting
- [ ] Lazy component loading
- [ ] Image optimization strategy
- [ ] Bundle size monitoring

### Testing

- [ ] Unit tests for utilities
- [ ] Component tests for UI
- [ ] E2E tests for critical paths
- [ ] Visual regression tests

### Developer Experience

- [ ] Auto-imports configured
- [ ] Path aliases set up
- [ ] VS Code workspace settings
- [ ] Documentation standards

---

## 🚨 COMMON PITFALLS TO AVOID

1. **Over-nesting components** - Keep structure flat where possible
2. **Prop drilling** - Use provide/inject or stores for deep data
3. **Large components** - Break down into smaller, focused pieces
4. **Mixing concerns** - Separate logic, presentation, and data
5. **Ignoring TypeScript** - Embrace types for better DX
6. **Global styles** - Prefer scoped or utility classes
7. **Direct DOM manipulation** - Use Vue's reactivity system

---

## 📚 RESOURCES

- [Vue 3 Style Guide](https://vuejs.org/style-guide/)
- [Nuxt 3 Documentation](https://nuxt.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [VueUse Composables](https://vueuse.org)
- [Headless UI Vue](https://headlessui.com/vue)

This guide ensures your Nuxt 3 application remains maintainable, scalable, and performant as it grows.
