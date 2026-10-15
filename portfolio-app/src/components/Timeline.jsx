import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { experience } from '../data/portfolio'
import Bold from '../utils/bold'
import SectionHead from './SectionHead'

// Experience as a timeline. The rail fills as you scroll through it,
// and each role's marker lights up when the role reaches the middle of the screen.
export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead title="Experience" lede="Four years of models that had to hold up in front of analysts, auditors and clients." />
        <div className="timeline" ref={ref}>
          <div className="rail" aria-hidden="true"><motion.div className="rail-fill" style={{ scaleY: fill }} /></div>
          {experience.map((x) => (
            <motion.article
              key={x.org + x.when} className="tl-item"
              initial={{ opacity: 0.35 }} whileInView={{ opacity: 1 }} viewport={{ margin: '-45% 0px -45% 0px' }}
              transition={{ duration: 0.4 }}
            >
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-top">
                <h3><span className="tl-role">{x.role}</span> <span className="tl-org">at {x.org}</span></h3>
                <span className="tl-when">{x.when}, {x.where}</span>
              </div>
              <p className="tl-focus">{x.focus}</p>
              <ul>{x.bullets.map((b, i) => <li key={i}><Bold text={b} /></li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
