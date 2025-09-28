import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

 function NewInternshipForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      companyName: user?.companyName || "",
      internshipTitle: "",
      internshipDescription: "",
      internshipDuration: "",
      location: "",
      stipend: "",
      internshipImage: "",
      companyLogo: "",
      isPublished:false,
      testDuration: "",
      startDateTime: "",
      endDateTime: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company name is required"),
      internshipTitle: Yup.string().required("Internship title is required"),
      internshipDescription: Yup.string()
        .required("Description is required")
        .min(50, "Description should be at least 50 characters"),
      internshipDuration: Yup.string().required("Duration is required"),
      location: Yup.string().required("Location is required"),
      stipend: Yup.string().required("Stipend is required"),
      internshipImage: Yup.string().url("Must be a valid URL").required("Image is required"),
      companyLogo: Yup.string().url("Must be a valid URL").required("Logo is required"),
      testDuration: Yup.string().required("Test duration is required"),
      startDateTime: Yup.date().required("Start date/time is required"),
      endDateTime: Yup.date()
        .required("End date/time is required")
        .min(Yup.ref("startDateTime"), "End date must be after start date"),
    }),
    onSubmit: async (values) => {
   
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/internships/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          toast.success('Internship created!')
          navigate("/recruiter/intershipsmanagement");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="p-4 max-w-4xl ">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Create New Internship</h2> */}
      
       <Button 
        className="bg-sky-950 text-white m-4 hover:bg-sky-800"
        onClick={() => setIsOpen(true)}
      >
        + Create New Internship
      </Button>
      {
        isOpen && (<> 
      
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-sky-900">Create Internship</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div>
          <label htmlFor="companyName" className="block mb-1 font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="eg: Google, Microsoft"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            className="w-full p-2 border rounded"
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.companyName as string}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="internshipTitle" className="block mb-1 font-medium">
            Internship Title
          </label>
          <input
            type="text"
            id="internshipTitle"
            name="internshipTitle"
            placeholder="eg: Frontend Developer Intern"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.internshipTitle}
            className="w-full p-2 border rounded"
          />
          {formik.touched.internshipTitle && formik.errors.internshipTitle && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.internshipTitle}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="internshipDescription" className="block mb-1 font-medium">
            Internship Description
          </label>
          <textarea
            id="internshipDescription"
            name="internshipDescription"
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Detailed description of the internship..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.internshipDescription}
          />
          {formik.touched.internshipDescription && formik.errors.internshipDescription && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.internshipDescription}
            </div>
          )}
        </div>

        {/* Internship Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="internshipDuration" className="block mb-1 font-medium">
              Internship Duration
            </label>
            <input
              type="text"
              id="internshipDuration"
              name="internshipDuration"
              placeholder="eg: 3 months"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.internshipDuration}
              className="w-full p-2 border rounded"
            />
            {formik.touched.internshipDuration && formik.errors.internshipDuration && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.internshipDuration}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block mb-1 font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="eg: Remote, Bangalore"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="w-full p-2 border rounded"
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.location}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="stipend" className="block mb-1 font-medium">
              Stipend
            </label>
            <input
              type="text"
              id="stipend"
              name="stipend"
              placeholder="eg: ₹15,000/month"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stipend}
              className="w-full p-2 border rounded"
            />
            {formik.touched.stipend && formik.errors.stipend && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.stipend}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="testDuration" className="block mb-1 font-medium">
              Coding Test Duration
            </label>
            <input
              type="text"
              id="testDuration"
              name="testDuration"
              placeholder="eg: 1 hour"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.testDuration}
              className="w-full p-2 border rounded"
            />
            {formik.touched.testDuration && formik.errors.testDuration && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.testDuration}
              </div>
            )}
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDateTime" className="block mb-1 font-medium">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDateTime}
              className="w-full p-2 border rounded"
            />
            {formik.touched.startDateTime && formik.errors.startDateTime && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.startDateTime}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="endDateTime" className="block mb-1 font-medium">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDateTime}
              className="w-full p-2 border rounded"
            />
            {formik.touched.endDateTime && formik.errors.endDateTime && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.endDateTime}
              </div>
            )}
          </div>
        </div>

        {/* URL Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="internshipImage" className="block mb-1 font-medium">
              Internship Image URL
            </label>
            <input
              type="url"
              id="internshipImage"
              name="internshipImage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.internshipImage}
              className="w-full p-2 border rounded"
            />
            {formik.touched.internshipImage && formik.errors.internshipImage && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.internshipImage}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="companyLogo" className="block mb-1 font-medium">
              Company Logo URL
            </label>
            <input
              type="url"
              id="companyLogo"
              name="companyLogo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.companyLogo}
              className="w-full p-2 border rounded"
            />
            {formik.touched.companyLogo && formik.errors.companyLogo && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.companyLogo}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Internship
          </button>
        </div>
      </form>

      </div>
      </div>
      </>)}
    </div>
  );
}

export default NewInternshipForm