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
        // Accelerate smoothly
        const increment = Math.floor(Math.random() * 8) + 4
        return Math.min(prev + increment, 100)
      })
    }, 40)

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
      }, 400)
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
            transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden"
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/[0.03] dark:bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

          {/* Morph Loader */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="p-6 rounded-2xl glass-panel shadow-2xl border border-border/80">
              <UniqueLoading variant="morph" size="md" />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              <span>Jayeed</span>
              <span className="text-muted-foreground">.</span>
            </h1>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.25em] mt-1">
              Full-Stack & Mobile Engineer
            </p>
          </motion.div>

          {/* Status Step text */}
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="h-6 flex items-center justify-center text-xs font-mono text-muted-foreground mb-4"
          >
            {loadingSteps[stepIndex]}
          </motion.div>

          {/* Progress bar container */}
          <div className="w-56 sm:w-64">
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
