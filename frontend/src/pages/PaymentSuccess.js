import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentAPI, cartAPI } from '../utils/api';
import { getUserIdFromStorage } from '../utils/validation';
import './Pages.css';

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Verifying payment...');

    useEffect(() => {
        const confirmPayment = async () => {
            const sessionId = searchParams.get('session_id');
            const orderId = searchParams.get('order_id');
            const amount = searchParams.get('amount');
            const userId = getUserIdFromStorage();

            if (!sessionId || !orderId) {
                setStatus('error');
                setMessage('Invalid payment details received.');
                return;
            }

            try {
                await paymentAPI.confirmPayment(userId, orderId, sessionId, amount || 0);
                await cartAPI.clearCart(userId);

                setStatus('success');
                setMessage('Payment successful! Your order has been placed.');
            } catch (error) {
                console.error("Payment confirmation failed", error);
                setStatus('error');
                setMessage('Payment verification failed. Please contact support.');
            }
        };

        if (searchParams.get('session_id')) {
            confirmPayment();
        }
    }, [searchParams]);

    return (
        <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
            <h1>{status === 'success' ? 'Thank You!' : 'Payment Status'}</h1>
            <p>{message}</p>
            {status === 'success' && (
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            )}
            {status === 'error' && (
                <button className="btn btn-secondary" onClick={() => navigate('/cart')}>
                    Back to Cart
                </button>
            )}
        </div>
    );
}

export default PaymentSuccess;
