import { motion } from 'framer-motion'
import { Code2, Lightbulb, Zap, GitBranch } from 'lucide-react'

const principles = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    description:
      'Every project follows a clear separation of concerns — modular components, reusable hooks, layered backend services. Code should be readable, testable, and maintainable.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description:
      'Lazy loading, code splitting, optimized queries, and efficient state management. I measure and improve — LCP, FID, CLS are not just acronyms to me.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Augmented Workflow',
    description:
      'I use AI coding tools to accelerate delivery, not replace thinking. Every generated line is validated for correctness, security, and adherence to project standards.',
  },
  {
    icon: GitBranch,
    title: 'Ship Fast, Ship Safe',
    description:
      'Shipping velocity matters, but not at the cost of security or stability. Proper auth, input validation, error boundaries, and structured logging from day one.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How I <span className="gradient-text">Think</span> About Code
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Engineering is not just about writing code. It's about making decisions that compound over time.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 relative overflow-hidden shadow-sm"
            >
              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-xl border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
        >
          <div>
            <h3 className="font-display text-lg font-semibold mb-1">Code speaks louder than words</h3>
            <p className="text-sm text-muted-foreground">
              Browse my repositories to see how I structure real projects.
            </p>
          </div>
          <a
            href="https://github.com/mhjayeed715"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
