# The Books World - E-Commerce Project Analysis

## 📋 Project Overview

This is a **complete full-stack e-commerce application** for an online bookstore with advanced features including:
- **Frontend**: React (JavaScript) - Interactive UI with authentication & shopping
- **Backend**: Spring Boot (Java) - REST API, JWT authentication, database management
- **Database**: MySQL/H2 - Persistent data storage
- **Security**: JWT token-based authentication & password validation
- **Payment Ready**: Stripe integration support

---

## 🏢 Project Architecture

```
CLIENT (React)
    ↓↑ HTTP/REST (Port 3000 ↔ 8080)
SERVER (Spring Boot)
    ↓↑ JPA/Hibernate ORM
DATABASE (MySQL/H2)
```

---

## 🎮 Frontend Logic & Components

### 1. **Authentication System**

#### Sign Up Flow:
```
User Registration Page
    ↓
Email & Password Validation
    ↓
POST /api/auth/signup
    ↓
Backend: Hash Password + Store User
    ↓
Response: User ID + JWT Token
    ↓
Redirect: User Details Form
```

**Validation Rules:**
```javascript
Email:  Must be valid email format
Password: Minimum 8 characters
          - At least 1 uppercase letter
          - At least 1 lowercase letter
          - At least 1 digit
          - At least 1 special character (@#$%^&+=)
```

#### Login Flow:
```
Login Page
    ↓
Email & Password Input
    ↓
POST /api/auth/login
    ↓
Backend: Verify Credentials
    ↓
JWT Token Generated
    ↓
Save Token (localStorage/sessionStorage)
    ↓
Redirect: Dashboard
```

#### User Details Completion:
```
After Sign Up
    ↓
User Details Form (Personal & Address Info)
    ↓
POST /api/auth/update-details/{userId}
    ↓
Backend: Update User Profile
    ↓
Set detailsCompleted = true
    ↓
Success Message
```

**Data Captured:**
- First Name, Middle Name, Last Name
- Mobile Number (10 digits validation)
- Alternate Mobile Number (10 digits validation)
- Address, City, State, Zip Code

---

### 2. **Product Browsing**

#### Home Page Features:

```
Book Catalog System:

ALL BOOKS
    ↓
Category Filter:
├─ ALL (Show all books)
├─ ON_SALE (Discount items)
├─ SELF-HELP
├─ ROMANCE
├─ TRADING & FINANCE
├─ TECHNOLOGY
├─ MYSTERY & THRILLER
├─ EDUCATION
└─ SCIENCE & NATURE
```

#### Book Display:
```javascript
Books Grid (4 per row)
    ↓
Each Book Card Shows:
├─ Book Image
├─ Title
├─ Author Name
├─ Price (Regular or Sale)
├─ Sale Badge (if on sale)
├─ "Add to Cart" Button
└─ Quantity Selector
```

#### API Endpoints for Books:
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/books` | GET | Get all books |
| `/api/books/{id}` | GET | Get single book details |
| `/api/books/category/{category}` | GET | Get books by category |
| `/api/books/on-sale` | GET | Get sale books |

---

### 3. **Shopping Cart Logic**

#### Add to Cart Flow:
```
User Clicks "Add to Cart" Button
    ↓
GET User ID from localStorage
    ↓
POST /api/cart/add/{userId}
    {
      bookId: 5,
      quantity: 1
    }
    ↓
Backend: Add/Update Cart Item
    ↓
Calculate Total Price
    (price × quantity)
    ↓
Response: Success + Redirect to Cart
```

#### Cart Management:
```javascript
State Management:
├─ cartItems: Array of items in cart
├─ totalPrice: Sum of all items
├─ itemCount: Total items in cart
└─ isLoading: Loading state
```

#### Cart Operations:
| Operation | Endpoint | Logic |
|-----------|----------|-------|
| Add Item | POST `/api/cart/add/{userId}` | Add new item or increment quantity |
| View Cart | GET `/api/cart/{userId}` | Fetch all cart items |
| Remove Item | DELETE `/api/cart/{cartId}` | Remove single item |
| Clear Cart | DELETE `/api/cart/clear/{userId}` | Remove all items |

---

### 4. **Order & Payment System**

#### Checkout Flow:
```
User Reviews Cart
    ↓
