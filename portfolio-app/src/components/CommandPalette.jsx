import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navSections, pharmarag, otherWork, profile } from '../data/portfolio'

function go(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)

  const items = useMemo(() => [
    ...navSections.map((s) => ({ label: `Go to ${s.label}`, icon: 'fas fa-arrow-down', action: () => go(s.id) })),
    ...[pharmarag, ...otherWork].map((p) => ({ label: `Open ${p.title} on GitHub`, icon: 'fab fa-github', action: () => window.open(p.repo, '_blank') })),
    { label: 'Download resume', icon: 'fas fa-file-arrow-down', action: () => window.open(profile.resume, '_blank') },
    { label: 'Open LinkedIn', icon: 'fab fa-linkedin-in', action: () => window.open(profile.linkedin, '_blank') },
    { label: 'Email Omkar', icon: 'fas fa-envelope', action: () => (window.location.href = `mailto:${profile.email}`) },
  ], [])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (!open) return
    setQuery(''); setCursor(0)
    window.__lenis?.stop()
    const t = setTimeout(() => inputRef.current?.focus(), 20)
    return () => { clearTimeout(t); window.__lenis?.start() }
  }, [open])

  function onKey(e) {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
    if (e.key === 'Enter' && filtered[cursor]) { filtered[cursor].action(); onClose() }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cmdk-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="cmdk-panel" role="dialog" aria-modal="true" aria-label="Search the site"
            onClick={(e) => e.stopPropagation()} onKeyDown={onKey}
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 36 }}
          >
            <div className="cmdk-input-row">
              <i className="fas fa-magnifying-glass" aria-hidden="true" />
              <input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setCursor(0) }} placeholder="Jump to a section, project or link" aria-label="Search" />
              <kbd>esc</kbd>
            </div>
            <div className="cmdk-list" role="listbox">
              {filtered.length === 0 && <div className="cmdk-empty">Nothing matches “{query}”. Try a project name.</div>}
              {filtered.map((item, i) => (
                <button key={item.label} role="option" aria-selected={i === cursor} className={`cmdk-item ${i === cursor ? 'on' : ''}`}
                  onMouseEnter={() => setCursor(i)} onClick={() => { item.action(); onClose() }}>
                  <i className={item.icon} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
