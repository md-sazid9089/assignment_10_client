import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ArtworkCard from '../components/ArtworkCard';
import Loader from '../components/Loader';
import PageLoader from '../components/PageLoader';
import api from '../services/api';

const MyFavorites = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorited artworks
  const fetchFavorites = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const response = await api.get(`/favorites/${encodeURIComponent(user.email)}`);
      console.log('Favorites API raw response:', response.data);
      const apiResult = response.data || {};
      const artworks = Array.isArray(apiResult.data) ? apiResult.data : [];
      setFavorites(artworks);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchFavorites();
    }
  }, [user]);

  // Handle unfavorite action
  const handleUnfavorite = async (artworkId) => {
    if (!user?.email) return;
    try {
      // Optimistic update - remove from UI immediately
      setFavorites(prevFavorites => prevFavorites.filter(art => art._id !== artworkId));
      // Call API to remove favorite
      await api.delete('/favorites', { data: { userEmail: user.email, artworkId } });
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
      // Revert on error
      fetchFavorites();
    }
  };

  // Show loading spinner while auth or data is loading
  if (authLoading || loading) {
    return <PageLoader message="Loading your favorites..." />
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-16">
                My Favorites
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Artworks you've saved for inspiration
              </p>
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="btn btn-outline btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Discover More
            </button>
          </div>
        </div>

        {/* Stats Card */}
        {favorites.length > 0 && (
          <div className="mb-8">
            <div className="stats shadow bg-base-200">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <div className="stat-title">Total Favorites</div>
                <div className="stat-value text-primary">{favorites.length}</div>
                <div className="stat-desc">Curated collection</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </div>
                <div className="stat-title">Categories</div>
                <div className="stat-value text-secondary">
                  {new Set(
                    favorites
                      .filter(fav => fav && fav.category)
                      .map(fav => fav.category)
                  ).size}
                </div>
                <div className="stat-desc">Diverse interests</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="stat-title">Artists</div>
                <div className="stat-value text-accent">
                  {new Set(
                    favorites
                      .filter(fav => fav && fav.userEmail)
                      .map(fav => fav.userEmail)
                  ).size}
                </div>
                <div className="stat-desc">Following</div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites
              .filter(artwork => artwork && artwork._id && artwork.title)
              .map((artwork) => (
                <ArtworkCard
                  key={artwork._id}
                  artwork={artwork}
                  isFavorited={true}
                  onToggleFavorite={() => handleUnfavorite(artwork._id)}
                />
              ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-700 dark:text-gray-300">
                No Favorites Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start building your collection by favoriting artworks you love. Click the bookmark icon on any artwork to save it here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/explore')}
                  className="btn btn-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Browse Artworks
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-outline"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
