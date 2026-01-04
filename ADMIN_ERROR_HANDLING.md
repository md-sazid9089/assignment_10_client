# Admin Portal - Error Handling & Debugging Guide

## 🎯 Overview

This document explains the comprehensive error handling system implemented for the admin portal login and functionality. The system includes console logs, alerts, and meaningful error messages to help debug issues and provide clear feedback to users.

---

## 🔐 Admin Login Flow with Error Handling

### **Login Credentials**
- **Email:** `admin123@gmail.com`
- **Password:** `admin@123`

### **Login Process Console Logs**

When you attempt to login, check the browser console for these logs:

```
🔐 Login attempt: { email, timestamp }
📡 Calling Firebase signIn...
✅ Firebase authentication successful: admin123@gmail.com
🔑 Admin user detected! Opening Admin Portal in new window...
📋 Admin credentials verified: { email: 'admin123@gmail.com', role: 'admin' }
✅ Admin portal window opened successfully
🔓 Login process completed, loading state reset
```

---

## ⚠️ Error Scenarios & Messages

### **1. Invalid Credentials**

**Console Output:**
```
❌ Login failed: FirebaseError
Error code: auth/invalid-credential
Error message: [detailed Firebase error]
```

**User Alert:**
```
❌ Invalid Credentials

The email or password you entered is incorrect.

For admin access, use:
Email: admin123@gmail.com
Password: admin@123
```

---

### **2. Popup Blocker Issue**

**Console Output:**
```
✅ Firebase authentication successful
🔑 Admin user detected! Opening Admin Portal...
❌ Failed to open admin portal window - popup blocked
🔄 Fallback: Navigating to admin portal in same window
```

**User Alert:**
```
⚠️ Popup Blocked!

Your browser blocked the admin portal window.

Please allow popups for this site and try again.

Alternatively, navigate to /admin-portal manually.
```

**Solution:** Enable popups in your browser settings for this domain, then login again.

---

### **3. Network Error During Login**

**Console Output:**
```
❌ Login failed: Error
Error code: auth/network-request-failed
```

**User Alert:**
```
❌ Network Error

Please check your internet connection and try again.
```

---

### **4. Too Many Failed Login Attempts**

**Console Output:**
```
❌ Login failed: FirebaseError
Error code: auth/too-many-requests
```

**User Alert:**
```
❌ Too Many Attempts

Account temporarily locked due to too many failed login attempts.

Please try again later.
```

---

## 🔍 Admin Portal Access Verification

### **AuthContext Role Assignment**

**Console Logs:**
```
🔍 Setting up Firebase auth state observer...
👤 User authenticated: admin123@gmail.com
📝 Default role assigned: user
🔑 ADMIN ROLE ASSIGNED to: admin123@gmail.com
✅ Admin privileges granted - user can access admin portal
👤 Current user object: { email, displayName, role, uid }
✅ Auth state updated successfully
```

### **AdminPortalLayout Security Check**

**Console Logs (Authorized Access):**
```
🔐 Admin Portal Layout Mounted
📊 Auth State: { user: 'admin123@gmail.com', role: 'admin', loading: false }
```

**Console Logs (Unauthorized Access):**
```
🔐 Admin Portal Layout Mounted
📊 Auth State: { user: 'user@example.com', role: 'user', loading: false }
❌ UNAUTHORIZED ACCESS ATTEMPT to Admin Portal
📧 User email: user@example.com
🚫 Access denied - admin portal is restricted to admin123@gmail.com only
```

**User Alert (Unauthorized):**
```
❌ Access Denied

You do not have permission to access the Admin Portal.

Only authorized administrators can access this area.

User: user@example.com
```

---

## 📊 API Error Handling

### **Admin Overview Page**

**Console Logs (Success):**
```
📊 Admin Portal Overview: Initializing...
👤 Admin user: admin123@gmail.com
🔄 Fetching admin statistics...
🔑 Getting Firebase ID token...
✅ Token acquired successfully
📡 Calling API: http://localhost:5000/artworks
✅ API Response received: 25 artworks
✅ Admin stats calculated: { totalArtworks: 25, totalUsers: 5, ... }
🏁 Admin stats loading completed
```

