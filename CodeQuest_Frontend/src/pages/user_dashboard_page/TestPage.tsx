import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import Layout from "@/layout/Layout";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, ClockIcon, Link } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function TestPage() {
  const testDate = new Date();
const navigate = useNavigate()

  const handleProblems=()=>{
    navigate('/test/problems')
  }
  return (
    <DashboardLayout>
      {/* Main Content Area */}
      <div className="p-4 w-full md:w-[75%] h-[100vh] overflow-y-auto">
        {/* Welcome Banner with subtle animation */}
        <div className="flex flex-col md:flex-row border-2 border-blue-100 w-full h-60 mt-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="w-full  p-6 flex flex-col justify-center">
            <p className="text-3xl font-medium">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
                Frontend Internship
              </span>
            </p>
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
              PK
            </div>
            <div>
              <h3 className="font-bold text-xl">Priyanka Kumari</h3>
              <p className="text-sm font-medium text-blue-200">
                priynkasingh88@gmail.com
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5 text-blue-300" />
              <p className="text-sm font-medium text-blue-100">
                Qualification: B.Tech (Computer Science)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BuildingLibraryIcon className="h-5 w-5 text-blue-300" />
              <p className="text-sm font-medium text-blue-100">
                University: ABC University
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TestPage;
