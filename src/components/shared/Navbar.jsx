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
      {user && (
        <>
          <li>
            <NavLink 
              to="/add-artwork" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-semibold' : 'hover:text-primary'
              }
            >
              Add Artwork
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-gallery" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-semibold' : 'hover:text-primary'
              }
            >
              My Gallery
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-favorites" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-semibold' : 'hover:text-primary'
              }
            >
              Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  )

  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container-custom">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-display font-bold gradient-text">
            ARTIFY
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img 
                    src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email)} 
                    alt={user.displayName || 'User'} 
                  />
                </div>
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="menu-title">
                  <span>{user.displayName || 'User'}</span>
                  <span className="text-xs opacity-60">{user.email}</span>
                </li>
                <li><Link to="/my-gallery">My Gallery</Link></li>
                <li><Link to="/my-favorites">Favorites</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
