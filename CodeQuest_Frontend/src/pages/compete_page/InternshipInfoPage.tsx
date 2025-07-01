import { useAuth } from '@/context/AuthProvider'
import Layout from '@/layout/Layout'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'



// Mock data - replace with your actual data fetching logic
const internshipData = {
  companyName: "Meesho",
  internshipName: "Full Stack Developer Internship",
  description: "Join our dynamic team to work on cutting-edge web applications using React, Node.js, and MongoDB. Gain hands-on experience with real projects under expert mentorship.",
  duration: "3 months",
  location: "Remote (Global)",
  stipend: "$1,500/month",
  imageUrl: "/frontend.jpeg",
  companyLogo: "/Meesho.png",
  challengeFormLink: "/internship/challenge-form"
}

function InternshipInfoPage() {
    const {user} = useAuth()
    const location = useLocation()

  const isUserLoggedin = user?.role === 'user';
//   const handleStartChallenge = () => {
    
//     try {
      
//     } catch (error) {
//         console.error(error)
//     }
//   }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header with Company Logo */}
        <div className="flex items-center mb-8 mt-8">
          <div className="mr-6">
            <img 
              src={internshipData.companyLogo} 
              alt={`${internshipData.companyName} logo`}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{internshipData.internshipName}</h1>
            <p className="text-xl text-gray-600">{internshipData.companyName}</p>
          </div>
        </div>

        {/* Internship Banner Image */}
        <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
          <img
            src={internshipData.imageUrl}
            alt="Internship banner"
            width={1200}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Internship Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">About the Internship</h2>
            <p className="text-gray-700 mb-6">{internshipData.description}</p>
            
            <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Build production-ready web applications</li>
              <li>Work with modern tech stack (MERN, GraphQL, etc.)</li>
              <li>Collaborate using Agile methodologies</li>
              <li>Deploy applications to cloud platforms</li>
            </ul>
          </div>

          {/* Quick Facts Sidebar */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Internship Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="font-medium">{internshipData.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="font-medium">{internshipData.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stipend</p>
                <p className="font-medium">{internshipData.stipend}</p>
              </div>
            </div>

            {/* Start Challenge Button */}
         
           {isUserLoggedin ? ( 
            
            <Link to={'/compete/internship/information'}>
            <button
             
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Register
            </button>
           </Link>
        
        ): ( 
                
                <Link 
                to={'/signin'}
                state={{from: location.pathname}}>


                
               
                <button
             
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Login to Register
            </button>
             </Link>
            )}
           

           
             
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Basic knowledge of JavaScript and web development</li>
            <li>Familiarity with React or similar frameworks</li>
            <li>Ability to commit 20+ hours per week</li>
            <li>Strong problem-solving skills</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default InternshipInfoPage