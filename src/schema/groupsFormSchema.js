import * as Yup from 'yup';

const groupFormSchema = Yup.object().shape({
    groupType: Yup.number().required('Is Required'),
    name: Yup.string().min(2).max(200).required('Is Required'),
    headline: Yup.string().max(200),
    description: Yup.string().max(10000),
    logo: Yup.string().max(200),
});
export {groupFormSchema};