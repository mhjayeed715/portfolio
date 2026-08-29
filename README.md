# S. M. Mehrab Hossain Jayeed — Portfolio

A modern, high-performance developer portfolio built with React 19, Tailwind CSS v4, Framer Motion, GSAP, and Lenis Smooth Scroll. Features dark/light mode with circular view transitions, crystal liquid glassmorphism, dynamic animations, project showcases, live credential verification with modal previews, and an integrated contact form with WhatsApp integration.

🌐 **Live URL**: [https://jayeed.pro.bd/](https://jayeed.pro.bd/)  
🔗 **Mirror / Vercel**: [https://mhjayeed715.vercel.app/](https://mhjayeed715.vercel.app/)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** + **Vite 7** | Modern component architecture & lightning-fast builds |
| **Tailwind CSS v4** | Utility-first styling with custom CSS design tokens |
| **Framer Motion** + **GSAP** | Fluid scroll-triggered animations and spring physics |
| **Lenis** | Ultra-smooth momentum-based inertia scrolling |
| **EmailJS** | Direct client-side email delivery for the contact form |
| **Lucide React** | Cohesive, modern icon library |

---

## ✨ Features & Highlights

- **Crystal Liquid Glassmorphism** — High-refractive translucent glass capsule navbar with directional scroll shrink/auto-expand and specular highlight buttons.
- **Light / Dark Mode** — Circular clip view-transition theme switching persisted in `localStorage`.
- **Interactive Hero** — Typewriter role cycler, dynamic availability badge, and 3D parallax cursor tracking.
- **Featured Projects Showcase** — Clean cards with tech stacks, live demos, repository links, and award badges:
  1. **UniShareSync Mobile App** — *2nd Place Winner (Software Project Showcase 2026)* • Flutter, Supabase, Groq RAG AI, Real-time Whiteboard/Kanban.
  2. **Focusnyx** — *Student Life OS & Cognitive Shield* • Next.js 14, Supabase, Python Win32 Companion, Chrome MV3 Extension.
  3. **GigCampus** — *Campus Micro-Gig Marketplace* • CS50x Capstone • Python, Flask, SQLite, Socket.IO.
  4. **UniShareSync Web App** — *University Resource Sharing Platform* • React, Node.js, PostgreSQL.
  - *Expandable section* with 4 additional projects (**SkillVoyage**, **Servyn**, **UniShareSyncFX**, **AI Drainage Optimizer**).
- **Competitions & Achievements** — Highlights hackathons and showcase victories (*2nd Place Software Showcase 2026*, *Champion Project Showcasing 2025*, *Datathon ML Contest 2026*).
- **Verified Professional Certifications** — Verified credentials with official public validation URLs and interactive click-to-expand preview modals:
  - **CS50’s Introduction to AI with Python** — HarvardX / edX
  - **CS50x: Introduction to Computer Science** — HarvardX / edX
  - **Anthropic Model Context Protocol (MCP) Introduction** — Anthropic
- **Working Contact Form & WhatsApp** — Direct messaging via EmailJS and 1-tap WhatsApp direct chat.
- **Fully Responsive & Accessible** — Mobile-first floating navigation drawer, touch ergonomics, and accessible ARIA semantics.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/mhjayeed715/portfolio.git

# Navigate to project directory
cd portfolio/portfolio-site

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production bundle
npm run preview
```

---

## 📂 Project Structure

```
portfolio-site/
├── public/
│   ├── SM_Mehrab_Hossain_Jayeed_Resume.pdf  # Downloadable resume
│   ├── profile21.png                       # Primary portrait & tab icon
│   ├── certificates/                       # High-res certificate previews
│   │   ├── CS50AI1.png
│   │   ├── CS50x1.png
│   │   └── anthropic.png
│   ├── icons/                              # Tech stack SVG icons
│   ├── projects/                           # Project screenshots
│   └── education/                          # University and college logos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                      # Liquid-glass capsule navigation & mobile drawer
│   │   ├── Hero.jsx                        # Animated hero with interactive 3D portrait
│   │   ├── About.jsx                       # About narrative & engineering strengths
│   │   ├── Services.jsx                    # Core engineering services & deliverable tiers
│   │   ├── Skills.jsx                      # Dual-rail infinite tech marquee & filter
│   │   ├── Projects.jsx                    # Featured & expandable projects showcase
│   │   ├── Achievements.jsx                # Competitions & verified certifications
│   │   ├── Philosophy.jsx                  # Software engineering principles
│   │   ├── Education.jsx                   # Academic timeline
│   │   ├── Contact.jsx                     # EmailJS contact form & WhatsApp direct chat
│   │   ├── Footer.jsx                      # Multi-column footer & quick links
│   │   ├── ThemeToggle.jsx                 # View-transition dark/light mode toggle
│   │   ├── LoadingScreen.jsx               # Initial cinematic loader
│   │   ├── SmoothScroll.jsx                # Lenis smooth scroll provider
│   │   └── ScrollToTop.jsx                 # Smooth scroll-to-top button
│   ├── App.jsx                             # Root layout assembler
│   ├── main.jsx                            # React entry point
│   └── index.css                           # Liquid glass tokens & Tailwind CSS styling
├── index.html
├── vite.config.js
└── package.json
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
