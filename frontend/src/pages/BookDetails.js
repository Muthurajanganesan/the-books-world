import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookAPI, cartAPI } from '../utils/api';
import { formatCurrency, getUserIdFromStorage } from '../utils/validation';
import './BookDetails.css';

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = getUserIdFromStorage();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await bookAPI.getBookById(id);
                setBook(response.data);
            } catch (err) {
                setError('Failed to load book details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await cartAPI.addToCart(userId, book.id, 1);
            setIsAdded(true);
            alert(`${book.title} added to cart!`);
        } catch (error) {
            // if not logged in or other error
            if (!userId) {
                navigate('/login');
                return;
            }
            const errorMessage = error.response?.data?.error || error.message || 'Failed to add item to cart';
            alert(errorMessage);
        }
    };

    const handleBuyNow = async () => {
        await handleAddToCart();
        if (userId) navigate('/cart');
    };

    if (loading) return <div className="loading">Loading details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!book) return <div className="error-message">Book not found.</div>;

    return (
        <div className="book-details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

            <div className="details-content">
                <div className="details-image">
                    <img src={book.imageUrl} alt={book.title} />
                    {book.onSale && <span className="sale-badge">ON SALE</span>}
                </div>

                <div className="details-info">
                    <h1>{book.title}</h1>
                    <h3 className="author">by {book.author}</h3>

                    <div className="price-block">
                        {book.onSale ? (
                            <>
                                <span className="original-price">{formatCurrency(book.price)}</span>
                                <span className="sale-price">{formatCurrency(book.salePrice)}</span>
                            </>
                        ) : (
                            <span className="price">{formatCurrency(book.price)}</span>
                        )}
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{book.description}</p>
                    </div>

                    <div className="additional-info">
                        <p><strong>Category:</strong> {book.category}</p>
                        <p><strong>Availability:</strong> {book.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    </div>

                    <div className="action-buttons">
                        <button
                            className={`btn btn-primary add-cart-btn ${isAdded ? 'added' : ''}`}
                            onClick={handleAddToCart}
                            disabled={book.quantity <= 0}
                        >
                            {isAdded ? '✓ Added to Cart' : '🛒 Add to Cart'}
                        </button>
                        <button
                            className="btn btn-secondary buy-now-btn"
                            onClick={handleBuyNow}
                            disabled={book.quantity <= 0}
                        >
                            ⚡ Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
