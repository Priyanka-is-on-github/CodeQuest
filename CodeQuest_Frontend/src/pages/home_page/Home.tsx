
import { useAuth } from '@/context/AuthProvider'
import Layout from '@/layout/Layout'

import {Link} from 'react-router-dom'

function Home() {
  const {selectedRole} = useAuth();

  const getLinkPath = () => {
  if (selectedRole === '') return '/authorize';
  if (selectedRole === 'developer') return '/compete';
  return '/recruiter/dashboard';
};

  return (
    <>
    <Layout>

{/* Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 ">
  <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row justify-between">
    {/* Text Content */}
    <div className="lg:w-1/2 z-10">
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
    Where Talent Meets Opportunity
  </span>
  <br />
  <span className="text-gray-800">
    Through Real Coding Challenges
  </span>
</h2>

<p className="mt-6 text-xl text-gray-600 max-w-lg">
  Developers prove their skills • Companies discover top talent
</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-10">

       <Link 
  to={getLinkPath()}
  className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-lg group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
>
  <span className="relative z-10">Get Started Now</span>
  <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-5 transition-opacity duration-300"></span>
</Link>

         
      
        
        <a
          href="#how-it-works"
          className="px-8 py-4 font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600"
        >
          Learn How It Works →
        </a>
      </div>
      
      <div className="mt-16 flex items-center space-x-6">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((item) => (
            <img 
              key={item}
              src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
              className="w-10 h-10 rounded-full border-2 border-white"
              alt="User"
            />
          ))}
        </div>
        <div className="text-gray-600">
          <p className="font-medium">Join 10,000+ developers</p>
          <p className="text-sm">Who landed internships last month</p>
        </div>
      </div>
    </div>
    
    {/* Image Content */}
    <div className="lg:w-1/2 relative  lg:mt-0 ">
      <div className="relative w-full h-[30rem] lg:h-[40rem]">
        <img 
          src="persons.svg" 
          alt="Developers collaborating" 
          className="absolute w-full h-full object-contain animate-float"
        />
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 -right-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-20 w-28 h-28 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  </div>
  
  {/* Wave decoration at bottom */}
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
    <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="fill-current text-white">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
    </svg>
  </div>
</section>

    {/* Features Section */}
<section id="features" className=" bg-gradient-to-b from-slate-100 to-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <span className="text-blue-600 font-semibold text-lg mb-2 block">WHY CHOOSE US</span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Everything you need to showcase your coding skills and land your dream internship
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-100 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500"></div>
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
            <img src="Time management.gif" alt="Timed tests" className="w-32 h-32 object-contain" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">Timed Coding Tests</h3>
        <p className="text-gray-600 text-center mb-6">
          Challenge yourself with real-world coding problems under time constraints
        </p>
        <div className="text-center">
          <span className="inline-block px-4 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
            Learn More →
          </span>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-100 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500"></div>
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
            <img src="Performance overview.gif" alt="Performance tracking" className="w-32 h-32 object-contain" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">Performance Tracking</h3>
        <p className="text-gray-600 text-center mb-6">
          Detailed analytics to monitor your progress and identify strengths
        </p>
        <div className="text-center">
          <span className="inline-block px-4 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
            Learn More →
          </span>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-100 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500"></div>
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
            <img src="Admin.gif" alt="Admin dashboard" className="w-32 h-32 object-contain" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">Admin Dashboard</h3>
        <p className="text-gray-600 text-center mb-6">
          Comprehensive tools to manage tests, users, and analyze results
        </p>
        <div className="text-center">
          <span className="inline-block px-4 py-1 text-sm font-medium text-purple-600 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
            Learn More →
          </span>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { number: "50+", label: "Coding Challenges" },
        { number: "10K+", label: "Developers" },
        { number: "500+", label: "Companies" },
        { number: "95%", label: "Success Rate" }
      ].map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
          <p className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</p>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

     {/* How It Works Section */}
<section id="how-it-works" className="py-16 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-blue-950 mb-4">How It Works</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Join CodeQuest in just a few simple steps and kickstart your coding career journey
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Step 1 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
          <span className="text-2xl font-bold text-blue-600">1</span>
        </div>
        <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Create Account</h3>
        <p className="text-gray-600 text-center">
          Sign up as a Developer or Recruiter and verify your account with OTP for secure access.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
          <span className="text-2xl font-bold text-blue-600">2</span>
        </div>
        <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Role-Based Access</h3>
        <p className="text-gray-600 text-center">
          Developers access coding challenges, while Recruiters manage internships through protected dashboards.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
          <span className="text-2xl font-bold text-blue-600">3</span>
        </div>
        <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Complete Tasks</h3>
        <p className="text-gray-600 text-center">
          Developers take coding tests; Recruiters review results and manage opportunities in the admin dashboard.
        </p>
      </div>

      {/* Step 4 */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
          <span className="text-2xl font-bold text-blue-600">4</span>
        </div>
        <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Get Results</h3>
        <p className="text-gray-600 text-center">
          Developers receive scores and feedback; Recruiters send emails to successful candidates.
        </p>
      </div>
    </div>

    {/* Authentication Flow Section */}
    <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-center mb-8 text-blue-950">Authentication & Dashboard Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Developer Flow */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4 text-blue-800">For Developers</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Secure OTP verification during registration</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Access to coding challenges through protected routes</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Real-time coding test environment with multiple language support</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Detailed score reports with performance analytics</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Notification when recruiters view your profile</span>
            </li>
          </ul>
        </div>
        
        {/* Recruiter/Admin Flow */}
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4 text-indigo-800">For Recruiters/Admins</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Admin dashboard with comprehensive analytics</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Manage internship postings and applicant tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Review coding test scores and developer profiles</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Automated email notifications for successful candidates</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Protected routes with role-based access control</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  
    
  </div>
</section>

 

    </Layout>
    </>
  )
}

export default Home