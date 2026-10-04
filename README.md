# S. M. Mehrab Hossain Jayeed — Full-Stack & Mobile Engineer Portfolio

[![React 19](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite 7](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend_%26_Storage-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis Smooth Scroll](https://img.shields.io/badge/Lenis-Smooth_Scroll-black)](https://github.com/darkroomengineering/lenis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, high-performance, and content-managed developer portfolio built with React 19, Tailwind CSS v4, Framer Motion, GSAP, and Supabase. Engineered with an adaptive view system (Recruiter Minimal vs. Full 9-Section Deep Dive), crystal liquid glassmorphism, circular view transitions, an embedded PDF resume viewer, and an authenticated real-time Admin CMS with drag-and-drop Supabase asset uploads.

🌐 **Production Domain**: [https://jayeed.pro.bd/](https://jayeed.pro.bd/)  
🔗 **Mirror / Vercel**: [https://mhjayeed715.vercel.app/](https://mhjayeed715.vercel.app/)  
📄 **Direct Resume**: [https://jayeed.pro.bd/resume](https://jayeed.pro.bd/resume)

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Core Framework** | **React 19** + **Vite 7** | Latest component architecture, zero-cost hydration, and sub-second HMR |
| **Routing** | **React Router v7** | Single-page client routing (`/`, `/resume`, `/admin`, `/admin/login`) |
| **Styling & Design System** | **Tailwind CSS v4** | CSS theme tokens, responsive layouts, and modern color spaces |
| **Visual Aesthetics** | **Liquid Glass UI** | Translucent glass panels, specular reflections, and radial glow cards |
| **Motion & Physics** | **Framer Motion 12** + **GSAP** | Scroll-driven choreographies, spring transitions, and interactive stagger effects |
| **Smooth Scrolling** | **Lenis** | Inertia-based momentum scrolling synchronized with GSAP ScrollTrigger |
| **Backend & Database** | **Supabase (PostgreSQL)** | Real-time database with Row Level Security (RLS) for dynamic CMS items |
| **Cloud Storage** | **Supabase Storage** | Public bucket (`portfolio-assets`) hosting project thumbnails and resume PDFs |
| **Authentication** | **Supabase Auth** | Secure admin login session management guarding `/admin` |
| **Form & Communications** | **EmailJS** + **WhatsApp** | Direct client-side email dispatch and 1-tap WhatsApp contact trigger |
| **Icons** | **Lucide React** | Consistent, modern vector iconography |

---

## ✨ Features & Architecture

### 1. Dual View Modes (Minimal vs. Full)
- **Recruiter / Minimal Mode (Default)**: A curated, distraction-free view designed for recruiters and hiring managers. Focuses on the essentials: **About**, **Featured Work**, **Services**, and **Contact**.
- **Full Showcase Mode (9 Sections)**: Unlocks the complete portfolio depth, adding the **Interactive Skills Marquee**, **Hackathons & Competitions**, **Engineering Philosophy**, and **Academic Timeline**.
- **Dynamic Adaptability**: Both the floating capsule navigation bar and the footer automatically filter out hidden anchor links when in minimal mode to ensure every displayed link is always functional.
- **Inertia Recalculation**: Smoothly resizes the Lenis scroll container and refreshes GSAP ScrollTriggers upon section expansion.

### 2. Full-Featured Admin Dashboard (`/admin`)
- **Route Guarding**: Protected by `AdminGuard` using Supabase Auth sessions. Unauthorized visitors are redirected to `/admin/login`.
- **Dynamic Content Management (CRUD)**: Manage Projects, Skills, Services, Achievements, Certifications, and Education without code redeployments.
- **Drag & Drop Project Thumbnail Upload**:
  - Integrated dropzone in the project modal with 16:9 aspect-ratio live preview.
  - Automatic direct upload to Supabase Storage (`portfolio-assets/projects/...`) with public URL resolution.
  - No manual file-path copying required (with an optional manual path override).
- **Integrated CV / Resume Uploader**:
  - Drag-and-drop or browse PDF resumes to update the live resume link across the entire portfolio in one click.
- **Live State Sync**: Changes instantly synchronize to client state through `PortfolioContext` while persisting to Supabase PostgreSQL.

### 3. Dedicated In-App Resume Viewer (`/resume` & `/resume.pdf`)
- Clean, responsive PDF viewer with a branded header, download button, full-screen trigger, and auto-fallback between Supabase Storage and bundled local assets.

### 4. Interactive Project Cards & Expanded Modals
- High-resolution cover thumbnails, categorized tech stack badges, competition accolades (*e.g., 2nd Place Winner*), live demo URLs, and GitHub source links.
- Interactive modal dialogs for reading full project narratives without text truncation.

### 5. Verified Professional Certifications
- High-resolution modal certificate previews with one-click verification links to HarvardX / edX (CS50x, CS50AI) and Anthropic (Model Context Protocol).

### 6. Liquid Glass Design & Interactive Micro-Animations
- Directional auto-shrinking and auto-expanding navigation capsule.
- Mouse-tracking radial card highlight (`useCardGlow`) across all cards.
- Theme switching (Light / Dark) powered by circular clip view transitions and persisted to `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mhjayeed715/portfolio.git

# 2. Enter project directory
cd portfolio/portfolio-site

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env

# 5. Start the local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file in `portfolio-site/` based on `.env.example`:

```env
# Supabase Public Configuration (Anon key is safe for client usage with RLS enabled)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_publishable_anon_key

# Admin Email (Optional override for authorization verification)
VITE_ADMIN_EMAIL=your_email@example.com

# EmailJS Client Configuration (Optional overrides)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Security Note**: All client-side keys (`VITE_SUPABASE_ANON_KEY`) are safe to expose publicly in frontend builds because database protection is strictly enforced via Supabase **Row Level Security (RLS)** policies. Never expose the Supabase `service_role` key in frontend code.

---

## 🗄️ Database & Storage Setup

A complete SQL schema is provided in [`supabase/schema.sql`](supabase/schema.sql). To bootstrap your Supabase backend:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and navigate to the **SQL Editor**.
2. Run the queries from `supabase/schema.sql`. This will:
   - Create tables: `portfolio_projects`, `portfolio_skills`, `portfolio_services`, `portfolio_achievements`, `portfolio_certifications`, `portfolio_education`, and `portfolio_settings`.
   - Set up Row Level Security (RLS) policies allowing public `SELECT` and authenticated admin `INSERT`/`UPDATE`/`DELETE`.
   - Configure the public `portfolio-assets` storage bucket with upload permissions for authenticated administrators.

---

## 📂 Project Structure

```
portfolio-site/
├── public/
│   ├── SM_Mehrab_Hossain_Jayeed_Resume.pdf  # Fallback resume asset
│   ├── profile21.png                       # Portrait image & favicon
│   ├── certificates/                       # High-res certificate assets
│   ├── icons/                              # Tech stack SVGs
│   ├── projects/                           # Default project thumbnails
│   └── education/                          # University & college logos
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminGuard.jsx              # Supabase Auth route protection
│   │   ├── ui/
│   │   │   ├── LiquidGlass.jsx             # Translucent glass panel primitive
│   │   │   └── morph-loading.jsx           # Morphing loading spinner
│   │   ├── About.jsx                       # About narrative & core competencies
│   │   ├── Achievements.jsx                # Competitions & verified certifications
│   │   ├── Contact.jsx                     # Contact CTA banner & trigger
│   │   ├── ContactModal.jsx                # Interactive EmailJS modal dialog
│   │   ├── Education.jsx                   # Academic timeline
│   │   ├── Footer.jsx                      # Adaptive quick links & social links
│   │   ├── Hero.jsx                        # Role cycler & interactive portrait
│   │   ├── LoadingScreen.jsx               # Cinematic initial loader
│   │   ├── Navbar.jsx                      # Floating liquid-glass navbar & drawer
│   │   ├── Philosophy.jsx                  # Software engineering tenets
│   │   ├── Projects.jsx                    # Featured & expandable project grid
│   │   ├── ScrollToTop.jsx                 # Dynamic scroll-to-top floating button
│   │   ├── Services.jsx                    # Core engineering services & tiers
│   │   ├── Skills.jsx                      # Dual-rail infinite tech marquee
│   │   ├── SmoothScroll.jsx                # Lenis smooth inertia scroll provider
│   │   └── ThemeToggle.jsx                 # Circular view-transition theme toggle
│   ├── context/
│   │   └── PortfolioContext.jsx            # Global state sync (Supabase + Local Cache)
│   ├── data/
│   │   └── initialPortfolioData.js         # Default fallback content
│   ├── hooks/
│   │   └── useCardGlow.js                  # Cursor radial glow hook
│   ├── lib/
│   │   ├── supabase.js                     # Supabase client initializer
│   │   └── utils.js                        # Styling and helper utilities
│   ├── pages/
│   │   ├── AdminDashboard.jsx              # Full dynamic CMS with drag & drop uploads
│   │   ├── AdminLogin.jsx                  # Secure admin authentication
│   │   └── ResumeViewer.jsx                # In-app interactive PDF viewer
│   ├── App.jsx                             # Root routing & layout assembler
│   ├── index.css                           # Tailwind CSS v4 design tokens & liquid glass
│   └── main.jsx                            # React entry point
├── supabase/
│   └── schema.sql                          # Database tables, RLS policies, and storage setup
├── index.html
├── vite.config.js
└── package.json
```

---

## 🏗️ Production Build & Deployment

To compile and preview the production build locally:

```bash
# Build the production bundle
npm run build

# Preview the production output locally
npm run preview
```

### Vercel Deployment
The repository includes a ready-to-use [`vercel.json`](vercel.json) configured with SPA route rewrites:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Add your `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and optional EmailJS environment variables in the Vercel project dashboard under **Settings > Environment Variables**.

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).
