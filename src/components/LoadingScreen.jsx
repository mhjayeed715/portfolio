import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UniqueLoading from '@/components/ui/morph-loading'

const loadingSteps = [
  'Initializing workspace...',
  'Compiling modules & assets...',
  'Calibrating motion physics...',
  'Welcome to Jayeed\'s Portfolio',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = Math.floor(Math.random() * 9) + 5
        return Math.min(prev + increment, 100)
      })
    }, 38)

    return () => clearInterval(interval)
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
