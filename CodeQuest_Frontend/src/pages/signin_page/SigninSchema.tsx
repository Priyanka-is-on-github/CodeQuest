import * as Yup from 'yup'

const SigninSchema = Yup.object({
   
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().min(6).required('Please enter your password'),
   
})

export default SigninSchema;