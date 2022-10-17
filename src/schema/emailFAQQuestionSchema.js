import * as Yup from 'yup';

const emailFAQQuestionSchema = Yup.object({
    firstName: Yup.string().min(2).max(50).required('First Name Is Required'),
    lastName: Yup.string().min(2).max(50).required('Last Name Is Required'),
    email: Yup.string().email('Invalid Email').required('Email Is Required'),
    subject: Yup.string().min(2).max(50).required('Subject Is Required'),
    faqContent: Yup.string().min(10).max(128).required('FAQ question Is Required'),
    terms: Yup.bool().required(),
});

export default emailFAQQuestionSchema;
