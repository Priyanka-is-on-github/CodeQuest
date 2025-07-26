
import * as Yup from 'yup';



const companyValidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').max(25, 'Name cannot exceed 25 characters').required('Company name is required'),
 logo: Yup.string()
    .required('Company logo is required')
    .url('Invalid URL format')
    .test(
      'is-image-url',
      'URL must point to an image file',
      (value) => {
        if (!value) return false;
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        return imageExtensions.some(ext => value.toLowerCase().endsWith(ext));
      }
    )
    .test(
      'is-https',
      'Logo URL must use HTTPS',
      (value) => value ? value.startsWith('https://') : false
    ),

  website: Yup.string()
    .required('Website is required')
    .url('Invalid URL format (must include https://)')
    .test(
      'domain-format',
      'Website must be a valid domain (e.g., https://example.com)',
      (value) => {
        if (!value) return false;
        try {
          const url = new URL(value);
          return url.hostname.includes('.') && 
                 !url.hostname.startsWith('.') && 
                 !url.hostname.endsWith('.');
        } catch {
          return false;
        }
      }
    )
    .test(
      'no-path-traversal',
      'Invalid website URL',
      (value) => !value?.includes('../') && !value?.includes('..\\')
    ),

  foundedYear: Yup.number()

    .required('Founded year is required'),
  description: Yup.string().required('Description is required'),
  headquarters: Yup.object().shape({
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required')
  }),
  sector: Yup.string().required('Sector is required'),
  size: Yup.string().required('size is required')
});

export default companyValidationSchema;