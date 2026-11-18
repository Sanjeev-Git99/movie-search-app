import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const storageKey = user ? `movie_app_wishlist_${user.id}` : 'movie_app_wishlist_guest';

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Re-load when user changes
  useEffect(() => {
    try {
      const key = user ? `movie_app_wishlist_${user.id}` : 'movie_app_wishlist_guest';
      const saved = localStorage.getItem(key);
      setWishlist(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlist([]);
    }
  }, [user?.id]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist, storageKey]);

  const isInWishlist = (imdbID) => {
    return wishlist.some(item => item.imdbID === imdbID);
  };

  const addToWishlist = (movie) => {
    if (!isInWishlist(movie.imdbID)) {
      setWishlist(prev => [movie, ...prev]);
      
      // Joyful confetti explosion!
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#fbbf24', '#ffffff']
        });
      } catch (err) {
        // ignore if confetti unavailable
      }
      return true;
    }
    return false;
  };

  const removeFromWishlist = (imdbID) => {
    setWishlist(prev => prev.filter(item => item.imdbID !== imdbID));
  };

  const toggleWishlist = (movie) => {
    if (isInWishlist(movie.imdbID)) {
      removeFromWishlist(movie.imdbID);
      return false;
    } else {
      addToWishlist(movie);
      return true;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        totalItems: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
