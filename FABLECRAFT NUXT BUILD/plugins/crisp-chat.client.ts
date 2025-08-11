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
      /* Crisp Chat Theme Overrides - Aggressive approach */
      
      /* Main chat widget container */
      .crisp-client[data-last-operator-face] {
        font-family: inherit !important;
      }
      
      /* Chat bubble/launcher button */
      .crisp-client .crisp-1rjpbb7[data-chat-status] {
        background: hsl(var(--primary)) !important;
        box-shadow: 0 10px 25px -5px hsl(var(--primary) / 0.3) !important;
      }
      
      .crisp-client .crisp-1rjpbb7[data-chat-status]:hover {
        background: hsl(var(--primary) / 0.9) !important;
        transform: scale(1.05) !important;
      }
      
      /* Main chat window */
      .crisp-client .crisp-1rjpbb7[data-chat-status][data-visible="true"] .crisp-1rf4xdh {
        background: hsl(var(--background)) !important;
        border: 1px solid hsl(var(--border)) !important;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
      }
      
      /* Header */
      .crisp-client .crisp-1rf4xdh .crisp-kquevr {
        background: hsl(var(--background)) !important;
        border-bottom: 1px solid hsl(var(--border)) !important;
      }
      
      /* Header text */
      .crisp-client .crisp-1rf4xdh .crisp-kquevr .crisp-1xmtdlg,
      .crisp-client .crisp-1rf4xdh .crisp-kquevr .crisp-12w4w1a {
        color: hsl(var(--foreground)) !important;
      }
      
      /* Chat messages container */
      .crisp-client .crisp-1rf4xdh .crisp-lgu84d {
        background: hsl(var(--background)) !important;
      }
      
      /* User messages (right side) */
      .crisp-client .crisp-1rf4xdh .crisp-lgu84d .crisp-1ohjrf0 .crisp-bhspdv[data-from="operator"] {
        background: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
      }
      
      .crisp-client .crisp-1rf4xdh .crisp-lgu84d .crisp-1ohjrf0 .crisp-bhspdv[data-type="text"][data-from="visitor"] {
        background: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
      }
      
      /* Agent messages (left side) */
      .crisp-client .crisp-1rf4xdh .crisp-lgu84d .crisp-1ohjrf0 .crisp-bhspdv[data-from="operator"] {
        background: hsl(var(--muted)) !important;
        color: hsl(var(--foreground)) !important;
      }
      
      /* All message text */
      .crisp-client .crisp-1rf4xdh .crisp-lgu84d .crisp-1ohjrf0 .crisp-bhspdv .crisp-1o2g4mc * {
        color: inherit !important;
      }
      
      /* Input container */
      .crisp-client .crisp-1rf4xdh .crisp-kquevr.crisp-1784wh6 {
        background: hsl(var(--background)) !important;
        border-top: 1px solid hsl(var(--border)) !important;
      }
      
      /* Input field */
      .crisp-client .crisp-1rf4xdh .crisp-kquevr.crisp-1784wh6 .crisp-6cw6fl,
      .crisp-client .crisp-1rf4xdh .crisp-kquevr.crisp-1784wh6 textarea {
        background: hsl(var(--muted) / 0.5) !important;
        color: hsl(var(--foreground)) !important;
        border: 1px solid hsl(var(--border)) !important;
      }
      
      .crisp-client .crisp-1rf4xdh .crisp-kquevr.crisp-1784wh6 textarea::placeholder {
        color: hsl(var(--muted-foreground)) !important;
      }
      
      /* Send button */
      .crisp-client .crisp-1rf4xdh .crisp-kquevr.crisp-1784wh6 .crisp-1t2fu6j {
        color: hsl(var(--primary)) !important;
      }
      
      /* All buttons */
      .crisp-client .crisp-1rf4xdh button {
        color: hsl(var(--foreground)) !important;
      }
      
      /* Links */
      .crisp-client .crisp-1rf4xdh a {
        color: hsl(var(--primary)) !important;
      }
      
      /* Powered by text */
      .crisp-client .crisp-1rf4xdh .crisp-4oo1n4 {
        color: hsl(var(--muted-foreground)) !important;
      }
      
      /* Dark mode specific overrides */
      .dark .crisp-client .crisp-1rf4xdh {
        filter: none !important;
      }
      
      /* Force all text to use our colors */
      .crisp-client .crisp-1rf4xdh * {
        border-color: hsl(var(--border)) !important;
      }
      
      /* Rounded corners */
      .crisp-client .crisp-1rf4xdh {
        border-radius: 0.75rem !important;
        overflow: hidden !important;
      }
      
      /* Glass effect */
      .crisp-client .crisp-1rf4xdh {
        backdrop-filter: blur(10px) !important;
        background: hsl(var(--background) / 0.98) !important;
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