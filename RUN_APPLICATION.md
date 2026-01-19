# 🚀 THE BOOKS WORLD - HOW TO RUN

## ✅ FIXED ISSUES:
1. ✅ Fixed React import in `index.js` - was importing from wrong module
2. ✅ Fixed all build warnings - removed unused variables/imports
3. ✅ Backend compiled successfully (JAR ready)
4. ✅ Frontend compiled successfully (no errors)

---

## 🎯 RUNNING THE APPLICATION

### Step 1: Start MySQL Database

**If using XAMPP:**
1. Open XAMPP Control Panel
2. Start **Apache** (optional)
3. Start **MySQL**
4. Wait 3-5 seconds for it to initialize

**If using system MySQL:**
```bash
mysql -u root
# Or if you have a password:
mysql -u root -p
```

---

### Step 2: Start Spring Boot Backend

**Terminal 1:**
```bash
cd e:\react\TheBooksWorld\backend
mvn spring-boot:run
```

**Expected Output (takes 10-15 seconds):**
```
Started TheBooksWorldApplication in X.XXX seconds
Application 'thebooksworld' is running!
Tomcat started on port(s): 8080
```

✅ **Backend is ready when you see the last line**

---

### Step 3: Start React Frontend

**Terminal 2 (or Tab):**
```bash
cd e:\react\TheBooksWorld\frontend
npm start
```

**Expected Output (takes 10-15 seconds):**
```
Compiled successfully!

You can now view the-books-world in the browser.

  Local:            http://localhost:3000
```

✅ **Browser will automatically open at http://localhost:3000**

---

## 🌐 ACCESSING THE APPLICATION

Once both are running:

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:8080/api

### Initial Screen: Sign Up Page

When you first load http://localhost:3000, you'll see the Sign Up page.

---

## 📝 TEST THE APPLICATION

### 1️⃣ **Sign Up** (First Time)
- **URL:** http://localhost:3000/signup
- **Email:** user@example.com
- **Password:** Test@123456 (must meet all 5 requirements)
- **Confirm Password:** Test@123456
- Click **"Sign Up"**

