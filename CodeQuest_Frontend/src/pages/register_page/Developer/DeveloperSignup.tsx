import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import DeveloperSignupSchema from "../schema/DeveloperSignupSchema";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UniversityIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { FaIdCard } from "react-icons/fa";

const initialValues = {
  name: "",
  email: "",
  password: "",
  collegeName: '',
  degree: "",
  adharNumber: "",
};

function DeveloperSignup() {
  const { selectedRole } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, dirty } =
    useFormik({
      initialValues,
      validationSchema: DeveloperSignupSchema,
      onSubmit: (_, action) => {
        action.resetForm();
      },
    });

  const handleRegister = async () => {
    setIsSubmitting(true);
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    const otpcode = { otpValue, generatedAt: Date.now() };

    const userValues = { ...values, role: selectedRole, verificationCode: otpValue };

    try {
      const registeredUser = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userValues)
      });

      const jsondata = await registeredUser.json();

      if (jsondata.msg === 'Verify your Email') {
        toast.success("Verify your Email!");
        navigate('/signup/otpverification');
      }

      if (jsondata.msg === 'email already exists you can login') {
        toast('Email already exists you can login');
        navigate(`/signin/${selectedRole}`);
      } else {
        navigate('/signup/otpverification', {
          state: {
            otpcode,
            email: userValues.email,
          }
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedRole === '') {
      navigate('/authorize');
    }
  }, [selectedRole]);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Image - Hidden on mobile, visible on medium screens and up */}
      <div className="hidden md:flex lg:w-1/2 bg-blue-50 items-center justify-center p-4 lg:p-8">
        <img
          src='/boy.jpg'
          alt="boyImage"
          className="max-h-[80vh] w-auto object-contain rounded-lg shadow-xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Join <span className="text-blue-600">CodeQuest</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Land your Dream Internship
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 flex flex-col items-center w-full">
            {/* Name Field */}
            <div className="w-full max-w-sm lg:max-w-md">
              <div className={`flex border-2 ${errors.name && touched.name ? 'border-red-300' : 'border-gray-100'} w-full shadow-lg sm:shadow-xl shadow-blue-200 rounded-2xl sm:rounded-3xl pl-3 sm:pl-4 p-2 sm:p-3 bg-white`}>
                <IoPersonOutline className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                <input
                  type="text"
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder="Enter your Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-2 sm:pl-3 outline-none bg-transparent w-full text-sm sm:text-base"
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-xs sm:text-sm text-red-600 mt-1 ml-2">{errors.name}</p>
              )}
            </div>

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

            {/* College Name Field */}
            <div className="w-full max-w-sm lg:max-w-md">
              <div className={`flex border-2 ${errors.collegeName && touched.collegeName ? 'border-red-300' : 'border-gray-100'} w-full shadow-lg sm:shadow-xl shadow-blue-200 rounded-2xl sm:rounded-3xl pl-3 sm:pl-4 p-2 sm:p-3 bg-white`}>
                <UniversityIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                <input
                  type="text"
                  autoComplete="off"
                  name="collegeName"
                  id="collegeName"
                  placeholder="College or University name"
                  value={values.collegeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-2 sm:pl-3 outline-none bg-transparent w-full text-sm sm:text-base"
                />
              </div>
              {errors.collegeName && touched.collegeName && (
                <p className="text-xs sm:text-sm text-red-600 mt-1 ml-2">{errors.collegeName}</p>
              )}
            </div>

            {/* Degree Field */}
            <div className="w-full max-w-sm lg:max-w-md">
              <div className={`flex border-2 ${errors.degree && touched.degree ? 'border-red-300' : 'border-gray-100'} w-full shadow-lg sm:shadow-xl shadow-blue-200 rounded-2xl sm:rounded-3xl pl-3 sm:pl-4 p-2 sm:p-3 bg-white`}>
                <LiaGraduationCapSolid className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                <input
                  type="text"
                  autoComplete="off"
                  name="degree"
                  id="degree"
                  placeholder="e.g, Btech, BCA, MCA"
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-2 sm:pl-3 outline-none bg-transparent w-full text-sm sm:text-base"
                />
              </div>
              {errors.degree && touched.degree && (
                <p className="text-xs sm:text-sm text-red-600 mt-1 ml-2">{errors.degree}</p>
              )}
            </div>

            {/* Aadhar Number Field */}
            <div className="w-full max-w-sm lg:max-w-md">
              <div className={`flex border-2 ${errors.adharNumber && touched.adharNumber ? 'border-red-300' : 'border-gray-100'} w-full shadow-lg sm:shadow-xl shadow-blue-200 rounded-2xl sm:rounded-3xl pl-3 sm:pl-4 p-2 sm:p-3 bg-white`}>
                <FaIdCard className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                <input
                  type="text"
                  autoComplete="off"
                  name="adharNumber"
                  id="adharNumber"
                  placeholder="Enter your Aadhar number"
                  value={values.adharNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-2 sm:pl-3 outline-none bg-transparent w-full text-sm sm:text-base"
                />
              </div>
              {errors.adharNumber && touched.adharNumber && (
                <p className="text-xs sm:text-sm text-red-600 mt-1 ml-2">{errors.adharNumber}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3 sm:pt-4 w-full max-w-sm lg:max-w-md">
              <Button
                type="submit"
                className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-medium shadow-md transition-all text-sm sm:text-base"
                disabled={isSubmitting || !isValid || !dirty}
                onClick={handleRegister}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center w-full">
              <p className="text-gray-600 text-xs sm:text-sm">
                Already have an account?{" "}
                <Link to={`/signin/${selectedRole}`} className="text-blue-600 font-medium hover:underline">
                  Sign In now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeveloperSignup;