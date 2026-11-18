import React from 'react';
import { ArrowLeft, Heart, ArrowRight, X, Calendar, Film, Users, Video, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function MovieDetailModal({ movie, onClose, onRedirectToWishlist }) {
  if (!movie) return null;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(movie.imdbID);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.imdbID);
    } else {
      addToWishlist(movie);
    }
  };

  // Exactly 5 Essential Minimal Movie Specifications
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl text-zinc-900 dark:text-zinc-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 flex items-center justify-between gap-2 bg-zinc-50/80 dark:bg-zinc-900/80">
          
          {/* Button 1: Previous Page */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Previous Page</span>
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
        <div className="p-5 space-y-4">
          
          {/* Top section: Poster & Synopsis */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-24 sm:w-28 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shrink-0 mx-auto sm:mx-0 shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
              }}
            />

            <div className="flex-1 space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {movie.year}
                </span>
                <span>•</span>
                <span>{movie.runtime}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {movie.imdbRating?.split('/')[0].trim() || '7.9'}
                </span>
              </div>

              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {movie.title}
              </h2>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                {movie.plot}
              </p>
            </div>
          </div>

          {/* 5 Minimal Specifications */}
          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
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

          {/* Footer Actions */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
            >
              ← Back
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
