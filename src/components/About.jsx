import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  return (
    <section id="about" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">About Me</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            {/* Left – narrative */}
            <motion.div variants={fadeUp} className="space-y-5">
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Turning ideas into{' '}
                <span className="gradient-text">production-grade</span> software
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                I'm a final-year BSc CSE student at Shanto-Mariam University of Creative Technology, specializing in
                AI-assisted full-stack development. I build scalable, secure, and performant applications using modern
                frameworks — React, Node.js, Flutter — while leveraging AI coding tools to accelerate delivery without
                compromising code quality.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My workflow bridges the gap between product vision and engineering execution: translating requirements
                into structured prompts, validating AI-generated code for correctness and security, and deploying
                production-ready MVPs on tight timelines.
              </p>
            </motion.div>

            {/* Right – metrics + highlights */}
            <motion.div variants={fadeUp} className="space-y-8">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '5+', label: 'Projects Shipped' },
                  { value: '20+', label: 'Tech Skills' },
                ].map((m) => (
                  <div key={m.label} className="p-4 rounded-xl border border-border bg-card text-center">
                    <p className="font-display text-2xl font-bold gradient-text">{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Highlights list */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Key Strengths</h3>
                {[
                  'Clean architecture & modular codebase design',
                  'AI-augmented development with code validation',
                  'Rapid MVP delivery on tight timelines',
                  'Secure auth (JWT, OTP, RBAC) from day one',
                  'Full-stack: frontend, backend, mobile, databases',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
