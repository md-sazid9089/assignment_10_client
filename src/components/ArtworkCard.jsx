

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { toggleLike, toggleFavorite } from '../services/api';
import toast from 'react-hot-toast';

const ArtworkCard = ({ artwork, onLikeUpdate, onFavoriteUpdate, onViewDetails, showActions = true }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(artwork.likedBy?.includes(user?.email) || false);
  const [likesCount, setLikesCount] = useState(artwork.likesCount || 0);
  const [isFavorited, setIsFavorited] = useState(artwork.isFavorited || false);
  const [isLiking, setIsLiking] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  // Like button handler
  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to like artworks');
      return;
    }
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await toggleLike(artwork._id);
      setIsLiked(response.isLiked);
      setLikesCount(response.likesCount);
      if (onLikeUpdate) {
        onLikeUpdate(artwork._id, response.isLiked, response.likesCount);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    } finally {
      setIsLiking(false);
    }
  };

  // Favourite button handler
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to favorite artworks');
      return;
    }
    if (isFavoriting) return;
    setIsFavoriting(true);
    try {
      const response = await toggleFavorite({ artworkId: artwork._id });
      setIsFavorited(response.isFavorited);
      const message = response.isFavorited ? 'Added to favorites' : 'Removed from favorites';
      toast.success(message);
      if (onFavoriteUpdate) {
        onFavoriteUpdate(artwork._id, response.isFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorite');
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <div className="card ...">
      {/* ...existing code... */}
      <div className="flex gap-2 mt-2">
        {/* ❤️ Like Button */}
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`btn btn-sm ${isLiked ? 'btn-error' : 'btn-outline btn-error'}`}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <span role="img" aria-label="love">❤️</span> {likesCount}
        </button>
        {/* ⭐ Favourite Button */}
        <button
          onClick={handleFavorite}
          disabled={isFavoriting}
          className={`btn btn-sm ${isFavorited ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
          title={isFavorited ? 'Unfavorite' : 'Add to Favorites'}
        >
          <span role="img" aria-label="favorite">⭐</span>
        </button>
        {/* 👁 View Details Button */}
        {showActions && (
          <button
            onClick={() => onViewDetails && onViewDetails()}
            className="btn btn-sm btn-outline"
            title="View Details"
          >
            <span role="img" aria-label="view">👁</span>
          </button>
        )}
      </div>
      {/* ...existing code... */}
    </div>
  );
};

export default ArtworkCard;
