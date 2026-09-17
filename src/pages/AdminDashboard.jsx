import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderKanban,
  Code2,
  Briefcase,
  GraduationCap,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  LogOut,
  Save,
  Upload,
  FileDown,
  FileText,
  Link2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Database,
  Layers,
  X,
  Star,
  Globe,
  Smartphone,
  Cpu,
} from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import { supabase } from '../lib/supabase'

const tabs = [
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills & Tech', icon: Code2 },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'settings', label: 'Site Settings', icon: SettingsIcon },
]

export default function AdminDashboard() {
  const {
    projects,
    skills,
    services,
    education,
    settings,
    saveProject,
    deleteProject,
    reorderProjects,
    saveSkills,
    saveServices,
    saveEducation,
    saveSettings,
    supabaseConnected,
  } = usePortfolio()

  const [activeTab, setActiveTab] = useState('projects')
  const [toast, setToast] = useState(null)

  // Project Editor State
  const [editingProject, setEditingProject] = useState(null)
  const [isNewProject, setIsNewProject] = useState(false)

  // Resume upload state
  const [resumeUploading, setResumeUploading] = useState(false)
  const [resumeFileName, setResumeFileName] = useState('')

  // Local form state for Skills, Services, Education, Settings
  const [skillsForm, setSkillsForm] = useState(skills)
  const [servicesForm, setServicesForm] = useState(services)
  const [educationForm, setEducationForm] = useState(education)
  const [settingsForm, setSettingsForm] = useState(settings)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3200)
  }

  // Resume file upload handler
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      showToast('Only PDF files are allowed for resume upload.', 'error')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Resume file must be under 5MB.', 'error')
      return
    }

    setResumeUploading(true)
    setResumeFileName(file.name)

    try {
      if (!supabase) {
        showToast('Supabase not connected. Cannot upload files.', 'error')
        setResumeUploading(false)
        return
      }

      // Upload to Supabase Storage with clean professional filename
      const sanitizedName = file.name
        ? file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        : 'SM_Mehrab_Hossain_Jayeed_Resume.pdf'
      const fileName = sanitizedName.toLowerCase().endsWith('.pdf') ? sanitizedName : `${sanitizedName}.pdf`

      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'application/pdf',
        })

      if (error) {
        // If bucket doesn't exist, try to create it
        if (error.message?.includes('not found') || error.statusCode === 404) {
          showToast('Storage bucket "portfolio-assets" not found. Please create it in Supabase Dashboard → Storage.', 'error')
        } else {
          showToast(`Upload failed: ${error.message}`, 'error')
        }
        setResumeUploading(false)
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName)

      if (urlData?.publicUrl) {
        setSettingsForm((prev) => ({ ...prev, resumeUrl: urlData.publicUrl }))
        showToast('Resume uploaded successfully!')
      }
    } catch (err) {
      showToast(`Upload error: ${err.message}`, 'error')
    } finally {
      setResumeUploading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  // Project Actions
  const handleOpenNewProject = () => {
    setEditingProject({
      title: '',
      category: 'web',
      subtitle: '',
      award: '',
      description: '',
      highlights: [],
      image: '/projects/DoubleGapIndex.png',
      tech: [],
      github: '',
      live: '',
      flagship: false,
    })
    setIsNewProject(true)
  }

  const handleSaveProjectModal = async (e) => {
    e.preventDefault()
    if (!editingProject.title.trim()) return

    const res = await saveProject(editingProject)
    if (res.success) {
      showToast(isNewProject ? 'Project added successfully!' : 'Project updated successfully!')
      setEditingProject(null)
    } else {
      showToast(res.error || 'Failed to save project', 'error')
    }
  }

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await deleteProject(id)
      if (res.success) {
        showToast('Project deleted.')
      }
    }
  }

  const handleMoveProject = async (index, direction) => {
    const newIdx = direction === 'up' ? index - 1 : index + 1
    if (newIdx < 0 || newIdx >= projects.length) return

    const updated = [...projects]
    const temp = updated[index]
    updated[index] = updated[newIdx]
    updated[newIdx] = temp

    await reorderProjects(updated)
    showToast('Project order updated.')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 pb-20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono font-medium border ${
              toast.type === 'error'
                ? 'bg-destructive/90 text-destructive-foreground border-destructive'
                : 'bg-foreground text-background border-foreground shadow-emerald-500/10'
            }`}
          >
            <CheckCircle2 size={16} />
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-foreground text-background flex items-center justify-center font-bold text-sm shadow-sm">
              J
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground">
                  Portfolio Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${supabaseConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>{supabaseConnected ? 'Supabase Live Connected' : 'Local Storage Mode'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border/80 hover:bg-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span>View Portfolio</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive text-xs font-mono text-muted-foreground transition-colors cursor-pointer border border-border/60"
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStudioTab"
                    className="absolute inset-0 bg-secondary/80 border border-border rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon size={16} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
                {tab.id === 'projects' && (
                  <span className="relative z-10 px-1.5 py-0.2 rounded-md bg-foreground/10 text-[10px] font-mono">
                    {projects.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                  Manage Projects ({projects.length})
                </h2>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  Drag, reorder, or edit projects appearing in the Work section
                </p>
              </div>
              <button
                onClick={handleOpenNewProject}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table / List */}
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 sm:p-5 rounded-2xl liquid-glass border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-border transition-colors group"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Index & Reorder Buttons */}
                    <div className="flex flex-col items-center gap-1 shrink-0 text-muted-foreground">
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveProject(idx, 'up')}
                        className="p-1 rounded-md hover:bg-secondary disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <span className="font-mono text-xs font-bold text-foreground/80">#{idx + 1}</span>
                      <button
                        disabled={idx === projects.length - 1}
                        onClick={() => handleMoveProject(idx, 'down')}
                        className="p-1 rounded-md hover:bg-secondary disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        title="Move Down"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>

                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-xl overflow-hidden border border-border bg-secondary shrink-0">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-display font-bold text-sm sm:text-base text-foreground truncate">
                          {proj.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-secondary text-muted-foreground border border-border/60">
                          {proj.category}
                        </span>
                        {proj.flagship && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> Flagship
                          </span>
                        )}
                        {proj.award && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                            {proj.award}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {proj.subtitle || proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => {
                        setEditingProject({ ...proj })
                        setIsNewProject(false)
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 hover:bg-secondary text-xs font-mono text-foreground transition-colors cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.title)}
                      className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Technical Capabilities & Pillars
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Edit the 4 core technical pillars displayed in the Skills section
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsForm.map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-6 rounded-2xl liquid-glass border border-border/80 space-y-4">
                  <div className="flex items-center gap-2">
                    <Code2 size={18} className="text-primary" />
                    <input
                      type="text"
                      value={pillar.category}
                      onChange={(e) => {
                        const updated = [...skillsForm]
                        updated[idx].category = e.target.value
                        setSkillsForm(updated)
                      }}
                      className="font-display font-bold text-sm text-foreground bg-transparent border-b border-border/60 focus:border-foreground outline-none w-full"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-muted-foreground block mb-1">Pillar Summary</label>
                    <textarea
                      rows={2}
                      value={pillar.summary}
                      onChange={(e) => {
                        const updated = [...skillsForm]
                        updated[idx].summary = e.target.value
                        setSkillsForm(updated)
                      }}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                      Stack Items (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={pillar.stack?.join(', ') || ''}
                      onChange={(e) => {
                        const updated = [...skillsForm]
                        updated[idx].stack = e.target.value.split(',').map((s) => s.trim())
                        setSkillsForm(updated)
                      }}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none focus:border-foreground font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                await saveSkills(skillsForm)
                showToast('Skills updated successfully!')
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-md"
            >
              <Save size={14} />
              <span>Save All Skills</span>
            </button>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Services & Offerings
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Edit service offerings, client deliverables, and capability tags
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicesForm.map((srv, idx) => (
                <div key={srv.id || idx} className="p-5 rounded-2xl liquid-glass border border-border/80 space-y-3">
                  <input
                    type="text"
                    value={srv.title}
                    onChange={(e) => {
                      const updated = [...servicesForm]
                      updated[idx].title = e.target.value
                      setServicesForm(updated)
                    }}
                    className="font-display font-bold text-sm text-foreground bg-transparent border-b border-border/60 focus:border-foreground outline-none w-full"
                  />
                  <textarea
                    rows={3}
                    value={srv.description}
                    onChange={(e) => {
                      const updated = [...servicesForm]
                      updated[idx].description = e.target.value
                      setServicesForm(updated)
                    }}
                    className="w-full p-2 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none focus:border-foreground"
                  />
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">Tags</label>
                    <input
                      type="text"
                      value={srv.tags?.join(', ') || ''}
                      onChange={(e) => {
                        const updated = [...servicesForm]
                        updated[idx].tags = e.target.value.split(',').map((s) => s.trim())
                        setServicesForm(updated)
                      }}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                await saveServices(servicesForm)
                showToast('Services updated successfully!')
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-md"
            >
              <Save size={14} />
              <span>Save All Services</span>
            </button>
          </div>
        )}

        {/* TAB 4: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Education & Academic Records
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Edit degrees, CGPA/GPA, institutions, and timelines
              </p>
            </div>

            <div className="space-y-4">
              {educationForm.map((edu, idx) => (
                <div key={edu.id || idx} className="p-5 rounded-2xl liquid-glass border border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.name}
                      onChange={(e) => {
                        const updated = [...educationForm]
                        updated[idx].name = e.target.value
                        setEducationForm(updated)
                      }}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">Degree / Certificate</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...educationForm]
                        updated[idx].degree = e.target.value
                        setEducationForm(updated)
                      }}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">CGPA / GPA</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => {
                        const updated = [...educationForm]
                        updated[idx].gpa = e.target.value
                        setEducationForm(updated)
                      }}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground block mb-1">Date / Year</label>
                    <input
                      type="text"
                      value={edu.date}
                      onChange={(e) => {
                        const updated = [...educationForm]
                        updated[idx].date = e.target.value
                        setEducationForm(updated)
                      }}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                await saveEducation(educationForm)
                showToast('Education updated successfully!')
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-md"
            >
              <Save size={14} />
              <span>Save Education</span>
            </button>
          </div>
        )}

        {/* TAB 5: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Site & Profile Settings
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Tweak Hero headline, typewriter animated roles, bio text, and resume link
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass border border-border/80 space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={settingsForm.heroHeadline || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border/70 text-sm text-foreground outline-none font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">
                  Typewriter Animated Roles (comma-separated)
                </label>
                <input
                  type="text"
                  value={settingsForm.heroRoles?.join(', ') || ''}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      heroRoles: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">
                  Availability Chip Status
                </label>
                <input
                  type="text"
                  value={settingsForm.heroAvailability || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroAvailability: e.target.value })}
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">
                  Hero Subtext Description
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.heroSubtext || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtext: e.target.value })}
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">
                  About Bio Summary
                </label>
                <textarea
                  rows={3}
                  value={settingsForm.aboutBio || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aboutBio: e.target.value })}
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none"
                />
              </div>
            </div>

            {/* Resume File Management Section */}
            <div className="p-6 rounded-2xl liquid-glass border border-border/80 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} className="text-foreground" />
                <h3 className="text-sm font-display font-bold text-foreground tracking-tight">Resume / CV Management</h3>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground -mt-2">
                Upload a new resume PDF or set a custom URL. This controls the resume download button on Hero section.
              </p>

              {/* Current Resume Preview */}
              {settingsForm.resumeUrl && settingsForm.resumeUrl !== '#' && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <FileDown size={16} className="text-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Current Resume</p>
                    <p className="text-[10px] font-mono text-muted-foreground truncate">{settingsForm.resumeUrl}</p>
                  </div>
                  <a
                    href={settingsForm.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/20 transition-colors shrink-0"
                    title="Preview current resume"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* File Upload */}
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1.5 font-medium">
                  Upload New Resume (PDF, max 5MB)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleResumeUpload}
                    disabled={resumeUploading}
                    className="hidden"
                    id="resume-upload-input"
                  />
                  <label
                    htmlFor="resume-upload-input"
                    className={`flex items-center gap-2 w-full p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                      resumeUploading
                        ? 'border-foreground/40 bg-foreground/5'
                        : 'border-border/80 bg-secondary/30 hover:border-foreground/50 hover:bg-secondary/60'
                    }`}
                  >
                    {resumeUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-foreground/40 border-t-foreground rounded-full animate-spin" />
                        <span className="text-xs font-mono text-muted-foreground">Uploading {resumeFileName}...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} className="text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">Click to select a PDF file</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Manual URL Input */}
              <div>
                <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium flex items-center gap-1.5">
                  <Link2 size={12} />
                  Or set Resume URL manually
                </label>
                <input
                  type="text"
                  value={settingsForm.resumeUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, resumeUrl: e.target.value })}
                  placeholder="e.g. /SM_Mehrab_Hossain_Jayeed_Resume.pdf or https://..."
                  className="w-full p-3 rounded-xl bg-secondary/50 border border-border/70 text-xs text-foreground outline-none font-mono"
                />
              </div>

              {!supabaseConnected && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                    Supabase not connected. File upload requires Supabase Storage. You can still set a manual URL path.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={async () => {
                await saveSettings(settingsForm)
                showToast('Settings saved successfully!')
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-md"
            >
              <Save size={14} />
              <span>Save Settings</span>
            </button>
          </div>
        )}
      </main>

      {/* PROJECT EDIT / CREATE DRAWER MODAL */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent="true"
              className="w-full max-w-xl h-full sm:h-[94vh] bg-background border-l sm:border border-border/80 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border/60 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {isNewProject ? 'Create New Project' : `Edit: ${editingProject.title}`}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Configure presentation and metadata for this project card
                  </p>
                </div>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body Form */}
              <form onSubmit={handleSaveProjectModal} className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. Double Gap Index"
                    className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-sm font-semibold text-foreground outline-none focus:border-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs font-medium text-foreground outline-none focus:border-foreground cursor-pointer"
                    >
                      <option value="web">Full-Stack Web</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="ai">AI & Systems</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Flagship Project</label>
                    <label className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs font-medium text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editingProject.flagship)}
                        onChange={(e) => setEditingProject({ ...editingProject, flagship: e.target.checked })}
                        className="rounded"
                      />
                      <span>Featured #1 Card</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Subtitle / Punchline</label>
                  <input
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    placeholder="e.g. Interpretable Policy Intelligence Framework"
                    className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none focus:border-foreground"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Award / Badge (optional)</label>
                  <input
                    type="text"
                    value={editingProject.award || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, award: e.target.value })}
                    placeholder="e.g. 🏆 2nd Place Winner"
                    className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none focus:border-foreground font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none focus:border-foreground leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">
                    Highlights (comma-separated bullets)
                  </label>
                  <input
                    type="text"
                    value={editingProject.highlights?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    placeholder="e.g. Next.js 15, Python ML, MapLibre GIS"
                    className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Cover Image Path / URL *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="/projects/DoubleGapIndex.png"
                    className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={editingProject.github || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground block mb-1 font-medium">Live Demo URL</label>
                    <input
                      type="url"
                      value={editingProject.live || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, live: e.target.value })}
                      placeholder="https://..."
                      className="w-full p-3 rounded-xl bg-secondary/60 border border-border/80 text-xs text-foreground outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2.5 rounded-xl border border-border/70 hover:bg-secondary text-xs font-mono text-muted-foreground cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Save size={14} />
                    <span>Save Project</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
