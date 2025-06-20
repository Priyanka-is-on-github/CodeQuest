import Layout from "@/layout/Layout";

import { useState } from "react";
import { Link } from "react-router-dom";

const InformationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    github: "",
    resume: null,
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.terms) newErrors.terms = "You must accept the terms";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        education: "",
        skills: "",
        experience: "",
        github: "",
        resume: null,
        terms: false,
      });
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to CodeQuest. We'll review your information
            and get back to you soon.
          </p>

          <Link to="/">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              Go to Home page
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="text-center mb-10">

                    <div className=" flex">
                    <img src="/Meesho.png" alt="messho" className="h-28 w-28" />

                    <div className="ml-2">
                      <h1 className="text-3xl font-extrabold  sm:text-4xl text-blue-600">
                     Frontend Intership
                    </h1>
                      <h1 className="mt-2 text-sm text-gray-400 font-normal">
                     ENDS ON: JUN 24, 2025, 11:59 PM IST (ASIA/KOLKATA)
                    </h1>
                    </div>
                    
</div>
                    <p className="mt-1 text-base text-gray-700">
                      Enter the following Details
                    </p>
                  </div>

                  {/* Personal Information Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            errors.fullName ? "border-red-300" : "border"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            errors.email ? "border-red-300" : "border"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            errors.phone ? "border-red-300" : "border"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Education & Skills Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                      Education & Skills
                    </h3>
                    <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="education"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Education Level/Institution *
                        </label>
                        <input
                          type="text"
                          name="education"
                          id="education"
                          value={formData.education}
                          onChange={handleChange}
                          className={`mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            errors.education ? "border-red-300" : "border"
                          }`}
                          placeholder="e.g. B.Tech Computer Science, XYZ University"
                        />
                        {errors.education && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.education}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="skills"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Technical Skills *
                        </label>
                        <textarea
                          name="skills"
                          id="skills"
                          rows={3}
                          value={formData.skills}
                          onChange={handleChange}
                          className={`mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            errors.skills ? "border-red-300" : "border"
                          }`}
                          placeholder="List your programming languages, frameworks, tools (e.g. JavaScript, React, Python, Git)"
                        />
                        {errors.skills && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.skills}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Experience (if any)
                        </label>
                        <textarea
                          name="experience"
                          id="experience"
                          rows={3}
                          value={formData.experience}
                          onChange={handleChange}
                          className="mt-1 p-2  block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Describe your previous work experience, projects, or internships"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="github"
                          className="block text-sm font-medium text-gray-700"
                        >
                          GitHub Profile (optional)
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                            github.com/
                          </span>
                          <input
                            type="text"
                            name="github"
                            id="github"
                            value={formData.github}
                            onChange={handleChange}
                            className="p-2  block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="yourusername"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                      Resume
                    </h3>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="resume"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          className="hidden"
                          onChange={handleChange}
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                    {formData.resume && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected file: {formData.resume.name}
                      </p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-medium text-gray-700"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-500"
                        >
                          Terms and Conditions
                        </a>{" "}
                        *
                      </label>
                      {errors.terms && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.terms}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InformationPage;
