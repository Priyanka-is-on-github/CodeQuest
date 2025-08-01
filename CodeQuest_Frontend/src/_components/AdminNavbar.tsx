import { useAuth } from "@/context/AuthProvider";
import { IoPersonCircle } from "react-icons/io5";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminNavbar() {
  const { user, selectedRole } = useAuth();
  const navigate = useNavigate();
   const [internshipLogo, setInternshipLogo] = useState('');
  
   useEffect(() => {
      const fetchInternshipLogo = async () => {
       
        try {
          const response = await fetch(`http://localhost:3001/api/v1/internships/getinternshipLogo?companyName=${encodeURIComponent(user.companyName)}`);
          const {logo} = await response.json();
       
          console.log(logo)
          setInternshipLogo(logo);
        } catch (error) {
          console.error('Error fetching internshipLogo:', error);
        } 
      };
  
      fetchInternshipLogo();
    }, []);
  

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 sm:px-6">
        {/* Left side - Company Info */}
        {user?.companyName && (
          <div 
            className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
            // onClick={() => navigate('/dashboard')} // Add your desired navigation path
          >
            {internshipLogo ? (
              <img 
                src={internshipLogo}
                alt={user.companyName}
                className="w-8 h-8 object-contain rounded-md mr-3"
              />
            ) : (
              <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 font-medium text-sm">
                  {user.companyName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-medium text-gray-700 hidden md:inline-block">
              {user.companyName}
            </span>
          </div>
        )}

        {/* Right side - User controls */}
        <div className="ml-auto flex items-center gap-4">
          {/* Notification with badge */}
          <div className="relative">
            <Notification />
          </div>

          {/* User profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                    {user.name || 'User'}
                  </span>
                  {user.position && (
                    <span className="text-xs text-gray-500 truncate max-w-[160px]">
                      {user.position}
                    </span>
                  )}
                </div>
                
                <div className="relative group">
                  <IoPersonCircle 
                    className="h-10 w-10 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" 
                  />
                  {user.email && (
                    <>
                      <span 
                        className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        title={user.email}
                      >
                        {user.email[0].toUpperCase()}
                      </span>
                      {/* Email tooltip on hover */}
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          {user.email}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <button 
                // onClick={() => navigate(`/signin/${selectedRole}`)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;