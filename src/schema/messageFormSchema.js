import * as Yup from 'yup';

const messageFormSchema = Yup.object({
    message: Yup.string().min(1).max(50).required('Is Required'),
});

export { messageFormSchema };
