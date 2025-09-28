import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { SigninSchema } from "./SigninValidationSchema";
import { useAuth } from "@/context/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

function SignupUser() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, dirty } =
    useFormik({
      initialValues,
      validationSchema: SigninSchema,
      onSubmit: async (values, action) => {
        setIsSubmitting(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();

          if (!response.ok) {
            const errorMessage = data.msg || "Signin failed, Please try again."
            toast.error(errorMessage);
            return;
          }

          // Successful login
          signin(data.user, data.token);
          toast.success('Signin Successfull!');

          // Role-based redirection
          const redirectPath = location?.state?.from || (data.user.role === 'recruiter' ? '/recruiter/dashboard' : '/developer/dashboard');
          navigate(redirectPath, { replace: true });
          action.resetForm();

        } catch (error: any) {
          console.error('Login Error:', error);
          toast.error(error.message.includes('Unexpected response')
            ? 'Server error - please try again'
            : error.message);
        } finally {
          setIsSubmitting(false);
        }
      }
    });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Image - Hidden on mobile, visible on medium screens and up */}
      <div className="hidden md:flex lg:w-1/2 bg-blue-50 items-center justify-center p-4 lg:p-8">
        <img
          src="/boy.jpg"
          alt="boyImage"
          className="max-h-[80vh] w-auto object-contain rounded-lg shadow-xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Welcome back to <span className="text-blue-600">CodeQuest!</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Land your dream Internship
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex flex-col items-center w-full">
            {/* Email Field */}
            <div className="w-full max-w-sm lg:max-w-md">
              <div className={`flex border-2 ${errors.email && touched.email ? 'border-red-300' : 'border-gray-100'} w-full shadow-lg sm:shadow-xl shadow-blue-200 rounded-2xl sm:rounded-3xl pl-3 sm:pl-4 p-2 sm:p-3 bg-white`}>
                <MdOutlineMail className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-2 sm:pl-3 outline-none bg-transparent w-full text-sm sm:text-base"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-xs sm:text-sm text-red-600 mt-1 ml-2">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full max-w-sm lg:max-w-md">
              <div className={`flex border-2 ${errors.password && touched.password ? 'border-red-300' : 'border-gray-100'} w-full shadow-lg sm:shadow-xl shadow-blue-200 rounded-2xl sm:rounded-3xl pl-3 sm:pl-4 p-2 sm:p-3 bg-white`}>
                <IoLockClosedOutline className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-2 sm:pl-3 outline-none bg-transparent w-full text-sm sm:text-base"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-xs sm:text-sm text-red-600 mt-1 ml-2">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4 w-full max-w-sm lg:max-w-md">
              <Button
                type="submit"
                className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-medium shadow-md transition-all text-sm sm:text-base"
                disabled={isSubmitting || !isValid || !dirty}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center w-full">
              <p className="text-gray-600 text-xs sm:text-sm">
                New user{" "}
                <Link to={`/authorize`} className="text-blue-600 font-medium hover:underline ml-1">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupUser;