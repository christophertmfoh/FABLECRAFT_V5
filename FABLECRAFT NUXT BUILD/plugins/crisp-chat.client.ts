export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) return

  // Initialize Crisp
  window.$crisp = []
  window.CRISP_WEBSITE_ID = "064d5aea-f316-42cf-a63d-a94caccf0b64"

  // Function to get current theme colors from CSS variables
  const getThemeColors = () => {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    
    // Get HSL values and convert to hex for Crisp
    const primaryHSL = computedStyle.getPropertyValue('--primary').trim()
    const backgroundHSL = computedStyle.getPropertyValue('--background').trim()
    const foregroundHSL = computedStyle.getPropertyValue('--foreground').trim()
    const mutedHSL = computedStyle.getPropertyValue('--muted').trim()
    const accentHSL = computedStyle.getPropertyValue('--accent').trim()
    
    return {
      primary: primaryHSL,
      background: backgroundHSL,
      foreground: foregroundHSL,
      muted: mutedHSL,
      accent: accentHSL
    }
  }

  // Apply theme colors to Crisp
  const applyThemeToCrisp = () => {
    const colors = getThemeColors()
    
    // Set Crisp theme based on current theme
    const isDark = document.documentElement.classList.contains('dark')
    
    // Configure Crisp colors
    window.$crisp.push(['config', 'color:theme', isDark ? 'dark' : 'light'])
    window.$crisp.push(['config', 'color:main', '#3b82f6']) // Using a blue that works in both themes
    window.$crisp.push(['config', 'color:button', '#3b82f6'])
    
    // Inject custom CSS to override Crisp styles
    const styleId = 'crisp-theme-overrides'
    let styleEl = document.getElementById(styleId)
    
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }
    
    styleEl.textContent = `
      /* Crisp Chat Theme Overrides */
      .crisp-client {
        font-family: inherit !important;
      }
      
      /* Chat bubble button */
      .crisp-client .cc-l3zb .cc-1c0v .cc-gye0 .cc-11yd .cc-15ak {
        background: hsl(var(--primary)) !important;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
      }
      
      /* Chat window header */
      .crisp-client .cc-l3zb .cc-1hqm {
        background: hsl(var(--background)) !important;
        border-bottom: 1px solid hsl(var(--border)) !important;
      }
      
      /* Chat window background */
      .crisp-client .cc-l3zb .cc-gye0 {
        background: hsl(var(--background)) !important;
      }
      
      /* Message bubbles - user */
      .crisp-client .cc-l3zb .cc-1vax .cc-1awy.cc-1v07 .cc-unoo {
        background: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
      }
      
      /* Message bubbles - agent */
      .crisp-client .cc-l3zb .cc-1vax .cc-1awy.cc-qdpz .cc-unoo {
        background: hsl(var(--muted)) !important;
        color: hsl(var(--foreground)) !important;
      }
      
      /* Input field */
      .crisp-client .cc-l3zb .cc-lq3u .cc-lbdv {
        background: hsl(var(--background)) !important;
        border-top: 1px solid hsl(var(--border)) !important;
      }
      
      .crisp-client .cc-l3zb .cc-lq3u .cc-1mk8 {
        background: hsl(var(--muted) / 0.5) !important;
        color: hsl(var(--foreground)) !important;
      }
      
      .crisp-client .cc-l3zb .cc-lq3u .cc-1mk8::placeholder {
        color: hsl(var(--muted-foreground)) !important;
      }
      
      /* Send button */
      .crisp-client .cc-l3zb .cc-lq3u .cc-1w72 {
        background: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
      }
      
      /* Links and buttons */
      .crisp-client .cc-l3zb a,
      .crisp-client .cc-l3zb .cc-162m {
        color: hsl(var(--primary)) !important;
      }
      
      /* Text colors */
      .crisp-client .cc-l3zb .cc-1hqm .cc-1qhx,
      .crisp-client .cc-l3zb .cc-1hqm .cc-1bue {
        color: hsl(var(--foreground)) !important;
      }
      
      /* Scrollbar */
      .crisp-client .cc-l3zb ::-webkit-scrollbar-thumb {
        background: hsl(var(--muted)) !important;
      }
      
      /* Make corners match your design */
      .crisp-client .cc-l3zb .cc-gye0 {
        border-radius: 0.75rem !important;
      }
      
      /* Glass effect for premium feel */
      .crisp-client .cc-l3zb .cc-gye0 {
        backdrop-filter: blur(10px) !important;
        background: hsl(var(--background) / 0.95) !important;
        border: 1px solid hsl(var(--border)) !important;
      }
    `
  }

  // Load Crisp script
  const script = document.createElement('script')
  script.src = 'https://client.crisp.chat/l.js'
  script.async = true
  document.head.appendChild(script)

  // Wait for Crisp to load then apply theme
  script.onload = () => {
    setTimeout(() => {
      applyThemeToCrisp()
      
      // Watch for theme changes
      const observer = new MutationObserver(() => {
        applyThemeToCrisp()
      })
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme']
      })
    }, 1000)
  }

  // Hide Crisp by default (we'll show it when user clicks)
  window.$crisp.push(['do', 'chat:hide'])

  // Provide global methods to control Crisp
  return {
    provide: {
      crisp: {
        open: () => {
          window.$crisp.push(['do', 'chat:show'])
          window.$crisp.push(['do', 'chat:open'])
        },
        close: () => {
          window.$crisp.push(['do', 'chat:close'])
        },
        hide: () => {
          window.$crisp.push(['do', 'chat:hide'])
        },
        show: () => {
          window.$crisp.push(['do', 'chat:show'])
        },
        sendMessage: (message: string) => {
          window.$crisp.push(['do', 'message:send', ['text', message]])
        }
      }
    }
  }
})