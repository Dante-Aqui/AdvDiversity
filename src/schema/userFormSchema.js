import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    email: Yup.string().min(2).max(50).required('Please enter Email').email('Please enter valid Email'),
    password: Yup.string()
        .required('Please enter Password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Symbol'
        ),
    confirmPassword: Yup.string()
        .required('Please confirm Password')
        .oneOf([Yup.ref('password')], 'Password does not match'),
    roleId: Yup.number().required('Must Select Role'),
});

const loginSchema = Yup.object().shape({
    email: Yup.string().min(5).max(50).required('Please enter Email').email('Please enter valid Email'),
    password: Yup.string()
        .required('Please enter Password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Symbol'
        ),
});

export { registerSchema, loginSchema };
