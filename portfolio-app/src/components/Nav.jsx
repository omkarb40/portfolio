import { useState } from 'react'
import { navSections } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'

export default function Nav({ onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navSections.map((s) => s.id))

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">
          omkar<span className="dot">.</span>badadale
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button className="cmdk-btn" onClick={onOpenPalette} title="Quick navigate (Cmd+K)">
            <i className="fas fa-magnifying-glass" /> <span>Search</span> <kbd>&#8984;K</kbd>
          </button>
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle navigation">
            &#9776;
          </button>
        </div>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {navSections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? 'active' : ''} onClick={() => setOpen(false)}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
