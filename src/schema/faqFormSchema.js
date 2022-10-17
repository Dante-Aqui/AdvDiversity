import * as Yup from 'yup';

const faqFormSchema = Yup.object({
    question: Yup.string()
        .min(2)
        .max(255, 'Question should not exceed 255 characters')
        .required('Please Enter Faq Questions'),
    answer: Yup.string()
        .min(2)
        .max(2000, 'Answer should not exceed 2000 characters')
        .required('Please Enter Faq Answer'),
    categoryId: Yup.number().required('Category Id is required'),
    sortOrder: Yup.number().required('Sort Oder is required'),
});
export { faqFormSchema };