**Error: Backend Server Not Running**

**Console Logs:**
```
❌ Error fetching admin stats: AxiosError
Error details: { message: 'Network Error', response: undefined, status: undefined }
```

**User Alert:**
```
❌ Failed to Load Admin Statistics

Network error. Please check your connection and ensure the server is running on port 5000.
```

**Solution:** 
1. Navigate to backend directory: `cd assignment10_server`
2. Start server: `npm start`
3. Verify server is running on `http://localhost:5000`

---

### **Manage Artworks Page**

**Console Logs (Delete Operation):**
```
🎨 Admin Artworks Page: Initializing...
🔄 Fetching all artworks for admin moderation...
📡 API Call: GET /artworks
✅ Fetched 25 artworks
🗑️ Delete request for artwork: artwork_123
✅ Delete confirmed by admin
📡 API Call: DELETE /artworks/artwork_123
✅ Artwork deleted successfully
```

**Error: Delete Failed (404)**

**Console Logs:**
```
❌ Error deleting artwork: AxiosError
Delete error details: { artworkId: 'artwork_123', status: 404, message: 'Not Found' }
```

**User Alert (SweetAlert):**
```
Delete Failed

Failed to delete artwork. Artwork not found.

Check console for detailed error logs
```

---

### **Manage Users Page**

**Console Logs:**
```
👥 Admin Users Page: Initializing...
🔄 Fetching user statistics...
📡 API Call: GET /artworks (for user stats)
✅ Processing 25 artworks to generate user stats
✅ User statistics calculated for 5 users
🏁 User statistics loading completed
```

**Error: Authentication Failed (401)**

**Console Logs:**
```
❌ Error fetching user data: AxiosError
Error details: { message: 'Unauthorized', status: 401, data: {...} }
```

**User Alert:**
```
❌ Error Loading Users

Failed to load user statistics. Authentication failed. Please log in again.

Check browser console for details.
```

---

### **Platform Statistics Page**

**Console Logs:**
```
📈 Admin Statistics Page: Initializing...
🔄 Fetching platform statistics...
📡 API Call: GET /artworks (for statistics)
✅ Fetched 25 artworks for statistical analysis
📊 Statistics calculated successfully
🏁 Statistics loading completed
```

**Error: Server Error (500)**

**Console Logs:**
```
❌ Error fetching statistics: AxiosError
Error details: { message: 'Internal Server Error', status: 500, data: {...} }
```

**User Alert:**
```
❌ Statistics Loading Failed

Failed to load platform statistics.

Server Error: Database connection failed.
Check server logs for details.

Check console for detailed logs.
```

---

## 🔧 Debugging Checklist

### **Before Testing Admin Login:**

1. ✅ **Backend Server Running**
   ```bash
   cd assignment10_server
   npm start
   # Should see: Server running on port 5000
   ```

2. ✅ **Frontend Dev Server Running**
   ```bash
   cd assignment_10_client
   npm run dev
   # Should see: Local: http://localhost:5173
   ```

3. ✅ **Environment Variables Set**
   - Check `assignment_10_client/.env` exists
   - Contains: `VITE_API_URL=http://localhost:5000`

4. ✅ **Browser Console Open**
   - Press `F12` or `Ctrl+Shift+I`
   - Navigate to "Console" tab
   - Watch for emoji-prefixed logs

5. ✅ **Popups Enabled**
   - Check browser settings
   - Allow popups for `localhost:5173`

---

## 🎯 Testing Steps

### **Test 1: Successful Admin Login**

1. Open browser console (`F12`)
2. Navigate to login page
3. Enter:
   - Email: `admin123@gmail.com`
   - Password: `admin@123`
4. Click "Sign In"
5. **Expected:**
   - See console logs with ✅ emojis
   - New window opens with red-themed admin portal
   - Main window redirects to home
   - Alert confirms admin portal opened

