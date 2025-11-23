import { Link } from 'react-router-dom'
import ArtistCard from '../components/ArtistCard'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Fade, Slide, Zoom } from 'react-awesome-reveal'
import { Typewriter } from 'react-simple-typewriter'
import { getFeaturedArtworks } from '../services/api'
import EventsSection from '../components/EventsSection'
import { DUMMY_FEATURED_ARTWORKS } from '../data/dummyFeaturedArtworks'
import ArtworkCard from '../components/ArtworkCard'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

const Home = () => {
  const { user } = useAuth();
  const [featuredArtworks, setFeaturedArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const bannerSlides = [
    {
      id: 1,
      title: 'Discover Amazing Artworks',
      subtitle: 'Explore a world of creativity from talented artists worldwide',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&h=600&fit=crop',
      cta: 'Explore Gallery',
      link: '/explore'
    },
    {
      id: 2,
      title: 'Showcase Your Creativity',
      subtitle: 'Share your artistic vision with a global community',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
      cta: 'Upload Your Art',
      link: '/add-artwork'
    },
    {
      id: 3,
      title: 'Join the Art Community',
      subtitle: 'Connect with artists, collectors, and art enthusiasts',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop',
      cta: 'Get Started',
      link: '/register'
    }
  ]

  const topArtists = [
    { id: 1, name: 'Zainul Abedin', initials: 'ZA', totalArtworks: 40, totalLikes: 2200, avatarUrl: 'https://ui-avatars.com/api/?name=Zainul+Abedin&background=6366f1&color=fff' },
    { id: 2, name: 'Quamrul Hassan', initials: 'QH', totalArtworks: 35, totalLikes: 1980, avatarUrl: 'https://ui-avatars.com/api/?name=Quamrul+Hassan&background=8b5cf6&color=fff' },
    { id: 3, name: 'Shilpacharya Kamrul', initials: 'SK', totalArtworks: 28, totalLikes: 1560, avatarUrl: 'https://ui-avatars.com/api/?name=Shilpacharya+Kamrul&background=ec4899&color=fff' },
    { id: 4, name: 'Safiuddin Ahmed', initials: 'SA', totalArtworks: 30, totalLikes: 1890, avatarUrl: 'https://ui-avatars.com/api/?name=Safiuddin+Ahmed&background=10b981&color=fff' }
  ]

  useEffect(() => {
    fetchFeaturedArtworks()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [bannerSlides.length])

  const fetchFeaturedArtworks = async () => {
    try {
      const data = await getFeaturedArtworks();
      let artworks = data.artworks || [];
      if (!artworks.length) {
        artworks = DUMMY_FEATURED_ARTWORKS;
      }
      setFeaturedArtworks(artworks);
    } catch (error) {
      setFeaturedArtworks(DUMMY_FEATURED_ARTWORKS);
      console.error('Error fetching featured artworks:', error);
      toast.error('Failed to load featured artworks');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeUpdate = (artworkId, isLiked, newLikesCount) => {
    setFeaturedArtworks(prevArtworks =>
      prevArtworks.map(artwork =>
        artwork._id === artworkId
          ? { ...artwork, likesCount: newLikesCount, likedBy: isLiked ? [...(artwork.likedBy || []), 'current-user'] : (artwork.likedBy || []).filter(email => email !== 'current-user') }
          : artwork
      )
    )
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  return (
    <div className="min-h-screen bg-black">
      <section className="w-full h-screen bg-black relative overflow-hidden">
        <div className="h-full pt-24">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                style={{ position: 'absolute', inset: 0, zIndex: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10"></div>
              <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-4">
                  {index === currentSlide && (
                    <Fade cascade damping={0.2}>
                      <div className="max-w-3xl text-white">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                          {index === 0 ? (
                            <span>
                              Discover Amazing{' '}
                              <span className="text-primary">
                                <Typewriter
                                  words={["Artworks", "Paintings", "Illustrations", "Photographs", "Sculptures"]}
                                  loop={0}
                                  cursor
                                  cursorStyle='|'
                                  typeSpeed={70}
                                  deleteSpeed={50}
                                  delaySpeed={1000}
                                />
                              </span>
                            </span>
                          ) : (
                            slide.title
                          )}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                          {slide.subtitle}
                        </p>
                        <Link to={slide.link} className="btn btn-primary btn-lg">
                          {slide.cta}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </Fade>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 btn btn-circle btn-ghost bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 btn btn-circle btn-ghost bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
        >
          ❯
        </button>
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

  {/* Upcoming Events Section */}
  {/* ...existing code... */}

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <Fade>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Artworks</h2>
              <p className="text-xl text-base-content/70">Discover the latest masterpieces from our talented community</p>
            </div>
          </Fade>

          {loading ? (
            <Loader message="Loading featured artworks..." />
          ) : featuredArtworks.length > 0 ? (
            <>
              <Fade cascade damping={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArtworks.slice(0, 6).map((artwork) => (
                    <ArtworkCard 
                      key={artwork._id} 
                      artwork={artwork}
                      onLikeUpdate={handleLikeUpdate}
                    />
                  ))}
                </div>
              </Fade>

              <Fade delay={300}>
                <div className="text-center mt-12">
                  <Link to="/explore" className="btn btn-primary btn-lg">
                    View All Artworks
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </Fade>
            </>
          ) : (
            <div className="text-center py-20">
              <Zoom>
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-xl text-base-content/70 mb-4">No artworks available yet. Be the first to share your art!</p>
                <Link to="/add-artwork" className="btn btn-primary btn-lg">
                  Add Artwork
                </Link>
              </Zoom>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <Fade>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">Top Artists of the Week</h2>
              <p className="text-xl text-slate-300">Meet our most active and appreciated artists</p>
            </div>
          </Fade>

          <Slide direction="up" cascade damping={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {topArtists.map((artist, index) => (
                <ArtistCard
                  key={artist.id || index}
                  rank={index + 1}
                  name={artist.name}
                  initials={artist.initials}
                  avatarUrl={artist.avatarUrl}
                  totalArtworks={artist.totalArtworks}
                  totalLikes={artist.totalLikes}
                />
              ))}
            </div>
          </Slide>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <Fade>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">Community Highlights</h2>
              <p className="text-xl text-slate-300">What's happening in the ARTIFY community</p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Zoom delay={100}>
              <div className="card bg-gradient-to-br from-primary to-primary/70 text-white shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-5xl font-bold mb-2">
                    <span className="animate-pulse">2,456</span>
                  </h3>
                  <p className="text-xl opacity-90">Artworks Shared</p>
                  <p className="text-sm opacity-75 mt-2">Artists from 50+ countries</p>
                </div>
              </div>
            </Zoom>
            <Zoom delay={200}>
              <div className="card bg-gradient-to-br from-secondary to-secondary/70 text-white shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-5xl font-bold mb-2">
                    <span className="animate-pulse">15.2K</span>
                  </h3>
                  <p className="text-xl opacity-90">Total Likes</p>
                  <p className="text-sm opacity-75 mt-2">Community engagement growing daily</p>
                </div>
              </div>
            </Zoom>
            <Zoom delay={300}>
              <div className="card bg-gradient-to-br from-accent to-accent/70 text-white shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-5xl font-bold mb-2">
                    <span className="animate-pulse">1,234</span>
                  </h3>
                  <p className="text-xl opacity-90">Active Artists</p>
                  <p className="text-sm opacity-75 mt-2">Join our creative community</p>
                </div>
              </div>
            </Zoom>
          </div>

          <Fade delay={400}>
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center mb-8">Popular Categories</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Painting', 'Digital Art', 'Photography', 'Sculpture', 'Illustration', 'Mixed Media', '3D Art', 'Abstract'].map((category) => (
                  <Link
                    key={category}
                    to={`/explore?category=${category}`}
                    className="btn btn-outline btn-lg hover:btn-primary"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-2xl md:text-3xl font-semibold text-slate-100 max-w-2xl mx-auto">
                  "Every masterpiece begins with a single stroke. Let your creativity shine, inspire others, and make your mark on the world. The ARTIFY community believes in your vision—create boldly, share fearlessly"
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {!user && (
        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <Fade>
              <div className="text-center text-white space-y-6 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold">Ready to Share Your Creativity?</h2>
                <p className="text-xl opacity-90">Join thousands of artists showcasing their work on ARTIFY</p>
                <Link to="/register" className="btn btn-accent btn-lg">
                  Get Started Free
                </Link>
              </div>
            </Fade>
          </div>
        </section>
      )}
    {/* Upcoming Events Section at the very bottom */}
    <EventsSection />
    </div>
  )
}

export default Home
