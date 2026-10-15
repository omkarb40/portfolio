import { useMemo, useState } from 'react'
import { flagshipProjects, moreProjects } from '../data/portfolio'
import FlagshipCase from './FlagshipCase'
import MiniCard from './MiniCard'
import Reveal from './Reveal'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const allTags = useMemo(() => {
    const s = new Set()
    moreProjects.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return ['All', ...Array.from(s).sort()]
  }, [])

  const filteredMore = useMemo(
    () => (filter === 'All' ? moreProjects : moreProjects.filter((p) => p.tags.includes(filter))),
    [filter]
  )

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// selected work</div>
          <h2>Flagship Projects</h2>
          <p>Five projects with real evaluation results, deployed pipelines, or competitive outcomes — spanning GenAI, agentic AI, and production data engineering.</p>
        </Reveal>

        {flagshipProjects.map((p) => (
          <FlagshipCase project={p} key={p.id} />
        ))}

        <Reveal className="section-head" style={{ marginTop: 54 }}>
          <div className="kicker">// more work</div>
          <h2 style={{ fontSize: '1.3rem' }}>More Projects</h2>
        </Reveal>

        <div className="filter-row" role="tablist" aria-label="Filter more projects by tag">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-chip ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
              role="tab"
              aria-selected={filter === tag}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="more-grid">
          {filteredMore.map((p) => (
            <MiniCard project={p} key={p.title} />
          ))}
          {filteredMore.length === 0 && (
            <p style={{ color: 'var(--ink-faint)' }}>No projects match that filter.</p>
          )}
        </div>
      </div>
    </section>
  )
}
