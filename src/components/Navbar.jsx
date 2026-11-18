import React from 'react';
import { Film, Heart, Search, LogIn, LogOut, Globe, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const { totalItems } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  const isTelugu = lang === 'te';

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <span className="font-bold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
            MovieSearch
          </span>
        </div>

        {/* Center Navigation Tabs */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'search'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'సినిమాలు' : 'Search'}</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'wishlist'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${totalItems > 0 ? 'text-red-500 fill-red-500' : ''}`} />
            <span>{isTelugu ? 'విష్‌లిస్ట్' : 'Wishlist'}</span>
            {totalItems > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-300 text-[10px] font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Right Actions: Theme Toggle, Language Toggle, User Auth */}
        <div className="flex items-center gap-2">
          
          {/* Light / Dark Mode Toggle with clear visual state */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 shadow-xs"
            title={isDark ? (isTelugu ? 'లైట్ మోడ్ కి మారండి' : 'Switch to Light Mode') : (isTelugu ? 'డార్క్ మోడ్ కి మారండి' : 'Switch to Dark Mode')}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">{isTelugu ? 'లైట్' : 'Light'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-zinc-700" />
                <span className="text-[11px]">{isTelugu ? 'డార్క్' : 'Dark'}</span>
              </>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => (l === 'te' ? 'en' : 'te'))}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 transition-colors"
            title="భాష మార్చండి"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>{lang === 'te' ? 'తెలుగు' : 'EN'}</span>
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <span className="text-xs text-zinc-700 dark:text-zinc-300 hidden sm:inline font-medium">
                {user.name}
              </span>
              <button
                onClick={logout}
                title={isTelugu ? 'లాగౌట్' : 'Logout'}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs transition-colors shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'లాగిన్' : 'Log In'}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