#### Password Requirements:
- ✓ Minimum 8 characters
- ✓ At least 1 Uppercase letter (A-Z)
- ✓ At least 1 Lowercase letter (a-z)
- ✓ At least 1 Number (0-9)
- ✓ At least 1 Special character (@#$%^&+=)

---

### 2️⃣ **Complete User Details**
- **First Name:** John
- **Second Name:** Michael
- **Last Name:** Doe
- **Address:** 123 Main Street
- **Mobile Number:** 9876543210 (exactly 10 digits)
- **Alternate Mobile:** 9876543211 (exactly 10 digits)
- **City:** Delhi
- **State:** Delhi
- **Zip Code:** 110001
- Click **"Continue to Login"**

---

### 3️⃣ **Login**
- **Email:** user@example.com
- **Password:** Test@123456
- Click **"Login"**

---

### 4️⃣ **Dashboard** (Main Application)
After login, you'll see the dashboard with:

**Navigation Bar:**
- 📚 Home
- 🏷️ Product Categories
- 📦 Bulk Purchase
- ℹ️ About Us
- 🔄 Return & Replacement
- 📞 Contact Us
- 📋 Terms & Conditions
- 🛒 Cart
- 🚪 Logout

---

## 🛍️ FEATURES TO TEST

### Home Page
- [ ] See 4-column grid of books
- [ ] See book prices
- [ ] Filter by category (ALL, ON_SALE, SELF-HELP, ROMANCE, etc.)
- [ ] Click "Add to Cart" button
- [ ] See confirmation message

### Product Categories
- [ ] Browse different categories
- [ ] Filter by category
- [ ] Add books to cart

### Cart Page
- [ ] View all added items
- [ ] See total price calculation
- [ ] Remove items from cart
- [ ] Clear entire cart
- [ ] "Proceed to Payment" button

### Information Pages
- [ ] About Us - See owner details
- [ ] Contact Us - See contact info (Phone: 9876543210)
- [ ] Terms & Conditions - Read full terms

---

## ⚠️ TROUBLESHOOTING

### **Problem: Blank White Page on http://localhost:3000**

**Solution:** Check these in order:

1. **Is backend running?**
   ```bash
   # In another terminal, test:
   curl http://localhost:8080/api/books
   # Should return JSON array of books
   ```

2. **Is MySQL running?**
   - Open XAMPP Control Panel
   - Check if MySQL shows "Running"
   - If not, click Start

3. **Check browser console for errors:**
   - Press **F12** in browser
   - Click **Console** tab
   - Look for red error messages
   - Share the error text

4. **Clear cache and refresh:**
   - Press **Ctrl+Shift+Del**
   - Select "All time"
   - Check "Cookies and other site data"
   - Click "Clear data"
   - Refresh page

---

### **Problem: "Cannot GET /" Error**

**Solution:**
1. Stop frontend: Press `Ctrl+C` in Terminal 2
2. Clear node_modules cache:
   ```bash
   cd e:\react\TheBooksWorld\frontend
   npm cache clean --force
   ```
3. Restart frontend:
   ```bash
   npm start
   ```

---

### **Problem: Backend won't start - Port 8080 already in use**

**Solution:**
```bash
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual number)
taskkill /PID [PID_NUMBER] /F

# Or use different port in application.properties:
# server.port=8081
```

---

### **Problem: Database Connection Error**

**Error Message:**
```
Access denied for user 'root'@'localhost'
```

**Solution:**
1. Check XAMPP MySQL is running
2. Verify password in `application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=
   # (leave empty if XAMPP default)
   ```
3. Test MySQL connection:
   ```bash
   mysql -u root -h localhost
   ```

---

### **Problem: "Failed to fetch" when adding to cart**

**Causes:**
- Backend is not running
- Backend port is wrong (should be 8080)
- CORS issue

**Solution:**
1. Verify backend is running: `curl http://localhost:8080/api/books`
2. Check `application.properties` has correct CORS settings
3. Restart both frontend and backend

---

### **Problem: Signup doesn't work**

**Common Issues:**
1. **Email already exists** - Use a different email
2. **Password doesn't meet requirements** - Check all 5 requirements
3. **Backend not running** - Start backend first

---

## 🔍 CHECKING EVERYTHING IS WORKING

### Quick Health Check

```bash
# Terminal 3 (new terminal)

# Test Backend API
curl http://localhost:8080/api/books

# Should return something like:
# [{"id":1,"title":"The 7 Habits...","price":350,...},...]

# Test Frontend is running
curl http://localhost:3000
# Should return HTML (not error)

# Test Database
mysql -u root -e "USE thebooksworld; SELECT COUNT(*) FROM books;"
# Should return: 20+ books
```

---

## 📊 WHAT'S RUNNING WHERE

| Component | URL | Port | Status |
|-----------|-----|------|--------|
| Frontend | http://localhost:3000 | 3000 | ✅ Running |
| Backend | http://localhost:8080 | 8080 | ✅ Running |
| MySQL | localhost | 3306 | ✅ Running |
| phpMyAdmin | http://localhost/phpmyadmin | 80 | ✅ Running |

---

## 🎯 SUCCESSFUL LOGIN FLOW

✅ **Sign Up Page Loads** → User can see email/password fields  
✅ **User Signs Up** → Sees "Details collection page"  
✅ **User Completes Details** → Redirected to Login  
✅ **User Logs In** → Sees Dashboard with Navbar  
✅ **Dashboard Loads** → Can see 4-column book grid  
✅ **Add to Cart Works** → See confirmation message  
✅ **Navigation Works** → Can click navbar links without page reload  
✅ **Cart Page Works** → Can view/remove items  

---

## 📞 SUPPORT

**If you see a blank page:**
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Share any red error messages
4. Check Network tab for failed API calls

**Common Error Messages:**
- `Uncaught TypeError` → Check console for full error
- `Failed to fetch` → Backend not running
- `NetworkError` → Port 8080 not accessible

---

## ✨ YOU'RE ALL SET!

Your application is now ready to use!

**Next Steps:**
1. ✅ Start MySQL
2. ✅ Start Backend (Terminal 1)
3. ✅ Start Frontend (Terminal 2)
4. ✅ Open http://localhost:3000
5. ✅ Sign up and test all features!

Happy Shopping! 🛍️📚

---

**Version:** 1.0.0  
**Last Updated:** January 18, 2026  
**Status:** Production Ready ✅
