import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { validateEmail, validatePassword, getPasswordStrength } from '../utils/validation';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(getPasswordStrength(pwd));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@#$%^&+=)';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.signUp(email, password);
      const userId = response.data.userId;
      
      // Store temp data
      localStorage.setItem('tempUserId', userId);
      localStorage.setItem('tempEmail', email);
      
      // Redirect to user details page
      navigate(`/signup-details/${userId}`);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Sign up failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Welcome to The Books World</h1>
        <p className="signup-subtitle">Create your account</p>

        {errors.submit && <div className="alert alert-error">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Email <span className="mandatory">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Password <span className="mandatory">*</span>
            </label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'error' : ''}`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordStrength && (
              <div className="password-strength">
                <span style={{ color: passwordStrength.color }}>
                  Strength: {passwordStrength.level}
                </span>
              </div>
            )}
            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li>✓ At least 8 characters</li>
                <li>✓ 1 uppercase letter (A-Z)</li>
                <li>✓ 1 lowercase letter (a-z)</li>
                <li>✓ 1 number (0-9)</li>
                <li>✓ 1 special character (@#$%^&+=)</li>
              </ul>
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Confirm Password <span className="mandatory">*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="form-error">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary signup-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
