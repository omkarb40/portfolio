import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { pharmarag, otherWork, moreProjects } from '../data/portfolio'
import ShotCarousel from './ShotCarousel'
import GuardLab from './GuardLab'
import AblationChart from './AblationChart'
import CaseOverlay from './CaseOverlay'
import SectionHead from './SectionHead'

export default function Work() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const [filter, setFilter] = useState('All')
  const tags = useMemo(() => ['All', ...new Set(moreProjects.flatMap((p) => p.tags))], [])
  const shown = filter === 'All' ? moreProjects : moreProjects.filter((p) => p.tags.includes(filter))

  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead title="Selected work" lede="Evaluation results you can reproduce, pipelines that run, and one finding I didn’t expect." />

        <article className="feature">
          <div className="feature-copy">
            <p className="feature-meta">{pharmarag.context}, {pharmarag.when}</p>
            <h3 className="feature-title">{pharmarag.title}</h3>
            <p className="feature-sub">{pharmarag.subtitle}</p>
            <p className="feature-pitch">{pharmarag.pitch}</p>
            <dl className="metrics">
              {pharmarag.metrics.filter((m) => m.k !== 'nDCG@5').map((m) => (<div key={m.k}><dd className="num">{m.v}</dd><dt>{m.k}</dt></div>))}
            </dl>
            <div className="feature-actions">
              <button className="btn btn-primary" onClick={() => setOpen(pharmarag)}>Read the case study</button>
              <a className="btn btn-quiet" href={pharmarag.repo} target="_blank" rel="noreferrer"><i className="fab fa-github" aria-hidden="true" /> Code</a>
            </div>
          </div>
          <div className="feature-media">
            <ShotCarousel shots={pharmarag.shots} label="PharmaRAG screenshots" />
          </div>
        </article>

        <div className="labs">
          <GuardLab />
          <AblationChart />
        </div>

        <h3 className="sub-head">More case studies</h3>
        <ul className="rows">
          {otherWork.map((p) => (
            <li key={p.id}>
              <button className="row" onClick={() => setOpen(p)} aria-haspopup="dialog">
                <span className="row-main">
                  <span className="row-title">{p.title}</span>
                  <span className="row-sub">{p.subtitle}</span>
                </span>
                <span className="row-metric"><span className="num">{p.metrics[0].v}</span> {p.metrics[0].k}</span>
                <span className="row-tags">{p.tags.slice(0, 3).join(', ')}</span>
                <i className="fas fa-arrow-right row-go" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <h3 className="sub-head">Smaller projects</h3>
        <div className="filters" role="group" aria-label="Filter smaller projects">
          {tags.map((t) => (
            <button key={t} className={filter === t ? 'on' : ''} onClick={() => setFilter(t)} aria-pressed={filter === t}>{t}</button>
          ))}
        </div>
        <motion.div className="mini-grid" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.a
                layout key={p.title} className="mini" href={p.repo} target="_blank" rel="noreferrer"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <span className="mini-title">{p.title}</span>
                <span className="mini-desc">{p.desc}</span>
                <span className="mini-tags">{p.tags.join(', ')}</span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <CaseOverlay project={open} onClose={close} />
    </section>
  )
}
