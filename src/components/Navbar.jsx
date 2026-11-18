import React from 'react';
import { Film, Heart, Search, User, LogIn, LogOut, Sparkles, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const { totalItems } = useWishlist();

  const isTelugu = lang === 'te';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-600/25 group-hover:shadow-rose-600/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Film className="w-6 h-6 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-400 bg-clip-text text-transparent">
                CineVault
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {isTelugu ? 'మూవీస్ సెర్చ్ అప్లికేషన్' : 'Movies Search & Wishlist'}
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'search'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{isTelugu ? 'సినిమాలు' : 'Explore'}</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'wishlist'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${totalItems > 0 ? 'text-rose-400 fill-rose-400' : ''}`} />
            <span>{isTelugu ? 'విష్‌లిస్ట్' : 'Wishlist'}</span>
            {totalItems > 0 && (
              <span className="ml-1 px-2 py-0.2 text-[11px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action Items: Language Toggle & User Profile/Login */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(l => (l === 'te' ? 'en' : 'te'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            title="భాష మార్చుకోండి / Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'te' ? 'తెలుగు' : 'English'}</span>
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-200 leading-tight">
                  {user.name}
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 justify-end font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isTelugu ? 'లాగిన్ అయ్యారు' : 'Logged In'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-lg font-bold shadow-md shadow-rose-950">
                {user.avatar || '🎬'}
              </div>
              <button
                onClick={logout}
                title={isTelugu ? 'లాగౌట్ చేయండి' : 'Log out'}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-600/25 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>{isTelugu ? 'లాగిన్ అవ్వండి' : 'Log In'}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
