import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { guardPresets } from '../data/portfolio'

// The real Refusal Guard formula from the PharmaRAG repo:
//   retrieval = min(avg_fused / 0.015, 1), count = min(chunks / 5, 1)
//   confidence = 0.25 * retrieval + 0.55 * groundedness + 0.20 * count
//   >= 0.65 answer, >= 0.45 answer with caution, otherwise refuse
function decide(fused, grounded, chunks) {
  const r = Math.min(fused / 0.015, 1)
  const n = Math.min(chunks / 5, 1)
  const c = 0.25 * r + 0.55 * grounded + 0.2 * n
  const d = c >= 0.65 ? 'answer' : c >= 0.45 ? 'caution' : 'refuse'
  return { r, n, c, d }
}
const LABEL = { answer: 'Answer', caution: 'Answer with caution', refuse: 'Refuse: insufficient evidence' }

export default function GuardLab() {
  const [preset, setPreset] = useState(guardPresets[1])
  const [v, setV] = useState({ fused: preset.fused, grounded: preset.grounded, chunks: preset.chunks })
  const { r, n, c, d } = decide(v.fused, v.grounded, v.chunks)
  const touched = v.fused !== preset.fused || v.grounded !== preset.grounded || v.chunks !== preset.chunks
  const wrong = !touched && preset.expected === 'refuse' && d !== 'refuse'

  function pick(p) { setPreset(p); setV({ fused: p.fused, grounded: p.grounded, chunks: p.chunks }) }

  return (
    <div className="lab">
      <div className="lab-head">
        <h3>Try the Refusal Guard</h3>
        <p>This is the formula PharmaRAG runs on every answer. Pick a question, or move the inputs, and watch the decision change.</p>
      </div>

      <div className="preset-row" role="group" aria-label="Example questions">
        {guardPresets.map((p) => (
          <button key={p.id} className={`preset ${preset.id === p.id ? 'on' : ''}`} onClick={() => pick(p)} aria-pressed={preset.id === p.id}>
            <span className="preset-q">{p.label}</span>
            <span className="preset-kind">{p.kind}</span>
          </button>
        ))}
      </div>

      <div className="sliders">
        <Slider label="Retrieval score (avg fused)" value={v.fused} min={0} max={0.02} step={0.0005} fmt={(x) => x.toFixed(4)} part={`${(0.25 * r).toFixed(2)}`} onChange={(x) => setV({ ...v, fused: x })} />
        <Slider label="Groundedness" value={v.grounded} min={0} max={1} step={0.01} fmt={(x) => x.toFixed(2)} part={`${(0.55 * v.grounded).toFixed(2)}`} onChange={(x) => setV({ ...v, grounded: x })} />
        <Slider label="Chunks retrieved" value={v.chunks} min={0} max={5} step={1} fmt={(x) => String(x)} part={`${(0.2 * n).toFixed(2)}`} onChange={(x) => setV({ ...v, chunks: x })} />
      </div>

      <div className="meter" aria-hidden="true">
        <motion.div className={`meter-fill ${d}`} animate={{ width: `${Math.min(c, 1) * 100}%` }} transition={{ type: 'spring', stiffness: 160, damping: 22 }} />
        <span className="tick" style={{ left: '45%' }}><b>0.45</b></span>
        <span className="tick" style={{ left: '65%' }}><b>0.65</b></span>
      </div>

      <div className="verdict-row" aria-live="polite">
        <span className="conf num">confidence {c.toFixed(2)}</span>
        <AnimatePresence mode="wait">
          <motion.span key={d} className={`verdict ${d}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {LABEL[d]}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={preset.id + String(touched)} className={`lab-note ${wrong ? 'warn' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {touched ? 'You changed the inputs. The thresholds are fixed at 0.45 and 0.65, exactly as in the repo.' : preset.note}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function Slider({ label, value, min, max, step, fmt, part, onChange }) {
  const id = label.replace(/\W+/g, '-').toLowerCase()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="slider">
      <div className="slider-top">
        <label htmlFor={id}>{label}</label>
        <span className="num">{fmt(value)} <span className="part">+{part}</span></span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ '--pct': `${pct}%` }} />
    </div>
  )
}
