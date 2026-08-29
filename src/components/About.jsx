import { motion } from 'framer-motion'
import { Code2, Cpu, Rocket, ShieldCheck } from 'lucide-react'

const strengths = [
  {
    icon: Rocket,
    title: 'Rapid MVP Execution',
    desc: 'Translating product concepts into launch-ready web and mobile apps on tight startup deadlines.',
  },
  {
    icon: Cpu,
    title: 'AI & RAG Integration',
    desc: 'Engineering intelligent agents, document retrieval (RAG), and LLM workflows with strict validation.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Auth from Day 1',
    desc: 'Bulletproof authentication architectures (JWT, OTP, RBAC) and encrypted storage across all endpoints.',
  },
  {
    icon: Code2,
    title: 'Full-Stack & Mobile Stack',
    desc: 'Deep domain mastery in React, Flutter, Node.js, and Supabase for cohesive cross-platform experiences.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-[1.5px] bg-foreground" />
            <span>Profile & Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Turning Ideas into <span className="gradient-text">Production Software</span>
          </h2>
        </motion.div>

        {/* Bento Content */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Story Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-8 rounded-3xl glass-panel glow-card flex flex-col justify-between border border-border/80"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary text-muted-foreground text-xs font-mono font-medium border border-border/60">
                <span>Final-Year BSc CSE · Shanto-Mariam University</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Software Engineer with an AI-Augmented Workflow
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I am a full-stack and mobile engineer based in Dhaka, specializing in building high-performance MVPs and software ecosystems. My workflow bridges the gap between vision and execution: translating real-world requirements into structured architectures, leveraging AI tooling to accelerate delivery, and validating every line for security, performance, and code quality.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether architecting university collaboration ecosystems like <strong className="text-foreground font-medium">UniShareSync</strong> (which won 2nd Place in the Software Project Showcase) or building cognitive student shields like <strong className="text-foreground font-medium">Focusnyx</strong>, I build products that solve real human challenges.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-display text-xl font-bold text-foreground">8+ Apps</p>
                <p className="text-xs text-muted-foreground">Shipped & Live</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-foreground">2nd Place</p>
                <p className="text-xs text-muted-foreground">Software Showcase</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Commitment to Craft</p>
              </div>
            </div>
          </motion.div>

          {/* 4 Core Strengths Grid */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {strengths.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 rounded-2xl glass-panel glow-card flex items-start gap-4 border border-border/70 hover:border-foreground/30"
                >
                  <div className="p-2.5 rounded-xl bg-secondary text-foreground shrink-0 border border-border/80">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
