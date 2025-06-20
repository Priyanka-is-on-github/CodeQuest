import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';



export function NewIntershipForm() {
  // const navigate = useNavigate()
  // const [testData, setTestData] = useState({
  //   testName: "",
  //   testDuration: "",
  //   startDate: "",
  //   endDate: "",
  //   startTime: "",
  //   endTime: "",
  // });

  // const handleChange = (event: any) => {
  //   const { id, value } = event.target;

  //   setTestData((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));

    
  // };

  // const newTestData = async() => {


  //   try {
      
  //     const response = await fetch(`http://localhost:3001/api/v1/createtest`,{
  //       method: 'POST',
  //       headers:{
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(testData)
  //     })

  //     const newTest = await response.json();
  //     console.log('t=',newTest)

  //     navigate(`/admin/testmanagement`)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
 const formik = useFormik({
    initialValues: {
      companyName: '',
      internshipTitle: '',
      internshipDescription: '',
      internshipDuration: '',
      location: '',
      stipend: '',
      internshipImage: null,
      companyLogo: null,
      testDuration: '',
      startDateTime: '',
      endDateTime: ''
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Company name is required'),
      internshipTitle: Yup.string().required('Internship title is required'),
      internshipDescription: Yup.string()
        .required('Description is required')
        .min(50, 'Description should be at least 50 characters'),
      internshipDuration: Yup.string().required('Duration is required'),
      location: Yup.string().required('Location is required'),
      stipend: Yup.string().required('Stipend is required'),
      internshipImage: Yup.mixed().required('Image is required'),
      companyLogo: Yup.mixed().required('Logo is required'),
      testDuration: Yup.string().required('Test duration is required'),
      startDateTime: Yup.date().required('Start date/time is required'),
      endDateTime: Yup.date()
        .required('End date/time is required')
        .min(Yup.ref('startDateTime'), 'End date must be after start date')
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    }
  });
  return (
   <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-sky-950 text-white m-4 hover:bg-sky-800">
         + Create New Internship
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white h-[85vh] overflow-y-auto border-2 border-green-700">
        <AlertDialogHeader className="p-4">
          <AlertDialogTitle className="text-sky-900 text-2xl text-center font-bold">
            Create Internship
          </AlertDialogTitle>
          <form onSubmit={formik.handleSubmit}>
            {/* Company Information */}
            <div className="grid w-full items-center gap-4 mb-4">
              <div>
                <Label htmlFor="companyName" className="text-sm">
                  Company Name
                </Label>
                <Input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="eg: Google, Microsoft"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.companyName}
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <div className="text-red-500 text-xs">{formik.errors.companyName}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="internshipTitle" className="text-sm">
                  Internship Title
                </Label>
                <Input
                  type="text"
                  id="internshipTitle"
                  name="internshipTitle"
                  placeholder="eg: Frontend Developer Intern"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.internshipTitle}
                />
                {formik.touched.internshipTitle && formik.errors.internshipTitle ? (
                  <div className="text-red-500 text-xs">{formik.errors.internshipTitle}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="internshipDescription" className="text-sm">
                  Internship Description
                </Label>
                <textarea
                  id="internshipDescription"
                  name="internshipDescription"
                  rows={4}
                  className="w-full border rounded-md p-2"
                  placeholder="Detailed description of the internship..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.internshipDescription}
                />
                {formik.touched.internshipDescription && formik.errors.internshipDescription ? (
                  <div className="text-red-500 text-xs">{formik.errors.internshipDescription}</div>
                ) : null}
              </div>
            </div>

            {/* Internship Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="internshipDuration" className="text-sm">
                  Internship Duration
                </Label>
                <Input
                  type="text"
                  id="internshipDuration"
                  name="internshipDuration"
                  placeholder="eg: 3 months"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.internshipDuration}
                />
                {formik.touched.internshipDuration && formik.errors.internshipDuration ? (
                  <div className="text-red-500 text-xs">{formik.errors.internshipDuration}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="location" className="text-sm">
                  Location
                </Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="eg: Remote, Bangalore"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-red-500 text-xs">{formik.errors.location}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="stipend" className="text-sm">
                  Stipend
                </Label>
                <Input
                  type="text"
                  id="stipend"
                  name="stipend"
                  placeholder="eg: ₹15,000/month"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stipend}
                />
                {formik.touched.stipend && formik.errors.stipend ? (
                  <div className="text-red-500 text-xs">{formik.errors.stipend}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="testDuration" className="text-sm">
                  Coding Test Duration
                </Label>
                <Input
                  type="text"
                  id="testDuration"
                  name="testDuration"
                  placeholder="eg: 1 hour"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.testDuration}
                />
                {formik.touched.testDuration && formik.errors.testDuration ? (
                  <div className="text-red-500 text-xs">{formik.errors.testDuration}</div>
                ) : null}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="startDateTime" className="text-sm">
                  Start Date & Time
                </Label>
                <Input
                  type="datetime-local"
                  id="startDateTime"
                  name="startDateTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDateTime}
                />
                {formik.touched.startDateTime && formik.errors.startDateTime ? (
                  <div className="text-red-500 text-xs">{formik.errors.startDateTime}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="endDateTime" className="text-sm">
                  End Date & Time
                </Label>
                <Input
                  type="datetime-local"
                  id="endDateTime"
                  name="endDateTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDateTime}
                />
                {formik.touched.endDateTime && formik.errors.endDateTime ? (
                  <div className="text-red-500 text-xs">{formik.errors.endDateTime}</div>
                ) : null}
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="internshipImage" className="text-sm">
                  Internship Image
                </Label>
                <Input
                  type="file"
                  id="internshipImage"
                  name="internshipImage"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue('internshipImage', event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.internshipImage && formik.errors.internshipImage ? (
                  <div className="text-red-500 text-xs">{formik.errors.internshipImage}</div>
                ) : null}
              </div>

              <div>
                <Label htmlFor="companyLogo" className="text-sm">
                  Company Logo
                </Label>
                <Input
                  type="file"
                  id="companyLogo"
                  name="companyLogo"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue('companyLogo', event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.companyLogo && formik.errors.companyLogo ? (
                  <div className="text-red-500 text-xs">{formik.errors.companyLogo}</div>
                ) : null}
              </div>
            </div>

            <AlertDialogFooter className="p-3">
              <AlertDialogCancel 
                type="button"
                className="bg-sky-950 text-white hover:bg-sky-800"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                className="bg-sky-950 text-white hover:bg-sky-800"
                
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
