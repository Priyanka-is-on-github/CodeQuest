import { useAuth } from "@/context/AuthProvider";
import Layout from "@/layout/Layout";
import  { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Internship } from "../intership_management";



function InternshipInfoPage() {
  const { user } = useAuth();
  const location = useLocation();
  const { internshipId } = useParams();
  const isUserLoggedin = user?.role === "developer";

  const [internship, setInternship] = useState<Internship>();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/internships/internshipid?id=${internshipId}`
        );
        const { data } = await response.json();

        setInternship(data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } 
    };

    fetchInternships();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header with Company Logo */}
        <div className="flex items-center mb-8 mt-8">
          <div className="mr-6">
            <img
              src={internship?.companyLogo}
              alt={`${internship?.companyName} logo`}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {internship?.internshipTitle}
            </h1>
            <p className="text-xl text-gray-600">{internship?.companyName}</p>
          </div>
        </div>

        {/* Internship Banner Image */}
        <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
          <img
            src={internship?.internshipImage}
            alt="Internship banner"
            width={1200}
            height={300}
            className="w-full"
          />
        </div>

        {/* Internship Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              About the Internship
            </h2>
            <p className="text-gray-700 mb-6">
              {internship?.internshipDescription}
            </p>

            {/* <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Build production-ready web applications</li>
              <li>Work with modern tech stack (MERN, GraphQL, etc.)</li>
              <li>Collaborate using Agile methodologies</li>
              <li>Deploy applications to cloud platforms</li>
            </ul> */}
          </div>

          {/* Quick Facts Sidebar */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Internship Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="font-medium">{internship?.internshipDuration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="font-medium">{internship?.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stipend</p>
                <p className="font-medium">{internship?.stipend}</p>
              </div>
            </div>

            {/* Start Challenge Button */}

            {isUserLoggedin ? (
              <Link to={`/compete/internship/information/${internshipId}`}>
                <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                  Register
                </button>
              </Link>
            ) : (
              <Link to={"/signin"} state={{ from: location.pathname }}>
                <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                  Login to Register
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {/* <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Basic knowledge of JavaScript and web development</li>
            <li>Familiarity with React or similar frameworks</li>
            <li>Ability to commit 20+ hours per week</li>
            <li>Strong problem-solving skills</li>
          </ul>
        </div> */}
      </div>
    </Layout>
  );
}

export default InternshipInfoPage;
