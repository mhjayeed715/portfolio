import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function UniqueLoading({
  size = 'md',
  className,
}) {
  const containerSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  const dotPositions = [
    { x: -10, y: -10 },
    { x: 10, y: -10 },
    { x: 10, y: 10 },
    { x: -10, y: 10 },
  ]

  return (
    <div className={cn('relative flex items-center justify-center', containerSizes[size] || containerSizes.md, className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        className="relative w-8 h-8 flex items-center justify-center"
      >
        {dotPositions.map((pos, i) => (
          <motion.div
            key={i}
            animate={{
              x: [pos.x, pos.x * 1.3, pos.x],
              y: [pos.y, pos.y * 1.3, pos.y],
              scale: [1, 1.25, 1],
              borderRadius: ['4px', '8px', '4px'],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
            className="absolute w-3.5 h-3.5 bg-foreground rounded-sm shadow-xs"
          />
        ))}
      </motion.div>
    </div>
  )
}
