# Admin Portal - Isolated Admin Window Feature

## 🎯 Overview

This feature implements a **completely isolated admin portal** that opens in a **separate browser window** when the specific admin user (`admin123@gmail.com`) logs in. Regular users continue to access their normal dashboards in the main window, while admin users get a dedicated admin interface in a new window.

---

## 🔐 Admin Credentials

**Email:** `admin123@gmail.com`  
**Password:** `admin@123`

When these credentials are used to log in, the system:
1. Authenticates the user
2. Opens a NEW BROWSER WINDOW with the admin portal
3. Redirects the main window to the home page
4. Admin works in the separate window with admin-only features

---

## ✨ Key Features

### 1. **Separate Window Experience**
- Admin portal opens in a new browser window (1400x900)
- Completely isolated from regular user interface
- No regular user routes, menus, or UI elements
- Dedicated admin branding and theme (red accent colors)

### 2. **Role-Based Access Control**
- Only `admin123@gmail.com` can access admin portal
- Role automatically set in AuthContext based on email
- Security checks at layout and component level
- Unauthorized users see access denied message

### 3. **Admin-Only Features**
- **Admin Overview:** Platform-wide statistics and quick actions
- **Manage Artworks:** View, search, filter, and delete ALL artworks
- **Manage Users:** View all registered users with activity stats
- **Platform Statistics:** Comprehensive analytics with charts

### 4. **Visual Distinction**
- Red gradient navbar (vs regular blue theme)
- "ADMIN ACCESS" badges on pages
- Shield icon branding
- Different color scheme for admin identity

---

## 📁 File Structure

```
assignment_10_client/
├── src/
│   ├── layouts/
│   │   └── AdminPortalLayout.jsx          # Isolated admin layout
│   ├── pages/
│   │   └── admin-portal/
│   │       ├── AdminPortalOverview.jsx    # Admin dashboard overview
│   │       ├── AdminPortalArtworks.jsx    # Manage all artworks
│   │       ├── AdminPortalUsers.jsx       # Manage all users
│   │       └── AdminPortalStatistics.jsx  # Platform analytics
│   ├── context/
│   │   └── AuthContext.jsx                # Modified: admin role detection
│   └── pages/
│       └── Login.jsx                      # Modified: opens admin window
```

---

## 🔧 Implementation Details

### 1. **AuthContext Modification**
Located at: `src/context/AuthContext.jsx` (Line ~110)

```javascript
// Automatically set role to 'admin' for admin123@gmail.com
if (currentUser.email === 'admin123@gmail.com') {
  currentUser.role = 'admin'
}
```

### 2. **Login Page Enhancement**
Located at: `src/pages/Login.jsx`

```javascript
// After successful login, check if admin
if (email === 'admin123@gmail.com') {
  // Open admin portal in NEW WINDOW
  const adminWindow = window.open(
    '/admin-portal',
    'AdminPortal',
    'width=1400,height=900,menubar=no,toolbar=no'
  )
  adminWindow.focus()
  
  // Main window goes to home
  navigate('/', { replace: true })
} else {
  // Regular users: normal flow
  navigate(from, { replace: true })
}
```

### 3. **Admin Portal Layout**
Located at: `src/layouts/AdminPortalLayout.jsx`

**Features:**
- Red gradient navbar with admin branding
- Security check: only admin123@gmail.com allowed
- Dynamic sidebar with admin menu items
- Profile dropdown with admin indicators
- Close window functionality

**Security:**
```javascript
// Layout-level security check
if (!user || user.email !== 'admin123@gmail.com') {
  return <AccessDeniedMessage />
}
```

### 4. **Admin Portal Routes**
Located at: `src/App.jsx`

```javascript
// Isolated admin portal routes
<Route path="/admin-portal" element={<AdminPortalLayout />}>
  <Route index element={<AdminPortalOverview />} />
  <Route path="artworks" element={<AdminPortalArtworks />} />
  <Route path="users" element={<AdminPortalUsers />} />
  <Route path="statistics" element={<AdminPortalStatistics />} />
</Route>
```

---

## 🚀 How It Works

### Step-by-Step Flow:

1. **User visits login page** (`/login`)

2. **User enters credentials:**
   - Email: `admin123@gmail.com`
   - Password: `admin@123`

3. **Login page detects admin email:**
   - Calls Firebase authentication
   - Waits for successful login

4. **After successful authentication:**
   - `AuthContext` sets `currentUser.role = 'admin'`
   - Login page opens NEW WINDOW: `window.open('/admin-portal', ...)`
   - New window loads with `AdminPortalLayout`
   - Main window navigates to home page (`/`)

5. **Admin works in separate window:**
   - Can manage artworks, users, view statistics
   - Has full platform access
   - No regular user UI elements visible

6. **When admin logs out:**
   - Admin window closes automatically
   - Main window remains accessible

---

## 🎨 Admin Portal Pages

### 1. **Admin Overview** (`/admin-portal`)
- Welcome message with admin name
- 4 summary cards: Total Artworks, Users, Likes, Views
- 3 quick action cards linking to other admin pages
- Recent artworks table
- Platform health indicators

### 2. **Manage Artworks** (`/admin-portal/artworks`)
- View ALL artworks from ALL users
- Search by title or artist name
- Filter by category
- Sort by date, likes, views
- Delete any artwork with confirmation
- Artist information displayed

### 3. **Manage Users** (`/admin-portal/users`)
- View all registered users
- User statistics (artworks, likes, views)
- Search by name or email
- Last active date tracking
- Activity metrics
- Active users calculation (30-day window)

