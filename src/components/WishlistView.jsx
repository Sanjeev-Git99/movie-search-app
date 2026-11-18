import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from './MovieCard';

export default function WishlistView({ onSelectMovie, onBackToSearch }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="wishlist-view-section">
      <div className="container">
        
        {/* Header */}
        <div className="wishlist-header-row">
          <div className="wishlist-left-title">
            <button
              onClick={onBackToSearch}
              className="wishlist-back-icon-btn"
              title="Back to search"
            >
              <ArrowLeft style={{ width: 16, height: 16 }} />
            </button>
            <div>
              <h1 className="wishlist-h1">
                My Wishlist
              </h1>
              <p className="wishlist-count-desc">
                {wishlist.length} saved movies
              </p>
            </div>
          </div>

          <button
            onClick={onBackToSearch}
            className="theme-toggle-btn"
          >
            Browse Movies
          </button>
        </div>

        {/* Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="empty-wishlist-box">
            <p>Your wishlist is currently empty.</p>
            <button
              onClick={onBackToSearch}
              className="empty-browse-btn"
            >
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {wishlist.map((movie) => (
              <div key={movie.imdbID} style={{ position: 'relative' }}>
                <MovieCard
                  movie={movie}
                  onSelect={onSelectMovie}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(movie.imdbID);
                  }}
                  className="remove-from-wishlist-tag"
                  title="Remove from wishlist"
                >
                  <Trash2 style={{ width: 12, height: 12 }} />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
