import axios from 'axios'
import { auth } from '../firebase/firebase.config'

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser
      if (user) {
        const token = await user.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error getting auth token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', error.request)
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// ============ ARTWORK API ============

/**
 * Get featured artworks (sorted by createdAt, limited to 6)
 */
export const getFeaturedArtworks = async () => {
  const response = await api.get('/api/artworks/featured')
  return response.data
}

/**
 * Get all public artworks with optional search and category filter
 * @param {Object} params - { search, category }
 */
export const getPublicArtworks = async (params = {}) => {
  const response = await api.get('/api/artworks/public', { params })
  return response.data
}

/**
 * Get artwork by ID
 * @param {string} id - Artwork ID
 */
export const getArtworkById = async (id) => {
  const response = await api.get(`/api/artworks/${id}`)
  return response.data
}

/**
 * Get artworks by user email (requires auth)
 * @param {string} email - User email
 */
export const getArtworksByUser = async (email) => {
  const response = await api.get(`/api/artworks/user/${email}`)
  return response.data
}

/**
 * Create new artwork (requires auth)
 * @param {Object} artworkData - Artwork data
 */
export const createArtwork = async (artworkData) => {
  const response = await api.post('/artworks', artworkData)
  return response.data
}

/**
 * Update artwork (requires auth and ownership)
 * @param {string} id - Artwork ID
 * @param {Object} artworkData - Updated artwork data
 */
export const updateArtwork = async (id, artworkData) => {
  const response = await api.put(`artworks/${id}`, artworkData)
  return response.data
}

/**
 * Delete artwork (requires auth and ownership)
 * @param {string} id - Artwork ID
 */
export const deleteArtwork = async (id) => {
  const response = await api.delete(`/artworks/${id}`)
  return response.data
}

/**
 * Toggle like on artwork (requires auth)
 * @param {string} id - Artwork ID
 */
export const toggleLike = async (id) => {
  const response = await api.patch(`/api/artworks/${id}/like`)
  return response.data
}

/**
 * Check if user liked artwork
 * @param {string} id - Artwork ID
 * @param {string} email - User email
 */
export const checkLikeStatus = async (id, email) => {
  const response = await api.get(`/api/artworks/${id}/is-liked/${email}`)
  return response.data
}

/**
 * Get all artwork categories with counts
 */
export const getCategories = async () => {
  const response = await api.get('/api/artworks/categories')
  return response.data
}

// ============ FAVORITE API ============

/**
 * Add artwork to favorites (requires auth)
 * @param {Object} data - { artworkId }
 */
export const addFavorite = async (data) => {
  const response = await api.post('/api/favorites', data)
  return response.data
}

/**
 * Get user's favorites with populated artwork data (requires auth)
 * @param {string} userEmail - User email
 */
export const getUserFavorites = async (userEmail) => {
  const response = await api.get(`/api/favorites/${userEmail}`)
  return response.data
}

/**
 * Remove artwork from favorites (requires auth)
 * @param {Object} data - { artworkId }
 */
export const removeFavorite = async (data) => {
  const response = await api.delete('/api/favorites', { data })
  return response.data
}

/**
 * Toggle favorite status (add/remove) (requires auth)
 * @param {Object} data - { artworkId }
 */
export const toggleFavorite = async (data) => {
  const response = await api.post('/api/favorites/toggle', data)
  return response.data
}

/**
 * Check if artwork is favorited by user
 * @param {string} userEmail - User email
 * @param {string} artworkId - Artwork ID
 */
export const checkFavoriteStatus = async (userEmail, artworkId) => {
  const response = await api.get(`/api/favorites/check/${userEmail}/${artworkId}`)
  return response.data
}

/**
 * Get array of favorited artwork IDs for user
 * @param {string} userEmail - User email
 */
export const getFavoriteIds = async (userEmail) => {
  const response = await api.get(`/api/favorites/${userEmail}/ids`)
  return response.data
}

/**
 * Get count of user's favorites
 * @param {string} userEmail - User email
 */
export const getFavoritesCount = async (userEmail) => {
  const response = await api.get(`/api/favorites/${userEmail}/count`)
  return response.data
}

/**
 * Clear all favorites for user (requires auth)
 * @param {string} userEmail - User email
 */
export const clearAllFavorites = async (userEmail) => {
  const response = await api.delete(`/api/favorites/${userEmail}/clear`)
  return response.data
}

export default api
