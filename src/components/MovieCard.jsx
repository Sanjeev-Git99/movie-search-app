import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setImgError(false);
  }, [movie.imdbID, movie.poster]);

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
      className="movie-card"
    >
      {/* Poster */}
      <div className="poster-box">
        <img
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          className="poster-image"
          onError={() => setImgError(true)}
        />

        {/* Quick Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`card-wishlist-btn ${inWishlist ? 'in-wishlist' : ''}`}
        >
          <Heart 
            style={{ width: 14, height: 14 }} 
            fill={inWishlist ? '#ffffff' : 'none'} 
            color={inWishlist ? '#ffffff' : 'currentColor'} 
          />
        </button>
      </div>

      {/* Info */}
      <div className="movie-card-info">
        <div>
          <div className="card-top-meta">
            <span>{movie.year}</span>
            <div className="card-rating">
              <Star style={{ width: 12, height: 12 }} fill="#f59e0b" color="#f59e0b" />
              <span>{movie.imdbRating?.split('/')[0].trim() || '7.9'}</span>
            </div>
          </div>

          <h3 className="card-title">
            {movie.title}
          </h3>
        </div>

        <div className="card-bottom-meta">
          <span>{movie.primaryGenre}</span>
          <span>{movie.runtime}</span>
        </div>
      </div>
    </div>
  );
}
