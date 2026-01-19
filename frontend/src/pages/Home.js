import React, { useState, useEffect, useCallback } from 'react';
import { bookAPI, cartAPI } from '../utils/api';
import { formatCurrency, getUserIdFromStorage } from '../utils/validation';
import './Home.css';

function Home() {
  const userId = getUserIdFromStorage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [addedItems, setAddedItems] = useState(new Set());

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (selectedCategory === 'ALL') {
        response = await bookAPI.getAllBooks();
      } else if (selectedCategory === 'ON_SALE') {
        response = await bookAPI.getOnSaleBooks();
      } else {
        response = await bookAPI.getBooksByCategory(selectedCategory);
      }
      setBooks(response.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddToCart = async (book) => {
    try {
      await cartAPI.addToCart(userId, book.id, 1);
      setAddedItems(new Set([...addedItems, book.id]));
      alert(`${book.title} added to cart!`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to add item to cart';
      alert(errorMessage);
      console.error('Add to cart error:', error);
    }
  };

  const categories = [
    'ALL',
    'ON_SALE',
    'SELF-HELP',
    'ROMANCE',
    'TRADING & FINANCE',
    'TECHNOLOGY',
    'MYSTERY & THRILLER',
    'EDUCATION',
    'SCIENCE & NATURE',
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to The Books World</h1>
        <p>Discover Your Next Favorite Book</p>
      </div>

      <div className="category-filter">
        <h3>Browse by Category</h3>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'ON_SALE' ? '🔥 ON SALE' : cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.imageUrl} alt={book.title} />
                {book.onSale && <span className="sale-badge">ON SALE</span>}
              </div>
              <div className="book-details">
                <h4>{book.title}</h4>
                <p className="author">by {book.author}</p>
                <div className="price-section">
                  {book.onSale ? (
                    <>
                      <span className="original-price">
                        {formatCurrency(book.price)}
                      </span>
                      <span className="sale-price">
                        {formatCurrency(book.salePrice)}
                      </span>
                    </>
                  ) : (
                    <span className="price">{formatCurrency(book.price)}</span>
                  )}
                </div>
                <button
                  className={`btn btn-primary add-cart-btn ${
                    addedItems.has(book.id) ? 'added' : ''
                  }`}
                  onClick={() => handleAddToCart(book)}
                >
                  {addedItems.has(book.id) ? '✓ Added' : '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
