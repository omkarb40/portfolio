import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'

// Reads the current theme from <html data-theme>. index.html sets it before
// first paint (saved choice, else the system preference) so there is no flash.
function current() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function apply(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f6fb' : '#0b1020')
  try { localStorage.setItem('theme', theme) } catch { /* private mode: theme just won't persist */ }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(current)

  // Follow the system setting live, until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      let saved = null
      try { saved = localStorage.getItem('theme') } catch { /* ignore */ }
      if (!saved) { const t = e.matches ? 'light' : 'dark'; document.documentElement.dataset.theme = t; setTheme(t) }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function toggle(e) {
    const next = theme === 'dark' ? 'light' : 'dark'
    const swap = () => flushSync(() => { apply(next); setTheme(next) })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) { swap(); return }

    // Circular reveal that grows from the button.
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const t = document.startViewTransition(swap)
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    }).catch(() => {})
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  return (
    <button className="theme-btn" onClick={toggle} aria-label={label} title={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {theme === 'dark' ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
            </>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
