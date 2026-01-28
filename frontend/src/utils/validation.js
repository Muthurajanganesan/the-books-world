// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const getPasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@#$%^&+=]/.test(password)) strength++;

  switch (strength) {
    case 0:
    case 1:
      return { level: 'Weak', color: '#dc2626' };
    case 2:
    case 3:
      return { level: 'Medium', color: '#f59e0b' };
    case 4:
    case 5:
      return { level: 'Strong', color: '#16a34a' };
    default:
      return { level: 'Unknown', color: '#6b7280' };
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const isAuthenticated = () => {
  const localToken = localStorage.getItem('authToken');
  const sessionToken = sessionStorage.getItem('authToken');
  const isAuth = !!(localToken || sessionToken);
  
  console.log('isAuthenticated check:', {
    localStorage: !!localToken,
    sessionStorage: !!sessionToken,
    result: isAuth,
  });
  
  return isAuth;
};

export const getUserIdFromStorage = () => {
  const localId = localStorage.getItem('userId');
  const sessionId = sessionStorage.getItem('userId');
  const userId = localId || sessionId;
  
  console.log('getUserIdFromStorage:', {
    localStorage: localId,
    sessionStorage: sessionId,
    result: userId,
  });
  
  return userId;
};

export const getAuthToken = () => {
  const localToken = localStorage.getItem('authToken');
  const sessionToken = sessionStorage.getItem('authToken');
  const token = localToken || sessionToken;
  
  console.log('getAuthToken:', {
    localStorage: !!localToken,
    sessionStorage: !!sessionToken,
    result: !!token,
  });
  
  return token;
};

export const saveAuthData = (token, userId, email, rememberMe) => {
  // Always save to session storage (temporary session data)
  sessionStorage.setItem('authToken', token);
  sessionStorage.setItem('userId', userId);
  sessionStorage.setItem('userEmail', email);
  
  console.log('SessionStorage saved:', {
    authToken: sessionStorage.getItem('authToken'),
    userId: sessionStorage.getItem('userId'),
    userEmail: sessionStorage.getItem('userEmail'),
  });
  
  // Also save to local storage if Remember Me is checked (persistent data)
  if (rememberMe) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', email);
    console.log('LocalStorage also saved (Remember Me checked)');
  } else {
    // Clear local storage if Remember Me is unchecked
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('userEmail');
};

