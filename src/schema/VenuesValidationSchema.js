import * as Yup from 'yup';

const venuesSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Minimum of 2 characters').max(200, 'Maximum of 200 characters').required('Required'),
    description: Yup.string()
        .min(2, 'Minimum of 2 characters')
        .max(1000, 'Maximum of 1000 characters')
        .required('Required'),
    locationId: Yup.number().required('Required'),
    url: Yup.string().min(2, 'Minimum of 2 characters').max(255, 'Maximum of 255 characters').required('Required'),
});

export default venuesSchema;
