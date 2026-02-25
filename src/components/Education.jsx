import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Award } from 'lucide-react'

const schools = [
  {
    name: 'Shanto-Mariam University of Creative Technology',
    degree: 'BSc in Computer Science & Engineering',
    date: 'Expected 2026',
    location: 'Dhaka, Bangladesh',
    gpa: 'CGPA: 3.93 / 4.00',
    detail: 'Current Semester: 9th',
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

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
}

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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Education</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {schools.map((school, i) => (
              <motion.div
                key={school.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={school.logo}
                        alt={school.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground">{school.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{school.degree}</p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={12} className="text-primary" />
                          {school.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} className="text-primary" />
                          {school.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Award size={12} className="text-primary" />
                          {school.gpa}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mt-2">{school.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
