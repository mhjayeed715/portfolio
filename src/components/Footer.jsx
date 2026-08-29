const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.031 0C5.394 0 .016 5.378.016 12.016c0 2.12.553 4.188 1.603 6.01L0 24l6.169-1.619a11.96 11.96 0 005.862 1.516h.005c6.637 0 12.016-5.379 12.016-12.016A12.001 12.001 0 0012.031 0zm0 21.908h-.004a9.934 9.934 0 01-5.063-1.39l-.363-.215-3.761.986 1.003-3.666-.237-.376A9.92 9.92 0 012.04 12.016C2.04 6.508 6.523 2.025 12.031 2.025c2.67 0 5.178 1.039 7.062 2.923a9.927 9.927 0 012.923 7.068c0 5.508-4.483 9.892-9.985 9.892zm5.474-7.472c-.3-.15-1.774-.876-2.049-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.226-.243-.585-.49-.506-.675-.515-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.501s1.075 2.899 1.225 3.099c.15.2 2.115 3.23 5.124 4.531.716.31 1.275.495 1.71.634.72.229 1.375.197 1.892.12.576-.086 1.774-.726 2.024-1.427.25-.7.25-1.301.175-1.427-.075-.125-.275-.2-.575-.35z" />
  </svg>
)

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Education', href: '#education' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -70, duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="border-t border-border/70 bg-card/30 backdrop-blur-md py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-display font-bold text-2xl tracking-tight text-foreground"
            >
              Jayeed<span className="text-muted-foreground">.</span>
            </a>
            <p className="text-xs font-mono text-muted-foreground mt-1 max-w-sm">
              Full-Stack & Mobile Engineer · Scalable Systems & Startups
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {quickLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href)}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mhjayeed715"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/mhjayeed715"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/8801533652232"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-emerald-500 transition-colors"
              aria-label="WhatsApp Contact"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:mehrabjayeed715@gmail.com"
              className="p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Send Email"
            >
              <MailIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <p>
            &copy; {year} S. M. Mehrab Hossain Jayeed. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
