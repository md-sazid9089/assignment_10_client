

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
    <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col min-h-[340px] w-full">
      {/* Artwork Image */}
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-48 object-cover"
      />
      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">{artwork.title}</h3>
        <p className="text-sm text-slate-500 mt-1">By {artwork.artistName}</p>
        <p className="text-sm text-slate-500">{artwork.category}</p>
      </div>
      {/* Actions Row */}
      <div className="flex items-center justify-between gap-3 px-4 pb-4">
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
          <Link to={`/artworks/${artwork._id}`}>
            <button className="border border-indigo-500 rounded-xl px-4 py-2 text-sm font-medium text-indigo-600" type="button">
              View Details
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;
