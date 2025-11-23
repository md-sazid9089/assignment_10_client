

import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, forwardRef } from 'react';
import gsap from 'gsap';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import api from '../services/api';




const ArtworkCard = forwardRef(({ artwork, isFavorited = false, onToggleFavorite, onLike, onEdit, onDelete, showOwnerControls = false }, ref) => {
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

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
      );
    }
  }, []);

  
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      gsap.to(el, { scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,80,160,0.18)', duration: 0.25, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(el, { scale: 1, boxShadow: '0 4px 16px 0 rgba(80,80,160,0.10)', duration: 0.25, ease: 'power2.inOut' });
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

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
        
        await api.post('/api/favorites', { userEmail: user.email, artworkId: artwork._id });
        setFavorited(true);
        toast.success('Added to favorites!');
      } else {
        
        await api.delete('/api/favorites', { data: { userEmail: user.email, artworkId: artwork._id } });
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

  return (
    <div ref={cardRef} className="rounded-3xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-lg flex flex-col overflow-hidden min-h-[340px] w-full">
      {/* Artwork Image */}
      <img
        src={imageSrc}
        alt={artwork.title}
        className="w-full h-48 object-cover"
        onError={handleImageError}
      />
      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-50 mb-1 truncate">{artwork.title}</h3>
        <p className="text-sm text-slate-300 mt-1">By {artwork.artistName}</p>
        <p className="text-sm text-slate-300">{artwork.category}</p>
      </div>
      {/* Actions Row */}
      <div className="flex flex-col gap-2 px-5 pb-4">
        <div className="flex items-center justify-between gap-3">
          {/* ❤️ Like Button */}
          <button
            type="button"
            className="btn btn-sm btn-error"
            title="Like"
            onClick={() => {
              if (!user) {
                toast.error('You must be logged in to like artworks.');
                navigate('/login');
                return;
              }
              onLike && onLike(artwork._id);
            }}
          >
            <span role="img" aria-label="love">❤️</span> {artwork.likesCount}
          </button>
          {/* ⭐ Favourite Button (only for valid ObjectId) */}
          {isValidObjectId && (
            <button
              type="button"
              className={`btn btn-sm btn-secondary ${favorited ? 'bg-yellow-400 text-black' : ''}`}
              title={favorited ? "Unfavorite" : "Favorite"}
              onClick={handleFavoriteClick}
              disabled={favoriteLoading}
            >
              {favorited ? (
                <span role="img" aria-label="favorite">⭐</span>
              ) : (
                <span role="img" aria-label="not-favorite">☆</span>
              )}
            </button>
          )}
          {/* View Details Button (only for valid ObjectId) */}
          {isValidObjectId && (
            <Link to={`/artworks/${artwork._id}`}>
              <button
                type="button"
                className="px-4 py-2 rounded-xl border border-indigo-400 text-indigo-200 text-sm font-medium hover:bg-indigo-500/10 transition-colors"
                title="View Details"
              >
                View Details
              </button>
            </Link>
          )}
        </div>
        {/* Owner Controls: Update/Delete */}
        {showOwnerControls && (
          <div className="flex justify-between items-center mt-3 gap-3">
            <button
              type="button"
              onClick={() => onEdit && onEdit(artwork)}
              className="flex-1 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
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
    </div>
  );

});

export default ArtworkCard;
