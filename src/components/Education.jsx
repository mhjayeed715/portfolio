import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Award } from 'lucide-react'

const schools = [
  {
    name: 'Shanto-Mariam University of Creative Technology',
    degree: 'BSc in Computer Science & Engineering',
    date: 'Expected 2026',
    location: 'Dhaka, Bangladesh',
    gpa: 'CGPA: 3.93 / 4.00',
    detail: 'Current Semester: 10th',
    logo: '/education/shanto-mariam.svg',
  },
  {
    name: 'Dhaka City College',
    degree: 'Higher Secondary Certificate (HSC)',
    date: '2021',
    location: 'Dhaka, Bangladesh',
    gpa: 'GPA: 5.00 / 5.00',
    detail: 'Science Group',
    logo: '/education/dhaka-city-college.png',
  },
  {
    name: 'Armanitola Govt. High School',
    degree: 'Secondary School Certificate (SSC)',
    date: '2019',
    location: 'Dhaka, Bangladesh',
    gpa: 'GPA: 5.00 / 5.00',
    detail: 'Science Group',
    logo: '/education/armanitola.jpg',
  },
]

export default function Education() {
  return (
    <section id="education" className="py-24 section-alt">
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
            <span>Academic Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Education & <span className="gradient-text">Scholastic Records</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Rigorous foundation in computer science, algorithmic mathematics, and engineering methodologies.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="space-y-6">
          {schools.map((school, i) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-3xl glass-panel glow-card flex flex-col sm:flex-row items-start gap-5 border border-border/70 hover:border-foreground/30"
            >
              {/* Logo / Icon */}
              <div className="w-14 h-14 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center shrink-0 overflow-hidden p-2">
                <img
                  src={school.logo}
                  alt={school.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-foreground truncate">
                    {school.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-mono font-medium border border-border/80 shrink-0">
                    <Award size={13} />
                    <span>{school.gpa}</span>
                  </span>
                </div>

                <p className="text-sm font-medium text-foreground/80 mb-3">{school.degree}</p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-foreground" />
                    {school.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-foreground" />
                    {school.location}
                  </span>
                  <span className="text-foreground/70">
                    {school.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
