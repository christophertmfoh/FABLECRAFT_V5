// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['dist', 'node_modules', '.nuxt', '.output', 'build'],
    rules: {
      // Console warnings
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': 'error',
      
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      
      // Import rules
      'import/no-unresolved': 'off',
      
      // General rules
      'no-unused-vars': 'off',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  {
    files: ['utils/logger.ts'],
    rules: {
      'no-console': 'off', // Logger is meant to use console
    },
  },
)
