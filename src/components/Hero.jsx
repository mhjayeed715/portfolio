import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowDown, ExternalLink, MapPin, FileDown, Sparkles } from 'lucide-react'
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
    return () => { controls.stop(); unsub() }
  }, [target])

  return <span>{display}</span>
}

/* Typewriter hook */
function useTypewriter(texts, typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
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
  }, [charIndex, isDeleting, textIndex, texts])

  return displayed
}

/* Floating particle component */
function FloatingParticle({ delay, x, y, size, duration }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20 pointer-events-none"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

const heroStats = [
  { value: 5, suffix: '+', label: 'Projects' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 3, suffix: '+', label: 'Years Coding' },
]

const roles = [
  'Full-Stack Developer',
  'React Specialist',
  'Mobile App Developer',
]

export default function Hero() {
  const typedRole = useTypewriter(roles, 80, 40, 2200)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center hero-grid overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-20 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, -20, 30, 0],
          y: [0, -30, 40, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -right-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -40, 30, -20, 0],
          y: [0, 30, -40, 20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="20%" size={6} duration={7} />
      <FloatingParticle delay={1} x="80%" y="15%" size={4} duration={9} />
      <FloatingParticle delay={2} x="70%" y="70%" size={8} duration={11} />
      <FloatingParticle delay={0.5} x="20%" y="75%" size={5} duration={8} />
      <FloatingParticle delay={1.5} x="50%" y="10%" size={3} duration={10} />
      <FloatingParticle delay={3} x="90%" y="50%" size={6} duration={12} />

      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-32 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">Available for opportunities</span>
            </motion.div>

            {/* Full Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-3"
            >
              S. M. Mehrab Hossain Jayeed
            </motion.p>

            {/* Animated Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-3"
            >
              {'I Build Things'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.04,
                    type: 'spring',
                    stiffness: 150,
                    damping: 12,
                  }}
                  className={char === ' ' ? '' : ''}
                  style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : undefined }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              <span className="gradient-text">
                {'For The Web'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + i * 0.04,
                      type: 'spring',
                      stiffness: 150,
                      damping: 12,
                    }}
                    style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : undefined }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center gap-2 mb-2"
            >
              <Sparkles size={16} className="text-primary" />
              <p className="text-xl sm:text-2xl font-medium text-foreground/80 font-display">
                {typedRole}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-[2px] h-6 bg-primary ml-0.5 align-middle"
                />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="flex items-center gap-2 text-muted-foreground mb-6"
            >
              <MapPin size={15} />
              <span className="text-sm">Dhaka, Bangladesh</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-base text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              I build <strong className="text-foreground font-medium">scalable web & mobile applications</strong> using
              React, Node.js, and modern AI-assisted workflows. Specializing in clean architecture,
              performance optimization, and rapid MVP delivery.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25"
              >
                <ExternalLink size={15} />
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
              >
                Hire Me
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
              >
                <FileDown size={15} />
                Resume
              </motion.a>
            </motion.div>

            {/* Mini stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex items-center gap-6 mb-6"
            >
              {heroStats.map((s, i) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl font-bold gradient-text">
                    <AnimatedCounter target={s.value} duration={2 + i * 0.3} />{s.suffix}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="flex items-center gap-4"
            >
              <motion.a
                href="https://github.com/mhjayeed715"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/mhjayeed715"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </motion.a>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-3">
                {['react', 'nodejs', 'typescript', 'tailwindcss', 'postgresql'].map((t, i) => (
                  <motion.img
                    key={t}
                    src={`/icons/${t}-original.svg`}
                    alt={t}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ delay: 2 + i * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ opacity: 1, scale: 1.3, y: -3 }}
                    className="w-5 h-5 transition-opacity duration-300"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Profile photo with animated effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 80 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated rotating gradient ring */}
              <motion.div
                className="absolute -inset-5 rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, var(--color-primary), var(--color-accent), transparent)',
                  opacity: 0.2,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulsing outer ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-primary/20 pointer-events-none"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Decorative blurred ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-xl pointer-events-none" />

              {/* Photo with parallax */}
              <motion.div
                style={{
                  x: mousePos.x * 0.5,
                  y: mousePos.y * 0.5,
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-border shadow-2xl shadow-primary/10"
              >
                <img
                  src="/profile2.png"
                  alt="S. M. Mehrab Hossain Jayeed"
                  className="w-full h-full object-cover"
                />
                {/* Subtle shine overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* Orbiting tech icon */}
              <motion.div
                className="absolute w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center"
                style={{ top: '5%', right: '-5%' }}
                animate={{
                  y: [0, -10, 0, 10, 0],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src="/icons/react-original.svg" alt="React" className="w-5 h-5" />
              </motion.div>

              <motion.div
                className="absolute w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center"
                style={{ bottom: '10%', left: '-8%' }}
                animate={{
                  y: [0, 10, 0, -10, 0],
                  rotate: [0, -10, 0, 10, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <img src="/icons/nodejs-original.svg" alt="Node.js" className="w-5 h-5" />
              </motion.div>

              <motion.div
                className="absolute w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center"
                style={{ bottom: '-3%', right: '15%' }}
                animate={{
                  y: [0, -8, 0, 8, 0],
                  x: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              >
                <img src="/icons/typescript-original.svg" alt="TypeScript" className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}
