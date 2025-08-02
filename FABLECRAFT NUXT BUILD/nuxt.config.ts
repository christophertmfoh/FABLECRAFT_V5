// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Essential modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  
  // Development server configuration
  devServer: {
    port: 4270,
    host: '0.0.0.0' // Allow external connections for port forwarding
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Google Fonts
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains+Mono': [400, 500]
    }
  }
})
