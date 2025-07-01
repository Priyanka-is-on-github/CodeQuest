import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaUserTie, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '@/context/AuthProvider';

function Authentication() {
const {selectedRole, setSelectedRole} = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role:any) => {
       localStorage.setItem('role', role)
    setSelectedRole(role);
  };

  const proceedToAuth = () => {
    if (selectedRole) {
      navigate(`/signup/${selectedRole}`);
   
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to <span className="text-blue-600">CodeQuest</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Select your role to continue
          </p>

          <div className="space-y-4 mb-8">
            {/* Developer Option */}
            <div 
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedRole === 'developer' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleRoleSelect('developer')}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${
                  selectedRole === 'developer' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <FaCode size={24} />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-lg text-gray-800">Developer</h3>
                  <p className="text-gray-600 text-sm">
                    Find internships and showcase your skills
                  </p>
                </div>
              </div>
            </div>

            {/* Recruiter Option */}
            <div 
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedRole === 'recruiter' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleRoleSelect('recruiter')}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${
                  selectedRole === 'recruiter' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <FaUserTie size={24} />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-lg text-gray-800">Recruiter</h3>
                  <p className="text-gray-600 text-sm">
                    Post internships and find top talent
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={proceedToAuth}
            disabled={!selectedRole}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
              selectedRole 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <FaArrowRight />
          </button>

          <p className="mt-6 text-gray-500 text-sm">
            Already have an account?{' '}
            <a 
              href="/login" 
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;