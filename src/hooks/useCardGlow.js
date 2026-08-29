import { useCallback } from 'react'

/**
 * Cursor-following glow for .glow-card elements.
 * Attach onMouseMove={handleCardGlow} to any container wrapping glow-card children.
 * The CSS reads --glow-x / --glow-y custom properties set by this handler.
 */
export function useCardGlow() {
  const handleCardGlow = useCallback((e) => {
    const card = e.currentTarget
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }, [])

  return handleCardGlow
}
