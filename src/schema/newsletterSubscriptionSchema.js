import * as Yup from 'yup';

const newsletterSubscriptionSchema = Yup.object({ email: Yup.string().email("Invalid Email").required(),});

export default newsletterSubscriptionSchema;