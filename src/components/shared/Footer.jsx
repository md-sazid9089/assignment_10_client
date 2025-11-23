import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-slate-100">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              ARTIFY
            </h3>
            <p className="text-sm opacity-80">
              A creative platform to showcase and discover amazing artworks from talented artists worldwide.
            </p>
          </div>

          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-primary transition-colors">
                  Explore Artworks
                </Link>
              </li>
              <li>
                <Link to="/add-artwork" className="hover:text-primary transition-colors">
                  Add Artwork
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary transition-colors cursor-pointer">Painting</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Digital Art</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Photography</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Sculpture</li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/md-sazid9089" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-ghost" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
                <a href="#" className="btn btn-circle btn-ghost" aria-label="X (Twitter)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.53 3H21.5L14.42 10.73L22.75 21H16.44L11.38 14.62L5.77 21H1.8L9.27 12.74L1.25 3H7.73L12.36 9.01L17.53 3ZM16.41 19H18.23L7.66 5H5.68L16.41 19Z" />
                  </svg>
                </a>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-base-300">
        <div className="container-custom py-6">
          <div className="text-center text-sm opacity-70">
            <p>&copy; {currentYear} ARTIFY. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
