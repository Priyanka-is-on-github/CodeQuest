import * as Yup from 'yup'

const SignupSchema = Yup.object({
    name:Yup.string().min(2, 'Name must be at least 2 characters').max(25, ' Name cannot exceed 25 characters').required('Please enter your name'),
    email: Yup.string().email('Invalid email format').required('Please enter your email'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter your password'),
  
    role: Yup.string().oneOf(['user', 'admin'], ' Role must be either "user" or "admin"').max(5).required('Please enter your role'),
      degree: Yup.string().max(5, 'Degree cannot exceed 5 characters').required('Please enter your degree'),
})

export default SignupSchema;