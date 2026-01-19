import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from './Home';
import ProductCategories from './ProductCategories';
import BulkPurchase from './BulkPurchase';
import AboutUs from './AboutUs';
import ReturnReplacement from './ReturnReplacement';
import ContactUs from './ContactUs';
import TermsConditions from './TermsConditions';
import Cart from './Cart';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<ProductCategories />} />
          <Route path="/bulk-purchase" element={<BulkPurchase />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/return-replacement" element={<ReturnReplacement />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
