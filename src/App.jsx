import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import WishlistView from './components/WishlistView';
import MovieDetailModal from './components/MovieDetailModal';
import LoginModal from './components/LoginModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'wishlist'
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetailModal = () => {
    setSelectedMovie(null);
  };

  const handleRedirectToWishlist = () => {
    setSelectedMovie(null);
    setActiveTab('wishlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main View Body */}
      <main className="main-content">
        {activeTab === 'search' ? (
          <SearchSection 
            onSelectMovie={handleSelectMovie} 
          />
        ) : (
          <WishlistView 
            onSelectMovie={handleSelectMovie}
            onBackToSearch={() => setActiveTab('search')}
          />
        )}
      </main>

      {/* 5 Essential Details Pop-Up Modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={handleCloseDetailModal}
          onRedirectToWishlist={handleRedirectToWishlist}
        />
      )}

      {/* Login / Authentication Modal */}
      <LoginModal />

      {/* Clean Minimal Footer */}
      <footer className="app-footer">
        <div className="container footer-inner">
          <p>MovieSearch Web Application</p>
          <div className="footer-features-list">
            <span>5 Essential Specifications</span>
            <span>•</span>
            <span>Light & Dark Theme</span>
            <span>•</span>
            <span>Wishlist Management</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <MainApp />
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
