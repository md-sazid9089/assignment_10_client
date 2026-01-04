# ARTIFY Dashboard Module

## Overview
A fully isolated, role-based dashboard system for the Artify application. The dashboard provides comprehensive analytics, artwork management, and user administration features without affecting existing application code or routes.

## Features

### For All Users
- **Dashboard Overview**: Summary cards showing total artworks, likes, views, and engagement metrics
- **My Artworks**: Manage personal artworks with CRUD operations, search, and filtering
- **My Statistics**: Detailed analytics with charts showing performance by category, top artworks, and trends

### For Administrators
- **All Artworks**: View and moderate all artworks across the platform
- **All Users**: User management with statistics and activity tracking
- **Site Statistics**: Platform-wide analytics with growth trends, category distribution, and top performers

## Role-Based Access Control (RBAC)

### User Roles
1. **User** (Default): Access to personal dashboard and artwork management
2. **Admin**: Full access to all dashboard features including user and site management

### Setting Admin Role
To set a user as an admin, edit `src/context/AuthContext.jsx`:

```javascript
// Find this section in AuthContext.jsx (around line 110)
if (currentUser) {
  currentUser.role = 'user'
  
  // Uncomment and modify this to make a user admin:
  if (currentUser.email === 'your-email@example.com') {
    currentUser.role = 'admin'
  }
}
```

Replace `'your-email@example.com'` with your Firebase account email.

## Dashboard Structure

```
dashboard/
├── layouts/
│   └── DashboardLayout.jsx        # Layout with navbar and sidebar
├── pages/dashboard/
│   ├── Overview.jsx               # Main dashboard (all users)
│   ├── MyArtworks.jsx             # User artworks management
│   ├── MyStatistics.jsx           # User statistics
│   ├── AllArtworks.jsx            # Admin: All artworks
│   ├── AllUsers.jsx               # Admin: User management
│   └── SiteStatistics.jsx         # Admin: Platform analytics
└── components/
    └── AdminRoute.jsx             # Role-based route protection
```

## Routes

### User Routes (All authenticated users)
- `/dashboard` - Dashboard overview with charts and statistics
- `/dashboard/my-artworks` - Personal artwork management
- `/dashboard/my-stats` - Personal statistics and analytics

### Admin Routes (Admin users only)
- `/dashboard/all-artworks` - All platform artworks
- `/dashboard/all-users` - User management
- `/dashboard/site-stats` - Platform-wide statistics

## Features in Detail

### Dashboard Layout
- **Top Navbar**: 
  - App branding
  - Profile dropdown with quick actions
  - Logout functionality
- **Sidebar**:
  - Dynamic menu based on user role
  - Collapsible for better space utilization
  - Active link highlighting

### Overview Page
- **Summary Cards**: Display key metrics with gradient backgrounds
- **Charts**:
  - Line chart for monthly trends
  - Pie chart for category distribution
  - Bar chart for category comparison
- **Recent Artworks Table**: Displays latest artworks with engagement metrics

### My Artworks Page
- **CRUD Operations**: Create, read, update, and delete artworks
- **Search**: Filter by title or description
- **Category Filter**: Filter artworks by category
- **Statistics**: View likes and views for each artwork

### My Statistics Page
- **Performance Metrics**: Total artworks, likes, views, and averages
- **Best Performers**: Highlight most liked and most viewed artworks
- **Charts**:
  - Category performance comparison
  - Top 5 artworks by engagement

### Admin Pages
- **All Artworks**: 
  - View all platform artworks
  - Advanced sorting and filtering
  - Bulk moderation capabilities
- **All Users**: 
  - User activity tracking
  - Statistics per user
  - Active users identification
- **Site Statistics**:
  - Platform growth trends
  - Category distribution
  - Top artists
  - Engagement metrics

## Technologies Used

- **React Router 6**: For nested routing
- **Recharts**: For interactive charts and graphs
- **Framer Motion**: For smooth animations
- **Tailwind CSS**: For responsive styling
- **DaisyUI**: For UI components
- **Axios**: For API calls

## API Integration

The dashboard integrates with existing backend APIs:
- `GET /artworks` - Fetch all artworks (filtered by role)
- `DELETE /artworks/:id` - Delete an artwork

All API calls are authenticated using Firebase ID tokens.

## Styling

The dashboard follows the same theme system as the main application:
- Light mode with blue/cyan/amber palette
- Dark mode with indigo/purple/pink palette
- Smooth transitions between themes
- Consistent with existing design language

## Security

- All dashboard routes are protected with `PrivateRoute`
- Admin routes have additional `AdminRoute` protection
- Firebase authentication required
- Role-based access control at component level
- Sidebar menu dynamically renders based on user role

## Future Enhancements

Potential improvements:
1. Real-time updates using WebSockets
2. Export data to CSV/PDF
3. Advanced filtering with date ranges
4. Notification system
5. User roles management interface
6. Activity logs and audit trails
7. Customizable dashboard widgets

## Notes

- This dashboard is completely isolated and doesn't affect existing routes or functionality
- All existing pages (Home, Explore, Contact, etc.) remain unchanged
- The dashboard can be accessed via the user dropdown menu in the main navbar
- Default user role is 'user' - admin role must be set manually in AuthContext.jsx
- All charts use real backend data, not dummy data
- The dashboard is fully responsive and works on all devices

## Support

For issues or questions, refer to the main project documentation or contact the development team.
