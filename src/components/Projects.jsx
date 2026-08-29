import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Layers, Smartphone, Globe, Cpu, ChevronDown, ChevronUp } from 'lucide-react'

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const categories = [
  { id: 'all', label: 'All Projects', count: 8, icon: Layers },
  { id: 'mobile', label: 'Mobile Apps', count: 2, icon: Smartphone },
  { id: 'web', label: 'Full-Stack Web', count: 4, icon: Globe },
  { id: 'ai', label: 'AI & Systems', count: 2, icon: Cpu },
]

const projects = [
  {
    id: 1,
    title: 'UniShareSync Mobile App',
    category: 'mobile',
    subtitle: 'Cross-Platform Campus Ecosystem',
    award: '🏆 2nd Place Winner — Software Project Showcase 2026',
    description:
      'Unified university mobile ecosystem built with Flutter and Supabase. Features an AI Campus Assistant with Groq RAG querying, real-time collaborative whiteboards, bus transit tracking via OpenStreetMap, and QR event check-ins.',
    highlights: ['Flutter & Supabase', 'AI RAG Assistant', 'Real-time Whiteboard', 'OpenStreetMap Transit', 'CampusShare P2P'],
    image: '/projects/unisharesync_mobile.png',
    tech: [
      { name: 'Flutter', icon: '/icons/flutter-original.svg' },
      { name: 'Dart', icon: '/icons/dart-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
      { name: 'Postman', icon: '/icons/postman-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSync-Mobile-App',
    live: 'https://unisharesync.vercel.app/',
    flagship: true,
  },
  {
    id: 2,
    title: 'Focusnyx',
    category: 'web',
    subtitle: 'Student Life OS & Cognitive Shield',
    description:
      'Full-stack productivity operating system and cognitive shield for neurodivergent learners. Combines Next.js 14, Chrome MV3 distraction blocker, and Win32 focus enforcement.',
    highlights: ['Next.js 14 & Supabase', 'Chrome MV3 Extension', 'Win32 System Hooks', 'AI Behavioral Coach'],
    image: '/projects/focusnyx.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
      { name: 'Python', icon: '/icons/python-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/Focusnyx',
    live: 'https://focusnyx.vercel.app/',
  },
  {
    id: 3,
    title: 'GigCampus',
    category: 'web',
    subtitle: 'Campus Micro-Task Marketplace',
    description:
      'Peer-to-peer campus task platform with verified student ID authentication, real-time Socket.IO chat, order lifecycle tracking, and automated ghosting detection.',
    highlights: ['CS50x Capstone', 'Socket.IO Chat', 'Order Tracking', 'Ghosting Shield'],
    image: '/projects/GigCampus.png',
    tech: [
      { name: 'Python', icon: '/icons/python-original.svg' },
      { name: 'Flask', icon: '/icons/flask-original.svg' },
      { name: 'SQLite', icon: '/icons/sqlite-original.svg' },
      { name: 'Socket.IO', icon: '/icons/socketio-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/GigCampus',
    live: 'https://gigcampus-7er7.onrender.com/',
  },
  {
    id: 4,
    title: 'UniShareSync Web App',
    category: 'web',
    subtitle: 'Academic Resource Platform',
    description:
      'Full-stack academic portal for resource sharing, event scheduling, and department collaboration with email OTP security and role-based access control.',
    highlights: ['Email OTP Auth', 'RBAC Security', 'Real-time Sync', 'RESTful API'],
    image: '/projects/unisharesync.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSync',
    live: 'https://unisharesyncweb.vercel.app/',
  },
  {
    id: 5,
    title: 'Servyn',
    category: 'mobile',
    subtitle: 'On-Demand Local Service Booking',
    description:
      'Flutter-based mobile application connecting verified service providers with local customers via phone OTP verification and automated SMS notifications.',
    highlights: ['Phone OTP Auth', 'SMS Alerts', 'Provider Dashboard'],
    image: '/projects/servyn.png',
    tech: [
      { name: 'Flutter', icon: '/icons/flutter-original.svg' },
      { name: 'Dart', icon: '/icons/dart-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/servyn',
  },
  {
    id: 6,
    title: 'SkillVoyage',
    category: 'web',
    subtitle: 'Interactive Skill Roadmap & Goal Tracker',
    description:
      'MERN stack application enabling learners to set progressive milestones, track metrics through interactive dashboards, and receive curated skill recommendations.',
    highlights: ['Interactive Dashboards', 'JWT Sessions', 'Custom Roadmaps'],
    image: '/projects/skillvoyage.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb-original.svg' },
      { name: 'Express.js', icon: '/icons/express-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/skillvoyage',
    live: 'https://skillvoyage-frontend.vercel.app/',
  },
  {
    id: 7,
    title: 'AI Drainage Optimizer',
    category: 'ai',
    subtitle: 'Predictive Urban Flooding Analytics',
    description:
      'Machine learning model analyzing precipitation and urban terrain to predict waterlogging hotspots and assist municipal drainage planning.',
    highlights: ['ML Predictive Pipeline', 'Terrain Modeling', 'Data Analytics'],
    image: '/projects/ai-drainage.png',
    tech: [
      { name: 'Python', icon: '/icons/python-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/AI-Powered-Smart-Waterlogging-and-Drainage-Optimizer',
  },
  {
    id: 8,
    title: 'UniShareSyncFX',
    category: 'ai',
    subtitle: 'Desktop Resource Client with Offline Cache',
    description:
      'JavaFX desktop application with MySQL replication, local cache synchronization, and department communication tools.',
    highlights: ['JavaFX Desktop UI', 'MySQL Replication', 'Offline Cache'],
    image: '/projects/unisharesyncfx.png',
    tech: [
      { name: 'Java', icon: '/icons/java-original.svg' },
      { name: 'MySQL', icon: '/icons/mysql-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSyncFX',
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expanded, setExpanded] = useState(false)

  // Filter logic
  const filteredList = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  // If in 'all' view and not expanded, show top 4 projects (1 flagship + 3 secondary)
  const displayedProjects = (activeCategory === 'all' && !expanded)
    ? filteredList.slice(0, 4)
    : filteredList

  const flagshipProject = projects[0]

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest mb-3">
              <span className="w-6 h-[1.5px] bg-foreground" />
              <span>Selected Work</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Featured <span className="gradient-text">Software & MVPs</span>
            </h2>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl glass-panel border border-border/80">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setExpanded(false)
                  }}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-background font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-foreground rounded-xl shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={13} className="relative z-10" />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 1. Flagship Spotlight Card (when in 'all' or 'mobile' tab) */}
        {(activeCategory === 'all' || activeCategory === 'mobile') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 rounded-3xl glass-panel glow-card border border-border/80 p-6 sm:p-8 overflow-hidden relative"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Image Preview */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-secondary border border-border/80 shadow-md aspect-video">
                <img
                  src={flagshipProject.image}
                  alt={flagshipProject.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold shadow-md">
                  <span>{flagshipProject.award}</span>
                </div>
              </div>

              {/* Spotlight Content */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground text-[11px] font-mono font-medium border border-border/60">
                  <span>FLAGSHIP SHOWCASE</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {flagshipProject.title}
                </h3>
                <p className="text-xs font-mono text-muted-foreground">{flagshipProject.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {flagshipProject.description}
                </p>

                {/* Innovation highlights */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {flagshipProject.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-secondary text-foreground/90 border border-border/60"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Tech icons and Action buttons */}
                <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {flagshipProject.tech.map((t) => (
                      <img key={t.name} src={t.icon} alt={t.name} className="w-5 h-5 object-contain" title={t.name} />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {flagshipProject.github && (
                      <a
                        href={flagshipProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {flagshipProject.live && (
                      <a
                        href={flagshipProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Secondary Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedProjects
              .filter((p) => activeCategory !== 'all' && activeCategory !== 'mobile' ? true : p.id !== 1)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group flex flex-col justify-between rounded-3xl glass-panel glow-card overflow-hidden border border-border/70 hover:border-foreground/30"
                >
                  <div>
                    {/* Image Preview */}
                    <div className="relative aspect-video w-full overflow-hidden bg-secondary border-b border-border/60">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2.5">
                      <p className="text-[11px] font-mono text-muted-foreground font-medium uppercase tracking-wider">
                        {project.subtitle}
                      </p>

                      <h4 className="font-display text-lg font-bold text-foreground group-hover:opacity-80 transition-opacity">
                        {project.title}
                      </h4>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {project.highlights.slice(0, 3).map((h) => (
                          <span
                            key={h}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-foreground/80 border border-border/50"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-border/40 mt-3">
                    <div className="flex items-center gap-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <img key={t.name} src={t.icon} alt={t.name} className="w-4 h-4 object-contain opacity-70" title={t.name} />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Source code for ${project.title}`}
                        >
                          <GitHubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
                        >
                          <span>Demo</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* 3. Progressive Disclosure Toggle (Only in 'All' tab) */}
        {activeCategory === 'all' && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-panel border border-border/80 hover:border-foreground/30 text-xs font-mono font-semibold text-foreground transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>{expanded ? 'Show Curated Highlights' : 'Explore All 8 Projects'}</span>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
