// server/plugins/compression.ts
// ✅ Phase 2: HTML Compression Plugin with Performance Monitoring

import { useCompression } from 'h3-compression'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:response', async (response, { event }) => {
    // Skip compression for 404 error pages
    const is404Error = event._path?.includes('/__nuxt_error') || event._path?.includes('statusCode=404');
    if (is404Error) return;

    // Only apply compression to HTML content
    if (!response.headers?.['content-type']?.startsWith('text/html')) return;

    // Skip compression in development for debugging
    if (process.env.NODE_ENV === 'development') return;

    try {
      // Apply compression with performance monitoring
      const startTime = Date.now();
      await useCompression(event, response);
      const duration = Date.now() - startTime;
      
      // Monitor compression performance
      if (duration > 50) {
        console.warn(`⚠️ Slow compression for ${event._path}: ${duration}ms`);
      } else if (process.env.NODE_ENV !== 'production') {
        console.log(`✅ Compressed ${event._path} in ${duration}ms`);
      }
    } catch (error) {
      // Graceful fallback - never break the response
      console.error(`❌ Compression failed for ${event._path}:`, error);
      // Response continues without compression
    }
  });
});