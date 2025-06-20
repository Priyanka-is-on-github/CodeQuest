import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import SignupSchema from "./schema";
import { IoPersonOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserRound } from "lucide-react";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  degree: "",
};

function SignupUser() {
  const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,  isValid,
    dirty, } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: (values, action) => {
        
        action.resetForm();
      },
    });

  const handleRegister = async () => {
    setIsSubmitting(true);
    try {
      const registeredUser = await fetch('http://localhost:3001/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const jsondata = await registeredUser.json();

      if (jsondata.msg === 'email already exists you can login') {
        toast.error('Email already exists you can login');
       
      } else {
        toast.success('Your account has been created!');
     
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <div className="flex min-h-screen ">
     {/* Left Side - Image */}
      <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-8">
        <img 
          src="./boy.jpg" 
          alt="Registration" 
          className="max-h-full max-w-full object-contain rounded-lg shadow-xl"
        />
      </div>

       {/* Right Side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 ">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Join <span className="text-blue-600">CodeQuest</span>
            </h1>
            <p className="text-gray-500">
              Start your coding journey with us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4  flex flex-col items-center">
            <div className=" w-[27vw] ">
              <div className={`flex border-2 ${errors.name && touched.name ? 'border-red-300' : 'border-gray-100'} w-96 shadow-xl shadow-blue-200 rounded-3xl pl-4 p-3 bg-white`}>
                <IoPersonOutline className="h-6 w-6 text-slate-500" />
                <input
                  type="text"
                  autoComplete="off"
                  name="name"
                  id="name"
                  placeholder="Enter your Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-3 outline-none bg-transparent w-full "
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-sm text-red-600 mt-1 ml-2">{errors.name}</p>
              )}
            </div>

            <div className="mb-6 w-[27vw]">
              <div className={`flex border-2 ${errors.email && touched.email ? 'border-red-300' : 'border-gray-100'} w-96 shadow-xl shadow-blue-200 rounded-3xl pl-4 p-3 bg-white`}>
                <MdOutlineMail className="h-6 w-6 text-slate-500" />
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-3 outline-none bg-transparent w-full"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-sm text-red-600 mt-1 ml-2">{errors.email}</p>
              )}
            </div>

            <div className="mb-6 w-[27vw]">
              <div className={`flex border-2 ${errors.password && touched.password ? 'border-red-300' : 'border-gray-100'} w-96 shadow-xl shadow-blue-200 rounded-3xl pl-4 p-3 bg-white`}>
                <IoLockClosedOutline className="h-6 w-6 text-slate-500" />
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-3 outline-none bg-transparent w-full"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-sm text-red-600 mt-1 ml-2">{errors.password}</p>
              )}
            </div>

            <div className="mb-6 w-[27vw]">
              <div className={`flex border-2 ${errors.role && touched.role ? 'border-red-300' : 'border-gray-100'} w-96 shadow-xl shadow-blue-200 rounded-3xl pl-4 p-3 bg-white`}>
                <UserRound className="h-6 w-6 text-slate-500" />
                <input
                  type="text"
                  autoComplete="off"
                  name="role"
                  id="role"
                  placeholder="e.g, User, admin"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-3 outline-none bg-transparent w-full"
                />
              </div>
              {errors.role && touched.role && (
                <p className="text-sm text-red-600 mt-1 ml-2">{errors.role}</p>
              )}
            </div>

            <div className="mb-6 w-[27vw]">
              <div className={`flex border-2 ${errors.degree && touched.degree ? 'border-red-300' : 'border-gray-100'} w-96 shadow-xl shadow-blue-200 rounded-3xl pl-4 p-3 bg-white`}>
                <LiaGraduationCapSolid className="h-6 w-6 text-slate-500"/>
                <input
                  type="text"
                  autoComplete="off"
                  name="degree"
                  id="degree"
                  placeholder="e.g, Btech, BCA, MCA"
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-3 outline-none bg-transparent w-full"
                />
              </div>
              {errors.degree && touched.degree && (
                <p className="text-sm text-red-600 mt-1 ml-2">{errors.degree}</p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gray-800 hover:bg-gray-900 text-white font-medium shadow-md transition-all"
                disabled={isSubmitting || !isValid || !dirty}
                 onClick={handleRegister}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 font-medium hover:underline">
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

export default SignupUser;