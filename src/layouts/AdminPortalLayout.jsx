/**
 * Admin Portal Layout
 * 
 * This is an ISOLATED layout for admin users only.
 * Opens in a NEW BROWSER WINDOW when admin123@gmail.com logs in.
 * 
 * Features:
 * - Separate window with no regular user UI
 * - Admin-only sidebar menu
 * - Admin-only navbar
 * - No access to regular user routes/pages
 * 
 * This layout is completely isolated from regular dashboard and main site.
 */

import { useState } from 'react';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPortalLayout = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Log admin portal access attempt for debugging
  console.log('🔐 Admin Portal Layout Mounted');
  console.log('📊 Auth State:', { 
    user: user?.email, 
    role: user?.role, 
    loading,
    timestamp: new Date().toISOString() 
  });

  // Show loading state while checking auth
  if (loading) {
    console.log('⏳ Waiting for auth state to load...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
            Loading Admin Portal...
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Verifying administrator credentials
          </p>
        </div>
      </div>
    );
  }

  // SECURITY: Only allow admin123@gmail.com to access this layout
  // Redirect any non-admin user who somehow reaches this route
  if (!user || user.email !== 'admin123@gmail.com') {
    console.error('❌ UNAUTHORIZED ACCESS ATTEMPT to Admin Portal');
    console.error('📧 User email:', user?.email || 'Not logged in');
    console.error('🚫 Access denied - admin portal is restricted to admin123@gmail.com only');
    
    // Alert the user
    alert('❌ Access Denied\n\nYou do not have permission to access the Admin Portal.\n\nOnly authorized administrators can access this area.\n\nUser: ' + (user?.email || 'Not logged in'));
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full text-center p-8">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This is an admin-only portal. Only authorized administrators can access this area.
          </p>
          <button
            onClick={() => window.close()}
            className="btn btn-primary"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  // Handle logout - close admin window
  const handleLogout = async () => {
    console.log('🚪 Admin logout initiated');
    try {
      await logOut();
      console.log('✅ Logout successful, closing admin portal window');
      alert('✅ Logged Out\n\nYou have been successfully logged out.\n\nAdmin portal window will close now.');
      window.close(); // Close admin portal window
    } catch (error) {
      console.error('❌ Logout error:', error);
      console.error('Error details:', error.message);
      alert('❌ Logout Error\n\nFailed to log out: ' + error.message + '\n\nPlease try again.');
    }
  };

  // Admin-only menu items
  const adminMenuItems = [
    {
      name: 'Admin Overview',
      path: '/admin-portal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'Manage Artworks',
      path: '/admin-portal/artworks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Manage Users',
      path: '/admin-portal/users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      name: 'Platform Statistics',
      path: '/admin-portal/statistics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 border-b border-red-800 shadow-2xl">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Admin Portal Branding */}
              <div className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white flex items-center gap-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  ARTIFY Admin Portal
                </span>
              </div>
            </div>

            {/* Admin Profile Dropdown */}
            <div className="flex items-center">
              <div className="flex items-center ml-3 relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 text-sm bg-red-800 rounded-lg hover:bg-red-900 focus:ring-4 focus:ring-red-300 text-white transition-all"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email)}&background=dc2626&color=fff`}
                    alt="Admin"
                  />
                  <span className="font-semibold hidden md:block">Administrator</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-800 dark:divide-gray-600 min-w-[250px]"
                    >
                      <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20">
                        <p className="text-sm text-gray-900 dark:text-white font-bold flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          {user?.displayName || 'Admin User'}
                        </p>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate mt-1">
                          {user?.email}
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full bg-red-600 text-white">
                          SUPER ADMIN
                        </span>
                      </div>
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/admin-portal"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              window.close(); // Close admin portal window
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            Close Admin Portal
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 font-semibold"
                          >
                            Logout & Close
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-xs font-semibold text-red-800 dark:text-red-300 uppercase tracking-wide">
              Admin Control Panel
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Full system access
            </p>
          </div>
          
          <ul className="space-y-2 font-medium">
            {adminMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === '/admin-portal'}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg group transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-gray-900 dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'
                    }`
                  }
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Admin Info Panel */}
          <div className="mt-6 p-4 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-lg border border-red-200 dark:border-red-700">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-bold text-red-800 dark:text-red-300">Admin Notice</h3>
            </div>
            <p className="text-xs text-red-700 dark:text-red-400">
              This is an isolated admin portal. Regular users cannot access this window.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${sidebarOpen ? 'sm:ml-64' : ''} pt-20 transition-all`}>
        <div className="p-6 border-2 border-red-200 dark:border-red-800 border-dashed rounded-lg min-h-[calc(100vh-6rem)] bg-white dark:bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPortalLayout;
