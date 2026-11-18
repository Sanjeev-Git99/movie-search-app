import React from 'react';
import { Heart, ArrowLeft, Trash2, Film, Sparkles, ExternalLink, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import MovieCard from './MovieCard';

export default function WishlistView({ onSelectMovie, onBackToSearch, lang = 'te' }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const isTelugu = lang === 'te';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToSearch}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shadow-sm"
            title={isTelugu ? 'సెర్చ్ పేజీకి తిరిగి వెళ్లండి' : 'Return to Search'}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isTelugu ? 'నా విష్‌లిస్ట్ సినిమాలు' : 'My Movie Wishlist'}
              </h1>
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                {wishlist.length} {isTelugu ? 'సినిమాలు' : 'Titles'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isTelugu 
                ? (user ? `${user.name} గారి వ్యక్తిగత సినిమా సేకరణ` : 'మీరు ఎంచుకున్న ప్రత్యేక సినిమా కలెక్షన్')
                : 'Your curated personal collection of movies to watch next'}
            </p>
          </div>
        </div>

        {/* Back to Search Button */}
        <button
          onClick={onBackToSearch}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/25 transition-all self-start sm:self-auto"
        >
          <Film className="w-4 h-4" />
          <span>{isTelugu ? 'సినిమాలు అన్వేషించండి (Search)' : 'Explore More Movies'}</span>
        </button>
      </div>

      {/* Wishlist Grid or Empty State */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20 px-4 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 max-w-2xl mx-auto my-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl shadow-inner">
            🎬
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {isTelugu ? 'మీ విష్‌లిస్ట్ ప్రస్తుతం ఖాళీగా ఉంది' : 'Your Wishlist is Empty'}
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            {isTelugu
              ? 'సినిమాలను వెతికి, వాటి 30 వివరాలను చూసినప్పుడు "Wishlist లో జోడించు" బటన్ నొక్కి ఇక్కడ భద్రపరచండి.'
              : 'Browse movies, discover their 30 detailed specifications, and click "Add to Wishlist" to save them here.'}
          </p>
          <button
            onClick={onBackToSearch}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isTelugu ? 'ఇప్పుడే సినిమాను సెర్చ్ చేయండి' : 'Start Searching Now'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {wishlist.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <MovieCard
                movie={movie}
                onSelect={onSelectMovie}
                lang={lang}
              />
              {/* Extra delete overlay button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(movie.imdbID);
                }}
                className="absolute bottom-2 left-2 p-2 rounded-xl bg-slate-950/80 hover:bg-rose-900/80 text-slate-400 hover:text-rose-200 border border-slate-800 text-xs flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 z-10"
                title={isTelugu ? 'విష్‌లిస్ట్ నుండి తీసివేయండి' : 'Remove from Wishlist'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'తీసివేయి' : 'Remove'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
