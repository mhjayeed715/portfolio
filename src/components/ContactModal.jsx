import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.031 0C5.394 0 .016 5.378.016 12.016c0 2.12.553 4.188 1.603 6.01L0 24l6.169-1.619a11.96 11.96 0 005.862 1.516h.005c6.637 0 12.016-5.379 12.016-12.016A12.001 12.001 0 0012.031 0zm0 21.908h-.004a9.934 9.934 0 01-5.063-1.39l-.363-.215-3.761.986 1.003-3.666-.237-.376A9.92 9.92 0 012.04 12.016C2.04 6.508 6.523 2.025 12.031 2.025c2.67 0 5.178 1.039 7.062 2.923a9.927 9.927 0 012.923 7.068c0 5.508-4.483 9.892-9.985 9.892zm5.474-7.472c-.3-.15-1.774-.876-2.049-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.226-.243-.585-.49-.506-.675-.515-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.501s1.075 2.899 1.225 3.099c.15.2 2.115 3.23 5.124 4.531.716.31 1.275.495 1.71.634.72.229 1.375.197 1.892.12.576-.086 1.774-.726 2.024-1.427.25-.7.25-1.301.175-1.427-.075-.125-.275-.2-.575-.35z" />
  </svg>
)

export const openContactModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-contact-modal'))
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-contact-modal', handleOpen)
    return () => window.removeEventListener('open-contact-modal', handleOpen)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

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
      setTimeout(() => {
        setSent(false)
        setIsOpen(false)
      }, 2500)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError(true)
      setTimeout(() => setError(false), 4000)
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Subtle Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-950/50 dark:bg-black/75 backdrop-blur-md"
          />

          {/* Clean High-Contrast Glass Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 z-10 my-auto shadow-2xl border border-zinc-200/90 dark:border-white/15"
          >
            {/* Header with Category & Close Button */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>GET IN TOUCH</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
              Let's Connect.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Whether you have a question, an engineering opportunity, or just want to say hi, I'll try my best to get back to you!
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-name" className="block text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/90 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-zinc-900 dark:focus:border-white focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/90 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-zinc-900 dark:focus:border-white focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Message */}
              <div>
                <label htmlFor="modal-message" className="block text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="A few lines about your project, query, or just a quick hello..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50/90 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-zinc-900 dark:focus:border-white focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 font-semibold text-sm cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60"
              >
                {sending ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} />
                  </>
                )}
              </button>

              {/* WhatsApp Quick Alternative */}
              <div className="pt-2 text-center">
                <a
                  href="https://wa.me/8801533652232"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors font-mono font-medium"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Or reach out directly on WhatsApp (+880 1533 652232)</span>
                </a>
              </div>

              {/* Submission feedback */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono border border-emerald-500/30"
                  >
                    <CheckCircle size={14} className="shrink-0" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-mono border border-rose-500/30"
                  >
                    <AlertCircle size={14} className="shrink-0" />
                    <span>Failed to send. Please reach out directly on WhatsApp or Email.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
