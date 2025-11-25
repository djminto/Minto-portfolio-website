# Authentication System Documentation

## Overview
Complete user authentication and profile management system for Minto's Portfolio Website with login, registration, user profiles, and role-based access control.

---

## Files Created/Modified

### New Files
1. **Login.html** - Authentication page with login and registration forms
2. **Auth.css** - Styling for authentication pages
3. **Auth.js** - Authentication logic and user management

### Modified Files
1. **Dashboard.html** - Added user info display and logout button
2. **Dashboard.js** - Added authentication check and logout functionality
3. **Dashboard.css** - Styled user info section and logout button
4. **Homepage.html** - Added user profile widget and login button
5. **Portfolio.js** - Added user login check and profile management
6. **Portfolio.css** - Styled user profile widget and dropdown
7. **Order.js** - Auto-fills user data when logged in

---

## Features

### 1. Login & Registration
- **Login Form**: Email and password authentication
- **Register Form**: Full user registration with firstName, lastName, email, phone, password
- **Password Visibility Toggle**: Show/hide password with eye icon
- **Password Strength Indicator**: Visual feedback for password strength (weak/medium/strong)
- **Demo Login**: Quick access with demo account
- **Remember Me**: Checkbox option (ready for future implementation)
- **3D Welcome Animation**: Rotating cube animation on successful login

### 2. User Roles
- **Admin**: Full access to Dashboard and order management
  - Email: danielminto13@gmail.com
  - Password: admin123
  
- **Customer**: Access to Homepage with profile management
  - Demo Email: demo@example.com
  - Password: demo123

### 3. Profile Management
- **Homepage Profile Widget**: Shows greeting, user name, and profile menu
- **Profile Dropdown**: Quick access to:
  - Edit Profile
  - Order Website
  - Dashboard (admin only)
  - Logout
- **Edit Profile**: Update firstName, lastName, and phone number
- **Auto-fill Order Form**: Pre-fills contact information for logged-in users

### 4. Dashboard Integration
- **Authentication Check**: Redirects non-admin users
- **User Info Display**: Shows logged-in admin details with avatar
- **Logout Button**: Secure logout with confirmation

### 5. Welcome Experience
- **Time-based Greeting**: Good morning/afternoon/evening
- **3D Cube Animation**: Rotating welcome cube with 6 faces
- **Welcome Message**: Personalized greeting with user name
- **Loading Animation**: Smooth transition to homepage/dashboard
- **Auto-redirect**: Admin → Dashboard, Customer → Homepage

---

## How to Use

### For Users (Customers)
1. **Registration**:
   - Click "Create Account" on Login.html
   - Fill in firstName, lastName, email, phone, password
   - Accept terms and conditions
   - Submit to create account
   - Automatically logged in and redirected to Homepage

2. **Login**:
   - Enter email and password
   - Click "Login" button
   - See welcome animation
   - Redirected to Homepage with profile visible

3. **Profile Management**:
   - Click profile button in header
   - Select "Edit Profile" to update details
   - Access order form with pre-filled information

4. **Demo Login**:
   - Click "Login as Demo" button for quick access
   - Uses demo@example.com account

### For Admin (Daniel Minto)
1. **Login**:
   - Email: danielminto13@gmail.com
   - Password: admin123
   - Redirected to Dashboard

2. **Dashboard Access**:
   - View all orders and statistics
   - Manage order status
   - Access revenue reports
   - Logout when finished

---

## Technical Details

### User Data Structure
```javascript
{
  id: 'USER-timestamp',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '876-123-4567',
  password: 'password123', // Note: Plain text (demo only - use hashing in production)
  role: 'customer' or 'admin',
  createdAt: '2024-01-01T00:00:00.000Z',
  profileImage: 'Images/Minto\'s Logo2.png'
}
```

### Storage
- **localStorage.users**: Array of all registered users
- **localStorage.currentUser**: Currently logged-in user object
- **localStorage.orders**: Array of all orders (existing functionality)

### Authentication Flow
1. User submits login form
2. Auth.js searches localStorage.users for matching email/password
3. If found, stores user in localStorage.currentUser
4. Shows welcome modal with 3D animation
5. Redirects based on role:
   - Admin → Dashboard.html
   - Customer → Homepage.html

### Security Notes
⚠️ **Development/Demo Implementation**
- Passwords stored in plain text
- No server-side validation
- localStorage can be manipulated
- For production, implement:
  - Password hashing (bcrypt)
  - Server-side authentication
  - JWT tokens
  - HTTPS
  - Rate limiting

---

## File Locations
All files located in: `c:\Users\Daniel Minto\OneDrive\Desktop\Portfolio website\`

- Login.html
- Auth.css
- Auth.js
- Dashboard.html/css/js (modified)
- Homepage.html (modified)
- Portfolio.css/js (modified)
- Order.js (modified)

---

## Features Summary

✅ **Completed**:
- Login and registration forms
- Password visibility toggle
- Password strength indicator
- Demo account login
- 3D welcome cube animation
- Time-based greetings
- Role-based routing (admin/customer)
- Dashboard authentication check
- User profile widget on homepage
- Profile dropdown menu
- Edit profile functionality
- Logout functionality
- Auto-fill order form for logged-in users
- Admin account initialization
- User session management

---

## Next Steps (Optional Enhancements)
1. Add "Forgot Password" functionality
2. Implement password reset via email
3. Add profile picture upload
4. Create dedicated profile management page
5. Add email verification for new accounts
6. Implement "Remember Me" functionality
7. Add session timeout
8. Create user activity log
9. Add two-factor authentication
10. Implement server-side authentication API

---

## Support
For questions or issues, contact:
- Email: danielminto13@gmail.com
- Instagram: @minto_web_design
- Phone: 876-341-6014

---

**Created**: January 2024  
**Version**: 1.0  
**Status**: Fully Functional (Demo/Development)
