import useNotifications from '@/hooks/useNotifications';
import AdminLayout from '@/layout/AdminLayout';
import { formatDistanceToNow } from 'date-fns';
import { IoPersonCircle } from 'react-icons/io5';

function NotificationPage() {
    const { list} = useNotifications({ limit: 4 });
  return (
    <AdminLayout>
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
                        {notification?.createdAt ? formatDistanceToNow(new Date(notification.createdAt), {addSuffix:true}):""}
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
            </AdminLayout>
  )
}

export default NotificationPage