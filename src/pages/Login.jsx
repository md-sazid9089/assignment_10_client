import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Log login attempt for debugging
    console.log('🔐 Login attempt:', { email, timestamp: new Date().toISOString() })
    
    try {
      // Attempt to sign in with Firebase
      console.log('📡 Calling Firebase signIn...')
      const result = await signIn(email, password)
      console.log('✅ Firebase authentication successful:', result.user.email)
      
      // ADMIN PORTAL: Check if logging in user is admin123@gmail.com
      // If yes, open admin portal in NEW TAB instead of regular navigation
      if (email === 'admin123@gmail.com') {
        console.log('🔑 Admin user detected! Opening Admin Portal in new tab...')
        console.log('📋 Admin credentials verified:', { email: 'admin123@gmail.com', role: 'admin' })
        
        // Try to open admin portal in a new tab
        try {
          const adminTab = window.open('/admin-portal', '_blank')
          
          // Check if window.open was successful (not blocked by popup blocker)
          if (adminTab) {
            console.log('✅ Admin portal tab opened successfully')
            adminTab.focus()
            
            // Show success alert to admin
            alert('✅ Admin Portal Opened!\n\nAdmin dashboard has been opened in a new tab.\nYou can manage all artworks, users, and view platform statistics.')
            
            // Keep current window on home page
            // Admin works in separate tab, main tab stays accessible
            navigate('/', { replace: true })
          } else {
            // Window.open returned null - likely blocked by popup blocker
            console.error('❌ Failed to open admin portal tab - popup blocked')
            alert('⚠️ Popup Blocked!\n\nYour browser blocked the admin portal tab.\n\nPlease allow popups for this site and try again.\n\nAlternatively, navigate to /admin-portal manually.')
            
            // Fallback: navigate to admin portal in same tab
            console.log('🔄 Fallback: Navigating to admin portal in same tab')
            navigate('/admin-portal', { replace: true })
          }
        } catch (tabError) {
          // Error occurred during window.open
          console.error('❌ Error opening admin portal tab:', tabError)
          alert('❌ Error Opening Admin Portal\n\nFailed to open admin tab: ' + tabError.message + '\n\nNavigating to admin portal in this tab instead.')
          
          // Fallback: navigate to admin portal in same tab
          navigate('/admin-portal', { replace: true })
        }
      } else {
        // Regular users: normal navigation flow
        console.log('👤 Regular user login successful, redirecting to:', from)
        navigate(from, { replace: true })
      }
    } catch (error) {
      // Login failed - handle different error types
      console.error('❌ Login failed:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      
      // Provide user-friendly error messages
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = '❌ Invalid Credentials\n\nThe email or password you entered is incorrect.\n\nFor admin access, use:\nEmail: admin123@gmail.com\nPassword: admin@123'
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = '❌ User Not Found\n\nNo account exists with this email address.\n\nPlease register first or check your email.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '❌ Invalid Email\n\nPlease enter a valid email address.'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = '❌ Network Error\n\nPlease check your internet connection and try again.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = '❌ Too Many Attempts\n\nAccount temporarily locked due to too many failed login attempts.\n\nPlease try again later.'
      }
      
      // Show error alert
      alert(errorMessage)
    } finally {
      setLoading(false)
      console.log('🔓 Login process completed, loading state reset')
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="card max-w-md w-full p-10 shadow-2xl animate-fade-in bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold gradient-text mb-3">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Sign in to continue to ARTIFY</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full"
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
