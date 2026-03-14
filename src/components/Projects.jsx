import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, ExternalLink } from 'lucide-react'

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const projects = [
  {
    title: 'UniShareSync',
    subtitle: 'University Resource Sharing Platform',
    description:
      'Full-stack platform enabling university students, faculty, and admins to share academic resources, collaborate on projects, manage events, and communicate via real-time notifications with secure email OTP login and role-based access control.',
    highlights: ['Email OTP Auth', 'RBAC', 'Real-time Notifications', 'RESTful API'],
    image: '/projects/unisharesync.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSync',
    live: 'https://unisharesync.vercel.app/',
    featured: true,
  },
  {
    title: 'GigCampus',
    subtitle: 'Campus-only Micro-Gig Marketplace',
    description:
      'A platform for students to find trustworthy peers for quick, affordable tasks. Includes ID verification, real-time chat, order tracking, and a ghosting detection system.',
    highlights: ['Real-time Chat', 'Order Tracking', 'Ghosting Detection'],
    image: '/projects/GigCampus.png',
    tech: [
      { name: 'Python', icon: '/icons/python-original.svg' },
      { name: 'Flask', icon: '/icons/flask-original.svg' },
      { name: 'SQLite', icon: '/icons/sqlite-original.svg' },
      { name: 'Jinja', icon: '/icons/jinja-original.svg' },
      { name: 'Socket.IO', icon: '/icons/socketio-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/GigCampus',
    live: 'https://gigcampus-7er7.onrender.com/',
    featured: false,
  },  
  {
    title: 'SkillVoyage',
    subtitle: 'Learning Goal Tracker',
    description:
      'MERN stack platform enabling users to set learning goals, track progress through interactive dashboards, and receive personalized skill development recommendations with secure authentication and role-based access.',
    highlights: ['Interactive Dashboards', 'JWT Auth', 'Personalized Recommendations'],
    image: '/projects/skillvoyage.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb-original.svg' },
      { name: 'Express.js', icon: '/icons/express-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/skillvoyage',
    live: 'https://skillvoyage-frontend.vercel.app/',
    featured: true,
  },
  {
    title: 'UniShareSyncFX',
    subtitle: 'Desktop Collaboration Tool',
    description:
      'JavaFX desktop application facilitating university resource sharing and collaboration through role-specific dashboards, real-time communication, and project tracking with MySQL integration.',
    highlights: ['Role Dashboards', 'Real-time Chat', 'MySQL Integration'],
    image: '/projects/unisharesyncfx.png',
    tech: [
      { name: 'Java', icon: '/icons/java-original.svg' },
      { name: 'MySQL', icon: '/icons/mysql-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSyncFX',
    featured: false,
  },
  {
    title: 'Servyn',
    subtitle: 'Local Service Booking App',
    description:
      'Flutter-based mobile app for reliable local service booking in Bangladesh with role-based access, phone OTP authentication via Supabase, and SMS notifications for seamless provider-customer interactions.',
    highlights: ['Phone OTP Auth', 'SMS Notifications', 'Role-Based Access'],
    image: '/projects/servyn.png',
    tech: [
      { name: 'Flutter', icon: '/icons/flutter-original.svg' },
      { name: 'Dart', icon: '/icons/dart-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/servyn',
    featured: true,
  },
  {
    title: 'AI Drainage Optimizer',
    subtitle: 'AI-Powered Urban Water Management',
    description:
      'AI-powered system to optimize waterlogging and drainage, enhancing urban water management and reducing flood risks through predictive analytics.',
    highlights: ['AI/ML Pipeline', 'Predictive Analytics', 'Urban Planning'],
    image: '/projects/ai-drainage.png',
    tech: [
      { name: 'Python', icon: '/icons/python-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/AI-Powered-Smart-Waterlogging-and-Drainage-Optimizer',
    featured: false,
  },
]

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group grid lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden rounded-xl border border-border shadow-sm ${!isEven ? 'lg:order-2' : ''}`}>
        <div className="aspect-video bg-secondary/30">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className={`space-y-4 ${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
        <div>
          <p className="text-sm font-semibold text-primary mb-1">{project.subtitle}</p>
          <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

        {/* Highlights */}
        <div className={`flex flex-wrap gap-2 ${!isEven ? 'lg:justify-end' : ''}`}>
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Tech icons */}
        <div className={`flex items-center gap-3 pt-1 ${!isEven ? 'lg:justify-end' : ''}`}>
          {project.tech.map((t) => (
            <div key={t.name} className="group/icon relative">
              <img
                src={t.icon}
                alt={t.name}
                className="w-6 h-6 object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-card border border-border px-1.5 py-0.5 rounded text-foreground opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                {t.name}
              </span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className={`flex gap-3 pt-2 ${!isEven ? 'lg:justify-end' : ''}`}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:border-primary/30 hover:bg-secondary/50 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const displayedProjects = showAll ? projects : projects.slice(0, 4)

  return (
    <section id="projects" className="py-24 section-alt">
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
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Projects</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Real-world applications with a focus on clean architecture, security, and scalability.
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-20">
          {displayedProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* See More Button */}
        {projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {showAll ? 'Show Less' : 'See More Projects'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
