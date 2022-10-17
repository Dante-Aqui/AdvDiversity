import * as Yup from 'yup';

const MentorsSchema = Yup.object().shape({
    summary: Yup.string().min(2, 'Summary is too short').max(250).required('Summary Field Is Required'),
    description: Yup.string()
        .min(2, 'Description is too short')
        .max(4000, 'Description is too long')
        .required('Is Required'),
    siteUrl: Yup.string().min(2, 'invalid URL').max(200).required('Is Required'),
    phone: Yup.string().min(2, 'invalid Phone Number').max(20).required('Is Required'),
});

export default MentorsSchema;
