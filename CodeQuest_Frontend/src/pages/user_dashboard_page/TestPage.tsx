import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import DashboardLayout from "@/layout/DashboardLayout";
import Layout from "@/layout/Layout";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, ClockIcon, Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Internship } from "../intership_management";

function TestPage() {
  const testDate = new Date();
const navigate = useNavigate()
const {user} = useAuth();
const {id} = useParams();
  const [internship, setInternship] = useState<Internship>();

  const handleProblems=()=>{
    navigate('/test/problems')
  }

  useEffect(() => {
      const fetchInternships = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/v1/internships/internshipid?id=${id}`
          );
          const { data } = await response.json();
  
          console.log('id=', data)
          setInternship(data);
        } catch (error) {
          console.error("Error fetching internships:", error);
        } 
      };
  
      fetchInternships();
    }, []);
  return (
    <DashboardLayout>
      {/* Main Content Area */}
      <div className="p-4 w-full md:w-[75%] h-[100vh] overflow-y-auto">
        {/* Welcome Banner with subtle animation */}
       <div className="relative w-full h-60 mt-2 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
  {/* Background Image with Gradient Overlay */}
  <div className="absolute inset-0">
    {internship?.internshipImage ? (
      <img 
        src={internship.internshipImage} 
        alt={internship.internshipTitle || "Internship"} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600" />
    )}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-indigo-900/20" />
  </div>

  {/* Content */}
  <div className="relative h-full p-6 flex flex-col justify-center text-white">
    <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
      {internship?.internshipTitle}
    </h2>
    <p className="text-xl font-medium text-blue-100 drop-shadow-md">
      {internship?.companyName}
    </p>
    
    {/* Optional: Add button or additional info */}
    <button className="mt-4 self-start px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-colors duration-300">
      View Details
    </button>
  </div>
</div>

        

       


         <section id="upcoming" className="py-8 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-xl font-bold text-gray-900 mb-12">
        Coding Problem Details
      </h2>
       <div className="flex flex-col md:flex-row gap-2   w-full h-auto md:h-20 rounded-xl bg-white p-4 shadow-sm ">
          <div className="flex-1">
            <p className="font-bold text-lg text-gray-800">Coding Test</p>
            <p className="text-gray-600 font-medium">Total questions: 3</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-blue-500" />
              <p className="text-gray-600 font-medium">Total time: 1hr</p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <p className="text-gray-600 font-medium">
                Date: {testDate.toString()}
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end">
           
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 
                    px-6 py-2 rounded-lg shadow-md "

                    onClick={()=>handleProblems()}
            >
              Solve Problems
            </Button>
           
          </div>
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

export default TestPage;
