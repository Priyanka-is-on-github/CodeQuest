
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";

import { useEffect, useState } from "react";

import { 
  AcademicCapIcon,
  BuildingLibraryIcon,

} from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { IoPerson } from "react-icons/io5";
import { Internship } from "../intership_management";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
const {user} = useAuth();
 const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);
  
  const upcomingInternships = internships.filter((internship) => {
    return new Date(internship?.startDateTime) > new Date();
  });

  const activeInternships = internships.filter((internship) => {
    const now = new Date();
    return (
      new Date(internship.startDateTime) <= now &&
      new Date(internship.endDateTime) >= now
    );
  });

  const previousInternships = internships.filter((internship) => {
    return new Date(internship.endDateTime) < new Date();
  });

   useEffect(() => {
      const fetchInternships = async () => {
      
        try {
          const response = await fetch(`http://localhost:3001/api/v1/developers/internships?email=${user.email}`);
          const {data} = await response.json();
       
      
          setInternships(data);
        } catch (error) {
          console.error('Error fetching internships:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchInternships();
    },[]);
  return (
   <DashboardLayout>
  {/* Main Content Area */}
  <div className="p-4 w-full md:w-[75%] h-[100vh] overflow-y-auto">
    {/* Welcome Banner with subtle animation */}
    <div className="flex flex-col md:flex-row border-2 border-blue-100 w-full h-60 mt-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="w-full md:w-[45%] p-6 flex flex-col justify-center">
        <p className="text-3xl font-medium">
          Welcome back,{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
            {user.name}!
          </span>
        </p>

        <p className="text-gray-700 font-normal pt-4 text-lg italic">
          "Get ready to showcase your skills! Your coding test awaits—begin now and take a step closer to your internship."
        </p>
      </div>

      <div className="w-full md:w-[55%] overflow-hidden rounded-r-xl">
        <img
          src="https://static.vecteezy.com/system/resources/previews/047/410/609/large_2x/three-diverse-students-studying-with-laptops-on-stacks-of-books-free-vector.jpg"
          alt="Students studying"
          className=" w-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

  {/* Live Internships Section */}
<section id="upcoming" className="py-16 bg-gray-50">
  <div className="container mx-auto px-4 sm:px-6">
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          <span className="border-b-4 border-blue-500 pb-2">
            Live Internships Test
          </span>
        </h2>
      
      </div>
      <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-red-600 font-medium ml-2">Active Now</span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="flex flex-col space-y-3">
            <Skeleton className="w-full h-80 rounded-xl" />
          </div>
        ))
      ) : activeInternships.length > 0 ? (
        activeInternships.map((internship) => (
          <div
            key={`active-${internship.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 group"
          >
            <div className="h-40 bg-gray-100 relative">
                    {internship.internshipImage ? (
                      <img
                        src={internship.internshipImage}
                        alt={internship.internshipTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                        <span className="text-xl font-bold">
                          {internship.companyName}
                        </span>
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
                          <span className="text-xs font-bold text-gray-600">
                            {internship.companyName.substring(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-16"></div>
                  </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {internship.internshipTitle}
              </h3>

              <div className="flex items-start text-gray-500 text-sm mb-6">
                <svg
                  className="w-4 h-4 mr-1 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <span>Starts:</span>
                    <span className="font-medium text-gray-700">
                      {format(
                        new Date(`${internship.startDateTime}`),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Ends:</span>
                    <span className="font-medium text-gray-700">
                      {format(
                        new Date(`${internship.endDateTime}`),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              
             <Link to={`/test/instructions/${internship._id}`}>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 
                            px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
                            flex items-center justify-center gap-2"
                >
                  <span>Attempt test</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="inline-flex items-center justify-center bg-blue-50 p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No active internships found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            There are currently no active internship tests. Check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  </div>
</section>

{/* Upcoming Internships Section */}
<section id="upcoming" className="py-16 bg-gray-50">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900">
        <span className="border-b-4 border-blue-500 pb-2">
          Upcoming Internship Test
        </span>
      </h2>
     
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="flex flex-col space-y-3">
            <Skeleton className="w-full h-80 rounded-xl" />
          </div>
        ))
      ) : upcomingInternships.length > 0 ? (
        upcomingInternships.map((internship) => (
          <div
            key={`upcoming-${internship.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 group"
          >
            <div className="h-40 bg-gray-100 relative">
                    {internship.internshipImage ? (
                      <img
                        src={internship.internshipImage}
                        alt={internship.internshipTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                        <span className="text-xl font-bold">
                          {internship.companyName}
                        </span>
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
                          <span className="text-xs font-bold text-gray-600">
                            {internship.companyName.substring(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-16"></div>
                  </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                {internship.internshipTitle}
              </h3>

              <div className="flex items-start text-gray-500 text-sm mb-6">
                <svg
                  className="w-4 h-4 mr-1 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <span>Starts:</span>
                    <span className="font-medium text-gray-700">
                      {format(
                        new Date(`${internship.startDateTime}`),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Ends:</span>
                    <span className="font-medium text-gray-700">
                      {format(
                        new Date(`${internship.endDateTime}`),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2.5 px-4 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2">
                <span>Notify Me</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="inline-flex items-center justify-center bg-blue-50 p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No upcoming internships found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            There are currently no upcoming internship tests. Check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  </div>
</section>

{/* Previous Internships Section */}
<section id="previous" className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900">
        <span className="border-b-4 border-blue-500 pb-2">
          Previous Internships Test
        </span>
      </h2>
    
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="w-full h-80 rounded-xl" />
          </div>
        ))
      ) : previousInternships.length > 0 ? (
        previousInternships.map((internship, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group"
          >
            <div className="h-40 bg-gray-100 relative">
                    {internship.internshipImage ? (
                      <img
                        src={internship.internshipImage}
                        alt={internship.internshipTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                        <span className="text-xl font-bold">
                          {internship.companyName}
                        </span>
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
                          <span className="text-xs font-bold text-gray-600">
                            {internship.companyName.substring(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-16"></div>
                  </div>

            <div className="p-6">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Completed on:</span>
                </div>
                <span className="font-medium text-gray-700">
                  {format(
                    new Date(`${internship.endDateTime}`),
                    "MMM d, yyyy"
                  )}
                </span>
              </div>
              
              <button className="w-full py-2.5 px-4 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2">
                <span>View Results</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="inline-flex items-center justify-center bg-blue-50 p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No previous internships found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven't taken any internship tests yet. Check out our active opportunities.
          </p>
        </div>
      )}
    </div>
  </div>
</section>
    
    </div>

  {/* Sidebar Profile Section */}
  <div className="h-full hidden md:flex flex-col w-[25%] ml-3 mt-2 mr-2 ">
    {/* Profile Card */}
    <div className="text-white p-6 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-blue-900 font-bold text-2xl">
          <IoPerson/>
        </div>
        <div>
          <h3 className="font-bold text-xl">{user.name}</h3>
          <p className="text-sm font-medium text-blue-200">
           {user.email}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AcademicCapIcon className="h-5 w-5 text-blue-300" />
          <p className="text-sm font-medium text-blue-100">
            Qualification: {user.degree}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BuildingLibraryIcon className="h-5 w-5 text-blue-300" />
          <p className="text-sm font-medium text-blue-100">
            University: {user.collegeName}
          </p>
        </div>
      </div>
    </div>

 
  </div>
</DashboardLayout>
  );
}

export default Dashboard;
