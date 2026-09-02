# AERORA — Travel Beyond the Map

> **A Front-End Developer Assessment Project for Design Esthetics & Engineering Rigor**  
> An immersive, cinematic travel discovery platform and intelligent voyage synthesizer combining the timeless elegance of a high-end luxury editorial publication with real-time climate telemetry and generative itinerary planning.

---

## ✦ Core Design Philosophy & Aesthetic Identity

**AERORA** departs radically from transactional, cluttered booking platforms. Built around an **Editorial & Cinematic** ethos, it reflects the understated refinement of publications like *Condé Nast Traveler*, *Kinfolk*, and *National Geographic Expeditions*.

- **Restrained Color Palette**: Deep atmospheric Obsidian base (`#090a0e`, `#13161e`) punctuated by crisp bone/cream neutrals (`#f5f2eb`) and a signature warm **Sunstone Gold** (`#d99b4f`) accent.
- **Editorial Typography**: Pairing the classical, literary rhythm of **Cormorant Garamond** (display serif) and **Cinzel** (classical accents) with the modern legibility of **Plus Jakarta Sans** (grotesque sans-serif).
- **Asymmetric Grid Architecture**: Breaking the monotony of standard card grids with intentional structural variation—panoramic hero destination anchors, portrait monoliths, and widescreen spreads.
- **Micro-Interactions with Intent**: Subtle image depth zooms, magnetic button glows, fluid slide-over panels, radar pulse waypoints, and organic typing indicators.

---

## ✦ Technology Restriction Compliance

This application was engineered **strictly from first principles** under explicit technology constraints:

