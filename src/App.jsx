import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Philosophy from './components/Philosophy'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Fixed theme toggle - top right corner */}
      <div className="fixed top-[1.125rem] right-14 md:right-6 z-[60]">
        <ThemeToggle />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Philosophy />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
