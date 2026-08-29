import { motion } from 'framer-motion'
import { Code2, Smartphone, Database, Cpu } from 'lucide-react'

// Continuous marquee track row 1
const marqueeRow1 = [
  { name: 'React 19', icon: '/icons/react-original.svg', tag: 'UI Library' },
  { name: 'Flutter', icon: '/icons/flutter-original.svg', tag: 'Mobile SDK' },
  { name: 'TypeScript', icon: '/icons/typescript-original.svg', tag: 'Language' },
  { name: 'Node.js', icon: '/icons/nodejs-original.svg', tag: 'Runtime' },
  { name: 'Supabase', icon: '/icons/supabase-original.svg', tag: 'BaaS & Auth' },
  { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg', tag: 'Database' },
  { name: 'Dart', icon: '/icons/dart-original.svg', tag: 'Language' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg', tag: 'Styling' },
]

// Continuous marquee track row 2
const marqueeRow2 = [
  { name: 'Express.js', icon: '/icons/express-original.svg', tag: 'Backend' },
  { name: 'Python', icon: '/icons/python-original.svg', tag: 'AI & Scripting' },
  { name: 'MongoDB', icon: '/icons/mongodb-original.svg', tag: 'NoSQL' },
  { name: 'Git & GitHub', icon: '/icons/git-original.svg', tag: 'Version Control' },
  { name: 'Postman', icon: '/icons/postman-original.svg', tag: 'API Testing' },
  { name: 'SQLite', icon: '/icons/sqlite-original.svg', tag: 'Embedded DB' },
  { name: 'Socket.IO', icon: '/icons/socketio-original.svg', tag: 'Real-time' },
  { name: 'Vercel', icon: '/icons/vercel-original.svg', tag: 'Deployment' },
]

const skillPillars = [
  {
    category: 'Mobile Product Engineering',
    icon: Smartphone,
    summary: 'Cross-platform mobile apps for iOS and Android with offline caching, local state architecture, and smooth native bridges.',
    stack: ['Flutter', 'Dart', 'Supabase Mobile', 'FCM Push Notifications', 'Provider / Riverpod'],
  },
  {
    category: 'Full-Stack Web Systems',
    icon: Code2,
    summary: 'Responsive, accessible frontend architectures backed by high-throughput RESTful APIs, JWT sessions, and relational models.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    category: 'AI Integration & Backend APIs',
    icon: Cpu,
    summary: 'Custom RAG search pipelines, Groq high-speed LLM integration, prompt engineering, and scalable webhook integrations.',
    stack: ['Groq API', 'RAG Pipelines', 'Vector Indexing', 'Python / Flask', 'Socket.IO WebSockets'],
  },
  {
    category: 'Database & Infrastructure',
    icon: Database,
    summary: 'Strict ACID compliance, Row-Level Security (RLS) policies, schema migrations, and optimized indexing strategies.',
    stack: ['PostgreSQL', 'Supabase RLS', 'MongoDB', 'Redis Caching', 'Postman Automated Tests'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-[1.5px] bg-foreground" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Technologies & <span className="gradient-text">Engineering Stack</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Modern, production-proven tools I use to architect robust mobile applications, full-stack web platforms, and AI-enabled systems.
          </p>
        </motion.div>

        {/* ── 1. Contained Dual-Rail Infinite Marquee (Matched to Column Grid) ── */}
        <div className="relative rounded-3xl glass-panel border border-border/80 p-6 overflow-hidden marquee-container mb-16 shadow-xs">
          {/* Internal left & right gradient fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-card via-card/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-card via-card/80 to-transparent z-10 pointer-events-none" />

          <div className="space-y-3">
            {/* Row 1: Leftward continuous scroll */}
            <div className="animate-marquee-left flex items-center gap-3">
              {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((tech, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-secondary/80 border border-border/70 shrink-0 select-none hover:border-foreground/40 transition-colors"
                >
                  <img src={tech.icon} alt={tech.name} className="w-4 h-4 object-contain" />
                  <div className="text-left">
                    <p className="text-xs font-mono font-semibold text-foreground whitespace-nowrap">{tech.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{tech.tag}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Rightward continuous scroll */}
            <div className="animate-marquee-right flex items-center gap-3">
              {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((tech, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-secondary/80 border border-border/70 shrink-0 select-none hover:border-foreground/40 transition-colors"
                >
                  <img src={tech.icon} alt={tech.name} className="w-4 h-4 object-contain" />
                  <div className="text-left">
                    <p className="text-xs font-mono font-semibold text-foreground whitespace-nowrap">{tech.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{tech.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2. Structured Architectural Capability Cards ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillPillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-3xl glass-panel glow-card flex flex-col justify-between border border-border/70 hover:border-foreground/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-foreground border border-border/80">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Domain 0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {pillar.category}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.stack.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-secondary/80 text-foreground/90 border border-border/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