| Permitted Technologies | Status | Implementation Details |
| :--- | :---: | :--- |
| **HTML5** | ✓ | Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<form>` |
| **CSS3** | ✓ | Pure custom CSS with CSS custom properties, grid/flexbox layouts, responsive media queries, and animations |
| **JavaScript (ES6+)** | ✓ | Modern ES modules, async/await, Array methods, destructuring |
| **React & Hooks** | ✓ | React 19 functional components, `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext` |
| **React Router** | ✓ | `react-router-dom` v7 for deep linking, parametric routes, and browser history management |

### Strictly Excluded & NOT Used:
- **NO** Tailwind CSS, Bootstrap, Material UI, Ant Design, Chakra UI, or external UI component libraries
- **NO** TypeScript (pure modern JavaScript & JSX)
- **NO** Next.js (built on pure Vite + React SPA)
- **NO** jQuery, Vue, or Angular
- **NO** Third-party icon packages (all icons are handcrafted, accessible, bespoke SVGs)

---

## ✦ Feature Highlights

### 1. Full-Screen Cinematic Hero Experience
- Looping high-definition atmospheric travel video background with playback controls (play/pause toggle).
- Editorial typography with cinematic entrance animations.
- Dynamic origin climate chip displaying user location and real-time conditions (e.g. *“Bengaluru, India · 24°C · Partly Cloudy”*).
- Interactive scroll indicator and primary exploration CTAs.

### 2. Asymmetric Destination Discovery
- Multi-dimensional filtering system: **Region**, **Climate**, **Travel Style**, **Budget Level**, and **Best Season**.
- Instant search filter (*“Where do you want to disappear to?”*).
- Varied CSS Grid card layouts: featured panoramic cards, portrait cards, and wide cards.
- Curated destinations: **Kyoto**, **Santorini**, **Reykjavik**, **Cape Town**, **Udaipur**, **Lisbon**, **Bali**, and the **Swiss Alps**.

### 3. Dedicated Destination Detail Pages (`/destination/:id`)
- Deep-linked routes supporting direct URL navigation and browser history.
- Real-time destination weather telemetry (temperature, condition, feels-like, humidity, wind, sunrise, sunset).
- Curated editorial sections:
  - **WHY GO**: Sensory cultural pillars and architectural significance.
  - **THE PLACES THAT DEFINE IT**: Embedded landmark monuments with instant *Add to Journey* integration.
  - **WHEN TO GO**: Seasonal climate breakdowns and optimal travel windows.
  - **LOCAL NOTES**: Etiquette guidelines, photography rules, and insider customs.
  - **PLAN YOUR DAYS**: Direct launchpad into the AI Itinerary Builder.

### 4. Visually Rich Famous Places & Personal Journey
- Detailed landmark showcase with image, category, recommended duration, best visiting hours, and district coordinates.
- **Personal Journey Panel**: Slide-over drawer tracking user-selected places, estimated total exploration hours, and active destination focus.
- State persistence via browser `localStorage`.

### 5. Location Awareness & Respectful Permission Flow
- Custom-designed location permission modal—no intrusive raw browser alerts.
- Polished fallback state (*“No problem. Tell us where you are.”*) with search and quick-pick global hubs if permission is declined.
- Zero broken state: application functions flawlessly under any permission choice.

### 6. Real-Time Climate Telemetry Engine
- Direct integration with **OpenWeatherMap API** (`VITE_OPENWEATHER_API_KEY`).
- Built-in **Calibrated Climate Model**: Generates scientifically accurate diurnal variations and solar cycles when offline or if no API key is present.

### 7. Conversational AI Guide (“AERORA Guide”)
- Destination-attuned conversational interface powered by **Google Gemini API** (`VITE_GEMINI_API_KEY`).
- Built-in **Editorial Knowledge Base**: Responds to questions (*“How many days should I spend here?”*, *“What should I see first?”*, *“What should I avoid?”*) with sensory, eloquent travel expertise even without an API key.

### 8. AI Structured Itinerary Builder (“Build My Journey”)
- Parametric synthesis: select Destination, Duration (1–14 days), Travel Style, Budget, Pace (Slow, Balanced, Fast), and Themes.
- Day-by-day structured timeline output (Day theme, timestamped milestones, activity, location, explanation, duration).
- Direct actions: **Save Journey**, **Regenerate**, and **Print / Export Dossier**.

### 9. Interactive Cartographic Journey Route
- Stylized SVG expedition visualizer (*The Grand Transcontinental Arc*: Bengaluru → Dubai → Rome → Santorini → Kyoto).
- Pulsing radar waypoint nodes, flight-path animated dash flows, coordinates, distances, and one-click hops to destinations.

---

## ✦ Code Architecture

```
src/
├── components/
│   ├── Icons.jsx                # Handcrafted SVG icon library
│   ├── EditorialImage.jsx       # Resilient image component with skeletons & fallbacks
│   ├── Navbar.jsx               # Header with telemetry, journey badge, mobile overlay
│   ├── Hero.jsx                 # Full-screen cinematic video hero
│   ├── DestinationExplorer.jsx  # Multi-parameter filter suite & search
│   ├── DestinationCard.jsx      # Asymmetric editorial card
│   ├── DestinationDetail.jsx    # Complete destination experience view
│   ├── FamousPlaces.jsx         # Landmarks showcase section
│   ├── PlaceCard.jsx            # Rich place card with Add to Journey action
│   ├── WeatherCard.jsx          # Editorial climate telemetry display
│   ├── LocationSelector.jsx     # Geolocation modal & manual selector
│   ├── AIGuide.jsx              # Conversational AI assistant
│   ├── ChatMessage.jsx          # Chat message bubbles with timestamping
│   ├── ItineraryBuilder.jsx     # Parametric AI trip generator
│   ├── ItineraryDay.jsx         # Structured day-by-day timeline node
│   ├── JourneyPanel.jsx         # Slide-over personal trip dossier drawer
│   ├── JourneyMap.jsx           # Stylized SVG route trajectory visualizer
│   ├── LoadingSkeleton.jsx      # Custom skeleton loaders
│   ├── ErrorState.jsx           # Graceful error & empty state screens
│   └── Footer.jsx               # Editorial footer with privacy & standards modals
├── context/
│   ├── LocationContext.jsx      # Global location & telemetry state
│   └── JourneyContext.jsx       # Persistent personal trip plan state
├── data/
│   ├── destinations.js          # Comprehensive destination datasets
│   ├── places.js                # Landmark monuments repository
│   └── curatedRoutes.js         # Transcontinental waypoint data
├── hooks/
│   ├── useLocation.js           # Geolocation & manual origin hook
│   └── useWeather.js            # Destination weather telemetry hook
├── pages/
│   ├── Home.jsx                 # Flagship landing page
│   ├── Destinations.jsx         # Catalog page
│   ├── DestinationPage.jsx      # Dynamic /destination/:id page
│   ├── PlacesPage.jsx           # Landmarks directory page
│   ├── Planner.jsx              # Trip planner page
│   └── GuidePage.jsx            # AI guide page
├── services/
│   ├── ai.js                    # Gemini API & editorial knowledge engine
│   ├── images.js                # Unsplash service & fallback photography
│   └── weather.js               # OpenWeather API & calibrated climate model
├── styles/
│   ├── variables.css            # Design system tokens (colors, fonts, radii, spacing)
│   ├── global.css               # Reset, typography rules, accessibility helpers
│   ├── components.css           # Pure custom component styles
│   └── responsive.css           # Breakpoints (320px, 480px, 768px, 1024px, 1440px+)
├── App.jsx                      # App root with router & global modals
└── main.jsx                     # Vite React entrypoint
```

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v25.1.0)
- npm 9+

### Installation
```bash
# 1. Clone the repository
git clone <repository-url>
cd "Travel Application"

