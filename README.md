# The Books World - Full Stack E-Commerce Application

A complete full-stack e-commerce platform for an online bookstore built with React and Spring Boot.

## 📋 Project Overview

The Books World is a comprehensive online bookstore application featuring:

### Frontend (React)
- User authentication (Sign Up, Login)
- User profile management
- Product browsing and categorization
- Shopping cart management
- Payment gateway integration (Stripe ready)
- Responsive design

### Backend (Spring Boot)
- RESTful API endpoints
- User management and authentication
- Product catalog management
- Shopping cart functionality
- Order management
- Payment processing support

## 🏗️ Project Structure

```
TheBooksWorld/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS files
│   │   ├── utils/           # Utility functions and API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── backend/                 # Spring Boot Application
    ├── src/main/java/com/thebooksworld/
    │   ├── config/          # Configuration classes
    │   ├── controller/       # REST endpoints
    │   ├── model/           # Entity classes
    │   ├── repository/       # Data access layer
    │   ├── service/         # Business logic
    │   ├── dto/             # Data transfer objects
    │   └── TheBooksWorldApplication.java
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+) and npm
- Java JDK 17+
- Apache Maven 3.6+
- MySQL (via XAMPP)

### Backend Setup

1. **Start XAMPP and create database:**
   ```bash
   # Start XAMPP MySQL
   # Open phpMyAdmin and create database
   CREATE DATABASE thebooksworld;
   ```

2. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

3. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

   The frontend will open at `http://localhost:3000`

## 🔑 Key Features

### Authentication Flow
1. **Sign Up (Page 1)**
   - Email and password input
   - Password strength indicator
   - Email validation
   - Password requirements:
     - Minimum 8 characters
     - 1 uppercase letter
     - 1 lowercase letter
     - 1 digit
     - 1 special character (@#$%^&+=)

2. **User Details (Page 2)**
   - Collect: First Name, Second Name, Last Name
   - Address, Mobile Number, Alternate Mobile Number
   - City, State, Zip Code
   - All fields mandatory with validation
   - Mobile numbers must be 10 digits

3. **Login (Page 3)**
   - Email and password authentication
   - JWT token generation
   - Error handling for invalid credentials

### Dashboard
- **Navbar Navigation:**
  - Home
  - Product Categories
  - Bulk Purchase
  - About Us
  - Return & Replacement
  - Contact Us
  - Terms & Conditions
  - Cart (with shopping cart icon)
  - Logout

- **Home Page:**
  - Display books in 4-column grid
  - Category filtering
  - Sale items display
  - Add to cart functionality
  - Price display with sale discounts

- **Product Categories:**
  - Browse books by category:
    - SELF-HELP (ON SALE)
    - ROMANCE (ON SALE)
    - Trading & Finance
    - Technology
    - Mystery & Thriller
    - Education
    - Science & Nature

- **Shopping Cart:**
  - Add/remove items
  - View total price
  - Proceed to payment

- **Dummy Pages:**
  - Bulk Purchase (placeholder)
  - About Us (with owner details)
  - Return & Replacement (placeholder)
  - Contact Us (phone: 9876543210)
  - Terms & Conditions

### Payment Integration
- Ready for Stripe payment gateway
- Order creation before payment
- Payment confirmation endpoint

## 🗄️ Database Schema

### Tables Created:
- `users` - User account and profile information
- `books` - Book catalog
- `cart` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Items in each order
- `payments` - Payment transaction records

### Dummy Data
- Self-Help Books (with sale prices)
- Romance Books (with sale prices)
- Trading & Finance Books
- Technology Books
- Mystery & Thriller Books
- Education Books
- Science & Nature Books

## 🔐 Security Features

- Password encryption using BCrypt
- JWT token-based authentication
- Email validation
- Phone number validation
- Input validation on all forms
- CORS configuration

## 📱 Responsive Design

- Mobile-friendly interface
- Adaptive grid layouts
- Touch-friendly buttons
- Mobile navigation menu

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/update-details/{userId}` - Update user profile
- `POST /api/auth/login` - User login
- `GET /api/auth/user/{userId}` - Get user details

### Books
- `GET /api/books` - Get all books
- `GET /api/books/category/{category}` - Books by category
- `GET /api/books/on-sale` - Sale books
- `GET /api/books/{id}` - Book details

### Cart
- `POST /api/cart/add/{userId}` - Add to cart
- `GET /api/cart/{userId}` - Get cart items
- `DELETE /api/cart/{cartId}` - Remove from cart
- `DELETE /api/cart/clear/{userId}` - Clear cart

### Orders
- `POST /api/orders/create/{userId}` - Create order
- `GET /api/orders/user/{userId}` - User orders

### Payment
- `POST /api/payments/confirm` - Confirm payment

## 🎨 Color Scheme

- Primary Blue: `#1e3a8a`
- Secondary Blue: `#3b82f6`
- Light Background: `rgba(255, 255, 255, 0.95)`
- Success Green: `#16a34a`
- Error Red: `#dc2626`

## 📝 Configuration Files

### Backend (application.properties)
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/thebooksworld
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (package.json)
```json
"proxy": "http://localhost:8080"
```

## 🔄 Workflow

1. User navigates to `/signup` (created automatically on first run)
2. After signup, user completes profile on `/signup-details/:userId`
3. User logs in via `/login`
4. Dashboard loads with all pages accessible via navbar
5. User browses books and adds to cart
6. Checkout process with order creation
7. Payment via Stripe gateway (integration ready)

## 🐛 Debugging

### Backend Issues:
- Check XAMPP MySQL is running
- Verify database `thebooksworld` exists
- Check port 8080 is not in use
- Review logs in console

### Frontend Issues:
- Verify backend is running on port 8080
- Check browser console for errors
- Clear browser cache if pages not updating
- Verify Node modules are installed

## 📚 Dummy Book Data

The application includes 20+ dummy books across different categories with:
- Realistic titles and authors
- Varying prices
- Sale prices for sale items
- Placeholder images
- Category assignments

## 🚢 Deployment Ready

- Backend: Ready for deployment to cloud platforms (Heroku, AWS, Azure)
- Frontend: Can be built with `npm run build`
- Database: MySQL connection configurable
- Environment variables can be externalized

## 📧 Contact & Support

For support: support@thebooksworld.com
Phone: 9876543210
Hours: Monday to Friday, 9 AM - 6 PM IST

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** Production Ready
