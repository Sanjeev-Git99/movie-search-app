import React from 'react';
import { Film, Heart, Search, LogIn, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const { totalItems } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('search')}
          className="brand-logo"
        >
          <div className="brand-icon-box">
            <Film style={{ width: 16, height: 16 }} />
          </div>
          <span className="brand-title">
            MovieSearch
          </span>
        </div>

        {/* Center Navigation Tabs */}
        <div className="nav-tabs">
          <button
            onClick={() => setActiveTab('search')}
            className={`nav-tab-btn ${activeTab === 'search' ? 'active' : ''}`}
          >
            <Search style={{ width: 14, height: 14 }} />
            <span>Search</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`nav-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
          >
            <Heart 
              style={{ width: 14, height: 14 }} 
              fill={totalItems > 0 ? '#dc2626' : 'none'} 
              color={totalItems > 0 ? '#dc2626' : 'currentColor'} 
            />
            <span>Wishlist</span>
            {totalItems > 0 && (
              <span className="nav-badge">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Right Actions: Theme Toggle, User Auth */}
        <div className="navbar-right">
          
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <>
                <Sun style={{ width: 14, height: 14, color: '#f59e0b' }} />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon style={{ width: 14, height: 14 }} />
                <span>Dark</span>
              </>
            )}
          </button>

          {isLoggedIn ? (
            <div className="user-auth-box">
              <span className="user-name-text">
                {user.name}
              </span>
              <button
                onClick={logout}
                title="Logout"
                className="logout-icon-btn"
              >
                <LogOut style={{ width: 16, height: 16 }} />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="btn-sign-in"
            >
              <LogIn style={{ width: 14, height: 14 }} />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
