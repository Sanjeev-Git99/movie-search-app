import React from 'react';
import { Star, Heart, Film, ArrowUpRight } from 'lucide-react';
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
      className="group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-rose-500/50 shadow-lg hover:shadow-2xl hover:shadow-rose-950/30 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

        {/* Year Badge */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl border border-slate-800">
          {movie.year}
        </div>

        {/* Wishlist Quick Button */}
        <button
          onClick={handleWishlistClick}
          title={inWishlist ? (isTelugu ? 'విష్‌లిస్ట్ నుండి తొలగించండి' : 'Remove from Wishlist') : (isTelugu ? 'విష్‌లిస్ట్‌కు జోడించండి' : 'Add to Wishlist')}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 ${
            inWishlist 
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-105' 
              : 'bg-slate-950/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900 border border-slate-800/80'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white text-white' : ''}`} />
        </button>

        {/* View Details Hover Pill */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 bg-rose-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg">
          <span>{isTelugu ? '30 వివరాలు చూడండి' : '30 Details'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 font-medium mb-1">
            <span className="text-rose-400 font-semibold truncate">
              {movie.primaryGenre}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{movie.imdbRating.split('/')[0].trim()}</span>
            </div>
          </div>

          <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-rose-400 transition-colors">
            {movie.title}
          </h3>

          {movie.teluguTitle && (
            <p className="text-xs text-amber-300/80 font-medium truncate mt-0.5">
              {movie.teluguTitle}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>{movie.runtime}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium">
            {movie.rated}
          </span>
        </div>
      </div>
    </div>
  );
}
