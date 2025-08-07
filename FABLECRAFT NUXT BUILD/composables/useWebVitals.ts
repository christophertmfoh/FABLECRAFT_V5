// ✅ Phase 6: Core Web Vitals monitoring with web-vitals library
// Provides real-time monitoring of Core Web Vitals performance metrics

import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'

export const useWebVitals = () => {
  /**
   * Initialize Core Web Vitals monitoring
   */
  const initWebVitals = () => {
    if (!import.meta.client) return

    const vitals = {
      cls: 0,
      fid: 0,
      fcp: 0,
      lcp: 0,
      ttfb: 0,
      inp: 0,
    }

    // Track Cumulative Layout Shift
    onCLS(metric => {
      vitals.cls = metric.value
      logVital('CLS', metric)
    })

    // Track First Input Delay
    onFID(metric => {
      vitals.fid = metric.value
      logVital('FID', metric)
    })

    // Track First Contentful Paint
    onFCP(metric => {
      vitals.fcp = metric.value
      logVital('FCP', metric)
    })

    // Track Largest Contentful Paint
    onLCP(metric => {
      vitals.lcp = metric.value
      logVital('LCP', metric)
    })

    // Track Time to First Byte
    onTTFB(metric => {
      vitals.ttfb = metric.value
      logVital('TTFB', metric)
    })

    // Track Interaction to Next Paint (modern FID replacement)
    onINP(metric => {
      vitals.inp = metric.value
      logVital('INP', metric)
    })

    // Store vitals for access by other composables
    if (import.meta.dev) {
      (window as any).__NUXT_WEB_VITALS__ = vitals
    }
  }

  /**
   * Log vital metrics with performance analysis
   */
  const logVital = (name: string, metric: any) => {
    if (!import.meta.dev) return

    const threshold = getThreshold(name, metric.value)
    const status = getStatus(name, metric.value)
    
    console.log(`📊 ${name}: ${metric.value.toFixed(2)}${name === 'CLS' ? '' : 'ms'}`, {
      status,
      threshold,
      rating: metric.rating,
      navigationType: metric.navigationType,
    })
  }

  /**
   * Get performance thresholds for each vital
   */
  const getThreshold = (name: string, value: number) => {
    const thresholds = {
      CLS: { good: 0.1, needs_improvement: 0.25 },
      FID: { good: 100, needs_improvement: 300 },
      FCP: { good: 1800, needs_improvement: 3000 },
      LCP: { good: 2500, needs_improvement: 4000 },
      TTFB: { good: 800, needs_improvement: 1800 },
      INP: { good: 200, needs_improvement: 500 },
    }

    return thresholds[name as keyof typeof thresholds] || null
  }

  /**
   * Get performance status based on thresholds
   */
  const getStatus = (name: string, value: number) => {
    const threshold = getThreshold(name, value)
    if (!threshold) return 'unknown'

    if (value <= threshold.good) return '✅ good'
    if (value <= threshold.needs_improvement) return '⚠️ needs improvement'
    return '❌ poor'
  }

  /**
   * Get current web vitals values
   */
  const getWebVitals = () => {
    if (!import.meta.client) return null
    return (window as any).__NUXT_WEB_VITALS__ || null
  }

  /**
   * Generate web vitals summary report
   */
  const generateVitalsReport = () => {
    if (!import.meta.dev) return

    const vitals = getWebVitals()
    if (!vitals) {
      console.warn('📊 Web Vitals not yet initialized')
      return
    }

    console.group('📊 Core Web Vitals Summary')
    
    Object.entries(vitals).forEach(([name, value]) => {
      if (value > 0) {
        const status = getStatus(name.toUpperCase(), value as number)
        console.log(`${name.toUpperCase()}: ${(value as number).toFixed(2)}${name === 'cls' ? '' : 'ms'} ${status}`)
      }
    })
    
    console.groupEnd()
  }

  return {
    initWebVitals,
    logVital,
    getThreshold,
    getStatus,
    getWebVitals,
    generateVitalsReport,
  }
}