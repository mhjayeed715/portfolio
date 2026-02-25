# S. M. Mehrab Hossain Jayeed — Portfolio

A modern, responsive developer portfolio with light/dark theme, smooth animations, and a working contact form.

**Live:** [portfolio-mhjayeed715.vercel.app](https://portfolio-mhjayeed715.vercel.app)

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** + **Vite 7** | Fast development & optimized builds |
| **Tailwind CSS v4** | Utility-first styling with CSS-first config |
| **Framer Motion** | Scroll-triggered & interactive animations |
| **EmailJS** | Contact form delivery without a backend |
| **Lucide React** | Consistent, modern icon set |

## Features

- **Light / Dark theme** — toggle with smooth transitions, persisted in localStorage
- **Animated Hero** — typewriter effect, floating particles, orbiting tech icons, parallax mouse tracking
- **10 sections** — Hero, About, Services, Skills, Projects, Philosophy, Education, Contact, Footer, Scroll-to-Top
- **Technical Proficiency** — animated progress bars for core skills
- **Working contact form** — powered by EmailJS, messages delivered directly to inbox
- **Responsive** — fully mobile-friendly with collapsible navbar
- **Accessible** — semantic HTML, ARIA labels, keyboard-navigable

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
portfolio-site/
├── public/
│   ├── profile.png          # Profile photo
│   ├── resume.pdf           # Downloadable CV
│   ├── favicon.svg          # Site favicon
│   ├── icons/               # Tech stack SVG icons
│   ├── projects/            # Project screenshots
│   └── education/           # Education logos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed frosted-glass navbar
│   │   ├── Hero.jsx         # Animated hero with particles & parallax
│   │   ├── About.jsx        # About me section
│   │   ├── Services.jsx     # Service cards (6 services)
│   │   ├── Skills.jsx       # Tech icons grid + proficiency bars
│   │   ├── Projects.jsx     # Project showcase cards
│   │   ├── Philosophy.jsx   # Development philosophy
│   │   ├── Education.jsx    # Education timeline
│   │   ├── Contact.jsx      # EmailJS contact form + info cards
│   │   ├── Footer.jsx       # Multi-column footer
│   │   ├── ThemeToggle.jsx  # Light/dark mode toggle
│   │   └── ScrollToTop.jsx  # Scroll-to-top button
│   ├── App.jsx              # Root layout
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind config + theme variables
├── index.html
├── vite.config.js
└── package.json
```

## License

MIT
