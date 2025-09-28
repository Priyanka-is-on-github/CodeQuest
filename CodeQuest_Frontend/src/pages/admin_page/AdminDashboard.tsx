import NewIntershipForm from "@/_components/QuestionsComponent/NewInternshipForm";
import AdminLayout from "@/layout/AdminLayout";
import { BarChart, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

// Type definitions
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  link: string;
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  score?: string;
  icon?: string;
}

function AdminDashboard() {
  // Sample data - replace with actual data from your backend
  const stats = {
    totalUsers: 1248,
    activeInternships: 5,
    completedTests: 342,
    pendingApplications: 28
  };

  const recentActivities: Activity[] = [
    { id: 1, user: 'Priyanka Kumari', action: 'completed Frontend test', time: '2 mins ago', score: '85%' },
    { id: 2, user: 'Rahul Sharma', action: 'applied for Backend internship', time: '15 mins ago' },
    { id: 3, user: 'Neha Patel', action: 'created new account', time: '1 hour ago' },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header with Create Button */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 pl-4">Admin Dashboard</h1>
          <NewIntershipForm />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="👥" 
            color="from-blue-600 to-blue-800"
            link="/admin/users"
          />
          <StatCard 
            title="Active Internships" 
            value={stats.activeInternships} 
            icon="💼" 
            color="from-purple-600 to-purple-800"
            link="/admin/internships"
          />
          <StatCard 
            title="Completed Tests" 
            value={stats.completedTests} 
            icon="📝" 
            color="from-green-600 to-green-800"
            link="/admin/test-results"
          />
          <StatCard 
            title="Pending Applications" 
            value={stats.pendingApplications} 
            icon="⏳" 
            color="from-orange-600 to-orange-800"
            link="/admin/applications"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">User Registrations (Last 30 Days)</h2>
            <div className="h-64">
              <BarChart />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Test Performance Distribution</h2>
            <div className="h-64">
              <PieChart />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  {activity.icon || '👤'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.score && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      Score: {activity.score}
                    </span>
                  )}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <QuickActionCard 
            title="Manage Questions"
            description="Add, edit or remove coding questions"
            icon="📚"
            link="/admin/questions"
            color="bg-indigo-100 text-indigo-800"
          />
          <QuickActionCard 
            title="View Test Results"
            description="Analyze candidate performance"
            icon="📊"
            link="/admin/results"
            color="bg-green-100 text-green-800"
          />
          <QuickActionCard 
            title="System Settings"
            description="Configure platform settings"
            icon="⚙️"
            link="/admin/settings"
            color="bg-gray-100 text-gray-800"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color, link }: StatCardProps) => (
  <Link to={link} className="transform hover:scale-105 transition-transform duration-200 ">
    <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <span className="text-xs font-medium opacity-80 hover:opacity-100">View Details →</span>
      </div>
    </div>
  </Link>
);

// Reusable Quick Action Card Component
const QuickActionCard = ({ title, description, icon, link, color }: QuickActionCardProps) => (
  <Link to={link} className="transform hover:scale-[1.02] transition-transform duration-200 ">
    <div className={`p-5 rounded-xl shadow-sm border ${color} border-transparent hover:border-current`}>
      <div className="flex items-center">
        <span className="text-2xl mr-4">{icon}</span>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default AdminDashboard;