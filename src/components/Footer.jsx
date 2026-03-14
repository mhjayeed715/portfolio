export default function Footer() {
  const year = new Date().getFullYear()

  const coreSkills = ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="font-display font-bold text-xl tracking-tight">
              <span className="gradient-text">Jayeed</span>
              <span className="text-muted-foreground">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Full-Stack Developer crafting scalable web & mobile applications.
            </p>
            <div className="flex items-center gap-4 mt-4 text-muted-foreground">
              <a href="https://github.com/mhjayeed715" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://linkedin.com/in/mhjayeed715" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:mehrabjayeed715@gmail.com" className="hover:text-foreground transition-colors" aria-label="Email">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Core Skills */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">Core Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {coreSkills.map((s) => (
                <span key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-border text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:mehrabjayeed715@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                mehrabjayeed715@gmail.com
              </a>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">Quick Links</h4>
            <div className="space-y-1.5">
              {quickLinks.map((l) => (
                <a key={l.label} href={l.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Copyright &copy; {year} S. M. Mehrab Hossain Jayeed. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ by Jayeed
          </p>
        </div>
      </div>
    </footer>
  )
}
