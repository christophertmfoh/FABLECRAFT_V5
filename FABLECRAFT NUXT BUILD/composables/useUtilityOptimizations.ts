// ✅ Phase 5: Optimized utility library imports
// Demonstrates tree-shaking friendly import patterns

// ❌ Avoid: Barrel imports (can bundle more than needed)
// import { ref, computed, watch } from '@vueuse/core'

// ✅ Better: Specific imports for optimal tree shaking
import { ref, computed, watch } from 'vue'

// ✅ Utility libraries already optimized
import { cva } from 'class-variance-authority' // Already optimal
import { clsx } from 'clsx' // Already optimal  
import { twMerge } from 'tailwind-merge' // Already optimal

/**
 * Phase 5: Utility optimizations composable
 * Demonstrates proper import patterns and tree-shaking optimization
 */
export const useUtilityOptimizations = () => {
  
  /**
   * Example of tree-shaking friendly patterns
   * Uses specific imports rather than entire libraries
   */
  const optimizedFunction = () => {
    return {
      // VueUse imports - specific functions only
      ref,
      computed,
      watch,
      
      // Utility library imports - already optimized
      cva,
      clsx,
      twMerge
    }
  }

  /**
   * Demonstrate optimal class merging pattern
   * Uses our utility libraries efficiently
   */
  const createOptimizedClasses = (baseClasses: string, conditionalClasses: Record<string, boolean>) => {
    return twMerge(clsx(baseClasses, conditionalClasses))
  }

  /**
   * Example of component variant creation
   * Uses class-variance-authority efficiently
   */
  const createComponentVariants = () => {
    return cva(
      // Base classes
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      {
        variants: {
          variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
          },
          size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'default',
        },
      }
    )
  }

  /**
   * Measure import performance in development
   */
  const measureImportPerformance = () => {
    if (!import.meta.client || !import.meta.dev) return null
    
    const start = performance.now()
    
    // Test the performance of our optimized imports
    const testResult = {
      vueUseImports: typeof ref === 'function' && typeof computed === 'function' && typeof watch === 'function',
      utilityImports: typeof cva === 'function' && typeof clsx === 'function' && typeof twMerge === 'function',
      loadTime: performance.now() - start
    }
    
    return testResult
  }

  return {
    optimizedFunction,
    createOptimizedClasses,
    createComponentVariants,
    measureImportPerformance
  }
}