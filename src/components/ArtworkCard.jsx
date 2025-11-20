import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { toggleLike, toggleFavorite } from '../services/api';
import toast from 'react-hot-toast';

const ArtworkCard = ({ artwork, onLikeUpdate, onFavoriteUpdate, showActions = true }) => {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(artwork.likedBy?.includes(user?.email) || false)
  const [likesCount, setLikesCount] = useState(artwork.likesCount || 0)
  const [isLiking, setIsLiking] = useState(false)
  const [isFavoriting, setIsFavoriting] = useState(false)

  const handleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error('Please login to like artworks')
      return
    }

    if (isLiking) return

    setIsLiking(true)
    try {
      const response = await toggleLike(artwork._id)
      setIsLiked(response.isLiked)
      setLikesCount(response.likesCount)
      
      if (onLikeUpdate) {
        onLikeUpdate(artwork._id, response.isLiked, response.likesCount)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      toast.error('Failed to update like')
    } finally {
      setIsLiking(false)
    }
  }

  const handleFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error('Please login to favorite artworks')
      return
    }

    if (isFavoriting) return

    setIsFavoriting(true)
    try {
      const response = await toggleFavorite({ artworkId: artwork._id })
      
      const message = response.isFavorited ? 'Added to favorites' : 'Removed from favorites'
      toast.success(message)
      
      if (onFavoriteUpdate) {
        onFavoriteUpdate(artwork._id, response.isFavorited)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('Failed to update favorite')
    } finally {
      setIsFavoriting(false)
    }
  }

  // GSAP hover nuance (optional)
  const cardRef = useRef(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Subtle 3D effect
    // gsap.set(el, { transformPerspective: 800 });
  }, []);

  return (
    <Link to={`/artworks/${artwork._id}`} className="group" ref={cardRef}>
      <div className="group relative flex flex-col rounded-3xl bg-[#070b1b] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-transform duration-300 hover:-translate-y-2">
        {/* Image */}
        <div className="relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="h-64 w-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
          {/* Category badge */}
          <span className="absolute top-3 right-3 rounded-full bg-purple-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {artwork.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-3 text-slate-100">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{artwork.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2">{artwork.description}</p>
          </div>
          {/* Artist row */}
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-semibold text-white">
              {artwork.userName?.charAt(0) || 'A'}
            </span>
            <span>{artwork.userName || 'Anonymous'}</span>
          </div>
          {/* Price + likes row */}
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 font-semibold border border-emerald-400/40">
              {artwork.price ? `$${artwork.price}` : 'Free'}
            </span>
            <span className="flex items-center gap-1 text-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likesCount}
            </span>
          </div>
          {/* View Details button */}
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 hover:brightness-110 transition">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ArtworkCard
