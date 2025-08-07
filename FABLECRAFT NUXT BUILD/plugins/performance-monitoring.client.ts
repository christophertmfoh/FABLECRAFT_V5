// ✅ Phase 6: Main performance monitoring initialization plugin
// Coordinates all performance monitoring tools for comprehensive analysis

export default defineNuxtPlugin(() => {
  if (!process.client || !process.dev) return

  console.log('📊 Phase 6: Initializing comprehensive performance monitoring...')

  /**
   * Initialize all monitoring tools in the correct order
   */
  const initPerformanceMonitoring = () => {
    // 1. Initialize Core Web Vitals monitoring first
    const { initWebVitals } = useWebVitals()
    initWebVitals()

    // 2. Initialize performance dashboard with auto-reporting
    const { initAutoReporting } = usePerformanceDashboard()
    initAutoReporting()

    // 3. Performance budget enforcement is initialized via separate plugin
    // 4. Regression detection is handled by dashboard auto-reporting

    console.log('✅ Phase 6: All performance monitoring tools initialized')
  }

  // Initialize monitoring after a short delay to ensure DOM is ready
  setTimeout(initPerformanceMonitoring, 1000)

  // Add global access to monitoring tools for debugging
  if (process.dev) {
    (window as any).__NUXT_PERFORMANCE__ = {
      webVitals: useWebVitals,
      dashboard: usePerformanceDashboard,
      bundleOptimization: useBundleOptimization,
      networkOptimization: useNetworkOptimization,
      performanceRegression: usePerformanceRegression,
    }

    console.log('🛠️ Phase 6: Debug tools available via window.__NUXT_PERFORMANCE__')
  }
})