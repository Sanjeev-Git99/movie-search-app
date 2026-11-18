import React from 'react';
import { Film, Heart, Search, User, LogIn, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const { totalItems } = useWishlist();

  const isTelugu = lang === 'te';

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Minimal & Clean */}
        <div 
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
            <Film className="w-4 h-4 text-zinc-200" />
          </div>
          <span className="font-semibold text-base text-zinc-100 tracking-tight">
            MovieSearch
          </span>
        </div>

        {/* Center Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'సినిమాలు' : 'Search'}</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'wishlist'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${totalItems > 0 ? 'text-red-400 fill-red-400' : ''}`} />
            <span>{isTelugu ? 'విష్‌లిస్ట్' : 'Wishlist'}</span>
            {totalItems > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-zinc-700 text-zinc-200 text-[10px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => (l === 'te' ? 'en' : 'te'))}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
            title="భాష మార్చండి"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>{lang === 'te' ? 'తెలుగు' : 'EN'}</span>
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <span className="text-xs text-zinc-300 hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={logout}
                title={isTelugu ? 'లాగౌట్' : 'Logout'}
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-900 font-medium text-xs transition-colors"
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
