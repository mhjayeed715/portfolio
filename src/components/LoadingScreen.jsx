import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UniqueLoading from '@/components/ui/morph-loading'

const loadingSteps = [
  'Initializing workspace...',
  'Compiling modules & assets...',
  'Calibrating motion physics...',
  'Welcome to Jayeed\'s Portfolio',
]

// Critical visible/above-the-fold assets that must be preloaded & decoded
const CRITICAL_ASSETS = [
  '/profile21.png',
  '/projects/unisharesync_mobile.png',
  '/education/shanto-mariam.svg',
]

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    if (img.complete) {
      if ('decode' in img) {
        img.decode().then(resolve).catch(resolve)
      } else {
        resolve()
      }
    } else {
      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(resolve).catch(resolve)
        } else {
          resolve()
        }
      }
      img.onerror = resolve
    }
  })
}

function waitForDomImages() {
  const images = Array.from(document.querySelectorAll('img'))
  if (images.length === 0) return Promise.resolve()
  return Promise.all(
    images.map((img) => {
      if (img.complete) {
        return 'decode' in img ? img.decode().catch(() => {}) : Promise.resolve()
      }
      return new Promise((res) => {
        img.addEventListener('load', () => {
          if ('decode' in img) img.decode().catch(() => {}).then(res)
          else res()
        }, { once: true })
        img.addEventListener('error', res, { once: true })
      })
    })
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const allLoadedRef = useRef(false)

  useEffect(() => {
    // 1. Lock body scrolling and pause Lenis while loading
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (window.lenis) window.lenis.stop()

    // 2. Track real loading milestones
    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', resolve, { once: true })
      }
    })

    const fontsPromise = document.fonts && document.fonts.ready
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve()

    const criticalAssetsPromise = Promise.all(CRITICAL_ASSETS.map(preloadImage))
    const domImagesPromise = waitForDomImages()

    // Pacing: minimum 1.2s to experience UI smoothly, safety timeout 5.5s
    const minTimePromise = new Promise((res) => setTimeout(res, 1200))
    const safetyTimeoutPromise = new Promise((res) => setTimeout(res, 5500))

    const realLoadPromise = Promise.all([
      windowLoadPromise,
      fontsPromise,
      criticalAssetsPromise,
      domImagesPromise,
      minTimePromise,
    ])

    let isMounted = true

    Promise.race([realLoadPromise, safetyTimeoutPromise]).then(() => {
      if (isMounted) {
        allLoadedRef.current = true
      }
    })

    // 3. Smooth animated progress loop
    let currentVal = 0
    const interval = setInterval(() => {
      if (!isMounted) return

      if (!allLoadedRef.current) {
        // Smoothly approach 88% while assets load
        if (currentVal < 88) {
          const step = Math.max(1, Math.floor((88 - currentVal) * 0.14))
          currentVal = Math.min(88, currentVal + step)
          setProgress(currentVal)
        }
      } else {
        // Once all assets, window.onload, and fonts are confirmed ready:
        if (currentVal < 100) {
          const step = Math.max(2, Math.floor((100 - currentVal) * 0.35) + 3)
          currentVal = Math.min(100, currentVal + step)
          setProgress(currentVal)
        } else {
          clearInterval(interval)
        }
      }
    }, 28)

    return () => {
      isMounted = false
      clearInterval(interval)
      document.body.style.overflow = originalOverflow
      if (window.lenis) {
        window.lenis.start()
        window.lenis.resize()
      }
    }
  }, [])

  useEffect(() => {
    if (progress < 30) setStepIndex(0)
    else if (progress < 65) setStepIndex(1)
    else if (progress < 95) setStepIndex(2)
    else setStepIndex(3)

    if (progress === 100 && !isFinished) {
      const timer = setTimeout(() => {
        setIsFinished(true)
        if (onComplete) onComplete()
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [progress, isFinished, onComplete])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: { duration: 0.65, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 w-screen h-[100dvh] z-[100] grid place-items-center p-6 bg-background text-foreground select-none overflow-hidden"
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-foreground/[0.03] dark:bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-xs sm:max-w-sm flex flex-col items-center justify-center text-center my-auto">
            {/* Morph Loader Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="mb-6 flex items-center justify-center"
            >
              <div className="p-5 rounded-2xl glass-panel shadow-2xl border border-border/80 flex items-center justify-center">
                <UniqueLoading variant="morph" size="sm" />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="mb-5"
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                <span>Jayeed</span>
                <span className="text-muted-foreground">.</span>
              </h1>
              <p className="text-[11px] sm:text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] mt-1">
                Full-Stack & Mobile Engineer
              </p>
            </motion.div>

            {/* Status Step text */}
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="h-5 flex items-center justify-center text-xs font-mono text-muted-foreground mb-3 text-center"
            >
              {loadingSteps[stepIndex]}
            </motion.div>

            {/* Progress bar container */}
            <div className="w-full max-w-[220px] sm:max-w-[260px]">
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden p-[1px] border border-border/70">
                <motion.div
                  className="h-full bg-foreground rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground mt-2 px-0.5">
                <span>SYSTEM_READY</span>
                <span className="font-semibold text-foreground">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
