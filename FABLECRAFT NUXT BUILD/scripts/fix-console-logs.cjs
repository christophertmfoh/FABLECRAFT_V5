#!/usr/bin/env node

/**
 * Script to replace console.* statements with our logger utility
 * Run with: node scripts/fix-console-logs.js
 */

const fs = require('fs')
const path = require('path')
const { glob } = require('glob')

// Directories to process
const INCLUDE_PATTERNS = [
  'components/**/*.{vue,ts,js}',
  'pages/**/*.{vue,ts,js}',
  'composables/**/*.{ts,js}',
  'utils/**/*.{ts,js}',
  'plugins/**/*.{ts,js}',
  'middleware/**/*.{ts,js}',
]

// Directories to exclude
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/.nuxt/**',
  '**/.output/**',
  '**/dist/**',
  '**/utils/logger.ts', // Don't modify the logger itself
]

async function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false

    // Check if file already imports logger
    const hasLoggerImport =
      content.includes('import { logger }') || content.includes('import { devLog }')

    // Replace console.log statements
    if (content.includes('console.log')) {
      content = content.replace(/console\.log/g, 'logger.log')
      modified = true
    }

    // Replace console.error statements (but keep them as errors)
    if (content.includes('console.error')) {
      content = content.replace(/console\.error/g, 'logger.error')
      modified = true
    }

    // Replace console.warn statements
    if (content.includes('console.warn')) {
      content = content.replace(/console\.warn/g, 'logger.warn')
      modified = true
    }

    // Replace console.debug statements
    if (content.includes('console.debug')) {
      content = content.replace(/console\.debug/g, 'logger.debug')
      modified = true
    }

    // Add import if we modified the file and it doesn't have it
    if (modified && !hasLoggerImport) {
      // For Vue files, add import in script section
      if (filePath.endsWith('.vue')) {
        // Check if there's a script setup
        if (content.includes('<script setup')) {
          content = content.replace(
            /<script setup([^>]*)>/,
            "<script setup$1>\nimport { logger } from '~/utils/logger'\n"
          )
        } else if (content.includes('<script>')) {
          content = content.replace(
            /<script>/,
            "<script>\nimport { logger } from '~/utils/logger'\n"
          )
        }
      } else {
        // For TS/JS files, add import at the top
        content = `import { logger } from '~/utils/logger'\n\n${content}`
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ Fixed: ${filePath}`)
      return 1
    }

    return 0
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message)
    return 0
  }
}

async function main() {
  console.log('🔍 Searching for console.* statements...\n')

  let totalFixed = 0

  for (const pattern of INCLUDE_PATTERNS) {
    const files = await glob(pattern, { ignore: EXCLUDE_PATTERNS })

    for (const file of files) {
      const fixed = await processFile(file)
      totalFixed += fixed
    }
  }

  console.log(`\n✨ Fixed ${totalFixed} files!`)
  console.log('\n📝 Next steps:')
  console.log('1. Review the changes with: git diff')
  console.log('2. Run ESLint to check: pnpm lint')
  console.log('3. Commit the changes')
}

main().catch(console.error)
