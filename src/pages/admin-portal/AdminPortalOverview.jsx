/**
 * Admin Portal Overview Page
 * 
 * This is the main dashboard page for the ISOLATED ADMIN PORTAL.
 * Only accessible by admin123@gmail.com in the separate admin window.
 * 
 * Shows:
 * - Platform-wide statistics
 * - Admin-level analytics
 * - System health metrics
 * - Quick action cards
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Loader from '../../components/Loader';

const AdminPortalOverview = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalUsers: 0,
    totalLikes: 0,
    totalViews: 0,
    recentArtworks: []
  });

  useEffect(() => {
    console.log('📊 Admin Portal Overview: Initializing...');
    console.log('👤 Admin user:', user?.email);
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    console.log('🔄 Fetching admin statistics...');
    try {
      setLoading(true);
      
      // Get Firebase ID token for authentication
      console.log('🔑 Getting Firebase ID token...');
      const token = await user.getIdToken();
      console.log('✅ Token acquired successfully');
      
      // Fetch all artworks from API
      const apiUrl = import.meta.env.VITE_API_URL || 'https://assignment10-server-sage-iota.vercel.app/api';
      console.log('📡 Calling API:', `${apiUrl}/artworks`);
      const response = await axios.get(
        `${apiUrl}/artworks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('✅ API Response received:', response.data.count, 'artworks');

      const artworks = response.data.data || response.data;
      const uniqueUsers = new Set(artworks.map(art => art.userId)).size;
      const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
      const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
      const recent = artworks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

      setStats({
        totalArtworks: artworks.length,
        totalUsers: uniqueUsers,
        totalLikes,
        totalViews,
        recentArtworks: recent
      });
      
      console.log('✅ Admin stats calculated:', {
        totalArtworks: artworks.length,
        totalUsers: uniqueUsers,
        totalLikes,
        totalViews
      });
    } catch (error) {
      console.error('❌ Error fetching admin stats:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Show user-friendly error alert
      let errorMessage = '❌ Failed to Load Admin Statistics\n\n';
      
      if (error.response?.status === 401) {
        errorMessage += 'Authentication failed. Please log in again.';
      } else if (error.response?.status === 403) {
        errorMessage += 'Access forbidden. You do not have admin permissions.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage += 'Network error. Please check your connection and ensure the server is running on port 5000.';
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please check the backend server logs.';
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
      console.log('🏁 Admin stats loading completed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Admin Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, Administrator</h1>
            <p className="text-red-100 text-lg">Manage and monitor the entire Artify platform</p>
            <p className="text-red-200 text-sm mt-2">Logged in as: {user?.email}</p>
          </div>
          <div className="hidden md:block">
            <svg className="w-24 h-24 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Artworks</p>
              <p className="text-4xl font-bold">{stats.totalArtworks}</p>
              <p className="text-blue-200 text-xs mt-2">Platform-wide</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Total Users</p>
              <p className="text-4xl font-bold">{stats.totalUsers}</p>
              <p className="text-purple-200 text-xs mt-2">Registered artists</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium mb-1">Total Likes</p>
              <p className="text-4xl font-bold">{stats.totalLikes}</p>
              <p className="text-pink-200 text-xs mt-2">Platform engagement</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium mb-1">Total Views</p>
              <p className="text-4xl font-bold">{stats.totalViews}</p>
              <p className="text-amber-200 text-xs mt-2">Total impressions</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/admin-portal/artworks"
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-red-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Manage Artworks</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and moderate all artworks</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/admin-portal/users"
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-red-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Manage Users</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View all registered users</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/admin-portal/statistics"
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-red-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Platform Statistics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View detailed analytics</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Recent Artworks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Artworks</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest additions to the platform</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Artwork</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stats.recentArtworks.map((artwork) => (
                <tr key={artwork._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={artwork.imageURL} alt={artwork.title} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{artwork.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {artwork.artistName || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      {artwork.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    ❤️ {artwork.likes || 0} · 👁️ {artwork.views || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPortalOverview;
