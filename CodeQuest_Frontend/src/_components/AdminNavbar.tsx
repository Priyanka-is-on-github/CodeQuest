import { useAuth } from "@/context/AuthProvider";
import { IoPersonCircle } from "react-icons/io5";
import Notification from "./Notification";

function AdminNavbar() {
  const { user } = useAuth(); // Removed isLoading since it's not in your AuthContextType

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 sm:px-6">
    
       

        {/* Right side - User controls */}
        <div className="ml-auto flex items-center gap-4">
          {/* Notification with badge */}
          <div className="relative">
            <Notification />
          </div>

          {/* User profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
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
                <div className="relative">
                  <IoPersonCircle 
                    className="h-10 w-10 text-gray-600 hover:text-blue-600 transition-colors" 
                  />
                  {user.email && (
                    <span 
                      className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      title={user.email}
                    >
                      {user.email[0].toUpperCase()}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Not logged in</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;