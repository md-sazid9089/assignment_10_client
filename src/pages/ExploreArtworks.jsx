import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Fade, Zoom } from 'react-awesome-reveal'
import { getPublicArtworks } from '../services/api'
import ArtworkCard from '../components/ArtworkCard'
import FilterBar from '../components/FilterBar'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

const ExploreArtworks = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || ''
  })

  useEffect(() => {
    fetchArtworks()
  }, [filters])

  const fetchArtworks = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.search) params.search = filters.search
      if (filters.category) params.category = filters.category

      const data = await getPublicArtworks(params)
      setArtworks(data.artworks || [])
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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Fade>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Explore Artworks
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Browse through our collection of amazing artworks from talented artists around the world
            </p>
          </div>
        </Fade>

        {/* Filter Bar */}
        <Fade delay={200}>
          <div className="mb-8">
            <FilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
          </div>
        </Fade>

        {/* Results Count & Sort */}
        {!loading && artworks.length > 0 && (
          <Fade delay={300}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-base-content/70">
                Showing <span className="font-semibold text-primary">{artworks.length}</span> artwork{artworks.length !== 1 ? 's' : ''}
                {(filters.search || filters.category) && (
                  <span className="ml-1">matching your filters</span>
                )}
              </p>
              
              {/* Active Filter Tags */}
              <div className="flex gap-2 flex-wrap">
                {filters.search && (
                  <div className="badge badge-primary gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    "{filters.search}"
                  </div>
                )}
                {filters.category && (
                  <div className="badge badge-secondary gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {filters.category}
                  </div>
                )}
              </div>
            </div>
          </Fade>
        )}

        {/* Loading State */}
        {loading && <Loader message="Loading artworks..." />}

        {/* Artworks Grid */}
        {!loading && artworks.length > 0 && (
          <Fade cascade damping={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artworks.map((artwork) => (
                <ArtworkCard 
                  key={artwork._id} 
                  artwork={artwork}
                  onLikeUpdate={handleLikeUpdate}
                />
              ))}
            </div>
          </Fade>
        )}

        {/* Empty State */}
        {!loading && artworks.length === 0 && (
          <Zoom>
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🎨</div>
              <h3 className="text-3xl font-bold mb-4">No Artworks Found</h3>
              <p className="text-xl text-base-content/70 mb-8 max-w-md mx-auto">
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
                      setFilters({ search: '', category: '' })
                      setSearchParams({})
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
          </Zoom>
        )}
      </div>
    </div>
  )
}

export default ExploreArtworks
