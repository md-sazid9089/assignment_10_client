/**
 * My Artworks Page
 * 
 * User dashboard page showing:
 * - Grid of user's artworks
 * - CRUD operations (Create, Read, Update, Delete)
 * - Search and filter functionality
 * 
 * This page is accessible to all authenticated users
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';

const MyArtworks = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchMyArtworks();
  }, [user]);

  const fetchMyArtworks = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artworks`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Filter to show only user's artworks
      const myArtworks = response.data.filter(artwork => artwork.userId === user.uid);
      setArtworks(myArtworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      Swal.fire('Error', 'Failed to load artworks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artworkId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/artworks/${artworkId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        Swal.fire('Deleted!', 'Your artwork has been deleted.', 'success');
        fetchMyArtworks();
      } catch (error) {
        console.error('Error deleting artwork:', error);
        Swal.fire('Error', 'Failed to delete artwork', 'error');
      }
    }
  };

  // Filter artworks based on search and category
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || artwork.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(artworks.map(art => art.category))];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Artworks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view all your artworks
          </p>
        </div>
        <Link
          to="/add-artwork"
          className="btn btn-primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Artwork
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select select-bordered w-full sm:w-48"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Artworks Count */}
      <div className="text-gray-600 dark:text-gray-400">
        Showing {filteredArtworks.length} of {artworks.length} artworks
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Artwork Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={artwork.imageURL}
                  alt={artwork.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full bg-primary/90 text-white backdrop-blur-sm">
                  {artwork.category}
                </span>
              </div>

              {/* Artwork Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                  {artwork.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {artwork.description || 'No description'}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {artwork.likes || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {artwork.views || 0}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/artwork/${artwork._id}`}
                    className="btn btn-sm btn-primary flex-1"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(artwork._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No artworks found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterCategory !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Get started by creating your first artwork'}
          </p>
          {!searchTerm && filterCategory === 'all' && (
            <Link to="/add-artwork" className="btn btn-primary">
              Create Your First Artwork
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyArtworks;
