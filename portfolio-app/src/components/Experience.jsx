import { experience } from '../data/portfolio'
import Bold from '../utils/bold'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// career</div>
          <h2>Experience</h2>
        </Reveal>
        <Reveal>
          {experience.map((xp) => (
            <div className="xp-item" key={xp.role + xp.when}>
              <div className="xp-top">
                <div className="xp-role">{xp.role}</div>
                <div className="xp-when">{xp.when}</div>
              </div>
              <div className="xp-org">{xp.org}</div>
              <ul>
                {xp.bullets.map((b, i) => (
                  <li key={i}><Bold text={b} /></li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
