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
  return !!localStorage.getItem('authToken');
};

export const getUserIdFromStorage = () => {
  return localStorage.getItem('userId');
};

export const saveAuthData = (token, userId, email) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userEmail', email);
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
};
