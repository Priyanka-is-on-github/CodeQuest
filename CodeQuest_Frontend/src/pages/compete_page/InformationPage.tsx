import Layout from "@/layout/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
    .required("Phone number is required"),
  education: Yup.string().required("Education is required"),
  skills: Yup.string().required("Skills are required"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
});

const InformationPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", { ...values, resume: resumeFile });
      setSubmitting(false);
      setSubmitSuccess(true);
      resetForm();
      setResumeFile(null);
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
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  phone: "",
                  education: "",
                  skills: "",
                  experience: "",
                  github: "",
                  terms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="space-y-6">
                      <div className="text-center mb-10">
                        <div className="flex">
                          <img
                            src="/Meesho.png"
                            alt="messho"
                            className="h-28 w-28"
                          />
                          <div className="ml-2">
                            <h1 className="text-3xl font-extrabold sm:text-4xl text-blue-600">
                              Frontend Internship
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
                            <Field
                              type="text"
                              name="fullName"
                              id="fullName"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                            <ErrorMessage
                              name="fullName"
                              component="p"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email Address *
                            </label>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                            <ErrorMessage
                              name="email"
                              component="p"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone Number *
                            </label>
                            <Field
                              type="tel"
                              name="phone"
                              id="phone"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                            <ErrorMessage
                              name="phone"
                              component="p"
                              className="mt-1 text-sm text-red-600"
                            />
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
                            <Field
                              type="text"
                              name="education"
                              id="education"
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                              placeholder="e.g. B.Tech Computer Science, XYZ University"
                            />
                            <ErrorMessage
                              name="education"
                              component="p"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="skills"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Technical Skills *
                            </label>
                            <Field
                              as="textarea"
                              name="skills"
                              id="skills"
                              rows={3}
                              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                              placeholder="List your programming languages, frameworks, tools (e.g. JavaScript, React, Python, Git)"
                            />
                            <ErrorMessage
                              name="skills"
                              component="p"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor="experience"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Experience (if any)
                            </label>
                            <Field
                              as="textarea"
                              name="experience"
                              id="experience"
                              rows={3}
                              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                              <Field
                                type="text"
                                name="github"
                                id="github"
                                className="p-2 block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                              onChange={(e) => {
                                setResumeFile(e.currentTarget.files[0]);
                              }}
                              accept=".pdf,.doc,.docx"
                            />
                          </label>
                        </div>
                        {resumeFile && (
                          <p className="mt-2 text-sm text-gray-600">
                            Selected file: {resumeFile.name}
                          </p>
                        )}
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="terms"
                            name="terms"
                            type="checkbox"
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
                          <ErrorMessage
                            name="terms"
                            component="p"
                            className="mt-1 text-sm text-red-600"
                          />
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
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InformationPage;