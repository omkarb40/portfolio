import { profile } from '../data/portfolio'
import Reveal from './Reveal'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// about</div>
          <h2>What I do</h2>
        </Reveal>
        <Reveal className="about-grid">
          <div>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', marginBottom: 20, border: '1px solid var(--line)' }}
            />
            <p>
              I&apos;m a data scientist with four-plus years across financial services, telecom and
              consulting: suspicious-activity models at Citi, churn modeling at Vodafone, and customer
              segmentation at Fractal. I care about model reliability: explainable predictions,
              thresholds tuned to real costs, and GenAI systems that are measured before they are
              trusted. My capstone, PharmaRAG, showed that a RAG system can be highly grounded and
              still unsafe, and built the evaluation to catch it. I co-authored ESG research published
              in the Journal of Cleaner Production and am lead author on a second paper submitted to
              an international journal.
            </p>
          </div>
          <div className="about-facts">
            <div className="row"><span className="label">EMAIL</span><span className="val">{profile.email}</span></div>
            <div className="row"><span className="label">PHONE</span><span className="val">{profile.phone}</span></div>
            <div className="row"><span className="label">LOCATION</span><span className="val">{profile.location}</span></div>
            <div className="row"><span className="label">LINKEDIN</span><span className="val"><a href={profile.linkedin} target="_blank" rel="noreferrer">/in/omkarbadadale1620</a></span></div>
            <div className="row"><span className="label">GITHUB</span><span className="val"><a href={profile.github} target="_blank" rel="noreferrer">github.com/omkarb40</a></span></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
