// ✅ Phase 6: Performance regression detection composable
// Automated performance baseline comparison and regression detection

export const usePerformanceRegression = () => {
  const STORAGE_KEY = 'nuxt_performance_baseline'

  /**
   * Store performance baseline for comparison
   */
  const storeBaseline = (metrics: Record<string, number>) => {
    if (!import.meta.client) return
    
    try {
      const baseline = {
        timestamp: Date.now(),
        url: window.location.pathname,
        metrics,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        phases: {
          phase1: 'Font optimization implemented',
          phase2: 'Caching & compression implemented',
          phase3: 'CSS optimization implemented',
          phase4: 'Network optimization implemented',
          phase5: 'Bundle optimization implemented',
          phase6: 'Performance monitoring implemented',
        },
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(baseline))
      console.log('📊 Performance baseline stored:', baseline)
    } catch (error) {
      console.warn('Failed to store performance baseline:', error)
    }
  }

  /**
   * Compare current performance with baseline
   */
  const compareWithBaseline = (currentMetrics: Record<string, number>) => {
    if (!import.meta.client) return null
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null
      
      const baseline = JSON.parse(stored)
      const comparison = {
        improved: [] as string[],
        regressed: [] as string[],
        stable: [] as string[],
        differences: {} as Record<string, { baseline: number; current: number; change: number; changePercent: number }>,
        baselineAge: Date.now() - baseline.timestamp,
      }
      
      Object.entries(currentMetrics).forEach(([metric, current]) => {
        const baselineValue = baseline.metrics[metric]
        if (baselineValue !== undefined) {
          const change = current - baselineValue
          const changePercent = ((change / baselineValue) * 100)
          
          comparison.differences[metric] = {
            baseline: baselineValue,
            current,
            change,
            changePercent,
          }
          
          // Consider >5% change as significant
          if (Math.abs(changePercent) > 5) {
            if (change < 0) {
              comparison.improved.push(metric)
            } else {
              comparison.regressed.push(metric)
            }
          } else {
            comparison.stable.push(metric)
          }
        }
      })
      
      return comparison
    } catch (error) {
      console.warn('Failed to compare with baseline:', error)
      return null
    }
  }

  /**
   * Log regression analysis results
   */
  const logRegressionAnalysis = (comparison: any) => {
    if (!comparison || !import.meta.dev) return
    
    console.group('📈 Performance Regression Analysis')
    
    const ageHours = Math.round(comparison.baselineAge / (1000 * 60 * 60))
    console.log(`📅 Baseline age: ${ageHours} hours`)
    
    if (comparison.improved.length > 0) {
      console.log('✅ Improved metrics:', comparison.improved)
      comparison.improved.forEach(metric => {
        const diff = comparison.differences[metric]
        const improvement = Math.abs(diff.changePercent).toFixed(1)
        console.log(`  ${metric}: ${improvement}% faster`)
      })
    }
    
    if (comparison.regressed.length > 0) {
      console.warn('⚠️ Regressed metrics:', comparison.regressed)
      comparison.regressed.forEach(metric => {
        const diff = comparison.differences[metric]
        const regression = diff.changePercent.toFixed(1)
        console.warn(`  ${metric}: ${regression}% slower`)
      })
    }
    
    if (comparison.stable.length > 0) {
      console.log('➡️ Stable metrics:', comparison.stable)
    }
    
    console.table(comparison.differences)
    console.groupEnd()
  }

  /**
   * Auto-store baseline from current performance
   */
  const autoStoreBaseline = () => {
    if (!import.meta.client) return
    
    setTimeout(() => {
      // Collect navigation timing metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (!navigation) return

      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        connect: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.navigationStart,
        domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      }

      // Add web vitals if available
      const { getWebVitals } = useWebVitals()
      const vitals = getWebVitals()
      if (vitals) {
        Object.assign(metrics, vitals)
      }

      storeBaseline(metrics)
    }, 4000) // Wait for all metrics to be available
  }

  /**
   * Check for performance regressions
   */
  const checkForRegressions = () => {
    if (!import.meta.client || !import.meta.dev) return
    
    setTimeout(() => {
      // Collect current metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (!navigation) return

      const currentMetrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        connect: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.navigationStart,
        domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      }

      // Add web vitals if available
      const { getWebVitals } = useWebVitals()
      const vitals = getWebVitals()
      if (vitals) {
        Object.assign(currentMetrics, vitals)
      }

      // Compare with baseline
      const comparison = compareWithBaseline(currentMetrics)
      if (comparison) {
        logRegressionAnalysis(comparison)
      } else {
        console.log('📊 No performance baseline found - storing current metrics as baseline')
        storeBaseline(currentMetrics)
      }
    }, 4000) // Wait for all metrics to be available
  }

  /**
   * Clear stored baseline (useful for testing)
   */
  const clearBaseline = () => {
    if (!import.meta.client) return
    
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('📊 Performance baseline cleared')
    } catch (error) {
      console.warn('Failed to clear baseline:', error)
    }
  }

  /**
   * Get stored baseline information
   */
  const getBaselineInfo = () => {
    if (!import.meta.client) return null
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null
      
      const baseline = JSON.parse(stored)
      return {
        timestamp: baseline.timestamp,
        age: Date.now() - baseline.timestamp,
        url: baseline.url,
        metricsCount: Object.keys(baseline.metrics).length,
        phases: baseline.phases,
      }
    } catch (error) {
      return null
    }
  }

  return {
    storeBaseline,
    compareWithBaseline,
    logRegressionAnalysis,
    autoStoreBaseline,
    checkForRegressions,
    clearBaseline,
    getBaselineInfo,
  }
}