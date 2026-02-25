# S. M. Mehrab Hossain Jayeed — Portfolio

A modern, dark-mode developer portfolio built with React, Vite, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Tech Stack

- **React 19** + **Vite 7** — blazing fast dev & build
- **Tailwind CSS v4** — utility-first styling with custom theme
- **Framer Motion** — scroll-triggered animations, page transitions
- **React Scroll** — smooth section navigation with active link detection
- **Lucide React** — beautiful, consistent icons

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
│   ├── profile.png        # Profile photo
│   ├── resume.pdf         # Downloadable CV
│   └── favicon.svg        # Site favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx     # Fixed transparent navbar
│   │   ├── Hero.jsx       # Hero with typing animation
│   │   ├── About.jsx      # About me section
│   │   ├── Skills.jsx     # Skills with tab switching
│   │   ├── Projects.jsx   # Project cards + modal
│   │   ├── Journey.jsx    # Timeline (education/certs/activities)
│   │   ├── Languages.jsx  # Language proficiency
│   │   ├── Contact.jsx    # Contact form + info
│   │   ├── Footer.jsx     # Footer
│   │   └── ScrollToTop.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          # Tailwind imports + custom styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Features

- Dark mode only — premium deep navy + electric indigo + neon cyan
- Typing animation in Hero
- Scroll-triggered reveal animations
- Project modal with full details
- Copy email to clipboard
- Download CV button
- Active navbar link highlighting
- Fully responsive (mobile-first)
- Particle background in Hero
- Section gradient dividers

## License

MIT
