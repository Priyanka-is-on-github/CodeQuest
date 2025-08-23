import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/layout/AdminLayout';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

type Applicant = {
  _id: string;
  companyLogo: string;
  companyName: string;
  education: string;
  email: string;
  experience: string;
  fullName: string;
  github: string;
  internshipId: string;
  phone: string;
  skills: string;
  startDate: Date | string;
  terms: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

function HandleUser() {
  const [approvedApplicants, setApprovedApplicants] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const handleApprove = (applicantId: string) => {

   
    if (!approvedApplicants.includes(applicantId)) {
      setApprovedApplicants([...approvedApplicants, applicantId]);
      alert(`Applicant approved for test! ID: ${applicantId}`);
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/developers/developer-form`
        );
        const { data } = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Applicants Management</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="w-full h-72 rounded-xl" />
              </div>
            ))
          ) : applicants.length > 0 ? (
            applicants.map((applicant) => (
              <div
                key={applicant._id}
                className={`border rounded-lg p-6 shadow-md ${
                  approvedApplicants.includes(applicant._id) 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white'
                }`}
              >
                <div className="flex items-start mb-4">
                  <img
                    src={applicant.companyLogo}
                    alt={`${applicant.companyName} logo`}
                    className="w-16 h-16 object-contain mr-4 border rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{applicant.fullName}</h2>
                    <p className="text-gray-600">{applicant.companyName}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="font-medium">Email:</span> {applicant.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {applicant.phone}
                  </div>
                  <div>
                    <span className="font-medium">Education:</span> {applicant.education}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {applicant.experience}
                  </div>
                  <div>
                    <span className="font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {applicant.skills.split(',').map((skill, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">GitHub:</span>
                    <a
                      href={`https://github.com/${applicant.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      {applicant.github}
                    </a>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Start date:</span>
                      <span>
                        {format(
                          new Date(applicant.startDate),
                          "MMM d, yyyy h:mm a"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleApprove(applicant._id)}
                    disabled={approvedApplicants.includes(applicant._id)}
                    className={`px-4 py-2 rounded-md ${
                      approvedApplicants.includes(applicant._id)
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {approvedApplicants.includes(applicant._id) 
                      ? 'Approved ✓' 
                      : 'Approve for Test'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-1">
                No applicants found
              </h3>
              <p className="text-gray-500">
                Currently there are no applicants to display
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default HandleUser;