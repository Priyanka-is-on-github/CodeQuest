import { useFormik } from "formik";
import { Button } from "@/components/ui/button";


import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useState } from "react";

import { useAuth } from "@/context/AuthProvider";
import { ArrowRightIcon, EyeIcon } from "lucide-react";
import {RecruiterSigninSchema} from "./SigninValidationSchema";

const initialValues = {
 
  email: "",
  password: "",
 
};

function RecruiterSignin() {
 
  const {signin} = useAuth();
  const navigate = useNavigate();
  
  const location = useLocation()
    const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,  isValid,
    dirty, } =
    useFormik({
      initialValues,
      validationSchema: RecruiterSigninSchema,
      onSubmit: async(values, action) => {
  
      
        setIsSubmitting(true)
      try {
        
        const response = await fetch('http://localhost:3001/api/v1/auth/recruiter/recruitersignIn',{
            
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            
            },
            body: JSON.stringify(values), 
        })

    
        const data = await response.json();
      

if(!response.ok){
  const errorMessage = data.msg || "Signin failed, Please try again."
  toast.error(errorMessage)
  return;
}

// Successful login
signin(data.user, data.token)
toast.success('Signin Successfull!')

// Role-based redirection


 const redirectPath= location?.state?.from || (data.user.role === 'recruiter'? '/recruiter/dashboard': '/developer/dashboard');


navigate(redirectPath, {replace:true})  
      action.resetForm();
      } catch (error:any) {
      console.error('Login Error:', error);
    toast.error(error.message.includes('Unexpected response') 
      ? 'Server error - please try again' 
      : error.message);

      }
      finally{
        setIsSubmitting(false)
      }
    }
  
      
    });

    
//       const handleSignin = async()=>{
//         setIsSubmitting(true)
//       try {
        
//         const response = await fetch('http://localhost:3001/api/v1/auth/signin',{
            
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json', 
            
//             },
//             body: JSON.stringify(values), 
//         })

    
//         const data = await response.json();
      

// if(!response.ok){
//   const errorMessage = data.msg || "Signin failed, Please try again."
//   toast.error(errorMessage)
//   return;
// }

// // Successful login
// signin(data.user, data.token)
// toast.success('Signin Successfull!')

// // Role-based redirection


//  const redirectPath= location?.state?.from || (data.user.role === 'recruiter'? '/recruiter/dashboard': '/developer/dashboard');


// navigate(redirectPath, {replace:true})  

//       } catch (error:any) {
//       console.error('Login Error:', error);
//     toast.error(error.message.includes('Unexpected response') 
//       ? 'Server error - please try again' 
//       : error.message);

//       }
//       finally{
//         setIsSubmitting(false)
//       }
//     }

  return (
  

    
      

     
      
        <div className="md:w-full flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-white">
  <div className="w-full max-w-md">
    <div className="mb-8 text-center">
      <div className="flex justify-center mb-4">
        <img 
          src="/recruiter.png" 
          alt="Recruiter" 
          className="h-16 w-16"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Welcome back, <span className="text-blue-600">Recruiter</span>
      </h1>
      <p className="text-gray-500 text-lg">
        Access your hiring dashboard and find top talent
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Work Email
        </label>
        <div className={`relative rounded-lg shadow-sm ${errors.email && touched.email ? 'ring-2 ring-red-300' : 'ring-1 ring-gray-300'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdOutlineMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your.name@company.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        {errors.email && touched.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className={`relative rounded-lg shadow-sm ${errors.password && touched.password ? 'ring-2 ring-red-300' : 'ring-1 ring-gray-300'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button type="button" className="text-gray-400 hover:text-gray-500">
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        {errors.password && touched.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !isValid || !dirty}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Access Hiring Dashboard"
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            New to CodeQuest?
          </span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <Link 
          to="/recruiter/signup" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition-all"
        >
          Create Recruiter Account
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </form>
  </div>
</div>
      
 
  );
}

export default RecruiterSignin;