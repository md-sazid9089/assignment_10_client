import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { user, logOut } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? 'text-primary font-semibold' : 'hover:text-primary'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/explore" 
          className={({ isActive }) => 
            isActive ? 'text-primary font-semibold' : 'hover:text-primary'
          }
        >
          Explore
        </NavLink>
      </li>
      {/* existing code continues below */}
    </>
  )

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50 backdrop-blur-lg bg-opacity-95 transition-all duration-300">
      <div className="container-custom flex items-center justify-between py-2 px-2 lg:px-6">
        <div className="flex items-center gap-4">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden rounded-full transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-xl w-52 transition-all duration-200">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-display font-bold gradient-text tracking-tight select-none">
            ARTIFY
          </Link>
        </div>

        <div className="hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1 gap-4 text-base font-medium">
            {navLinks}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar rounded-full transition-all duration-200">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
                  <img 
                    src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email)} 
                    alt={user.displayName || 'User'} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-xl w-56 transition-all duration-200">
                <li className="menu-title pb-1 border-b border-base-200 mb-2">
                  <span className="font-semibold">{user.displayName || 'User'}</span>
                  <span className="text-xs opacity-60">{user.email}</span>
                </li>
                <li><Link to="/add-artwork">Add Artwork</Link></li>
                <li><Link to="/my-gallery">My Gallery</Link></li>
                <li><Link to="/my-favorites">Favorites</Link></li>
                <li><button onClick={handleLogout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost rounded-full">Login</Link>
              <Link to="/register" className="btn btn-primary rounded-full">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
