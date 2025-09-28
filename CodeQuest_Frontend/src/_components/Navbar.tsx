import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/context/AuthProvider'

interface NavbarProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

function Navbar({ onItemClick, isMobile = false }: NavbarProps) {
  const { user, signout, selectedRole, setSelectedRole } = useAuth()
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const isRecruiter = user?.role === 'recruiter';
  const isDeveloper = user?.role === 'developer';

  const handleLogout = async () => {
    try {
      signout();
      toast.success('Logout successful');
      navigate('/');
      setSelectedRole('');
      onItemClick?.(); // Close mobile menu after logout
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Logout failed');
    }
  };

  const handleLinkClick = () => {
    onItemClick?.(); // Close mobile menu when a link is clicked
  };

  // Mobile styles
  const mobileClasses = "flex flex-col space-y-4 py-4";
  const desktopClasses = "flex items-center space-x-8";

  const linkBaseClasses = "relative group font-medium transition-colors duration-300";
  const activeClasses = "text-white";
  const inactiveClasses = "text-gray-300 hover:text-white";

  const spanBaseClasses = "absolute left-0 -bottom-1 h-0.5 bg-blue-500";
  const activeSpanClasses = "w-full";
  const inactiveSpanClasses = "w-0 group-hover:w-full transition-all duration-300";

  return (
    <nav className={isMobile ? mobileClasses : desktopClasses}>
      <Link 
        to="/" 
        className={`${linkBaseClasses} ${pathname === '/' ? activeClasses : inactiveClasses}`}
        onClick={handleLinkClick}
      >
        Home
        <span className={`${spanBaseClasses} ${pathname === '/' ? activeSpanClasses : inactiveSpanClasses}`}></span>
      </Link>
      
      {isDeveloper && (
        <Link 
          to="/compete" 
          className={`${linkBaseClasses} ${pathname === '/compete' ? activeClasses : inactiveClasses}`}
          onClick={handleLinkClick}
        >
          Compete
          <span className={`${spanBaseClasses} ${pathname === '/compete' ? activeSpanClasses : inactiveSpanClasses}`}></span>
        </Link>
      )}

      {/* Conditional Links */}
      {isDeveloper && !isRecruiter && (
        <Link 
          to="/developer/dashboard" 
          className={`${linkBaseClasses} ${pathname === '/developer/dashboard' ? activeClasses : inactiveClasses}`}
          onClick={handleLinkClick}
        >
          Dashboard
          <span className={`${spanBaseClasses} ${pathname === '/developer/dashboard' ? activeSpanClasses : inactiveSpanClasses}`}></span>
        </Link>
      )}

      {isRecruiter && (
        <Link 
          to="/recruiter/dashboard" 
          className={`${linkBaseClasses} ${pathname === '/recruiter/dashboard' ? activeClasses : inactiveClasses}`}
          onClick={handleLinkClick}
        >
          Admin Panel
          <span className={`${spanBaseClasses} ${pathname === '/recruiter/dashboard' ? activeSpanClasses : inactiveSpanClasses}`}></span>
        </Link>
      )}

      {/* Auth Buttons */}
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center space-x-4 ml-4'}`}>
        {!user ? (
          <>
            {user === null && (
              selectedRole === '' ? (
                <Link
                  to="/authorize"
                  className="px-4 py-2 rounded-md font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-colors duration-300 text-center"
                  onClick={handleLinkClick}
                >
                  Signin
                </Link>
              ) : selectedRole === 'developer' ? (
                <Link
                  to={`/signin/${selectedRole}`}
                  className="px-4 py-2 rounded-md font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-colors duration-300 text-center"
                  onClick={handleLinkClick}
                >
                  Signin
                </Link>
              ) : (
                <Link
                  to={`/${selectedRole}/signin`}
                  className="px-4 py-2 rounded-md font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-colors duration-300 text-center"
                  onClick={handleLinkClick}
                >
                  Signin
                </Link>
              )
            )}

            {selectedRole === '' ? (
              <Link 
                to="/authorize" 
                className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                onClick={handleLinkClick}
              >
                Create account
              </Link>
            ) : selectedRole === 'developer' ? (
              <Link 
                to={`/signup/${selectedRole}`}
                className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                onClick={handleLinkClick}
              >
                Create account
              </Link>
            ) : (
              <Link 
                to={`/${selectedRole}/signup`}
                className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                onClick={handleLinkClick}
              >
                Create account
              </Link>
            )}
          </>
        ) : (
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-red-400 to-red-500 hover:from-red-400 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;