/**
 * My Statistics Page
 * 
 * User dashboard page showing:
 * - Detailed statistics about user's artworks
 * - Performance metrics and trends
 * - Engagement analytics
 * 
 * This page is accessible to all authenticated users
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

const MyStatistics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalLikes: 0,
    totalViews: 0,
    avgLikes: 0,
    avgViews: 0,
    mostLiked: null,
    mostViewed: null
  });

  useEffect(() => {
    fetchStatistics();
  }, [user]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artworks`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Filter user's artworks
      const myArtworks = response.data.filter(artwork => artwork.userId === user.uid);
      setArtworks(myArtworks);

      // Calculate statistics
      if (myArtworks.length > 0) {
        const totalLikes = myArtworks.reduce((sum, art) => sum + (art.likes || 0), 0);
        const totalViews = myArtworks.reduce((sum, art) => sum + (art.views || 0), 0);
        
        // Find most liked and most viewed
        const mostLiked = myArtworks.reduce((prev, current) => 
          (prev.likes || 0) > (current.likes || 0) ? prev : current
        );
        const mostViewed = myArtworks.reduce((prev, current) => 
          (prev.views || 0) > (current.views || 0) ? prev : current
        );

        setStats({
          totalArtworks: myArtworks.length,
          totalLikes,
          totalViews,
          avgLikes: Math.round(totalLikes / myArtworks.length),
          avgViews: Math.round(totalViews / myArtworks.length),
          mostLiked,
          mostViewed
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const categoryPerformanceData = () => {
    const categoryStats = {};
    artworks.forEach(artwork => {
      const category = artwork.category || 'Uncategorized';
      if (!categoryStats[category]) {
        categoryStats[category] = { category, likes: 0, views: 0, count: 0 };
      }
      categoryStats[category].likes += artwork.likes || 0;
      categoryStats[category].views += artwork.views || 0;
      categoryStats[category].count += 1;
    });

    return Object.values(categoryStats).map(stat => ({
      category: stat.category,
      'Avg Likes': Math.round(stat.likes / stat.count),
      'Avg Views': Math.round(stat.views / stat.count)
    }));
  };

  // Top performing artworks
  const topArtworksData = artworks
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5)
    .map(art => ({
      title: art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title,
      likes: art.likes || 0,
      views: art.views || 0
    }));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed insights and analytics about your artworks
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-100 text-sm font-medium">Total Artworks</h3>
            <svg className="w-8 h-8 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-4xl font-bold">{stats.totalArtworks}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-100 text-sm font-medium">Total Likes</h3>
            <svg className="w-8 h-8 text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-4xl font-bold">{stats.totalLikes}</p>
          <p className="text-purple-100 text-sm mt-2">Avg: {stats.avgLikes} per artwork</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-pink-100 text-sm font-medium">Total Views</h3>
            <svg className="w-8 h-8 text-pink-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-4xl font-bold">{stats.totalViews}</p>
          <p className="text-pink-100 text-sm mt-2">Avg: {stats.avgViews} per artwork</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-amber-100 text-sm font-medium">Engagement Rate</h3>
            <svg className="w-8 h-8 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-4xl font-bold">
            {stats.totalViews > 0 ? Math.round((stats.totalLikes / stats.totalViews) * 100) : 0}%
          </p>
          <p className="text-amber-100 text-sm mt-2">Likes to Views ratio</p>
        </motion.div>
      </div>

      {/* Best Performing Artworks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats.mostLiked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Most Liked Artwork
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={stats.mostLiked.imageURL}
                alt={stats.mostLiked.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {stats.mostLiked.title}
                </h4>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {stats.mostLiked.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {stats.mostLiked.views} views
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stats.mostViewed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Most Viewed Artwork
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={stats.mostViewed.imageURL}
                alt={stats.mostViewed.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {stats.mostViewed.title}
                </h4>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {stats.mostViewed.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {stats.mostViewed.likes} likes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformanceData()}>
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
              <Bar dataKey="Avg Likes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Avg Views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Performing Artworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top 5 Artworks by Likes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topArtworksData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="title" type="category" stroke="#9ca3af" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Bar dataKey="likes" fill="#ec4899" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Empty State */}
      {artworks.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Statistics Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create some artworks to see your statistics
          </p>
        </div>
      )}
    </div>
  );
};

export default MyStatistics;
