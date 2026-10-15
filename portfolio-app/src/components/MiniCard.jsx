import Reveal from './Reveal'

export default function MiniCard({ project }) {
  return (
    <Reveal as="div" className="mini-card">
      <h5>{project.title}</h5>
      <p>{project.desc}</p>
      <div className="tag-row">
        {project.tags.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
      <a href={project.repo} target="_blank" rel="noreferrer">
        <i className="fab fa-github" /> View code
      </a>
    </Reveal>
  )
}
