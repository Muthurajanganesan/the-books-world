import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/validation';

function PrivateRoute({ isLoggedIn, children }) {
  if (!isAuthenticated() && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
