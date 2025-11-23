import PropTypes from "prop-types";

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
        
        <div className="relative">
          {variants[variant]}
          
          
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        </div>

        
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



