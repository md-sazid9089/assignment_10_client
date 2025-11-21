import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { getPublicArtworks } from '../services/api';
import { DUMMY_FEATURED_ARTWORKS } from '../data/dummyFeaturedArtworks';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkDetailsModal from '../components/ArtworkDetailsModal';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const CATEGORIES = [
  "All",
  "Painting",
  "Sculpture",
  "Digital Art",
  "Photography",
  "Drawing",
  "Mixed Media",
  "Illustration",
  "Other",
];

const ExploreArtworks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const cardsRef = useRef([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter by category and search term
  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    fetchArtworks();
  }, []);

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
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;

      const data = await getPublicArtworks(params);
      let artworks = data.data || [];
      if (!artworks.length) {
        artworks = DUMMY_FEATURED_ARTWORKS;
      }
      setArtworks(artworks);
    } catch (error) {
      setArtworks(DUMMY_FEATURED_ARTWORKS);
      console.error('Error fetching artworks:', error);
      toast.error('Failed to load artworks');
    } finally {
      setLoading(false);
    }
  };

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

        {/* Search and Category Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search artworks, title, artist..."
              className="w-full rounded-full px-4 py-2 bg-[#181c2a] text-slate-200 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-400 mr-2">Filter by category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={
                  "rounded-full px-3 py-1 border text-xs font-medium transition " +
                  (selectedCategory === cat
                    ? "bg-purple-500 text-white border-purple-400 shadow-md"
                    : "bg-transparent text-slate-300 border-white/15 hover:bg-white/5")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Sort */}
        {!loading && filteredArtworks.length > 0 && (
          <div className="mb-6 text-sm text-slate-400">
            Showing <span className="font-semibold text-purple-400">{filteredArtworks.length}</span> artwork{filteredArtworks.length !== 1 ? 's' : ''}
            {selectedCategory !== "All" && (
              <span className="ml-1">in <span className="font-semibold text-purple-300">{selectedCategory}</span></span>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && <Loader message="Loading artworks..." />}

        {/* Artworks Grid */}
        {!loading && filteredArtworks.length > 0 && (
          <div
            id="explore-grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArtworks.map((art, index) => (
              <ArtworkCard
                key={art._id}
                artwork={art}
                ref={(el) => (cardsRef.current[index] = el)}
                onLikeUpdate={handleLikeUpdate}
                onViewDetails={(artwork) => {
                  setSelectedArtwork(artwork);
                  setIsDetailsOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredArtworks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🎨</div>
            <h3 className="text-3xl font-bold mb-4">No Artworks Found</h3>
            <p className="text-xl text-slate-400 mb-8 max-w-md mx-auto">
              {selectedCategory !== "All"
                ? `No artworks found in ${selectedCategory}. Try another category!`
                : 'No artworks available yet. Be the first to share your art!'}
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="btn btn-primary btn-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Show All
            </button>
            <button
              onClick={() => window.location.href = '/add-artwork'}
              className="btn btn-outline btn-lg ml-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your Artwork
            </button>
          </div>
        )}
        {/* Artwork Details Modal */}
        {isDetailsOpen && selectedArtwork && (
          <ArtworkDetailsModal
            artwork={selectedArtwork}
            onClose={() => setIsDetailsOpen(false)}
          />
        )}
      </div>
    </section>
  );
}

export default ExploreArtworks
