import Leaderboard from "@/_components/Leaderboard";
import LineChart from "@/_components/LineChart";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";

import { useState } from "react";
import {
  CircularProgressbar,
 
  buildStyles,
} from "react-circular-progressbar";
import { 
  AcademicCapIcon,
  BuildingLibraryIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { IoPerson } from "react-icons/io5";

function Dashboard() {
const {user} = useAuth();

  const [progressCount, setProgressCount] = useState(60);
  

  const testDate = new Date()
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

    {/* Test Info Card with glowing effect */}
    <section id="upcoming" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        <span className="border-b-4 border-blue-500 pb-2">Upcoming Internships</span>
      </h2>
      
      <div className="bg-indigo-50 rounded-xl p-8 md:p-12 border-2 border-indigo-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Blockchain Developer Internship</h3>
            <p className="text-gray-600 mb-4">Company Name: Mesho</p>
            <div className="flex items-center text-indigo-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="font-medium">Starts: August 15, 2025</span>
            </div>
          </div>
       <div className="flex-1 flex items-center justify-end">
        <Link to='/test/instructions'>
        
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 
                    px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Attempt test
        </Button>
        </Link>
      </div>
        </div>
      </div>
    </div>
  </section>

 <section id="previous" className="py-10 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        <span className="border-b-4 border-blue-500 pb-2"> Your Previous Internships</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "AI ", img: "AI.jpg", date: "Jun 15, 2023", company: "TechCorp" },
          { title: "Data Science Internship", img: "Data-Science.png", date: "Apr 22, 2023", company: "DataSystems" },
          { title: "Mobile Dev Internship", img: "mobile.png", date: "Feb 10, 2023", company: "AppWorks" }
        ].map((internship, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={internship.img} 
                alt={internship.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">{internship.title}</h3>
                <p className="text-gray-200">{internship.company}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>Completed</span>
                <span>{internship.date}</span>
              </div>
              <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                View Results
              </button>
            </div>
          </div>
        ))}
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
            University: ABC University
          </p>
        </div>
      </div>
    </div>

 
  </div>
</DashboardLayout>
  );
}

export default Dashboard;
