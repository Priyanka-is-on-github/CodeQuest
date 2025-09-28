// components/NewCompanyForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import companyValidationSchema from '../schema/CompanyValidationSchema';
import RecruiterValidationSchema from '../schema/RecruiterValidationSchema';
import { useAuth } from '@/context/AuthProvider';

interface Headquarters {
  city: string;
  country: string;
}

interface CompanyName {
  id: string;
  name: string;
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





const NewCompanyForm = ({ company }: { company: CompanyName }) => {
  const {selectedRole} = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Company form
  const companyFormik = useFormik({
    initialValues: {
      ...company,
      logo: '',
      website: '',
      foundedYear: new Date().getFullYear(),
      description: '',
      headquarters: { city: '', country: '' },
      sector: '',
      size: ''
    } as Company,
    validationSchema: companyValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/auth/companies/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        
        const data = await response.json();
      
        setName(data.data.name)
        if (response.ok) {
          setStep(2);
        } else {
          console.error('Company creation failed:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // Recruiter form
  const recruiterFormik = useFormik({
    initialValues: {
      companyId: company.id,
      companyName: company.name,
      name: '',
      email: '',
      password: '',
      position: ''
    } as RecruiterData,
    validationSchema: RecruiterValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/auth/recruiter/createAccount/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        
        if (response.ok) {
          navigate(`/${selectedRole}/signin`, { state: { welcome: true } });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });


  const VerifyCompany = async()=>{

    try {
       const response = await fetch('http://localhost:3001/api/v1/auth/companies/verifyCompany', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name : name})
        });

        if(response.ok){
          setStep(3)
        }
    } catch (error) {
       console.error('Error:', error);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {/* Progress Steps */}
      <div className="flex mb-6">
        {[1, 2, 3].map((stepNumber) => (
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
        ))}
      </div>

      {/* Step 1: Company Information */}
      {step === 1 && company.id === 'new' && (
        <form onSubmit={companyFormik.handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company Name*</label>
            <input
              type="text"
              name="name"
              value={companyFormik.values.name}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {companyFormik.touched.name && companyFormik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{companyFormik.errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company logo*</label>
            <input
              type="url"
              name="logo"
              value={companyFormik.values.logo}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {companyFormik.touched.logo && companyFormik.errors.logo && (
              <div className="text-red-500 text-sm mt-1">{companyFormik.errors.logo}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Website URL*</label>
            <input
              type="url"
              name="website"
              value={companyFormik.values.website}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {companyFormik.touched.website && companyFormik.errors.website && (
              <div className="text-red-500 text-sm mt-1">{companyFormik.errors.website}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Founded Year</label>
            <input
              type="number"
              name="foundedYear"
              value={companyFormik.values.foundedYear}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {companyFormik.touched.foundedYear && companyFormik.errors.foundedYear && (
              <div className="text-red-500 text-sm mt-1">{companyFormik.errors.foundedYear}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Headquarters</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="headquarters.city"
                  placeholder="City"
                  value={companyFormik.values.headquarters.city}
                  onChange={companyFormik.handleChange}
                  onBlur={companyFormik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                {companyFormik.touched.headquarters?.city && companyFormik.errors.headquarters?.city && (
                  <div className="text-red-500 text-sm mt-1">{companyFormik.errors.headquarters.city}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="headquarters.country"
                  placeholder="Country"
                  value={companyFormik.values.headquarters.country}
                  onChange={companyFormik.handleChange}
                  onBlur={companyFormik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                {companyFormik.touched.headquarters?.country && companyFormik.errors.headquarters?.country && (
                  <div className="text-red-500 text-sm mt-1">{companyFormik.errors.headquarters.country}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Sector</label>
            <select
              name="sector"
              value={companyFormik.values.sector}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select sector</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {companyFormik.touched.sector && companyFormik.errors.sector && (
              <div className="text-red-500 text-sm mt-1">{companyFormik.errors.sector}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company Size</label>
            <select
              name="size"
              value={companyFormik.values.size}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
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
              value={companyFormik.values.description}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={companyFormik.isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {companyFormik.isSubmitting ? 'Creating Company...' : 'Create Company'}
          </button>
        </form>
      )}

      {/* Step 2: Confirm Company */}
      {step === 2 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Review Company Information
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-medium text-lg">{companyFormik.values.name}</h3>
            <div className="mt-3 space-y-2">
              <p><span className="text-gray-600">Website:</span> {companyFormik.values.website}</p>
              <p><span className="text-gray-600">Founded:</span> {companyFormik.values.foundedYear}</p>
              <p><span className="text-gray-600">Location:</span> {companyFormik.values.headquarters.city}, {companyFormik.values.headquarters.country}</p>
              <p><span className="text-gray-600">Sector:</span> {companyFormik.values.sector}</p>
              <p><span className="text-gray-600">Size:</span> {companyFormik.values.size} employees</p>
              {companyFormik.values.description && (
                <p><span className="text-gray-600">About:</span> {companyFormik.values.description}</p>
              )}
            </div>
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
              onClick={VerifyCompany}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Confirm Company
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Recruiter Details */}
      {step === 3 && (
        <form onSubmit={recruiterFormik.handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Your Account</h2>
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Company Name*</label>
            <input
              type="text"
              name="name"
              value={companyFormik.values.name}
              onChange={companyFormik.handleChange}
              onBlur={companyFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {companyFormik.touched.name && companyFormik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{companyFormik.errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name*</label>
            <input
              type="text"
              name="name"
              value={recruiterFormik.values.name}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.name && recruiterFormik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{recruiterFormik.errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Work Email*</label>
            <input
              type="email"
              name="email"
              value={recruiterFormik.values.email}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.email && recruiterFormik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{recruiterFormik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Your Position*</label>
            <input
              type="text"
              name="position"
              value={recruiterFormik.values.position}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.position && recruiterFormik.errors.position && (
              <div className="text-red-500 text-sm mt-1">{recruiterFormik.errors.position}</div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password*</label>
            <input
              type="password"
              name="password"
              value={recruiterFormik.values.password}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.password && recruiterFormik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{recruiterFormik.errors.password}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          <div className="flex justify-center">
           
            <button
              type="submit"
              disabled={recruiterFormik.isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {recruiterFormik.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewCompanyForm;