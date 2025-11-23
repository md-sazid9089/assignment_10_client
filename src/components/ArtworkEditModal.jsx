import { useState } from 'react'
import { updateArtwork } from '../services/api'
import toast from 'react-hot-toast'

const ArtworkEditModal = ({ artwork, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    imageUrl: artwork.imageUrl || '',
    title: artwork.title || '',
    category: artwork.category || '',
    medium: artwork.medium || '',
    description: artwork.description || '',
    dimensions: artwork.dimensions || '',
    price: artwork.price || '',
    visibility: artwork.visibility || 'Public'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'Painting',
    'Digital Art',
    'Photography',
    'Sculpture',
    'Illustration',
    'Mixed Media',
    '3D Art',
    'Abstract',
    'Portrait',
    'Landscape'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.imageUrl || !formData.title || !formData.category || !formData.medium || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await updateArtwork(artwork._id, formData)
      onSuccess(response.artwork)
      toast.success('Artwork updated successfully!')
      onClose()
    } catch (error) {
      console.error('Error updating artwork:', error)
      toast.error(error.response?.data?.message || 'Failed to update artwork')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-black rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8">
          {/* Modal Header */}
          <div className="sticky top-0 bg-black border-b border-base-300 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold">Edit Artwork</h2>
            <button 
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white">Image URL <span className="text-error">*</span></span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered bg-black text-white border-gray-700"
                required
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white">Title <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter artwork title"
                className="input input-bordered bg-black text-white border-gray-700"
                required
              />
            </div>

            {/* Category & Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">Category <span className="text-error">*</span></span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered bg-black text-white border-gray-700"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">Medium <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  placeholder="e.g., Oil on Canvas"
                  className="input input-bordered bg-black text-white border-gray-700"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white">Description <span className="text-error">*</span></span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your artwork..."
                className="textarea textarea-bordered h-32 bg-black text-white border-gray-700"
                required
              />
            </div>

            {/* Dimensions & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">Dimensions</span>
                  <span className="label-text-alt text-white">Optional</span>
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 24 x 36 inches"
                  className="input input-bordered bg-black text-white border-gray-700"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">Price</span>
                  <span className="label-text-alt text-white">Optional</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="input input-bordered bg-black text-white border-gray-700"
                />
              </div>
            </div>

            {/* Visibility */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white">Visibility</span>
              </label>
              <div className="flex gap-4">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="visibility"
                    value="Public"
                    checked={formData.visibility === 'Public'}
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text text-white">Public</span>
                </label>
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="visibility"
                    value="Private"
                    checked={formData.visibility === 'Private'}
                    onChange={handleChange}
                    className="radio radio-warning"
                  />
                  <span className="label-text text-white">Private</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Artwork
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ArtworkEditModal
