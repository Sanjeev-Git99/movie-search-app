import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ lang = 'te' }) {
  const { isLoginModalOpen, closeLoginModal, login, guestLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-zinc-900 dark:text-zinc-100 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {isTelugu ? 'లాగిన్ అవ్వండి' : 'Sign In'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isTelugu ? 'సినిమా వివరాలు మరియు విష్‌లిస్ట్ కోసం లాగిన్ అవ్వండి.' : 'Access movie specifications & wishlist.'}
          </p>
        </div>

        {/* Quick Demo Login */}
        <button
          type="button"
          onClick={() => guestLogin()}
          className="w-full mb-4 py-2 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium border border-zinc-200 dark:border-zinc-700 transition-colors"
        >
          {isTelugu ? '⚡ తక్షణ డెమో లాగిన్ (1-Click Login)' : '⚡ 1-Click Instant Demo Login'}
        </button>

        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full"></div>
          <span className="bg-white dark:bg-zinc-900 px-2 text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
            {isTelugu ? 'లేదా వివరాలతో' : 'OR'}
          </span>
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {isTelugu ? 'పేరు' : 'Name'}
            </label>
            <input
              type="text"
              placeholder={isTelugu ? 'మీ పేరు' : 'Your name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {isTelugu ? 'ఈమెయిల్ (ఆప్షనల్)' : 'Email (Optional)'}
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 px-3 rounded-md bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-medium text-xs transition-colors"
          >
            {isTelugu ? 'లాగిన్ పూర్తి చేయండి' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
