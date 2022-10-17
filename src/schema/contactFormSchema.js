import * as Yup from 'yup';



const contactSchema = Yup.object().shape({
    fullName: Yup.string().min(10, 'Name Must Be 10 Characters Long').max(50).required('Is Required'),
    email: Yup.string().email('Invalid Email').required('Is Required'),
    subject: Yup.string().min(5, 'Subject Must Be 8 Characters Long').max(50).required('Is Required'),
    message: Yup.string().min(50, 'Message Must Be 50 Characters Long').max(200).required('Is Required'),
});

export default contactSchema;