

import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import api from '../services/api';




const ArtworkCard = forwardRef(({ artwork, isFavorited = false, onToggleFavorite, onLike, onLikeUpdate, onEdit, onDelete, showOwnerControls = false }, ref) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(artwork.imageUrl || artwork.image || "/fallback-art.png");
  const [favorited, setFavorited] = useState(isFavorited);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const handleImageError = () => {
    setImageSrc("/fallback-art.png");
  };

  
  const isValidObjectId = typeof artwork._id === 'string' && /^[a-fA-F0-9]{24}$/.test(artwork._id);

  const cardRef = ref || useRef(null);

  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error('You must be logged in to favorite artworks.');
      navigate('/login');
      return;
    }
    if (favoriteLoading) return;
    setFavoriteLoading(true);
    try {
      if (!favorited) {
        
        await api.post('/favorites', { userEmail: user.email, artworkId: artwork._id });
        setFavorited(true);
        toast.success('Added to favorites!');
      } else {
        
        await api.delete('/favorites', { data: { userEmail: user.email, artworkId: artwork._id } });
        setFavorited(false);
        toast('Removed from favorites.', { icon: '⭐' });
      }
      if (onToggleFavorite) onToggleFavorite(artwork._id);
    } catch (err) {
      
      if (err.response) {
        console.error('Favorite API error:', {
          url: err.config?.url,
          method: err.config?.method,
          status: err.response.status,
          data: err.response.data,
          requestBody: err.config?.data
        });
        toast.error(`Error ${err.response.status}: ${err.response.data?.message || 'Failed to update favorite.'}`);
      } else {
        console.error('Favorite API error:', err);
        toast.error('Network or unknown error updating favorite.');
      }
    } finally {
      setFavoriteLoading(false);
    }
  };

  const isOwner = user && user.email && artwork.userEmail && user.email.toLowerCase() === artwork.userEmail.toLowerCase();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-card hover:shadow-2xl flex flex-col overflow-hidden min-h-[380px] w-full cursor-pointer"
    >
      {/* Artwork Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={imageSrc}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={handleImageError}
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 shadow-lg backdrop-blur-sm">
            {artwork.category}
          </span>
        </div>
      </div>
      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 line-clamp-2">{artwork.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">By {artwork.userName || artwork.artistName || artwork.user || 'Unknown'}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 font-medium mt-auto">{artwork.likesCount || 0} likes</p>
      </div>
      {/* Actions Row */}
      <div className="flex flex-col gap-3 px-5 pb-5 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center justify-between gap-3 pt-4">
          {/* ❤️ Like Button */}
          <motion.button
            type="button"
            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none shadow-md"
            title="Like"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => {
              if (!user) {
                toast.error('You must be logged in to like artworks.');
                navigate('/login');
                return;
              }
              // Prefer onLike, but fall back to onLikeUpdate (used by some parents)
              if (onLike) {
                onLike(artwork._id, user.email)
              } else if (onLikeUpdate) {
                onLikeUpdate(artwork._id, user.email)
              }
            }}
          >
            <span role="img" aria-label="love">❤️</span> {artwork.likesCount}
          </motion.button>
          {/* ⭐ Favourite Button (only for valid ObjectId) */}
          {isValidObjectId && (
            <motion.button
              type="button"
              className={`btn btn-sm btn-secondary ${favorited ? 'bg-yellow-400 text-black' : ''}`}
              title={favorited ? "Unfavorite" : "Favorite"}
              onClick={handleFavoriteClick}
              disabled={favoriteLoading}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {favorited ? (
                <span role="img" aria-label="favorite">⭐</span>
              ) : (
                <span role="img" aria-label="not-favorite">☆</span>
              )}
            </motion.button>
          )}
          {/* View Details Button (only for valid ObjectId) */}
          {isValidObjectId && (
            <Link to={`/artworks/${artwork._id}`}>
              <motion.button
                type="button"
                className="px-4 py-2 rounded-xl border border-blue-400 dark:border-indigo-400 text-blue-600 dark:text-indigo-200 text-sm font-medium hover:bg-blue-500/10 dark:hover:bg-indigo-500/10 transition-colors"
                title="View Details"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </Link>
          )}
        </div>
        {/* Owner Controls: Update/Delete (only show to actual owner) */}
        {showOwnerControls && isOwner && (
          <div className="flex justify-between items-center mt-3 gap-3">
            <button
              type="button"
              onClick={() => onEdit && onEdit(artwork)}
              className="flex-1 px-3 py-2 rounded-xl bg-blue-600 dark:bg-indigo-600 text-white text-sm font-medium hover:bg-blue-500 dark:hover:bg-indigo-500"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => onDelete && onDelete(artwork._id)}
              className="flex-1 px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

});

export default ArtworkCard;
