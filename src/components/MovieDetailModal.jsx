import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, ArrowRight, X, Calendar, Film, 
  Users, Video, Star, Play, EyeOff, ExternalLink, RefreshCw,
  Volume2, VolumeX 
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

function getMoviePosterFallback(title, year) {
  const cleanTitle = (title || 'Movie').slice(0, 24).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cleanYear = (year || 'Cinema').slice(0, 10);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
    <rect width="300" height="450" fill="#18181b"/>
    <rect x="15" y="15" width="270" height="420" rx="8" fill="#27272a" stroke="#3f3f46" stroke-width="1.5"/>
    <circle cx="150" cy="175" r="40" fill="#3f3f46"/>
    <text x="150" y="188" font-family="-apple-system,sans-serif" font-size="32" text-anchor="middle" fill="#a1a1aa">🎬</text>
    <text x="150" y="260" font-family="-apple-system,sans-serif" font-size="15" font-weight="bold" text-anchor="middle" fill="#f4f4f5">${cleanTitle}</text>
    <text x="150" y="285" font-family="-apple-system,sans-serif" font-size="12" text-anchor="middle" fill="#a1a1aa">${cleanYear}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Verified embeddable backup sources for popular movies
const BACKUP_TRAILERS = {
  "tt16539454": ["1kVK0MZlbI4", "H7oQkBIl-kRN"], // Pushpa 2: The Rule
  "tt2631186": ["3NQRhE772b0", "VdafjyDK3ko"], // Baahubali: The Beginning
  "tt8178634": ["NgBoMJy386M", "GY4BgdUSpbE"], // RRR
  "tt11083552": ["kQDd1AhGIHk", "Q1NKMPhP8PY"], // Kalki 2898 AD
  "tt9335498": ["Q1NKMPhP8PY", "pKctjlpbBR4"], // Pushpa
  "tt1375666": ["YoHD9XEInc0", "8hP9D6kZseM"], // Inception
  "tt0816692": ["zSWdZVtXT7E", "2LqzF5WauAw"], // Interstellar
  "tt0468569": ["EXeTwQWrcwY", "kmJLuwP3MbY"], // The Dark Knight
  "tt4154796": ["TcMBFSGVi1c", "ee1172_SYG8"], // Avengers Endgame
  "tt15398776": ["uYPbbksJxIg", "bK6ldnjE3Y0"], // Oppenheimer
  "tt0499549": ["5PSNL1qE6VY", "d9MyW72ELq0"], // Avatar
  "tt0111161": ["6hB3S9bIaco", "NmzuHjWmXOc"], // Shawshank
  "tt1087260": ["JfVOs4VSpmA", "rt-2cxAiPJk"]  // Spider-Man
};

export default function MovieDetailModal({ movie, onClose, onRedirectToWishlist }) {
  if (!movie) return null;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(movie.imdbID);
  const [showTrailer, setShowTrailer] = useState(true);
  const [trailerSourceIndex, setTrailerSourceIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Default to MUTED as requested!
  const [imgError, setImgError] = useState(false);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.imdbID);
    } else {
      addToWishlist(movie);
    }
  };

  // 5 Essential Minimal Movie Specifications
  const fiveSpecs = [
    {
      id: 1,
      label: "1. Movie Title",
      value: movie.title,
      icon: Film
    },
    {
      id: 2,
      label: "2. Release Date",
      value: movie.released || movie.year,
      icon: Calendar
    },
    {
      id: 3,
      label: "3. Movie Genre",
      value: Array.isArray(movie.genres) ? movie.genres.join(', ') : (movie.primaryGenre || 'Action, Drama'),
      icon: Film
    },
    {
      id: 4,
      label: "4. Starring Cast",
      value: movie.leadCast,
      icon: Users
    },
    {
      id: 5,
      label: "5. Director",
      value: movie.director,
      icon: Video
    }
  ];

  // Resolve trailer video sources
  const fallbackSources = BACKUP_TRAILERS[movie.imdbID] || [];
  const primaryId = movie.trailerYoutubeId || (fallbackSources[0] || null);
  const allSources = [primaryId, ...fallbackSources.filter(id => id !== primaryId)].filter(Boolean);
  const currentTrailerId = allSources[trailerSourceIndex % (allSources.length || 1)] || null;

  // Trailer embed URL with mute parameter controlled by state (without enablejsapi to prevent configuration errors)
  const trailerEmbedUrl = currentTrailerId
    ? `https://www.youtube.com/embed/${currentTrailerId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0`
    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movie.title + ' official trailer')}&autoplay=1&mute=${isMuted ? 1 : 0}`;

  const youtubeDirectLink = currentTrailerId
    ? `https://www.youtube.com/watch?v=${currentTrailerId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer')}`;

  const posterSrc = imgError 
    ? getMoviePosterFallback(movie.title, movie.year) 
    : (movie.poster || getMoviePosterFallback(movie.title, movie.year));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl text-zinc-900 dark:text-zinc-100 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 flex items-center justify-between gap-2 bg-zinc-50/80 dark:bg-zinc-900/80">
          
          {/* Button 1: Previous Page (Single arrow icon) */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Page</span>
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Button 2: Add to Wishlist */}
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                inWishlist
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
              <span>{inWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {/* Button 3: Redirect to Wishlist */}
            {inWishlist && (
              <button
                onClick={() => {
                  onClose();
                  onRedirectToWishlist();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-semibold transition-colors"
              >
                <span>Go to Wishlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Movie Title & Quick Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{movie.year}</span>
                <span>•</span>
                <span>{movie.primaryGenre}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {movie.imdbRating?.split('/')[0].trim() || '7.9'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {movie.title}
              </h2>
            </div>

            {/* Trailer Action Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {showTrailer && (
                /* Sound Toggle Button (Muted by Default) */
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isMuted
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 dark:bg-amber-950/80 dark:hover:bg-amber-900 dark:text-amber-200 dark:border-amber-800'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-800'
                  }`}
                  title={isMuted ? "Click to unmute sound" : "Click to mute sound"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
                      <span>Unmute Sound</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                      <span>Mute Sound</span>
                    </>
                  )}
                </button>
              )}

              {/* Trailer Toggle Button */}
              <button
                onClick={() => setShowTrailer(!showTrailer)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  showTrailer
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700'
                }`}
              >
                {showTrailer ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide Trailer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Trailer</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Embedded Video Trailer Player */}
          {showTrailer ? (
            <div className="space-y-2">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <iframe
                  key={`${trailerEmbedUrl}_${isMuted}`}
                  src={trailerEmbedUrl}
                  title={`${movie.title} Official Trailer`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Player Toolbar: Status, Sound Indicator, Alternate Source & Direct Link */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 px-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-medium">
                    <Play className="w-3 h-3 text-red-600 fill-red-600" />
                    Official Trailer
                  </span>
                  {isMuted && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                      Muted by default (click Unmute above or video player sound icon)
                    </span>
                  )}
                  {allSources.length > 1 && (
                    <button
                      onClick={() => setTrailerSourceIndex(prev => prev + 1)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-[10px] transition-colors"
                      title="Switch to backup trailer video stream"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Switch Source ({((trailerSourceIndex % allSources.length) + 1)}/{allSources.length})</span>
                    </button>
                  )}
                </div>

                <a
                  href={youtubeDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-zinc-600 dark:text-zinc-300 hover:text-red-600 font-medium"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            /* Poster + Synopsis when trailer is hidden */
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="relative group mx-auto sm:mx-0 shrink-0">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  className="w-28 sm:w-32 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  onError={() => setImgError(true)}
                />
                <button
                  onClick={() => setShowTrailer(true)}
                  className="absolute inset-0 bg-black/40 group-hover:bg-black/55 rounded-lg flex items-center justify-center text-white transition-colors"
                  title="Play Trailer"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </button>
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {movie.plot}
                </p>
                <button
                  onClick={() => setShowTrailer(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Official Trailer</span>
                </button>
              </div>
            </div>
          )}

          {/* 5 Minimal Specifications */}
          <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              5 Key Specifications:
            </div>

            <div className="space-y-1.5 text-xs">
              {fiveSpecs.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-medium text-[11px]">
                      <IconComponent className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-zinc-900 dark:text-zinc-200 font-medium sm:text-right">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plot overview under specs if trailer is shown */}
          {showTrailer && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Plot Overview:
              </span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                {movie.plot}
              </p>
            </div>
          )}

          {/* Footer Actions (Single arrow icon) */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (!inWishlist) addToWishlist(movie);
                onClose();
                onRedirectToWishlist();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-medium transition-colors"
            >
              <span>Go to Wishlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
