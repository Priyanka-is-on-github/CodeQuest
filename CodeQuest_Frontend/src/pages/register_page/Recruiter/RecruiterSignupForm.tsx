// components/RecruiterSignupForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface CompanyName{
  id:string;
  name:string;
  logo:string;
}

interface RecruiterData {
  companyId: string;
  companyName: string;
  name: string;
  email: string;
  password: string;
  position: string;
}

const RecruiterSignupForm = ({ company }: { company: CompanyName}) => {

  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
console.log('step=', step)


  // Recruiter data state
  const [recruiterData, setRecruiterData] = useState<RecruiterData>({
    companyId: company.id, //new
    companyName: company.name, //meesho
    name: '',
    email: '',
    password: '',
    position: ''
  });

 

  const handleRecruiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecruiterData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // First register company if new
      if (company.id === 'new') {
        // await registerCompany(companyData);
      }
      
      // Then register recruiter
      // await registerRecruiter({
      //   ...recruiterData,
      //   companyId: company.id === 'new' ? 'new_company_id_from_api' : company.id
      // });
      
      navigate('/recruiter/dashboard', { state: { welcome: true } });
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md ">
      {/* Progress Steps */}
      <div className="flex mb-6">
{
 

[1, 2].map((stepNumber) => (

          <div key={stepNumber} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${step >= stepNumber ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
              {stepNumber}
            </div>
            <p className="text-xs mt-1">
              {stepNumber === 1 ? 'Confirm' : 'Your Details'
              
               }
            </p>
            {stepNumber < 4 && (
              <div className={`h-1 w-full ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))

 
}
       
        
      </div>

   
      

      {/* Step 1: Confirm Company (existing from your code) */}
    
      {
        step === 1 && company.id != 'new' && (

          <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
         Confirm Company
          </h2>
          <div className="flex p-4 bg-gray-50 rounded-lg mb-4">
            {/* <img src={company.logo || '/default-logo.png'}  alt="company logo"  className="h-8 w-8 object-contain"/> */}
            <h3 className="font-medium text-lg">{company.name}</h3>
            
        <div className="mt-3 space-y-2">
            <p className="text-sm text-gray-500 mt-1">Existing company profile</p>
            
        </div>
            
              
          </div>

          <div className="flex justify-between">


  
          <button
            onClick={() => setStep(2)}
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue to Account Setup
          </button>
           </div>
     
     </div>
          
        )
      }




      {/* Step 3: Recruiter Details (existing from your code) */}
      {step === 2   &&(
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Your Account</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name*</label>
            <input
              type="text"
              name="name"
              value={recruiterData.name}
              onChange={handleRecruiterChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Work Email*</label>
            <input
              type="email"
              name="email"
              value={recruiterData.email}
              onChange={handleRecruiterChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Your Position*</label>
            <input
              type="text"
              name="position"
              value={recruiterData.position}
              onChange={handleRecruiterChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password*</label>
            <input
              type="password"
              name="password"
              value={recruiterData.password}
              onChange={handleRecruiterChange}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      )}

      



    </div>
  );
};

export default RecruiterSignupForm;