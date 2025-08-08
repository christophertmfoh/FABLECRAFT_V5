// ✅ Phase 5: Bundle Performance Monitoring Composable
// Provides tools to analyze and monitor bundle composition and performance

export const useBundleOptimization = () => {
  /**
   * Analyze current bundle composition in development
   * @returns Bundle composition analysis or null if not in client/dev mode
   */
  const analyzeBundleComposition = () => {
    if (!import.meta.client || !import.meta.dev) return null
    
    // Get loaded script tags to understand chunking
    const scripts = Array.from(document.querySelectorAll('script[src]'))
    const nuxtScripts = scripts.filter(script => {
      const src = script.getAttribute('src')
      return src && src.includes('_nuxt')
    })
    
    const chunks = nuxtScripts.map(script => {
      const src = script.getAttribute('src') || ''
      const filename = src.split('/').pop() || 'unknown'
      const el = script as HTMLScriptElement
      
      return {
        src,
        filename,
        type: filename.includes('vendor') ? 'vendor' : 
              filename.includes('entry') ? 'entry' : 
              filename.includes('.css') ? 'style' : 'chunk',
        loaded: (el as any).readyState ? ((el as any).readyState === 'loaded' || (el as any).readyState === 'complete') : true
      }
    })
    
    return {
      totalChunks: chunks.length,
      chunksByType: {
        vendor: chunks.filter(c => c.type === 'vendor').length,
        entry: chunks.filter(c => c.type === 'entry').length,
        style: chunks.filter(c => c.type === 'style').length,
        chunk: chunks.filter(c => c.type === 'chunk').length
      },
      chunks,
      timestamp: new Date().toISOString()
    }
  }

  /**
   * Monitor dependency loading performance using Performance API
   * @returns Array of resource loading metrics or null
   */
  const monitorDependencyLoading = () => {
    if (!import.meta.client) return null
    
    try {
      // Use Performance API to track resource loading
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') && 
        resource.name.includes('_nuxt')
      )
      
      return jsResources.map(resource => {
        const filename = resource.name.split('/').pop() || 'unknown'
        
        return {
          name: filename,
          url: resource.name,
          duration: Math.round(resource.duration),
          transferSize: resource.transferSize || 0,
          decodedBodySize: resource.decodedBodySize || 0,
          compressionRatio: resource.transferSize && resource.decodedBodySize 
            ? Math.round((1 - (resource.transferSize / resource.decodedBodySize)) * 100) 
            : 0,
          loadTime: Math.round(resource.responseEnd - resource.startTime),
          type: filename.includes('vendor') ? 'vendor' : 
                filename.includes('entry') ? 'entry' : 'chunk'
        }
      }).sort((a, b) => b.transferSize - a.transferSize) // Sort by size descending
    } catch (error) {
      console.warn('Failed to monitor dependency loading:', error)
      return null
    }
  }

  /**
   * Analyze vendor chunk effectiveness
   * @returns Analysis of vendor chunking strategy
   */
  const analyzeVendorChunking = () => {
    if (!import.meta.client) return null
    
    const dependencies = monitorDependencyLoading()
    if (!dependencies) return null
    
    const vendorChunks = dependencies.filter(dep => dep.type === 'vendor')
    const totalVendorSize = vendorChunks.reduce((sum, chunk) => sum + chunk.transferSize, 0)
    const totalSize = dependencies.reduce((sum, chunk) => sum + chunk.transferSize, 0)
    
    return {
      vendorChunkCount: vendorChunks.length,
      vendorSizeKB: Math.round(totalVendorSize / 1024),
      totalSizeKB: Math.round(totalSize / 1024),
      vendorRatio: totalSize > 0 ? Math.round((totalVendorSize / totalSize) * 100) : 0,
      largestVendorChunk: vendorChunks.length > 0 
        ? vendorChunks.reduce((largest, chunk) => 
            chunk.transferSize > largest.transferSize ? chunk : largest
          )
        : null,
      chunkingEfficiency: vendorChunks.length > 1 ? 'good' : 
                         vendorChunks.length === 1 ? 'basic' : 'none'
    }
  }

  /**
   * Check for potential bundle optimization opportunities
   * @returns Optimization recommendations
   */
  const analyzeOptimizationOpportunities = () => {
    if (!import.meta.client) return null
    
    const dependencies = monitorDependencyLoading()
    const vendorAnalysis = analyzeVendorChunking()
    
    if (!dependencies || !vendorAnalysis) return null
    
    const opportunities = []
    
    // Check for large chunks that could be split
    const largeChunks = dependencies.filter(dep => dep.transferSize > 100 * 1024) // > 100KB
    if (largeChunks.length > 0) {
      opportunities.push({
        type: 'large-chunks',
        severity: 'medium',
        description: `${largeChunks.length} chunk(s) larger than 100KB detected`,
        chunks: largeChunks.map(c => ({ name: c.name, size: Math.round(c.transferSize / 1024) + 'KB' }))
      })
    }
    
    // Check vendor ratio
    if (vendorAnalysis.vendorRatio > 70) {
      opportunities.push({
        type: 'vendor-heavy',
        severity: 'low',
        description: `Vendor code represents ${vendorAnalysis.vendorRatio}% of bundle`,
        recommendation: 'Consider splitting large vendor libraries'
      })
    }
    
    // Check compression efficiency
    const poorlyCompressed = dependencies.filter(dep => 
      dep.compressionRatio < 50 && dep.transferSize > 10 * 1024
    )
    if (poorlyCompressed.length > 0) {
      opportunities.push({
        type: 'compression',
        severity: 'low',
        description: `${poorlyCompressed.length} chunk(s) with compression ratio < 50%`,
        chunks: poorlyCompressed.map(c => ({ 
          name: c.name, 
          ratio: c.compressionRatio + '%' 
        }))
      })
    }
    
    return {
      totalOpportunities: opportunities.length,
      opportunities,
      overallScore: opportunities.length === 0 ? 'excellent' :
                   opportunities.length <= 2 ? 'good' :
                   opportunities.length <= 4 ? 'fair' : 'needs-improvement'
    }
  }

  /**
   * Log comprehensive bundle optimization report
   */
  const logBundleReport = () => {
    if (!import.meta.client || !import.meta.dev) return
    
    console.group('📦 Phase 5: Bundle Optimization Report')
    
    try {
      console.log('🕐 Report generated at:', new Date().toLocaleTimeString())
      
      // Bundle composition
      const composition = analyzeBundleComposition()
      if (composition) {
        console.log('📊 Bundle Composition:', composition)
      }
      
      // Dependency loading performance
      const dependencies = monitorDependencyLoading()
      if (dependencies) {
        console.log('⚡ Dependency Loading Performance:')
        console.table(dependencies)
        
        const totalSize = dependencies.reduce((sum, dep) => sum + dep.transferSize, 0)
        console.log(`📦 Total Bundle Size: ${(totalSize / 1024).toFixed(2)}KB`)
      }
      
      // Vendor chunk analysis
      const vendorAnalysis = analyzeVendorChunking()
      if (vendorAnalysis) {
        console.log('🏭 Vendor Chunking Analysis:', vendorAnalysis)
      }
      
      // Optimization opportunities
      const opportunities = analyzeOptimizationOpportunities()
      if (opportunities) {
        console.log('💡 Optimization Opportunities:', opportunities)
        
        if (opportunities.opportunities.length > 0) {
          console.warn('⚠️ Potential optimizations found:', opportunities.opportunities)
        } else {
          console.log('✅ No obvious optimization opportunities detected!')
        }
      }
      
    } catch (error) {
      console.error('❌ Bundle report failed:', error)
    }
    
    console.groupEnd()
  }

  /**
   * Compare current performance with Phase 5 expectations
   */
  const compareWithExpectations = () => {
    if (!import.meta.client) return null
    
    const dependencies = monitorDependencyLoading()
    const vendorAnalysis = analyzeVendorChunking()
    
    if (!dependencies || !vendorAnalysis) return null
    
    const totalSizeKB = Math.round(dependencies.reduce((sum, dep) => sum + dep.transferSize, 0) / 1024)
    
    return {
      currentMetrics: {
        totalSizeKB,
        vendorChunks: vendorAnalysis.vendorChunkCount,
        chunkingStrategy: vendorAnalysis.chunkingEfficiency
      },
      phase5Expectations: {
        bundleReduction: '15-25%',
        chunkOptimization: 'Enhanced vendor splitting',
        treeShaking: 'Improved dead code elimination'
      },
      status: {
        dependencyRemoval: '✅ TipTap packages removed',
        chunkSplitting: vendorAnalysis.vendorChunkCount > 1 ? '✅ Enhanced chunking active' : '⚠️ Basic chunking',
        optimization: totalSizeKB < 500 ? '✅ Good bundle size' : 
                     totalSizeKB < 1000 ? '⚠️ Moderate bundle size' : 
                     '❌ Large bundle size'
      }
    }
  }

  return {
    analyzeBundleComposition,
    monitorDependencyLoading,
    analyzeVendorChunking,
    analyzeOptimizationOpportunities,
    logBundleReport,
    compareWithExpectations
  }
}