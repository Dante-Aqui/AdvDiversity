import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required(),
});

const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Please enter Password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Symbol'
        ),
    confirmPassword: Yup.string()
        .required('Please confirm Password')
        .oneOf([Yup.ref('password')], 'Password does not match'),
});

export { forgotPasswordSchema, changePasswordSchema };