Click "Proceed to Checkout"
    ↓
POST /api/orders/create/{userId}
    ↓
Backend: Create Order from Cart
    ├─ Create Order record
    ├─ Create OrderItems from Cart
    ├─ Calculate Total Amount
    └─ Clear Cart
    ↓
Response: Order ID + Amount
    ↓
Initiate Stripe Payment
    ↓
User Enters Payment Details
    ↓
POST /api/payments/confirm
    {
      userId,
      orderId,
      stripePaymentId,
      amount
    }
    ↓
Backend: Mark Order as Paid
    ↓
Payment Confirmation
```

#### Order Status Tracking:
```javascript
User Orders Page:
├─ Order ID
├─ Order Date
├─ Total Amount
├─ Status (Pending/Paid/Shipped)
├─ Items in Order
└─ View Details Button
```

---

### 5. **Frontend Components Structure**

```
App.js (Main Router)
    ├─ /signup → SignUp.js
    ├─ /signup-details/:userId → UserDetails.js
    ├─ /login → Login.js
    └─ /* (Protected) → Dashboard.js
            ├─ Navbar.js (Navigation)
            ├─ Home.js (Book catalog)
            ├─ ProductCategories.js (Category view)
            ├─ Cart.js (Shopping cart)
            ├─ Orders.js (Order history)
            ├─ Profile.js (User profile)
            ├─ AboutUs.js
            ├─ ContactUs.js
            ├─ TermsConditions.js
            └─ ReturnReplacement.js
```

---

## 🖥️ Backend Architecture (Spring Boot)

### Technology Stack:
- **Framework**: Spring Boot 3.1.5
- **Java Version**: Java 17
- **ORM**: Spring Data JPA (Hibernate)
- **Database**: MySQL 8.0 (with H2 fallback)
- **Security**: JWT Authentication
- **Build Tool**: Maven

---

### 1. **Model Layer (Entities)**

#### User Entity:
```java
User
├─ id (Long) - Primary Key
├─ email (String) - Unique, validated
├─ password (String) - Hashed, validated
├─ firstName, secondName, lastName
├─ mobileNumber (10 digits)
├─ alternateMobileNumber (10 digits)
├─ address, city, state, zipCode
├─ detailsCompleted (boolean) - Profile completion flag
├─ createdAt (LocalDateTime) - Auto-generated
└─ updatedAt (LocalDateTime) - Auto-updated
```

#### Book Entity:
```java
Book
├─ id (Long) - Primary Key
├─ title (String)
├─ author (String)
├─ category (String) - Category enum
├─ price (Double) - Regular price
├─ description (String)
├─ imageUrl (String)
├─ quantity (Integer) - Stock quantity
├─ onSale (boolean) - Sale flag
└─ salePrice (Double) - Discounted price
```

#### Cart Entity:
```java
Cart
├─ id (Long) - Primary Key
├─ user (User) - Many-to-One relationship
├─ book (Book) - Many-to-One relationship
├─ quantity (Integer)
├─ totalPrice (Double) - calculated: price × quantity
└─ addedAt (LocalDateTime) - Auto-generated
```

#### Order Entity:
```java
Order
├─ id (Long) - Primary Key
├─ user (User) - Many-to-One relationship
├─ orderDate (LocalDateTime)
├─ status (String) - Pending/Paid/Shipped/Delivered
├─ totalAmount (Double)
├─ shippingAddress (String)
└─ orderItems (List<OrderItem>) - One-to-Many relationship
```

#### OrderItem Entity:
```java
OrderItem
├─ id (Long) - Primary Key
├─ order (Order) - Many-to-One relationship
├─ book (Book) - Many-to-One relationship
├─ quantity (Integer)
├─ price (Double) - Price at time of purchase
└─ subtotal (Double) - price × quantity
```

#### Payment Entity:
```java
Payment
├─ id (Long) - Primary Key
├─ order (Order) - Many-to-One relationship
├─ user (User) - Many-to-One relationship
├─ amount (Double)
├─ paymentMethod (String) - Stripe/Other
├─ transactionId (String) - Payment gateway ID
├─ status (String) - Completed/Failed/Pending
└─ paymentDate (LocalDateTime)
```

---

### 2. **Database Schema**

```sql
-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    second_name VARCHAR(100),
    last_name VARCHAR(100),
    mobile_number VARCHAR(10),
    alternate_mobile_number VARCHAR(10),
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    details_completed TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Books Table
CREATE TABLE books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    category VARCHAR(100),
    price DOUBLE,
    description TEXT,
    image_url VARCHAR(500),
    quantity INT,
    on_sale TINYINT(1) DEFAULT 0,
    sale_price DOUBLE
);

-- Cart Table
CREATE TABLE cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    quantity INT,
    total_price DOUBLE,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Orders Table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    total_amount DOUBLE,
    shipping_address VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- OrderItems Table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    quantity INT,
    price DOUBLE,
    subtotal DOUBLE,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Payments Table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    amount DOUBLE,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    status VARCHAR(50),
    payment_date TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### 3. **Controller Layer (REST Endpoints)**

#### AuthController
```
POST /api/auth/signup
    Request: { email, password }
    Response: { message, userId, token }

POST /api/auth/login
    Request: { email, password }
    Response: { message, token, userId, email }

POST /api/auth/update-details/{userId}
    Request: { firstName, lastName, mobileNumber, ... }
    Response: "Details updated successfully"

GET /api/auth/user/{userId}
    Response: { User details object }
```

#### BookController
```
GET /api/books
    Response: [ Book, Book, ... ]

GET /api/books/{id}
    Response: { Book details }

GET /api/books/category/{category}
    Response: [ Books in category ]

GET /api/books/on-sale
    Response: [ Sale books only ]
```

#### CartController
```
POST /api/cart/add/{userId}
    Request: { bookId, quantity }
    Response: CartDTO

GET /api/cart/{userId}
    Response: [ CartDTO, CartDTO, ... ]

DELETE /api/cart/{cartId}
    Response: "Item removed from cart"

DELETE /api/cart/clear/{userId}
    Response: "Cart cleared successfully"
```

#### OrderController
```
POST /api/orders/create/{userId}
    Response: { orderId, amount, message }

GET /api/orders/user/{userId}
    Response: [ Order, Order, ... ]
```

#### PaymentController
```
POST /api/payments/confirm
    Query Params: userId, orderId, stripePaymentId, amount
    Response: Payment confirmation
```

---

### 4. **Service Layer (Business Logic)**

#### UserService
- `signUp()` - Register new user + password hashing
- `login()` - Authenticate + generate JWT token
- `updateUserDetails()` - Update profile information
- `getUserById()` - Fetch user information

#### JwtTokenProvider
```java
generateToken(userId, email)
    → Creates JWT token with expiration

getUserIdFromToken(token)
    → Extracts userId from token

validateToken(token)
    → Verifies token signature & expiration
```

#### BookService
- `getAllBooks()` - Fetch all books with pagination
- `getBooksByCategory()` - Filter by category
- `getOnSaleBooks()` - Get discounted books
- `getBookById()` - Single book details

#### CartService
```java
addToCart(userId, bookId, quantity)
    → Add new item or update existing quantity
    → Calculate totalPrice
    → Return CartDTO

getCartItems(userId)
    → Fetch all cart items for user

removeFromCart(cartId)
    → Delete item from cart

clearCart(userId)
    → Empty entire cart
```

#### OrderService
```java
createOrder(userId)
    → Create Order from Cart Items
    → Convert Cart to OrderItems
    → Calculate Total Amount
    → Clear Cart
    → Return Order

getUserOrders(userId)
    → Fetch order history

updateOrderStatus(orderId, status)
    → Update order status
```

#### PaymentService
- `processPayment()` - Handle Stripe payment
- `confirmPayment()` - Mark order as paid
- `getPaymentHistory()` - Payment records

---

### 5. **Repository Layer (Data Access)**

```java
UserRepository extends JpaRepository<User, Long>
    → findByEmail(email)

BookRepository extends JpaRepository<Book, Long>
    → findByCategory(category)
    → findByOnSaleTrue()

CartRepository extends JpaRepository<Cart, Long>
    → findByUserId(userId)
    → findByUserIdAndBookId(userId, bookId)
    → deleteByUserId(userId)

OrderRepository extends JpaRepository<Order, Long>
    → findByUserId(userId)

PaymentRepository extends JpaRepository<Payment, Long>
    → findByOrderId(orderId)
    → findByUserId(userId)
```

---

### 6. **Security & Configuration**

#### JWT Configuration:
```properties
jwt.secret=YourLongSecretKeyHere
jwt.expiration=86400000 (24 hours in milliseconds)
```

#### CORS Configuration:
```java
@CrossOrigin(origins = "http://localhost:3000")
// Allow React frontend to make requests
```

#### SecurityConfig:
- Password encoding (BCrypt)
- JWT token validation on requests
- Protected endpoints require token
- CORS headers configuration

---

## 📊 Complete System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (React)                          │
│                      http://localhost:3000                           │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    Authentication Pages                        │ │
│  │  SignUp.js → UserDetails.js → Login.js                        │ │
│  │  ├─ Form Validation                                            │ │
│  │  ├─ Password Strength Check                                    │ │
│  │  ├─ Email Validation                                           │ │
│  │  └─ JWT Token Storage                                          │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                   Main Dashboard (Protected)                    │ │
│  │                                                                 │ │
│  │  ┌────────────────────────────────────────────────────────┐   │ │
│  │  │ Navbar.js (Navigation)                                │   │ │
│  │  │ ├─ Logo/Brand                                          │   │ │
│  │  │ ├─ Navigation Links                                    │   │ │
│  │  │ ├─ Search Bar                                          │   │ │
│  │  │ ├─ Cart Icon (with badge count)                        │   │ │
│  │  │ └─ User Profile Menu                                   │   │ │
│  │  └────────────────────────────────────────────────────────┘   │ │
│  │                                                                 │ │
│  │  ┌──────────────────────┬──────────────────────────────────┐  │ │
│  │  │                      │                                  │  │ │
│  │  │  Home.js             │ ProductCategories.js             │  │ │
│  │  │  ├─ Book Grid        │ ├─ Category Filter               │  │ │
│  │  │  ├─ 4 per row        │ ├─ Category Cards                │  │ │
│  │  │  ├─ Filter           │ └─ Books by Category             │  │ │
│  │  │  ├─ Search           │                                  │  │ │
│  │  │  └─ Add to Cart      │ Cart.js                          │  │ │
│  │  │                      │ ├─ Cart Items List               │  │ │
│  │  │ BookCard:            │ ├─ Quantity Editor               │  │ │
│  │  │ ├─ Image             │ ├─ Remove Item                   │  │ │
│  │  │ ├─ Title             │ ├─ Total Price                   │  │ │
│  │  │ ├─ Author            │ └─ Checkout Button               │  │ │
│  │  │ ├─ Price             │                                  │  │ │
│  │  │ ├─ Sale Badge        │ Orders.js                        │  │ │
│  │  │ └─ Rating            │ ├─ Order History                 │  │ │
│  │  │                      │ ├─ Order Status                  │  │ │
│  │  └──────────────────────┼──────────────────────────────────┘  │ │
│  │                         │                                     │ │
│  │                    StripePayment.js                          │ │
│  │                    ├─ Payment Form                           │ │
│  │                    ├─ Card Details                           │ │
│  │                    └─ Confirm Payment                        │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  └────────────────────────────────────────────────────────────────┐ │
│  │  utils/api.js (Axios HTTP Client)                             │ │
│  │  ├─ Bearer Token Interceptor                                   │ │
│  │  ├─ Error Handling                                             │ │
│  │  └─ Request/Response Transformation                            │ │
│  └────────────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
            HTTP REST API (JSON) - CORS Enabled
                         │
┌────────────────────────┴─────────────────────────────────────────────┐
│                   SERVER LAYER (Spring Boot)                         │
│                   http://localhost:8080/api                          │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                 REST Controllers                               │ │
│  │                                                                │ │
│  │  AuthController                                               │ │
│  │  ├─ POST /auth/signup                                          │ │
│  │  ├─ POST /auth/login                                           │ │
│  │  ├─ POST /auth/update-details/{userId}                         │ │
│  │  └─ GET /auth/user/{userId}                                    │ │
│  │                                                                │ │
│  │  BookController                                               │ │
│  │  ├─ GET /books                                                 │ │
│  │  ├─ GET /books/{id}                                            │ │
│  │  ├─ GET /books/category/{category}                             │ │
│  │  └─ GET /books/on-sale                                         │ │
│  │                                                                │ │
│  │  CartController                                               │ │
│  │  ├─ POST /cart/add/{userId}                                    │ │
│  │  ├─ GET /cart/{userId}                                         │ │
│  │  ├─ DELETE /cart/{cartId}                                      │ │
│  │  └─ DELETE /cart/clear/{userId}                                │ │
│  │                                                                │ │
│  │  OrderController                                              │ │
│  │  ├─ POST /orders/create/{userId}                               │ │
│  │  └─ GET /orders/user/{userId}                                  │ │
│  │                                                                │ │
│  │  PaymentController                                            │ │
│  │  └─ POST /payments/confirm                                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                         │                                           │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │            Service Layer (Business Logic)                      │ │
│  │                                                                │ │
│  │  UserService              JwtTokenProvider                     │ │
│  │  ├─ signUp()              ├─ generateToken()                   │ │
│  │  ├─ login()               ├─ getUserIdFromToken()              │ │
│  │  ├─ updateDetails()       └─ validateToken()                   │ │
│  │  └─ getUserById()                                              │ │
│  │                                                                │ │
│  │  BookService              CartService                          │ │
│  │  ├─ getAllBooks()         ├─ addToCart()                       │ │
│  │  ├─ getByCategory()       ├─ getCartItems()                    │ │
│  │  ├─ getOnSale()           ├─ removeFromCart()                  │ │
│  │  └─ getById()             └─ clearCart()                       │ │
│  │                                                                │ │
│  │  OrderService             PaymentService                       │ │
│  │  ├─ createOrder()         ├─ processPayment()                  │ │
│  │  ├─ getUserOrders()       ├─ confirmPayment()                  │ │
│  │  └─ updateStatus()        └─ getHistory()                      │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                         │                                           │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │        Repository Layer (Data Access - JPA)                    │ │
│  │                                                                │ │
│  │  UserRepository           BookRepository                       │ │
│  │  ├─ findByEmail()         ├─ findByCategory()                  │ │
│  │  └─ CRUD operations       ├─ findByOnSaleTrue()                │ │
│  │                           └─ CRUD operations                   │ │
│  │                                                                │ │
│  │  CartRepository           OrderRepository                      │ │
│  │  ├─ findByUserId()        ├─ findByUserId()                    │ │
│  │  ├─ findByUserAndBook()   └─ CRUD operations                   │ │
│  │  └─ deleteByUserId()                                           │ │
│  │                           PaymentRepository                    │ │
│  │                           ├─ findByOrderId()                   │ │
│  │                           └─ CRUD operations                   │ │
│  └────────────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                   JPA/Hibernate ORM
                   SQL Queries
                         │
┌────────────────────────┴─────────────────────────────────────────────┐
│                   DATABASE LAYER                                     │
│              MySQL 8.0 / H2 Database                                 │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ ┌─────────────┐ │
│  │   users     │  │    books    │  │    cart     │ │   orders    │ │
│  │  ─────────  │  │  ─────────  │  │  ─────────  │ │  ─────────  │ │
│  │ id (PK)     │  │ id (PK)     │  │ id (PK)     │ │ id (PK)     │ │
│  │ email (UQ)  │  │ title       │  │ user_id(FK) │ │ user_id(FK) │ │
│  │ password    │  │ author      │  │ book_id(FK) │ │ order_date  │ │
│  │ first_name  │  │ category    │  │ quantity    │ │ status      │ │
│  │ mobile      │  │ price       │  │ total_price │ │ total_amt   │ │
│  │ address     │  │ image_url   │  │ added_at    │ │ address     │ │
│  │ city        │  │ quantity    │  │             │ │             │ │
│  │ details_cmplt  │ on_sale     │  └─────────────┘ └─────────────┘ │
│  │ created_at  │  │ sale_price  │                                 │ │
│  └─────────────┘  └─────────────┘  ┌──────────────┐ ┌───────────┐ │
│                                     │ order_items  │ │ payments  │ │
│                                     │ ──────────── │ │ ───────── │ │
│                                     │ id (PK)      │ │ id (PK)   │ │
│                                     │ order_id(FK) │ │ order_id  │ │
│                                     │ book_id (FK) │ │ user_id   │ │
│                                     │ quantity     │ │ amount    │ │
│                                     │ price        │ │ method    │ │
│                                     │ subtotal     │ │ txn_id    │ │
│                                     └──────────────┘ │ status    │ │
│                                                     │ date      │ │
│                                                     └───────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete User Journey

### 1. **New User Registration**
```
Visit Website
    ↓ /signup
SignUp Page
    ├─ Enter Email
    ├─ Enter Password (with strength validation)
    └─ Submit
    ↓
Backend: Hash password + Create user
    ↓
Response: userId + token
    ↓ /signup-details/:userId
User Details Page
    ├─ First/Middle/Last Name
    ├─ Phone Numbers (validation)
    ├─ Address/City/State/Zip
    └─ Submit
    ↓
Backend: Update user profile
    ↓ /login
Login Page (Auto-fill or manual)
    ↓
Dashboard (Authenticated)
```

### 2. **Browsing & Shopping**
```
Dashboard/Home
    ├─ View All Books (Grid 4/row)
    ├─ Click Category Filter
    │  └─ Display filtered books
    │
    ├─ Click Book Card
    │  └─ View Book Details
    │
    └─ Click "Add to Cart"
       ↓
       POST /api/cart/add/{userId}
       ↓
       Backend: Add to cart
       ↓
       Success Message + Redirect to Cart
```

### 3. **Checkout & Payment**
```
Cart Page
    ├─ View cart items
    ├─ Edit quantities
    ├─ Remove items
    └─ Review Total
    ↓
Click "Proceed to Checkout"
    ↓
    POST /api/orders/create/{userId}
    ↓
Backend:
    ├─ Create Order
    ├─ Convert Cart Items → Order Items
    ├─ Calculate Total
    └─ Clear Cart
    ↓
Response: Order ID + Amount
    ↓
Stripe Payment Page
    ├─ Enter Card Details
    ├─ Enter Billing Address
    └─ Submit Payment
    ↓
    POST /api/payments/confirm
    ↓
Backend: Mark order as paid
    ↓
Payment Confirmation
    ↓
Order History (View all orders)
```

---

## 🔐 Security Implementation

### 1. **Password Security**
```
User Input Password
    ↓
Client-side Validation:
├─ Minimum 8 characters
├─ At least 1 uppercase
├─ At least 1 lowercase
├─ At least 1 digit
└─ At least 1 special character
    ↓
Backend: BCrypt Hashing
    ├─ Hash password with salt
    ├─ Store hash in database
    └─ Never store plain text
    ↓
Login: Compare input hash with stored hash
```

### 2. **JWT Authentication**
```
Login Successful
    ↓
Generate JWT Token
{
  "header": {
    "alg": "HS512"
  },
  "payload": {
    "userId": 5,
    "email": "user@email.com",
    "iat": 1674567890,
    "exp": 1674654290
  },
  "signature": "signed with secret key"
}
    ↓
Frontend: Store in localStorage/sessionStorage
    ↓
Every Request: Include in Authorization header
    "Bearer <token>"
    ↓
Backend: Validate token
├─ Check signature
├─ Check expiration
└─ Extract userId
```

### 3. **CORS Protection**
```java
@CrossOrigin(origins = "http://localhost:3000")
// Only allow requests from React frontend
// Other origins rejected by browser
```

---

## 💾 Data Flow Examples

### Example 1: Add to Cart
```
Frontend:
    cartAPI.addToCart(userId=5, bookId=10, quantity=2)
    
    ↓ (HTTP POST)
    
Backend:
    POST /api/cart/add/5
    Body: { bookId: 10, quantity: 2 }
    
    → CartService.addToCart()
      → Find User (id=5) from database
      → Find Book (id=10) from database
      → Check if Cart item exists for this user+book
      
      If exists:
        → Update quantity: 2 + existing
        
      If new:
        → Create new Cart item
      
      → Calculate totalPrice: price × quantity
      → Save to database
      → Return CartDTO
    
    ↓ (HTTP Response 201)
    
Frontend:
    Show: "Book added to cart!"
    Display: updated cart count
    Navigate to /cart
```

### Example 2: Create Order
```
Frontend:
    orderAPI.createOrder(userId=5)
    
    ↓ (HTTP POST)
    
Backend:
    POST /api/orders/create/5
    
    → OrderService.createOrder()
      → Get all Cart items for userId=5
      → Create new Order object
      → For each cart item:
         → Create OrderItem
         → Set book, quantity, price
         → Add to Order
      → Calculate total amount
      → Save Order to database
      → Delete all Cart items for this user
      → Return Order with orderId + amount
    
    ↓ (HTTP Response 201)
    
Frontend:
    Receive: { orderId: 50, amount: 299.99, message: "..." }
    Show: Payment form with amount
    User enters card details
    
    ↓ (HTTP POST)
    
Backend:
    POST /api/payments/confirm
    Params: { userId: 5, orderId: 50, stripePaymentId: "...", amount: 299.99 }
    
    → PaymentService.confirmPayment()
      → Verify Stripe payment
      → Create Payment record
      → Update Order status: "Paid"
      → Return confirmation
    
    ↓ (HTTP Response 200)
    
Frontend:
    Show: "Payment successful!"
    Redirect to /orders
    Display order in history
```

---

## ✨ Key Features Summary

| Feature | Frontend | Backend | Database |
|---------|----------|---------|----------|
| **Authentication** | Login/SignUp forms | JWT + BCrypt | User table |
| **User Profile** | Editable details | Update service | User columns |
| **Book Catalog** | Grid display, filters | Repository queries | Books table |
| **Shopping Cart** | Add/remove items | Cart service | Cart table |
| **Checkout** | Form + summary | Order service | Orders table |
| **Payment** | Stripe integration | Payment service | Payments table |
| **Order History** | List view | Query service | Orders table |

---

## 🎯 Technology Stack Summary

### Frontend:
- React 18+
- React Router v6 (Navigation)
- Axios (HTTP client)
- CSS3 (Styling)
- Stripe.js (Payment integration)

### Backend:
- Spring Boot 3.1.5
- Spring Data JPA (ORM)
- Spring Security (Auth)
- MySQL 8.0 (Primary DB)
- H2 (Fallback/Testing)
- Maven (Build)

### Deployment Ready:
- Docker support (Dockerfiles provided)
- Docker Compose setup
- Environment configuration
- Production builds

---

## 📝 Summary

**The Books World is a complete, production-ready e-commerce platform featuring:**

✅ **User Management**: Secure authentication with JWT + password hashing  
✅ **Product Management**: Complete book catalog with categories & search  
✅ **Shopping Features**: Cart management with real-time price calculation  
✅ **Order Processing**: Order creation with history tracking  
✅ **Payment Integration**: Stripe payment gateway support  
✅ **Security**: CORS, JWT validation, password validation  
✅ **Database**: Normalized schema with proper relationships  
✅ **API**: RESTful endpoints with proper status codes & error handling  
✅ **Frontend**: Responsive React UI with form validation  
✅ **Backend**: Layered architecture (Controller → Service → Repository)

**Architecture Pattern**: MVC + Repository Pattern + JWT Authentication
