import Loader from './Loader'

/**
 * Full Page Loading Component
 * Used for initial page loads, route transitions, and auth verification
 */
const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <Loader size="xl" variant="spinner" />
        <p className="mt-6 text-xl text-base-content/70 font-medium animate-pulse">
          {message}
        </p>
        
        {/* Logo or Brand */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ARTIFY
          </h2>
        </div>
      </div>
    </div>
  )
}

export default PageLoader


/**
 * USAGE:
 * 
 * // In PrivateRoute or any route guard:
 * if (loading) {
 *   return <PageLoader message="Verifying authentication..." />
 * }
 * 
 * // In pages with initial data load:
 * if (loading) {
 *   return <PageLoader message="Loading artworks..." />
 * }
 */
