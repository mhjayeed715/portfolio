import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileDown, Terminal } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/* Animated counting number */
function AnimatedCounter({ target, duration = 2 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, target, { duration, ease: 'easeOut' })
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [target, count, duration, rounded])

  return <span>{display}</span>
}

/* Typewriter hook */
function useTypewriter(texts, typingSpeed = 70, deletingSpeed = 40, pauseTime = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex(charIndex - 1)
        setDisplayed(current.slice(0, charIndex - 1))
      }, deletingSpeed)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayed
}

const heroStats = [
  { value: 8, suffix: '+', label: 'Projects' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 3, suffix: '+', label: 'Years Coding' },
]

const roles = [
  'Full-Stack Developer',
  'Mobile MVP Architect',
  'React & Flutter Specialist',
  'AI-Assisted Engineer',
]

export default function Hero() {
  const typedRole = useTypewriter(roles)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const visualRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!visualRef.current) return
    const rect = visualRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x: x * 6, y: y * 6 })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center hero-grid overflow-hidden pt-20 sm:pt-28 pb-12 sm:pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-foreground/[0.02] dark:bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[550px] h-[550px] bg-foreground/[0.02] dark:bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Text & CTAs */}
          <div>
            {/* Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-border bg-secondary/80 mb-3 sm:mb-5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-medium text-foreground">
                Available for opportunities
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] sm:leading-[1.08] mb-3 sm:mb-4 text-foreground"
            >
              Building <span className="gradient-text">Scalable Software</span> & Mobile MVPs.
            </motion.h1>

            {/* Typewriter role — Locked height to guarantee zero layout shift */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-4 sm:mb-5 font-mono text-sm sm:text-base md:text-lg text-foreground/85 font-medium h-7 sm:h-8"
            >
              <Terminal size={16} className="shrink-0 text-muted-foreground" />
              <span className="whitespace-nowrap overflow-visible">{typedRole}</span>
              <span className="inline-block w-2 h-4 sm:h-5 bg-foreground animate-pulse shrink-0" />
            </motion.div>

            {/* Subtext description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs sm:text-base text-muted-foreground leading-relaxed max-w-lg mb-5 sm:mb-8"
            >
              I turn early-stage ideas into dependable iOS, Android, and web products that are clear to use, robust to build, and ready to launch.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-10"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.querySelector('#projects')
                  if (el) window.lenis ? window.lenis.scrollTo(el, { offset: -70 }) : el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm hover:opacity-90 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Explore Projects</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href="/SM_Mehrab_Hossain_Jayeed_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-border bg-card/70 backdrop-blur-md text-foreground font-medium text-xs sm:text-sm hover:bg-secondary transition-all duration-200 cursor-pointer"
              >
                <FileDown size={14} />
                <span>Resume</span>
              </a>

              <div className="flex items-center gap-1.5 ml-0.5">
                <a
                  href="https://github.com/mhjayeed715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/70 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/mhjayeed715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/70 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </motion.div>

            {/* Realistic metrics bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border/60 max-w-sm sm:max-w-md"
            >
              {heroStats.map((stat, i) => (
                <div key={stat.label} className="text-left">
                  <p className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    <AnimatedCounter target={stat.value} duration={1.8 + i * 0.2} />
                    <span className="text-muted-foreground font-normal">{stat.suffix}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Circular Reference Frame with profile21.png */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-end justify-center mt-2 lg:mt-0"
          >
            <div
              ref={visualRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative transition-transform duration-300 p-2 flex flex-col items-center lg:items-start"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
              }}
            >
              {/* Circular Avatar Container with Offset Shadow Disc */}
              <div className="relative w-52 h-52 sm:w-68 sm:h-68 lg:w-80 lg:h-80">
                {/* Circular Offset Solid Shadow Disc */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-2.5 sm:translate-y-2.5 rounded-full bg-zinc-900/90 dark:bg-zinc-800 border border-zinc-950/20 dark:border-white/10" />

                {/* Main Circular Portrait Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-card border-2 border-foreground dark:border-white shadow-xl">
                  {/* Colorful Portrait of Jayeed (profile21.png) */}
                  <img
                    src="/profile21.png"
                    alt="S. M. Mehrab Hossain Jayeed"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Top-Left Overlapping Badge (Rounded Pill) */}
                <div className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-2 z-10 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-background border border-foreground dark:border-white text-foreground text-[10px] sm:text-xs font-mono font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,0.9)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] select-none">
                  <span>Building interpretably</span>
                </div>
              </div>

              {/* Text Block clearly separated below the circular photo (No Overlap) */}
              <div className="mt-5 sm:mt-8 text-center lg:text-left w-full">
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground tracking-tight">
                  S. M. Mehrab Hossain Jayeed
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-muted-foreground mt-1">
                  Full-Stack & Mobile Engineer &rarr; React & Flutter
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 sm:mt-14 flex justify-center">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#projects')
              if (el) window.lenis ? window.lenis.scrollTo(el, { offset: -70 }) : el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Scroll to Projects section"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  )
}
