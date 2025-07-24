// pages/RecruiterSignup.tsx
import { useState } from 'react';
import CompanySearch from './CompanySearch';
import RecruiterSignupForm from './RecruiterSignupForm';
import NewCompanyForm from './NewCompanyForm';




interface Company {
  id: string;
  name: string;
  logo: string;
}

const RecruiterSignup = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company>({id:'', name:'', logo:''});

  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          {selectedCompany.id === 'new' ? 'Add your Company': selectedCompany.id != '' ?`Create Account for ${selectedCompany.name}` : 'Find Your Company'}
      
        </h1>
        <p className="text-center text-gray-600 mb-8">
          
           {selectedCompany.id === 'new' ? 'Complete your company Profile': selectedCompany.id != '' ? 'Complete your recruiter profile':'Search for your company to get started'}
       
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {selectedCompany.id === 'new' ? (
          
          <NewCompanyForm company = {selectedCompany}/>
        ) : ( selectedCompany.id != '' ? (

<RecruiterSignupForm company = {selectedCompany}/>

        ):(
<CompanySearch onCompanySelect={setSelectedCompany} />

        ))
        
      }
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RecruiterSignup;