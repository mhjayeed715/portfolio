import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false, // Driven by GSAP ticker for 60fps frame synchronization
    })

    lenisRef.current = lenis
    window.lenis = lenis

    // 1. Update GSAP ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    // 2. Drive Lenis through GSAP's high-precision ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // 3. Handle smooth hash link scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      
      const element = document.querySelector(href)
      if (element) {
        e.preventDefault()
        lenis.scrollTo(element, { offset: -70, duration: 1.2 })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
