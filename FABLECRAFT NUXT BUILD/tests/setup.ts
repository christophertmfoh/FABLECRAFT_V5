import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Global Vue components for testing
config.global.components = {
  Icon: {
    template: '<span class="mock-icon" data-testid="icon"></span>',
    props: ['name', 'size', 'class'],
  },
  NuxtLink: {
    template: '<a><slot /></a>',
    props: ['to', 'href'],
  },
}

// Mock Nuxt composables for testing
vi.mock('#app', () => ({
  useNuxtApp: () => ({
    $router: {
      push: vi.fn(),
    },
  }),
  navigateTo: vi.fn(),
  useRoute: () => ({}),
  useRouter: () => ({
    push: vi.fn(),
  }),
  resolveComponent: vi.fn(() => 'div'),
}))

vi.mock('@nuxtjs/supabase', () => ({
  useSupabaseClient: () => ({
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      signInWithOAuth: vi.fn(),
    },
  }),
  useSupabaseUser: () => ({
    value: null,
  }),
}))

// Mock Vue composition API functions
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    resolveComponent: vi.fn(() => 'div'),
  }
})
