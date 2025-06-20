
import Layout from "@/layout/Layout";
import { Link } from "react-router-dom";


function Compete() {
  return (
    <Layout>
  {/* Hero Section */}
  <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Land Your Dream Tech Internship
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Compete in real-world coding challenges and get noticed by top companies
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="#live" className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Live Internships</span>
            <span className="relative invisible">Live Internships</span>
          </a>
          
          <a href="#previous" className="px-6 py-3 font-medium text-gray-700 transition duration-300 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600">
            Previous Opportunities
          </a>
          <a href="#upcoming" className="px-6 py-3 font-medium text-gray-700 transition duration-300 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600">
            Upcoming Opportunities
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* Live Internships Section */}
  <section id="live" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          <span className="border-b-4 border-blue-500 pb-2">Live Internships</span>
        </h2>
        <div className="flex space-x-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-red-500 font-medium">Active Now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Frontend Internship", img: "frontend.jpeg", time: "05:07:25",  },
          { title: "Backend Internship", img: "backend.jpeg", time: "03:12:25",  },
          { title: "FullStack Internship", img: "fullstack.jpeg", time: "02:23:18",  },
          { title: "DevOps Internship", img: "devops.png", time: "04:45:12",  }
        ].map((internship, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={internship.img} 
                alt={internship.title} 
                className="w-full h-full object-cover"
              />
             
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.title}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Ends in: <span className="font-medium ml-1">{internship.time}</span>
              </div>
              <Link to='/compete/information'>
              
              <button className={`w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md`}>
                Start Challenge
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Previous Internships Section */}
  <section id="previous" className="py-10 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        <span className="border-b-4 border-blue-500 pb-2">Previous Internships</span>
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

  {/* Upcoming Internships Section */}
  <section id="upcoming" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        <span className="border-b-4 border-blue-500 pb-2">Upcoming Internships</span>
      </h2>
      
      <div className="bg-indigo-50 rounded-xl p-8 md:p-12 border-2 border-indigo-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Blockchain Developer Internship</h3>
            <p className="text-gray-600 mb-4">Coming soon! Be the first to know when applications open.</p>
            <div className="flex items-center text-indigo-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="font-medium">Starts: August 15, 2026</span>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-end">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</Layout>
  );
}

export default Compete;
