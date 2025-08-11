
import Layout from "@/layout/Layout";
import { Link } from "react-router-dom";
import { Internship } from "../intership_management";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


function Compete() {
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);

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



 useEffect(() => {
    const fetchInternships = async () => {
    
      try {
        const response = await fetch(`http://localhost:3001/api/v1/internships/publishinternships`);
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
    <Layout>
  {/* Hero Section */}
  <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
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
          <a href="#upcomming" className="px-6 py-3 font-medium text-gray-700 transition duration-300 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600">
            Upcoming Opportunities
          </a>
          <a href="#previous" className="px-6 py-3 font-medium text-gray-700 transition duration-300 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600">
            Previous Opportunities
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
{
  loading? (Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="w-full h-72 rounded-xl" />
              </div>
            ))):(activeInternships.length > 0 ?(

activeInternships.map((internship, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
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
            

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.internshipTitle}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                start at: <span className="font-medium ml-1">{internship.startDateTime}</span>
                end at: <span className="font-medium ml-1">{internship.endDateTime}</span>
              </div>
              <Link to='/compete/internship'>
{/*               
              <button className={`w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md`}>
                Start Challenge
              </button> */}
              </Link>
            </div>
          </div>
        ))
            ):(
               <div className="col-span-4 text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-1">
                No active internships found
              </h3>
              <p className="text-gray-500">
              Currently no active internships
                
              </p>
            </div>
            ))
}
        
        
      </div>
    </div>
  </section>


{/* Upcoming Internships Section */}
  
<section id="upcomming" className="py-16 bg-white">
  <div className="container mx-auto px-6">
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">
        <span className="border-b-4 border-blue-500 pb-2">Upcoming Internships</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="flex flex-col space-y-3">
            <Skeleton className="w-full h-72 rounded-xl" />
          </div>
        ))
      ) : upcomingInternships.length > 0 ? (
        upcomingInternships.map((internship) => {
          const startDate = new Date(internship.startDateTime).toLocaleDateString();
          const endDate = new Date(internship.endDateTime).toLocaleDateString();

          return (
            <div 
              key={`upcoming-${internship.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <div className="h-40 bg-gray-100 relative">
                {internship.internshipImage ? (
                  <img 
                    src={internship.internshipImage}
                    alt={internship.internshipTitle}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    <span className="text-xl font-bold">{internship.companyName}</span>
                  </div>
                )}
                
                <div className="absolute -bottom-6 right-4">
                  {internship.companyLogo ? (
                    <img 
                      src={internship.companyLogo}
                      alt={`${internship.companyName} logo`}
                      className="w-12 h-12 rounded-full border-2 border-white bg-white"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">
                        {internship.companyName.substring(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.internshipTitle}</h3>
                
                <div className="flex items-start text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4 mr-1 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Start date:</span>
                      <span className="font-medium ml-2">{startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End date:</span>
                      <span className="font-medium ml-2">{endDate}</span>
                    </div>
                  </div>
                </div>
                
                <Link to={`/compete/internship/${internship._id}`}>
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-1">
            No upcoming internships found
          </h3>
          <p className="text-gray-500">
            Currently no upcoming internships
          </p>
        </div>
      )}
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
        {
          loading? (Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="w-full h-72 rounded-xl" />
              </div>
            ))):(

              previousInternships.length > 0?(
                 previousInternships.map((internship, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-40 ">
              <img 
                src={internship.internshipImage} 
                alt={internship.internshipTitle} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">{internship.internshipTitle}</h3>
                <p className="text-gray-200">{internship.companyName}</p>
              </div>

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
            
            <div className="p-6">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>Completed</span>
                <span>{internship.endDateTime}</span>
              </div>
              {/* <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                View Results
              </button> */}
            </div>
          </div>
        ))
              ):(
                 <div className="col-span-4 text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-1">
                No previous internships found
              </h3>
              <p className="text-gray-500">
              Currently no previous internships
                
              </p>
            </div>
              )
            )
        }
       
      </div>
    </div>
  </section>

  
</Layout>
  );
}

export default Compete;
