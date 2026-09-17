export const initialProjects = [
  {
    id: 1,
    title: 'UniShareSync Mobile App',
    category: 'mobile',
    subtitle: 'Cross-Platform Campus Ecosystem',
    award: '🏆 2nd Place Winner — Software Project Showcase 2026',
    description:
      'Unified university mobile ecosystem built with Flutter and Supabase. Features an AI Campus Assistant with Groq RAG querying, real-time collaborative whiteboards, bus transit tracking via OpenStreetMap, and QR event check-ins.',
    highlights: ['Flutter & Supabase', 'AI RAG Assistant', 'Real-time Whiteboard', 'OpenStreetMap Transit', 'CampusShare P2P'],
    image: '/projects/unisharesync_mobile.png',
    tech: [
      { name: 'Flutter', icon: '/icons/flutter-original.svg' },
      { name: 'Dart', icon: '/icons/dart-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
      { name: 'Postman', icon: '/icons/postman-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSync-Mobile-App',
    live: 'https://unisharesync.vercel.app/',
    flagship: true,
  },
  {
    id: 2,
    title: 'Focusnyx',
    category: 'web',
    subtitle: 'Student Life OS & Cognitive Shield',
    description:
      'Full-stack productivity operating system and cognitive shield for neurodivergent learners. Combines Next.js 14, Chrome MV3 distraction blocker, and Win32 focus enforcement.',
    highlights: ['Next.js 14 & Supabase', 'Chrome MV3 Extension', 'Win32 System Hooks', 'AI Behavioral Coach'],
    image: '/projects/focusnyx.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
      { name: 'Python', icon: '/icons/python-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/Focusnyx',
    live: 'https://focusnyx.vercel.app/',
  },
  {
    id: 3,
    title: 'Double Gap Index (DGI)',
    category: 'ai',
    subtitle: 'Interpretable Policy Intelligence Framework',
    award: 'Empirical Policy AI · 64 Districts',
    description:
      'Interpretable policy intelligence platform empirically mapping compounded digital exclusion and physical service access gaps across all 64 districts of Bangladesh. Built with Next.js 15, Python ML pipeline (K-Means & SHAP attribution), MapLibre GL GIS vectors, and Supabase.',
    highlights: ['Next.js 15 & Supabase', 'Python ETL & ML', 'MapLibre Vector GIS', 'K-Means & SHAP', 'Two Scores Axiom'],
    image: '/projects/DoubleGapIndex.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'Python', icon: '/icons/python-original.svg' },
      { name: 'TypeScript', icon: '/icons/typescript-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/Double-Gap-Index-DGI',
    live: 'https://doublegapindex.vercel.app/',
  },
  {
    id: 4,
    title: 'GigCampus',
    category: 'web',
    subtitle: 'Campus Micro-Task Marketplace',
    description:
      'Peer-to-peer campus task platform with verified student ID authentication, real-time Socket.IO chat, order lifecycle tracking, and automated ghosting detection.',
    highlights: ['CS50x Capstone', 'Socket.IO Chat', 'Order Tracking', 'Ghosting Shield'],
    image: '/projects/GigCampus.png',
    tech: [
      { name: 'Python', icon: '/icons/python-original.svg' },
      { name: 'Flask', icon: '/icons/flask-original.svg' },
      { name: 'SQLite', icon: '/icons/sqlite-original.svg' },
      { name: 'Socket.IO', icon: '/icons/socketio-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/GigCampus',
    live: 'https://gigcampus-7er7.onrender.com/',
  },
  {
    id: 5,
    title: 'UniShareSync Web App',
    category: 'web',
    subtitle: 'Academic Resource Platform',
    description:
      'Full-stack academic portal for resource sharing, event scheduling, and department collaboration with email OTP security and role-based access control.',
    highlights: ['Email OTP Auth', 'RBAC Security', 'Real-time Sync', 'RESTful API'],
    image: '/projects/unisharesync.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSync',
    live: 'https://unisharesyncweb.vercel.app/',
  },
  {
    id: 6,
    title: 'Servyn',
    category: 'mobile',
    subtitle: 'On-Demand Local Service Booking',
    description:
      'Flutter-based mobile application connecting verified service providers with local customers via phone OTP verification and automated SMS notifications.',
    highlights: ['Phone OTP Auth', 'SMS Alerts', 'Provider Dashboard'],
    image: '/projects/servyn.png',
    tech: [
      { name: 'Flutter', icon: '/icons/flutter-original.svg' },
      { name: 'Dart', icon: '/icons/dart-original.svg' },
      { name: 'Supabase', icon: '/icons/supabase-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/servyn',
  },
  {
    id: 7,
    title: 'SkillVoyage',
    category: 'web',
    subtitle: 'Interactive Skill Roadmap & Goal Tracker',
    description:
      'MERN stack application enabling learners to set progressive milestones, track metrics through interactive dashboards, and receive curated skill recommendations.',
    highlights: ['Interactive Dashboards', 'JWT Sessions', 'Custom Roadmaps'],
    image: '/projects/skillvoyage.png',
    tech: [
      { name: 'React', icon: '/icons/react-original.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb-original.svg' },
      { name: 'Express.js', icon: '/icons/express-original.svg' },
      { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/skillvoyage',
    live: 'https://skillvoyage-frontend.vercel.app/',
  },
  {
    id: 8,
    title: 'AI Drainage Optimizer',
    category: 'ai',
    subtitle: 'Predictive Urban Flooding Analytics',
    description:
      'Machine learning model analyzing precipitation and urban terrain to predict waterlogging hotspots and assist municipal drainage planning.',
    highlights: ['ML Predictive Pipeline', 'Terrain Modeling', 'Data Analytics'],
    image: '/projects/ai-drainage.png',
    tech: [{ name: 'Python', icon: '/icons/python-original.svg' }],
    github: 'https://github.com/mhjayeed715/AI-Powered-Smart-Waterlogging-and-Drainage-Optimizer',
  },
  {
    id: 9,
    title: 'UniShareSyncFX',
    category: 'ai',
    subtitle: 'Desktop Resource Client with Offline Cache',
    description:
      'JavaFX desktop application with MySQL replication, local cache synchronization, and department communication tools.',
    highlights: ['JavaFX Desktop UI', 'MySQL Replication', 'Offline Cache'],
    image: '/projects/unisharesyncfx.png',
    tech: [
      { name: 'Java', icon: '/icons/java-original.svg' },
      { name: 'MySQL', icon: '/icons/mysql-original.svg' },
    ],
    github: 'https://github.com/mhjayeed715/UniShareSyncFX',
  },
]

export const initialSkillPillars = [
  {
    id: 1,
    category: 'Mobile Product Engineering',
    icon: 'Smartphone',
    summary: 'Cross-platform mobile apps for iOS and Android with offline caching, local state architecture, and smooth native bridges.',
    stack: ['Flutter', 'Dart', 'Supabase Mobile', 'FCM Push Notifications', 'Provider / Riverpod'],
  },
  {
    id: 2,
    category: 'Full-Stack Web Systems',
    icon: 'Code2',
    summary: 'Responsive, accessible frontend architectures backed by high-throughput RESTful APIs, JWT sessions, and relational models.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    id: 3,
    category: 'AI Integration & Backend APIs',
    icon: 'Cpu',
    summary: 'Custom RAG search pipelines, Groq high-speed LLM integration, prompt engineering, and scalable webhook integrations.',
    stack: ['Groq API', 'RAG Pipelines', 'Vector Indexing', 'Python / Flask', 'Socket.IO WebSockets'],
  },
  {
    id: 4,
    category: 'Database & Infrastructure',
    icon: 'Database',
    summary: 'Strict ACID compliance, Row-Level Security (RLS) policies, schema migrations, and optimized indexing strategies.',
    stack: ['PostgreSQL', 'Supabase RLS', 'MongoDB', 'Redis Caching', 'Postman Automated Tests'],
  },
]

export const initialServices = [
  {
    id: 1,
    icon: 'Smartphone',
    title: 'Mobile MVP Development',
    description:
      'Cross-platform iOS and Android apps with Flutter, Supabase, push alerts, and offline caching. From design specs to App Store & Play Store readiness.',
    tags: ['Flutter', 'Dart', 'Supabase', 'Mobile UX'],
  },
  {
    id: 2,
    icon: 'Globe',
    title: 'Full-Stack Web Engineering',
    description:
      'High-performance web applications built with React, Next.js, and Node.js. Clean REST/GraphQL APIs, real-time sync, and SEO-optimized architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 3,
    icon: 'Bot',
    title: 'AI Workflows & RAG Integration',
    description:
      'Building intelligent assistant features, semantic document search (RAG) with vector databases, and automated LLM pipelines using Groq & OpenAI APIs.',
    tags: ['RAG Pipelines', 'Groq API', 'Prompt Eng', 'Vectors'],
  },
  {
    id: 4,
    icon: 'Database',
    title: 'Database Architecture & APIs',
    description:
      'Normalized schema design, query optimization, indexing, and scalable RESTful endpoints with comprehensive error handling and logging.',
    tags: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis'],
  },
  {
    id: 5,
    icon: 'ShieldCheck',
    title: 'Security, Auth & RBAC',
    description:
      'Enterprise-grade authentication architectures: JWT sessions, email/phone OTP verification, role-based access control, and sanitization.',
    tags: ['JWT', 'OTP Auth', 'RBAC', 'Data Security'],
  },
  {
    id: 6,
    icon: 'Zap',
    title: 'Performance & Optimization',
    description:
      'Lighthouse audits, bundle splitting, memory leak debugging, rendering performance optimization, and hardware-accelerated animations.',
    tags: ['Vite', 'Turbopack', 'Web Vitals', 'Profiling'],
  },
]

export const initialEducation = [
  {
    id: 1,
    name: 'Shanto-Mariam University of Creative Technology',
    degree: 'BSc in Computer Science & Engineering',
    date: 'Expected 2026',
    location: 'Dhaka, Bangladesh',
    gpa: 'CGPA: 3.93 / 4.00',
    detail: 'Current Semester: 10th',
    logo: '/education/shanto-mariam.svg',
  },
  {
    id: 2,
    name: 'Dhaka City College',
    degree: 'Higher Secondary Certificate (HSC)',
    date: '2021',
    location: 'Dhaka, Bangladesh',
    gpa: 'GPA: 5.00 / 5.00',
    detail: 'Science Group',
    logo: '/education/dhaka-city-college.png',
  },
  {
    id: 3,
    name: 'Armanitola Govt. High School',
    degree: 'Secondary School Certificate (SSC)',
    date: '2019',
    location: 'Dhaka, Bangladesh',
    gpa: 'GPA: 5.00 / 5.00',
    detail: 'Science Group',
    logo: '/education/armanitola.jpg',
  },
]

export const initialSiteSettings = {
  heroHeadline: 'Building Scalable Software & Mobile MVPs.',
  heroRoles: [
    'Full-Stack Developer',
    'Mobile MVP Architect',
    'React & Flutter Specialist',
    'AI-Assisted Engineer',
  ],
  heroAvailability: 'Available for Opportunities',
  heroSubtext:
    'I turn early-stage ideas into dependable iOS, Android, and web products that are clear to use, robust to build, and ready to launch.',
  aboutBio:
    'Full-Stack & Mobile Developer specializing in high-velocity MVP execution. I bridge clean interface design with hardened backend architectures, helping founders and engineering teams build products that look refined and scale cleanly.',
  resumeUrl: '/resume',
}
