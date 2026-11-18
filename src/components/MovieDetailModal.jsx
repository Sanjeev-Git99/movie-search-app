import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Heart, ArrowRight, X, Calendar, Film, 
  Users, Video, Star, Play, EyeOff, ExternalLink, RefreshCw 
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

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

// Verified embeddable backup sources for popular movies
const BACKUP_TRAILERS = {
  "tt16539454": ["g3JUbgOHgdw", "1kVK0MZlbI4"], // Pushpa 2: The Rule
  "tt2631186": ["3NQRhE772b0", "VdafjyDK3ko"], // Baahubali: The Beginning
  "tt8178634": ["NgBoMJy386M", "GY4BgdUSpbE"], // RRR
  "tt11083552": ["kQDd1AhGIHk", "Q1NKMPhP8PY"], // Kalki 2898 AD
  "tt9335498": ["Q1NKMPhP8PY", "pKctjlpbBR4"], // Pushpa: The Rise
  "tt1375666": ["YoHD9XEInc0", "8hP9D6kZseM"], // Inception
  "tt0816692": ["zSWdZVtXT7E", "2LqzF5WauAw"], // Interstellar
  "tt0468569": ["EXeTwQWrcwY", "kmJLuwP3MbY"], // The Dark Knight
  "tt4154796": ["TcMBFSGVi1c", "ee1172_SYG8"], // Avengers Endgame
  "tt15398776": ["uYPbbksJxIg", "bK6ldnjE3Y0"], // Oppenheimer
  "tt0499549": ["5PSNL1qE6VY", "d9MyW72ELq0"], // Avatar
  "tt0111161": ["6hB3S9bIaco", "NmzuHjWmXOc"], // Shawshank
  "tt1087260": ["JfVOs4VSpmA", "rt-2cxAiPJk"]  // Spider-Man
};

