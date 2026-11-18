import React, { useState } from 'react';
import { Search, Key, Check } from 'lucide-react';
import { searchMovies } from '../services/movieApi';
import { POPULAR_MOVIES } from '../services/mockMovies';
import MovieCard from './MovieCard';

export default function SearchSection({ onSelectMovie }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(POPULAR_MOVIES);
  const [isLoading, setIsLoading] = useState(false);
  const [customKeyOpen, setCustomKeyOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('omdb_api_key') || '');
  const [keySaved, setKeySaved] = useState(false);

  const tags = ['RRR', 'Inception', 'Kalki 2898 AD', 'Avatar', 'Baahubali', 'The Dark Knight', 'Pushpa', 'Interstellar'];

  const handleSearch = async (searchTerm) => {
    const term = searchTerm !== undefined ? searchTerm : query;
    setIsLoading(true);
    try {
      const results = await searchMovies(term);
      setMovies(results);
    } catch (err) {
      console.error(err);
      setMovies(POPULAR_MOVIES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const saveCustomApiKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem('omdb_api_key', apiKeyInput.trim());
    } else {
      localStorage.removeItem('omdb_api_key');
    }
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setCustomKeyOpen(false);
      handleSearch();
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          Search Movies
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Search for any movie to view 5 essential specifications and add to your wishlist.
        </p>

        {/* Minimal Search Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search movie title (e.g. Inception, RRR, Avatar)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus:border-zinc-500 dark:focus:border-zinc-600 focus:outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 shadow-sm transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setMovies(POPULAR_MOVIES);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-medium text-xs transition-colors shrink-0 disabled:opacity-50 shadow-sm"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Minimal Tag Chips */}
        <div className="flex items-center gap-1.5 flex-wrap mt-3 text-xs">
          <span className="text-zinc-500 text-[11px] mr-1">
            Popular:
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                handleSearch(tag);
              }}
              className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 text-[11px] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* API Info */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Free Public API Active
          </span>
          <span>•</span>
          <button
            onClick={() => setCustomKeyOpen(!customKeyOpen)}
            className="hover:text-zinc-700 dark:hover:text-zinc-300 underline underline-offset-2 flex items-center gap-1"
          >
            <Key className="w-3 h-3" />
            <span>OMDB API Key</span>
          </button>
        </div>

        {customKeyOpen && (
          <form onSubmit={saveCustomApiKey} className="mt-3 p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-md flex gap-2 shadow-sm">
            <input
              type="text"
              placeholder="OMDB API Key (Optional)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-200"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white dark:text-zinc-200 text-xs font-medium"
            >
              {keySaved ? <Check className="w-3.5 h-3.5" /> : 'Save'}
            </button>
          </form>
        )}
      </div>

      {/* Movies Grid Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
          {query ? `Results for "${query}"` : 'Featured Movies'}
        </h2>
        <span className="text-xs text-zinc-500">
          {movies.length} titles
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <div key={n} className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-pulse">
              <div className="aspect-[2/3] bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="p-3 space-y-2">
                <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 text-sm">
          No movies found. Try another title.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={onSelectMovie}
            />
          ))}
        </div>
      )}

    </div>
  );
}
