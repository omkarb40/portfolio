import { skillGroups, education, certifications } from '../data/portfolio'
import Reveal from './Reveal'

export default function SkillsEducation() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// toolbox</div>
          <h2>Skills</h2>
        </Reveal>
        <Reveal className="skills-grid">
          {skillGroups.map((g) => (
            <div className="skill-group" key={g.title}>
              <h4>{g.title}</h4>
              <div className="chips">
                {g.chips.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="section-head" style={{ marginTop: 54 }}>
          <h2 style={{ fontSize: '1.3rem' }}>Education</h2>
        </Reveal>
        <Reveal>
          {education.map((e) => (
            <div className="edu-item" key={e.deg}>
              <div>
                <div className="deg">{e.deg}</div>
                <div className="school">{e.school}</div>
              </div>
              <div className="when">{e.when}</div>
            </div>
          ))}
        </Reveal>

        <Reveal className="section-head" style={{ marginTop: 54 }}>
          <h2 style={{ fontSize: '1.3rem' }}>Certifications</h2>
        </Reveal>
        <Reveal className="cert-grid">
          {certifications.map((c) => (
            <div className="cert" key={c.name}>
              <div className="cert-icon"><i className={c.icon} /></div>
              <div>
                <div className="deg">{c.name}</div>
                <div className="school">{c.issuer}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
