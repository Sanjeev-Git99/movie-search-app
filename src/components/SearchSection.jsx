import React, { useState } from 'react';
import { Search } from 'lucide-react';
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
                  onClick={() => {
                    setQuery('');
                    setMovies(POPULAR_MOVIES);
                  }}
                  className="search-clear-btn"
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
            {filteredMovies.length} movies found
          </div>
        </div>

        {/* Movies Grid */}
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={onSelectMovie}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
