import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { toggleLike, toggleFavorite } from '../services/api'
import toast from 'react-hot-toast'

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

  return (
    <Link to={`/artworks/${artwork._id}`} className="group">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 card-hover h-full">
        {/* Image Container */}
        <figure className="relative aspect-square overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Overlay with Actions */}
          {showActions && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`btn btn-circle ${isLiked ? 'btn-error' : 'btn-ghost'} text-white`}
                title={isLiked ? 'Unlike' : 'Like'}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`}
                  fill={isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </button>

              {/* Favorite Button */}
              <button
                onClick={handleFavorite}
                disabled={isFavoriting}
                className="btn btn-circle btn-ghost text-white"
                title="Add to favorites"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <span className="badge badge-primary badge-sm">{artwork.category}</span>
          </div>
        </figure>

        {/* Card Body */}
        <div className="card-body p-4">
          <h3 className="card-title text-lg line-clamp-1">{artwork.title}</h3>
          
          <p className="text-sm text-base-content/70 line-clamp-2">
            {artwork.description}
          </p>

          <div className="flex items-center justify-between mt-2">
            {/* Artist Info */}
            <div className="flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-xs">{artwork.userName?.charAt(0) || 'A'}</span>
                </div>
              </div>
              <span className="text-sm font-medium">{artwork.userName || 'Anonymous'}</span>
            </div>

            {/* Like Count */}
            <div className="flex items-center gap-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-error" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">{likesCount}</span>
            </div>
          </div>

          {/* Medium & Price */}
          <div className="flex items-center justify-between mt-2 text-xs text-base-content/60">
            <span>{artwork.medium}</span>
            {artwork.price && <span className="font-semibold text-primary">${artwork.price}</span>}
          </div>

          {/* View Details Button */}
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary btn-sm w-full">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArtworkCard
