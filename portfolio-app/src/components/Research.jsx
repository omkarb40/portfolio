import { publications } from '../data/portfolio'
import SectionHead from './SectionHead'

export default function Research() {
  return (
    <section className="section" id="research">
      <div className="wrap">
        <SectionHead title="Research" lede="Applied machine learning for sustainability and supply chains." />
        <ol className="pubs">
          {publications.map((p) => (
            <li key={p.status} className="pub">
              <span className={`pub-status ${p.status.toLowerCase()}`}>{p.status}</span>
              <div>
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-venue">{p.venue}</p>
                <p className="pub-detail">{p.detail}</p>
                {p.link && <a className="text-link" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel}</a>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
