import { useRef } from 'react'

// Subtle 3D tilt + glare-follow on mousemove. Pure CSS transform, no deps.
export default function useTilt(maxDeg = 6) {
  const ref = useRef(null)

  function onMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) translateY(-3px)`
    el.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return { ref, onMouseMove, onMouseLeave }
}
