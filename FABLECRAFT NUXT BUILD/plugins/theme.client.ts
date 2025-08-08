// Client-side plugin for theme initialization
export default defineNuxtPlugin(() => {
  const { initializeTheme, currentTheme } = useTheme()

  const loadedThemes = new Set<string>()
  const themeCssModules = import.meta.glob('~/assets/css/themes/*.css')

  const loadThemeCss = async (themeName: string) => {
    if (themeName === 'system') return
    if (loadedThemes.has(themeName)) return

    // Find matching CSS module for the theme
    const entry = Object.entries(themeCssModules).find(([path]) => path.endsWith(`${themeName}.css`))
    if (!entry) {
      if (import.meta.dev) console.warn(`[theme] no css module found for: ${themeName}`)
      return
    }

    const [, loader] = entry
    try {
      await loader()
      loadedThemes.add(themeName)
    } catch (e) {
      if (import.meta.dev) console.warn(`[theme] failed to load theme css for: ${themeName}`, e)
    }
  }

  if (import.meta.client) {
    const theme = currentTheme.value || 'light'
    loadThemeCss(theme)

    const stop = watch(currentTheme, (next) => {
      if (!next) return
      loadThemeCss(next)
    })

    onNuxtReady(() => {
      // Optional: stop() if you only want initial load watch
    })
  }

  initializeTheme()
})
