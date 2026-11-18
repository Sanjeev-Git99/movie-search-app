import React, { createContext, useContext, useState, useEffect } from 'react';
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
