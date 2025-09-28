// components/RecruiterSignupForm.tsx
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterValidationSchema from "../schema/RecruiterValidationSchema";
import { useAuth } from "@/context/AuthProvider";

interface CompanyName {
  id: string;
  name: string;
  logo: string;
}

interface RecruiterData {
  companyId: string;
  companyName: string;
  name: string;
  email: string;
  password: string;
  position: string;
}

const RecruiterSignupForm = ({ company }: { company: CompanyName }) => {
  const { selectedRole } = useAuth();

  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const recruiterFormik = useFormik({
    initialValues: {
      companyId: company.id,
      companyName: company.name,
      name: "",
      email: "",
      password: "",
      position: "",
    } as RecruiterData,
    validationSchema: RecruiterValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/recruiter/createAccount/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          navigate(`/${selectedRole}/signin`, { state: { welcome: true } });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md ">
      {/* Progress Steps */}
      <div className="flex mb-6">
        {[1, 2].map((stepNumber) => (
          <div key={stepNumber} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${
                step >= stepNumber
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {stepNumber}
            </div>
            <p className="text-xs mt-1">
              {stepNumber === 1 ? "Confirm" : "Your Details"}
            </p>
            {stepNumber < 4 && (
              <div
                className={`h-1 w-full ${
                  step > stepNumber ? "bg-blue-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Confirm Company (existing from your code) */}

      {step === 1 && company.id != "new" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Confirm Company
          </h2>
          <div className=" p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex">
 <img
              src={company.logo}
              alt="company logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-medium text-lg">{company.name}</span>

            </div>
           
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-500 mt-1">
                Existing company profile
              </p>
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
      )}

      {/* Step 3: Recruiter Details (existing from your code) */}
      {step === 2 && (
        <form onSubmit={recruiterFormik.handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create Your Account
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Company Name*
            </label>
            <input
              type="text"
              name="name"
              value={recruiterFormik.values.companyName}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.name && recruiterFormik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {recruiterFormik.errors.name}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              value={recruiterFormik.values.name}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.name && recruiterFormik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {recruiterFormik.errors.name}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Work Email*
            </label>
            <input
              type="email"
              name="email"
              value={recruiterFormik.values.email}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.email && recruiterFormik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {recruiterFormik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Your Position*
            </label>
            <input
              type="text"
              name="position"
              value={recruiterFormik.values.position}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.position &&
              recruiterFormik.errors.position && (
                <div className="text-red-500 text-sm mt-1">
                  {recruiterFormik.errors.position}
                </div>
              )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password*
            </label>
            <input
              type="password"
              name="password"
              value={recruiterFormik.values.password}
              onChange={recruiterFormik.handleChange}
              onBlur={recruiterFormik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {recruiterFormik.touched.password &&
              recruiterFormik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {recruiterFormik.errors.password}
                </div>
              )}
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={recruiterFormik.isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {recruiterFormik.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RecruiterSignupForm;