# 2. Install dependencies
npm install

# 3. (Optional) Set up Environment Variables
cp .env.example .env
# Provide your keys in .env if you wish to use live API services.
# Note: AERORA works fully out-of-the-box with calibrated fallbacks even without API keys!

# 4. Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## ✦ Environment Variables (`.env`)

AERORA adheres strictly to security best practices. **No API keys are hardcoded in source code.** All keys are accessed via `import.meta.env.*` and `.env` is gitignored.

```env
# OpenWeather API Key (Free tier at https://openweathermap.org/api)
VITE_OPENWEATHER_API_KEY=

# Google Gemini API Key (From Google AI Studio at https://aistudio.google.com/)
VITE_GEMINI_API_KEY=

# Unsplash Access Key (Optional for dynamic image search: https://unsplash.com/developers)
VITE_UNSPLASH_ACCESS_KEY=
```

> **Resilience Guarantee**: If no API keys are provided or if an API is temporarily unreachable, AERORA’s intelligent fallback engines seamlessly supply realistic climate telemetry and deep editorial knowledge.

---

## ✦ Deployment Guide

### Deploying to Vercel
1. Push the repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Environment Variables: Add `VITE_OPENWEATHER_API_KEY` and `VITE_GEMINI_API_KEY` if desired.
6. The included `vercel.json` ensures all client-side routes (`/destination/:id`, `/planner`, etc.) resolve seamlessly without 404 errors.

### Deploying to Netlify
1. Connect the repository in [Netlify](https://netlify.com).
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.
4. The included `public/_redirects` file automatically handles SPA rewrites.

---

## ✦ Accessibility (a11y) & Performance

- **Semantic Landmark Structure**: Rigorous use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Keyboard Navigation**: Explicit `:focus-visible` rings, dialog dismissals via `Escape` key, and logical tab ordering.
- **Screen Reader Support**: Meaningful alt tags for all photography, `aria-label` attributes on icon buttons, and `role="dialog"` for modals.
- **Reduced Motion & Video Control**: Video backgrounds include a pause/play toggle for users who prefer static visual presentation.
- **Performance**: High-resolution photography is lazily loaded with skeleton loaders to prevent layout shifts (CLS = 0).

---

## ✦ License

Crafted for the Front-End Developer Assessment — **AERORA: Travel Beyond the Map**.
