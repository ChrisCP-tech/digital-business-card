export function applyPrimaryColor(color: string) {
  document.documentElement.style.setProperty('--primary', color)
}

export function applyFont(fontFamily: string) {
  const fontMap: Record<string, string> = {
    inter: 'Inter, sans-serif',
    merriweather: 'Merriweather, serif',
    playfair: '"Playfair Display", serif',
    mono: '"JetBrains Mono", monospace',
  }
  document.documentElement.style.setProperty('--font-card', fontMap[fontFamily] ?? fontMap.inter)
}

export function toggleTheme() {
  const html = document.documentElement
  const isDark = html.classList.contains('dark')
  html.classList.toggle('dark', !isDark)
  html.classList.toggle('light', isDark)
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
  return isDark ? 'light' : 'dark'
}

export function getCurrentTheme(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}
