import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI, paymentAPI } from '../utils/api';
import { formatCurrency, getUserIdFromStorage } from '../utils/validation';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const userId = getUserIdFromStorage();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await cartAPI.getCartItems(userId);
      setCartItems(response.data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to local storage if API fails
      const cachedCart = localStorage.getItem(`cart_${userId}`);
      if (cachedCart) {
        setCartItems(JSON.parse(cachedCart));
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Persist cart to local storage whenever it changes
  useEffect(() => {
    if (userId && cartItems.length > 0) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId, fetchCartItems]);

  const handleRemoveItem = async (cartId) => {
    try {
      await cartAPI.removeFromCart(cartId);
      fetchCartItems();
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        await cartAPI.clearCart(userId);
        fetchCartItems();
      } catch (error) {
        alert('Failed to clear cart');
      }
    }
  };

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setProcessing(true);
    try {
      // Create order
      const orderResponse = await orderAPI.createOrder(userId);
      const orderId = orderResponse.data.orderId;
      const amount = orderResponse.data.amount;

      // Redirect to payment gateway (Stripe)
      const sessionResponse = await paymentAPI.createCheckoutSession(orderId, amount, userId);

      if (sessionResponse.data && sessionResponse.data.url) {
        window.location.href = sessionResponse.data.url;
      } else {
        alert('Failed to initiate payment');
      }

      // Note: Cart clearing will happen after successful payment on the success page
      // or we can keep it here if we want to clear it assuming they go to pay. 
      // Better to clear it on success, but for now let's leave it till success page handles it.
      // Actually, standard practice: keep cart until paid. 
      // So I will REMOVE the clearCart call here.
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to process order');
    } finally {
      setProcessing(false);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  if (loading) {
    return <div className="cart-container"><p>Loading cart...</p></div>;
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.bookTitle}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.totalPrice)}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="summary-item">
              <span>Tax:</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>

            {showPayment ? (
              <button
                className="btn btn-primary proceed-btn"
                onClick={handleProceedToPayment}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Proceed to Pay'}
              </button>
            ) : (
              <button
                className="btn btn-primary proceed-btn"
                onClick={() => setShowPayment(true)}
                disabled={processing}
              >
                Finish Cart
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
