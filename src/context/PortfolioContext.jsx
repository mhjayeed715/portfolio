import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
  initialProjects,
  initialSkillPillars,
  initialServices,
  initialEducation,
  initialSiteSettings,
} from '../data/initialPortfolioData'

const PortfolioContext = createContext(null)

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_cms_projects',
  SKILLS: 'portfolio_cms_skills',
  SERVICES: 'portfolio_cms_services',
  EDUCATION: 'portfolio_cms_education',
  SETTINGS: 'portfolio_cms_settings',
}

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.PROJECTS)
      if (cached) {
        try { return JSON.parse(cached) } catch {}
      }
    }
    return initialProjects
  })

  const [skills, setSkills] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.SKILLS)
      if (cached) {
        try { return JSON.parse(cached) } catch {}
      }
    }
    return initialSkillPillars
  })

  const [services, setServices] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.SERVICES)
      if (cached) {
        try { return JSON.parse(cached) } catch {}
      }
    }
    return initialServices
  })

  const [education, setEducation] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.EDUCATION)
      if (cached) {
        try { return JSON.parse(cached) } catch {}
      }
    }
    return initialEducation
  })

  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      if (cached) {
        try { return JSON.parse(cached) } catch {}
      }
    }
    return initialSiteSettings
  })

  const [isLoading, setIsLoading] = useState(true)
  const [supabaseConnected, setSupabaseConnected] = useState(false)

  // Fetch live data from Supabase on mount
  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      // 1. Projects
      const { data: projData, error: projErr } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (!projErr && projData && projData.length > 0) {
        setProjects(projData)
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projData))
        setSupabaseConnected(true)
      }

      // 2. Skills
      const { data: skillData, error: skillErr } = await supabase
        .from('portfolio_skills')
        .select('*')
        .order('order_index', { ascending: true })

      if (!skillErr && skillData && skillData.length > 0) {
        setSkills(skillData)
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillData))
      }

      // 3. Services
      const { data: srvData, error: srvErr } = await supabase
        .from('portfolio_services')
        .select('*')
        .order('order_index', { ascending: true })

      if (!srvErr && srvData && srvData.length > 0) {
        setServices(srvData)
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(srvData))
      }

      // 4. Education
      const { data: eduData, error: eduErr } = await supabase
        .from('portfolio_education')
        .select('*')
        .order('order_index', { ascending: true })

      if (!eduErr && eduData && eduData.length > 0) {
        setEducation(eduData)
        localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(eduData))
      }

      // 5. Settings
      const { data: settData, error: settErr } = await supabase
        .from('portfolio_settings')
        .select('*')
        .eq('id', 'general')
        .single()

      if (!settErr && settData) {
        const formatted = {
          heroHeadline: settData.hero_headline || initialSiteSettings.heroHeadline,
          heroRoles: settData.hero_roles || initialSiteSettings.heroRoles,
          heroAvailability: settData.hero_availability || initialSiteSettings.heroAvailability,
          heroSubtext: settData.hero_subtext || initialSiteSettings.heroSubtext,
          aboutBio: settData.about_bio || initialSiteSettings.aboutBio,
          resumeUrl: settData.resume_url || initialSiteSettings.resumeUrl,
        }
        setSettings(formatted)
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(formatted))
      }
    } catch (err) {
      console.warn('[PortfolioContext] Supabase fetch fallback to local cache:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  // ==================== MUTATION HELPERS ====================

  const saveProject = async (projectData) => {
    try {
      let updatedList
      const isExisting = projectData.id && projects.some((p) => p.id === projectData.id)

      if (isExisting) {
        updatedList = projects.map((p) => (p.id === projectData.id ? { ...p, ...projectData } : p))
      } else {
        const newId = Date.now()
        const newProj = { ...projectData, id: newId, order_index: projects.length + 1 }
        updatedList = [...projects, newProj]
      }

      // Optimistic local update
      setProjects(updatedList)
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedList))

      // Sync to Supabase if available
      if (supabase) {
        const payload = {
          title: projectData.title,
          category: projectData.category || 'web',
          subtitle: projectData.subtitle || '',
          award: projectData.award || null,
          description: projectData.description,
          highlights: projectData.highlights || [],
          image: projectData.image,
          tech: projectData.tech || [],
          github: projectData.github || null,
          live: projectData.live || null,
          flagship: Boolean(projectData.flagship),
          order_index: projectData.order_index || 0,
        }

        if (isExisting && typeof projectData.id === 'number' && projectData.id < 1000000000) {
          await supabase.from('portfolio_projects').update(payload).eq('id', projectData.id)
        } else {
          await supabase.from('portfolio_projects').insert([payload])
        }
      }

      return { success: true }
    } catch (err) {
      console.error('Error saving project:', err)
      return { success: false, error: err.message }
    }
  }

  const deleteProject = async (projectId) => {
    try {
      const updatedList = projects.filter((p) => p.id !== projectId)
      setProjects(updatedList)
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedList))

      if (supabase && typeof projectId === 'number' && projectId < 1000000000) {
        await supabase.from('portfolio_projects').delete().eq('id', projectId)
      }
      return { success: true }
    } catch (err) {
      console.error('Error deleting project:', err)
      return { success: false, error: err.message }
    }
  }

  const reorderProjects = async (newOrderedProjects) => {
    try {
      const indexed = newOrderedProjects.map((p, idx) => ({ ...p, order_index: idx + 1 }))
      setProjects(indexed)
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(indexed))

      if (supabase) {
        for (const p of indexed) {
          if (typeof p.id === 'number' && p.id < 1000000000) {
            await supabase.from('portfolio_projects').update({ order_index: p.order_index }).eq('id', p.id)
          }
        }
      }
      return { success: true }
    } catch (err) {
      console.error('Error reordering projects:', err)
      return { success: false, error: err.message }
    }
  }

  const saveSkills = async (newSkills) => {
    try {
      setSkills(newSkills)
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(newSkills))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const saveServices = async (newServices) => {
    try {
      setServices(newServices)
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(newServices))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const saveEducation = async (newEducation) => {
    try {
      setEducation(newEducation)
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(newEducation))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const saveSettings = async (newSettings) => {
    try {
      setSettings(newSettings)
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings))

      if (supabase) {
        await supabase.from('portfolio_settings').upsert({
          id: 'general',
          hero_headline: newSettings.heroHeadline,
          hero_roles: newSettings.heroRoles,
          hero_availability: newSettings.heroAvailability,
          hero_subtext: newSettings.heroSubtext,
          about_bio: newSettings.aboutBio,
          resume_url: newSettings.resumeUrl,
          updated_at: new Date().toISOString(),
        })
      }
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        skills,
        services,
        education,
        settings,
        isLoading,
        supabaseConnected,
        fetchAllData,
        saveProject,
        deleteProject,
        reorderProjects,
        saveSkills,
        saveServices,
        saveEducation,
        saveSettings,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return ctx
}
