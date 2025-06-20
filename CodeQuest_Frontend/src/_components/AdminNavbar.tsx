
import { useLocation } from "react-router-dom";
import Notification from "./Notification";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


function AdminNavbar() {
  const { pathname } = useLocation();
  

  return (
   <div className="sticky top-0 z-50 w-full border-b bg-gray-50   shadow-sm">
      <div className="flex h-16 items-center px-4 sm:px-6">
     
        

        {/* Right side - User controls */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Notification with badge */}
         <div className="relative">
          <Notification/>
        </div>

          {/* admin login*/}
        <div className="flex flex-col ">
          <span>priyankasingh8885@gmail.com</span>
          <span>Priyanka singh</span>
        </div>
           {/* <IoPersonCircle className="h-10 w-10  mr-4" /> */}

        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        </div>
      </div>
    </div>
  );
};
  


export default AdminNavbar;
