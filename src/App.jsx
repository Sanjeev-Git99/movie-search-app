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
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main View Body */}
      <main className="flex-1 bg-white dark:bg-zinc-950 transition-colors duration-200">
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

      {/* Five Essential Details Pop-Up Modal */}
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
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-6 text-center text-xs text-zinc-500 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            MovieSearch Web Application
          </p>
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-[11px]">
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
