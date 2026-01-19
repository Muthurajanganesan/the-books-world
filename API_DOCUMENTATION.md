# API Documentation - The Books World

## Base URL
```
http://localhost:8080/api
```

## Authentication
All requests (except signup and login) should include JWT token in header:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### 1. Sign Up
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Secure@123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully. Please complete your details",
  "userId": 1,
  "email": "user@example.com"
}
```

**Validation Rules:**
- Email must be valid format
- Password requirements:
  - Minimum 8 characters
  - 1 uppercase (A-Z)
  - 1 lowercase (a-z)
  - 1 digit (0-9)
  - 1 special character (@#$%^&+=)

---

### 2. Update User Details
**Endpoint:** `POST /auth/update-details/{userId}`

**Request Body:**
```json
{
  "firstName": "John",
  "secondName": "Michael",
  "lastName": "Doe",
  "address": "123 Main St, Apt 4B",
  "mobileNumber": "9876543210",
  "alternateMobileNumber": "9876543211",
  "city": "Delhi",
  "state": "Delhi",
  "zipCode": "110001"
}
```

**Response (200):**
```
"Details updated successfully"
```

**Validation Rules:**
- All fields except city, state, zipCode are mandatory
- Mobile numbers must be exactly 10 digits
- Alternate mobile must be different from mobile

---

### 3. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Secure@123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userId": 1,
  "email": "user@example.com"
}
```

**Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### 4. Get User Details
**Endpoint:** `GET /auth/user/{userId}`

**Headers:** Requires Authorization token

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "secondName": "Michael",
  "lastName": "Doe",
  "mobileNumber": "9876543210",
  "alternateMobileNumber": "9876543211",
  "address": "123 Main St, Apt 4B",
  "city": "Delhi",
  "state": "Delhi",
  "zipCode": "110001",
  "detailsCompleted": true
}
```

---

## Book Endpoints

### 1. Get All Books
**Endpoint:** `GET /books`

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "The 7 Habits of Highly Effective People",
    "author": "Stephen Covey",
    "category": "SELF-HELP",
    "price": 450.0,
    "salePrice": 350.0,
    "onSale": true,
    "description": "A powerful book about personal development",
    "imageUrl": "https://...",
    "quantity": 50
  }
]
```

---

### 2. Get Books by Category
**Endpoint:** `GET /books/category/{category}`

**Example:** `/books/category/SELF-HELP`

**Response:** Array of book objects

---

### 3. Get On-Sale Books
**Endpoint:** `GET /books/on-sale`

**Response:** Array of books where `onSale: true`

---

### 4. Get Single Book
**Endpoint:** `GET /books/{id}`

**Response:** Single book object

---

## Cart Endpoints

### 1. Add to Cart
**Endpoint:** `POST /cart/add/{userId}`

**Request Body:**
```json
{
  "bookId": 1,
  "quantity": 2
}
```

**Response (201):**
```json
{
  "id": 1,
  "bookId": 1,
  "bookTitle": "The 7 Habits",
  "quantity": 2,
  "price": 350.0,
  "totalPrice": 700.0
}
```

---

### 2. Get Cart Items
**Endpoint:** `GET /cart/{userId}`

**Response:**
```json
[
  {
    "id": 1,
    "bookId": 1,
    "bookTitle": "The 7 Habits",
    "quantity": 2,
    "price": 350.0,
    "totalPrice": 700.0
  }
]
```

---

### 3. Remove from Cart
**Endpoint:** `DELETE /cart/{cartId}`

**Response (200):**
```
"Item removed from cart"
```

---

### 4. Clear Cart
**Endpoint:** `DELETE /cart/clear/{userId}`

**Response (200):**
```
"Cart cleared successfully"
```

---

## Order Endpoints

### 1. Create Order
**Endpoint:** `POST /orders/create/{userId}`

**Response (201):**
```json
{
  "message": "Order created successfully",
  "orderId": 5,
  "amount": 1500.0
}
```

---

### 2. Get User Orders
**Endpoint:** `GET /orders/user/{userId}`

**Response:**
```json
[
  {
    "id": 5,
    "userId": 1,
    "totalAmount": 1500.0,
    "orderStatus": "PENDING",
    "paymentStatus": "PENDING",
    "createdAt": "2024-01-18T10:30:00"
  }
]
```

---

## Payment Endpoints

### 1. Confirm Payment
**Endpoint:** `POST /payments/confirm`

**Query Parameters:**
- `userId` (required): User ID
- `orderId` (required): Order ID
- `stripePaymentId` (required): Payment ID from Stripe
- `amount` (required): Payment amount

**Example:**
```
POST /payments/confirm?userId=1&orderId=5&stripePaymentId=pi_123456&amount=1500.0
```

**Response (200):**
```json
{
  "message": "Payment confirmed successfully",
  "status": "SUCCESS"
}
```

**Response (400):**
```json
{
  "error": "Error message",
  "status": "FAILED"
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid token)
- `404`: Not Found
- `500`: Server Error

Error Response Format:
```json
{
  "message": "Error description",
  "status": "ERROR"
}
```

---

## Rate Limiting
No rate limiting currently implemented. Add based on production requirements.

---

## CORS Configuration
- Allowed Origins: `http://localhost:3000`
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed Headers: * (all)
- Allow Credentials: true

---

## Example Request Flow

1. **User Signs Up**
   ```
   POST /auth/signup
   → Response: userId
   ```

2. **User Updates Details**
   ```
   POST /auth/update-details/{userId}
   → Response: Success message
   ```

3. **User Logs In**
   ```
   POST /auth/login
   → Response: token, userId
   ```

4. **Get Books**
   ```
   GET /books
   → Response: Array of books
   ```

5. **Add to Cart**
   ```
   POST /cart/add/{userId}
   → Response: Cart item
   ```

6. **Create Order**
   ```
   POST /orders/create/{userId}
   → Response: orderId, amount
   ```

7. **Process Payment**
   ```
   POST /payments/confirm?userId=...&orderId=...&stripePaymentId=...&amount=...
   → Response: Success status
   ```

---

**Last Updated:** January 2024
