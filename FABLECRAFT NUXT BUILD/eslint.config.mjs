// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  // Prettier config to avoid conflicts
  eslintConfigPrettier,
  
  // Custom rules
  {
    rules: {
      // Console rules - warn in development, error in production
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      
      // Vue specific rules
      'vue/multi-word-component-names': 'off', // Allow single word component names
      'vue/no-v-html': 'warn', // Warn about v-html usage
      
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      
      // Import rules
      'import/no-unresolved': 'off', // Nuxt handles this
      
      // General best practices
      'no-unused-vars': 'off', // Use TypeScript's version instead
      'prefer-const': 'warn',
      'no-var': 'error',
    }
  },
  
  // Ignore patterns
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/OLD_BUILD_REF_ONLY/**',
      '**/FABLECRAFT_OLD_BUILD_REF_ONLY/**'
    ]
  }
)