export default function MovieDetailModal({ movie, onClose, onRedirectToWishlist }) {
  if (!movie) return null;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(movie.imdbID);
  const [showTrailer, setShowTrailer] = useState(true);
  const [trailerSourceIndex, setTrailerSourceIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    setTrailerSourceIndex(0);
  }, [movie.imdbID]);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.imdbID);
    } else {
      addToWishlist(movie);
    }
  };

  // 5 Essential Minimal Movie Specifications
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

  // Resolve trailer video sources
  const fallbackSources = BACKUP_TRAILERS[movie.imdbID] || [];
  const primaryId = movie.trailerYoutubeId || (fallbackSources[0] || null);
  const allSources = [primaryId, ...fallbackSources.filter(id => id !== primaryId)].filter(Boolean);
  const currentTrailerId = allSources[trailerSourceIndex % (allSources.length || 1)] || null;

  const trailerEmbedUrl = currentTrailerId
    ? `https://www.youtube.com/embed/${currentTrailerId}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movie.title + ' official trailer')}&autoplay=1`;

  const youtubeDirectLink = currentTrailerId
    ? `https://www.youtube.com/watch?v=${currentTrailerId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer')}`;

  const posterSrc = imgError 
    ? getMoviePosterFallback(movie.title, movie.year) 
    : (movie.poster || getMoviePosterFallback(movie.title, movie.year));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Header */}
        <div className="modal-top-bar">
          
          {/* Button 1: Previous Page (Single arrow icon) */}
          <button
            onClick={onClose}
            className="modal-prev-btn"
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            <span>Previous Page</span>
          </button>

          {/* Right Action Buttons */}
          <div className="modal-actions-right">
            
            {/* Button 2: Add to Wishlist */}
            <button
              onClick={handleWishlistToggle}
              className={`modal-wishlist-toggle-btn ${inWishlist ? 'in-wishlist' : ''}`}
            >
              <Heart 
                style={{ width: 14, height: 14 }} 
                fill={inWishlist ? '#ffffff' : 'none'} 
                color={inWishlist ? '#ffffff' : 'currentColor'} 
              />
              <span>{inWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {/* Button 3: Redirect to Wishlist */}
            {inWishlist && (
              <button
                onClick={() => {
                  onClose();
                  onRedirectToWishlist();
                }}
                className="modal-go-wishlist-btn"
              >
                <span>Go to Wishlist</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="modal-close-icon-btn"
              title="Close"
            >
              <X style={{ width: 16, height: 16 }} />
            </button>

          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll">
          
          {/* Movie Title & Quick Info */}
          <div className="modal-title-row">
            <div>
              <div className="modal-quick-meta">
                <span style={{ fontWeight: 600 }}>{movie.year}</span>
                <span>•</span>
                <span>{movie.primaryGenre}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#f59e0b', fontWeight: 600 }}>
                  <Star style={{ width: 12, height: 12 }} fill="#f59e0b" color="#f59e0b" />
                  {movie.imdbRating?.split('/')[0].trim() || '7.9'}
                </span>
              </div>
              <h2 className="modal-main-title">
                {movie.title}
              </h2>
            </div>

            {/* Trailer Action Controls */}
            <div>
              <button
                onClick={() => setShowTrailer(!showTrailer)}
                className={`modal-trailer-btn ${showTrailer ? '' : 'outline'}`}
              >
                {showTrailer ? (
                  <>
                    <EyeOff style={{ width: 14, height: 14 }} />
                    <span>Hide Trailer</span>
                  </>
                ) : (
                  <>
                    <Play style={{ width: 14, height: 14 }} fill="currentColor" />
                    <span>Watch Trailer</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Embedded Video Trailer Player */}
          {showTrailer ? (
            <div className="trailer-box">
              <div className="trailer-iframe-wrapper">
                <iframe
                  src={trailerEmbedUrl}
                  title={`${movie.title} Official Trailer`}
                  className="trailer-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Player Toolbar */}
              <div className="trailer-toolbar">
                <div className="trailer-status-left">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                    <Play style={{ width: 12, height: 12, color: '#dc2626' }} fill="#dc2626" />
                    Official Trailer
                  </span>
                  {allSources.length > 1 && (
                    <button
                      onClick={() => setTrailerSourceIndex(prev => prev + 1)}
                      className="source-switcher-btn"
                      title="Switch to backup trailer video stream"
                    >
                      <RefreshCw style={{ width: 10, height: 10 }} />
                      <span>Switch Source ({((trailerSourceIndex % allSources.length) + 1)}/{allSources.length})</span>
                    </button>
                  )}
                </div>

                <a
                  href={youtubeDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-external-link"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink style={{ width: 12, height: 12 }} />
                </a>
              </div>
            </div>
          ) : (
            /* Poster + Synopsis when trailer is hidden */
            <div className="poster-synopsis-row">
              <div className="synopsis-poster-wrap">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  className="synopsis-poster-img"
                  onError={() => setImgError(true)}
                />
                <button
                  onClick={() => setShowTrailer(true)}
                  className="synopsis-play-overlay"
                  title="Play Trailer"
                >
                  <div className="play-circle">
                    <Play style={{ width: 16, height: 16, marginLeft: 2 }} fill="#ffffff" />
                  </div>
                </button>
              </div>

              <div className="synopsis-text-col">
                <p className="synopsis-text">
                  {movie.plot}
                </p>
                <button
                  onClick={() => setShowTrailer(true)}
                  className="modal-trailer-btn"
                  style={{ alignSelf: 'flex-start' }}
                >
                  <Play style={{ width: 14, height: 14 }} fill="currentColor" />
                  <span>Play Official Trailer</span>
                </button>
              </div>
            </div>
          )}

          {/* 5 Minimal Specifications */}
          <div className="specs-section">
            <div className="specs-heading">
              5 Key Specifications:
            </div>

            <div className="specs-list">
              {fiveSpecs.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="spec-row">
                    <div className="spec-label-col">
                      <IconComponent style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
                      <span>{item.label}</span>
                    </div>
                    <span className="spec-val-col">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plot overview under specs if trailer is shown */}
          {showTrailer && (
            <div className="plot-overview-box">
              <span className="plot-title">
                Plot Overview:
              </span>
              <p className="plot-desc">
                {movie.plot}
              </p>
            </div>
          )}

          {/* Footer Actions (Single arrow icon) */}
          <div className="modal-bottom-actions">
            <button
              onClick={onClose}
              className="modal-back-btn"
            >
              <ArrowLeft style={{ width: 14, height: 14 }} />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (!inWishlist) addToWishlist(movie);
                onClose();
                onRedirectToWishlist();
              }}
              className="modal-go-wishlist-btn"
            >
              <span>Go to Wishlist</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
