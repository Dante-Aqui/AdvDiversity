import * as Yup from 'yup';

const newsletterTemplateValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum of 2 characters').max(100, 'Maximum of 100 characters').required('Required'),
    description: Yup.string()
        .min(2, 'Minimum of 2 characters')
        .max(200, 'Maximum of 200 characters')
        .required('Required'),
    primaryImage: Yup.string().min(2, 'Minimum of 2 characters').max(255, 'Maximum of 255 characters').required('Required'),    
});

export default newsletterTemplateValidationSchema;