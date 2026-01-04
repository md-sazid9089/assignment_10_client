/**
 * Site Statistics Page (Admin Only)
 * 
 * Admin dashboard page showing:
 * - Platform-wide statistics and metrics
 * - Growth trends and analytics
 * - Category performance
 * - User engagement metrics
 * 
 * This page is accessible to admins only
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Loader from '../../components/Loader';

const SiteStatistics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalLikes: 0,
    totalViews: 0,
    totalUsers: 0,
    avgLikesPerArtwork: 0,
    avgViewsPerArtwork: 0,
    engagementRate: 0
  });

  useEffect(() => {
    fetchSiteStatistics();
  }, []);

  const fetchSiteStatistics = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      
      // Fetch all artworks
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artworks`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const allArtworks = response.data;
      setArtworks(allArtworks);

      // Calculate statistics
      const totalArtworks = allArtworks.length;
      const totalLikes = allArtworks.reduce((sum, art) => sum + (art.likes || 0), 0);
      const totalViews = allArtworks.reduce((sum, art) => sum + (art.views || 0), 0);
      
      // Count unique users
      const uniqueUsers = new Set(allArtworks.map(art => art.userId)).size;

      setStats({
        totalArtworks,
        totalLikes,
        totalViews,
        totalUsers: uniqueUsers,
        avgLikesPerArtwork: totalArtworks > 0 ? Math.round(totalLikes / totalArtworks) : 0,
        avgViewsPerArtwork: totalArtworks > 0 ? Math.round(totalViews / totalArtworks) : 0,
        engagementRate: totalViews > 0 ? Math.round((totalLikes / totalViews) * 100) : 0
      });
    } catch (error) {
      console.error('Error fetching site statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const categoryDistribution = () => {
    const categoryCount = {};
    artworks.forEach(artwork => {
      const category = artwork.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  };

  const categoryPerformance = () => {
    const categoryStats = {};
    artworks.forEach(artwork => {
      const category = artwork.category || 'Uncategorized';
      if (!categoryStats[category]) {
        categoryStats[category] = { category, likes: 0, views: 0 };
      }
      categoryStats[category].likes += artwork.likes || 0;
      categoryStats[category].views += artwork.views || 0;
    });
    return Object.values(categoryStats);
  };

  const monthlyGrowth = () => {
    const monthlyData = {};
    const now = new Date();
    
    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = { month: monthKey, artworks: 0, likes: 0, views: 0 };
    }

    // Populate with data
    artworks.forEach(artwork => {
      const date = new Date(artwork.createdAt);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].artworks++;
        monthlyData[monthKey].likes += artwork.likes || 0;
        monthlyData[monthKey].views += artwork.views || 0;
      }
    });

    return Object.values(monthlyData);
  };

  const topArtists = () => {
    const artistStats = {};
    artworks.forEach(artwork => {
      const artistName = artwork.artistName || 'Unknown';
      if (!artistStats[artistName]) {
        artistStats[artistName] = { name: artistName, artworks: 0, totalLikes: 0 };
      }
      artistStats[artistName].artworks++;
      artistStats[artistName].totalLikes += artwork.likes || 0;
    });

    return Object.values(artistStats)
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, 5)
      .map(artist => ({
        name: artist.name.length > 15 ? artist.name.substring(0, 15) + '...' : artist.name,
        artworks: artist.artworks,
        likes: artist.totalLikes
      }));
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Site Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Platform-wide analytics and performance metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h3 className="text-blue-100 text-sm font-medium mb-2">Total Artworks</h3>
          <p className="text-4xl font-bold mb-2">{stats.totalArtworks}</p>
          <p className="text-blue-100 text-sm">Platform-wide</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h3 className="text-purple-100 text-sm font-medium mb-2">Total Engagement</h3>
          <p className="text-4xl font-bold mb-2">{stats.totalLikes}</p>
          <p className="text-purple-100 text-sm">Total Likes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h3 className="text-pink-100 text-sm font-medium mb-2">Total Views</h3>
          <p className="text-4xl font-bold mb-2">{stats.totalViews}</p>
          <p className="text-pink-100 text-sm">Platform-wide</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h3 className="text-amber-100 text-sm font-medium mb-2">Active Artists</h3>
          <p className="text-4xl font-bold mb-2">{stats.totalUsers}</p>
          <p className="text-amber-100 text-sm">Contributing users</p>
        </motion.div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 dark:text-white font-semibold">Avg. Likes/Artwork</h3>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgLikesPerArtwork}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 dark:text-white font-semibold">Avg. Views/Artwork</h3>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgViewsPerArtwork}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 dark:text-white font-semibold">Engagement Rate</h3>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.engagementRate}%</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Growth Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyGrowth()}>
              <defs>
                <linearGradient id="colorArtworks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="artworks"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorArtworks)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Engagement by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="likes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Artists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top 5 Artists
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topArtists()} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="likes" fill="#ec4899" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteStatistics;
