import React from 'react';
import './Pages.css';

function ContactUs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>
      <div className="page-content contact-content">
        <div className="contact-section">
          <h2>Get In Touch</h2>
          <p>We'd love to hear from you. Contact us using any of the information below.</p>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
            <small>Available: Monday to Friday, 9 AM - 6 PM IST</small>
          </div>

          <div className="info-item">
            <h3>📧 Email</h3>
            <p>support@thebooksworld.com</p>
            <small>Response time: Within 24 hours</small>
          </div>

          <div className="info-item">
            <h3>🏢 Office Address</h3>
            <p>The Books World</p>
            <p>123 Book Street, India</p>
          </div>
        </div>

        <div className="contact-section">
          <h3>Message Us</h3>
          <p>For customer service inquiries, please call us at the number above or send us an email.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
