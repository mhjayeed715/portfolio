import { motion } from 'framer-motion'
import { Globe, Smartphone, Database, Bot, ShieldCheck, Zap } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import { initialServices } from '../data/initialPortfolioData'

const serviceIconMap = {
  Smartphone,
  Globe,
  Bot,
  Database,
  ShieldCheck,
  Zap,
}

export default function Services() {
  const { services: contextServices } = usePortfolio()
  const services = contextServices && contextServices.length > 0 ? contextServices : initialServices
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-[1.5px] bg-foreground" />
            <span>Offerings & Solutions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How I Can <span className="gradient-text">Help Your Team</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Delivering production-ready engineering for startups, founders, and scaling digital products.
          </p>
        </motion.div>

        {/* 3-Column Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = typeof s.icon === 'string' ? (serviceIconMap[s.icon] || Zap) : (s.icon || Zap)
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-6 rounded-3xl glass-panel glow-card flex flex-col justify-between border border-border/70 hover:border-foreground/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center text-foreground mb-5 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-secondary/80 text-foreground/80 border border-border/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
