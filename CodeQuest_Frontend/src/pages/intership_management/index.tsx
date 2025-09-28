import AdminLayout from "@/layout/AdminLayout";
import React, { createContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import NewIntershipForm from "@/_components/QuestionsComponent/NewInternshipForm";
import { format } from 'date-fns';
import { useAuth } from "@/context/AuthProvider";
import { Badge } from "@/components/ui/badge";

export type Internship = {
  _id: string;
  id: string;
  companyName: string;
  internshipTitle: string;
  internshipDescription: string;
  internshipDuration: string;
  location: string;
  stipend: string;
  internshipImage?: string;
  companyLogo?: string;
  testDuration: string;
  isPublished:boolean;
  startDateTime: string;
  endDateTime: string;
 
  status?: 'active' | 'upcoming' | 'completed';
  createdAt?: string;
  updatedAt?: string;
};

// Define the context type
type InternshipContextType = {
  internships: Internship[];
  setInternships: React.Dispatch<React.SetStateAction<Internship[]>>;
};

// Create the context with proper initial values
export const InternshipContext = createContext<InternshipContextType>({
  internships: [],  // initial empty array
  setInternships: () => {}  // dummy function
});

function IntershipManagement() {
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [activeTab, setActiveTab] = useState('active');
  const {user} = useAuth()



const upcomingInternships = internships.filter(internship => {
  return new Date(internship?.startDateTime) > new Date();
});


const activeInternships = internships.filter(internship => {
  const now = new Date();
  return new Date(internship.startDateTime) <= now && 
         new Date(internship.endDateTime) >= now;
});


const previousInternships = internships.filter(internship => {
  return new Date(internship.endDateTime) < new Date();
});


  
  const displayedInternships = 
    activeTab === 'active' ? activeInternships :
    activeTab === 'upcoming' ? upcomingInternships :
    previousInternships;

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/internships/getinternships?companyName=${encodeURIComponent(user.companyName)}`);
        const {data} = await response.json();
     
        setInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
     <InternshipContext.Provider value={{internships,setInternships}}> 
    <AdminLayout>

      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 pl-4">Internship Management</h1>
          <NewIntershipForm/>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'active' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('active')}
          >
            Active ({activeInternships.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'upcoming' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({upcomingInternships.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'previous' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('previous')}
          >
            Previous ({previousInternships.length})
          </button>
        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="w-full h-72 rounded-xl" />
              </div>
            ))
          ) : displayedInternships.length > 0 ? (
            displayedInternships.map((internship) => (
              <div
                key={internship._id}
                className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Internship Image */}
                <div className="h-40 bg-gray-100 relative">
                  {internship.internshipImage ? (
                    <img 
                      src={internship.internshipImage} 
                      alt={internship.internshipTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <span className="text-xl font-bold">{internship.companyName}</span>
                    </div>
                  )}
                  
                  {/* Company Logo */}
                  <div className="absolute -bottom-6 right-4">
                    {internship.companyLogo ? (
                      <img 
                        src={internship.companyLogo} 
                        alt={`${internship.companyName} logo`}
                        className="w-12 h-12 rounded-full border-2 border-white bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{internship.companyName.substring(0, 2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Internship Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{internship.internshipTitle}</h2>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {new Date(`${internship.startDateTime}`) > new Date() ? 'Upcoming' : 
                       new Date(`${internship.endDateTime}`) < new Date() ? 'Completed' : 'Active'}
                    </span>

                  
                    <Badge
                        variant={internship?.isPublished ? "default" : "secondary"}
                             className="rounded-full px-2 py-1 text-xs font-medium"
                              >
                               {internship?.isPublished ? "Published" : "Draft"}
                                          </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{internship.internshipDescription}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Company</p>
                      <p className="text-sm font-medium">{internship.companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium">{internship.internshipDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{internship.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stipend</p>
                      <p className="text-sm font-medium">{internship.stipend}</p>
                    </div>
                  </div>

                  {/* Coding Test Info */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Coding Test Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{internship.testDuration} hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Starts:</span>
                        <span className="font-medium">
                          {format(new Date(`${internship.startDateTime}`), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ends:</span>
                        <span className="font-medium">
                          {format(new Date(`${internship.endDateTime}`), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <Link 
                      to={`/admin/questionmanagement?internshipId=${internship._id}&isPublished=${internship.isPublished}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Manage Questions
                      </Button>
                    </Link>
                    
                    <Link 
                      to={`/admin/internships/${internship._id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-1">
                No {activeTab} internships found
              </h3>
              <p className="text-gray-500">
                {activeTab === 'active' ? 'Currently no active internships' : 
                 activeTab === 'upcoming' ? 'No upcoming internships scheduled' : 
                 'No previous internships to display'}
              </p>
            </div>
          )} 
        </div>
      </div>
    </AdminLayout>
    </InternshipContext.Provider>
  );
}

export default IntershipManagement;