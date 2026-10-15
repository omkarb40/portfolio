import { articles, profile } from '../data/portfolio'
import Reveal from './Reveal'

export default function Writing() {
  return (
    <section className="section" id="writing">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// writing</div>
          <h2>Articles &amp; Insights</h2>
          <p>Technical deep dives and research lessons, published on Medium.</p>
        </Reveal>
        <div className="article-grid">
          {articles.map((a) => (
            <Reveal as="div" className="article-card" key={a.title}>
              <h5>{a.title}</h5>
              <p>{a.desc}</p>
              <a href={a.link} target="_blank" rel="noreferrer"><i className="fab fa-medium" /> Read article</a>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <a className="btn btn-ghost" href={profile.medium} target="_blank" rel="noreferrer">
            View all articles <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  )
}
