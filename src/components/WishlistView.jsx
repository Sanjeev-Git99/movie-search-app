import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from './MovieCard';

export default function WishlistView({ onSelectMovie, onBackToSearch }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSearch}
            className="p-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              My Wishlist
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {wishlist.length} saved movies
            </p>
          </div>
        </div>

        <button
          onClick={onBackToSearch}
          className="px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
        >
          Browse Movies
        </button>
      </div>

      {/* Grid or Empty */}
      {wishlist.length === 0 ? (
        <div className="text-center py-16 text-zinc-500 text-sm">
          <p className="mb-3">
            Your wishlist is currently empty.
          </p>
          <button
            onClick={onBackToSearch}
            className="px-4 py-2 rounded-md bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium transition-colors"
          >
            Explore Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <MovieCard
                movie={movie}
                onSelect={onSelectMovie}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(movie.imdbID);
                }}
                className="absolute bottom-2 left-2 p-1.5 rounded bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-red-400 text-[11px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
