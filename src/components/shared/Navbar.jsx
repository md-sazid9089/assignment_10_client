import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import UpdateProfileModal from '../UpdateProfileModal';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  function handleProfileUpdated(updatedUser) {
    // Update user in context or state as needed
  }

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
            isActive
              ? 'font-semibold text-white'
              : 'text-white hover:text-white/80'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/explore" 
          className={({ isActive }) => 
            isActive ? 'font-semibold text-white' : 'text-white hover:text-white/80'
          }
        >
          Explore
        </NavLink>
      </li>
      
    </>
  )

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="w-full flex justify-center">
        <div className="mt-4 mb-2 flex items-center justify-between gap-6 px-6 py-3 rounded-full bg-slate-900/70 backdrop-blur shadow-lg max-w-5xl w-full transition-all duration-300 border border-slate-700/40 text-slate-100">
        
        <div className="flex items-center gap-4 min-w-[120px]">
          <Link to="/" className="text-2xl font-display font-bold gradient-text tracking-tight select-none drop-shadow-sm">
            ARTIFY
          </Link>
        </div>

        
        <div className="hidden lg:flex items-center justify-center flex-1">
          <ul className="flex gap-6 text-base font-semibold">
            {navLinks}
          </ul>
        </div>

        
        <div className="flex items-center gap-3 min-w-[120px] justify-end">
          {user && (
            <button className="btn btn-outline btn-sm hidden lg:inline-flex" type="button" onClick={() => window.toast && window.toast('Notifications (dummy)!') || (typeof toast !== 'undefined' && toast('Notifications (dummy)!'))}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
          )}
          {user ? (
            <>
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
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-slate-900/80 backdrop-blur-md text-slate-100 rounded-xl w-56 transition-all duration-200 border border-slate-700/40">
                  <li className="menu-title pb-1 border-b border-base-200 mb-2">
                    <span className="font-semibold text-slate-100">{user.displayName || 'User'}</span>
                    <span className="text-xs text-slate-400">{user.email}</span>
                  </li>
                  <li><Link to="/add-artwork">Add Artwork</Link></li>
                  <li><Link to="/my-gallery">My Gallery</Link></li>
                  <li><Link to="/my-favorites">Favorites</Link></li>
                  <li>
                    <button
                      className="text-primary w-full text-left"
                      onClick={() => setIsUpdateProfileOpen(true)}
                    >
                      Update Profile
                    </button>
                  </li>
                  <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost rounded-full">Login</Link>
              <Link to="/register" className="btn btn-primary rounded-full">Register</Link>
            </div>
          )}
        </div>

        
        <div className="lg:hidden flex items-center">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost rounded-full transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-slate-900/80 backdrop-blur-md text-slate-100 rounded-xl w-52 transition-all duration-200 border border-slate-700/40">
              {navLinks}
            </ul>
          </div>
        </div>
        </div>
        
        {isUpdateProfileOpen && (
          <UpdateProfileModal
            user={user}
            onClose={() => setIsUpdateProfileOpen(false)}
            onProfileUpdated={handleProfileUpdated}
          />
        )}
      </div>
    </header>
  )
}

export default Navbar
