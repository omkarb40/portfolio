import { useEffect, useMemo, useRef, useState } from 'react'
import { navSections, flagshipProjects, profile } from '../data/portfolio'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const items = useMemo(() => {
    const sectionItems = navSections.map((s) => ({
      label: `Go to ${s.label}`,
      icon: 'fa-arrow-right',
      action: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
    }))
    const projectItems = flagshipProjects.map((p) => ({
      label: `Project — ${p.title}`,
      icon: 'fa-diagram-project',
      action: () => window.open(p.repo, '_blank'),
    }))
    const linkItems = [
      { label: 'Open GitHub profile', icon: 'fa-github fab', action: () => window.open(profile.github, '_blank') },
      { label: 'Open LinkedIn', icon: 'fa-linkedin fab', action: () => window.open(profile.linkedin, '_blank') },
      { label: 'Download resume (PDF)', icon: 'fa-file-pdf', action: () => window.open(profile.resume, '_blank') },
      { label: 'Email Omkar', icon: 'fa-envelope', action: () => (window.location.href = `mailto:${profile.email}`) },
    ]
    return [...sectionItems, ...projectItems, ...linkItems]
  }, [])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <i className="fas fa-magnifying-glass" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, project, or link…"
          />
          <kbd>esc</kbd>
        </div>
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">No matches</div>}
          {filtered.map((item, i) => (
            <button
              key={i}
              className="cmdk-item"
              onClick={() => {
                item.action()
                onClose()
              }}
            >
              <i className={`fas ${item.icon}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
