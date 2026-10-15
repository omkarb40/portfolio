import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { profile, heroFacts } from '../data/portfolio'
import HeroField from './HeroField'
import StatItem from './StatItem'

const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
}
const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (d) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero() {
  const [stats, setStats] = useState({ k: 4, iter: 0, inertia: 0, converged: false })
  const onStats = useCallback((s) => setStats(s), [])

  return (
    <header className="hero" id="top">
      <HeroField onStats={onStats} />
      <div className="wrap hero-inner">
        <motion.p className="hero-name" initial="hidden" animate="show" variants={fade} custom={0.05}>
          Omkar Badadale, data scientist
        </motion.p>
        <h1 className="hero-title">
          {['I build models that', 'know when not', 'to answer.'].map((t, i) => (
            <span className="line-mask" key={t}>
              <motion.span className="line" initial="hidden" animate="show" variants={line} custom={i}>
                {t}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero-lede" initial="hidden" animate="show" variants={fade} custom={0.65}>
          Explainable risk and churn models, RAG systems that refuse when the evidence says so, and
          real-time data platforms. Four years across financial services, telecom and consulting.
          Published in the Journal of Cleaner Production.
        </motion.p>
        <motion.div className="hero-actions" initial="hidden" animate="show" variants={fade} custom={0.8}>
          <a className="btn btn-primary" href="#work">See the work</a>
          <a className="btn btn-quiet" href={profile.resume} target="_blank" rel="noreferrer">
            <i className="fas fa-file-arrow-down" aria-hidden="true" /> Resume
          </a>
          <div className="hero-social">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
            <a href={profile.medium} target="_blank" rel="noreferrer" aria-label="Medium"><i className="fab fa-medium" /></a>
          </div>
        </motion.div>
        <motion.dl className="hero-facts" initial="hidden" animate="show" variants={fade} custom={0.95}>
          {heroFacts.map((f) => <StatItem key={f.label} {...f} />)}
        </motion.dl>
      </div>
      <motion.div className="field-caption" initial="hidden" animate="show" variants={fade} custom={1.2} aria-hidden="true">
        <span>Live k-means</span>
        <span className="num">k {stats.k}</span>
        <span className="num">iteration {stats.iter}</span>
        <span className="num">inertia {stats.inertia.toFixed(1)}</span>
        <span className={stats.converged ? 'ok' : ''}>{stats.converged ? 'converged' : 'fitting'}</span>
        <span className="field-hint">Click anywhere to add a centroid</span>
      </motion.div>
    </header>
  )
}
