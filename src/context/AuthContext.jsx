import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_app_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('movie_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('movie_app_user');
    }
  }, [user]);

  const login = (name, email) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name || 'Movie Fan',
      email: email || 'user@cinevault.io',
      avatar: '🎬',
      joinedAt: new Date().toLocaleDateString('te-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
    return newUser;
  };

  const guestLogin = () => {
    const guestUser = {
      id: 'guest_cinephile',
      name: 'సినిమా ప్రేమికుడు (Movie Lover)',
      email: 'moviebuff@cinevault.in',
      avatar: '🍿',
      joinedAt: new Date().toLocaleDateString('te-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    setUser(guestUser);
    setIsLoginModalOpen(false);
    return guestUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        guestLogin,
        logout,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
