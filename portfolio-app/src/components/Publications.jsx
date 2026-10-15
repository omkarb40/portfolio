import { publications } from '../data/portfolio'
import Reveal from './Reveal'

export default function Publications() {
  return (
    <section className="section" id="publications">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// research</div>
          <h2>Publications</h2>
          <p>Peer-reviewed research in applied machine learning and sustainability analytics.</p>
        </Reveal>

        {publications.map((pub) => (
          <Reveal className="pub-card" key={pub.title}>
            <div className="pub-icon">
              <i className={`fas ${pub.status === 'published' ? 'fa-file-lines' : pub.status === 'submitted' ? 'fa-paper-plane' : 'fa-flask'}`} />
            </div>
            <div>
              <span className={`badge ${pub.status === 'published' ? 'badge-live' : 'badge-progress'}`} style={{ marginBottom: 8 }}>
                <i className={`fas ${pub.status === 'published' ? 'fa-check' : pub.status === 'submitted' ? 'fa-paper-plane' : 'fa-hourglass-half'}`} />{' '}
                {pub.status === 'published' ? 'Published' : pub.status === 'submitted' ? 'Submitted' : 'In progress'}
              </span>
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-meta">{pub.meta}</p>
              {pub.link && (
                <a href={pub.link} target="_blank" rel="noreferrer">
                  <i className="fas fa-arrow-up-right-from-square" /> {pub.linkLabel}
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
