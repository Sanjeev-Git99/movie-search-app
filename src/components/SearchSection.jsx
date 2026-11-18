import React, { useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import { searchMovies } from '../services/movieApi';
import { POPULAR_MOVIES } from '../services/mockMovies';
import MovieCard from './MovieCard';

export default function SearchSection({ onSelectMovie }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(POPULAR_MOVIES);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const popularTags = ['Pushpa 2', 'RRR', 'Inception', 'Kalki 2898 AD', 'Baahubali', 'Avatar', 'The Dark Knight', 'Interstellar'];
  const categories = ['All', 'Action', 'Sci-Fi', 'Drama', 'Crime'];

  const handleSearch = async (searchTerm) => {
    const term = searchTerm !== undefined ? searchTerm : query;
    if (!term || !term.trim()) {
      setMovies(POPULAR_MOVIES);
      return;
    }
    setIsLoading(true);
    try {
      const results = await searchMovies(term);
      setMovies(results);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleResetSearch = () => {
    setQuery('');
    setSelectedCategory('All');
    setMovies(POPULAR_MOVIES);
  };

  const filteredMovies = selectedCategory === 'All'
    ? movies
    : movies.filter(m => {
        const genres = Array.isArray(m.genres) ? m.genres.join(' ') : (m.primaryGenre || '');
        return genres.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  return (
    <section className="search-section">
      <div className="container">
        
        {/* Search Header */}
        <div className="search-header-box">
          <h1 className="search-title">
            Search Movies
          </h1>
          <p className="search-subtitle">
            Search for any movie to view 5 essential specifications, watch official trailers, and manage your wishlist.
          </p>

          {/* Minimal Search Input */}
          <form onSubmit={handleSubmit} className="search-form-row">
            <div className="search-input-wrapper">
              <Search className="search-input-icon" style={{ width: 16, height: 16 }} />
              <input
                type="text"
                placeholder="Search movie title (e.g. Inception, RRR, Avatar)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input-field"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="search-submit-btn"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Minimal Tag Chips */}
          <div className="popular-tags-row">
            <span className="popular-label">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  handleSearch(tag);
                }}
                className="popular-tag-btn"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="category-filter-bar">
          <div className="category-tags-list">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="results-count-text">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
          </div>
        </div>

        {/* Movies Grid or Not Found Visual */}
        {filteredMovies.length === 0 ? (
          <div className="not-found-box">
            <div className="not-found-icon-wrap">
              <SearchX style={{ width: 28, height: 28 }} />
            </div>
            <h3 className="not-found-title">
              No Movies Found
            </h3>
            <p className="not-found-desc">
              We couldn't find any movies matching "{query || selectedCategory}". Please check for typos, try different search terms, or explore popular movies below.
            </p>
            <button
              type="button"
              onClick={handleResetSearch}
              className="not-found-reset-btn"
            >
              Explore Popular Movies
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onSelect={onSelectMovie}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
