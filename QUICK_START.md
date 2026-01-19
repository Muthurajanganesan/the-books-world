# Quick Start - The Books World

## 🚀 3-Minute Quick Start

### Prerequisites
✅ XAMPP (MySQL)
✅ Java JDK 17+
✅ Node.js (v14+)
✅ Maven

---

## Step 1: Start Backend (Terminal 1)

```bash
# Navigate to backend
cd TheBooksWorld/backend

# Build and run
mvn clean install
mvn spring-boot:run
```

✅ Backend running on: `http://localhost:8080`

---

## Step 2: Start Frontend (Terminal 2)

```bash
# Navigate to frontend
cd TheBooksWorld/frontend

# Install and run
npm install
npm start
```

✅ Frontend opens at: `http://localhost:3000`

---

## Step 3: Test the Application

1. **Sign Up** (Page 1)
   - Email: `user@example.com`
   - Password: `Test@123456` (must have uppercase, lowercase, number, special char)

2. **Complete Details** (Page 2)
   - Fill all required fields
   - Mobile numbers: 10 digits

3. **Login** (Page 3)
   - Use same email & password

4. **Browse & Shop**
   - Home: View 4-column grid of books
   - Categories: Filter by type
   - Cart: Add/remove items
   - All navbar links work (single-page navigation)

---

## 📚 Available Book Categories

- SELF-HELP (ON SALE) 🔥
- ROMANCE (ON SALE) 🔥
- Trading & Finance
- Technology
- Mystery & Thriller
- Education
- Science & Nature
- Plus more!

---

## 🎯 Key Features

✅ Secure signup with password validation
✅ User profile management
✅ Book browsing by category
✅ Shopping cart
✅ Order creation
✅ Payment gateway ready (Stripe integration)
✅ Single-page dashboard navigation
✅ Responsive design
✅ Mock data included

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `kill $(lsof -t -i:3000)` or use different port |
| Backend not starting | Check XAMPP MySQL is running |
| Blank home page | Wait 5 seconds, refresh browser |
| Login fails | Check email/password, try new account |

---

## 📱 User Flow

```
Signup → User Details → Login → Dashboard
                                    ├── Home (Browse books)
                                    ├── Categories (Filter books)
                                    ├── Cart (Shopping)
                                    ├── About (Info)
                                    ├── Contact (9876543210)
                                    └── More pages...
```

---

## 💾 Database Auto-Setup

- Database created automatically ✅
- Tables created automatically ✅
- 20+ dummy books loaded ✅
- Ready to use immediately ✅

---

## 🎨 UI Highlights

- **Blue gradient background** with white/semi-white forms
- **4-sided curved input boxes** (border-radius)
- **Centered forms** on signup/login pages
- **4 books per row** on home page
- **Responsive grid** that adapts to screen size

---

## 💡 Test Data

**Sample User:**
- Email: `test@books.com`
- Password: `TestPass@123`

**Sample Books:**
- "The 7 Habits of Highly Effective People" - ₹350 (on sale)
- "Atomic Habits" - ₹399 (on sale)
- "Pride and Prejudice" - ₹250
- "The Intelligent Investor" - ₹650
- And 16+ more!

---

## 📞 Support

**Contact Us Page:** 9876543210
**Email:** support@thebooksworld.com
**Hours:** Monday-Friday, 9 AM - 6 PM IST

---

**Ready to go!** 🎉 Happy coding!
