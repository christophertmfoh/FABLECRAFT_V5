// ✅ Phase 4: Network Performance Monitoring Composable
// Provides tools to measure and diagnose network performance

export const useNetworkOptimization = () => {
  /**
   * Measure connection time to a specific URL
   * @param url - The URL to test connection time to
   * @returns Promise resolving to connection time in milliseconds, or -1 if failed
   */
  const measureConnectionTime = async (url: string): Promise<number> => {
    if (!import.meta.client) return -1
    
    const start = performance.now()
    
    try {
      // Use HEAD request to minimize data transfer
      await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors', // Avoid CORS issues for external domains
      })
      return performance.now() - start
    } catch (error) {
      return -1
    }
  }

  /**
   * Get network connection information (if available)
   * @returns Network connection details or null if not supported
   */
  const diagnoseNetworkPerformance = async () => {
    if (!import.meta.client) return null
    
    try {
      // Modern browsers support connection API
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        
        return {
          effectiveType: connection?.effectiveType || 'unknown',
          downlink: connection?.downlink || 'unknown',
          rtt: connection?.rtt || 'unknown',
          saveData: connection?.saveData || false,
        }
      }
      
      return null
    } catch (error) {
      return null
    }
  }

  /**
   * Test DNS resolution speed for critical domains
   * @returns Object with DNS timing results
   */
  const testDNSPerformance = async () => {
    if (!import.meta.client) return {}
    
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]
    
    // Add Supabase URL if available
    const config = useRuntimeConfig()
    if (config.public.supabaseUrl) {
      try {
        const supabaseOrigin = new URL(config.public.supabaseUrl).origin
        domains.push(supabaseOrigin)
      } catch (error) {
        // Ignore invalid URLs
      }
    }
    
    const results: Record<string, number> = {}
    
    for (const domain of domains) {
      try {
        const time = await measureConnectionTime(domain)
        results[domain] = time
      } catch (error) {
        results[domain] = -1
      }
    }
    
    return results
  }

  /**
   * Check if resource hints are properly configured
   * @returns Object with resource hint validation results
   */
  const validateResourceHints = () => {
    if (!import.meta.client) return {}
    
    const hints = {
      dnsPrefetch: [] as string[],
      preconnect: [] as string[],
      preload: [] as string[],
    }
    
    // Check existing resource hints in document head
    const links = document.querySelectorAll('link[rel]')
    
    links.forEach(link => {
      const rel = link.getAttribute('rel')
      const href = link.getAttribute('href')
      
      if (href && rel) {
        switch (rel) {
          case 'dns-prefetch':
            hints.dnsPrefetch.push(href)
            break
          case 'preconnect':
            hints.preconnect.push(href)
            break
          case 'preload':
            hints.preload.push(href)
            break
        }
      }
    })
    
    return hints
  }

  /**
   * Log comprehensive network performance report
   */
  const logNetworkReport = async () => {
    if (!import.meta.client || !import.meta.dev) return
    
    console.group('🌐 Phase 4: Network Performance Report')
    
    try {
      // Network connection info
      const connectionInfo = await diagnoseNetworkPerformance()
      if (connectionInfo) {
        console.log('📡 Connection Info:', connectionInfo)
      }
      
      // DNS performance
      console.log('⏱️ Testing DNS performance...')
      const dnsResults = await testDNSPerformance()
      console.log('🔍 DNS Results:', dnsResults)
      
      // Resource hints validation
      const hints = validateResourceHints()
      console.log('💡 Resource Hints:', hints)
      
    } catch (error) {
      console.error('❌ Network report failed:', error)
    }
    
    console.groupEnd()
  }

  return {
    measureConnectionTime,
    diagnoseNetworkPerformance,
    testDNSPerformance,
    validateResourceHints,
    logNetworkReport,
  }
}