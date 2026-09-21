import { useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

export default function ResumeViewer() {
  const { settings, isLoading } = usePortfolio()

  // Set the clean browser tab title
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Jayeed - Resume'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const pdfUrl =
    settings?.resumeUrl && settings.resumeUrl !== '/resume' && settings.resumeUrl !== '#'
      ? settings.resumeUrl
      : '/SM_Mehrab_Hossain_Jayeed_Resume.pdf'

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-3 font-mono text-xs">
        <div className="w-6 h-6 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading Resume...</p>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-[#1e2024] overflow-hidden m-0 p-0 fixed inset-0">
      <iframe
        src={`${pdfUrl}#toolbar=1&navpanes=0`}
        title="Jayeed - Resume"
        className="w-full h-full border-none block"
      />
    </div>
  )
}
