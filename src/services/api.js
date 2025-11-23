
import axios from 'axios'
import { auth } from '../firebase/firebase.config'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://assignment10-server-sage-iota.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export const getFeaturedArtworks = async () => {
  const response = await api.get('/artworks/featured')
  return response.data
}

export const getPublicArtworks = async (params = {}) => {
  const response = await api.get('/artworks/public', { params })
  return response.data
}

export const getArtworkById = async (id) => {
  const response = await api.get(`/artworks/${id}`)
  return response.data
}

export const getArtworksByUser = async (email) => {
  const response = await api.get(`/artworks/user/${email}`)
  return response.data
}

export const createArtwork = async (artworkData) => {
  const response = await api.post('/artworks', artworkData)
  return response.data
}

export const updateArtwork = async (id, artworkData) => {
  const response = await api.put(`/artworks/${id}`, artworkData)
  return response.data
}

export const deleteArtwork = async (id) => {
  const response = await api.delete(`/artworks/${id}`)
  return response.data
}

export const toggleLike = async (id) => {
  const response = await api.patch(`/artworks/${id}/like`)
  return response.data
}

export const checkLikeStatus = async (id, email) => {
  const response = await api.get(`/artworks/${id}/is-liked/${email}`)
  return response.data
}

export const getCategories = async () => {
  const response = await api.get('/artworks/categories')
  return response.data
}

export const addFavorite = async (data) => {
  const response = await api.post('/favorites', data)
  return response.data
}

export const getUserFavorites = async (userEmail) => {
  const response = await api.get(`/favorites/${userEmail}`)
  return response.data
}

export const removeFavorite = async (data) => {
  const response = await api.delete('/favorites', { data })
  return response.data
}

export const toggleFavorite = async (data) => {
  const response = await api.post('/favorites/toggle', data)
  return response.data
}

export const checkFavoriteStatus = async (userEmail, artworkId) => {
  const response = await api.get(`/favorites/check/${userEmail}/${artworkId}`)
  return response.data
}

export const getFavoriteIds = async (userEmail) => {
  const response = await api.get(`/favorites/${userEmail}/ids`)
  return response.data
}

export const getFavoritesCount = async (userEmail) => {
  const response = await api.get(`/favorites/${userEmail}/count`)
  return response.data
}

export const clearAllFavorites = async (userEmail) => {
  const response = await api.delete(`/favorites/${userEmail}/clear`)
  return response.data
}

export default api
