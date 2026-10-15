import { useEffect, useState } from 'react'
import BackgroundFx from './components/BackgroundFx'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import About from './components/About'
import Publications from './components/Publications'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Writing from './components/Writing'
import SkillsEducation from './components/SkillsEducation'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    function handleKey(e) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (isCmdK) {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <BackgroundFx />
      <ScrollProgress />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main>
        <Hero />
        <About />
        <Publications />
        <Projects />
        <Experience />
        <Writing />
        <SkillsEducation />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