### **Test 2: Invalid Admin Credentials**

1. Open console
2. Enter:
   - Email: `admin123@gmail.com`
   - Password: `wrongpassword`
3. Click "Sign In"
4. **Expected:**
   - Console shows ❌ error logs
   - Alert shows "Invalid Credentials" message
   - Hints at correct admin credentials

### **Test 3: Non-Admin User Login**

1. Login with regular user email (not admin123@gmail.com)
2. **Expected:**
   - Normal navigation (no new window)
   - Console shows "Regular user login successful"
   - No admin portal access

### **Test 4: Popup Blocker**

1. Enable popup blocker in browser
2. Login as admin
3. **Expected:**
   - Console shows "popup blocked" error
   - Alert warns about popup blocker
   - Fallback: navigates to admin portal in same window

### **Test 5: Backend Server Down**

1. Stop backend server (`Ctrl+C` in server terminal)
2. Login as admin (new window opens)
3. Navigate to any admin page
4. **Expected:**
   - Console shows "Network Error"
   - Alert says "server is running on port 5000"
   - Clear guidance to start server

### **Test 6: Unauthorized Portal Access**

1. Login as regular user
2. Manually navigate to `/admin-portal` in URL
3. **Expected:**
   - Console shows "UNAUTHORIZED ACCESS ATTEMPT"
   - "Access Denied" screen appears
   - Button to close window

---

## 📝 Console Log Format

All console logs use emoji prefixes for easy filtering:

- 🔐 **Authentication/Security**
- 📡 **API Calls**
- ✅ **Success Operations**
- ❌ **Errors**
- 🔄 **Loading/Fetching**
- 📊 **Data Processing**
- 🔑 **Admin Role/Permissions**
- 👤 **User Information**
- 🗑️ **Delete Operations**
- 🎨 **Artwork Operations**
- 👥 **User Management**
- 📈 **Statistics**
- ⏳ **Loading States**
- 🚪 **Logout Operations**
- 🏁 **Process Completion**

---

## 🚨 Common Issues & Solutions

### **Issue: Admin portal window doesn't open**

**Solutions:**
1. Check popup blocker is disabled
2. Check console for "popup blocked" message
3. Allow popups for the site
4. Refresh and try again
5. Fallback: manually navigate to `/admin-portal`

### **Issue: "Access Denied" in admin portal**

**Solutions:**
1. Verify you logged in with exact email: `admin123@gmail.com`
2. Check console for current user email
3. Logout and login again with correct credentials
4. Clear browser cache

### **Issue: "Network Error" when loading data**

**Solutions:**
1. Check backend server is running: `cd assignment10_server && npm start`
2. Verify server console shows "Server running on port 5000"
3. Check `.env` file has correct `VITE_API_URL`
4. Test API manually: visit `http://localhost:5000/health`

### **Issue: "Authentication failed" errors**

**Solutions:**
1. Check Firebase configuration in `firebase.config.js`
2. Verify Firebase project is active
3. Logout and login again to refresh token
4. Check Firebase console for authentication status

---

## 📖 Related Documentation

- [ADMIN_PORTAL_README.md](./ADMIN_PORTAL_README.md) - Admin portal features and usage
- [DASHBOARD_README.md](./DASHBOARD_README.md) - Regular dashboard documentation
- [README.md](./README.md) - Project setup and overview

---

## ✅ Success Indicators

When everything is working correctly, you should see:

1. ✅ Clean console logs with emoji prefixes
2. ✅ No red error messages in console
3. ✅ Admin portal opens in new window (1400x900)
4. ✅ Red theme in admin portal (not blue)
5. ✅ All admin pages load data successfully
6. ✅ Delete operations work with confirmations
7. ✅ Charts and statistics display correctly
8. ✅ Logout closes admin window

---

**Last Updated:** January 4, 2026
**Version:** 1.0.0
**Maintained by:** GitHub Copilot
