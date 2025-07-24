// components/NewCompanyForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Headquarters {
city: string;
country: string;
}

interface CompanyName{
  id:string;
  name:string;
 
}
interface Company {
  id: string;
  name: string;
logo: string;
  website: string;
  foundedYear: number;
  description: string;
  headquarters: Headquarters;
  sector: string;
  size?: string;
}



interface RecruiterData {
  companyId: string;
  companyName: string;
  name: string;
  email: string;
  password: string;
  position: string;
}

const NewCompanyForm = ({ company }: { company: CompanyName}) => {

  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Extended company data state for new companies
  const [companyData, setCompanyData] = useState<Company>({
    ...company,
    logo:'',
    website: '',
    foundedYear: new Date().getFullYear(),
    description: '',
    headquarters: { city: '', country: '' },
    sector: '',
    size: ''
  });

  // Recruiter data state
  const [recruiterData, setRecruiterData] = useState<RecruiterData>({
    companyId: company.id, //new
    companyName: company.name, //meesho
    name: '',
    email: '',
    password: '',
    position: ''
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

  
    const { name, value } = e.target;
   if (name === 'city' || name === 'country') {

    setCompanyData(prev => ({
      ...prev,
      headquarters: {
        ...prev.headquarters,
        [name]: value
      }
    }));
  } else {
    setCompanyData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  }
};


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
 

[1, 2, 3].map((stepNumber) => (

          <div key={stepNumber} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${step >= stepNumber ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
              {stepNumber}
            </div>
            <p className="text-xs mt-1">
              {stepNumber === 1 ? 'Company Info' : 
               stepNumber === 2 ? 'Confirm' : 
               'Your Details'}
            </p>
            {stepNumber < 4 && (
              <div className={`h-1 w-full ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))

 
}
       
        
      </div>

      {/* Step 1: Company Information (for new companies) */}
      {step === 1 && company.id === 'new' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company Name*</label>
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={handleCompanyChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company logo*</label>
            <input
              type="url"
              name="logo"
              value={companyData.logo}
              onChange={handleCompanyChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

         

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Website URL*</label>
            <input
              type="url"
              name="website"
              value={companyData.website}
              onChange={handleCompanyChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Founded Year</label>
            <input
              type="number"
              name="foundedYear"
              value={companyData.foundedYear}
              onChange={handleCompanyChange}
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Headquarters</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={companyData.headquarters?.city || ''}
                onChange={handleCompanyChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={companyData.headquarters?.country || ''}
                onChange={handleCompanyChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Sector</label>
            <select
              name="sector"
              value={companyData.sector}
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select sector</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company Size</label>
            <select
              name="size"
              value={companyData.size}
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select size</option>
              <option value="1-50">1-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleCompanyChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Confirm Company (existing from your code) */}
      { step === 2  && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
         Review Company Information
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-medium text-lg">{companyData.name}</h3>
            
              <div className="mt-3 space-y-2">
                <p><span className="text-gray-600">Website:</span> {companyData.website}</p>
                <p><span className="text-gray-600">Founded:</span> {companyData.foundedYear}</p>
                <p><span className="text-gray-600">Location:</span> {companyData.headquarters?.city}, {companyData.headquarters?.country}</p>
                <p><span className="text-gray-600">Sector:</span> {companyData.sector}</p>
                <p><span className="text-gray-600">Size:</span> {companyData.size} employees</p>
                {companyData.description && (
                  <p><span className="text-gray-600">About:</span> {companyData.description}</p>
                )}
              </div>
            
          </div>

          <div className="flex justify-between">


    
            <button
              type="button"
              onClick={() => setStep(company.id === 'new' ? 1 : 2)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Back
            </button>
          <button
            onClick={() => setStep(3)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue to Account Setup
          </button>
           </div>
     
     </div>
      )}

    




      {/* Step 3: Recruiter Details (existing from your code) */}
      {step === 3  &&(
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
              onClick={() => setStep(company.id === 'new' ? 2 : 3)}
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

      {step === 2  && company.id != 'new' && (
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
              onClick={() => setStep(2)}
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

export default NewCompanyForm;