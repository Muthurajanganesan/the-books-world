import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { validatePhoneNumber } from '../utils/validation';
import './UserDetails.css';

function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    alternateMobileNumber: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.secondName.trim()) {
      newErrors.secondName = 'Second name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validatePhoneNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    if (!formData.alternateMobileNumber) {
      newErrors.alternateMobileNumber = 'Alternate mobile number is required';
    } else if (!validatePhoneNumber(formData.alternateMobileNumber)) {
      newErrors.alternateMobileNumber = 'Alternate mobile number must be 10 digits';
    }
    if (formData.mobileNumber === formData.alternateMobileNumber) {
      newErrors.alternateMobileNumber = 'Alternate mobile number must be different from mobile number';
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
      await authAPI.updateDetails(userId, formData);
      // Store user info and redirect to login
      navigate('/login');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to update details. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <h1 className="details-title">Complete Your Profile</h1>
        <p className="details-subtitle">Please provide your complete information</p>

        {errors.submit && <div className="alert alert-error">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group form-col">
              <label className="form-label">
                First Name <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className={`form-control ${errors.firstName ? 'error' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              {errors.firstName && <div className="form-error">{errors.firstName}</div>}
            </div>

            <div className="form-group form-col">
              <label className="form-label">
                Second Name <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                name="secondName"
                className={`form-control ${errors.secondName ? 'error' : ''}`}
                value={formData.secondName}
                onChange={handleChange}
                placeholder="Enter second name"
              />
              {errors.secondName && <div className="form-error">{errors.secondName}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Last Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              className={`form-control ${errors.lastName ? 'error' : ''}`}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
            {errors.lastName && <div className="form-error">{errors.lastName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Address <span className="mandatory">*</span>
            </label>
            <textarea
              name="address"
              className={`form-control ${errors.address ? 'error' : ''}`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows="3"
            />
            {errors.address && <div className="form-error">{errors.address}</div>}
          </div>

          <div className="form-row">
            <div className="form-group form-col">
              <label className="form-label">
                City
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>

            <div className="form-group form-col">
              <label className="form-label">
                State
              </label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div className="form-group form-col">
              <label className="form-label">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                className="form-control"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group form-col">
              <label className="form-label">
                Mobile Number <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                name="mobileNumber"
                className={`form-control ${errors.mobileNumber ? 'error' : ''}`}
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="10 digit number"
                maxLength="10"
              />
              {errors.mobileNumber && <div className="form-error">{errors.mobileNumber}</div>}
            </div>

            <div className="form-group form-col">
              <label className="form-label">
                Alternate Mobile <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                name="alternateMobileNumber"
                className={`form-control ${errors.alternateMobileNumber ? 'error' : ''}`}
                value={formData.alternateMobileNumber}
                onChange={handleChange}
                placeholder="10 digit number"
                maxLength="10"
              />
              {errors.alternateMobileNumber && (
                <div className="form-error">{errors.alternateMobileNumber}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary details-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Continue to Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
