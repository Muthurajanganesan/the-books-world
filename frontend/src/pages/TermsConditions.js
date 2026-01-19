import React from 'react';
import './Pages.css';

function TermsConditions() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Terms & Conditions</h1>
      </div>
      <div className="page-content terms-content">
        <div className="terms-section">
          <h2>Website Terms and Conditions</h2>
          <p>Last Updated: January 2024</p>
        </div>

        <div className="terms-section">
          <h3>1. Agreement to Terms</h3>
          <p>
            By accessing and using The Books World website, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do not use 
            this service.
          </p>
        </div>

        <div className="terms-section">
          <h3>2. Use License</h3>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) 
            on The Books World website for personal, non-commercial transitory viewing only. This is the grant 
            of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </div>

        <div className="terms-section">
          <h3>3. Disclaimer</h3>
          <p>
            The materials on The Books World website are provided on an 'as is' basis. The Books World makes 
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
            without limitation, implied warranties or conditions of merchantability, fitness for a particular 
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </div>

        <div className="terms-section">
          <h3>4. Limitations</h3>
          <p>
            In no event shall The Books World or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
            use or inability to use the materials on The Books World website.
          </p>
        </div>

        <div className="terms-section">
          <h3>5. Accuracy of Materials</h3>
          <p>
            The materials appearing on The Books World website could include technical, typographical, or 
            photographic errors. The Books World does not warrant that any of the materials on the website are 
            accurate, complete, or current.
          </p>
        </div>

        <div className="terms-section">
          <h3>6. Product Information</h3>
          <p>
            All product descriptions, images, prices, and availability information on The Books World website 
            are subject to change without notice. We strive to provide accurate and up-to-date information, 
            but we are not responsible for any errors or omissions.
          </p>
        </div>

        <div className="terms-section">
          <h3>7. Payment & Transactions</h3>
          <p>
            All purchases made on The Books World are subject to the acceptance and completion of the order. 
            We reserve the right to refuse or cancel any order.
          </p>
        </div>

        <div className="terms-section">
          <h3>8. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>

        <div className="terms-section">
          <h3>9. Contact Us</h3>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at 
            support@thebooksworld.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
