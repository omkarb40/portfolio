import { useState } from 'react'
import { motion } from 'motion/react'
import { navSections } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'

export default function Nav({ onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navSections.map((s) => s.id))

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">Omkar Badadale</a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {navSections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined} onClick={() => setOpen(false)}>
                {active === s.id && <motion.span className="nav-pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span className="nav-label">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-tools">
          <button className="cmdk-btn" onClick={onOpenPalette} aria-label="Search the site">
            <i className="fas fa-magnifying-glass" aria-hidden="true" /><kbd>⌘K</kbd>
          </button>
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            <i className={`fas ${open ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}
