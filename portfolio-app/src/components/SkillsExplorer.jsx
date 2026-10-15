import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { skillGroups, skillAliases, experience, pharmarag, otherWork, moreProjects, certifications, education } from '../data/portfolio'
import SectionHead from './SectionHead'

// Every place a skill shows up, found by searching the site's own content.
const corpus = [
  ...experience.map((x) => ({ kind: 'Role', name: `${x.role}, ${x.org}`, text: [x.focus, ...x.bullets].join(' ') })),
  ...[pharmarag, ...otherWork].map((p) => ({ kind: 'Case study', name: p.title, text: [p.pitch, ...p.approach, ...p.result, ...p.tags].join(' ') })),
  ...moreProjects.map((p) => ({ kind: 'Project', name: p.title, text: [p.title, p.desc, ...p.tags].join(' ') })),
]

function terms(skill) {
  return [skill.toLowerCase(), ...(skillAliases[skill] || [])]
}
function matches(skill) {
  const t = terms(skill)
  return corpus.filter((c) => {
    const s = c.text.toLowerCase()
    return t.some((w) => (w.length <= 3 ? new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(s) : s.includes(w)))
  })
}

export default function SkillsExplorer() {
  const [skill, setSkill] = useState('SHAP')
  const hits = useMemo(() => matches(skill), [skill])
  const counts = useMemo(() => Object.fromEntries(skillGroups.flatMap((g) => g.chips).map((c) => [c, matches(c).length])), [])

  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SectionHead title="Skills" lede="Pick a skill to see where I have used it. The list is searched live from the roles and projects on this page." />
        <div className="skills">
          <div className="skill-groups">
            {skillGroups.map((g) => (
              <div className="skill-group" key={g.title}>
                <h3>{g.title}</h3>
                <div className="chips">
                  {g.chips.map((c) => (
                    <button key={c} className={`chip ${skill === c ? 'on' : ''}`} onClick={() => setSkill(c)} aria-pressed={skill === c}>
                      {c}{counts[c] > 0 && <span className="chip-n">{counts[c]}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="skill-panel" aria-live="polite">
            <p className="skill-panel-head"><b>{skill}</b> appears in {hits.length} {hits.length === 1 ? 'place' : 'places'}</p>
            <motion.ul layout>
              <AnimatePresence mode="popLayout" initial={false}>
                {hits.map((h) => (
                  <motion.li layout key={h.kind + h.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
                    <span className="hit-kind">{h.kind}</span>
                    <span className="hit-name">{h.name}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            {hits.length === 0 && <p className="skill-empty">Listed on my resume, not yet written up here. Ask me about it.</p>}
          </aside>
        </div>

        <div className="creds">
          <div>
            <h3 className="sub-head">Education</h3>
            <ul className="cred-list">
              {education.map((e) => (
                <li key={e.deg}><span className="cred-name">{e.deg}</span><span className="cred-meta">{e.school}. {e.note}. {e.when}.</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sub-head">Certifications</h3>
            <ul className="cred-list">
              {certifications.map((c) => (
                <li key={c.name}><i className={c.icon} aria-hidden="true" /><span className="cred-name">{c.name}</span><span className="cred-meta">{c.issuer}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
