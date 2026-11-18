import React, { useState } from 'react';
import { X, LogIn, Sparkles, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ lang = 'te' }) {
  const { isLoginModalOpen, closeLoginModal, login, guestLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  if (!isLoginModalOpen) return null;

  const isTelugu = lang === 'te';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      login('సినిమా ప్రేమికుడు', email || 'user@cinevault.in');
    } else {
      login(name.trim(), email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@cinevault.in`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>

        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-rose-950">
            🎬
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isTelugu ? 'CineVault కి స్వాగతం' : 'Welcome to CineVault'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isTelugu 
              ? 'సినిమాలు సెర్చ్ చేసి, 30 పూర్తి వివరాలు చూడటానికి లాగిన్ అవ్వండి' 
              : 'Sign in to explore movies and discover 30 in-depth specifications'}
          </p>
        </div>

        {/* One Click Instant Demo Login */}
        <button
          type="button"
          onClick={() => guestLogin()}
          className="w-full mb-5 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400 hover:bg-amber-500/30 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>{isTelugu ? '⚡ తక్షణ డెమో లాగిన్ (1-Click Instant Login)' : '⚡ 1-Click Instant Demo Login'}</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-800 w-full"></div>
          <span className="bg-slate-900 px-3 text-xs text-slate-500 font-medium">
            {isTelugu ? 'లేదా మీ వివరాలతో' : 'OR WITH CREDENTIALS'}
          </span>
          <div className="border-t border-slate-800 w-full"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isTelugu ? 'మీ పేరు / User Name' : 'Your Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder={isTelugu ? 'ఉదా: సంజీవ / Sanjeeva' : 'e.g. Alex Hunter'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm text-white placeholder-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isTelugu ? 'ఈమెయిల్ / Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="name@cinevault.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm text-white placeholder-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isTelugu ? 'పాస్‌వర్డ్ / Password' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm text-white placeholder-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>{isTelugu ? 'లాగిన్ పూర్తి చేయండి' : 'Sign In Now'}</span>
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-500 mt-4">
          {isTelugu 
            ? 'విష్‌లిస్ట్ డేటా మీ బ్రౌజర్‌లో సురక్షితంగా భద్రపరచబడుతుంది.' 
            : 'Your wishlist & preference data are securely stored locally.'}
        </p>
      </div>
    </div>
  );
}
