import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  signUp: (email, password) =>
    api.post('/auth/signup', { email, password }),
  updateDetails: (userId, data) =>
    api.post(`/auth/update-details/${userId}`, data),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getUserDetails: (userId) =>
    api.get(`/auth/user/${userId}`),
};

export const bookAPI = {
  getAllBooks: () => api.get('/books'),
  getBooksByCategory: (category) =>
    api.get(`/books/category/${category}`),
  getOnSaleBooks: () => api.get('/books/on-sale'),
  getBookById: (id) => api.get(`/books/${id}`),
};

export const cartAPI = {
  addToCart: (userId, bookId, quantity) =>
    api.post(`/cart/add/${userId}`, { bookId, quantity }),
  getCartItems: (userId) => api.get(`/cart/${userId}`),
  removeFromCart: (cartId) =>
    api.delete(`/cart/${cartId}`),
  clearCart: (userId) => api.delete(`/cart/clear/${userId}`),
};

export const orderAPI = {
  createOrder: (userId) =>
    api.post(`/orders/create/${userId}`),
  getUserOrders: (userId) =>
    api.get(`/orders/user/${userId}`),
};

export const paymentAPI = {
  confirmPayment: (userId, orderId, stripePaymentId, amount) =>
    api.post('/payments/confirm', null, {
      params: {
        userId,
        orderId,
        stripePaymentId,
        amount,
      },
    }),
};

export default api;
