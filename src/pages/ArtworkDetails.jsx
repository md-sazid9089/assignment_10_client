import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useAuth } from '../hooks/useAuth';
import PageLoader from '../components/PageLoader';
import api from '../services/api';
import toast from 'react-hot-toast';
import { checkLikeStatus, checkFavoriteStatus, addFavorite, removeFavorite, getArtworksByUser, toggleLike } from '../services/api';

const ArtworkDetails = () => {
    const { id } = useParams()
    useEffect(() => {
      if (!id) return;
      const interval = setInterval(async () => {
        try {
          const response = await api.get(`/api/artworks/${id}`);
          const art = response.data.artwork || response.data.data || response.data;
          setLikesCount(art && typeof art.likesCount === 'number' ? art.likesCount : 0);
        } catch (error) {
        }
      }, 5000);
      return () => clearInterval(interval);
    }, [id]);
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [artwork, setArtwork] = useState(null);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const [artistTotalArtworks, setArtistTotalArtworks] = useState(0);
  const [artistTotalLikes, setArtistTotalLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArtworkDetails()
    }
  }, [id])

  useEffect(() => {
    if (artwork && user) {
      checkUserInteractions()
    }
  }, [artwork, user])

  const fetchArtworkDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/artworks/${id}`);
      const art = response.data.artwork || response.data.data || response.data;
      setArtwork(art);
      setLikesCount(art && typeof art.likesCount === 'number' ? art.likesCount : 0);

      if (art && art.userEmail) {
      }
    } catch (error) {
      console.error('Error fetching artwork:', error);
      toast.error('Failed to load artwork details');
      setArtwork(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistArtworks = async (userEmail) => {
    try {
      const data = await getArtworksByUser(userEmail);
      const allArtworks = data.data || [];
      setArtistTotalArtworks(allArtworks.length);
      // Calculate total likes for all artworks by this artist
      const totalLikes = allArtworks.reduce((sum, art) => sum + (art.likesCount || 0), 0);
      setArtistTotalLikes(totalLikes);
      // Filter out current artwork and limit to 4
      const otherArtworks = allArtworks.filter(art => art._id !== id).slice(0, 4);
      setArtistArtworks(otherArtworks);
    } catch (error) {
      console.error('Error fetching artist artworks:', error);
    }
  }

  const checkUserInteractions = async () => {
    if (!user || !artwork) return
    
    try {
      // Check like status
      const likeData = await checkLikeStatus(id, user.email)
      // server returns { success: true, liked: boolean }
      setIsLiked((likeData && (likeData.liked ?? likeData.isLiked)) || false)

      // Check favorite status
      const favData = await checkFavoriteStatus(user.email, id)
      // favorite endpoint returns { success: true, data: { isFavorited: boolean } }
      setIsFavorited((favData && (favData.data?.isFavorited ?? favData.isFavorited)) || false)
    } catch (error) {
      if (error.response?.status === 404) {
        setIsLiked(false);
        setIsFavorited(false);
      } else {
        console.error('Error checking user interactions:', error);
      }
    }
  }

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like artworks')
      return
    }

    if (isLiking) return

    // Optimistic UI update
    const previousLiked = isLiked
    const previousCount = likesCount
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    setIsLiking(true)

    try {
      const response = await toggleLike(id, user?.email)
      // response may be { liked, likesCount, artwork } or similar
      const liked = response.liked ?? response.isLiked ?? false
      const count = response.likesCount ?? response.count ?? likesCount
      setIsLiked(!!liked)
      setLikesCount(typeof count === 'number' ? count : likesCount)
      toast.success(liked ? 'Added to likes' : 'Removed from likes')
    } catch (error) {
      console.error('Error toggling like:', error)
      // Revert optimistic update on error
      setIsLiked(previousLiked)
      setLikesCount(previousCount)
      toast.error('Failed to update like')
    } finally {
      setIsLiking(false)
    }
  }

  const handleFavorite = async () => {
  if (!user) {
    toast.error('You must be logged in to favorite artworks.');
    navigate('/login');
    return;
  }
  if (isFavoriting) return;
  setIsFavoriting(true);
  try {
    if (!isFavorited) {
      // Add favorite in backend
      await addFavorite({ userEmail: user.email, artworkId: id });
      setIsFavorited(true);
      toast.success('Added to favorites!');
    } else {
      // Remove favorite in backend
      await removeFavorite({ userEmail: user.email, artworkId: id });
      setIsFavorited(false);
      toast('Removed from favorites.', { icon: '⭐' });
    }

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
      setIsFavoriting(false);
    }
  }

  if (loading) {
    return <PageLoader message="Loading artwork details..." />;
  }

  if (!artwork) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-6xl">🎨</div>
        <h2 className="text-2xl font-bold">Artwork Not Found</h2>
        <Link to="/explore" className="btn btn-primary">
          Browse Artworks
        </Link>
      </div>
    );
  }

  // Only render details if artwork is loaded
  return (
    <div className="min-h-screen py-12 bg-black">
      <div className="max-w-3xl mx-auto mb-10 text-center px-4">
        <Fade>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Art is the journey of a free soul.</h2>
          <p className="text-lg md:text-xl text-white font-medium">
            Every brushstroke, every color, every idea is a celebration of creativity. Art inspires us to see the world differently, to dream beyond boundaries, and to express what words cannot. Let this artwork ignite your imagination and remind you: your vision matters, your story is unique, and your creativity can change the world.
          </p>
        </Fade>
      </div>
      <div className="container mx-auto px-4">
        <Fade>
          <button
            onClick={() => navigate(-1)} 
            className="btn btn-ghost mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </Fade>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left: Image Section */}
          <Zoom>
            <div className="space-y-4">
              <div className="card bg-base-100 shadow-2xl overflow-hidden">
                <figure className="relative aspect-square">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-primary badge-lg">{artwork.category}</span>
                  </div>
                </figure>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`btn flex-1 ${isLiked ? 'btn-error' : 'btn-outline btn-error'}`}
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
                  {isLiked ? 'Liked' : 'Like'} ({likesCount})
                </button>

                <button 
                  onClick={handleFavorite}
                  disabled={isFavoriting}
                  className={`btn flex-1 ${isFavorited ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
                  style={{ transition: 'none' }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 ${isFavorited ? 'fill-current' : ''}`}
                    fill={isFavorited ? 'currentColor' : 'none'}
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
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          </Zoom>

          {/* Right: Details Section */}
          <Fade cascade damping={0.1}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2 mt-16">
                  {artwork.title}
                </h1>
                {artwork.price && (
                  <p className="text-2xl font-semibold text-primary">
                    ${artwork.price}
                  </p>
                )}
              </div>

              {/* Artist Info */}
              <div className="card bg-black shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(artwork.userName || 'Artist')}&background=6366f1&color=fff&size=128`}
                        alt={artwork.userName} 
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{artwork.userName}</h3>
                    <p className="text-sm text-white">{artwork.userEmail}</p>
                    <div className="flex gap-4 mt-2">
                      <div className="badge badge-primary text-xs">Total Artworks: {artistTotalArtworks}</div>
                      <div className="badge badge-secondary text-xs">Total Likes: {artistTotalLikes}</div>
                      <button className="btn btn-outline btn-sm" type="button" onClick={() => toast('Following!')}>Following</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artwork Details */}
              <div className="space-y-4">
                <div className="divider"></div>
                <button className="btn btn-outline btn-sm mb-4" type="button" onClick={() => toast('Comment (dummy)!')}>Comment</button>
                
                {/* Medium */}
                <div className="flex items-start gap-4">
                  <div className="badge badge-ghost badge-lg">Medium</div>
                  <p className="text-lg font-medium">{artwork.medium}</p>
                </div>

                {/* Dimensions */}
                {artwork.dimensions && (
                  <div className="flex items-start gap-4">
                    <div className="badge badge-ghost badge-lg">Size</div>
                    <p className="text-lg font-medium">{artwork.dimensions}</p>
                  </div>
                )}

                {/* Visibility */}
                <div className="flex items-start gap-4">
                  <div className="badge badge-ghost badge-lg">Status</div>
                  <div className={`badge ${artwork.visibility === 'Public' ? 'badge-success' : 'badge-warning'}`}>
                    {artwork.visibility}
                  </div>
                </div>

                <div className="divider"></div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Description</h3>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">
                    {artwork.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-figure text-error">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="stat-title">Total Likes</div>
                    <div className="stat-value text-error">{likesCount}</div>
                  </div>
                </div>

                {/* Created Date */}
                {artwork.createdAt && (
                  <p className="text-sm text-base-content/60">
                    Posted on {new Date(artwork.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>
            </div>
          </Fade>
        </div>

        {/* More from this Artist */}
        {artistArtworks.length > 0 && (
          <Fade delay={300}>
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">More from {artwork.userName}</h2>
                <Link 
                  to={`/explore?artist=${artwork.userEmail}`}
                  className="btn btn-outline btn-sm"
                >
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {artistArtworks.map((art) => (
                  <Link 
                    key={art._id} 
                    to={`/artworks/${art._id}`}
                    className="group"
                  >
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <figure className="aspect-square overflow-hidden">
                        <img 
                          src={art.imageUrl} 
                          alt={art.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                      </figure>
                      <div className="card-body p-4">
                        <h3 className="card-title text-sm line-clamp-1">{art.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-base-content/70">
                          <span className="badge badge-primary badge-xs">{art.category}</span>
                          <span>❤️ {art.likesCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Fade>
        )}
      </div>
    </div>
  )
}

export default ArtworkDetails
