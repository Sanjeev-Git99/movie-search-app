import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

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

export default function MovieCard({ movie, onSelect }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isLoggedIn, openLoginModal } = useAuth();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(movie.imdbID);

  const handleClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    onSelect(movie);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    toggleWishlist(movie);
  };

  const posterSrc = imgError 
    ? getMoviePosterFallback(movie.title, movie.year) 
    : (movie.poster || getMoviePosterFallback(movie.title, movie.year));

  return (
    <div
      onClick={handleClick}
      className="group bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col cursor-pointer shadow-xs hover:shadow"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <img
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          onError={() => setImgError(true)}
        />

        {/* Quick Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-sm transition-all shadow-xs ${
            inWishlist 
              ? 'bg-red-600 text-white' 
              : 'bg-white/80 hover:bg-white text-zinc-800 dark:bg-black/60 dark:hover:bg-black/80 dark:text-zinc-200'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
            <span>{movie.year}</span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3 h-3 fill-amber-500" />
              <span>{movie.imdbRating?.split('/')[0].trim() || '7.9'}</span>
            </div>
          </div>

          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug line-clamp-1 group-hover:text-black dark:group-hover:text-white">
            {movie.title}
          </h3>
        </div>

        <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{movie.primaryGenre}</span>
          <span>{movie.runtime}</span>
        </div>
      </div>
    </div>
  );
}
