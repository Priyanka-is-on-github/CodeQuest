
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useAuth } from '@/context/AuthProvider'

function Navbar() {
const {user, signout, selectedRole, setSelectedRole} = useAuth()
const { pathname } = useLocation();
// Calculate roles once during render
  const isRecruiter = user?.role === 'recruiter';
  const isDeveloper = user?.role === 'developer';



  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
       

        
            // Clear any local data if necessary
        signout()
            toast.success('Logout successful');
            // Redirect to login or home page

           navigate('/')
           setSelectedRole('')
        } 
           
        catch (error) {
        console.error('Error logging out:', error);
        toast.error('Logout failed')
    }
};

 

  return (
    
   <nav className="hidden md:flex items-center space-x-8 ">
        <Link 
          to="/" 
          className={`${pathname === '/'?"relative group font-medium text-white" :  "relative group font-medium text-gray-300 hover:text-white transition-colors duration-300"}`}
        >
          Home
          <span className={`${pathname === '/'? "absolute left-0 -bottom-1  h-0.5 bg-blue-500 w-full ": "absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"}`}></span>
        </Link>
        {
          isDeveloper && (
 <Link 
          to="/compete" 
          className={`${pathname === '/compete'?"relative group font-medium text-white" :  "relative group font-medium text-gray-300 hover:text-white transition-colors duration-300"}`}
        >
          Compete
          <span className={`${pathname === '/compete'? "absolute left-0 -bottom-1  h-0.5 bg-blue-500 w-full ": "absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"}`}></span>
        </Link>
          )
        }
       

        {/* Conditional Links */}
        {isDeveloper && !isRecruiter && (
          <>
          
          <Link 
            to="/developer/dashboard" 
            className={`${pathname === '/user/dashboard'?"relative group font-medium text-white" :  "relative group font-medium text-gray-300 hover:text-white transition-colors duration-300"}`}
          >
            Dashboard
            <span className={`${pathname === '/user/dashboard'? "absolute left-0 -bottom-1  h-0.5 bg-blue-500 w-full ": "absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"}`}></span>
          </Link></>
        )}

        {isRecruiter && (
          <Link 
            to="/recruiter/dashboard" 
            className={`${pathname === '/admin/dashboard'?"relative group font-medium text-white" :  "relative group font-medium text-gray-300 hover:text-white transition-colors duration-300"}`}
          >
            Admin Panel
            <span className={`${pathname === '/admin/dashboard'? "absolute left-0 -bottom-1  h-0.5 bg-blue-500 w-full ": "absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"}`}></span>
          </Link>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4 ml-4">
          {!user? (
            <>

          {
  user === null && (
    selectedRole === '' ? (
      <Link
        to={`/authorize`}
        className="px-4 py-2 rounded-md font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-colors duration-300"
      >
        Signin
      </Link>
    ) : selectedRole === 'developer' ? (
      <Link
        to={`/signin/${selectedRole}`}
        className="px-4 py-2 rounded-md font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-colors duration-300"
      >
        Signin
      </Link>
    ) : (
      <Link
        to={`/${selectedRole}/signin`}
        className="px-4 py-2 rounded-md font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 transition-colors duration-300"
      >
        Signin
      </Link>
    )
  )
}
             


              {
                selectedRole === ''
                 ? (<Link 
                to="/authorize" 
                className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create account
              </Link>): selectedRole === 'developer'? (
                <Link 
                to={`/signup/${selectedRole}` }
                className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create account
              </Link>
              ):(<Link 
                to={`/${selectedRole}/signup` }
                className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create account
              </Link>)
              }
              
             
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-red-400 to-red-500 hover:from-red-400 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          )}
        </div>
      </nav>
 
  )
}

export default Navbar