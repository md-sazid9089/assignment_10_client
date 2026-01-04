/**
 * Admin Portal - Manage Users Page
 * 
 * Admin-only page showing all registered users with their activity statistics.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader';

const AdminPortalUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('👥 Admin Users Page: Initializing...');
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log('🔄 Fetching user statistics...');
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'https://assignment10-server-sage-iota.vercel.app/api';
      console.log('📡 API Call: GET /artworks (for user stats)');
      const response = await axios.get(
        `${apiUrl}/artworks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('✅ Processing', response.data.count || response.data.length, 'artworks to generate user stats');

      // Group by user
      const userStats = {};
      const artworks = response.data.data || response.data;
      artworks.forEach(artwork => {
        const userId = artwork.userId;
        if (!userStats[userId]) {
          userStats[userId] = {
            userId,
            email: artwork.artistEmail || 'Unknown',
            name: artwork.artistName || 'Unknown Artist',
            artworkCount: 0,
            totalLikes: 0,
            totalViews: 0,
            lastActive: artwork.createdAt
          };
        }
        userStats[userId].artworkCount++;
        userStats[userId].totalLikes += artwork.likes || 0;
        userStats[userId].totalViews += artwork.views || 0;
        if (new Date(artwork.createdAt) > new Date(userStats[userId].lastActive)) {
          userStats[userId].lastActive = artwork.createdAt;
        }
      });

      const userList = Object.values(userStats);
      setUsers(userList);
      console.log('✅ User statistics calculated for', userList.length, 'users');
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      let errorMsg = 'Failed to load user statistics. ';
      if (error.code === 'ERR_NETWORK') {
        errorMsg += 'Cannot connect to server. Check if backend is running on port 5000.';
      } else if (error.response?.status === 401) {
        errorMsg += 'Authentication failed. Please log in again.';
      } else {
        errorMsg += error.message;
      }
      
      alert('❌ Error Loading Users\n\n' + errorMsg + '\n\nCheck browser console for details.');
    } finally {
      setLoading(false);
      console.log('🏁 User statistics loading completed');
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower);
  });

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage All Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View and monitor all registered users</p>
        </div>
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
          <p className="text-sm font-bold text-red-800 dark:text-red-300">ADMIN ACCESS</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-blue-100">Total Users</h3>
          <p className="text-4xl font-bold">{users.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-purple-100">Active Users (30d)</h3>
          <p className="text-4xl font-bold">
            {users.filter(u => {
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              return new Date(u.lastActive) > thirtyDaysAgo;
            }).length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-pink-100">Avg. Artworks/User</h3>
          <p className="text-4xl font-bold">
            {users.length > 0 ? Math.round(users.reduce((sum, u) => sum + u.artworkCount, 0) / users.length) : 0}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Artworks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total Likes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((userData, index) => (
                <motion.tr
                  key={userData.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                    {userData.artworkCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    ❤️ {userData.totalLikes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    👁️ {userData.totalViews}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(userData.lastActive).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPortalUsers;
