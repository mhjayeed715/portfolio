import { motion } from 'framer-motion'
import { ArrowUpRight, MessageSquareQuote } from 'lucide-react'
import { openContactModal } from './ContactModal'

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Sleek Warm CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl glass-panel glow-card border border-border/80 p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-foreground/[0.03] dark:bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left Info */}
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-muted-foreground uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AVAILABLE FOR OPPORTUNITIES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Get In Touch
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether you have a question, an engineering opportunity, a project to collaborate on, or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <button
                onClick={openContactModal}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full liquid-glass-btn font-semibold text-sm cursor-pointer shadow-lg"
              >
                <span>Say Hello</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
