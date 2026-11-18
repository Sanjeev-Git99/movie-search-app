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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            {lang === 'te' 
              ? '© 2026 CineVault - మూవీ సెర్చ్ & విష్‌లిస్ట్ వెబ్ అప్లికేషన్. ఉచిత API సేవలతో పనిచేస్తుంది.' 
              : '© 2026 CineVault - Movie Search & Wishlist Web Application with 30 in-depth specs.'}
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{lang === 'te' ? '30 పూర్తి వివరాలు' : '30 Comprehensive Details'}</span>
            <span>•</span>
            <span>{lang === 'te' ? 'ఉచిత API' : 'Free Open API'}</span>
            <span>•</span>
            <span>{lang === 'te' ? 'విష్‌లిస్ట్ రీడైరెక్ట్' : 'Wishlist Direct Access'}</span>
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
