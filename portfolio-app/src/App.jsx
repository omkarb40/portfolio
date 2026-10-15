import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import Work from './components/Work'
import Research from './components/Research'
import Timeline from './components/Timeline'
import SkillsExplorer from './components/SkillsExplorer'
import Writing from './components/Writing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Smooth scrolling, skipped for people who ask for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -64 }, lerp: 0.12 })
    window.__lenis = lenis
    return () => { lenis.destroy(); window.__lenis = undefined }
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#work">Skip to work</a>
      <ScrollProgress />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main>
        <Hero />
        <Work />
        <Research />
        <Timeline />
        <SkillsExplorer />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
