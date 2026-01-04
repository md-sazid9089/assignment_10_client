import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 text-gray-800 dark:text-slate-100 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-display font-bold gradient-text mb-4 drop-shadow-lg">
              ARTIFY
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A creative platform to showcase and discover amazing artworks from talented artists worldwide.
            </p>
            <div className="pt-4">
              <Link to="/explore" className="btn btn-primary btn-sm rounded-full shadow-lg hover:shadow-xl transition-all">
                Explore Now
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Explore Artworks
                </Link>
              </li>
              <li>
                <Link to="/add-artwork" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Add Artwork
                </Link>
              </li>
              <li>
                <Link to="/my-gallery" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  My Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-secondary rounded-full"></span>
              Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/explore?category=Painting" className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-colors flex items-center gap-2 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Painting
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Digital Art" className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-colors flex items-center gap-2 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Digital Art
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Photography" className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-colors flex items-center gap-2 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Photography
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Sculpture" className="text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-colors flex items-center gap-2 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Sculpture
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Connect With Us
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Follow us on social media for updates and inspiration
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/md-sazid9089" target="_blank" rel="noopener noreferrer" 
                className="btn btn-circle btn-sm bg-gray-200 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary hover:scale-110 transition-all border-0 shadow-md" 
                aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://github.com/md-sazid9089" target="_blank" rel="noopener noreferrer" 
                className="btn btn-circle btn-sm bg-gray-200 dark:bg-gray-800 hover:bg-secondary hover:text-white dark:hover:bg-secondary hover:scale-110 transition-all border-0 shadow-md"
                aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://github.com/md-sazid9089" target="_blank" rel="noopener noreferrer" 
                className="btn btn-circle btn-sm bg-gray-200 dark:bg-gray-800 hover:bg-accent hover:text-white dark:hover:bg-accent hover:scale-110 transition-all border-0 shadow-md" 
                aria-label="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.53 3H21.5L14.42 10.73L22.75 21H16.44L11.38 14.62L5.77 21H1.8L9.27 12.74L1.25 3H7.73L12.36 9.01L17.53 3ZM16.41 19H18.23L7.66 5H5.68L16.41 19Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-black/30 backdrop-blur-sm relative z-10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} <span className="font-semibold gradient-text">ARTIFY</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
