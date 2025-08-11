export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) return

  // Initialize Crisp
  window.$crisp = []
  window.CRISP_WEBSITE_ID = "YOUR-CRISP-ID" // You'll replace this with your actual ID

  // Load Crisp script
  const script = document.createElement('script')
  script.src = 'https://client.crisp.chat/l.js'
  script.async = true
  document.head.appendChild(script)

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