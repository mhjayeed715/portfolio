import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const AUTHORIZED_ADMIN_EMAILS = [
  'mehrabjayeed715@gmail.com',
  import.meta.env.VITE_ADMIN_EMAIL,
].filter(Boolean)

export default function AdminGuard({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const verifyUser = (sess) => {
      setSession(sess)
      if (sess?.user?.email && AUTHORIZED_ADMIN_EMAILS.includes(sess.user.email.toLowerCase())) {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
        if (sess) {
          supabase.auth.signOut()
        }
      }
      setLoading(false)
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      verifyUser(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      verifyUser(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-mono">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-muted-foreground animate-pulse">Verifying Admin Credentials...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground text-center">
        <div className="p-8 rounded-3xl liquid-glass border border-destructive/40 max-w-md w-full shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
            ⚠️
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Unauthorized Access</h2>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed mb-6">
            Only the verified portfolio owner is authorized to access or initialize Portfolio Studio.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Return to Portfolio
          </a>
        </div>
      </div>
    )
  }

  return children
}
