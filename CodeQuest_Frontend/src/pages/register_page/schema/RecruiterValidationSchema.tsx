
import * as Yup from 'yup';

 const RecruiterValidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').max(25, 'Name cannot exceed 25 characters').required('Full name is required'),
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

  position: Yup.string().required('Position is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

export default RecruiterValidationSchema
