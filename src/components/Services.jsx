import { motion } from 'framer-motion'
import { Globe, Smartphone, Database, Bot, ShieldCheck, Zap } from 'lucide-react'

const services = [
  {
    icon: Smartphone,
    title: 'Mobile MVP Development',
    description:
      'Cross-platform iOS and Android apps with Flutter, Supabase, push alerts, and offline caching. From design specs to App Store & Play Store readiness.',
    tags: ['Flutter', 'Dart', 'Supabase', 'Mobile UX'],
  },
  {
    icon: Globe,
    title: 'Full-Stack Web Engineering',
    description:
      'High-performance web applications built with React, Next.js, and Node.js. Clean REST/GraphQL APIs, real-time sync, and SEO-optimized architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
  },
  {
    icon: Bot,
    title: 'AI Workflows & RAG Integration',
    description:
      'Building intelligent assistant features, semantic document search (RAG) with vector databases, and automated LLM pipelines using Groq & OpenAI APIs.',
    tags: ['RAG Pipelines', 'Groq API', 'Prompt Eng', 'Vectors'],
  },
  {
    icon: Database,
    title: 'Database Architecture & APIs',
    description:
      'Normalized schema design, query optimization, indexing, and scalable RESTful endpoints with comprehensive error handling and logging.',
    tags: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis'],
  },
  {
    icon: ShieldCheck,
    title: 'Security, Auth & RBAC',
    description:
      'Enterprise-grade authentication architectures: JWT sessions, email/phone OTP verification, role-based access control, and sanitization.',
    tags: ['JWT', 'OTP Auth', 'RBAC', 'Data Security'],
  },
  {
    icon: Zap,
    title: 'Performance & Optimization',
    description:
      'Lighthouse audits, bundle splitting, memory leak debugging, rendering performance optimization, and hardware-accelerated animations.',
    tags: ['Vite', 'Turbopack', 'Web Vitals', 'Profiling'],
  },
]

export default function Services() {
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
            const Icon = s.icon
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
