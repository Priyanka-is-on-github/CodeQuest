import * as Yup from 'yup'

const SigninSchema = Yup.object({
   
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().min(6).required('Please enter your password'),
   
})

const RecruiterSigninSchema = Yup.object({
   
  email: Yup.string()
    .required('Work email is required')
    .email('Invalid email format')
    .test(
      'is-work-email',
      'Personal email addresses are not allowed',
      (value:any) => {
        if (!value) return false;
        
        const personalDomains = [
          'gmail.com',
          'yahoo.com',
          'outlook.com',
          'hotmail.com',
          'icloud.com',
          'protonmail.com'
        ];
        
        const domain = value.split('@')[1]?.toLowerCase();
        return domain && !personalDomains.includes(domain);
      }
    ),
    password: Yup.string().min(6).required('Please enter your password'),
   
})

export default {SigninSchema, RecruiterSigninSchema};