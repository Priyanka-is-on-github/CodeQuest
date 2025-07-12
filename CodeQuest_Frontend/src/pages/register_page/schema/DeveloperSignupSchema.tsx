import * as Yup from 'yup';

const DeveloperSignupSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(25, 'Name cannot exceed 25 characters')
    .required('Please enter your name'),
    
  email: Yup.string()
    .email('Invalid email format')
    .required('Please enter your email'),
    
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Please enter your password'),
    
  collegeName: Yup.string()
    .min(2, 'College name must be at least 2 characters')
    .max(50, 'College name cannot exceed 50 characters') // Increased limit
    .required('Please enter your college name'),
    
  // role: Yup.string()
  //   .oneOf(['developer', 'recruiter'], 'Role must be either "developer" or "recruiter"')
  //   .required('Please select your role'),
    
  degree: Yup.string()
    .max(10, 'Degree abbreviation cannot exceed 10 characters') // e.g., "B.Tech", "MCA"
    .required('Please enter your degree'),
    
  adharNumber: Yup.string() // Corrected field name spelling
    .matches(/^[2-9]{1}[0-9]{11}$/, 'Invalid Aadhaar number format').max(12, 'Invalid Aadhaar number format') // Validates 12 digits starting with 2-9
    .required('Please enter your Aadhaar number')
});

export default DeveloperSignupSchema;