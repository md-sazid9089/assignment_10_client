/**
 * Admin Portal - Platform Statistics Page
 * 
 * Admin-only page showing comprehensive platform-wide analytics.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Loader from '../../components/Loader';

const AdminPortalStatistics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artworks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArtworks(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryDistribution = () => {
    const categoryCount = {};
    artworks.forEach(artwork => {
      const category = artwork.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  };

  const monthlyGrowth = () => {
    const monthlyData = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = { month: monthKey, artworks: 0, likes: 0, views: 0 };
    }
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

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
  const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
  const totalViews = artworks.reduce((sum, art) => sum + (art.views || 0), 0);
  const uniqueUsers = new Set(artworks.map(art => art.userId)).size;

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Statistics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive analytics and insights</p>
        </div>
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
          <p className="text-sm font-bold text-red-800 dark:text-red-300">ADMIN ACCESS</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-blue-100">Total Artworks</h3>
          <p className="text-4xl font-bold">{artworks.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-purple-100">Total Engagement</h3>
          <p className="text-4xl font-bold">{totalLikes}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-pink-100">Total Views</h3>
          <p className="text-4xl font-bold">{totalViews}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-1 text-amber-100">Active Artists</h3>
          <p className="text-4xl font-bold">{uniqueUsers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Growth Trend</h3>
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
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
              <Area type="monotone" dataKey="artworks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorArtworks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Distribution</h3>
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
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Engagement Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyGrowth()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} />
            <Legend />
            <Bar dataKey="likes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminPortalStatistics;
