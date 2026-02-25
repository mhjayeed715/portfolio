import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, MapPin, Send, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mehrabjayeed715@gmail.com',
    href: 'mailto:mehrabjayeed715@gmail.com',
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '+880 1533 652232',
    href: 'https://wa.me/8801533652232',
    isSvg: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mhjayeed715',
    href: 'https://linkedin.com/in/mhjayeed715',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/mhjayeed715',
    href: 'https://github.com/mhjayeed715',
    isSvg: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dhaka, Bangladesh',
    href: null,
  },
]

export default function Contact() {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      await emailjs.send(
        'service_x19apia',
        'template_gb2zmgq',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          subject: 'Portfolio Contact from ' + formData.name,
        },
        'kJx5ZWCc_2G3nQys2'
      )
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError(true)
      setTimeout(() => setError(false), 4000)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Contact</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        {/* Two-column: Form + Contact Info */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/15 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {sending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm"
                  >
                    <CheckCircle size={14} />
                    <span className="font-medium">Message sent successfully!</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-1.5 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle size={14} />
                    <span className="font-medium">Failed to send. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {contactLinks.map((c, i) => {
              const Wrapper = c.href ? 'a' : 'div'
              const wrapperProps = c.href
                ? {
                    href: c.href,
                    target: c.href.startsWith('mailto') ? undefined : '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}

              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`group flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-300 ${
                      c.href ? 'hover:border-primary/30 hover:bg-card/80' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      {c.isSvg ? (
                        <c.icon className="w-4 h-4 text-primary" />
                      ) : (
                        <c.icon size={16} className="text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-muted-foreground">{c.label}</p>
                      <p className={`text-sm font-medium text-foreground truncate ${
                        c.href ? 'group-hover:text-primary' : ''
                      } transition-colors`}>{c.value}</p>
                    </div>
                    {c.href && (
                      <ArrowUpRight size={14} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    )}
                  </Wrapper>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
