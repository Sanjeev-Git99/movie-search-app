import React, { useState } from 'react';
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
  const [lang, setLang] = useState('te'); // default to Telugu

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
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Main View Body */}
      <main className="flex-1">
        {activeTab === 'search' ? (
          <SearchSection 
            onSelectMovie={handleSelectMovie} 
            lang={lang} 
          />
        ) : (
          <WishlistView 
            onSelectMovie={handleSelectMovie}
            onBackToSearch={() => setActiveTab('search')}
            lang={lang}
          />
        )}
      </main>

      {/* Thirty Details Pop-Up Modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={handleCloseDetailModal}
          onRedirectToWishlist={handleRedirectToWishlist}
          lang={lang}
        />
      )}

      {/* Login / Authentication Modal */}
      <LoginModal lang={lang} />

      {/* Simple Developer Footer */}
      <footer className="border-t border-zinc-850 py-6 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            {lang === 'te' 
              ? 'MovieSearch Web Application' 
              : 'MovieSearch Web Application'}
          </p>
          <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
            <span>30 Movie Details</span>
            <span>•</span>
            <span>Free API</span>
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
    <AuthProvider>
      <WishlistProvider>
        <MainApp />
      </WishlistProvider>
    </AuthProvider>
  );
}
