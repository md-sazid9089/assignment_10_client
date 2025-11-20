import PropTypes from "prop-types";
/**
 * Reusable Loading Spinner Component
 * Can be used for data fetching, authentication, and any async operations
 * 
 */
/**
 * Reusable Loading Spinner Component
 * Can be used for data fetching, authentication, and any async operations
 * 
 * @param {string} size - Size of the spinner: 'sm', 'md', 'lg', 'xl'
 * @param {string} variant - Visual style: 'spinner', 'dots', 'ring', 'ball'
 * @param {string} message - Optional loading message to display
 * @param {boolean} fullScreen - Whether to cover the full screen
 * @param {string} overlay - Background overlay: 'none', 'light', 'dark', 'blur'
 */
const Loader = ({ 
  size = 'lg', 
  variant = 'spinner', 
  message = '', 
  fullScreen = false,
  overlay = 'none'
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  // Spinner variants
  const variants = {
    spinner: (
      <span className={`loading loading-spinner text-primary ${sizeClasses[size]}`}></span>
    ),
    dots: (
      <span className={`loading loading-dots text-primary ${sizeClasses[size]}`}></span>
    ),
    ring: (
      <span className={`loading loading-ring text-primary ${sizeClasses[size]}`}></span>
    ),
    ball: (
      <span className={`loading loading-ball text-primary ${sizeClasses[size]}`}></span>
    )
  }

  // Overlay backgrounds
  const overlayClasses = {
    none: '',
    light: 'bg-white/50',
    dark: 'bg-black/50',
    blur: 'bg-white/30 dark:bg-black/30 backdrop-blur-sm'
  }

  // Container classes
  const containerClasses = fullScreen
    ? `fixed inset-0 z-50 flex flex-col items-center justify-center ${overlayClasses[overlay]}`
    : 'flex flex-col items-center justify-center py-8'

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          {variants[variant]}
          
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        </div>

        {/* Loading Message */}
        {message && (
          <p className="text-base-content/70 text-center font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['spinner', 'dots', 'ring', 'ball']),
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.oneOf(['none', 'light', 'dark', 'blur'])
}

export default Loader


/**
 * USAGE EXAMPLES:
 * 
 * // Basic loader
 * <Loader />
 * 
 * // With message
 * <Loader message="Loading artworks..." />
 * 
 * // Different sizes
 * <Loader size="sm" message="Loading..." />
 * <Loader size="xl" />
 * 
 * // Different variants
 * <Loader variant="dots" />
 * <Loader variant="ring" />
 * <Loader variant="ball" />
 * 
 * // Full screen with overlay
 * <Loader fullScreen overlay="blur" message="Loading..." />
 * 
 * // In a component:
 * {loading && <Loader message="Fetching data..." />}
 * 
 * // Auth loading:
 * {authLoading && (
 *   <Loader 
 *     fullScreen 
 *     overlay="blur" 
 *     message="Authenticating..." 
 *     variant="ring"
 *   />
 * )}
 */
