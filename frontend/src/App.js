import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import SignUp from './pages/SignUp';
import UserDetails from './pages/UserDetails';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import BookDetails from './pages/BookDetails';
import { isAuthenticated } from './utils/validation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    // Set initial auth state
    setIsLoggedIn(isAuthenticated());

    // Listen for storage changes (login/logout)
    const handleStorageChange = () => {
      console.log('Storage changed, updating auth state');
      setIsLoggedIn(isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-details/:userId" element={<UserDetails />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/*"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
