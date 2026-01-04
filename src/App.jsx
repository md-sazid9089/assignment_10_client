import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminPortalLayout from './layouts/AdminPortalLayout'
import Home from './pages/Home'
import ExploreArtworks from './pages/ExploreArtworks'
import AddArtwork from './pages/AddArtwork'
import MyGallery from './pages/MyGallery'
import MyFavorites from './pages/MyFavorites'
import ArtworkDetails from './pages/ArtworkDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ThemeAnimationDemo from './pages/ThemeAnimationDemo'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

// Dashboard Pages
import Overview from './pages/dashboard/Overview'
import MyArtworks from './pages/dashboard/MyArtworks'
import MyStatistics from './pages/dashboard/MyStatistics'
import AllArtworks from './pages/dashboard/AllArtworks'
import AllUsers from './pages/dashboard/AllUsers'
import SiteStatistics from './pages/dashboard/SiteStatistics'

// Admin Portal Pages (Isolated for admin123@gmail.com only)
import AdminPortalOverview from './pages/admin-portal/AdminPortalOverview'
import AdminPortalArtworks from './pages/admin-portal/AdminPortalArtworks'
import AdminPortalUsers from './pages/admin-portal/AdminPortalUsers'
import AdminPortalStatistics from './pages/admin-portal/AdminPortalStatistics'

function App() {
  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<ExploreArtworks />} />
        <Route path="contact" element={<Contact />} />
        <Route path="demo" element={<ThemeAnimationDemo />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="add-artwork" element={
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        } />
        <Route path="my-gallery" element={
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        } />
        <Route path="my-favorites" element={
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        } />
        <Route path="artworks/:id" element={
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        } />
      </Route>

      {/* Dashboard routes with dashboard layout (isolated module) */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        {/* Common dashboard routes (accessible to all authenticated users) */}
        <Route index element={<Overview />} />
        <Route path="my-artworks" element={<MyArtworks />} />
        <Route path="my-stats" element={<MyStatistics />} />
        
        {/* Admin-only dashboard routes */}
        <Route path="all-artworks" element={
          <AdminRoute>
            <AllArtworks />
          </AdminRoute>
        } />
        <Route path="all-users" element={
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        } />
        <Route path="site-stats" element={
          <AdminRoute>
            <SiteStatistics />
          </AdminRoute>
        } />
      </Route>

      {/* 
        ADMIN PORTAL ROUTES - ISOLATED FOR admin123@gmail.com ONLY
        This opens in a SEPARATE WINDOW when admin logs in.
        NO regular user routes, menus, or UI are accessible here.
        Only admin-specific functionality is available.
      */}
      <Route path="/admin-portal" element={<AdminPortalLayout />}>
        <Route index element={<AdminPortalOverview />} />
        <Route path="artworks" element={<AdminPortalArtworks />} />
        <Route path="users" element={<AdminPortalUsers />} />
        <Route path="statistics" element={<AdminPortalStatistics />} />
      </Route>

      {/* 404 route without layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
