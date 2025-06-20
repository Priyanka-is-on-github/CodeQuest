import { Home, Layout, LogOut, Settings, TabletSmartphone, User2Icon } from 'lucide-react';

import { IoNotifications } from 'react-icons/io5';
import { MdQuestionAnswer } from 'react-icons/md';

import { PiQuestionMarkThin } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';

const routes = [


    {
      label: "Home",
      icon: <Home />,
      link: "/",
    },
    {
      label: "Admin Dashboard",
      icon: <Layout />,
      link: "/admin",
    },
    {
      label: "Interships Management",
      icon: <TabletSmartphone />,
      link: "/admin/intershipsmanagement",
    },
    {
      label: "Handle user",
      icon: <User2Icon/>,
      link: "/",
    },
    
    
    
    {
      label: "Notification",
      icon: <IoNotifications />,
      link: "/dashboard",
    },
  
    {
      icon: <Settings />,
      label: "Settings",
      link: "/search",
    },
    {
    icon: <LogOut />,
    label: "Log out",
    link: "/",
  },
   
  ];
  
function AdminSidebar() {
    const { pathname } = useLocation();

    return (
     <div className="border-r overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 h-full hidden md:flex w-60 flex-col fixed inset-y-0 z-50 shadow-xl">
       <div className="p-6">
         <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
           CodeQuest
         </p>
       </div>
     
       <div className="flex flex-col w-full mt-4">
         {routes.map((route) => (
           <Link key={route.label} to={route.link}>
             <div
               className={`flex items-center gap-x-3 text-gray-300 text-sm font-medium pl-6 py-4 transition-all 
               hover:text-white hover:bg-gray-700/50 ${
                 pathname === route.link
                   ? "text-white bg-blue-900/30 border-r-4 border-blue-500"
                   : ""
               }`}
             >
               <div className="flex items-center gap-x-2">
                 <span className="text-lg">{route.icon}</span> 
                 <span>{route.label}</span>
               </div>
             </div>
           </Link>
         ))}
       </div>
     </div>
      );
}

export default AdminSidebar