import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fade, Zoom } from 'react-awesome-reveal'
import { useAuth } from '../hooks/useAuth'
import { getArtworksByUser, deleteArtwork } from '../services/api'
import ArtworkEditModal from '../components/ArtworkEditModal'
import PageLoader from '../components/PageLoader'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const MyGallery = () => {
  const { user } = useAuth()
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Add reload trigger for refetch after upload
  const [reloadGallery, setReloadGallery] = useState(false);
  useEffect(() => {
    if (user?.email) {
      fetchUserArtworks();
    }
  }, [user?.email, reloadGallery]);

  const fetchUserArtworks = async () => {
    setLoading(true)
    try {
      const data = await getArtworksByUser(user.email)
      setArtworks(data.data || [])
    } catch (error) {
      console.error('Error fetching artworks:', error)
      toast.error('Failed to load your artworks')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
  }

  const handleDelete = async (artwork) => {
    const result = await Swal.fire({
      title: 'Delete Artwork?',
      html: `Are you sure you want to delete <strong>"${artwork.title}"</strong>?<br/>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await deleteArtwork(artwork._id)
        
        // Remove from state
        setArtworks(prevArtworks => 
          prevArtworks.filter(art => art._id !== artwork._id)
        )

        Swal.fire({
          title: 'Deleted!',
          text: 'Your artwork has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      } catch (error) {
        console.error('Error deleting artwork:', error)
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete artwork. Please try again.',
          icon: 'error'
        })
      }
    }
  }

  const handleUpdateSuccess = (updatedArtwork) => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
    setReloadGallery(r => !r); // Refetch gallery
    toast.success('Artwork updated successfully!');
  };

  if (loading) {
    return <PageLoader message="Loading your gallery..." />
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Fade>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                My Gallery
              </h1>
              <p className="text-xl text-base-content/70">
                Welcome back, {user?.displayName || 'Artist'}!
              </p>
            </div>
            <Link to="/add-artwork" className="btn btn-primary btn-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Artwork
            </Link>
          </div>
        </Fade>

        {/* Stats */}
        {artworks.length > 0 && (
          <Fade delay={100}>
            <div className="stats shadow mb-8 w-full md:w-auto">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="stat-title">Total Artworks</div>
                <div className="stat-value text-primary">{artworks.length}</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-error">
                  {artworks.reduce((sum, art) => sum + (art.likesCount || 0), 0)}
                </div>
              </div>
            </div>
          </Fade>
        )}

        {/* Artworks Grid */}
        {artworks.length > 0 ? (
          <Fade cascade damping={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artworks.map((artwork) => (
                <div key={artwork._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <figure className="relative aspect-square overflow-hidden">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title}
                      className="object-cover w-full h-full"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-primary badge-sm">{artwork.category}</span>
                    </div>
                    {/* Visibility Badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`badge badge-sm ${artwork.visibility === 'Public' ? 'badge-success' : 'badge-warning'}`}>
                        {artwork.visibility}
                      </span>
                    </div>
                  </figure>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg line-clamp-1">{artwork.title}</h3>
                    
                    <p className="text-sm text-base-content/70 line-clamp-2">
                      {artwork.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm mt-2">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-error" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-medium">{artwork.likesCount || 0}</span>
                      </div>
                      <span className="text-base-content/60">{artwork.medium}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="card-actions justify-between mt-4 gap-2">
                      <Link 
                        to={`/artworks/${artwork._id}`}
                        className="btn btn-sm btn-ghost flex-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                      
                      <button 
                        onClick={() => handleEdit(artwork)}
                        className="btn btn-sm btn-primary flex-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      
                      <button 
                        onClick={() => handleDelete(artwork)}
                        className="btn btn-sm btn-error flex-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        ) : (
          <Zoom>
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🖼️</div>
              <h3 className="text-3xl font-bold mb-4">No Artworks Yet</h3>
              <p className="text-xl text-base-content/70 mb-8 max-w-md mx-auto">
                Start building your gallery by uploading your first artwork
              </p>
              <Link to="/add-artwork" className="btn btn-primary btn-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Your First Artwork
              </Link>
            </div>
          </Zoom>
        )}

        {/* Edit Modal */}
        {isModalOpen && selectedArtwork && (
          <ArtworkEditModal
            artwork={selectedArtwork}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedArtwork(null)
            }}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default MyGallery
