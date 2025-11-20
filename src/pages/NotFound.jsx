import { Link, useNavigate } from 'react-router-dom'
import { Fade, Zoom, Bounce } from 'react-awesome-reveal'
import { useTheme } from '../context/ThemeContext'

const NotFound = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/5 dark:via-secondary/5 dark:to-accent/5 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🎨</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🖼️</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}>🎭</div>
        <div className="absolute top-1/2 left-1/4 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '2s' }}>🖌️</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.8s' }}>🎪</div>
      </div>

      {/* Main Content */}
      <div className="text-center px-4 relative z-10 max-w-4xl mx-auto">
        <Fade>
          {/* 404 Number with Canvas Theme */}
          <div className="relative inline-block mb-8">
            <Zoom>
              <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent filter drop-shadow-2xl">
                404
              </div>
            </Zoom>
            {/* Paint Splatter Effect */}
            <div className="absolute -top-8 -right-8 text-6xl opacity-30 rotate-12">🎨</div>
            <div className="absolute -bottom-4 -left-4 text-5xl opacity-30 -rotate-12">🖌️</div>
          </div>
        </Fade>

        <Fade delay={200}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Artwork Not Found
          </h1>
        </Fade>

        <Fade delay={400}>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
            Oops! Looks like this masterpiece has been moved to another gallery...
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been removed.
          </p>
        </Fade>

        {/* Creative Message with Art Theme */}
        <Bounce delay={600}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border-2 border-dashed border-primary/30 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl">🖼️</span>
              <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Lost in the Gallery?</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Don't worry! Let's get you back to exploring amazing artworks.
            </p>
          </div>
        </Bounce>

        {/* Action Buttons */}
        <Fade delay={800} cascade damping={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/" 
              className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-secondary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            
            <Link 
              to="/explore" 
              className="btn btn-accent btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Artworks
            </Link>
          </div>
        </Fade>

        {/* Helpful Links */}
        <Fade delay={1000}>
          <div className="mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Or try one of these popular sections:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/" className="badge badge-lg badge-outline hover:badge-primary transition-colors">
                Home
              </Link>
              <Link to="/explore" className="badge badge-lg badge-outline hover:badge-secondary transition-colors">
                Explore Gallery
              </Link>
              <Link to="/login" className="badge badge-lg badge-outline hover:badge-accent transition-colors">
                Login
              </Link>
              <Link to="/register" className="badge badge-lg badge-outline hover:badge-info transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </Fade>

        {/* Theme Toggle Button */}
        <Fade delay={1200}>
          <div className="mt-8">
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Error Code: 404 | Page Not Found | {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </p>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default NotFound
