import { motion } from 'framer-motion'
import { Code2, Lightbulb, Zap, GitBranch, ArrowUpRight } from 'lucide-react'

const principles = [
  {
    icon: Code2,
    title: 'Separation of Concerns',
    description:
      'Layered backend architectures, modular stateful primitives, and decoupled business logic so every module remains isolated and easily testable.',
  },
  {
    icon: Zap,
    title: 'Performance-First Runtime',
    description:
      'Strict bundle sizing, hardware-accelerated animations, zero memory leaks, and sub-100ms response targets for web and mobile interactions.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Augmented Velocity',
    description:
      'Leveraging LLMs to accelerate boilerplate and edge-case exploration, paired with rigorous manual audits for security, auth, and data integrity.',
  },
  {
    icon: GitBranch,
    title: 'Ship Fast, Ship Safe',
    description:
      'Moving with startup velocity without compromising security. Granular RBAC, input sanitization, error boundaries, and structured logs on Day 1.',
  },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24">
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
            <span>Core Principles</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How I <span className="gradient-text">Architect Software</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Engineering is not just writing lines of code — it is making thoughtful trade-offs that compound over time.
          </p>
        </motion.div>

        {/* 4 Principles Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {principles.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-7 rounded-3xl glass-panel glow-card flex flex-col justify-between border border-border/70 hover:border-foreground/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center text-foreground mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub Callout Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 p-6 rounded-3xl glass-panel border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h4 className="font-display text-base font-bold text-foreground">
              Code Speaks Louder Than Words
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore my open-source repositories to inspect commit histories, PRs, and system structures.
            </p>
          </div>
          <a
            href="https://github.com/mhjayeed715"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 transition-opacity shadow-xs"
          >
            <span>View GitHub Repos</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
