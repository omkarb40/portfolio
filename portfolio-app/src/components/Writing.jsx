import { articles, profile } from '../data/portfolio'
import SectionHead from './SectionHead'

export default function Writing() {
  return (
    <section className="section" id="writing">
      <div className="wrap">
        <SectionHead title="Writing" lede="Notes from building and breaking models, published on Medium." />
        <ul className="articles">
          {articles.map((a) => (
            <li key={a.title}>
              <a href={a.link} target="_blank" rel="noreferrer">
                <span className="article-title">{a.title}</span>
                <span className="article-desc">{a.desc}</span>
                <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <a className="text-link" href={profile.medium} target="_blank" rel="noreferrer">All articles on Medium</a>
      </div>
    </section>
  )
}
