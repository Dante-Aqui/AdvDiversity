import * as Yup from 'yup';

const resourcesSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum of 2 characters').max(200, 'Maximum of 200 characters').required('Required'),
    headline: Yup.string().min(2, 'Minimum of 2 characters').max(200, 'Maximum of 200 characters').required('Required'),
    description: Yup.string()
        .min(2, 'Minimum of 2 characters')
        .max(1000, 'Maximum of 1000 characters')
        .required('Required'),
    logo: Yup.string().min(2, 'Minimum of 2 characters').max(255, 'Maximum of 255 characters').required('Required'),
    contactName: Yup.string()
        .min(2, 'Minimum of 2 characters')
        .max(200, 'Maximum of 200 characters')
        .required('Required'),
    locationId: Yup.number().required('Required'),
    contactEmail: Yup.string().email('Invalid email provided').required('Required'),
    phone: Yup.string().min(2, 'Minimum of 2 characters').max(50, 'Maximum of 50 characters').required('Required'),
    siteUrl: Yup.string().min(2, 'Minimum of 2 characters').max(255, 'Maximum of 255 characters').required('Required'),
});

export default resourcesSchema;
