import AdminLayout from "@/layout/AdminLayout";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { NewIntershipForm } from "@/_components/QuestionsComponent/NewInternshipForm";
import { format } from 'date-fns';

type Internship = {
 _id: string;
  companyName: string; // Changed from companyname to companyName for consistency
  internshipTitle: string; // More descriptive than testName
  internshipDescription: string; // Added for description
  internshipDuration: string; // Duration of the entire internship
  location: string; // Physical or remote location
  stipend: string; // Compensation information
  internshipImage?: string; // URL to internship banner/image
  companyLogo?: string; // URL to company logo
  testDuration: string; // Duration of coding test
  startDate: string; // ISO format or similar
  endDate: string; // ISO format or similar
  startTime: string; // Time format (e.g., "14:00")
  endTime: string; // Time format (e.g., "16:00")
   status?: 'active' | 'upcoming' | 'completed';// Optional status field
  createdAt?: string; // When the internship was created
  updatedAt?: string; // When the internship was last updated
};

function IntershipManagement() {
  // const [newTest, setNewTest] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  const [internships, setInternships] = useState<Internship[]>([
{

_id: "1",
  companyName: "Meesho", // Changed from companyname to companyName for consistency
  internshipTitle: "Frontend Intership", // More descriptive than testName
  internshipDescription: "this intership is about...", // Added for description
  internshipDuration: "6 month", // Duration of the entire internship
  location: "Bangalore", // Physical or remote location
  stipend: "25k", // Compensation information
  internshipImage: "/frontend.jpeg", // URL to internship banner/image
  companyLogo: "/Meesho.png", // URL to company logo
  testDuration: "3hr", // Duration of coding test
  startDate: "", // ISO format or similar
  endDate: "", // ISO format or similar
  startTime: " ", // Time format (e.g., "14:00")
  endTime: "", // Time format (e.g., "16:00")
  status: 'active' , // Optional status field
  createdAt: "15 jun 2025", // When the internship was created
  updatedAt: "15 jun 2025", // When the internship was last updated
}
     
  ]);
  const [activeTab, setActiveTab] = useState('active');

  // useEffect(() => {
  //   // Fetch data from API
  //   const fetchInternships = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/api/v1/createtest/gettest');
  //       const data = await response.json();
  //       setInternships(data);
  //     } catch (error) {
  //       console.error('Error fetching internships:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInternships();
  // }, []);

  // Filter internships based on status
  const activeInternships = internships.filter(internship => 
    new Date(internships[0].startDate) <= new Date() && 
    new Date(internships[0].endDate) >= new Date()
  );

  const upcomingInternships = internships.filter(internship => 
    new Date(internships[0].startDate) > new Date()
  );

  const previousInternships = internships.filter(internship => 
    new Date(internships[0].endDate) < new Date()
  );

  const displayedInternships = 
    activeTab === 'active' ? activeInternships :
    activeTab === 'upcoming' ? upcomingInternships :
    previousInternships;

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/api/v1/createtest/gettest`
  //       );

  //       const newTestres = await response.json();

  //       setNewTest(newTestres);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);


  return (
    
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
          {/* {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="w-full h-72 rounded-xl" />
              </div>
            ))
          ) : displayedInternships.length > 0 ? (
            displayedInternships.map((internship) => ( */}
              <div
                key={internships[0]._id}
                className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Internship Image */}
                <div className="h-40 bg-gray-100 relative">
                  {internships[0].internshipImage ? (
                    <img 
                      src={internships[0].internshipImage} 
                      alt={internships[0].internshipTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <span className="text-xl font-bold">{internships[0].companyName}</span>
                    </div>
                  )}
                  
                  {/* Company Logo */}
                  <div className="absolute -bottom-6 right-4">
                    {internships[0].companyLogo ? (
                      <img 
                        src={internships[0].companyLogo} 
                        alt={`${internships[0].companyName} logo`}
                        className="w-12 h-12 rounded-full border-2 border-white bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{internships[0].companyName.substring(0, 2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Internship Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{internships[0].internshipTitle}</h2>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {activeTab === 'active' ? 'Active' : activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{internships[0].internshipDescription}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Company</p>
                      <p className="text-sm font-medium">{internships[0].companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium">{internships[0].internshipDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{internships[0].location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stipend</p>
                      <p className="text-sm font-medium">{internships[0].stipend}</p>
                    </div>
                  </div>

                  {/* Coding Test Info */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Coding Test Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{internships[0].testDuration} hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Starts:</span>
                        <span className="font-medium">
                          {/* {format(new Date(`${internships[0].startDate}T${internships[0].startTime}`), 'MMM d, yyyy h:mm a')} */}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ends:</span>
                        <span className="font-medium">
                          {/* {format(new Date(`${internships[0].endDate}T${internships[0].endTime}`), 'MMM d, yyyy h:mm a')} */}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <Link 
                      to={`/admin/questionmanagement?testId=${internships[0]._id}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Manage Questions
                      </Button>
                    </Link>
                    
                    {/* /admin/internships/${internships[0]._id */}
                    <Link 
                      to={``}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                key={internships[0]._id}
                className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Internship Image */}
                <div className="h-40 bg-gray-100 relative">
                  {internships[0].internshipImage ? (
                    <img 
                      src={internships[0].internshipImage} 
                      alt={internships[0].internshipTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <span className="text-xl font-bold">{internships[0].companyName}</span>
                    </div>
                  )}
                  
                  {/* Company Logo */}
                  <div className="absolute -bottom-6 right-4">
                    {internships[0].companyLogo ? (
                      <img 
                        src={internships[0].companyLogo} 
                        alt={`${internships[0].companyName} logo`}
                        className="w-12 h-12 rounded-full border-2 border-white bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{internships[0].companyName.substring(0, 2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Internship Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{internships[0].internshipTitle}</h2>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {activeTab === 'active' ? 'Active' : activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{internships[0].internshipDescription}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Company</p>
                      <p className="text-sm font-medium">{internships[0].companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium">{internships[0].internshipDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{internships[0].location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stipend</p>
                      <p className="text-sm font-medium">{internships[0].stipend}</p>
                    </div>
                  </div>

                  {/* Coding Test Info */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Coding Test Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{internships[0].testDuration} hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Starts:</span>
                        <span className="font-medium">
                          {/* {format(new Date(`${internships[0].startDate}T${internships[0].startTime}`), 'MMM d, yyyy h:mm a')} */}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ends:</span>
                        <span className="font-medium">
                          {/* {format(new Date(`${internships[0].endDate}T${internships[0].endTime}`), 'MMM d, yyyy h:mm a')} */}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <Link 
                      to={`/admin/questionmanagement?testId=${internships[0]._id}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Manage Questions
                      </Button>
                    </Link>
                    
                    {/* /admin/internships/${internships[0]._id */}
                    <Link 
                      to={``}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                key={internships[0]._id}
                className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Internship Image */}
                <div className="h-40 bg-gray-100 relative">
                  {internships[0].internshipImage ? (
                    <img 
                      src={internships[0].internshipImage} 
                      alt={internships[0].internshipTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <span className="text-xl font-bold">{internships[0].companyName}</span>
                    </div>
                  )}
                  
                  {/* Company Logo */}
                  <div className="absolute -bottom-6 right-4">
                    {internships[0].companyLogo ? (
                      <img 
                        src={internships[0].companyLogo} 
                        alt={`${internships[0].companyName} logo`}
                        className="w-12 h-12 rounded-full border-2 border-white bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{internships[0].companyName.substring(0, 2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Internship Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{internships[0].internshipTitle}</h2>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {activeTab === 'active' ? 'Active' : activeTab === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{internships[0].internshipDescription}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Company</p>
                      <p className="text-sm font-medium">{internships[0].companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium">{internships[0].internshipDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{internships[0].location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stipend</p>
                      <p className="text-sm font-medium">{internships[0].stipend}</p>
                    </div>
                  </div>

                  {/* Coding Test Info */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Coding Test Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{internships[0].testDuration} hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Starts:</span>
                        <span className="font-medium">
                          {/* {format(new Date(`${internships[0].startDate}T${internships[0].startTime}`), 'MMM d, yyyy h:mm a')} */}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ends:</span>
                        <span className="font-medium">
                          {/* {format(new Date(`${internships[0].endDate}T${internships[0].endTime}`), 'MMM d, yyyy h:mm a')} */}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <Link 
                      to={`/admin/questionmanagement?testId=${internships[0]._id}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Manage Questions
                      </Button>
                    </Link>
                    
                    {/* /admin/internships/${internships[0]._id */}
                    <Link 
                      to={``}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            {/* ))
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
          )} */}
        </div>
      </div>
    </AdminLayout>
  );
}

export default IntershipManagement;
