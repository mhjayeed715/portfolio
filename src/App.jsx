import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Sparkles } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
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
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminGuard from './components/admin/AdminGuard'

function ResumeRedirect() {
  const { settings, isLoading } = usePortfolio()

  useEffect(() => {
    if (!isLoading) {
      const targetUrl =
        settings?.resumeUrl && settings.resumeUrl !== '/resume' && settings.resumeUrl !== '#'
          ? settings.resumeUrl
          : '/SM_Mehrab_Hossain_Jayeed_Resume.pdf'
      window.location.replace(targetUrl)
    }
  }, [settings?.resumeUrl, isLoading])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3 font-mono text-xs text-muted-foreground">
      <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
      <p>Loading resume...</p>
    </div>
  )
}

function PublicPortfolio() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [isMinimalMode, setIsMinimalMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Clear any legacy localStorage that cached 'full' during testing
      localStorage.removeItem('portfolio_view_mode')
      const sessionSaved = sessionStorage.getItem('portfolio_view_mode')
      if (sessionSaved) {
        return sessionSaved === 'minimal'
      }
      // Unconditionally default to Minimal Mode for all visitors
      return true
    }
    return true
  })

  const toggleMinimalMode = () => {
    setIsMinimalMode((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('portfolio_view_mode', next ? 'minimal' : 'full')
      }
      return next
    })
  }

  // Recalculate Lenis scroll dimensions and GSAP ScrollTrigger whenever sections toggle
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.resize()
      }
      ScrollTrigger.refresh()
    }, 400)
    return () => clearTimeout(timer)
  }, [isMinimalMode])

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

  const handleLoadingComplete = () => {
    setLoadingComplete(true)
    if (window.lenis) {
      window.lenis.start()
      window.lenis.resize()
    }
    // Refresh ScrollTrigger so all section positions reflect loaded asset heights
    ScrollTrigger.refresh()
  }

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <SmoothScroll>
        <div className="bg-background text-foreground min-h-screen flex flex-col selection:bg-primary/20 selection:text-foreground">
          <Navbar isMinimalMode={isMinimalMode} onToggleMinimalMode={toggleMinimalMode} />
          <main className="flex-1">
            <Hero isMinimalMode={isMinimalMode} onToggleMinimalMode={toggleMinimalMode} />
            <About />
            <Projects />

            {/* In Minimal / Recruiter mode: Skills, Achievements, Philosophy, and Education are collapsed */}
            <AnimatePresence>
              {!isMinimalMode && (
                <motion.div
                  key="skills-section"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <Skills />
                </motion.div>
              )}
            </AnimatePresence>

            <Services />

            <AnimatePresence>
              {!isMinimalMode && (
                <motion.div
                  key="detailed-sections"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <Achievements />
                  <Philosophy />
                  <Education />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Switcher Banner between Services and Contact when Minimal Mode is active */}
            <AnimatePresence>
              {isMinimalMode && (
                <motion.div
                  key="recruiter-banner"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-4xl mx-auto px-6 pt-6 pb-12"
                >
                  <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center shrink-0 text-foreground border border-border/60">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          Minimal Mode Active (Showing About · Work · Services · Contact)
                        </p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground font-mono mt-0.5">
                          Looking for Skills breakdown, 2nd Place Awards, Philosophy & Education?
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleMinimalMode}
                      className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity shrink-0 cursor-pointer shadow-xs"
                    >
                      <Sparkles size={13} />
                      <span>Show Full 9 Sections</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
          <ContactModal />
        </div>
      </SmoothScroll>
    </>
  )
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicPortfolio />} />
          <Route path="/resume" element={<ResumeRedirect />} />
          <Route path="/resume.pdf" element={<ResumeRedirect />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  )
}
