import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaBell } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";


function Notification() {
  const [notificationCount, setNotificationCount] = useState(5);
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      avatar: <IoPersonCircle className="h-8 w-8 text-gray-400" />,
      message: "New internship application from Rahul Sharma",
      time: "2 mins ago",
      action: "Review"
    },
    {
      id: 2,
      avatar: <IoPersonCircle className="h-8 w-8 text-gray-400" />,
      message: "Priyanka Kumari completed the frontend test with 85% score",
      time: "15 mins ago",
      action: "View"
    },
    {
      id: 3,
      avatar: <IoPersonCircle className="h-8 w-8 text-gray-400" />,
      message: "System maintenance scheduled for tonight at 2 AM",
      time: "1 hour ago",
      action: "Details"
    }
  ];
  return (
     <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-full h-10 w-10 hover:bg-gray-200/50"
        >
          <FaBell className="h-5 w-5 text-gray-600" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
            >
              {notificationCount}
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
            <span>Notifications ({notificationCount})</span>
            <button className="text-xs text-sky-200 hover:text-white">
              Mark all as read
            </button>
          </h4>
        </div>

        <div className="max-h-96 overflow-y-auto  bg-gray-50">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="flex items-start p-4 border-b border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  {notification.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white"
                  >
                    {notification.action}
                  </Button>
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
          <button className="text-sm font-medium text-sky-600 hover:text-sky-800">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
