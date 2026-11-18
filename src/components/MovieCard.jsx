import React from 'react';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function MovieCard({ movie, onSelect, lang = 'te' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isLoggedIn, openLoginModal } = useAuth();
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

  const isTelugu = lang === 'te';

  return (
    <div
      onClick={handleClick}
      className="group bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col cursor-pointer shadow-xs hover:shadow"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Quick Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          title={inWishlist ? (isTelugu ? 'విష్‌లిస్ట్ నుండి తీసివేయి' : 'Remove from Wishlist') : (isTelugu ? 'విష్‌లిస్ట్‌కు జోడించు' : 'Add to Wishlist')}
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

          {movie.teluguTitle && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              {movie.teluguTitle}
            </p>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{movie.primaryGenre}</span>
          <span>{movie.runtime}</span>
        </div>
      </div>
    </div>
  );
}
