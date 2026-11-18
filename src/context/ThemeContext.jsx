import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_app_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'light'; // Default to light so user can immediately experience the light theme or switch to dark
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      body.className = 'min-h-screen antialiased bg-zinc-950 text-zinc-100 transition-colors duration-200';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      body.className = 'min-h-screen antialiased bg-white text-zinc-900 transition-colors duration-200';
    }

    try {
      localStorage.setItem('movie_app_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
