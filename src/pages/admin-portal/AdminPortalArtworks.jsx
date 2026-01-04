/**
 * Admin Portal - Manage Artworks Page
 * 
 * Admin-only page in the isolated admin portal window.
 * Shows ALL artworks from ALL users with moderation capabilities.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';

const AdminPortalArtworks = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    console.log('🎨 Admin Artworks Page: Initializing...');
    fetchAllArtworks();
  }, []);

  const fetchAllArtworks = async () => {
    console.log('🔄 Fetching all artworks for admin moderation...');
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'https://assignment10-server-sage-iota.vercel.app/api';
      console.log('📡 API Call: GET /artworks');
      const response = await axios.get(
        `${apiUrl}/artworks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('✅ Fetched', response.data.length, 'artworks');
      setArtworks(response.data);
    } catch (error) {
      console.error('❌ Error fetching artworks:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      let errorMsg = 'Failed to load artworks. ';
      if (error.code === 'ERR_NETWORK') {
        errorMsg += 'Server connection failed. Please ensure backend is running on port 5000.';
      } else if (error.response?.status === 401) {
        errorMsg += 'Authentication failed. Please log in again.';
      } else {
        errorMsg += error.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Artworks',
        text: errorMsg,
        footer: 'Check console for detailed error logs'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artworkId) => {
    console.log('🗑️ Delete request for artwork:', artworkId);
    
    const result = await Swal.fire({
      title: 'Delete this artwork?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      console.log('✅ Delete confirmed by admin');
      try {
        const token = await user.getIdToken();
        const apiUrl = import.meta.env.VITE_API_URL || 'https://assignment10-server-sage-iota.vercel.app/api';
        console.log('📡 API Call: DELETE /artworks/' + artworkId);
        await axios.delete(
          `${apiUrl}/artworks/${artworkId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('✅ Artwork deleted successfully');
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Artwork has been removed from the platform.',
          timer: 2000
        });
        fetchAllArtworks();
      } catch (error) {
        console.error('❌ Error deleting artwork:', error);
        console.error('Delete error details:', {
          artworkId,
          status: error.response?.status,
          message: error.message
        });
        
        let errorMsg = 'Failed to delete artwork. ';
        if (error.response?.status === 404) {
          errorMsg += 'Artwork not found.';
        } else if (error.response?.status === 403) {
          errorMsg += 'You do not have permission to delete this artwork.';
        } else {
          errorMsg += error.message;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: errorMsg,
          footer: 'Check console for detailed error logs'
        });
      }
    } else {
      console.log('❌ Delete cancelled by admin');
    }
  };

  // Filter and sort
  let filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artistName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || artwork.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  filteredArtworks = filteredArtworks.sort((a, b) => {
    switch (sortBy) {
      case 'recent': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'mostLiked': return (b.likes || 0) - (a.likes || 0);
      case 'mostViewed': return (b.views || 0) - (a.views || 0);
      default: return 0;
    }
  });

  const categories = ['all', ...new Set(artworks.map(art => art.category))];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage All Artworks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Moderate and manage all platform artworks</p>
        </div>
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300 dark:border-red-700">
          <p className="text-sm font-bold text-red-800 dark:text-red-300">ADMIN ACCESS</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="select select-bordered w-full">
            {categories.map(category => (
              <option key={category} value={category}>{category === 'all' ? 'All Categories' : category}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select select-bordered w-full">
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Total: {artworks.length} · Showing: {filteredArtworks.length}
      </div>

      {/* Artworks Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Artwork</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredArtworks.map((artwork, index) => (
                <motion.tr
                  key={artwork._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={artwork.imageURL} alt={artwork.title} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{artwork.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{artwork.artistName || 'Unknown'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{artwork.artistEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      {artwork.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    ❤️ {artwork.likes || 0} · 👁️ {artwork.views || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(artwork._id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-semibold"
                    >
                      Delete
                    </button>
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

export default AdminPortalArtworks;
