import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { openContactModal } from './ContactModal'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Achievements', href: '#achievements' },
]

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const lastScrollY = useRef(0)
  const accumulatedDelta = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const prevScrollY = lastScrollY.current
      const delta = currentScrollY - prevScrollY

      // Accumulate scroll direction delta for natural thresholding
      if ((delta > 0 && accumulatedDelta.current < 0) || (delta < 0 && accumulatedDelta.current > 0)) {
        accumulatedDelta.current = 0
      }
      accumulatedDelta.current += delta

      // Require meaningful directional scroll threshold:
      // Scrolling down by >= 15px -> shrink
      // Scrolling up by >= 25px OR near top (<= 70px) -> auto expand
      if (currentScrollY > 70 && accumulatedDelta.current > 15) {
        setIsCompact(true)
      } else if (currentScrollY <= 70 || accumulatedDelta.current < -25) {
        setIsCompact(false)
      }

      lastScrollY.current = currentScrollY

      // High-precision getBoundingClientRect() scroll spy
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      const scrollTriggerLine = window.innerHeight * 0.35
      let currentActive = ''

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= scrollTriggerLine && rect.bottom > scrollTriggerLine) {
            currentActive = sectionId
            break
          }
        }
      }

      if (currentActive) {
        setActiveSection(currentActive)
      } else if (currentScrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const sectionId = href.replace('#', '')
    setActiveSection(sectionId)
    const target = document.querySelector(href)
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -70, duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Capsule is compact only if scrolled down AND not currently hovered
  const shouldShrink = isCompact && !hovered

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 sm:top-5 inset-x-0 z-50 pointer-events-none"
    >
      {/* Single Flex Container wrapping both Navbar Pill and Theme Toggle */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 pointer-events-auto">
        
        {/* Left / Center — Floating Capsule Navbar */}
        <motion.nav
          layout
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.8 }}
          className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full liquid-glass transition-all duration-300 shadow-xl"
        >
          {/* Round Profile Picture + Name Pill */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 px-1.5 py-1 rounded-full hover:bg-foreground/5 dark:hover:bg-white/10 transition-colors cursor-pointer group shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/50 dark:border-white/20 shadow-xs bg-secondary shrink-0">
              <img
                src="/profile21.png"
                alt="Jayeed"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-foreground pr-0.5 sm:pr-1">
              Jayeed
            </span>
          </a>

          {/* Desktop Navigation Links — Smooth Calibrated Expand/Shrink */}
          <AnimatePresence>
            {!shouldShrink && (
              <motion.div
                initial={{ opacity: 0, width: 0, scale: 0.96 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.96 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex items-center gap-0.5 overflow-hidden whitespace-nowrap"
              >
                <span className="w-[1px] h-4 bg-foreground/15 dark:bg-white/15 mx-1 shrink-0" />

                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative px-3.5 py-1.5 text-xs font-medium transition-all duration-200 rounded-full cursor-pointer shrink-0 ${
                        isActive
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-foreground/10 dark:bg-white/10 rounded-full border border-foreground/10 dark:border-white/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  )
                })}

                <div className="pl-1.5 shrink-0">
                  <button
                    onClick={openContactModal}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full liquid-glass-btn font-semibold text-xs cursor-pointer"
                  >
                    <span>Get in Touch</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 sm:p-2 rounded-full text-foreground hover:bg-secondary cursor-pointer shrink-0"
            aria-label="Toggle navigation"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </motion.nav>

        {/* Right — Fixed 40x40 Theme Toggle Button */}
        <div className="shrink-0 flex items-center justify-center">
          <ThemeToggle />
        </div>

      </div>

      {/* Mobile Dropdown Drawer with Backdrop Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click-outside backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="pointer-events-auto fixed inset-0 bg-background/50 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Mobile Drawer Capsule */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto fixed top-18 left-4 right-4 z-50 md:hidden max-w-xs sm:max-w-sm mx-auto"
            >
              <div className="p-3 rounded-3xl liquid-glass shadow-2xl space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-medium rounded-2xl transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-foreground/10 dark:bg-white/10 text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-foreground" />}
                    </a>
                  )
                })}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setOpen(false)
                      openContactModal()
                    }}
                    className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-2xl liquid-glass-btn font-semibold text-xs sm:text-sm cursor-pointer"
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
