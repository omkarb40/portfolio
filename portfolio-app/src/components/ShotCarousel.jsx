import { useRef, useState, useEffect, useCallback } from 'react'

// Screenshot carousel for a project card. Renders nothing if there are no shots.
// Native scroll-snap does the sliding, so swipe on mobile and trackpad scroll work for free.
export default function ShotCarousel({ shots = [], label }) {
  const track = useRef(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback((i) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(shots.length - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }, [shots.length])

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (!shots.length) return null

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1) }
  }

  return (
    <div className="shots" role="region" aria-roledescription="carousel" aria-label={label || 'Project screenshots'}>
      <div className="shots-track" ref={track} tabIndex={0} onKeyDown={onKey}>
        {shots.map((s, i) => (
          <figure className="shot" key={s.src} aria-label={`${i + 1} of ${shots.length}`}>
            <img src={s.src} alt={s.alt || s.caption || ''} loading="lazy" />
            {s.caption && <figcaption>{s.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {shots.length > 1 && (
        <>
          <button className="shots-btn prev" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous screenshot">
            <i className="fas fa-chevron-left" />
          </button>
          <button className="shots-btn next" onClick={() => goTo(index + 1)} disabled={index === shots.length - 1} aria-label="Next screenshot">
            <i className="fas fa-chevron-right" />
          </button>
          <div className="shots-dots">
            {shots.map((s, i) => (
              <button key={s.src} className={i === index ? 'on' : ''} onClick={() => goTo(i)} aria-label={`Go to screenshot ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
