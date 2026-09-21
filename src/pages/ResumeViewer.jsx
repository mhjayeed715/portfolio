import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, ExternalLink, FileText, Sparkles } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export default function ResumeViewer() {
  const { settings, isLoading } = usePortfolio()
  const [downloading, setDownloading] = useState(false)

  // Explicitly set the browser tab title to a professional format
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'S. M. Mehrab Hossain Jayeed — Resume & Curriculum Vitae'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const pdfUrl =
    settings?.resumeUrl && settings.resumeUrl !== '/resume' && settings.resumeUrl !== '#'
      ? settings.resumeUrl
      : '/SM_Mehrab_Hossain_Jayeed_Resume.pdf'

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch('/resume.pdf')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'S_M_Mehrab_Hossain_Jayeed_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      // Fallback direct link
      window.open('/resume.pdf', '_blank')
    } finally {
      setDownloading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-3 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading Resume & Curriculum Vitae...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen h-screen bg-[#0d0f12] text-foreground flex flex-col overflow-hidden select-none">
      {/* Top Executive Header Bar */}
      <header className="h-16 shrink-0 border-b border-border/80 bg-background/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-20">
        {/* Left: Author Identity */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            title="Return to Portfolio"
          >
            <ArrowLeft size={18} />
          </Link>

          <img
            src="/profile21.png"
            alt="S. M. Mehrab Hossain Jayeed"
            className="w-9 h-9 rounded-full object-cover border border-border/80 shadow-xs hidden xs:block"
          />

          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-sm text-foreground tracking-tight">
                S. M. Mehrab Hossain Jayeed
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles size={10} />
                <span>Verified CV</span>
              </span>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground hidden sm:block">
              Full-Stack & Mobile Engineer · Resume & Curriculum Vitae
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-foreground text-background font-medium text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Download PDF copy"
          >
            <Download size={14} />
            <span className="font-semibold">{downloading ? 'Downloading...' : 'Download PDF'}</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-border/80 bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-mono transition-colors flex items-center gap-1.5"
            title="Open raw PDF in new tab"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Raw PDF</span>
          </a>
        </div>
      </header>

      {/* Embedded PDF Viewer Container */}
      <main className="flex-1 w-full bg-[#1e2024] relative overflow-hidden">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title="Resume — S. M. Mehrab Hossain Jayeed"
          className="w-full h-full border-none"
        />

        {/* Mobile helper overlay note */}
        <div className="sm:hidden absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 flex items-center justify-between text-xs font-mono z-10 shadow-lg">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <FileText size={14} />
            <span>PDF viewer controls</span>
          </span>
          <button
            onClick={handleDownload}
            className="text-primary font-semibold hover:underline"
          >
            Download file
          </button>
        </div>
      </main>
    </div>
  )
}
