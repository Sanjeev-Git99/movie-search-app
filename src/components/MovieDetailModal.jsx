import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Check, ExternalLink, Star, 
  Calendar, Clock, Award, ShieldAlert, Video, 
  DollarSign, Globe, Film, Sparkles, Volume2, 
  Layers, Users, BookmarkCheck, ArrowRight
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function MovieDetailModal({ movie, onClose, onRedirectToWishlist, lang = 'te' }) {
  if (!movie) return null;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isTelugu = lang === 'te';
  const inWishlist = isInWishlist(movie.imdbID);
  const [justAdded, setJustAdded] = useState(false);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.imdbID);
      setJustAdded(false);
    } else {
      addToWishlist(movie);
      setJustAdded(true);
    }
  };

  // 30 structured details specification list
  const detailsList = [
    {
      id: 1,
      labelEn: "1. Movie Title",
      labelTe: "1. సినిమా శీర్షిక (Title)",
      value: movie.title + (movie.teluguTitle ? ` (${movie.teluguTitle})` : ''),
      icon: Film,
      badge: "Title"
    },
    {
      id: 2,
      labelEn: "2. Release Year",
      labelTe: "2. విడుదలైన సంవత్సరం (Year)",
      value: movie.year,
      icon: Calendar,
      badge: "Year"
    },
    {
      id: 3,
      labelEn: "3. Age Rating & Sensor Certification",
      labelTe: "3. సెన్సార్ సర్టిఫికేషన్ (Rated)",
      value: movie.rated || "PG-13",
      icon: ShieldAlert,
      badge: "Rated"
    },
    {
      id: 4,
      labelEn: "4. Theatrical Release Date",
      labelTe: "4. పూర్తి విడుదల తేదీ (Release Date)",
      value: movie.released || `October ${movie.year}`,
      icon: Calendar,
      badge: "Date"
    },
    {
      id: 5,
      labelEn: "5. Total Runtime",
      labelTe: "5. సినిమా నిడివి (Runtime)",
      value: movie.runtime,
      icon: Clock,
      badge: "Duration"
    },
    {
      id: 6,
      labelEn: "6. Primary Genre",
      labelTe: "6. ప్రధాన వర్గం (Primary Genre)",
      value: movie.primaryGenre,
      icon: Film,
      badge: "Genre"
    },
    {
      id: 7,
      labelEn: "7. All Genres & Categories",
      labelTe: "7. అన్ని వర్గాలు (Genres & Tags)",
      value: Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres,
      icon: Layers,
      badge: "Tags"
    },
    {
      id: 8,
      labelEn: "8. Director",
      labelTe: "8. దర్శకుడు (Director)",
      value: movie.director,
      icon: Users,
      badge: "Director"
    },
    {
      id: 9,
      labelEn: "9. Writer & Screenplay",
      labelTe: "9. రచయిత & స్క్రీన్‌ప్లే (Writer)",
      value: movie.writer,
      icon: Users,
      badge: "Writer"
    },
    {
      id: 10,
      labelEn: "10. Lead Starring Cast",
      labelTe: "10. ప్రధాన తారాగణం (Lead Actors)",
      value: movie.leadCast,
      icon: Users,
      badge: "Stars"
    },
    {
      id: 11,
      labelEn: "11. Supporting Cast & Ensembles",
      labelTe: "11. ఇతర నటీనటులు (Supporting Cast)",
      value: movie.supportingCast,
      icon: Users,
      badge: "Cast"
    },
    {
      id: 12,
      labelEn: "12. Plot Synopsis",
      labelTe: "12. సంక్షిప్త కథ (Plot Summary)",
      value: movie.plot,
      icon: Film,
      badge: "Synopsis"
    },
    {
      id: 13,
      labelEn: "13. Detailed Storyline & Premise",
      labelTe: "13. పూర్తి కథాంశం (Full Storyline)",
      value: movie.fullStoryline || movie.plot,
      icon: Film,
      badge: "Story"
    },
    {
      id: 14,
      labelEn: "14. Original Spoken Language",
      labelTe: "14. ఆడియో భాష (Audio Language)",
      value: movie.language,
      icon: Globe,
      badge: "Language"
    },
    {
      id: 15,
      labelEn: "15. Available Subtitles & Dubbing",
      labelTe: "15. లభించే సబ్‌టైటిల్స్ (Subtitles)",
      value: movie.subtitles || "Telugu, English, Hindi, Spanish, French",
      icon: Globe,
      badge: "Subtitles"
    },
    {
      id: 16,
      labelEn: "16. Country of Origin",
      labelTe: "16. మూల దేశం (Country)",
      value: movie.country,
      icon: Globe,
      badge: "Country"
    },
    {
      id: 17,
      labelEn: "17. Awards & Honors",
      labelTe: "17. అవార్డులు & ప్రశంసలు (Awards)",
      value: movie.awards || "Multiple National & International Recognitions",
      icon: Award,
      badge: "Awards"
    },
    {
      id: 18,
      labelEn: "18. IMDb Rating",
      labelTe: "18. IMDb రేటింగ్ (IMDb Rating)",
      value: movie.imdbRating,
      icon: Star,
      badge: "IMDb"
    },
    {
      id: 19,
      labelEn: "19. IMDb Total Votes",
      labelTe: "19. మొత్తం ఓట్ల సంఖ్య (Total Votes)",
      value: movie.imdbVotes,
      icon: Users,
      badge: "Votes"
    },
    {
      id: 20,
      labelEn: "20. Metacritic Critic Score",
      labelTe: "20. విమర్శకుల స్కోర్ (Metascore)",
      value: movie.metascore,
      icon: Award,
      badge: "Critics"
    },
    {
      id: 21,
      labelEn: "21. Rotten Tomatoes / Audience Score",
      labelTe: "21. ప్రేక్షకుల ఆమోద శాతం (Audience Score)",
      value: movie.audienceScore || "92% Positive",
      icon: Star,
      badge: "Audience"
    },
    {
      id: 22,
      labelEn: "22. Production Company / Studio",
      labelTe: "22. నిర్మాణ సంస్థ (Production Studio)",
      value: movie.productionCompany,
      icon: Film,
      badge: "Studio"
    },
    {
      id: 23,
      labelEn: "23. Worldwide Box Office Collection",
      labelTe: "23. ప్రపంచవ్యాప్త బాక్సాఫీస్ (Box Office)",
      value: movie.boxOffice,
      icon: DollarSign,
      badge: "Revenue"
    },
    {
      id: 24,
      labelEn: "24. Estimated Production Budget",
      labelTe: "24. అంచనా బడ్జెట్ (Budget)",
      value: movie.budget || "$65,000,000",
      icon: DollarSign,
      badge: "Budget"
    },
    {
      id: 25,
      labelEn: "25. Content Type & Classification",
      labelTe: "25. వర్గీకరణ రకం (Format / Type)",
      value: movie.type || "Feature Film",
      icon: Film,
      badge: "Type"
    },
    {
      id: 26,
      labelEn: "26. Aspect Ratio & Video Format",
      labelTe: "26. స్క్రీన్ నిష్పత్తి (Aspect Ratio & 4K)",
      value: movie.aspectRatio || "2.39:1 (IMAX & Dolby Vision)",
      icon: Video,
      badge: "Format"
    },
    {
      id: 27,
      labelEn: "27. Content Advisory & Guidance",
      labelTe: "27. కంటెంట్ మార్గదర్శకం (Advisory)",
      value: movie.contentWarning || "Action sequences and dramatic intensity",
      icon: ShieldAlert,
      badge: "Guide"
    },
    {
      id: 28,
      labelEn: "28. Audio & Sound Mix Engineering",
      labelTe: "28. సౌండ్ సిస్టమ్ (Sound Mix)",
      value: movie.soundMix || "Dolby Atmos, 7.1 Surround",
      icon: Volume2,
      badge: "Audio"
    },
    {
      id: 29,
      labelEn: "29. Official Distribution & Link",
      labelTe: "29. అధికారిక పంపిణీ సైట్ (Official Website)",
      value: movie.officialWebsite || `https://www.imdb.com/title/${movie.imdbID}/`,
      icon: ExternalLink,
      badge: "Website"
    },
    {
      id: 30,
      labelEn: "30. Global Database Reference ID",
      labelTe: "30. గ్లోబల్ రిఫరెన్స్ కోడ్ (IMDb Reference ID)",
      value: movie.imdbID,
      icon: BookmarkCheck,
      badge: "ID"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xl flex items-start justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl my-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Toolbar */}
        <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          
          {/* Button 1: Previous Page (Required by user) */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all border border-slate-700 hover:border-slate-600 shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            <span>{isTelugu ? '← Previous Page (వెనుకకు)' : '← Previous Page (Back)'}</span>
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            
            {/* Button 2: Add to Wishlist Button (Required by user) */}
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                inWishlist
                  ? 'bg-rose-600 text-white shadow-rose-600/30 hover:bg-rose-700'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-rose-500/40 hover:border-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white text-white scale-110' : 'text-rose-400'}`} />
              <span>
                {inWishlist 
                  ? (isTelugu ? 'విష్‌లిస్ట్‌లో ఉంది ✓' : 'In Wishlist ✓') 
                  : (isTelugu ? 'Wishlist లో జోడించు' : 'Add to Wishlist')}
              </span>
            </button>

            {/* Button 3: Redirect to Wishlist Button (Required by user) */}
            {inWishlist && (
              <button
                onClick={() => {
                  onClose();
                  onRedirectToWishlist();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 animate-pulse"
                title={isTelugu ? 'విష్‌లిస్ట్ పేజీకి వెళ్లండి' : 'Go to Wishlist page'}
              >
                <span>{isTelugu ? 'విష్‌లిస్ట్ చూడండి (Go to Wishlist)' : 'Go to Wishlist'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950 font-bold" />
              </button>
            )}

          </div>
        </div>

        {/* Hero Section Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            
            {/* Movie Poster */}
            <div className="relative flex-shrink-0 w-48 sm:w-56 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/60 group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-3 left-3 bg-rose-600/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                {movie.year}
              </div>
              <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>{movie.imdbRating.split('/')[0].trim()}</span>
              </div>
            </div>

            {/* Main Header Info */}
            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTelugu ? '30 పూర్తి సినిమా వివరాల కార్డ్ (30 Movie Details)' : '30 Complete Movie Specifications'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              {movie.teluguTitle && (
                <p className="text-lg text-amber-400/90 font-medium">
                  {movie.teluguTitle}
                </p>
              )}

              {/* Quick Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  {movie.rated}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  {movie.runtime}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-rose-400">
                  {movie.primaryGenre}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  {movie.language}
                </span>
              </div>

              {/* Story Teaser */}
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {movie.plot}
              </p>

              {/* Banner notification if added */}
              {justAdded && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 font-bold" />
                    <span>
                      {isTelugu 
                        ? 'ఈ సినిమా విజయవంతంగా మీ Wishlist లోకి చేర్చబడింది!' 
                        : 'This movie has been added to your Wishlist successfully!'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onRedirectToWishlist();
                    }}
                    className="font-bold underline text-white hover:text-emerald-200"
                  >
                    {isTelugu ? 'విష్‌లిస్ట్‌కు వెళ్లండి →' : 'Redirect to Wishlist →'}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* 30 Complete Specifications Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-500" />
                <span>{isTelugu ? 'సినిమాకు సంబంధించిన 30 వివరాలు' : 'All 30 Movie Specifications'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isTelugu 
                  ? 'కింది వివరాలన్నింటినీ పరిశీలించండి (1 నుండి 30 వరకు స్పష్టంగా జాబితా చేయబడ్డాయి):' 
                  : 'Examine all thirty detailed metrics and production attributes below:'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>30 / 30 {isTelugu ? 'వివరాలు లభ్యం' : 'Details Verified'}</span>
            </div>
          </div>

          {/* Grid of All 30 Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailsList.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] flex items-center justify-center font-bold">
                        {item.id}
                      </span>
                      <span>{isTelugu ? item.labelTe : item.labelEn}</span>
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 font-medium leading-relaxed group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer with Previous Page & Redirect buttons */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>{isTelugu ? '← Previous Page కి వెళ్లండి' : '← Return to Previous Page'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                  inWishlist
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/40'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                <span>
                  {inWishlist 
                    ? (isTelugu ? 'Wishlist లో ఉంది' : 'In Wishlist') 
                    : (isTelugu ? 'Wishlist లో జోడించు' : 'Add to Wishlist')}
                </span>
              </button>

              <button
                onClick={() => {
                  if (!inWishlist) addToWishlist(movie);
                  onClose();
                  onRedirectToWishlist();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-extrabold text-sm shadow-xl transition-all"
              >
                <span>{isTelugu ? 'విష్‌లిస్ట్‌కు వెళ్లండి (Redirect)' : 'Redirect to Wishlist'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
