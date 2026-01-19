import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData } from '../utils/validation';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 The Books World
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/categories"
              className={`nav-link ${activeSection === 'categories' ? 'active' : ''}`}
              onClick={() => handleNavClick('categories')}
            >
              Product Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/bulk-purchase"
              className={`nav-link ${activeSection === 'bulk' ? 'active' : ''}`}
              onClick={() => handleNavClick('bulk')}
            >
              Bulk Purchase
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/return-replacement"
              className={`nav-link ${activeSection === 'return' ? 'active' : ''}`}
              onClick={() => handleNavClick('return')}
            >
              Return & Replacement
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/terms-conditions"
              className={`nav-link ${activeSection === 'terms' ? 'active' : ''}`}
              onClick={() => handleNavClick('terms')}
            >
              Terms & Conditions
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cart"
              className="nav-link cart-link"
            >
              🛒 Cart
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="nav-link logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
