import * as Yup from 'yup';

const formValidationSchema = Yup.object().shape({
    firstName: Yup.string().max(50).required('First Name is Required'),
    lastName: Yup.string().max(50).required('Last Name is Required'),
    avatarUrl: Yup.string().required('Profile Image is Required'),
});

export { formValidationSchema };