import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { toggleTheme, getCurrentTheme } from '../lib/theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setTheme(getCurrentTheme())
  }, [])

  function handleToggle() {
    const next = toggleTheme()
    setTheme(next)
  }

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full transition-colors hover:bg-[--surface] text-[--muted] hover:text-[--fg]"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
