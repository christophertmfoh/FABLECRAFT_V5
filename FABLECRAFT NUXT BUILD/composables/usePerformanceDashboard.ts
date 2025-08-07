// ✅ Phase 6: Unified performance monitoring dashboard
// Comprehensive performance analysis integrating all monitoring tools

export const usePerformanceDashboard = () => {
  /**
   * Collect comprehensive performance metrics
   */
  const collectPerformanceMetrics = async () => {
    if (!import.meta.client) return null

    const metrics = {
      timestamp: Date.now(),
      url: window.location.pathname,
      
      // Core Web Vitals (from useWebVitals)
      vitals: {
        cls: 0,
        fid: 0,
        fcp: 0,
        lcp: 0,
        ttfb: 0,
        inp: 0,
      },
      
      // Navigation timing
      navigation: {} as Record<string, number>,
      
      // Resource metrics
      resources: {
        totalSize: 0,
        jsSize: 0,
        cssSize: 0,
        imageSize: 0,
        requestCount: 0,
      },
      
      // Device/network info
      device: {
        memory: (navigator as any).deviceMemory || 'unknown',
        cores: navigator.hardwareConcurrency || 'unknown',
        connection: (navigator as any).connection?.effectiveType || 'unknown',
      },
    }

    // Populate Core Web Vitals
    const { getWebVitals } = useWebVitals()
    const vitals = getWebVitals()
    if (vitals) {
      metrics.vitals = vitals
    }

    // Populate navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      metrics.navigation = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        connect: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.startTime,
        domReady: navigation.domContentLoadedEventEnd - navigation.startTime,
        loadComplete: navigation.loadEventEnd - navigation.startTime,
      }
    }

    // Populate resource metrics
    const resources = performance.getEntriesByType('resource')
    resources.forEach(resource => {
      metrics.resources.totalSize += resource.transferSize || 0
      metrics.resources.requestCount++
      
      const name = resource.name.toLowerCase()
      if (name.includes('.js')) {
        metrics.resources.jsSize += resource.transferSize || 0
      } else if (name.includes('.css')) {
        metrics.resources.cssSize += resource.transferSize || 0
      } else if (/\.(jpg|jpeg|png|gif|webp|svg|ico)/.test(name)) {
        metrics.resources.imageSize += resource.transferSize || 0
      }
    })

    return metrics
  }

  /**
   * Generate comprehensive performance report
   */
  const generatePerformanceReport = async () => {
    if (!import.meta.dev) return

    console.group('📊 Phase 6: Comprehensive Performance Dashboard')
    console.log('🕐 Report generated at:', new Date().toLocaleTimeString())
    
    try {
      // Collect all metrics
      const metrics = await collectPerformanceMetrics()
      if (!metrics) return

      // Phase 1-5 Integration: Use existing monitoring tools
      const { analyzeVendorChunking, compareWithExpectations } = useBundleOptimization()
      const { validateResourceHints, diagnoseNetworkPerformance } = useNetworkOptimization()
      const { checkForRegressions, getBaselineInfo } = usePerformanceRegression()
      const { generateVitalsReport } = useWebVitals()

      // 1. Core Web Vitals Summary
      console.log('📊 Core Web Vitals:')
      generateVitalsReport()

      // 2. Navigation Timing Analysis
      console.log('⏱️ Navigation Timing (ms):', {
        DNS: metrics.navigation.dns?.toFixed(0) || 'N/A',
        Connect: metrics.navigation.connect?.toFixed(0) || 'N/A',
        Request: metrics.navigation.request?.toFixed(0) || 'N/A',
        Response: metrics.navigation.response?.toFixed(0) || 'N/A',
        DOM: metrics.navigation.dom?.toFixed(0) || 'N/A',
        Load: metrics.navigation.load?.toFixed(0) || 'N/A',
        Total: metrics.navigation.total?.toFixed(0) || 'N/A',
      })

      // 3. Resource Analysis
      const resourceSummary = {
        total: `${Math.round(metrics.resources.totalSize / 1024)}KB`,
        javascript: `${Math.round(metrics.resources.jsSize / 1024)}KB`,
        css: `${Math.round(metrics.resources.cssSize / 1024)}KB`,
        images: `${Math.round(metrics.resources.imageSize / 1024)}KB`,
        requests: metrics.resources.requestCount,
      }
      console.log('📦 Resource Analysis:', resourceSummary)

      // 4. Phase 5 Bundle Analysis
      const bundleAnalysis = analyzeVendorChunking()
      if (bundleAnalysis) {
        console.log('🏭 Bundle Analysis:', {
          chunks: bundleAnalysis.vendorChunkCount,
          size: `${bundleAnalysis.totalSizeKB}KB`,
          efficiency: bundleAnalysis.chunkingEfficiency,
        })
      }

      // 5. Phase 4 Network Analysis
      const networkInfo = await diagnoseNetworkPerformance()
      if (networkInfo) {
        console.log('🌐 Network Info:', networkInfo)
      }

      // 6. Resource hints validation (Phase 4)
      const hints = validateResourceHints()
      console.log('💡 Resource Hints:', {
        dnsPrefetch: hints.dnsPrefetch?.length || 0,
        preconnect: hints.preconnect?.length || 0,
        preload: hints.preload?.length || 0,
      })

      // 7. Device & Environment Info
      console.log('💻 Device Info:', metrics.device)

      // 8. Phase expectations comparison
      const expectations = compareWithExpectations()
      if (expectations) {
        console.log('🎯 Phase Implementation Status:', expectations.status)
      }

      // 9. Baseline comparison info
      const baselineInfo = getBaselineInfo()
      if (baselineInfo) {
        const ageHours = Math.round(baselineInfo.age / (1000 * 60 * 60))
        console.log('📈 Performance Baseline:', {
          age: `${ageHours} hours`,
          metrics: baselineInfo.metricsCount,
          phases: Object.keys(baselineInfo.phases).length,
        })
      }

      // 10. Performance Score Summary
      const performanceScore = calculatePerformanceScore(metrics)
      console.log('🏆 Performance Score:', performanceScore)

      console.log('✅ Comprehensive performance dashboard complete')
      
    } catch (error) {
      console.error('❌ Dashboard generation failed:', error)
    }
    
    console.groupEnd()
  }

  /**
   * Calculate overall performance score
   */
  const calculatePerformanceScore = (metrics: any) => {
    let score = 100
    const details = []

    // Web Vitals scoring
    if (metrics.vitals.lcp > 2500) {
      score -= 20
      details.push('LCP slow')
    } else if (metrics.vitals.lcp > 1800) {
      score -= 10
      details.push('LCP needs improvement')
    }

    if (metrics.vitals.fcp > 3000) {
      score -= 15
      details.push('FCP slow')
    } else if (metrics.vitals.fcp > 1800) {
      score -= 7
      details.push('FCP needs improvement')
    }

    if (metrics.vitals.cls > 0.25) {
      score -= 20
      details.push('CLS poor')
    } else if (metrics.vitals.cls > 0.1) {
      score -= 10
      details.push('CLS needs improvement')
    }

    // Resource size scoring
    const totalSizeKB = Math.round(metrics.resources.totalSize / 1024)
    if (totalSizeKB > 1000) {
      score -= 15
      details.push('Large bundle')
    } else if (totalSizeKB > 500) {
      score -= 7
      details.push('Moderate bundle size')
    }

    // Navigation timing scoring
    if (metrics.navigation.total > 3000) {
      score -= 10
      details.push('Slow total load time')
    }

    const rating = score >= 90 ? '🟢 Excellent' :
                  score >= 75 ? '🟡 Good' :
                  score >= 60 ? '🟠 Needs Work' : '🔴 Poor'

    return {
      score: Math.max(0, score),
      rating,
      details: details.length > 0 ? details : ['All metrics good'],
    }
  }

  /**
   * Auto-generate performance reports on route changes
   */
  const initAutoReporting = () => {
    if (!import.meta.client || !import.meta.dev) return

    // Initial report after page load
    setTimeout(generatePerformanceReport, 4000)

    // Reports on route changes
    const router = useRouter()
    router.afterEach(() => {
      setTimeout(generatePerformanceReport, 4000)
    })

    // Initialize regression checking
    const { checkForRegressions } = usePerformanceRegression()
    setTimeout(checkForRegressions, 5000)
  }

  /**
   * Manual performance analysis (for debugging)
   */
  const analyzePerformance = async () => {
    await generatePerformanceReport()
    
    // Additional analysis tools
    const { logBundleReport } = useBundleOptimization()
    const { logNetworkReport } = useNetworkOptimization()
    
    setTimeout(() => {
      logBundleReport()
      logNetworkReport()
    }, 1000)
  }

  /**
   * Export performance data for external analysis
   */
  const exportPerformanceData = async () => {
    if (!import.meta.client) return null

    const metrics = await collectPerformanceMetrics()
    if (!metrics) return null

    const exportData = {
      ...metrics,
      userAgent: navigator.userAgent,
      exportedAt: new Date().toISOString(),
      phases: {
        phase1: 'Font optimization',
        phase2: 'Caching & compression',
        phase3: 'CSS optimization',
        phase4: 'Network optimization',
        phase5: 'Bundle optimization',
        phase6: 'Performance monitoring',
      },
    }

    // In development, log the data
    if (import.meta.dev) {
      console.log('📤 Performance data export:', exportData)
    }

    return exportData
  }

  return {
    collectPerformanceMetrics,
    generatePerformanceReport,
    calculatePerformanceScore,
    initAutoReporting,
    analyzePerformance,
    exportPerformanceData,
  }
}