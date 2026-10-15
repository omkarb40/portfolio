import { motion } from 'motion/react'

// Section titles rise into place once, the first time they scroll into view.
export default function SectionHead({ title, lede }) {
  return (
    <div className="section-head">
      <h2 className="line-mask">
        <motion.span className="line" initial={{ y: '105%' }} whileInView={{ y: '0%' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {title}
        </motion.span>
      </h2>
      {lede && <p>{lede}</p>}
    </div>
  )
}
