import Editor from '@monaco-editor/react';
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Type definitions
type Language = 'javascript' | 'python' | 'java' | 'cpp';

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface Question {
  id: number;
  title: string;
  description: string;
  examples: Example[];
  boilerplate: Record<Language, string>;
}

function ProblemPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      title: "Count Triplets",
      description: "You are given an array arr[] of integers. You need to count the number of triplets (i, j, k) such that i < j < k and the mean of arr[i] and arr[k] is equal to arr[j]",
      examples: [
        {
          input: "arr = [6, 4, 2, 5]",
          output: "1",
          explanation: "The only triplet that satisfies the condition is (0, 1, 3) where (6 + 5)/2 = 5.5 ≈ 6"
        },
        {
          input: "arr = [1, 2, 3, 4, 5]",
          output: "4",
          explanation: "Multiple triplets satisfy the condition: (0,1,2), (1,2,3), (2,3,4), (0,2,4)"
        }
      ],
      boilerplate: {
        javascript: "function countTriplets(arr) {\n  // Your code here\n  return 0;\n}",
        python: "def count_triplets(arr):\n    # Your code here\n    return 0",
        java: "public class Solution {\n    public int countTriplets(int[] arr) {\n        // Your code here\n        return 0;\n    }\n}",
        cpp: "int countTriplets(vector<int>& arr) {\n    // Your code here\n    return 0;\n}"
      }
    },
    {
      id: 2,
      title: "Array Rotation",
      description: "Rotate an array to the right by k steps where k is non-negative.",
      examples: [
        {
          input: "nums = [1,2,3,4,5,6,7], k = 3",
          output: "[5,6,7,1,2,3,4]",
          explanation: "Rotate 1 steps to the right: [7,1,2,3,4,5,6]\nRotate 2 steps to the right: [6,7,1,2,3,4,5]\nRotate 3 steps to the right: [5,6,7,1,2,3,4]"
        }
      ],
      boilerplate: {
        javascript: "function rotateArray(nums, k) {\n  // Your code here\n  return nums;\n}",
        python: "def rotate_array(nums, k):\n    # Your code here\n    return nums",
        java: "public class Solution {\n    public int[] rotateArray(int[] nums, int k) {\n        // Your code here\n        return nums;\n    }\n}",
        cpp: "vector<int> rotateArray(vector<int>& nums, int k) {\n    // Your code here\n    return nums;\n}"
      }
    },
    // Add more questions as needed
  ];

  useEffect(() => {
    // Set initial code based on selected language
    setCode(questions[currentQuestion].boilerplate[language] || '');
  }, [currentQuestion, language]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Running code...");
    
    // Simulate code execution (in a real app, you'd call your backend API)
    setTimeout(() => {
      setOutput("Code executed successfully!\n\n" + 
        `Question: ${questions[currentQuestion].title}\n` +
        `Language: ${language}\n\n` +
        "Test Case 1: Passed\n" +
        "Test Case 2: Passed\n" +
        "Test Case 3: Passed\n\n" +
        "All test cases passed!");
      setIsRunning(false);
    }, 1500);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestion(index);
  };

  return (
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
            <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionChange(index)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    currentQuestion === index
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {question.title}
                </button>
              ))}
            </div>

            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              {questions[currentQuestion].title}
            </h2>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {questions[currentQuestion].description}
            </p>

            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
              Examples:
            </h3>
            
            {questions[currentQuestion].examples.map((example, idx) => (
              <div key={idx} className={`rounded-lg p-4 mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="mb-2">
                  <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Input:</span>
                  <pre className={`mt-1 p-2 rounded ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                    {example.input}
                  </pre>
                </div>
                <div className="mb-2">
                  <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Output:</span>
                  <pre className={`mt-1 p-2 rounded ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                    {example.output}
                  </pre>
                </div>
                {example.explanation && (
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explanation:</span>
                    <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className={`w-full md:w-[60%] p-4 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`rounded-xl p-6 h-full flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Code Editor
              </h3>
              <select
                value={language}
                onChange={handleLanguageChange}
                className={`px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            <div className="flex-1 mb-4 overflow-hidden">
              <Editor
                height="100%"
                language={language}
                theme={darkMode ? 'vs-dark' : 'light'}
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isRunning
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                className={`px-6 py-2 rounded-lg font-medium ${
                  darkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Submit
              </button>
            </div>

            <div className={`rounded-lg p-4 flex-1 overflow-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Output:</h4>
              <pre className={`whitespace-pre-wrap ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {output || 'Your output will appear here...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;