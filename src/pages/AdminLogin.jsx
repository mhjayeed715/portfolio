import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, ArrowLeft, Shield, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const AUTHORIZED_ADMIN_EMAILS = [
  'mehrabjayeed715@gmail.com',
  import.meta.env.VITE_ADMIN_EMAIL,
].filter(Boolean)

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsLoading(true)

    const cleanEmail = email.trim().toLowerCase()
    if (!AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail)) {
      setIsLoading(false)
      setErrorMessage('Access Denied: Only the verified portfolio owner is authorized to access or initialize Portfolio Studio.')
      return
    }

    try {
      if (isSignUp) {
        // Create initial admin account
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error

        if (data.session) {
          setSuccessMessage('Admin account created! Redirecting to Studio...')
          setTimeout(() => navigate(from, { replace: true }), 1000)
        } else {
          setSuccessMessage('Account registered! Please check your email inbox to confirm, or proceed to log in.')
          setIsSignUp(false)
        }
      } else {
        // Log in to existing admin account
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        navigate(from, { replace: true })
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden selection:bg-primary/20">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border border-border/70"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="liquid-glass border border-border/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          
          {/* Studio Icon & Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center mb-4 shadow-lg">
              <Shield size={22} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Portfolio Studio
            </h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {isSignUp ? 'Initialize your primary admin credentials' : 'Authenticate to manage content & live projects'}
            </p>
          </div>

          {/* Feedback Alerts */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-start gap-2.5"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-start gap-2.5"
              >
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5 font-medium">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jayeed.pro.bd"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/60 border border-border/80 focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-secondary/60 border border-border/80 focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Admin Account' : 'Sign In to Dashboard'}</span>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-[11px] text-muted-foreground/80 font-mono flex items-center justify-center gap-1.5">
              <Shield size={12} className="text-emerald-500" />
              <span>Restricted Access · Authorized Portfolio Owner Only</span>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
