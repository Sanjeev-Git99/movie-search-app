import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Key, Check, AlertCircle, RefreshCw, Film } from 'lucide-react';
import { searchMovies } from '../services/movieApi';
import { POPULAR_MOVIES } from '../services/mockMovies';
import MovieCard from './MovieCard';
import { useAuth } from '../context/AuthContext';

export default function SearchSection({ onSelectMovie, lang = 'te' }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(POPULAR_MOVIES);
  const [isLoading, setIsLoading] = useState(false);
  const [customKeyOpen, setCustomKeyOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('omdb_api_key') || '');
  const [keySaved, setKeySaved] = useState(false);
  const { isLoggedIn, openLoginModal } = useAuth();

  const isTelugu = lang === 'te';

  // Quick search keywords
  const popularTags = [
    { name: 'RRR', te: 'RRR' },
    { name: 'Inception', te: 'ఇన్సెప్షన్' },
    { name: 'Kalki 2898 AD', te: 'కల్కి 2898 AD' },
    { name: 'Avatar', te: 'అవతార్' },
    { name: 'Baahubali', te: 'బాహుబలి' },
    { name: 'Pushpa', te: 'పుష్ప' },
    { name: 'The Dark Knight', te: 'డార్క్ నైట్' },
    { name: 'Oppenheimer', te: 'ఓపెన్‌హైమర్' },
    { name: 'Interstellar', te: 'ఇంటర్‌స్టెల్లార్' },
    { name: 'Avengers', te: 'ఎవెంజర్స్' }
  ];

  const handleSearch = async (searchTerm) => {
    const term = searchTerm !== undefined ? searchTerm : query;
    setIsLoading(true);
    try {
      const results = await searchMovies(term);
      setMovies(results);
    } catch (err) {
      console.error('Search error:', err);
      setMovies(POPULAR_MOVIES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleTagClick = (tag) => {
    setQuery(tag.name);
    handleSearch(tag.name);
  };

  const saveCustomApiKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem('omdb_api_key', apiKeyInput.trim());
    } else {
      localStorage.removeItem('omdb_api_key');
    }
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setCustomKeyOpen(false);
      handleSearch();
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Hero Welcome & Search Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 mb-8 shadow-2xl">
        <div className="max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'ఉచిత సినిమా సెర్చ్ API తో అనుసంధానించబడింది' : 'Connected to Free Public Movie API'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isTelugu ? 'మీకు నచ్చిన సినిమాను వెతకండి' : 'Discover Any Movie in Seconds'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            {isTelugu 
              ? 'సినిమాను సెర్చ్ చేసి క్లిక్ చేయండి. 30 పూర్తి వివరాలతో కూడిన కార్డు ఓపెన్ అవుతుంది. అక్కడ నుంచే నేరుగా మీ విష్‌లిస్ట్‌కు జోడించుకోవచ్చు!' 
              : 'Search any movie to view 30 thorough specifications, with 1-click add and instant redirect to your personal Wishlist.'}
          </p>

          {/* Search Input Bar */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isTelugu ? 'సినిమా పేరు టైప్ చేయండి... (ఉదా: RRR, Inception, Kalki)' : 'Search by movie title, actor, director...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-950/90 border border-slate-700/80 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-white placeholder-slate-500 text-sm sm:text-base shadow-inner"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setMovies(POPULAR_MOVIES);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition-all shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isTelugu ? 'శోధిస్తోంది...' : 'Searching...'}</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{isTelugu ? 'సెర్చ్ చేయండి' : 'Search Movie'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Filter Tag Chips */}
          <div className="mt-5 flex items-center flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">
              {isTelugu ? 'ప్రజాదరణ పొందినవి:' : 'Trending:'}
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 rounded-xl bg-slate-950/60 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                {isTelugu ? tag.te : tag.name}
              </button>
            ))}
          </div>

          {/* API Custom Key Option */}
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{isTelugu ? 'ఉచిత API సిద్ధంగా ఉంది' : 'Free Open API Active'}</span>
            </div>

            <button
              onClick={() => setCustomKeyOpen(!customKeyOpen)}
              className="text-slate-400 hover:text-rose-300 flex items-center gap-1 hover:underline"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'కస్టమ్ OMDB API కీ సెట్టింగ్స్' : 'Custom API Key Settings'}</span>
            </button>
          </div>

          {customKeyOpen && (
            <div className="mt-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 animate-fadeIn">
              <form onSubmit={saveCustomApiKey} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter your OMDB API Key (optional)"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1"
                >
                  {keySaved ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{keySaved ? (isTelugu ? 'భద్రపరచబడింది!' : 'Saved!') : (isTelugu ? 'సేవ్ చేయండి' : 'Save Key')}</span>
                </button>
              </form>
              <p className="text-[11px] text-slate-500 mt-2">
                {isTelugu 
                  ? 'డిఫాల్ట్‌గా ఉచిత API ఇప్పటికే యాక్టివ్‌గా ఉంది. మీకు కావాలంటే మీ వ్యక్తిగత omdbapi.com కీ కూడా ఇవ్వొచ్చు.' 
                  : 'By default, the free API works automatically. You can optionally specify your own key from omdbapi.com.'}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Movies Grid Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-rose-500" />
            <span>
              {query 
                ? (isTelugu ? `"${query}" కోసం ఫలితాలు` : `Results for "${query}"`) 
                : (isTelugu ? 'ప్రముఖ సినిమాలు (Popular Movies)' : 'Featured & Trending Movies')}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isTelugu 
              ? 'సినిమా కార్డుపై క్లిక్ చేసి 30 పూర్తి వివరాలు మరియు విష్‌లిస్ట్ ఆప్షన్‌ను చూడండి' 
              : 'Click any card to open the pop-up modal with 30 details & Wishlist management'}
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          {movies.length} {isTelugu ? 'సినిమాలు' : 'Movies'}
        </span>
      </div>

      {/* Movie Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <div key={n} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 animate-pulse">
              <div className="aspect-[2/3] bg-slate-800"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <Film className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            {isTelugu ? 'సినిమాలు కనుగొనబడలేదు' : 'No Movies Found'}
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
            {isTelugu 
              ? 'మరొక సినిమా పేరుతో శోధించి చూడండి.' 
              : 'Try searching with a different movie title or keyword.'}
          </p>
          <button
            onClick={() => {
              setQuery('');
              setMovies(POPULAR_MOVIES);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
          >
            {isTelugu ? 'ప్రముఖ సినిమాలను చూపించు' : 'Show Trending Movies'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={onSelectMovie}
              lang={lang}
            />
          ))}
        </div>
      )}

    </div>
  );
}
