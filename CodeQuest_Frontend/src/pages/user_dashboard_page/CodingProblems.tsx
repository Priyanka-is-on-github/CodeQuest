import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CodingProblems() {

 const [darkMode, setDarkMode] = useState(false);
const {user} = useAuth()
  useEffect(() => {
    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark/light class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const problems = [
    { id: 1, title: "Count Triplets", marks: 25, difficulty: "Easy" },
    { id: 2, title: "Array Rotation", marks: 30, difficulty: "Medium" },
    { id: 3, title: "Binary Tree Traversal", marks: 40, difficulty: "Hard" },
  ];


  return (
    <>
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
                CodeQuest
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/test/instructions"
                className={`relative group font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}
              >
                Test Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </nav>

            <button className="md:hidden focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-64px)] overflow-y-auto">
        {/* Problems List */}
        <div className={`w-full md:w-[40%] p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} pt-4 mb-6`}>
              All Problems
            </h2>

            {problems.map((problem) => (
              <div 
                key={problem.id}
                className={`rounded-lg p-4 mb-4 transition-all duration-300 shadow-md hover:shadow-lg 
                  ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-blue-50'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {problem.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Difficulty: <span className={`font-medium ${
                        problem.difficulty === 'Easy' ? 'text-green-500' : 
                        problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                      }`}>{problem.difficulty}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {problem.marks} pts
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Arrays
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Algorithms
                    </span>
                  </div>
                  <Link to={`/problem/${problem.id}`}>
                    <Button
                      className={`font-bold bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 
                      px-6 py-2 shadow-md transition-all duration-300 hover:scale-105`}
                    >
                      Solve
                    </Button>
                  </Link>
                </div>
              </div>
            ))}                                     
          </div>
        </div>

        {/* Welcome Panel */}
        <div className={`w-full md:w-[60%] p-8 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`rounded-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <p className={`text-3xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back,{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800">
                {user.name}!
              </span>
            </p>

            <p className={`pt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              "Get ready to showcase your skills! Your coding test awaits—begin now and take a step closer to your internship."
            </p>

            <div className="mt-8">
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Problems Solved</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>24</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Streak</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>5 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recommended for You
            </h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors cursor-pointer`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${darkMode ? 'bg-green-400' : 'bg-green-500'}`}></div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Two Sum Problem</p>
              </div>
              <div className={`p-3 rounded-lg flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors cursor-pointer`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'}`}></div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Linked List Cycle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    </>
  );
}

export default CodingProblems;
