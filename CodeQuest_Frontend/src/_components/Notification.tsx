import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaBell } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import useNotifications from "@/hooks/useNotifications";



function Notification() {
  const { list, open, setOpen, fetchRecent, unreadCount, markAllReadOnOpen} = useNotifications({ limit: 4 });

  console.log('notificalist=',list)
  console.log('unreadcount=',unreadCount)


 async function onToggle() {
    if (!open) {
      // open: fetch recent items
      await fetchRecent();

      // Now mark all unread as read (this updates server and other tabs)
      await markAllReadOnOpen();
    }
    setOpen(!open);
  }
  return (
     <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-full h-10 w-10 hover:bg-gray-200/50"
          onClick={()=>onToggle()}
        >
          <FaBell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        align="end" 
        className="w-96 p-0  shadow-xl rounded-lg overflow-hidden border-0"
      >
        <div className="bg-gradient-to-r from-sky-800 to-sky-600 p-4">
          <h4 className="font-semibold text-white flex items-center justify-between">
            <span>Notifications ({list.length})</span>
           
          </h4>
        </div>

        <div className="max-h-96 overflow-y-auto  bg-gray-50">
          {list.length > 0 ? (
            list.map(({notification}) => (
              <div 
                key={notification?._id} 
                className="flex items-start p-4 border-b border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  <IoPersonCircle className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification?.createdAt}
                  </p>
                </div>
                
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No new notifications</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-4 py-3 text-center border-t">
          <Link to='/recruiter/notifications'>
          <button className="text-sm font-medium text-sky-600 hover:text-sky-800">
            View all notifications
          </button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
