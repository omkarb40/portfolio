import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ablation } from '../data/portfolio'

export default function AblationChart() {
  const [key, setKey] = useState('grounded')
  const m = ablation.metrics.find((x) => x.key === key)
  const best = m.better === 'higher' ? Math.max(...m.values) : Math.min(...m.values)

  return (
    <div className="lab">
      <div className="lab-head">
        <h3>The ablation, five configurations</h3>
        <p>Same 85 questions, one change at a time. Switch metrics to see why groundedness alone is misleading.</p>
      </div>
      <div className="seg" role="tablist" aria-label="Metric">
        {ablation.metrics.map((x) => (
          <button key={x.key} role="tab" aria-selected={x.key === key} className={x.key === key ? 'on' : ''} onClick={() => setKey(x.key)}>
            {x.key === key && <motion.span className="seg-pill" layoutId="seg-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span>{x.label}</span>
          </button>
        ))}
      </div>
      <div className="bars" role="table" aria-label={`${m.label} by configuration`}>
        {ablation.configs.map((cfg, i) => {
          const val = m.values[i]
          const isBest = val === best
          return (
            <div className="bar-row" role="row" key={cfg}>
              <span className="bar-label" role="rowheader">{cfg}</span>
              <div className="bar-track" role="cell">
                <motion.div
                  className={`bar-fill ${m.key} ${isBest ? 'best' : ''}`}
                  initial={false}
                  animate={{ width: `${val * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.04 }}
                />
              </div>
              <span className="bar-val num" role="cell">{val.toFixed(3)}</span>
            </div>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={key} className="lab-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{m.note}</motion.p>
      </AnimatePresence>
    </div>
  )
}
