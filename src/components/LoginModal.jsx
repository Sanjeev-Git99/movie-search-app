import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login, guestLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      login('Movie Lover', email || 'user@cinevault.io');
    } else {
      login(name.trim(), email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@cinevault.io`);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeLoginModal}>
      <div 
        className="login-dialog-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="modal-close-icon-btn"
          style={{ position: 'absolute', top: 16, right: 16 }}
          title="Close"
        >
          <X style={{ width: 16, height: 16 }} />
        </button>

        {/* Header */}
        <div>
          <h2 className="login-heading">
            Sign In
          </h2>
          <p className="login-subtext">
            Sign in to access movie details and save to your wishlist.
          </p>
        </div>

        {/* Quick Demo Login */}
        <button
          type="button"
          onClick={() => guestLogin()}
          className="btn-demo-login"
        >
          ⚡ 1-Click Instant Demo Login
        </button>

        <div className="or-divider">
          <span className="or-text">OR</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-field-group">
            <label className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-text-input"
            />
          </div>

          <div className="form-field-group">
            <label className="form-label">
              Email (Optional)
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-text-input"
            />
          </div>

          <button
            type="submit"
            className="form-submit-btn"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
