import { profile, roles, stats } from '../data/portfolio'
import useRoleRotator from '../hooks/useRoleRotator'
import StatItem from './StatItem'
import useReveal from '../hooks/useReveal'

export default function Hero() {
  const [role, visible] = useRoleRotator(roles)
  const [statsRef, statsVisible] = useReveal()

  return (
    <header className="hero wrap" id="top">
      <div className="hero-eyebrow">
        <span className="pulse" /> Open to full-time opportunities · Massachusetts, USA
      </div>
      <h1>
        Hi, I&apos;m Omkar —<br />
        I build <span className="grad">AI systems that ship.</span>
      </h1>
      <div className="role-line">
        <span style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease' }}>{role}</span>
        <span className="cursor" />
      </div>
      <p className="lede">
        I build ML and GenAI systems that hold up under scrutiny: explainable risk and churn
        models, RAG pipelines that know when to refuse, and real-time data platforms. 4+ years
        across financial services, telecom and consulting. Published researcher (Journal of
        Cleaner Production, 2026) · MS Data Science, UMass Dartmouth.
      </p>
      <div className="btn-row">
        <a className="btn btn-primary" href="#projects">
          See my work <i className="fas fa-arrow-right" />
        </a>
        <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer" download>
          Download resume <i className="fas fa-file-pdf" />
        </a>
      </div>
      <div className="social-row">
        <a href={profile.linkedin} title="LinkedIn" target="_blank" rel="noreferrer"><i className="fab fa-linkedin" /></a>
        <a href={profile.github} title="GitHub" target="_blank" rel="noreferrer"><i className="fab fa-github" /></a>
        <a href={profile.medium} title="Medium" target="_blank" rel="noreferrer"><i className="fab fa-medium" /></a>
        <a href={`mailto:${profile.email}`} title="Email"><i className="fas fa-envelope" /></a>
      </div>

      <div ref={statsRef} className={`stat-strip ${statsVisible ? 'in' : ''}`} data-reveal>
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </header>
  )
}
