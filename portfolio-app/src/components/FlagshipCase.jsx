import Bold from '../utils/bold'
import Reveal from './Reveal'
import useTilt from '../hooks/useTilt'
import useGithubStats from '../hooks/useGithubStats'
import ShotCarousel from './ShotCarousel'

export default function FlagshipCase({ project }) {
  const tilt = useTilt(4)
  const stats = useGithubStats(project.repo)

  return (
    <Reveal
      as="article"
      className="case"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{ transition: 'transform 0.15s ease' }}
      >
        <div className="case-top">
          <div>
            <span className="case-num">{project.num}</span>
            <h3 className="case-title">{project.title}</h3>
          </div>
          <span className="case-when">{project.when}</span>
        </div>
        <p className="case-role"><Bold text={project.role} /></p>

        {project.metrics.length > 0 && (
          <div className="metric-row">
            {project.metrics.map((m) => (
              <div className="metric" key={m.k}>
                <div className="v">{m.v}</div>
                <div className="k">{m.k}</div>
              </div>
            ))}
          </div>
        )}

        <ShotCarousel shots={project.shots} label={`${project.title} screenshots`} />

        <div className="case-body">
          <div className="case-block">
            <h4>Approach</h4>
            <ul>
              {project.approach.map((line, i) => (
                <li key={i}><Bold text={line} /></li>
              ))}
            </ul>
          </div>
          <div className="case-block">
            <h4>Result</h4>
            <ul>
              {project.result.map((line, i) => (
                <li key={i}><Bold text={line} /></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tag-row">
          {project.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>

        <div className="case-links">
          <a href={project.repo} target="_blank" rel="noreferrer">
            <i className="fab fa-github" /> View code
          </a>
          {stats && (
            <span className="disabled" title="Live from GitHub API">
              <i className="fas fa-star" /> {stats.stars} · updated {new Date(stats.updated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer"><i className="fas fa-play" /> Live demo</a>
          ) : (
            <span className="disabled"><i className="fas fa-play" /> Live demo coming soon</span>
          )}
        </div>
      </div>
    </Reveal>
  )
}
