import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to `target` once the element scrolls into view.
// Cleans up its rAF loop on unmount so it can never write to a stale node:
// this is the pattern that avoids the "leftover text" bug from the vanilla-JS version.
export default function useCountUp(target, { duration = 1200, suffix = '' } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame
    let started = false

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started) return
          started = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(target * eased))
            if (progress < 1) frame = requestAnimationFrame(tick)
          }
          frame = requestAnimationFrame(tick)
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target, duration])

  return [ref, `${value}${suffix}`]
}
