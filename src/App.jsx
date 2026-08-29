import { useState, useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Services from './components/Services'
import Achievements from './components/Achievements'
import Philosophy from './components/Philosophy'
import Education from './components/Education'
import Contact from './components/Contact'
import ContactModal from './components/ContactModal'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  // Global cursor-following glow for all .glow-card elements via event delegation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.target.closest('.glow-card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
      card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <SmoothScroll>
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      <div className="bg-background text-foreground min-h-screen flex flex-col selection:bg-primary/20 selection:text-foreground">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Services />
          <Achievements />
          <Philosophy />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <ContactModal />
      </div>
    </SmoothScroll>
  )
}
