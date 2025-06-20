import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you're using shadcn/ui

function Unauthorised() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)} 
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            Go Back
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorised;