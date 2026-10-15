import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Bold from '../utils/bold'
import ShotCarousel from './ShotCarousel'
import useGithubStats from '../hooks/useGithubStats'

function Body({ p, onClose }) {
  const closeRef = useRef(null)
  const stats = useGithubStats(p.repo)
  useEffect(() => {
    closeRef.current?.focus()
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div className="case-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.article
        className="case-sheet" role="dialog" aria-modal="true" aria-labelledby={`case-${p.id}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        data-lenis-prevent
      >
        <button ref={closeRef} className="case-close" onClick={onClose} aria-label="Close case study"><i className="fas fa-xmark" aria-hidden="true" /></button>
        <p className="case-when">{p.context ? `${p.context}, ${p.when}` : p.when}</p>
        <h2 id={`case-${p.id}`}>{p.title}</h2>
        <p className="case-sub">{p.subtitle}</p>
        <p className="case-pitch"><Bold text={p.pitch} /></p>
        {p.metrics?.length > 0 && (
          <dl className="metrics">
            {p.metrics.map((m) => (<div key={m.k}><dd className="num">{m.v}</dd><dt>{m.k}</dt></div>))}
          </dl>
        )}
        {p.shots && <ShotCarousel shots={p.shots} label={`${p.title} screenshots`} />}
        <div className="case-cols">
          <section><h3>How it works</h3><ul>{p.approach.map((l, i) => <li key={i}><Bold text={l} /></li>)}</ul></section>
          <section><h3>What it found</h3><ul>{p.result.map((l, i) => <li key={i}><Bold text={l} /></li>)}</ul></section>
        </div>
        <div className="case-foot">
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <a className="btn btn-primary" href={p.repo} target="_blank" rel="noreferrer">
            <i className="fab fa-github" aria-hidden="true" /> Code and README
            {stats && stats.stars >= 3 && <span className="stars"><i className="fas fa-star" aria-hidden="true" /> {stats.stars}</span>}
          </a>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function CaseOverlay({ project, onClose }) {
  return <AnimatePresence>{project && <Body key={project.id} p={project} onClose={onClose} />}</AnimatePresence>
}