### 4. **Platform Statistics** (`/admin-portal/statistics`)
- Platform-wide metrics
- Monthly growth trend (12 months)
- Category distribution pie chart
- Monthly engagement bar chart
- Interactive recharts visualizations
- Comprehensive analytics

---

## 🔒 Security Features

### Multi-Layer Protection:

1. **Email-Based Check:**
   - Login page checks email before opening window
   - Only `admin123@gmail.com` triggers admin window

2. **Role Assignment:**
   - AuthContext assigns role based on email
   - Happens automatically on authentication

3. **Layout-Level Guard:**
   - AdminPortalLayout checks user email
   - Shows access denied if not admin
   - Provides "Close Window" button

4. **Route Isolation:**
   - Admin routes completely separate from regular routes
   - No cross-contamination between user types
   - Different layouts prevent UI mixing

---

## 🎯 Regular User Experience

**Regular users are NOT affected:**
- Login works normally
- Navigate to their dashboards as usual
- No admin portal access or visibility
- Regular dashboard routes work identically
- Main site navigation unchanged

**Existing features preserved:**
- Regular dashboard (`/dashboard`)
- My Artworks, My Statistics pages
- All existing CRUD operations
- User-specific filtering

---

## 🌐 Window Management

### Admin Window Properties:
```javascript
window.open(
  '/admin-portal',           // URL
  'AdminPortal',             // Window name
  'width=1400,height=900,    // Dimensions
   menubar=no,               // No menu bar
   toolbar=no,               // No toolbar
   location=no,              // No address bar
   status=no'                // No status bar
)
```

### Closing Admin Window:
- **Logout button:** Closes window automatically
- **Close Portal button:** In profile dropdown
- **Manual close:** User can close window normally
- **Auto-close:** On logout

---

## 📊 Data Access

### Admin Portal APIs:
- Uses same backend endpoints as regular dashboard
- Admin sees ALL data (no filtering by userId)
- Regular users see only their data
- Backend doesn't need modification
- Frontend handles role-based filtering

### Example:
```javascript
// Admin portal fetches all artworks
const response = await axios.get('/artworks', {
  headers: { Authorization: `Bearer ${token}` }
})
// Shows ALL artworks to admin

// Regular user dashboard
const myArtworks = artworks.filter(
  art => art.userId === user.uid
)
// Shows only user's artworks
```

---

## 🎨 Visual Design

### Admin Portal Theme:
- **Primary Color:** Red (#dc2626)
- **Navbar:** Red gradient
- **Sidebar:** Red highlights on active items
- **Badges:** Red "ADMIN ACCESS" indicators
- **Icons:** Shield icon for security
- **Cards:** Red accents

### Regular Dashboard Theme:
- **Primary Color:** Blue/Purple (unchanged)
- **Maintains existing design**
- **No red elements**

---

## 🧪 Testing Instructions

### Test Admin Login:
1. Go to `/login`
2. Enter:
   - Email: `admin123@gmail.com`
   - Password: `admin@123`
3. Click "Sign In"
4. **Expected:** New window opens with admin portal
5. **Expected:** Main window redirects to home

### Test Admin Features:
1. In admin window, click "Manage Artworks"
2. **Expected:** See ALL artworks from ALL users
3. Try deleting an artwork
4. **Expected:** Confirmation dialog, successful deletion
5. Check "Manage Users" page
6. **Expected:** See all registered users with stats

### Test Regular User:
1. Go to `/login` in main window
2. Enter regular user credentials
3. Click "Sign In"
4. **Expected:** Normal navigation (no new window)
5. **Expected:** Regular dashboard access

### Test Security:
1. As regular user, try accessing `/admin-portal`
2. **Expected:** Access denied message
3. Try opening admin portal URL manually
4. **Expected:** Blocked if not admin123@gmail.com

---

## 🐛 Troubleshooting

### Admin window doesn't open:
- Check popup blocker settings
- Ensure JavaScript is enabled
- Verify email is exactly `admin123@gmail.com`
- Check browser console for errors

### Access denied in admin portal:
- Verify logged in as `admin123@gmail.com`
- Clear browser cache and cookies
- Re-login with correct credentials
- Check AuthContext role assignment

### Data not loading:
- Ensure backend server is running
- Check API endpoint URLs
- Verify Firebase token is valid
- Check network tab for failed requests

---

## 📝 Notes

### Important Points:
1. **Email is case-sensitive:** Must be exactly `admin123@gmail.com`
2. **Password:** `admin@123` (remember the @ symbol)
3. **Window stays open:** Until admin closes or logs out
4. **Main window accessible:** Admin can use both windows
5. **Independent sessions:** Each window maintains its own state

### Limitations:
- Only one admin user supported (by design)
- Window dimensions fixed at creation
- No window state persistence on refresh
- Admin must re-login if window closed

### Future Enhancements:
- Multiple admin users support
- Persistent window preferences
- Window state management
- Advanced admin permissions
- Activity logging

---

## 📚 Related Documentation

- **Main Dashboard:** See `DASHBOARD_README.md`
- **Quick Start:** See `DASHBOARD_QUICK_START.md`
- **Regular Features:** All existing documentation unchanged

---

## ✅ Checklist

After implementation, verify:
- [ ] Admin can login and new window opens
- [ ] Admin window shows only admin UI
- [ ] Regular users cannot access admin portal
- [ ] Admin can manage all artworks
- [ ] Admin can view all users
- [ ] Admin statistics show platform data
- [ ] Logout closes admin window
- [ ] Regular dashboards still work
- [ ] No errors in console
- [ ] All existing features preserved

---

**Admin Portal Implementation Complete! 🎉**

Admin users now have a dedicated, isolated interface while regular users continue their normal experience unaffected.
