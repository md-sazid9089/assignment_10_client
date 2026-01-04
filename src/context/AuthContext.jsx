import { createContext, useState, useEffect, useContext } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth } from '../firebase/firebase.config'
import toast from 'react-hot-toast'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Google provider
  const googleProvider = new GoogleAuthProvider()

  // Create user with email and password
  const createUser = async (email, password, displayName) => {
    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      // Update profile with display name
      await updateProfile(result.user, {
        displayName: displayName
      })
      toast.success('Account created successfully!')
      return result
    } catch (error) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      toast.success('Signed in successfully!')
      return result
    } catch (error) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      toast.success('Signed in with Google successfully!')
      return result
    } catch (error) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const logOut = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      toast.success('Signed out successfully!')
    } catch (error) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      await updateProfile(auth.currentUser, updates)
      setUser({ ...auth.currentUser })
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  // Get Firebase ID token for API calls
  const getIdToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken()
    }
    return null
  }

  // Observer for auth state changes
  useEffect(() => {
    console.log('🔍 Setting up Firebase auth state observer...')
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          console.log('👤 User authenticated:', currentUser.email)
          
          // Add role property to user object
          // Default role is 'user', can be set to 'admin' for admin users
          
          // Set default role as 'user'
          currentUser.role = 'user'
          console.log('📝 Default role assigned: user')
          
          // ADMIN PORTAL: Set admin role for specific admin email
          // When admin123@gmail.com logs in, they get admin role and admin portal opens
          if (currentUser.email === 'admin123@gmail.com') {
            currentUser.role = 'admin'
            console.log('🔑 ADMIN ROLE ASSIGNED to:', currentUser.email)
            console.log('✅ Admin privileges granted - user can access admin portal')
          }
          
          console.log('👤 Current user object:', {
            email: currentUser.email,
            displayName: currentUser.displayName,
            role: currentUser.role,
            uid: currentUser.uid
          })
        } else {
          console.log('🚪 No authenticated user - user logged out or not logged in')
        }
        
        setUser(currentUser)
        setLoading(false)
        console.log('✅ Auth state updated successfully')
      } catch (error) {
        console.error('❌ Error in auth state observer:', error)
        console.error('Error details:', error.message)
        setLoading(false)
      }
    })

    return () => {
      console.log('🔌 Cleaning up auth state observer')
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    getIdToken
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
