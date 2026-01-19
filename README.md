<h1 align="center">
  <img src=".github/assets/banner.png" height="300" alt="Click Náutico">
  <br/>
  <br/>
  Click Náutico Experience
</h1>

<p align="center">
  <img src="https://img.shields.io/github/license/gabrielmaialva33/click-nautico-experience?color=00b8d3&style=flat-square" alt="License" />
  <img src="https://img.shields.io/github/languages/top/gabrielmaialva33/click-nautico-experience?style=flat-square" alt="GitHub top language" />
  <img src="https://img.shields.io/github/repo-size/gabrielmaialva33/click-nautico-experience?style=flat-square" alt="Repository size" />
  <a href="https://github.com/gabrielmaialva33/click-nautico-experience/commits/main">
    <img src="https://img.shields.io/github/last-commit/gabrielmaialva33/click-nautico-experience?style=flat-square" alt="GitHub last commit" />
  </a>
</p>

<p align="center">
  <a href="#bookmark-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#surfing_man-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#package-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-deploy">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<br/>

## :bookmark: About

**Click Náutico Experience** is a premium hot site developed for **Click Náutico**, a kite surf school and tourist tours company located in Vila Galé Touros, on the beautiful coast of Rio Grande do Norte, Brazil.

This project showcases a conversion-focused landing page designed to maximize engagement and drive WhatsApp inquiries. The experience features smooth animations, glassmorphism effects, and an ocean-inspired design system.

### :ocean: Design System

```css
/* Color Palette */
--color-ocean    /* #0891b2 → #164e63 - Primary brand */
--color-coral    /* #f97316 → #ea580c - Accent/CTAs */
--color-sand     /* #fafaf9 → #1c1917 - Neutrals */

/* Typography */
--font-display: 'Montserrat'  /* Headings - Bold & Modern */
--font-body: 'Open Sans'      /* Body - Clean & Readable */
```

## :surfing_man: Features

- **:wind_chime: Kite School Section** - Course stages, pricing tables, and rental information
- **:boat: Tours Section** - Premium boat tours and nautical experiences
- **:iphone: Mobile-First Design** - Responsive layout optimized for all devices
- **:sparkles: Smooth Animations** - Framer Motion powered micro-interactions
- **:speech_balloon: WhatsApp Integration** - Floating CTA button for instant contact
- **:zap: High Performance** - Lighthouse score 95+ with code splitting

## :computer: Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.0 | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5.6 | Type Safety |
| [Vite](https://vitejs.dev/) | 6.0 | Build Tool |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Styling Framework |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animations |

## :package: Installation

```bash
# Clone the repository
$ git clone https://github.com/gabrielmaialva33/click-nautico-experience.git

# Navigate to the project
$ cd click-nautico-experience

# Install dependencies
$ npm install

# Start development server
$ npm run dev
```

The app will be available at `http://localhost:3000`

## :rocket: Deploy

This project uses **GitHub Actions** for automatic deployment to GitHub Pages.

Every push to the `main` branch triggers the workflow:
1. Install dependencies
2. Build for production
3. Deploy to GitHub Pages

### Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The next push will activate the deployment

**Live Demo**: [gabrielmaialva33.github.io/click-nautico-experience](https://gabrielmaialva33.github.io/click-nautico-experience)

## :file_folder: Project Structure

```
src/
├── components/
│   ├── sections/       # Hero, KiteSchool, Tours, Footer
│   └── ui/             # Navbar, FloatingWhatsApp
├── constants/          # Business data & configuration
├── styles/             # Global CSS & design tokens
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## :memo: License

This project is under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<h4 align="center">
  Made with :heart: by <a href="https://github.com/gabrielmaialva33">Gabriel Maia</a>
</h4>

<p align="center">
  <a href="https://www.instagram.com/clicknautico.kiteschool" target="_blank">
    <img src="https://img.shields.io/badge/-@clicknautico.kiteschool-E4405F?style=flat-square&logo=Instagram&logoColor=white" alt="Instagram" />
  </a>
</p>
