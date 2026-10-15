import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Screenshot viewer: crossfading slides, arrow keys, swipe, and a thumbnail strip.
export default function ShotCarousel({ shots = [], label }) {
  const [[index, dir], setState] = useState([0, 0])
  if (!shots.length) return null
  const go = (next) => {
    const n = (next + shots.length) % shots.length
    setState([n, next > index ? 1 : -1])
  }
  const shot = shots[index]

  return (
    <div
      className="shots"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
      }}
    >
      <div className="shots-stage">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1)
              else if (info.offset.x > 60) go(index - 1)
            }}
            draggable={false}
          />
        </AnimatePresence>
        <button className="shots-btn prev" onClick={() => go(index - 1)} aria-label="Previous screenshot"><i className="fas fa-chevron-left" aria-hidden="true" /></button>
        <button className="shots-btn next" onClick={() => go(index + 1)} aria-label="Next screenshot"><i className="fas fa-chevron-right" aria-hidden="true" /></button>
      </div>
      <div className="shots-foot">
        <p className="shots-caption" aria-live="polite">{shot.caption}</p>
        <div className="shots-thumbs">
          {shots.map((s, i) => (
            <button key={s.src} onClick={() => go(i)} aria-label={`Show screenshot ${i + 1} of ${shots.length}`} aria-current={i === index}>
              <img src={s.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
