import React, { useState } from 'react';
import { bookAPI } from '../utils/api';
import { formatCurrency, getUserIdFromStorage } from '../utils/validation';
import { cartAPI } from '../utils/api';
import './ProductCategories.css';

function ProductCategories() {
  const userId = getUserIdFromStorage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set());

  const categories = [
    'SELF-HELP',
    'ROMANCE',
    'TRADING & FINANCE',
    'TECHNOLOGY',
    'MYSTERY & THRILLER',
    'EDUCATION',
    'SCIENCE & NATURE',
  ];

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const response = await bookAPI.getBooksByCategory(category);
      setBooks(response.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="categories-container">
      <h1>Product Categories</h1>
      <p>Explore books from different categories</p>

      <div className="categories-grid">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-card ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
            <span className="arrow">→</span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="books-section">
          <h2>{selectedCategory} Books</h2>
          {loading ? (
            <p>Loading...</p>
          ) : books.length > 0 ? (
            <div className="books-display-grid">
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
          ) : (
            <p>No books found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCategories;
