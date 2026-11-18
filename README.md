# 🎬 MovieSearch - Minimalist React Movie Exploration & Wishlist App

A modern, responsive, developer-centric React application for discovering movies, watching official high-definition trailers, viewing essential cinematic specifications, and managing a personal wishlist. Built with React 18, Vite, Pure CSS3 (Custom Variables, Flexbox & Grid), and the Context API.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Pure_Vanilla_CSS-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Demo-black?logo=vercel&logoColor=white)](https://movie-search-app-gamma-lemon.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 **Live Production URL:** [https://movie-search-app-gamma-lemon.vercel.app](https://movie-search-app-gamma-lemon.vercel.app)
> 📦 **GitHub Repository:** [https://github.com/Sanjeev-Git99/movie-search-app](https://github.com/Sanjeev-Git99/movie-search-app)

---

## 🌟 Key Features

- **⚡ Fast Movie Discovery & Live Search**:
  - Real-time search across global movie titles using OMDb API and TVMaze endpoints with automatic failover to a verified curated offline catalog.
  - Category filtering by Genre (All, Action, Sci-Fi, Drama, Crime).
  
- **🎯 Minimalist 5-Point Specification Modal**:
  - Focuses on the 5 most critical movie attributes without clutter:
    1. **Movie Title**
    2. **Theatrical Release Date**
    3. **Movie Genre(s)**
    4. **Starring Cast**
    5. **Director**
    *(plus concise plot overview and IMDb rating)*.
  - Intuitive navigation with single-arrow **Previous Page** and direct **Go to Wishlist** redirection.

- **🍿 Embedded Official Movie Trailers**:
  - Built-in YouTube player embedded directly into the movie details modal with `strict-origin-when-cross-origin` security.
  - Multi-source failover switcher allowing users to switch between official backup video streams if an embed is geo-restricted.
  - Direct "Watch on YouTube" quick link for external viewing.

- **❤️ Persistent Wishlist Management**:
  - Global state managed via React Context API (`WishlistContext`) and synchronized with browser `localStorage`.
  - Add or remove movies directly from cards or inside the modal.
  - Dedicated Wishlist view with quick management and empty-state guidance.

- **🌓 Zero-Flicker Light & Dark Theme**:
  - Minimalist developer aesthetic implemented with pure CSS custom properties: clean white (`#ffffff`) in Light mode and deep zinc (`#09090b`) in Dark mode.
  - Smooth transitions and persisted in browser storage.

- **🔒 Authentication & Guest Mode**:
  - Modal-based authentication with instant **1-Click Demo Login** for rapid evaluation.
  - Protected actions (Wishlist and detailed specifications prompt login when unauthenticated).

- **📱 Fully Responsive Design**:
  - Pure CSS Grid and Flexbox media queries tailored for flawless display across mobile phones, tablets, laptops, and ultra-wide desktops.

- **🖼️ High-Res Poster Delivery (TMDb CDN)**:
  - Official high-definition movie posters powered by The Movie Database (TMDb) CDN.
  - Dynamic SVG fallbacks ensuring zero broken image icons across all network conditions.

---

## 🛠️ Tech Stack & Architecture

| Category | Technology |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) (Functional Components, Hooks) |
| **Build Tool & Bundler** | [Vite](https://vitejs.dev/) (Lightning-fast HMR) |
| **Styling** | **Pure Modern CSS3** (CSS Custom Properties, Flexbox, CSS Grid) |
| **State Management** | React Context API (`AuthContext`, `WishlistContext`, `ThemeContext`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Data & Media** | OMDb REST API, TVMaze API, TMDb CDN, YouTube Embeds |
| **Storage** | Browser `localStorage` for state persistence |

---

## 📂 Project Structure

```text
movie-search-app/
├── index.html              # HTML entry point with security & referrer policies
├── package.json            # Project dependencies and scripts (Pure CSS, no Tailwind)
├── vite.config.js          # Vite build configuration
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Top-level application layout and view router
│   ├── index.css           # Pure vanilla CSS styling, theme variables & media queries
│   ├── context/
│   │   ├── AuthContext.jsx       # User authentication state & session persistence
│   │   ├── ThemeContext.jsx      # Light/Dark mode state & CSS variable toggle
│   │   └── WishlistContext.jsx   # Global wishlist state & storage synchronization
│   ├── services/
│   │   ├── movieApi.js           # API client (OMDb + TVMaze fallback handler)
│   │   └── mockMovies.js         # Curated catalog with verified TMDb posters & trailers
│   └── components/
│       ├── Navbar.jsx            # Navigation, branding, auth badges & theme toggle
│       ├── SearchSection.jsx     # Search input, query debouncing & genre filters
│       ├── MovieCard.jsx         # Card component with poster fallback & wishlist trigger
│       ├── MovieDetailModal.jsx  # 5-spec details modal with embedded YouTube player
│       ├── WishlistView.jsx      # Wishlist grid and management view
│       └── LoginModal.jsx        # Credentials & 1-click demo guest login modal
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sanjeev-Git99/movie-search-app.git
   cd movie-search-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration (Optional)

The application includes a rich catalog of popular films with verified trailers and works completely out of the box with zero external configuration. 

If you wish to query the live OMDb API for any global movie:
1. Obtain a free API key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Create a `.env` file in the project root:
   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
