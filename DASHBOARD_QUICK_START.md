# Quick Start Guide - ARTIFY Dashboard

## Accessing the Dashboard

### Step 1: Login to Your Account
1. Go to the login page
2. Sign in with your credentials
3. You'll be redirected to the home page

### Step 2: Navigate to Dashboard
1. Click on your profile avatar in the top-right corner
2. Select "Dashboard" from the dropdown menu
3. You'll be taken to the dashboard overview page

## Dashboard Features by Role

### 👤 Regular Users Can:
- ✅ View personal dashboard overview with statistics
- ✅ Manage their artworks (view, search, filter, delete)
- ✅ View detailed personal statistics with charts
- ✅ See engagement metrics (likes, views, trends)

### 👑 Admin Users Can Do Everything Above Plus:
- ✅ View and moderate all artworks on the platform
- ✅ Manage all users and see their activity
- ✅ Access platform-wide statistics
- ✅ View growth trends and analytics

## How to Become an Admin

**Option 1: Manual Configuration (Development)**
1. Open `src/context/AuthContext.jsx`
2. Find line ~110 in the `useEffect` hook
3. Uncomment and modify:
```javascript
if (currentUser.email === 'your-email@example.com') {
  currentUser.role = 'admin'
}
```
4. Replace with your email address
5. Save and reload the application

**Option 2: Database-Based (Production)**
- Store user roles in your MongoDB database
- Fetch role from backend when user logs in
- Update `currentUser.role` based on database value

## Dashboard Pages Overview

### 📊 Overview (All Users)
- **Location**: `/dashboard`
- **Features**:
  - Summary cards with total artworks, likes, views
  - Monthly growth line chart
  - Category distribution pie chart
  - Category performance bar chart
  - Recent artworks table

### 🎨 My Artworks (All Users)
- **Location**: `/dashboard/my-artworks`
- **Features**:
  - Grid view of all your artworks
  - Search by title or description
  - Filter by category
  - Delete artworks
  - View detailed stats per artwork
  - Quick link to add new artwork

### 📈 My Statistics (All Users)
- **Location**: `/dashboard/my-stats`
- **Features**:
  - Total statistics cards
  - Most liked artwork showcase
  - Most viewed artwork showcase
  - Performance by category chart
  - Top 5 artworks chart

### 🖼️ All Artworks (Admin Only)
- **Location**: `/dashboard/all-artworks`
- **Features**:
  - View all platform artworks
  - Search by title or artist
  - Filter by category
  - Sort by date, likes, views
  - Delete any artwork
  - See artist information

### 👥 All Users (Admin Only)
- **Location**: `/dashboard/all-users`
- **Features**:
  - View all registered users
  - See user statistics
  - Track user activity
  - View total artworks per user
  - See engagement metrics per user

### 📊 Site Statistics (Admin Only)
- **Location**: `/dashboard/site-stats`
- **Features**:
  - Platform-wide metrics
  - 12-month growth trend
  - Category distribution
  - Engagement by category
  - Top 5 artists
  - Engagement rate

## Dashboard Navigation

### Sidebar Menu
The sidebar shows different options based on your role:

**User Role Menu:**
- 🏠 Dashboard (Overview)
- 🎨 My Artworks
- 📈 My Statistics

**Admin Role Menu:**
- 🏠 Dashboard (Overview)
- 🖼️ All Artworks
- 👥 All Users
- 📊 Site Statistics

### Top Navbar
- **ARTIFY Dashboard**: Click to return to main site
- **Menu Toggle**: Click hamburger icon to collapse/expand sidebar
- **Profile Dropdown**:
  - Shows your name and email
  - Displays your role (User or Administrator)
  - Quick link to Dashboard Home
  - Back to Main Site link
  - Logout button

## Tips & Tricks

### 📱 Mobile Responsive
- Dashboard works perfectly on all devices
- Sidebar automatically collapses on mobile
- Tables are horizontally scrollable
- Charts adapt to screen size

### 🎨 Theme Support
- Dashboard inherits theme from main application
- Supports both light and dark modes
- Toggle theme using the button in main navbar
- All charts and UI elements adapt to theme

### ⚡ Performance
- All data is loaded from real backend APIs
- Charts use optimized rendering
- Smooth animations with Framer Motion
- Lazy loading for better performance

### 🔒 Security
- All routes are protected with authentication
- Admin routes have additional role checks
- Unauthorized users see access denied page
- All API calls use Firebase tokens

## Common Actions

### Adding a New Artwork
1. From dashboard, click "Add New Artwork" button in My Artworks
2. Or use the main navbar dropdown → "Add Artwork"
3. Fill in the form and submit

### Viewing Artwork Details
1. Navigate to My Artworks page
2. Click "View" button on any artwork card
3. You'll be taken to the detailed artwork page

### Deleting an Artwork
1. Navigate to My Artworks page
2. Click "Delete" button on the artwork card
3. Confirm deletion in the popup
4. Artwork will be permanently removed

### Viewing Statistics
1. Click "My Statistics" in the sidebar
2. Scroll through various charts and metrics
3. Charts are interactive - hover for details

### Admin: Managing All Artworks
1. Navigate to "All Artworks" (admin sidebar)
2. Use search, filter, and sort options
3. Click "Delete" on any artwork to moderate
4. View artist information in the table

### Admin: Viewing Users
1. Navigate to "All Users" (admin sidebar)
2. See all registered users with their stats
3. Search users by name or email
4. View activity and engagement metrics

## Keyboard Shortcuts

- `Esc` - Close modals and dropdowns
- `/` - Focus search input (when available)

## Troubleshooting

### Can't see admin menu items?
- Make sure you've set your email as admin in AuthContext.jsx
- Logout and login again after making changes
- Check browser console for any errors

### Charts not displaying?
- Check internet connection
- Ensure backend API is running
- Verify you have artworks in the database

### Dashboard not loading?
- Ensure you're logged in
- Check if backend server is running on correct port
- Verify Firebase authentication is working

## Need Help?

Refer to the detailed `DASHBOARD_README.md` for technical documentation and implementation details.

---

**Enjoy your new dashboard! 🎉**
