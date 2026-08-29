import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Award, ExternalLink, ShieldCheck, GraduationCap, ZoomIn, X, Binary } from 'lucide-react'

const competitions = [
  {
    title: '2nd Place — Software Project Showcase 2026',
    organizer: 'Software Community, SMUCT',
    description:
      'Secured 2nd place at the inter-department Software Project Showcase 2026 organised by the Software Community, showcasing the UniShareSync mobile ecosystem.',
    badge: '2nd Place Winner',
    badgeColor: 'bg-foreground text-background border-border',
    icon: Trophy,
    badgeIcon: Award,
    year: '2026',
    highlightProject: 'UniShareSync Mobile App',
  },
  {
    title: 'Champion — Project Showcasing 2025',
    organizer: 'Robotics & IoT Community, SMUCT',
    description:
      'Team X recognised as champion, demonstrating engineering and problem-solving skills in a competitive academic setting.',
    badge: 'Champion',
    badgeColor: 'bg-foreground text-background border-border',
    icon: Trophy,
    badgeIcon: Award,
    year: '2025',
    highlightProject: 'Team X',
  },
  {
    title: 'Datathon — ML Contest 2026',
    organizer: 'Machine Learning Community, CSE & CSIT Department, SMUCT',
    description:
      'Competed in the ML Contest by the CSE & CSIT Department at Shanto-Mariam University. Built an end-to-end pipeline on a loan approval dataset: imputation, IQR outlier removal, feature encoding, normalization, and 20+ models with RandomizedSearchCV tuning.',
    badge: 'ML Competitor',
    badgeColor: 'bg-secondary text-foreground border-border/80',
    icon: Binary,
    badgeIcon: Award,
    year: '2026',
    highlightProject: 'Loan Approval ML Pipeline',
  },
]

const certifications = [
  {
    title: 'CS50 AI: Introduction to Artificial Intelligence with Python',
    issuer: 'HarvardX (Verified Certificate)',
    description:
      'Comprehensive mastery of Graph Search, Minimax, Constraint Satisfaction, Markov Models, Bayesian Networks, HMMs, Machine Learning, and Neural Networks.',
    badge: 'Harvard Verified',
    verifyUrl: 'https://courses.edx.org/certificates/0f757edad714434399b0fa981bed388d',
    image: '/certificates/CS50AI1.png',
    tags: ['Machine Learning', 'Neural Networks', 'Python'],
    icon: GraduationCap,
  },
  {
    title: "CS50x: CS50's Introduction to Computer Science",
    issuer: 'HarvardX (Verified Certificate)',
    description:
      'Rigorous computer science curriculum covering C, Python, SQL, HTML/CSS, JavaScript, memory management, data structures, algorithms, and web app security.',
    badge: 'Harvard Verified',
    verifyUrl: 'https://courses.edx.org/certificates/45442b0106884e8a8c983ab208b027e1',
    image: '/certificates/CS50x1.png',
    tags: ['C', 'Data Structures', 'Algorithms', 'SQL'],
    icon: GraduationCap,
  },
  {
    title: 'Introduction to Model Context Protocol (MCP)',
    issuer: 'Anthropic Interactive Academy',
    description:
      'Engineered LLM-to-tool connections, custom MCP servers, secure context passing, resource templates, and prompt routing for AI workflows.',
    badge: 'Anthropic MCP',
    verifyUrl: 'https://verify.skilljar.com/c/vbhgugbt9567',
    image: '/certificates/anthropic.png',
    tags: ['MCP Architecture', 'LLM Tooling', 'Agentic Systems'],
    icon: ShieldCheck,
  },
]

export default function Achievements() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="achievements" className="py-24 section-alt">
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
            <span>Honors & Credentials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Competitions & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Competitive hackathons, project showcases, and verified academic credentials.
          </p>
        </motion.div>

        {/* Competitions & Achievements */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-4 h-4 text-foreground" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Competitions & Achievements
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {competitions.map((item, i) => {
              const Icon = item.icon
              const BadgeIcon = item.badgeIcon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-3xl glass-panel glow-card flex flex-col justify-between border border-border/70 hover:border-foreground/30"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center text-foreground">
                        <Icon size={18} />
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                        <BadgeIcon size={12} />
                        <span>{item.badge}</span>
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-foreground mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-muted-foreground mb-3">{item.organizer}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="font-medium text-foreground/80">{item.highlightProject}</span>
                    <span>{item.year}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Certifications (Compact Cards) */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-4 h-4 text-foreground" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Verified Certifications
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {certifications.map((cert, i) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 rounded-2xl glass-panel glow-card flex flex-col justify-between border border-border/70 hover:border-foreground/30 overflow-hidden"
                >
                  <div>
                    {/* Header with Icon and Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-foreground">
                        <Icon size={15} />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-secondary text-foreground border border-border/80">
                        <ShieldCheck size={10} />
                        <span>{cert.badge}</span>
                      </span>
                    </div>

                    {/* Compact Certificate Thumbnail */}
                    {cert.image && (
                      <div
                        onClick={() => setSelectedCert(cert)}
                        className="relative my-2.5 rounded-xl overflow-hidden bg-secondary border border-border/70 group/thumb cursor-pointer aspect-[16/8]"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[11px] font-mono font-medium">
                          <ZoomIn size={13} />
                          <span>View Certificate</span>
                        </div>
                      </div>
                    )}

                    <h4 className="font-display text-sm font-bold text-foreground mb-1 leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] font-mono text-muted-foreground mb-2">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-foreground/80 border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-foreground text-background text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-xs"
                      >
                        <ShieldCheck size={11} />
                        <span>Verify Credential</span>
                        <ExternalLink size={9} className="opacity-80" />
                      </a>
                    )}

                    {cert.image && (
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border bg-card text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <ZoomIn size={11} className="text-foreground" />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full p-6 rounded-3xl glass-panel border border-border/80 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">{selectedCert.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden bg-secondary border border-border max-h-[70vh] flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[65vh]"
                />
              </div>

              {selectedCert.verifyUrl && (
                <div className="mt-4 flex justify-end">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-opacity shadow-xs"
                  >
                    <span>Open Official Verification</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
