# Setup Guide - The Books World

## Complete Setup Instructions

### Step 1: Database Setup

1. Open XAMPP Control Panel
2. Start Apache and MySQL
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create a new database:
   ```sql
   CREATE DATABASE thebooksworld;
   USE thebooksworld;
   ```

### Step 2: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd TheBooksWorld/backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
   
   Or compile and run:
   ```bash
   mvn compile
   mvn exec:java -Dexec.mainClass="com.thebooksworld.TheBooksWorldApplication"
   ```

4. **Backend will be available at:** `http://localhost:8080`

5. **Check API health:**
   ```bash
   curl http://localhost:8080/api/books
   ```

### Step 3: Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd TheBooksWorld/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Frontend will open at:** `http://localhost:3000`

### Step 4: Access the Application

1. Open your browser to `http://localhost:3000`
2. Click "Sign up" to create a new account
3. Fill in all required information
4. Complete user details on the next page
5. Login with your credentials
6. Browse books and test the application

## Troubleshooting

### Backend Won't Start
- Ensure MySQL is running in XAMPP
- Check if port 8080 is available
- Verify Java/Maven installation: `java -version` and `mvn -version`
- Check application.properties for correct database credentials

### Frontend Won't Connect
- Verify backend is running on port 8080
- Check if proxy is correctly set in package.json
- Clear Node modules and reinstall: `rm -rf node_modules && npm install`
- Check console for CORS errors

### Database Connection Issues
- Verify XAMPP MySQL is started
- Check database exists: `USE thebooksworld;`
- Verify credentials in application.properties (default: root, no password)
- Reset MySQL password if needed

### Port Already in Use
- Check what's using port 3000: `lsof -i :3000` (Linux/Mac) or `netstat -ano | findstr :3000` (Windows)
- Kill the process or use a different port

## Testing the Application

### Test Data
The application comes with pre-populated test books. No manual data entry needed.

### Test Accounts
- Sign up using any email and password meeting requirements
- Test invalid credentials on login

### Test Features
1. Sign up with email
2. Complete user details
3. Login
4. Browse books by category
5. Add books to cart
6. View cart
7. Check all navigation pages

## Default Credentials

- Database: `thebooksworld`
- DB User: `root`
- DB Password: (empty)
- Backend Port: `8080`
- Frontend Port: `3000`

## Project Dependencies

### Backend
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL Connector
- Lombok
- JWT (jjwt-api)
- Jakarta Validation

### Frontend
- React 18.2.0
- React Router DOM 6.16.0
- Axios 1.5.0
- Stripe JS

## Important Notes

1. Always start backend before frontend
2. Ensure XAMPP MySQL is running
3. Database will be auto-created on first run
4. Books data is auto-populated on startup
5. CORS is configured for localhost:3000 only
6. Change JWT secret for production use

## Production Deployment

### Backend
1. Update application.properties with production database
2. Set JWT secret as environment variable
3. Build WAR/JAR file
4. Deploy to application server

### Frontend
1. Build production version: `npm run build`
2. Deploy build folder to web server
3. Update API endpoint in api.js file

---

For issues or questions, refer to main README.md or contact support@thebooksworld.com
