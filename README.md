# 🎬 CineVault - Movies Search & Wishlist Application

A modern, responsive React web application for searching movies using free public APIs, viewing **30 comprehensive specifications**, managing a personal wishlist, and user authentication with Telugu & English bilingual support.

---

## ✨ Features Implemented (లక్షణాలు)

1. **Free Public Movie API Integration (ఉచిత సినిమా API)**:
   - Integrated with free open movie endpoints (OMDb API & TVMaze API) with smart failover and a curated fallback catalog.
   - Works seamlessly out-of-the-box with zero mandatory setup.
   - Optional setting to configure a personal OMDB API key if desired.

2. **User Authentication (యూజర్ లాగిన్ సిస్టమ్)**:
   - Log In / Registration modal with credentials support.
   - **1-Click Instant Demo Login (`⚡ తక్షణ డెమో లాగిన్`)** for one-tap access.
   - Persistent user session in `localStorage`.
   - Displays avatar, name, and logged-in badge.

3. **Thirty Movie Details Pop-up Modal (30 పూర్తి వివరాల పాప్-అప్ కార్డ్)**:
   Whenever a logged-in user clicks on any movie card, a pop-up modal opens displaying all **30 specifications** clearly numbered from 1 to 30:
   1. Movie Title (సినిమా శీర్షిక)
   2. Release Year (విడుదలైన సంవత్సరం)
   3. Sensor Certification / Rated (సెన్సార్ సర్టిఫికేషన్)
   4. Theatrical Release Date (పూర్తి విడుదల తేదీ)
   5. Total Runtime / Duration (సినిమా నిడివి)
   6. Primary Genre (ప్రధాన వర్గం)
   7. All Genres & Categories (అన్ని వర్గాలు & టాగ్స్)
   8. Director (దర్శకుడు)
   9. Writer & Screenplay (రచయిత & స్క్రీన్‌ప్లే)
   10. Lead Starring Cast (ప్రధాన తారాగణం)
   11. Supporting Cast & Ensembles (ఇతర నటీనటులు)
   12. Plot Synopsis (సంక్షిప్త కథ)
   13. Detailed Storyline & Premise (పూర్తి కథాంశం)
   14. Original Spoken Language (ఆడియో భాష)
   15. Available Subtitles & Dubbing (లభించే సబ్‌టైటిల్స్)
   16. Country of Origin (మూల దేశం)
   17. Awards & Honors (అవార్డులు & ప్రశంసలు)
   18. IMDb Rating Score (IMDb రేటింగ్)
   19. IMDb Total Votes (మొత్తం ఓట్ల సంఖ్య)
   20. Metacritic Critic Score (విమర్శకుల స్కోర్)
   21. Rotten Tomatoes / Audience Score (ప్రేక్షకుల ఆమోద శాతం)
   22. Production Company / Studio (నిర్మాణ సంస్థ)
   23. Worldwide Box Office Collection (ప్రపంచవ్యాప్త బాక్సాఫీస్ కలెక్షన్)
   24. Estimated Production Budget (అంచనా బడ్జెట్)
   25. Content Type & Classification (వర్గీకరణ రకం)
   26. Aspect Ratio & Video Format (స్క్రీన్ నిష్పత్తి & రిజల్యూషన్)
   27. Content Advisory & Guidance (కంటెంట్ మార్గదర్శకం)
   28. Audio & Sound Mix Engineering (సౌండ్ సిస్టమ్)
   29. Official Distribution & Link (అధికారిక పంపిణీ సైట్)
   30. Global Database Reference ID (గ్లోబల్ రిఫరెన్స్ కోడ్)

4. **Action Buttons Inside the Pop-up Card (పాప్-అప్ కార్డ్ బటన్లు)**:
   - **`← Previous Page (వెనుకకు)` Button**: Closes the pop-up modal and smoothly returns to the previous search results page.
   - **`Wishlist లో జోడించు (Add to Wishlist)` Button**: Toggles and saves the movie to the user's wishlist with celebratory visual confetti animation.
   - **`విష్‌లిస్ట్ చూడండి (Go to Wishlist)` Redirect Button**: When added, a glowing redirect button immediately appears allowing the user to navigate straight to their Wishlist page to see the saved movie.

5. **Wishlist Management (విష్‌లిస్ట్ పేజీ)**:
   - Shows all saved movies.
   - Quick remove option.
   - Click any card to re-open the 30-detail modal.
   - Back to Search navigation button.

6. **Language Switcher (భాష మార్పు)**:
   - One-click toggle between Telugu (తెలుగు) and English.

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the project directory
cd /Users/sanjeevaaerupula/Desktop/React/movie-search-app

# 2. Start the development server
npm run dev
```

Open your browser at:
`http://localhost:5173/`
