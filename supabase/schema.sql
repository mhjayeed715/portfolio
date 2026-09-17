-- ================================================================
-- Portfolio CMS Schema & Seed Script (Supabase / PostgreSQL)
-- Target Project: https://ozoogkghptkomyzxlbvs.supabase.co
-- ================================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'web',
  subtitle TEXT,
  award TEXT,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  tech JSONB DEFAULT '[]'::jsonb,
  github TEXT,
  live TEXT,
  flagship BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portfolio_skills (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  icon TEXT DEFAULT 'Code2',
  summary TEXT,
  stack TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portfolio_services (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'Zap',
  tags TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portfolio_education (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  degree TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT,
  gpa TEXT,
  detail TEXT,
  logo TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portfolio_settings (
  id TEXT PRIMARY KEY DEFAULT 'general',
  hero_headline TEXT,
  hero_roles TEXT[] DEFAULT '{}',
  hero_availability TEXT,
  hero_subtext TEXT,
  about_bio TEXT,
  resume_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Grant Permissions to anon & authenticated roles (RLS handles row-level security)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Policies (Allow anyone visiting portfolio to read data)
DROP POLICY IF EXISTS "Public read portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Public read portfolio_projects" ON public.portfolio_projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read portfolio_skills" ON public.portfolio_skills;
CREATE POLICY "Public read portfolio_skills" ON public.portfolio_skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read portfolio_services" ON public.portfolio_services;
CREATE POLICY "Public read portfolio_services" ON public.portfolio_services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read portfolio_education" ON public.portfolio_education;
CREATE POLICY "Public read portfolio_education" ON public.portfolio_education FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read portfolio_settings" ON public.portfolio_settings;
CREATE POLICY "Public read portfolio_settings" ON public.portfolio_settings FOR SELECT USING (true);

-- 4. Authenticated Admin Write Policies (Strictly restricted to verified owner email)
DROP POLICY IF EXISTS "Admin write portfolio_projects" ON public.portfolio_projects;
CREATE POLICY "Admin write portfolio_projects" ON public.portfolio_projects FOR ALL TO authenticated 
USING (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com') 
WITH CHECK (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com');

DROP POLICY IF EXISTS "Admin write portfolio_skills" ON public.portfolio_skills;
CREATE POLICY "Admin write portfolio_skills" ON public.portfolio_skills FOR ALL TO authenticated 
USING (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com') 
WITH CHECK (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com');

DROP POLICY IF EXISTS "Admin write portfolio_services" ON public.portfolio_services;
CREATE POLICY "Admin write portfolio_services" ON public.portfolio_services FOR ALL TO authenticated 
USING (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com') 
WITH CHECK (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com');

DROP POLICY IF EXISTS "Admin write portfolio_education" ON public.portfolio_education;
CREATE POLICY "Admin write portfolio_education" ON public.portfolio_education FOR ALL TO authenticated 
USING (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com') 
WITH CHECK (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com');

DROP POLICY IF EXISTS "Admin write portfolio_settings" ON public.portfolio_settings;
CREATE POLICY "Admin write portfolio_settings" ON public.portfolio_settings FOR ALL TO authenticated 
USING (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com') 
WITH CHECK (lower(auth.jwt() ->> 'email') = 'mehrabjayeed715@gmail.com');

-- 5. Seed Initial Projects (All 9 Projects)
INSERT INTO public.portfolio_projects (title, category, subtitle, award, description, highlights, image, tech, github, live, flagship, order_index)
VALUES 
  (
    'UniShareSync Mobile App',
    'mobile',
    'Cross-Platform Campus Ecosystem',
    '🏆 2nd Place Winner — Software Project Showcase 2026',
    'Unified university mobile ecosystem built with Flutter and Supabase. Features an AI Campus Assistant with Groq RAG querying, real-time collaborative whiteboards, bus transit tracking via OpenStreetMap, and QR event check-ins.',
    ARRAY['Flutter & Supabase', 'AI RAG Assistant', 'Real-time Whiteboard', 'OpenStreetMap Transit', 'CampusShare P2P'],
    '/projects/unisharesync_mobile.png',
    '[{"name": "Flutter", "icon": "/icons/flutter-original.svg"}, {"name": "Dart", "icon": "/icons/dart-original.svg"}, {"name": "Supabase", "icon": "/icons/supabase-original.svg"}, {"name": "Postman", "icon": "/icons/postman-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/UniShareSync-Mobile-App',
    'https://unisharesync.vercel.app/',
    true,
    1
  ),
  (
    'Focusnyx',
    'web',
    'Student Life OS & Cognitive Shield',
    NULL,
    'Full-stack productivity operating system and cognitive shield for neurodivergent learners. Combines Next.js 14, Chrome MV3 distraction blocker, and Win32 focus enforcement.',
    ARRAY['Next.js 14 & Supabase', 'Chrome MV3 Extension', 'Win32 System Hooks', 'AI Behavioral Coach'],
    '/projects/focusnyx.png',
    '[{"name": "React", "icon": "/icons/react-original.svg"}, {"name": "TypeScript", "icon": "/icons/typescript-original.svg"}, {"name": "Node.js", "icon": "/icons/nodejs-original.svg"}, {"name": "Supabase", "icon": "/icons/supabase-original.svg"}, {"name": "Python", "icon": "/icons/python-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/Focusnyx',
    'https://focusnyx.vercel.app/',
    false,
    2
  ),
  (
    'Double Gap Index (DGI)',
    'ai',
    'Interpretable Policy Intelligence Framework',
    'Empirical Policy AI · 64 Districts',
    'Interpretable policy intelligence platform empirically mapping compounded digital exclusion and physical service access gaps across all 64 districts of Bangladesh. Built with Next.js 15, Python ML pipeline (K-Means & SHAP attribution), MapLibre GL GIS vectors, and Supabase.',
    ARRAY['Next.js 15 & Supabase', 'Python ETL & ML', 'MapLibre Vector GIS', 'K-Means & SHAP', 'Two Scores Axiom'],
    '/projects/DoubleGapIndex.png',
    '[{"name": "React", "icon": "/icons/react-original.svg"}, {"name": "Python", "icon": "/icons/python-original.svg"}, {"name": "TypeScript", "icon": "/icons/typescript-original.svg"}, {"name": "Supabase", "icon": "/icons/supabase-original.svg"}, {"name": "PostgreSQL", "icon": "/icons/postgresql-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/Double-Gap-Index-DGI',
    'https://doublegapindex.vercel.app/',
    false,
    3
  ),
  (
    'GigCampus',
    'web',
    'Campus Micro-Task Marketplace',
    NULL,
    'Peer-to-peer campus task platform with verified student ID authentication, real-time Socket.IO chat, order lifecycle tracking, and automated ghosting detection.',
    ARRAY['CS50x Capstone', 'Socket.IO Chat', 'Order Tracking', 'Ghosting Shield'],
    '/projects/GigCampus.png',
    '[{"name": "Python", "icon": "/icons/python-original.svg"}, {"name": "Flask", "icon": "/icons/flask-original.svg"}, {"name": "SQLite", "icon": "/icons/sqlite-original.svg"}, {"name": "Socket.IO", "icon": "/icons/socketio-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/GigCampus',
    'https://gigcampus-7er7.onrender.com/',
    false,
    4
  ),
  (
    'UniShareSync Web App',
    'web',
    'Academic Resource Platform',
    NULL,
    'Full-stack academic portal for resource sharing, event scheduling, and department collaboration with email OTP security and role-based access control.',
    ARRAY['Email OTP Auth', 'RBAC Security', 'Real-time Sync', 'RESTful API'],
    '/projects/unisharesync.png',
    '[{"name": "React", "icon": "/icons/react-original.svg"}, {"name": "Node.js", "icon": "/icons/nodejs-original.svg"}, {"name": "PostgreSQL", "icon": "/icons/postgresql-original.svg"}, {"name": "Tailwind CSS", "icon": "/icons/tailwindcss-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/UniShareSync',
    'https://unisharesyncweb.vercel.app/',
    false,
    5
  ),
  (
    'Servyn',
    'mobile',
    'On-Demand Local Service Booking',
    NULL,
    'Flutter-based mobile application connecting verified service providers with local customers via phone OTP verification and automated SMS notifications.',
    ARRAY['Phone OTP Auth', 'SMS Alerts', 'Provider Dashboard'],
    '/projects/servyn.png',
    '[{"name": "Flutter", "icon": "/icons/flutter-original.svg"}, {"name": "Dart", "icon": "/icons/dart-original.svg"}, {"name": "Supabase", "icon": "/icons/supabase-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/servyn',
    NULL,
    false,
    6
  ),
  (
    'SkillVoyage',
    'web',
    'Interactive Skill Roadmap & Goal Tracker',
    NULL,
    'MERN stack application enabling learners to set progressive milestones, track metrics through interactive dashboards, and receive curated skill recommendations.',
    ARRAY['Interactive Dashboards', 'JWT Sessions', 'Custom Roadmaps'],
    '/projects/skillvoyage.png',
    '[{"name": "React", "icon": "/icons/react-original.svg"}, {"name": "MongoDB", "icon": "/icons/mongodb-original.svg"}, {"name": "Express.js", "icon": "/icons/express-original.svg"}, {"name": "Node.js", "icon": "/icons/nodejs-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/skillvoyage',
    'https://skillvoyage-frontend.vercel.app/',
    false,
    7
  ),
  (
    'AI Drainage Optimizer',
    'ai',
    'Predictive Urban Flooding Analytics',
    NULL,
    'Machine learning model analyzing precipitation and urban terrain to predict waterlogging hotspots and assist municipal drainage planning.',
    ARRAY['ML Predictive Pipeline', 'Terrain Modeling', 'Data Analytics'],
    '/projects/ai-drainage.png',
    '[{"name": "Python", "icon": "/icons/python-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/AI-Powered-Smart-Waterlogging-and-Drainage-Optimizer',
    NULL,
    false,
    8
  ),
  (
    'UniShareSyncFX',
    'ai',
    'Desktop Resource Client with Offline Cache',
    NULL,
    'JavaFX desktop application with MySQL replication, local cache synchronization, and department communication tools.',
    ARRAY['JavaFX Desktop UI', 'MySQL Replication', 'Offline Cache'],
    '/projects/unisharesyncfx.png',
    '[{"name": "Java", "icon": "/icons/java-original.svg"}, {"name": "MySQL", "icon": "/icons/mysql-original.svg"}]'::jsonb,
    'https://github.com/mhjayeed715/UniShareSyncFX',
    NULL,
    false,
    9
  )
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Site Settings
INSERT INTO public.portfolio_settings (id, hero_headline, hero_roles, hero_availability, hero_subtext, about_bio, resume_url)
VALUES (
  'general',
  'Building Scalable Software & Mobile MVPs.',
  ARRAY['Full-Stack Developer', 'Mobile MVP Architect', 'React & Flutter Specialist', 'AI-Assisted Engineer'],
  'Available for Opportunities',
  'I turn early-stage ideas into dependable iOS, Android, and web products that are clear to use, robust to build, and ready to launch.',
  'Full-Stack & Mobile Developer specializing in high-velocity MVP execution. I bridge clean interface design with hardened backend architectures, helping founders and engineering teams build products that look refined and scale cleanly.',
  '#'
)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- 7. Supabase Storage Bucket Setup (for CV, Resume, and Project Assets)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-assets',
  'portfolio-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public read portfolio-assets" ON storage.objects;
CREATE POLICY "Public read portfolio-assets" ON storage.objects 
FOR SELECT USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Admin upload portfolio-assets" ON storage.objects;
CREATE POLICY "Admin upload portfolio-assets" ON storage.objects 
FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Admin update portfolio-assets" ON storage.objects;
CREATE POLICY "Admin update portfolio-assets" ON storage.objects 
FOR UPDATE TO authenticated 
USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Admin delete portfolio-assets" ON storage.objects;
CREATE POLICY "Admin delete portfolio-assets" ON storage.objects 
FOR DELETE TO authenticated 
USING (bucket_id = 'portfolio-assets');

