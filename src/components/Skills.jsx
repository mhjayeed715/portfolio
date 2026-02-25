import { motion } from 'framer-motion'

/* ── Skill categories ── */
const categories = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', icon: '/icons/javascript-original.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-original.svg' },
      { name: 'Python', icon: '/icons/python-original.svg' },
      { name: 'C', icon: '/icons/c-original.svg' },
      { name: 'C++', icon: '/icons/cplusplus-original.svg' },
      { name: 'Dart', icon: '/icons/dart-original.svg' },
      { name: 'Java', icon: '/icons/java-original.svg' },
      { name: 'HTML5', icon: '/icons/html5-original.svg' },
      { name: 'CSS3', icon: '/icons/css3-original.svg' },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
      { name: 'Express.js', icon: '/icons/express-original.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg' },
      { name: 'Flutter', icon: '/icons/flutter-original.svg' },
      { name: 'Vite', icon: '/icons/vite-original.svg' },
    ],
  },
  {
    label: 'Databases & Backend',
    items: [
      { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb-original.svg' },
      { name: 'MySQL', icon: '/icons/mysql-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
    ],
  },
  {
    label: 'Tools & Platforms',
    items: [
      { name: 'Git', icon: '/icons/git-original.svg' },
      { name: 'GitHub', icon: '/icons/github-original.svg' },
      { name: 'VS Code', icon: '/icons/vscode-original.svg' },
      { name: 'Postman', icon: '/icons/postman-original.svg' },
      { name: 'Vercel', icon: '/icons/vercel-original.svg' },
      { name: 'Figma', icon: '/icons/figma-original.svg' },
      { name: 'Canva', icon: '/icons/canva-original.svg' },
    ],
  },
]

const otherSkills = [
  'LSTM', 'Federated Learning', 'NLP', 'JWT', 'OTP',
  'MS Office', 'Google Workspace', 'MS Teams', 'Zoom', 'Prompt Engineering',
]

const proficiencies = [
  { name: 'React & Next.js', level: 90 },
  { name: 'JavaScript / TypeScript', level: 88 },
  { name: 'Node.js / Express', level: 85 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'PostgreSQL / MongoDB', level: 80 },
  { name: 'Flutter / Dart', level: 75 },
  { name: 'Python', level: 72 },
  { name: 'Git & DevTools', level: 85 },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24">
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
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Tech Stack</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A curated set of technologies I use to build robust, performant applications.
          </p>
        </motion.div>

        {/* Skill categories */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={containerVariants}
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
                {cat.label}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {cat.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-300 cursor-default"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Proficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Technical Proficiency
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {proficiencies.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
            Other Skills
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {otherSkills.map((s) => (
              <span
                key={s}
                className="px-3.5 py-1.5 text-sm font-medium rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
