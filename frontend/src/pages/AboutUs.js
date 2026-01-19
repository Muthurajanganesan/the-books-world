import React from 'react';
import './Pages.css';

function AboutUs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About Us</h1>
      </div>
      <div className="page-content about-content">
        <div className="about-section">
          <h2>Welcome to The Books World</h2>
          <p>
            The Books World is your ultimate online destination for books across all genres and categories.
            We are committed to providing the best selection of books at competitive prices.
          </p>
        </div>

        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            To make quality books accessible to everyone, everywhere, and to foster a love of reading
            in communities across the globe.
          </p>
        </div>

        <div className="about-section">
          <h3>Owner Details</h3>
          <div className="owner-details">
            <p><strong>Name:</strong> Your Name</p>
            <p><strong>Email:</strong> owner@thebooksworld.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Founded:</strong> 2024</p>
            <p><strong>Location:</strong> India</p>
          </div>
        </div>

        <div className="about-section">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>✓ Wide variety of books across all genres</li>
            <li>✓ Competitive pricing and regular sales</li>
            <li>✓ Fast and reliable delivery</li>
            <li>✓ Excellent customer service</li>
            <li>✓ Secure payment options</li>
            <li>✓ Easy returns and replacements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
