import { useState, useEffect, useRef, useCallback } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return true // Default theme is Dark
    }
    return true
  })
  const btnRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggleTheme = useCallback((e) => {
    // Compute the circle origin from the button's position
    const btn = btnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100
      document.documentElement.style.setProperty('--vt-x', `${x.toFixed(1)}%`)
      document.documentElement.style.setProperty('--vt-y', `${y.toFixed(1)}%`)
    }

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        setDark((prev) => !prev)
      })
    } else {
      setDark((prev) => !prev)
    }
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      className="w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 rounded-full liquid-glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg border border-white/40 dark:border-white/10 group"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sun size={16} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Moon size={16} className="text-slate-700 dark:text-slate-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
