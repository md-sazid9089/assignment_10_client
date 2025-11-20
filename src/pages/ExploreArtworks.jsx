import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { getPublicArtworks } from '../services/api';
import ArtworkCard from '../components/ArtworkCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const ExploreArtworks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || ''
  });
  const cardsRef = useRef([]);

  useEffect(() => {
    fetchArtworks();
  }, [filters]);

  useEffect(() => {
    if (!cardsRef.current.length) return;
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#explore-grid',
        start: 'top 80%',
      },
    });
  }, [artworks]);

  const fetchArtworks = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.search) params.search = filters.search
      if (filters.category) params.category = filters.category

      const data = await getPublicArtworks(params)
      setArtworks(data.data || [])
    } catch (error) {
      console.error('Error fetching artworks:', error)
      toast.error('Failed to load artworks')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    
    // Update URL query parameters
    const params = {}
    if (newFilters.search) params.search = newFilters.search
    if (newFilters.category) params.category = newFilters.category
    setSearchParams(params)
  }

  const handleLikeUpdate = (artworkId, isLiked, newLikesCount) => {
    setArtworks(prevArtworks =>
      prevArtworks.map(artwork =>
        artwork._id === artworkId
          ? { ...artwork, likesCount: newLikesCount, likedBy: isLiked ? [...(artwork.likedBy || []), 'current-user'] : (artwork.likedBy || []).filter(email => email !== 'current-user') }
          : artwork
      )
    )
  }

  return (
    <section className="min-h-screen bg-[#050818] text-slate-50 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Explore Artworks</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Browse through our collection of amazing artworks from talented artists around the world
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
        </div>

        {/* Results Count & Sort */}
        {!loading && artworks.length > 0 && (
          <div className="mb-6 text-sm text-slate-400">
            Showing <span className="font-semibold text-purple-400">{artworks.length}</span> artwork{artworks.length !== 1 ? 's' : ''}
            {(filters.search || filters.category) && (
              <span className="ml-1">matching your filters</span>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && <Loader message="Loading artworks..." />}

        {/* Artworks Grid */}
        {!loading && artworks.length > 0 && (
          <div
            id="explore-grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {artworks.map((art, index) => (
              <ArtworkCard
                key={art._id}
                artwork={art}
                ref={(el) => (cardsRef.current[index] = el)}
                onLikeUpdate={handleLikeUpdate}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && artworks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🎨</div>
            <h3 className="text-3xl font-bold mb-4">No Artworks Found</h3>
            <p className="text-xl text-slate-400 mb-8 max-w-md mx-auto">
              {filters.search || filters.category ? (
                'Try adjusting your search or category filters to discover more artworks'
              ) : (
                'No artworks available yet. Be the first to share your art!'
              )}
            </p>
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              {(filters.search || filters.category) && (
                <button
                  onClick={() => {
                    setFilters({ search: '', category: '' });
                    setSearchParams({});
                  }}
                  className="btn btn-primary btn-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear All Filters
                </button>
              )}
              <button
                onClick={() => window.location.href = '/add-artwork'}
                className="btn btn-outline btn-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your Artwork
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExploreArtworks
