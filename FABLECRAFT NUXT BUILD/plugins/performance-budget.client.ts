// ✅ Phase 6: Performance budget enforcement plugin
// Automated performance budget checking to prevent regressions

export default defineNuxtPlugin(() => {
  if (!import.meta.client || !import.meta.dev) return

  const performanceBudget = {
    // Core Web Vitals budgets
    lcp: 2500,    // Largest Contentful Paint (ms)
    fid: 100,     // First Input Delay (ms) 
    cls: 0.1,     // Cumulative Layout Shift
    fcp: 1800,    // First Contentful Paint (ms)
    ttfb: 800,    // Time to First Byte (ms)
    inp: 200,     // Interaction to Next Paint (ms)
    
    // Resource budgets
    totalSize: 1000,    // Total page size (KB)
    jsSize: 300,        // JavaScript size (KB)
    cssSize: 100,       // CSS size (KB)
    imageSize: 500,     // Image size (KB)
    
    // Timing budgets
    domReady: 2000,     // DOM ready time (ms)
    loadComplete: 3000, // Load complete time (ms)
  }

  /**
   * Check if performance meets budget requirements
   */
  const checkPerformanceBudget = () => {
    // Use the existing monitoring composables
    const { analyzeVendorChunking } = useBundleOptimization()
    const { getWebVitals } = useWebVitals()
    
    setTimeout(() => {
      const results = {
        passed: 0,
        failed: 0,
        warnings: [] as string[],
        errors: [] as string[],
      }

      // Check resource timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        // DOM ready check
        const domReady = navigation.domContentLoadedEventEnd - navigation.startTime
        if (domReady > performanceBudget.domReady) {
          results.errors.push(`DOM ready time: ${Math.round(domReady)}ms exceeds budget of ${performanceBudget.domReady}ms`)
          results.failed++
        } else {
          results.passed++
        }

        // Load complete check
        const loadComplete = navigation.loadEventEnd - navigation.startTime
        if (loadComplete > performanceBudget.loadComplete) {
          results.errors.push(`Load complete time: ${Math.round(loadComplete)}ms exceeds budget of ${performanceBudget.loadComplete}ms`)
          results.failed++
        } else {
          results.passed++
        }
      }

      // Check bundle size (from Phase 5 tools)
      const bundleAnalysis = analyzeVendorChunking()
      if (bundleAnalysis && bundleAnalysis.totalSizeKB > performanceBudget.totalSize) {
        results.errors.push(`Total bundle size: ${bundleAnalysis.totalSizeKB}KB exceeds budget of ${performanceBudget.totalSize}KB`)
        results.failed++
      } else if (bundleAnalysis) {
        results.passed++
      }

      // Check Core Web Vitals (if available)
      const vitals = getWebVitals()
      if (vitals) {
        // Check LCP budget
        if (vitals.lcp > 0 && vitals.lcp > performanceBudget.lcp) {
          results.errors.push(`LCP: ${vitals.lcp.toFixed(0)}ms exceeds budget of ${performanceBudget.lcp}ms`)
          results.failed++
        } else if (vitals.lcp > 0) {
          results.passed++
        }

        // Check FCP budget
        if (vitals.fcp > 0 && vitals.fcp > performanceBudget.fcp) {
          results.errors.push(`FCP: ${vitals.fcp.toFixed(0)}ms exceeds budget of ${performanceBudget.fcp}ms`)
          results.failed++
        } else if (vitals.fcp > 0) {
          results.passed++
        }

        // Check CLS budget
        if (vitals.cls > 0 && vitals.cls > performanceBudget.cls) {
          results.errors.push(`CLS: ${vitals.cls.toFixed(3)} exceeds budget of ${performanceBudget.cls}`)
          results.failed++
        } else if (vitals.cls >= 0) {
          results.passed++
        }

        // Check INP budget
        if (vitals.inp > 0 && vitals.inp > performanceBudget.inp) {
          results.warnings.push(`INP: ${vitals.inp.toFixed(0)}ms exceeds budget of ${performanceBudget.inp}ms`)
        }
      }

      // Check resource sizes
      const resources = performance.getEntriesByType('resource')
      let totalSize = 0
      let jsSize = 0
      let cssSize = 0
      let imageSize = 0

      resources.forEach(resource => {
        const size = resource.transferSize || 0
        totalSize += size
        
        const name = resource.name.toLowerCase()
        if (name.includes('.js')) {
          jsSize += size
        } else if (name.includes('.css')) {
          cssSize += size
        } else if (/\.(jpg|jpeg|png|gif|webp|svg|ico)/.test(name)) {
          imageSize += size
        }
      })

      // Convert to KB and check budgets
      const totalSizeKB = Math.round(totalSize / 1024)
      const jsSizeKB = Math.round(jsSize / 1024)
      const cssSizeKB = Math.round(cssSize / 1024)
      const imageSizeKB = Math.round(imageSize / 1024)

      if (jsSizeKB > performanceBudget.jsSize) {
        results.warnings.push(`JavaScript size: ${jsSizeKB}KB exceeds budget of ${performanceBudget.jsSize}KB`)
      }

      if (cssSizeKB > performanceBudget.cssSize) {
        results.warnings.push(`CSS size: ${cssSizeKB}KB exceeds budget of ${performanceBudget.cssSize}KB`)
      }

      if (imageSizeKB > performanceBudget.imageSize) {
        results.warnings.push(`Image size: ${imageSizeKB}KB exceeds budget of ${performanceBudget.imageSize}KB`)
      }

      // Log budget results
      if (results.errors.length > 0 || results.warnings.length > 0) {
        console.group('💰 Performance Budget Report')
        console.log(`✅ Passed: ${results.passed} checks`)
        console.log(`❌ Failed: ${results.failed} checks`)
        
        if (results.errors.length > 0) {
          console.error('🚨 Budget Violations:', results.errors)
        }
        
        if (results.warnings.length > 0) {
          console.warn('⚠️ Budget Warnings:', results.warnings)
        }
        
        // Show resource breakdown
        console.log('📊 Resource Breakdown:', {
          total: `${totalSizeKB}KB`,
          javascript: `${jsSizeKB}KB`,
          css: `${cssSizeKB}KB`,
          images: `${imageSizeKB}KB`,
        })
        
        console.groupEnd()
      } else {
        console.log('💰 ✅ All performance budgets met!')
      }
    }, 3000) // Allow time for full page load and web vitals
  }

  /**
   * Initialize budget checking
   */
  const initBudgetMonitoring = () => {
    // Initial check after page load
    checkPerformanceBudget()
    
    // Re-check on route changes
    const router = useRouter()
    router.afterEach(() => {
      setTimeout(checkPerformanceBudget, 3000)
    })
  }

  // Initialize budget monitoring
  initBudgetMonitoring()
})