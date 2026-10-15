import { useEffect, useRef, useState } from 'react'

// Live k-means on synthetic data, drawn on a canvas behind the hero.
// One Lloyd iteration runs every STEP_MS: points are assigned to the nearest
// centroid, then each centroid glides to the mean of its points. When it
// converges, the data re-scatters into new blobs and it starts again.
// Click to drop a new centroid. Respects prefers-reduced-motion.

const COLORS = ['#3ddbb5', '#8b9cff', '#f2b950', '#f2706b', '#c79bff', '#6cc6ff', '#a6e07a']
const N = 340
const STEP_MS = 650
const MAX_K = 7

function gauss() {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function makeTargets(blobs = 3 + Math.floor(Math.random() * 3)) {
  // Blob centres biased to the right half so the headline stays readable.
  const centres = Array.from({ length: blobs }, () => ({
    x: 0.42 + Math.random() * 0.52,
    y: 0.14 + Math.random() * 0.72,
    s: 0.035 + Math.random() * 0.045,
  }))
  return Array.from({ length: N }, (_, i) => {
    const c = centres[i % blobs]
    return { x: c.x + gauss() * c.s, y: c.y + gauss() * c.s * 1.2 }
  })
}

function randomCentroids(k) {
  return Array.from({ length: k }, (_, i) => ({
    x: 0.35 + Math.random() * 0.6,
    y: 0.1 + Math.random() * 0.8,
    tx: 0, ty: 0, color: COLORS[i % COLORS.length],
  })).map((c) => ({ ...c, tx: c.x, ty: c.y }))
}

export default function HeroField({ onStats }) {
  const canvasRef = useRef(null)
  const state = useRef(null)
  const [hint, setHint] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, lastStep = 0, settledAt = 0

    const targets = makeTargets()
    const s = {
      pts: targets.map((t) => ({ x: t.x + gauss() * 0.3, y: t.y + gauss() * 0.3, tx: t.x, ty: t.y, c: -1, col: [120, 130, 160] })),
      cents: randomCentroids(4),
      iter: 0,
      inertia: 0,
      mouse: { x: -1, y: -1 },
      converged: false,
    }
    state.current = s

    function resize() {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function hexToRgb(hex) {
      const n = parseInt(hex.slice(1), 16)
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    }

    function lloyd() {
      // Assignment (in screen-aspect space so clusters look round)
      const ar = w / h || 1
      let inertia = 0
      const sums = s.cents.map(() => ({ x: 0, y: 0, n: 0 }))
      for (const p of s.pts) {
        let best = 0, bd = Infinity
        s.cents.forEach((c, i) => {
          const dx = (p.tx - c.tx) * ar, dy = p.ty - c.ty
          const d = dx * dx + dy * dy
          if (d < bd) { bd = d; best = i }
        })
        p.c = best
        inertia += bd
        sums[best].x += p.tx; sums[best].y += p.ty; sums[best].n++
      }
      // Update
      let moved = 0
      s.cents.forEach((c, i) => {
        if (!sums[i].n) return
        const nx = sums[i].x / sums[i].n, ny = sums[i].y / sums[i].n
        moved += Math.abs(nx - c.tx) + Math.abs(ny - c.ty)
        c.tx = nx; c.ty = ny
      })
      s.iter++
      s.inertia = inertia * 1000
      s.converged = moved < 0.0015
      onStats?.({ k: s.cents.length, iter: s.iter, inertia: s.inertia, converged: s.converged })
    }

    function rescatter() {
      const t = makeTargets()
      s.pts.forEach((p, i) => { p.tx = t[i].x; p.ty = t[i].y })
      s.cents = randomCentroids(3 + Math.floor(Math.random() * 3))
      s.iter = 0
      s.converged = false
      settledAt = 0
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h)
      const ease = reduce ? 1 : 0.08
      // move points and centroids toward targets
      for (const p of s.pts) {
        p.x += (p.tx - p.x) * ease
        p.y += (p.ty - p.y) * ease
        // cursor repulsion
        if (s.mouse.x >= 0) {
          const dx = p.x * w - s.mouse.x, dy = p.y * h - s.mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 9000) {
            const f = (1 - d2 / 9000) * 6
            const d = Math.sqrt(d2) || 1
            p.x += (dx / d) * f / w
            p.y += (dy / d) * f / h
          }
        }
        const target = p.c >= 0 && s.cents[p.c] ? hexToRgb(s.cents[p.c].color) : [120, 130, 160]
        p.col = p.col.map((v, i) => v + (target[i] - v) * 0.1)
      }
      for (const c of s.cents) {
        c.x += (c.tx - c.x) * (reduce ? 1 : 0.12)
        c.y += (c.ty - c.y) * (reduce ? 1 : 0.12)
      }

      // assignment lines
      ctx.lineWidth = 1
      for (const p of s.pts) {
        const c = s.cents[p.c]
        if (!c) continue
        ctx.strokeStyle = `rgba(${p.col[0] | 0},${p.col[1] | 0},${p.col[2] | 0},0.07)`
        ctx.beginPath(); ctx.moveTo(p.x * w, p.y * h); ctx.lineTo(c.x * w, c.y * h); ctx.stroke()
      }
      // points
      for (const p of s.pts) {
        ctx.fillStyle = `rgba(${p.col[0] | 0},${p.col[1] | 0},${p.col[2] | 0},0.85)`
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 2.1, 0, Math.PI * 2); ctx.fill()
      }
      // centroids
      for (const c of s.cents) {
        const x = c.x * w, y = c.y * h
        ctx.strokeStyle = c.color; ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(x - 7, y - 7); ctx.lineTo(x + 7, y + 7); ctx.moveTo(x + 7, y - 7); ctx.lineTo(x - 7, y + 7); ctx.stroke()
        ctx.globalAlpha = 0.18
        ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = 1
      }

      if (!reduce) {
        if (now - lastStep > STEP_MS) {
          lastStep = now
          if (!s.converged) lloyd()
          else if (!settledAt) settledAt = now
        }
        if (settledAt && now - settledAt > 3200) rescatter()
      }
    }

    function loop(now) {
      if (visible && !document.hidden) draw(now)
      raf = requestAnimationFrame(loop)
    }

    resize()
    if (reduce) {
      for (let i = 0; i < 30 && !s.converged; i++) lloyd()
      s.pts.forEach((p) => { p.x = p.tx; p.y = p.ty })
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      s.mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    function onLeave() { s.mouse = { x: -1, y: -1 } }
    function onClick(e) {
      if (e.target.closest('a, button, input, textarea')) return
      const r = canvas.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      if (y < 0 || y > 1) return
      if (s.cents.length >= MAX_K) s.cents.shift()
      const used = new Set(s.cents.map((c) => c.color))
      const color = COLORS.find((c) => !used.has(c)) || COLORS[0]
      s.cents.push({ x, y, tx: x, ty: y, color })
      s.converged = false; s.iter = 0; settledAt = 0
      setHint(false)
      if (reduce) { for (let i = 0; i < 30 && !s.converged; i++) lloyd(); draw(0) }
    }
    const host = canvas.parentElement
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('click', onClick)
    }
  }, [onStats])

  return (
    <>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      {hint && <span className="sr-only">Background animation: live k-means clustering. Click to add a centroid.</span>}
    </>
  )
}
