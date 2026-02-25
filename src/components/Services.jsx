import { motion } from 'framer-motion'
import { Globe, Smartphone, Database, Bot, Shield, FileCode2 } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications with React, Node.js, Express, and PostgreSQL/MongoDB. REST APIs, real-time features, role-based access, and scalable architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile applications using Flutter and Dart with clean UI, OTP authentication, push notifications, and seamless backend integration.',
    tags: ['Flutter', 'Dart', 'Supabase'],
  },
  {
    icon: Database,
    title: 'Database Design & API Architecture',
    description:
      'Normalized database schemas, efficient queries, RESTful APIs with proper error handling, pagination, and security best practices.',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Express.js'],
  },
  {
    icon: Bot,
    title: 'AI-Assisted Development',
    description:
      'Rapid prototyping and MVP delivery using AI coding tools. Structured prompt engineering, code validation, and AI-human hybrid workflows for faster shipping.',
    tags: ['Prompt Engineering', 'AI Tools', 'Rapid MVP'],
  },
  {
    icon: Shield,
    title: 'Auth & Security Implementation',
    description:
      'JWT authentication, email OTP verification, role-based access control (RBAC), input validation, and secure session management.',
    tags: ['JWT', 'OTP', 'RBAC', 'Security'],
  },
  {
    icon: FileCode2,
    title: 'Documentation & Version Control',
    description:
      'Clean, well-structured documentation and version-controlled codebases using Git. Conventional commits, branching strategies, README standards, and collaborative workflows.',
    tags: ['Git', 'GitHub', 'Markdown', 'CI/CD'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function Services() {
  return (
    <section id="services" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
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
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Services</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Problems I <span className="gradient-text">Solve</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            From idea to deployment — I handle the full lifecycle of building modern, secure, and scalable applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              className="group glow-card rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-sm"
            >
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
