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